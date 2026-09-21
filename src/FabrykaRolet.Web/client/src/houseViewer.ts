import gsap from "gsap";
import type { HotspotData, HouseViewData, HouseViewerData, SystemSummary } from "./types";

const SVG_NS = "http://www.w3.org/2000/svg";

type CalloutContent = { name: string; description: string; advantages: string[] };
type ArrowSide = "left" | "right" | "none";

/**
 * Infografika domu: jeden widget na sekcję. Klik w hotspot na obrazie LUB w przycisk
 * systemu z listy pod domem otwiera TEN SAM dymek (callout) - nigdy oba naraz.
 * Dymek jest pozycjonowany dynamicznie obok klikniętego elementu, ze strzałką
 * wskazującą dokładnie na niego (position: fixed, liczone z getBoundingClientRect,
 * więc działa identycznie dla hotspotu na obrazie i przycisku w liście poniżej).
 */
export class HouseViewer {
  private readonly img: HTMLImageElement;
  private readonly overlay: SVGSVGElement;
  private readonly hitAreas: HTMLElement;
  private readonly prevBtn: HTMLButtonElement | null;
  private readonly nextBtn: HTMLButtonElement | null;
  private readonly viewsNav: HTMLElement | null;

  private readonly callout: HTMLElement;
  private readonly calloutArrow: HTMLElement;
  private readonly calloutTitle: HTMLElement;
  private readonly calloutDescription: HTMLElement;
  private readonly calloutAdvantages: HTMLElement;

  private currentIndex = 0;
  private lastFocused: HTMLElement | null = null;
  private repositionHandler: (() => void) | null = null;

  constructor(private readonly root: HTMLElement, private readonly data: HouseViewerData) {
    this.img = this.require(".house-viewer__image");
    this.overlay = this.require(".house-viewer__overlay");
    this.hitAreas = this.require(".house-viewer__hit-areas");
    this.prevBtn = root.querySelector(".house-viewer__arrow--prev");
    this.nextBtn = root.querySelector(".house-viewer__arrow--next");
    this.viewsNav = root.querySelector(".house-viewer__views");

    this.callout = this.requireGlobal("#hv-callout");
    this.calloutArrow = this.requireGlobal(".hv-callout__arrow");
    this.calloutTitle = this.requireGlobal("#hv-callout-title");
    this.calloutDescription = this.requireGlobal("#hv-callout-description");
    this.calloutAdvantages = this.requireGlobal("#hv-callout-advantages");

    this.bindNav();
    this.bindCalloutClose();
    this.bindSystemButtons();
    this.renderView(0);
  }

  private require<T extends Element>(selector: string): T {
    const el = this.root.querySelector<T>(selector);
    if (!el) throw new Error(`HouseViewer: brak elementu "${selector}" w kontenerze.`);
    return el;
  }

  private requireGlobal<T extends Element>(selector: string): T {
    const el = document.querySelector<T>(selector);
    if (!el) throw new Error(`HouseViewer: brak elementu globalnego "${selector}".`);
    return el;
  }

  private bindNav(): void {
    const hasMultipleViews = this.data.views.length > 1;
    if (this.prevBtn) this.prevBtn.hidden = !hasMultipleViews;
    if (this.nextBtn) this.nextBtn.hidden = !hasMultipleViews;

    this.prevBtn?.addEventListener("click", () => this.step(-1));
    this.nextBtn?.addEventListener("click", () => this.step(1));

    if (this.viewsNav) {
      this.viewsNav.innerHTML = "";
      this.data.views.forEach((view, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "house-viewer__view-btn";
        button.textContent = view.title;
        button.setAttribute("role", "tab");
        button.setAttribute("aria-selected", index === this.currentIndex ? "true" : "false");
        button.tabIndex = index === this.currentIndex ? 0 : -1;
        button.addEventListener("click", () => this.renderView(index));
        this.viewsNav?.appendChild(button);
      });
    }

    this.root.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        this.step(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        this.step(1);
      }
    });
  }

  private bindCalloutClose(): void {
    this.callout.querySelectorAll<HTMLElement>("[data-close]").forEach((el) =>
      el.addEventListener("click", () => this.closeCallout())
    );

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !this.callout.hidden) this.closeCallout();
    });

    // Klik gdziekolwiek poza dymkiem i poza przyciskiem, który go otwiera, zamyka dymek.
    document.addEventListener("click", (event) => {
      if (this.callout.hidden) return;
      const target = event.target as HTMLElement;
      if (this.callout.contains(target)) return;
      if (target.closest("[data-system-id], .house-viewer__hit-area")) return;
      this.closeCallout();
    });
  }

  private bindSystemButtons(): void {
    document.querySelectorAll<HTMLButtonElement>("[data-system-id]").forEach((button) => {
      button.addEventListener("click", () => this.activateSystem(button.dataset.systemId!, button));
    });
  }

  private findHotspot(systemId: string): { viewIndex: number; hotspot: HotspotData } | null {
    for (let viewIndex = 0; viewIndex < this.data.views.length; viewIndex++) {
      const hotspot = this.data.views[viewIndex].hotspots.find((h) => h.systemId === systemId);
      if (hotspot) return { viewIndex, hotspot };
    }
    return null;
  }

  private findSystemSummary(systemId: string): SystemSummary | undefined {
    return this.data.systems.find((s) => s.systemId === systemId);
  }

  /**
   * Klik na przycisku systemu z listy: jeśli system ma hotspot na innym widoku,
   * przełącza tam, po animacji otwiera dymek przy hotspocie i go pulsuje. Jeśli
   * hotspot nie istnieje (widok jeszcze nie gotowy), dymek otwiera się przy samym
   * przycisku z listy - zawsze przy czymś klikalnym, nigdy "znikąd".
   */
  private activateSystem(systemId: string, trigger: HTMLElement): void {
    const found = this.findHotspot(systemId);

    if (!found) {
      const summary = this.findSystemSummary(systemId);
      if (summary) this.openCallout(summary, trigger);
      return;
    }

    const { viewIndex, hotspot } = found;
    if (viewIndex === this.currentIndex) {
      const hitArea = this.hitAreaFor(hotspot.systemId);
      this.openCallout(hotspot, hitArea ?? trigger);
      this.pulseHotspot(hotspot.systemId);
    } else {
      this.renderView(viewIndex, () => {
        const hitArea = this.hitAreaFor(hotspot.systemId);
        this.openCallout(hotspot, hitArea ?? trigger);
        this.pulseHotspot(hotspot.systemId);
      });
    }
  }

  private hitAreaFor(systemId: string): HTMLElement | null {
    return this.hitAreas.querySelector<HTMLElement>(`[data-system-id="${CSS.escape(systemId)}"]`);
  }

  private pulseHotspot(systemId: string): void {
    const view = this.data.views[this.currentIndex];
    const index = view.hotspots.findIndex((h) => h.systemId === systemId);
    if (index === -1) return;
    const polygon = this.overlay.querySelectorAll("polygon")[index];
    if (!polygon) return;
    gsap.fromTo(
      polygon,
      { scale: 1, transformOrigin: "50% 50%" },
      { scale: 1.05, duration: 0.25, yoyo: true, repeat: 3, ease: "power1.inOut" }
    );
  }

  private step(delta: number): void {
    const count = this.data.views.length;
    const next = (this.currentIndex + delta + count) % count;
    this.renderView(next);
  }

  private renderView(index: number, onDone?: () => void): void {
    const isFirstRender = !this.img.src;
    this.currentIndex = index;
    const view = this.data.views[index];

    if (!isFirstRender) this.closeCallout();

    const applyView = () => {
      this.img.src = view.image;
      this.img.alt = view.title;
      this.buildHotspots(view);
      this.syncViewButtons();
      gsap.fromTo([this.img, this.overlay], { opacity: 0 }, { opacity: 1, duration: 0.35, onComplete: onDone });
    };

    if (isFirstRender) {
      applyView();
    } else {
      gsap.to([this.img, this.overlay], { opacity: 0, duration: 0.2, onComplete: applyView });
    }
  }

  private syncViewButtons(): void {
    if (!this.viewsNav) return;
    const buttons = Array.from(this.viewsNav.querySelectorAll<HTMLButtonElement>(".house-viewer__view-btn"));
    buttons.forEach((button, index) => {
      const active = index === this.currentIndex;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", active ? "true" : "false");
      button.tabIndex = active ? 0 : -1;
    });
  }

  private buildHotspots(view: HouseViewData): void {
    this.overlay.innerHTML = "";
    this.hitAreas.innerHTML = "";

    view.hotspots.forEach((hotspot, index) => {
      const polygonEl = this.createPolygon(hotspot);
      this.overlay.appendChild(polygonEl);

      const button = this.createHitArea(hotspot, polygonEl);
      this.hitAreas.appendChild(button);

      gsap.fromTo(polygonEl, { opacity: 0 }, { opacity: 1, duration: 0.35, delay: 0.15 + index * 0.08 });
    });
  }

  private createPolygon(hotspot: HotspotData): SVGPolygonElement {
    const polygon = document.createElementNS(SVG_NS, "polygon");
    const points = hotspot.polygon.map(([x, y]) => `${x},${y}`).join(" ");
    polygon.setAttribute("points", points);
    polygon.setAttribute("class", "house-viewer__hotspot");
    return polygon;
  }

  private createHitArea(hotspot: HotspotData, polygon: SVGPolygonElement): HTMLButtonElement {
    const xs = hotspot.polygon.map(([x]) => x);
    const ys = hotspot.polygon.map(([, y]) => y);
    const left = Math.min(...xs);
    const top = Math.min(...ys);
    const width = Math.max(...xs) - left;
    const height = Math.max(...ys) - top;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "house-viewer__hit-area";
    button.dataset.systemId = hotspot.systemId;
    button.style.left = `${left}%`;
    button.style.top = `${top}%`;
    button.style.width = `${width}%`;
    button.style.height = `${height}%`;
    button.setAttribute("aria-label", `${hotspot.name} – pokaż szczegóły`);

    const highlight = () => polygon.classList.add("is-active");
    const unhighlight = () => polygon.classList.remove("is-active");

    button.addEventListener("mouseenter", highlight);
    button.addEventListener("mouseleave", unhighlight);
    button.addEventListener("focus", highlight);
    button.addEventListener("blur", unhighlight);
    button.addEventListener("click", () => this.openCallout(hotspot, button));

    return button;
  }

  private openCallout(content: CalloutContent, trigger: HTMLElement): void {
    this.lastFocused = trigger;

    this.calloutTitle.textContent = content.name;
    this.calloutDescription.textContent = content.description;
    this.calloutAdvantages.innerHTML = "";
    content.advantages.forEach((advantage) => {
      const li = document.createElement("li");
      li.textContent = advantage;
      this.calloutAdvantages.appendChild(li);
    });

    this.positionCallout(trigger);

    gsap.fromTo(this.callout, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" });
    this.callout.querySelector<HTMLElement>(".hv-callout__close")?.focus();

    if (!this.repositionHandler) {
      this.repositionHandler = () => this.closeCallout();
      window.addEventListener("scroll", this.repositionHandler, { passive: true, once: true });
      window.addEventListener("resize", this.repositionHandler, { once: true });
    }
  }

  /**
   * Pozycjonuje dymek obok `target` (hotspot na obrazie LUB przycisk z listy) i ustawia
   * strzałkę tak, żeby wskazywała dokładnie na ten element. Liczone w px względem
   * viewportu (position: fixed), więc działa identycznie niezależnie od tego, gdzie
   * na stronie leży `target`.
   */
  private positionCallout(target: HTMLElement): void {
    const margin = 14;
    const targetRect = target.getBoundingClientRect();

    this.callout.style.visibility = "hidden";
    this.callout.hidden = false;
    const calloutRect = this.callout.getBoundingClientRect();

    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;
    const spaceRight = viewportW - targetRect.right;
    const spaceLeft = targetRect.left;

    let left: number;
    let arrowSide: ArrowSide;

    if (spaceRight >= calloutRect.width + margin) {
      left = targetRect.right + margin;
      arrowSide = "left";
    } else if (spaceLeft >= calloutRect.width + margin) {
      left = targetRect.left - margin - calloutRect.width;
      arrowSide = "right";
    } else {
      left = Math.max(margin, Math.min(targetRect.left, viewportW - calloutRect.width - margin));
      arrowSide = "none";
    }

    let top = arrowSide === "none"
      ? targetRect.bottom + margin
      : targetRect.top + targetRect.height / 2 - calloutRect.height / 2;

    top = Math.max(margin, Math.min(top, viewportH - calloutRect.height - margin));
    left = Math.max(margin, Math.min(left, viewportW - calloutRect.width - margin));

    this.callout.style.left = `${left}px`;
    this.callout.style.top = `${top}px`;
    this.callout.style.visibility = "visible";

    this.calloutArrow.classList.remove("hv-callout__arrow--left", "hv-callout__arrow--right", "hv-callout__arrow--none");
    this.calloutArrow.classList.add(`hv-callout__arrow--${arrowSide}`);
    if (arrowSide !== "none") {
      const arrowTop = targetRect.top + targetRect.height / 2 - top;
      this.calloutArrow.style.top = `${Math.max(14, Math.min(arrowTop, calloutRect.height - 14))}px`;
    }
  }

  private closeCallout(): void {
    if (this.callout.hidden) return;
    gsap.to(this.callout, {
      opacity: 0,
      scale: 0.96,
      duration: 0.15,
      onComplete: () => {
        this.callout.hidden = true;
        this.lastFocused?.focus();
      },
    });
    if (this.repositionHandler) {
      window.removeEventListener("scroll", this.repositionHandler);
      window.removeEventListener("resize", this.repositionHandler);
      this.repositionHandler = null;
    }
  }
}
