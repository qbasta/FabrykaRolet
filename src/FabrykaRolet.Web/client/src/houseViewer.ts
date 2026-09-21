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
  private readonly viewsNav: HTMLElement | null;

  private readonly modal: HTMLElement;
  private readonly modalPanel: HTMLElement;
  private readonly modalTitle: HTMLElement;
  private readonly modalDescription: HTMLElement;
  private readonly modalAdvantages: HTMLElement;

  private readonly infoTitle: HTMLElement | null;
  private readonly infoDescription: HTMLElement | null;
  private readonly infoAdvantages: HTMLElement | null;

  private readonly filterButtons: HTMLButtonElement[];
  private readonly systemButtons: HTMLButtonElement[];
  private readonly listEmpty: HTMLElement | null;

  private currentIndex = 0;
  private lastFocused: HTMLElement | null = null;

  constructor(private readonly root: HTMLElement, private readonly data: HouseViewerData) {
    this.img = this.require(".house-viewer__image");
    this.overlay = this.require(".house-viewer__overlay");
    this.hitAreas = this.require(".house-viewer__hit-areas");
    this.prevBtn = root.querySelector(".house-viewer__arrow--prev");
    this.nextBtn = root.querySelector(".house-viewer__arrow--next");
    this.viewsNav = root.querySelector(".house-viewer__views");

    this.modal = this.requireGlobal("#house-viewer-modal");
    this.modalPanel = this.requireGlobal(".hv-modal__panel");
    this.modalTitle = this.requireGlobal("#hv-modal-title");
    this.modalDescription = this.requireGlobal("#hv-modal-description");
    this.modalAdvantages = this.requireGlobal("#hv-modal-advantages");

    this.infoTitle = document.querySelector("#hv-info-title");
    this.infoDescription = document.querySelector("#hv-info-description");
    this.infoAdvantages = document.querySelector("#hv-info-advantages");

    this.filterButtons = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-filter]"));
    this.systemButtons = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-system-id]"));
    this.listEmpty = document.querySelector(".system-list__empty");

    this.bindNav();
    this.bindModalClose();
    this.bindSystemButtons();
    this.bindFilters();
    this.renderView(0);
    this.applyFilter("all");
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

  private bindModalClose(): void {
    this.modal.querySelectorAll<HTMLElement>("[data-close]").forEach((el) =>
      el.addEventListener("click", () => this.closeModal())
    );

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !this.modal.hidden) {
        this.closeModal();
      }
      if (event.key === "Tab" && !this.modal.hidden) {
        this.trapFocus(event);
      }
    });
  }

  private trapFocus(event: KeyboardEvent): void {
    const focusable = Array.from(
      this.modalPanel.querySelectorAll<HTMLElement>(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      )
    ).filter((el) => !el.hasAttribute("disabled"));

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  private bindSystemButtons(): void {
    this.systemButtons.forEach((button) => {
      button.addEventListener("click", () => this.activateSystem(button.dataset.systemId!, button));
    });
  }

  private bindFilters(): void {
    this.filterButtons.forEach((button) => {
      const filter = button.dataset.filter;
      if (!filter) return;

      button.addEventListener("click", () => {
        this.applyFilter(filter);
      });
    });
  }

  private applyFilter(filter: string): void {
    this.filterButtons.forEach((button) => {
      const active = button.dataset.filter === filter;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });

    let visibleCount = 0;
    this.systemButtons.forEach((button) => {
      const section = button.dataset.systemSection;
      const visible = filter === "all" || section === filter;
      button.hidden = !visible;
      if (visible) visibleCount++;
    });

    if (this.listEmpty) {
      this.listEmpty.hidden = visibleCount > 0;
    }
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

  private activateSystem(systemId: string, trigger: HTMLElement): void {
    const found = this.findHotspot(systemId);

    if (!found) {
      const summary = this.findSystemSummary(systemId);
      if (summary) {
        this.updateInfoPanel(summary);
        this.openModal(summary, trigger);
      }
      return;
    }

    const { viewIndex, hotspot } = found;
    if (viewIndex === this.currentIndex) {
      this.updateInfoPanel(hotspot);
      this.openModal(hotspot, trigger);
      this.pulseHotspot(hotspot.systemId);
    } else {
      this.renderView(viewIndex, () => {
        this.updateInfoPanel(hotspot);
        this.openModal(hotspot, trigger);
        this.pulseHotspot(hotspot.systemId);
      });
    }
  }

  private updateInfoPanel(content: ModalContent): void {
    if (!this.infoTitle || !this.infoDescription || !this.infoAdvantages) return;
    const infoAdvantages = this.infoAdvantages;

    this.infoTitle.textContent = content.name;
    this.infoDescription.textContent = content.description;
    infoAdvantages.innerHTML = "";

    content.advantages.forEach((advantage) => {
      const li = document.createElement("li");
      li.textContent = advantage;
      infoAdvantages.appendChild(li);
    });
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
    button.addEventListener("click", () => {
      this.updateInfoPanel(hotspot);
      this.openModal(hotspot, button);
    });

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
