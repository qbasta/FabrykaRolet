import gsap from "gsap";
import type { HotspotData, HouseViewData, HouseViewerData, SystemSummary } from "./types";

const SVG_NS = "http://www.w3.org/2000/svg";

type ModalContent = { name: string; description: string; advantages: string[] };

export class HouseViewer {
  private readonly img: HTMLImageElement;
  private readonly overlay: SVGSVGElement;
  private readonly hitAreas: HTMLElement;
  private readonly prevBtn: HTMLButtonElement | null;
  private readonly nextBtn: HTMLButtonElement | null;

  private readonly modal: HTMLElement;
  private readonly modalPanel: HTMLElement;
  private readonly modalTitle: HTMLElement;
  private readonly modalDescription: HTMLElement;
  private readonly modalAdvantages: HTMLElement;

  private currentIndex = 0;
  private lastFocused: HTMLElement | null = null;

  constructor(private readonly root: HTMLElement, private readonly data: HouseViewerData) {
    this.img = this.require(".house-viewer__image");
    this.overlay = this.require(".house-viewer__overlay");
    this.hitAreas = this.require(".house-viewer__hit-areas");
    this.prevBtn = root.querySelector(".house-viewer__arrow--prev");
    this.nextBtn = root.querySelector(".house-viewer__arrow--next");

    this.modal = this.requireGlobal("#house-viewer-modal");
    this.modalPanel = this.requireGlobal(".hv-modal__panel");
    this.modalTitle = this.requireGlobal("#hv-modal-title");
    this.modalDescription = this.requireGlobal("#hv-modal-description");
    this.modalAdvantages = this.requireGlobal("#hv-modal-advantages");

    this.bindNav();
    this.bindModalClose();
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
  }

  private bindModalClose(): void {
    this.modal.querySelectorAll<HTMLElement>("[data-close]").forEach((el) =>
      el.addEventListener("click", () => this.closeModal())
    );
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !this.modal.hidden) this.closeModal();
    });
  }

  /**
   * Przyciski listy systemów żyją POZA kontenerem widgetu (osobna sekcja na stronie),
   * więc szukamy ich w całym dokumencie, nie tylko wewnątrz `root`.
   */
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
   * Kliknięcie przycisku systemu z listy pod domem: jeśli system ma hotspot na
   * (innym) widoku - przełącza tam i po animacji otwiera opis, podświetlając hotspot.
   * Jeśli nie ma jeszcze żadnego hotspotu (widok dla niego nie istnieje) - po prostu
   * otwiera opis w tym samym oknie, bez zmiany widoku.
   */
  private activateSystem(systemId: string, trigger: HTMLElement): void {
    const found = this.findHotspot(systemId);

    if (!found) {
      const summary = this.findSystemSummary(systemId);
      if (summary) this.openModal(summary, trigger);
      return;
    }

    const { viewIndex, hotspot } = found;
    if (viewIndex === this.currentIndex) {
      this.openModal(hotspot, trigger);
      this.pulseHotspot(hotspot.systemId);
    } else {
      this.renderView(viewIndex, () => {
        this.openModal(hotspot, trigger);
        this.pulseHotspot(hotspot.systemId);
      });
    }
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

    const applyView = () => {
      this.img.src = view.image;
      this.img.alt = view.title;
      this.buildHotspots(view);
      gsap.fromTo([this.img, this.overlay], { opacity: 0 }, { opacity: 1, duration: 0.35, onComplete: onDone });
    };

    if (isFirstRender) {
      applyView();
    } else {
      gsap.to([this.img, this.overlay], { opacity: 0, duration: 0.2, onComplete: applyView });
    }
  }

  private buildHotspots(view: HouseViewData): void {
    this.overlay.innerHTML = "";
    this.hitAreas.innerHTML = "";

    view.hotspots.forEach((hotspot, index) => {
      const polygonEl = this.createPolygon(hotspot);
      this.overlay.appendChild(polygonEl);

      const button = this.createHitArea(hotspot, polygonEl);
      this.hitAreas.appendChild(button);

      gsap.fromTo(
        polygonEl,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, delay: 0.15 + index * 0.08 }
      );
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
    button.addEventListener("click", () => this.openModal(hotspot, button));

    return button;
  }

  private openModal(content: ModalContent, trigger: HTMLElement): void {
    this.lastFocused = trigger;

    this.modalTitle.textContent = content.name;
    this.modalDescription.textContent = content.description;
    this.modalAdvantages.innerHTML = "";
    content.advantages.forEach((advantage) => {
      const li = document.createElement("li");
      li.textContent = advantage;
      this.modalAdvantages.appendChild(li);
    });

    this.modal.hidden = false;
    gsap.fromTo(
      this.modalPanel,
      { opacity: 0, scale: 0.96, y: 8 },
      { opacity: 1, scale: 1, y: 0, duration: 0.25, ease: "power2.out" }
    );
    this.modalPanel.focus();
  }

  private closeModal(): void {
    gsap.to(this.modalPanel, {
      opacity: 0,
      scale: 0.96,
      y: 8,
      duration: 0.18,
      onComplete: () => {
        this.modal.hidden = true;
        this.lastFocused?.focus();
      },
    });
  }
}
