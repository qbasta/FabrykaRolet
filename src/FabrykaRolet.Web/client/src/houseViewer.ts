import gsap from "gsap";
import type { HotspotData, HouseViewData, HouseViewerData, SystemSummary } from "./types";

const SVG_NS = "http://www.w3.org/2000/svg";

type PanelContent = { name: string; description: string; advantages: string[] };
type HotspotBounds = {
  left: number;
  top: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
};

export class HouseViewer {
  private readonly layout: HTMLElement;
  private readonly stage: HTMLElement;
  private readonly img: HTMLImageElement;
  private readonly overlay: SVGSVGElement;
  private readonly hitAreas: HTMLElement;
  private readonly connector: SVGSVGElement;
  private readonly connectorPath: SVGPathElement;
  private readonly panel: HTMLElement;
  private readonly panelClose: HTMLButtonElement;
  private readonly panelTitle: HTMLElement;
  private readonly panelDescription: HTMLElement;
  private readonly panelAdvantages: HTMLElement;
  private readonly prevBtn: HTMLButtonElement | null;
  private readonly nextBtn: HTMLButtonElement | null;
  private readonly viewsNav: HTMLElement | null;
  private readonly systemButtons: HTMLButtonElement[];

  private currentIndex = 0;
  private activeSystemId: string | null = null;
  private lastFocused: HTMLElement | null = null;
  private activePulseTween: gsap.core.Tween | null = null;
  private connectorRefreshTween: gsap.core.Tween | null = null;

  constructor(
    private readonly root: HTMLElement,
    private readonly data: HouseViewerData
  ) {
    this.layout = this.require(".house-viewer__layout");
    this.stage = this.require(".house-viewer__stage");
    this.img = this.require(".house-viewer__image");
    this.overlay = this.require(".house-viewer__overlay");
    this.hitAreas = this.require(".house-viewer__hit-areas");
    this.connector = this.require(".house-viewer__connector");
    this.connectorPath = this.require(".house-viewer__connector-path");
    this.panel = this.require("#house-viewer-panel");
    this.panelClose = this.require(".house-viewer__panel-close");
    this.panelTitle = this.require("#house-viewer-panel-title");
    this.panelDescription = this.require("#house-viewer-panel-description");
    this.panelAdvantages = this.require("#house-viewer-panel-advantages");
    this.prevBtn = root.querySelector(".house-viewer__arrow--prev");
    this.nextBtn = root.querySelector(".house-viewer__arrow--next");
    this.viewsNav = root.querySelector(".house-viewer__views");
    this.systemButtons = Array.from(document.querySelectorAll<HTMLButtonElement>(".system-button[data-system-id]"));

    this.bindNav();
    this.bindPanelClose();
    this.bindSystemButtons();
    this.bindGlobalEvents();
    this.renderView(0);
  }

  private require<T extends Element>(selector: string): T {
    const el = this.root.querySelector<T>(selector);
    if (!el) throw new Error(`HouseViewer: brak elementu "${selector}" w kontenerze.`);
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

  private bindPanelClose(): void {
    this.panelClose.addEventListener("click", () => this.closePanel());

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !this.panel.hidden) {
        this.closePanel();
      }
    });

    document.addEventListener("click", (event) => {
      if (this.panel.hidden) return;

      const target = event.target as HTMLElement | null;
      if (!target) return;
      if (this.panel.contains(target)) return;
      if (target.closest(".house-viewer__marker, .house-viewer__hit-area, .system-button")) return;

      this.closePanel();
    });
  }

  private bindSystemButtons(): void {
    this.systemButtons.forEach((button) => {
      button.addEventListener("click", () => this.activateSystem(button.dataset.systemId!, button));
    });
  }

  private bindGlobalEvents(): void {
    window.addEventListener("resize", () => this.updateConnector());
    this.img.addEventListener("load", () => this.updateConnector());
  }

  private findHotspot(systemId: string): { viewIndex: number; hotspot: HotspotData } | null {
    for (let viewIndex = 0; viewIndex < this.data.views.length; viewIndex++) {
      const hotspot = this.data.views[viewIndex].hotspots.find((item) => item.systemId === systemId);
      if (hotspot) return { viewIndex, hotspot };
    }

    return null;
  }

  private findSystemSummary(systemId: string): SystemSummary | undefined {
    return this.data.systems.find((item) => item.systemId === systemId);
  }

  private activateSystem(systemId: string, trigger: HTMLElement): void {
    const found = this.findHotspot(systemId);
    if (!found) {
      const summary = this.findSystemSummary(systemId);
      if (summary) this.openPanel(summary, trigger, null);
      return;
    }

    const openForHotspot = () => {
      const marker = this.markerFor(systemId);
      this.openPanel(found.hotspot, marker ?? trigger, systemId);
    };

    if (found.viewIndex === this.currentIndex) {
      openForHotspot();
      return;
    }

    this.renderView(found.viewIndex, openForHotspot);
  }

  private markerFor(systemId: string): HTMLButtonElement | null {
    return this.hitAreas.querySelector<HTMLButtonElement>(`.house-viewer__marker[data-system-id="${CSS.escape(systemId)}"]`);
  }

  private polygonFor(systemId: string): SVGPolygonElement | null {
    return this.overlay.querySelector<SVGPolygonElement>(`polygon[data-system-id="${CSS.escape(systemId)}"]`);
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

    if (!isFirstRender) {
      this.closePanel(false);
    }

    const applyView = () => {
      this.img.src = view.image;
      this.img.alt = view.title;
      this.buildHotspots(view);
      this.syncViewButtons();

      gsap.fromTo(
        [this.img, this.overlay, this.hitAreas],
        { opacity: 0 },
        { opacity: 1, duration: 0.35, onComplete: onDone }
      );
    };

    if (isFirstRender) {
      applyView();
      return;
    }

    gsap.to([this.img, this.overlay, this.hitAreas], { opacity: 0, duration: 0.2, onComplete: applyView });
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
      const bounds = this.getBounds(hotspot);
      const polygon = this.createPolygon(hotspot);
      const hitArea = this.createHitArea(hotspot, bounds);
      const marker = this.createMarker(hotspot, bounds);

      this.overlay.appendChild(polygon);
      this.hitAreas.append(hitArea, marker);

      gsap.fromTo(polygon, { opacity: 0 }, { opacity: 1, duration: 0.24, delay: 0.06 * index });
      gsap.fromTo(marker, { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.28, delay: 0.08 + 0.06 * index });
    });

    this.syncActiveSystemState();
  }

  private createPolygon(hotspot: HotspotData): SVGPolygonElement {
    const polygon = document.createElementNS(SVG_NS, "polygon");
    const points = hotspot.polygon.map(([x, y]) => `${x},${y}`).join(" ");
    polygon.setAttribute("points", points);
    polygon.setAttribute("class", "house-viewer__hotspot");
    polygon.dataset.systemId = hotspot.systemId;
    return polygon;
  }

  private createHitArea(hotspot: HotspotData, bounds: HotspotBounds): HTMLButtonElement {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "house-viewer__hit-area";
    button.dataset.systemId = hotspot.systemId;
    button.style.left = `${bounds.left}%`;
    button.style.top = `${bounds.top}%`;
    button.style.width = `${bounds.width}%`;
    button.style.height = `${bounds.height}%`;
    button.tabIndex = -1;
    button.setAttribute("aria-hidden", "true");

    const highlight = () => this.setHoveredState(hotspot.systemId, true);
    const unhighlight = () => this.setHoveredState(hotspot.systemId, false);

    button.addEventListener("mouseenter", highlight);
    button.addEventListener("mouseleave", unhighlight);
    button.addEventListener("click", () => {
      const marker = this.markerFor(hotspot.systemId);
      this.openPanel(hotspot, marker ?? button, hotspot.systemId);
    });

    return button;
  }

  private createMarker(hotspot: HotspotData, bounds: HotspotBounds): HTMLButtonElement {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "house-viewer__marker";
    button.dataset.systemId = hotspot.systemId;
    button.style.left = `${bounds.centerX}%`;
    button.style.top = `${bounds.centerY}%`;
    button.setAttribute("aria-label", `${hotspot.name} – pokaż szczegóły`);

    const highlight = () => this.setHoveredState(hotspot.systemId, true);
    const unhighlight = () => this.setHoveredState(hotspot.systemId, false);

    button.addEventListener("mouseenter", highlight);
    button.addEventListener("mouseleave", unhighlight);
    button.addEventListener("focus", highlight);
    button.addEventListener("blur", unhighlight);
    button.addEventListener("click", () => this.openPanel(hotspot, button, hotspot.systemId));

    return button;
  }

  private getBounds(hotspot: HotspotData): HotspotBounds {
    const xs = hotspot.polygon.map(([x]) => x);
    const ys = hotspot.polygon.map(([, y]) => y);
    const left = Math.min(...xs);
    const top = Math.min(...ys);
    const width = Math.max(...xs) - left;
    const height = Math.max(...ys) - top;

    return {
      left,
      top,
      width,
      height,
      centerX: left + width / 2,
      centerY: top + height / 2,
    };
  }

  private setHoveredState(systemId: string, hovered: boolean): void {
    this.markerFor(systemId)?.classList.toggle("is-hovered", hovered);
    this.polygonFor(systemId)?.classList.toggle("is-hovered", hovered);
  }

  private openPanel(content: PanelContent, trigger: HTMLElement, systemId: string | null): void {
    this.lastFocused = trigger;
    this.activeSystemId = systemId;

    this.panelTitle.textContent = content.name;
    this.panelDescription.textContent = content.description;
    this.panelAdvantages.innerHTML = "";
    content.advantages.forEach((advantage) => {
      const li = document.createElement("li");
      li.textContent = advantage;
      this.panelAdvantages.appendChild(li);
    });

    this.syncActiveSystemState();
    this.panel.hidden = false;
    this.layout.classList.add("is-panel-open");

    gsap.killTweensOf(this.panel);
    gsap.killTweensOf(this.connector);
    requestAnimationFrame(() => {
      this.updateConnector();
      gsap.fromTo(
        this.panel,
        { autoAlpha: 0, x: 28 },
        { autoAlpha: 1, x: 0, duration: 0.32, ease: "power2.out" }
      );
      if (!this.isConnectorHidden()) {
        gsap.fromTo(this.connector, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.22, ease: "power1.out" });
      }
      this.scheduleConnectorRefresh();
    });

    this.panelClose.focus();
  }

  private scheduleConnectorRefresh(): void {
    this.connectorRefreshTween?.kill();
    this.connectorRefreshTween = gsap.to({}, { duration: 0.4, onUpdate: () => this.updateConnector() });
  }

  private isConnectorHidden(): boolean {
    return this.connector.hasAttribute("hidden");
  }

  private setConnectorHidden(hidden: boolean): void {
    if (hidden) {
      this.connector.setAttribute("hidden", "");
      return;
    }

    this.connector.removeAttribute("hidden");
  }

  private syncActiveSystemState(): void {
    this.systemButtons.forEach((button) => {
      const active = button.dataset.systemId === this.activeSystemId;
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });

    this.overlay.querySelectorAll<SVGPolygonElement>(".house-viewer__hotspot").forEach((polygon) => {
      polygon.classList.toggle("is-active", polygon.dataset.systemId === this.activeSystemId);
    });

    this.hitAreas.querySelectorAll<HTMLButtonElement>(".house-viewer__marker").forEach((marker) => {
      marker.classList.toggle("is-active", marker.dataset.systemId === this.activeSystemId);
    });

    this.activePulseTween?.kill();
    this.activePulseTween = null;

    if (!this.activeSystemId) {
      this.setConnectorHidden(true);
      return;
    }

    const marker = this.markerFor(this.activeSystemId);
    if (!marker) {
      this.setConnectorHidden(true);
      return;
    }

    this.activePulseTween = gsap.to(marker, {
      scale: 1.18,
      duration: 0.85,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  }

  private updateConnector(): void {
    if (this.panel.hidden || !this.activeSystemId) {
      this.setConnectorHidden(true);
      return;
    }

    const marker = this.markerFor(this.activeSystemId);
    if (!marker) {
      this.setConnectorHidden(true);
      return;
    }

    const layoutRect = this.layout.getBoundingClientRect();
    const stageRect = this.stage.getBoundingClientRect();
    const panelRect = this.panel.getBoundingClientRect();
    const markerRect = marker.getBoundingClientRect();

    const panelBelowStage = panelRect.top >= stageRect.bottom - 4;
    if (panelBelowStage) {
      this.setConnectorHidden(true);
      return;
    }

    const startX = markerRect.left + markerRect.width / 2 - layoutRect.left;
    const startY = markerRect.top + markerRect.height / 2 - layoutRect.top;
    const endX = panelRect.left - layoutRect.left + 10;
    const markerAlignedY = markerRect.top + markerRect.height / 2 - panelRect.top;
    const endY = panelRect.top - layoutRect.top + Math.max(34, Math.min(markerAlignedY, panelRect.height - 34));

    if (endX <= startX + 20) {
      this.setConnectorHidden(true);
      return;
    }

    const distance = endX - startX;
    const control1X = startX + Math.max(30, distance * 0.35);
    const control2X = endX - Math.max(26, distance * 0.26);
    const path = `M ${startX} ${startY} C ${control1X} ${startY}, ${control2X} ${endY}, ${endX} ${endY}`;

    this.connector.setAttribute("viewBox", `0 0 ${layoutRect.width} ${layoutRect.height}`);
    this.connectorPath.setAttribute("d", path);
    this.connectorPath.setAttribute("marker-end", "url(#house-viewer-connector-arrow)");
    this.setConnectorHidden(false);
  }

  private closePanel(restoreFocus = true): void {
    if (this.panel.hidden) return;

    this.activeSystemId = null;
    this.syncActiveSystemState();
    this.connectorRefreshTween?.kill();
    this.connectorRefreshTween = null;

    gsap.killTweensOf(this.panel);
    gsap.killTweensOf(this.connector);
    gsap.to(this.panel, { autoAlpha: 0, x: 20, duration: 0.18, ease: "power1.in" });
    gsap.to(this.connector, {
      autoAlpha: 0,
      duration: 0.18,
      ease: "power1.in",
      onComplete: () => {
        this.panel.hidden = true;
        this.setConnectorHidden(true);
        this.layout.classList.remove("is-panel-open");
        gsap.set(this.panel, { clearProps: "opacity,visibility,transform" });
        gsap.set(this.connector, { clearProps: "opacity,visibility,transform" });
        if (restoreFocus) {
          this.lastFocused?.focus();
        }
      },
    });
  }
}
