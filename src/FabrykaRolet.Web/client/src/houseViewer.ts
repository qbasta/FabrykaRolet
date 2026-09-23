import gsap from "gsap";
import type { HotspotData, HouseViewData, HouseViewerData, SystemSummary } from "./types";

const PANEL_ANIMATION_DURATION = 0.32;
const PANEL_FADE_OUT_DURATION = 0.2;
const VIEW_FADE_DURATION = 0.18;
const LAYOUT_TRANSITION_MS = 420;
const DESKTOP_MEDIA_QUERY = "(min-width: 901px)";
const CONNECTOR_MARGIN = 10;

type PanelContent = { name: string; description: string; advantages: string[] };
type HotspotLookup = { viewIndex: number; hotspot: HotspotData };

export class HouseViewer {
  private readonly layout: HTMLElement;
  private readonly stage: HTMLElement;
  private readonly img: HTMLImageElement;
  private readonly markersLayer: HTMLElement;
  private readonly connector: SVGSVGElement;
  private readonly connectorPath: SVGPathElement;
  private readonly panel: HTMLElement;
  private readonly panelClose: HTMLButtonElement;
  private readonly panelTitle: HTMLElement;
  private readonly panelDescription: HTMLElement;
  private readonly panelAdvantages: HTMLElement;
  private readonly panelLink: HTMLAnchorElement;
  private readonly availability: HTMLElement | null;
  private readonly panelStatus: HTMLElement | null;
  private readonly prevBtn: HTMLButtonElement | null;
  private readonly nextBtn: HTMLButtonElement | null;
  private readonly viewsNav: HTMLElement | null;
  private readonly systemButtons: HTMLButtonElement[];
  private readonly allowedImagePaths: Map<string, string>;
  private readonly listenerController = new AbortController();
  private readonly hotspotIndex = new Map<string, HotspotLookup[]>();

  private currentIndex = 0;
  private activeSystemId: string | null = null;
  private lastFocused: HTMLElement | null = null;
  private disconnectObserver: MutationObserver | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private panelTween: gsap.core.Tween | null = null;
  private connectorTween: gsap.core.Tween | null = null;
  private viewTween: gsap.core.Tween | null = null;
  private connectorFrame: number | null = null;
  private connectorRefreshUntil = 0;
  private isClosingPanel = false;

  constructor(
    private readonly root: HTMLElement,
    private readonly data: HouseViewerData
  ) {
    this.layout = this.require(".house-viewer__layout");
    this.stage = this.require(".house-viewer__stage");
    this.img = this.require(".house-viewer__image");
    this.markersLayer = this.require(".house-viewer__markers");
    this.connector = this.require(".house-viewer__connector");
    this.connectorPath = this.require(".house-viewer__connector-path");
    this.panel = this.require("#house-viewer-panel");
    this.panelClose = this.require(".house-viewer__panel-close");
    this.panelTitle = this.require("#house-viewer-panel-title");
    this.panelDescription = this.require("#house-viewer-panel-description");
    this.panelAdvantages = this.require("#house-viewer-panel-advantages");
    this.panelLink = this.require("#house-viewer-panel-link");
    this.availability = root.querySelector("#house-viewer-availability");
    this.panelStatus = root.querySelector("#house-viewer-status");
    this.prevBtn = root.querySelector(".house-viewer__arrow--prev");
    this.nextBtn = root.querySelector(".house-viewer__arrow--next");
    this.viewsNav = root.querySelector(".house-viewer__views");
    this.systemButtons = this.collectSystemButtons();
    this.allowedImagePaths = new Map(data.views.map((view) => [view.image, this.normalizeImageUrl(view.image)]));

    this.indexHotspots();
    this.bindNav();
    this.bindPanelClose();
    this.bindSystemButtons();
    this.bindGlobalEvents();
    this.renderView(0);
  }

  private require<T extends Element>(selector: string): T {
    const el = this.root.querySelector<T>(selector);
    if (!el) {
      throw new Error(`HouseViewer: brak elementu "${selector}" w kontenerze.`);
    }
    return el;
  }

  private indexHotspots(): void {
    this.data.views.forEach((view, viewIndex) => {
      view.hotspots.forEach((hotspot) => {
        const entries = this.hotspotIndex.get(hotspot.systemId) ?? [];
        entries.push({ viewIndex, hotspot });
        this.hotspotIndex.set(hotspot.systemId, entries);
      });
    });
  }

  private bindNav(): void {
    const listenerOptions = { signal: this.listenerController.signal };
    const hasMultipleViews = this.data.views.length > 1;

    if (this.prevBtn) {
      this.prevBtn.hidden = !hasMultipleViews;
      this.prevBtn.addEventListener("click", () => this.step(-1), listenerOptions);
    }

    if (this.nextBtn) {
      this.nextBtn.hidden = !hasMultipleViews;
      this.nextBtn.addEventListener("click", () => this.step(1), listenerOptions);
    }

    if (this.viewsNav) {
      this.viewsNav.replaceChildren();
      this.data.views.forEach((view, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "house-viewer__view-btn";
        button.textContent = view.title;
        button.setAttribute("aria-pressed", index === this.currentIndex ? "true" : "false");
        button.addEventListener("click", () => this.renderView(index), listenerOptions);
        this.viewsNav?.appendChild(button);
      });
    }

    this.root.addEventListener(
      "keydown",
      (event) => {
        if (this.shouldIgnoreViewNavigationKey(event)) return;
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          this.step(-1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          this.step(1);
        }
      },
      listenerOptions
    );
  }

  private shouldIgnoreViewNavigationKey(event: KeyboardEvent): boolean {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return true;
    const target = event.target as HTMLElement | null;
    if (!target) return false;
    if (this.panel.contains(target)) return true;
    return !!target.closest("button, input, select, textarea, a, summary");
  }

  private bindPanelClose(): void {
    const listenerOptions = { signal: this.listenerController.signal };
    this.panelClose.addEventListener("click", () => this.closePanel(), listenerOptions);

    document.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Escape" && !this.panel.hidden) this.closePanel();
      },
      listenerOptions
    );

    document.addEventListener(
      "click",
      (event) => {
        if (this.panel.hidden) return;
        const target = event.target as HTMLElement | null;
        if (!target || this.panel.contains(target)) return;
        if (target.closest(".house-viewer__marker, .system-button")) return;
        this.closePanel();
      },
      listenerOptions
    );
  }

  private bindSystemButtons(): void {
    const listenerOptions = { signal: this.listenerController.signal };
    this.systemButtons.forEach((button) => {
      const systemId = button.dataset.systemId;
      if (!systemId) return;
      button.addEventListener("click", () => this.activateSystem(systemId, button), listenerOptions);
    });
  }

  private bindGlobalEvents(): void {
    const listenerOptions = { signal: this.listenerController.signal };
    window.addEventListener(
      "resize",
      () => {
        this.syncLayoutMetrics();
        this.scheduleConnectorRefresh();
      },
      listenerOptions
    );

    this.img.addEventListener(
      "load",
      () => {
        this.syncLayoutMetrics();
        this.scheduleConnectorRefresh();
      },
      listenerOptions
    );

    if ("ResizeObserver" in window) {
      this.resizeObserver = new ResizeObserver(() => {
        this.syncLayoutMetrics();
        this.updateConnector();
      });
      this.resizeObserver.observe(this.stage);
      this.resizeObserver.observe(this.panel);
    }

    this.observeDisconnect();
  }

  private observeDisconnect(): void {
    if (!document.body) return;
    this.disconnectObserver = new MutationObserver(() => {
      if (!this.root.isConnected) this.destroy();
    });
    this.disconnectObserver.observe(document.body, { childList: true, subtree: true });
  }

  private destroy(): void {
    this.listenerController.abort();
    this.disconnectObserver?.disconnect();
    this.disconnectObserver = null;
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    this.cancelConnectorRefresh();
    this.panelTween?.kill();
    this.connectorTween?.kill();
    this.viewTween?.kill();
  }

  private collectSystemButtons(): HTMLButtonElement[] {
    const selector = this.root.dataset.systemButtons;
    if (!selector) return [];
    const container = document.querySelector<HTMLElement>(selector);
    if (!container) return [];
    return Array.from(container.querySelectorAll<HTMLButtonElement>(".system-button[data-system-id]"));
  }

  private findHotspot(systemId: string): HotspotLookup | null {
    const entries = this.hotspotIndex.get(systemId);
    if (!entries?.length) return null;
    return entries.find((entry) => entry.viewIndex === this.currentIndex) ?? entries[0];
  }

  private findSystemSummary(systemId: string): SystemSummary | undefined {
    return this.data.systems.find((item) => item.systemId === systemId);
  }

  private buildSystemsPageUrl(systemId: string): string {
    const url = new URL("/Systemy", window.location.origin);
    if (this.root.dataset.adminPreview === "true" || document.body.dataset.adminPreview === "true") {
      url.searchParams.set("adminPreview", "1");
    }

    return `${url.pathname}${url.search}#${encodeURIComponent(systemId)}`;
  }

  private activateSystem(systemId: string, trigger: HTMLElement): void {
    const found = this.findHotspot(systemId);
    if (!found) {
      const summary = this.findSystemSummary(systemId);
      if (summary) this.openPanel(summary, trigger, systemId);
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
    return this.markersLayer.querySelector<HTMLButtonElement>(
      `.house-viewer__marker[data-system-id="${CSS.escape(systemId)}"]`
    );
  }

  private step(delta: number): void {
    const count = this.data.views.length;
    const next = (this.currentIndex + delta + count) % count;
    this.renderView(next);
  }

  private renderView(index: number, onDone?: () => void): void {
    const isFirstRender = !this.img.src;
    const fadeNodes = [this.img, this.markersLayer];

    const applyView = () => {
      this.currentIndex = index;
      const view = this.data.views[index];
      this.img.src = this.resolveImageUrl(view.image);
      this.img.alt = view.title;
      this.buildMarkers(view);
      this.syncViewButtons();
      this.syncVisibleSystems(view);
      this.syncLayoutMetrics();
      this.viewTween?.kill();
      this.viewTween = gsap.fromTo(
        fadeNodes,
        { opacity: 0 },
        {
          opacity: 1,
          duration: VIEW_FADE_DURATION,
          ease: "power1.in",
          onComplete: () => {
            this.viewTween = null;
            onDone?.();
          },
        }
      );
    };

    this.viewTween?.kill();
    gsap.killTweensOf(fadeNodes);

    if (!isFirstRender) this.closePanel(false, false);

    if (isFirstRender) {
      applyView();
      return;
    }

    this.viewTween = gsap.to(fadeNodes, {
      opacity: 0,
      duration: VIEW_FADE_DURATION,
      ease: "power1.in",
      onComplete: applyView,
    });
  }

  private syncViewButtons(): void {
    if (!this.viewsNav) return;
    const buttons = Array.from(this.viewsNav.querySelectorAll<HTMLButtonElement>(".house-viewer__view-btn"));
    buttons.forEach((button, index) => {
      const active = index === this.currentIndex;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  private syncVisibleSystems(view: HouseViewData): void {
    const visibleIds = new Set(view.hotspots.map((hotspot) => hotspot.systemId));

    this.systemButtons.forEach((button) => {
      const visible = visibleIds.has(button.dataset.systemId ?? "");
      button.classList.toggle("is-visible-in-view", visible);
      if (visible) button.setAttribute("data-visible-in-view", "true");
      else button.removeAttribute("data-visible-in-view");
    });

    if (!this.availability) return;
    const visibleNames = view.hotspots.map((hotspot) => hotspot.name);
    this.availability.textContent = visibleNames.length > 0
      ? `Widoczne na tym widoku: ${visibleNames.join(", ")}`
      : "Widoczne na tym widoku: brak aktywnych systemów.";
  }

  /**
   * Jeden element na hotspot: widoczna kropka, która JEST jednocześnie celem kliknięcia
   * (poprzednio: prawie niewidoczny wielokąt SVG + osobny niewidoczny przycisk-hitbox +
   * kropka, wszystkie trzy nasłuchujące tych samych zdarzeń - bez uzasadnienia, odkąd
   * mechanizm przeszedł z obszarów na punkty).
   */
  private buildMarkers(view: HouseViewData): void {
    this.markersLayer.replaceChildren();
    view.hotspots.forEach((hotspot, index) => {
      const marker = this.createMarker(hotspot);
      this.markersLayer.appendChild(marker);
      gsap.fromTo(
        marker,
        { autoAlpha: 0, scale: 0.8 },
        { autoAlpha: 1, scale: 1, duration: 0.2, delay: 0.03 * index, ease: "back.out(1.5)" }
      );
    });
    this.syncActiveSystemState();
  }

  private createMarker(hotspot: HotspotData): HTMLButtonElement {
    const listenerOptions = { signal: this.listenerController.signal };
    const button = document.createElement("button");
    button.type = "button";
    button.className = "house-viewer__marker";
    button.dataset.systemId = hotspot.systemId;
    button.style.left = `${hotspot.x}%`;
    button.style.top = `${hotspot.y}%`;
    button.setAttribute("aria-label", `${hotspot.name} – pokaż szczegóły`);

    const dot = document.createElement("span");
    dot.className = "house-viewer__marker-dot";
    dot.setAttribute("aria-hidden", "true");
    button.appendChild(dot);

    button.addEventListener("mouseenter", () => this.setHoveredState(hotspot.systemId, true), listenerOptions);
    button.addEventListener("mouseleave", () => this.setHoveredState(hotspot.systemId, false), listenerOptions);
    button.addEventListener("focus", () => this.setHoveredState(hotspot.systemId, true), listenerOptions);
    button.addEventListener("blur", () => this.setHoveredState(hotspot.systemId, false), listenerOptions);
    button.addEventListener("click", () => this.openPanel(hotspot, button, hotspot.systemId), listenerOptions);

    return button;
  }

  private setHoveredState(systemId: string, hovered: boolean): void {
    this.markerFor(systemId)?.classList.toggle("is-hovered", hovered);
  }

  private openPanel(content: PanelContent, trigger: HTMLElement, systemId: string): void {
    this.cancelConnectorRefresh();
    this.killOpenCloseTweens();
    this.isClosingPanel = false;
    this.lastFocused = trigger;
    this.activeSystemId = systemId;

    this.panelTitle.textContent = content.name;
    this.panelDescription.textContent = content.description;
    this.panelAdvantages.replaceChildren();
    content.advantages.forEach((advantage) => {
      const item = document.createElement("li");
      item.textContent = advantage;
      this.panelAdvantages.appendChild(item);
    });
    this.panelLink.href = this.buildSystemsPageUrl(systemId);

    this.panel.hidden = false;
    this.panel.setAttribute("aria-hidden", "false");
    this.layout.classList.add("is-panel-open");
    this.syncActiveSystemState();
    this.syncLayoutMetrics();

    const marker = this.markerFor(systemId);
    if (marker) {
      gsap.fromTo(marker, { scale: 1 }, { scale: 1.14, duration: 0.13, repeat: 1, yoyo: true, ease: "power1.out", overwrite: true });
    }

    this.panelTween = gsap.fromTo(
      this.panel,
      { autoAlpha: 0, x: this.isDesktopViewport() ? 28 : 0, y: this.isDesktopViewport() ? 0 : 14 },
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        duration: PANEL_ANIMATION_DURATION,
        ease: "power2.out",
        overwrite: true,
        onComplete: () => {
          this.panelTween = null;
        },
      }
    );

    if (this.shouldMoveFocusIntoPanel(trigger)) {
      this.panelClose.focus({ preventScroll: true });
    } else {
      this.announcePanelOpen(content.name);
    }

    this.scheduleConnectorRefresh();
  }

  private resolveImageUrl(url: string): string {
    const safeUrl = this.allowedImagePaths.get(url);
    if (!safeUrl) throw new Error(`HouseViewer: nieobsługiwany adres obrazu "${url}".`);
    return safeUrl;
  }

  private normalizeImageUrl(url: string): string {
    const match = /^\/images\/[a-z0-9/_-]+\.(png|jpe?g|webp)$/i.exec(url);
    if (!match) throw new Error(`HouseViewer: nieobsługiwany adres obrazu "${url}".`);
    return match[0];
  }

  private shouldMoveFocusIntoPanel(trigger: HTMLElement): boolean {
    return trigger.matches(":focus-visible");
  }

  private announcePanelOpen(name: string): void {
    if (!this.panelStatus) return;
    this.panelStatus.textContent = `${name} – szczegóły otwarte.`;
  }

  private killOpenCloseTweens(): void {
    this.panelTween?.kill();
    this.panelTween = null;
    this.connectorTween?.kill();
    this.connectorTween = null;
    gsap.killTweensOf(this.panel);
    gsap.killTweensOf(this.connector);
  }

  private scheduleConnectorRefresh(): void {
    this.cancelConnectorRefresh();
    this.connectorRefreshUntil = performance.now() + LAYOUT_TRANSITION_MS;

    const tick = (now: number) => {
      this.updateConnector();
      if (now < this.connectorRefreshUntil) {
        this.connectorFrame = window.requestAnimationFrame(tick);
        return;
      }
      this.connectorFrame = null;
    };

    this.connectorFrame = window.requestAnimationFrame(tick);
  }

  private cancelConnectorRefresh(): void {
    if (this.connectorFrame !== null) {
      window.cancelAnimationFrame(this.connectorFrame);
      this.connectorFrame = null;
    }
  }

  private syncActiveSystemState(): void {
    this.systemButtons.forEach((button) => {
      const active = button.dataset.systemId === this.activeSystemId;
      button.setAttribute("aria-pressed", active ? "true" : "false");
      button.classList.toggle("is-active", active);
    });

    this.markersLayer.querySelectorAll<HTMLButtonElement>(".house-viewer__marker").forEach((marker) => {
      marker.classList.toggle("is-active", marker.dataset.systemId === this.activeSystemId);
    });

    if (!this.activeSystemId || !this.markerFor(this.activeSystemId)) {
      this.setConnectorHidden(true);
    }
  }

  /**
   * Rysuje linię łączącą marker z panelem. Celowo BEZ nadmiernie zachowawczej logiki
   * (wykrywanie kolizji z innymi markerami, progi minimalnej odległości itd.) - jeśli
   * panel jest otwarty na desktopie i marker istnieje, strzałka się pokazuje. Jedyne
   * warunki ukrycia: układ mobilny (panel pod obrazem, nie obok) albo panel/marker
   * faktycznie nie istnieją.
   */
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

    const panelBelowStage = panelRect.top >= stageRect.bottom - 2;
    if (!this.isDesktopViewport() || panelBelowStage) {
      this.panel.classList.add("is-stacked");
      this.setConnectorHidden(true);
      return;
    }
    this.panel.classList.remove("is-stacked");

    const startX = markerRect.left + markerRect.width / 2 - layoutRect.left;
    const startY = markerRect.top + markerRect.height / 2 - layoutRect.top;
    const stageRight = stageRect.right - layoutRect.left;
    const panelLeft = panelRect.left - layoutRect.left;

    if (panelLeft <= stageRight + CONNECTOR_MARGIN) {
      this.setConnectorHidden(true);
      return;
    }

    const midX = stageRight + (panelLeft - stageRight) / 2;
    const path = `M ${startX} ${startY} L ${midX} ${startY} L ${panelLeft} ${startY}`;

    this.connector.setAttribute("viewBox", `0 0 ${layoutRect.width} ${layoutRect.height}`);
    this.connectorPath.setAttribute("d", path);
    this.setConnectorHidden(false);
  }

  private isDesktopViewport(): boolean {
    return window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
  }

  private syncLayoutMetrics(): void {
    if (!this.isDesktopViewport() || this.stage.offsetHeight === 0) {
      this.root.style.removeProperty("--house-viewer-stage-height");
      return;
    }
    const stageHeight = `${Math.round(this.stage.getBoundingClientRect().height)}px`;
    this.root.style.setProperty("--house-viewer-stage-height", stageHeight);
  }

  private setConnectorHidden(hidden: boolean): void {
    if (hidden) this.connector.setAttribute("hidden", "");
    else this.connector.removeAttribute("hidden");
  }

  private closePanel(restoreFocus = true, animate = true): void {
    if (this.panel.hidden || this.isClosingPanel) return;

    this.cancelConnectorRefresh();
    this.killOpenCloseTweens();
    this.activeSystemId = null;
    this.syncActiveSystemState();

    if (!animate) {
      this.finishClosePanel(restoreFocus);
      return;
    }

    this.isClosingPanel = true;
    this.connectorTween = gsap.to(this.connector, {
      autoAlpha: 0,
      duration: 0.12,
      ease: "power1.out",
      overwrite: true,
      onComplete: () => {
        this.connectorTween = null;
      },
    });

    this.panelTween = gsap.to(this.panel, {
      autoAlpha: 0,
      x: this.isDesktopViewport() ? 20 : 0,
      y: this.isDesktopViewport() ? 0 : 10,
      duration: PANEL_FADE_OUT_DURATION,
      ease: "power1.out",
      overwrite: true,
      onComplete: () => {
        this.panelTween = null;
        this.finishClosePanel(restoreFocus);
      },
    });
  }

  private finishClosePanel(restoreFocus: boolean): void {
    this.isClosingPanel = false;
    this.layout.classList.remove("is-panel-open");
    this.panel.hidden = true;
    this.panel.setAttribute("aria-hidden", "true");
    this.panel.classList.remove("is-stacked");
    this.setConnectorHidden(true);
    gsap.set(this.panel, { clearProps: "opacity,visibility,transform" });
    gsap.set(this.connector, { clearProps: "opacity,visibility,transform" });
    if (restoreFocus) this.lastFocused?.focus();
    this.syncLayoutMetrics();
  }
}
