var y = Object.defineProperty;
var f = (a, e, t) => e in a ? y(a, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[e] = t;
var n = (a, e, t) => f(a, typeof e != "symbol" ? e + "" : e, t);
import { g as o } from "./index-9nJrthwM.js";
const g = 0.32, b = 0.2, p = 0.18, k = 420, C = "(min-width: 901px)", S = 10;
class I {
  constructor(e, t) {
    n(this, "layout");
    n(this, "stage");
    n(this, "img");
    n(this, "markersLayer");
    n(this, "connector");
    n(this, "connectorPath");
    n(this, "panel");
    n(this, "panelClose");
    n(this, "panelTitle");
    n(this, "panelDescription");
    n(this, "panelLink");
    n(this, "availability");
    n(this, "panelStatus");
    n(this, "prevBtn");
    n(this, "nextBtn");
    n(this, "viewsNav");
    n(this, "systemButtons");
    n(this, "allowedImagePaths");
    n(this, "listenerController", new AbortController());
    n(this, "hotspotIndex", /* @__PURE__ */ new Map());
    n(this, "currentIndex", 0);
    n(this, "activeSystemId", null);
    n(this, "lastFocused", null);
    n(this, "disconnectObserver", null);
    n(this, "resizeObserver", null);
    n(this, "panelTween", null);
    n(this, "connectorTween", null);
    n(this, "viewTween", null);
    n(this, "connectorFrame", null);
    n(this, "connectorRefreshUntil", 0);
    n(this, "isClosingPanel", !1);
    this.root = e, this.data = t, this.layout = this.require(".house-viewer__layout"), this.stage = this.require(".house-viewer__stage"), this.img = this.require(".house-viewer__image"), this.markersLayer = this.require(".house-viewer__markers"), this.connector = this.require(".house-viewer__connector"), this.connectorPath = this.require(".house-viewer__connector-path"), this.panel = this.require("#house-viewer-panel"), this.panelClose = this.require(".house-viewer__panel-close"), this.panelTitle = this.require("#house-viewer-panel-title"), this.panelDescription = this.require("#house-viewer-panel-description"), this.panelLink = this.require("#house-viewer-panel-link"), this.availability = e.querySelector("#house-viewer-availability"), this.panelStatus = e.querySelector("#house-viewer-status"), this.prevBtn = e.querySelector(".house-viewer__arrow--prev"), this.nextBtn = e.querySelector(".house-viewer__arrow--next"), this.viewsNav = e.querySelector(".house-viewer__views"), this.systemButtons = this.collectSystemButtons(), this.allowedImagePaths = new Map(t.views.map((s) => [s.image, this.normalizeImageUrl(s.image)])), this.indexHotspots(), this.bindNav(), this.bindPanelClose(), this.bindSystemButtons(), this.bindGlobalEvents(), this.renderView(0);
  }
  require(e) {
    const t = this.root.querySelector(e);
    if (!t)
      throw new Error(`HouseViewer: brak elementu "${e}" w kontenerze.`);
    return t;
  }
  indexHotspots() {
    this.data.views.forEach((e, t) => {
      e.hotspots.forEach((s) => {
        const i = this.hotspotIndex.get(s.systemId) ?? [];
        i.push({ viewIndex: t, hotspot: s }), this.hotspotIndex.set(s.systemId, i);
      });
    });
  }
  bindNav() {
    const e = { signal: this.listenerController.signal }, t = this.data.views.length > 1;
    this.prevBtn && (this.prevBtn.hidden = !t, this.prevBtn.addEventListener("click", () => this.step(-1), e)), this.nextBtn && (this.nextBtn.hidden = !t, this.nextBtn.addEventListener("click", () => this.step(1), e)), this.viewsNav && (this.viewsNav.replaceChildren(), this.data.views.forEach((s, i) => {
      var l;
      const r = document.createElement("button");
      r.type = "button", r.className = "house-viewer__view-btn", r.textContent = s.title, r.setAttribute("aria-pressed", i === this.currentIndex ? "true" : "false"), r.addEventListener("click", () => this.renderView(i), e), (l = this.viewsNav) == null || l.appendChild(r);
    })), this.root.addEventListener(
      "keydown",
      (s) => {
        this.shouldIgnoreViewNavigationKey(s) || (s.key === "ArrowLeft" && (s.preventDefault(), this.step(-1)), s.key === "ArrowRight" && (s.preventDefault(), this.step(1)));
      },
      e
    );
  }
  shouldIgnoreViewNavigationKey(e) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return !0;
    const t = e.target;
    return t ? this.panel.contains(t) ? !0 : !!t.closest("button, input, select, textarea, a, summary") : !1;
  }
  bindPanelClose() {
    const e = { signal: this.listenerController.signal };
    this.panelClose.addEventListener("click", () => this.closePanel(), e), document.addEventListener(
      "keydown",
      (t) => {
        t.key === "Escape" && !this.panel.hidden && this.closePanel();
      },
      e
    ), document.addEventListener(
      "click",
      (t) => {
        if (this.panel.hidden) return;
        const s = t.target;
        !s || this.panel.contains(s) || s.closest(".house-viewer__marker, .system-button") || this.closePanel();
      },
      e
    );
  }
  bindSystemButtons() {
    const e = { signal: this.listenerController.signal };
    this.systemButtons.forEach((t) => {
      const s = t.dataset.systemId;
      s && t.addEventListener("click", () => this.activateSystem(s, t), e);
    });
  }
  bindGlobalEvents() {
    const e = { signal: this.listenerController.signal };
    window.addEventListener(
      "resize",
      () => {
        this.syncLayoutMetrics(), this.scheduleConnectorRefresh();
      },
      e
    ), this.img.addEventListener(
      "load",
      () => {
        this.syncLayoutMetrics(), this.scheduleConnectorRefresh();
      },
      e
    ), "ResizeObserver" in window && (this.resizeObserver = new ResizeObserver(() => {
      this.syncLayoutMetrics(), this.updateConnector();
    }), this.resizeObserver.observe(this.stage), this.resizeObserver.observe(this.panel)), this.observeDisconnect();
  }
  observeDisconnect() {
    document.body && (this.disconnectObserver = new MutationObserver(() => {
      this.root.isConnected || this.destroy();
    }), this.disconnectObserver.observe(document.body, { childList: !0, subtree: !0 }));
  }
  destroy() {
    var e, t, s, i, r;
    this.listenerController.abort(), (e = this.disconnectObserver) == null || e.disconnect(), this.disconnectObserver = null, (t = this.resizeObserver) == null || t.disconnect(), this.resizeObserver = null, this.cancelConnectorRefresh(), (s = this.panelTween) == null || s.kill(), (i = this.connectorTween) == null || i.kill(), (r = this.viewTween) == null || r.kill();
  }
  collectSystemButtons() {
    const e = this.root.dataset.systemButtons;
    if (!e) return [];
    const t = document.querySelector(e);
    return t ? Array.from(t.querySelectorAll(".system-button[data-system-id]")) : [];
  }
  findHotspot(e) {
    const t = this.hotspotIndex.get(e);
    return t != null && t.length ? t.find((s) => s.viewIndex === this.currentIndex) ?? t[0] : null;
  }
  findSystemSummary(e) {
    return this.data.systems.find((t) => t.systemId === e);
  }
  activateSystem(e, t) {
    const s = this.findHotspot(e);
    if (!s) {
      const r = this.findSystemSummary(e);
      r && this.openPanel(r, t, e);
      return;
    }
    const i = () => {
      const r = this.markerFor(e);
      this.openPanel(s.hotspot, r ?? t, e);
    };
    if (s.viewIndex === this.currentIndex) {
      i();
      return;
    }
    this.renderView(s.viewIndex, i);
  }
  markerFor(e) {
    return this.markersLayer.querySelector(
      `.house-viewer__marker[data-system-id="${CSS.escape(e)}"]`
    );
  }
  step(e) {
    const t = this.data.views.length, s = (this.currentIndex + e + t) % t;
    this.renderView(s);
  }
  renderView(e, t) {
    var l;
    const s = !this.img.src, i = [this.img, this.markersLayer], r = () => {
      var c;
      this.currentIndex = e;
      const h = this.data.views[e];
      this.img.src = this.resolveImageUrl(h.image), this.img.alt = h.title, this.buildMarkers(h), this.syncViewButtons(), this.syncVisibleSystems(h), this.syncLayoutMetrics(), (c = this.viewTween) == null || c.kill(), this.viewTween = o.fromTo(
        i,
        { opacity: 0 },
        {
          opacity: 1,
          duration: p,
          ease: "power1.in",
          onComplete: () => {
            this.viewTween = null, t == null || t();
          }
        }
      );
    };
    if ((l = this.viewTween) == null || l.kill(), o.killTweensOf(i), s || this.closePanel(!1, !1), s) {
      r();
      return;
    }
    this.viewTween = o.to(i, {
      opacity: 0,
      duration: p,
      ease: "power1.in",
      onComplete: r
    });
  }
  syncViewButtons() {
    if (!this.viewsNav) return;
    Array.from(this.viewsNav.querySelectorAll(".house-viewer__view-btn")).forEach((t, s) => {
      const i = s === this.currentIndex;
      t.classList.toggle("is-active", i), t.setAttribute("aria-pressed", i ? "true" : "false");
    });
  }
  syncVisibleSystems(e) {
    const t = new Set(e.hotspots.map((i) => i.systemId));
    if (this.systemButtons.forEach((i) => {
      const r = t.has(i.dataset.systemId ?? "");
      i.classList.toggle("is-visible-in-view", r), r ? i.setAttribute("data-visible-in-view", "true") : i.removeAttribute("data-visible-in-view");
    }), !this.availability) return;
    const s = e.hotspots.map((i) => i.name);
    this.availability.textContent = s.length > 0 ? `Widoczne na tym widoku: ${s.join(", ")}` : "Widoczne na tym widoku: brak aktywnych systemów.";
  }
  /**
   * Jeden element na hotspot: widoczna kropka, która JEST jednocześnie celem kliknięcia
   * (poprzednio: prawie niewidoczny wielokąt SVG + osobny niewidoczny przycisk-hitbox +
   * kropka, wszystkie trzy nasłuchujące tych samych zdarzeń - bez uzasadnienia, odkąd
   * mechanizm przeszedł z obszarów na punkty).
   */
  buildMarkers(e) {
    this.markersLayer.replaceChildren(), e.hotspots.forEach((t, s) => {
      const i = this.createMarker(t);
      this.markersLayer.appendChild(i), o.fromTo(
        i,
        { autoAlpha: 0, scale: 0.8 },
        { autoAlpha: 1, scale: 1, duration: 0.2, delay: 0.03 * s, ease: "back.out(1.5)" }
      );
    }), this.syncActiveSystemState();
  }
  createMarker(e) {
    const t = { signal: this.listenerController.signal }, s = document.createElement("button");
    s.type = "button", s.className = "house-viewer__marker", s.dataset.systemId = e.systemId, s.style.left = `${e.x}%`, s.style.top = `${e.y}%`, s.setAttribute("aria-label", `${e.name} – pokaż szczegóły`);
    const i = document.createElement("span");
    return i.className = "house-viewer__marker-dot", i.setAttribute("aria-hidden", "true"), s.appendChild(i), s.addEventListener("mouseenter", () => this.setHoveredState(e.systemId, !0), t), s.addEventListener("mouseleave", () => this.setHoveredState(e.systemId, !1), t), s.addEventListener("focus", () => this.setHoveredState(e.systemId, !0), t), s.addEventListener("blur", () => this.setHoveredState(e.systemId, !1), t), s.addEventListener("click", () => this.openPanel(e, s, e.systemId), t), s;
  }
  setHoveredState(e, t) {
    var s;
    (s = this.markerFor(e)) == null || s.classList.toggle("is-hovered", t);
  }
  openPanel(e, t, s) {
    this.cancelConnectorRefresh(), this.killOpenCloseTweens(), this.isClosingPanel = !1, this.lastFocused = t, this.activeSystemId = s, this.panelTitle.textContent = e.name, this.panelDescription.textContent = e.description, this.panelLink.href = `/Systemy#${encodeURIComponent(s)}`, this.panel.hidden = !1, this.panel.setAttribute("aria-hidden", "false"), this.layout.classList.add("is-panel-open"), this.syncActiveSystemState(), this.syncLayoutMetrics();
    const i = this.markerFor(s);
    i && o.fromTo(i, { scale: 1 }, { scale: 1.14, duration: 0.13, repeat: 1, yoyo: !0, ease: "power1.out", overwrite: !0 }), this.panelTween = o.fromTo(
      this.panel,
      { autoAlpha: 0, x: this.isDesktopViewport() ? 28 : 0, y: this.isDesktopViewport() ? 0 : 14 },
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        duration: g,
        ease: "power2.out",
        overwrite: !0,
        onComplete: () => {
          this.panelTween = null;
        }
      }
    ), this.shouldMoveFocusIntoPanel(t) ? this.panelClose.focus({ preventScroll: !0 }) : this.announcePanelOpen(e.name), this.scheduleConnectorRefresh();
  }
  resolveImageUrl(e) {
    const t = this.allowedImagePaths.get(e);
    if (!t) throw new Error(`HouseViewer: nieobsługiwany adres obrazu "${e}".`);
    return t;
  }
  normalizeImageUrl(e) {
    const t = /^\/images\/[a-z0-9/_-]+\.(png|jpe?g|webp)$/i.exec(e);
    if (!t) throw new Error(`HouseViewer: nieobsługiwany adres obrazu "${e}".`);
    return t[0];
  }
  shouldMoveFocusIntoPanel(e) {
    return e.matches(":focus-visible");
  }
  announcePanelOpen(e) {
    this.panelStatus && (this.panelStatus.textContent = `${e} – szczegóły otwarte.`);
  }
  killOpenCloseTweens() {
    var e, t;
    (e = this.panelTween) == null || e.kill(), this.panelTween = null, (t = this.connectorTween) == null || t.kill(), this.connectorTween = null, o.killTweensOf(this.panel), o.killTweensOf(this.connector);
  }
  scheduleConnectorRefresh() {
    this.cancelConnectorRefresh(), this.connectorRefreshUntil = performance.now() + k;
    const e = (t) => {
      if (this.updateConnector(), t < this.connectorRefreshUntil) {
        this.connectorFrame = window.requestAnimationFrame(e);
        return;
      }
      this.connectorFrame = null;
    };
    this.connectorFrame = window.requestAnimationFrame(e);
  }
  cancelConnectorRefresh() {
    this.connectorFrame !== null && (window.cancelAnimationFrame(this.connectorFrame), this.connectorFrame = null);
  }
  syncActiveSystemState() {
    this.systemButtons.forEach((e) => {
      const t = e.dataset.systemId === this.activeSystemId;
      e.setAttribute("aria-pressed", t ? "true" : "false"), e.classList.toggle("is-active", t);
    }), this.markersLayer.querySelectorAll(".house-viewer__marker").forEach((e) => {
      e.classList.toggle("is-active", e.dataset.systemId === this.activeSystemId);
    }), (!this.activeSystemId || !this.markerFor(this.activeSystemId)) && this.setConnectorHidden(!0);
  }
  /**
   * Rysuje linię łączącą marker z panelem. Celowo BEZ nadmiernie zachowawczej logiki
   * (wykrywanie kolizji z innymi markerami, progi minimalnej odległości itd.) - jeśli
   * panel jest otwarty na desktopie i marker istnieje, strzałka się pokazuje. Jedyne
   * warunki ukrycia: układ mobilny (panel pod obrazem, nie obok) albo panel/marker
   * faktycznie nie istnieją.
   */
  updateConnector() {
    if (this.panel.hidden || !this.activeSystemId) {
      this.setConnectorHidden(!0);
      return;
    }
    const e = this.markerFor(this.activeSystemId);
    if (!e) {
      this.setConnectorHidden(!0);
      return;
    }
    const t = this.layout.getBoundingClientRect(), s = this.stage.getBoundingClientRect(), i = this.panel.getBoundingClientRect(), r = e.getBoundingClientRect(), l = i.top >= s.bottom - 2;
    if (!this.isDesktopViewport() || l) {
      this.panel.classList.add("is-stacked"), this.setConnectorHidden(!0);
      return;
    }
    this.panel.classList.remove("is-stacked");
    const h = r.left + r.width / 2 - t.left, c = r.top + r.height / 2 - t.top, u = s.right - t.left, d = i.left - t.left;
    if (d <= u + S) {
      this.setConnectorHidden(!0);
      return;
    }
    const w = u + (d - u) / 2, v = `M ${h} ${c} L ${w} ${c} L ${d} ${c}`;
    this.connector.setAttribute("viewBox", `0 0 ${t.width} ${t.height}`), this.connectorPath.setAttribute("d", v), this.setConnectorHidden(!1);
  }
  isDesktopViewport() {
    return window.matchMedia(C).matches;
  }
  syncLayoutMetrics() {
    if (!this.isDesktopViewport() || this.stage.offsetHeight === 0) {
      this.root.style.removeProperty("--house-viewer-stage-height");
      return;
    }
    const e = `${Math.round(this.stage.getBoundingClientRect().height)}px`;
    this.root.style.setProperty("--house-viewer-stage-height", e);
  }
  setConnectorHidden(e) {
    e ? this.connector.setAttribute("hidden", "") : this.connector.removeAttribute("hidden");
  }
  closePanel(e = !0, t = !0) {
    if (!(this.panel.hidden || this.isClosingPanel)) {
      if (this.cancelConnectorRefresh(), this.killOpenCloseTweens(), this.activeSystemId = null, this.syncActiveSystemState(), !t) {
        this.finishClosePanel(e);
        return;
      }
      this.isClosingPanel = !0, this.connectorTween = o.to(this.connector, {
        autoAlpha: 0,
        duration: 0.12,
        ease: "power1.out",
        overwrite: !0,
        onComplete: () => {
          this.connectorTween = null;
        }
      }), this.panelTween = o.to(this.panel, {
        autoAlpha: 0,
        x: this.isDesktopViewport() ? 20 : 0,
        y: this.isDesktopViewport() ? 0 : 10,
        duration: b,
        ease: "power1.out",
        overwrite: !0,
        onComplete: () => {
          this.panelTween = null, this.finishClosePanel(e);
        }
      });
    }
  }
  finishClosePanel(e) {
    var t;
    this.isClosingPanel = !1, this.layout.classList.remove("is-panel-open"), this.panel.hidden = !0, this.panel.setAttribute("aria-hidden", "true"), this.panel.classList.remove("is-stacked"), this.setConnectorHidden(!0), o.set(this.panel, { clearProps: "opacity,visibility,transform" }), o.set(this.connector, { clearProps: "opacity,visibility,transform" }), e && ((t = this.lastFocused) == null || t.focus()), this.syncLayoutMetrics();
  }
}
function m() {
  var s;
  const a = document.getElementById("house-viewer"), e = document.getElementById("house-viewer-data");
  if (!a || !(e != null && e.textContent) || a.dataset.houseViewerInitialized === "true") return;
  let t;
  try {
    t = JSON.parse(e.textContent);
  } catch {
    console.error("HouseViewer: nie udało się sparsować danych widoku.");
    return;
  }
  if ((s = t.views) != null && s.length)
    try {
      new I(a, t), a.dataset.houseViewerInitialized = "true";
    } catch (i) {
      console.error("HouseViewer: inicjalizacja nie powiodła się.", i);
    }
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", m) : m();
