var L = Object.defineProperty;
var E = (l, e, t) => e in l ? L(l, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : l[e] = t;
var r = (l, e, t) => E(l, typeof e != "symbol" ? e + "" : e, t);
import { g as h } from "./index-9nJrthwM.js";
const T = "http://www.w3.org/2000/svg", x = 0.32, P = 0.2, w = 0.18, O = 420, B = "(min-width: 901px)", R = (l, e, t) => Math.min(Math.max(l, e), t);
class H {
  constructor(e, t) {
    r(this, "layout");
    r(this, "stage");
    r(this, "img");
    r(this, "overlay");
    r(this, "hitAreas");
    r(this, "connector");
    r(this, "connectorPath");
    r(this, "panel");
    r(this, "panelClose");
    r(this, "panelTitle");
    r(this, "panelDescription");
    r(this, "panelAdvantages");
    r(this, "availability");
    r(this, "panelStatus");
    r(this, "prevBtn");
    r(this, "nextBtn");
    r(this, "viewsNav");
    r(this, "systemButtons");
    r(this, "allowedImagePaths");
    r(this, "listenerController", new AbortController());
    r(this, "hotspotIndex", /* @__PURE__ */ new Map());
    r(this, "currentIndex", 0);
    r(this, "activeSystemId", null);
    r(this, "lastFocused", null);
    r(this, "disconnectObserver", null);
    r(this, "resizeObserver", null);
    r(this, "panelTween", null);
    r(this, "connectorTween", null);
    r(this, "viewTween", null);
    r(this, "connectorFrame", null);
    r(this, "connectorRefreshUntil", 0);
    r(this, "isClosingPanel", !1);
    this.root = e, this.data = t, this.layout = this.require(".house-viewer__layout"), this.stage = this.require(".house-viewer__stage"), this.img = this.require(".house-viewer__image"), this.overlay = this.require(".house-viewer__overlay"), this.hitAreas = this.require(".house-viewer__hit-areas"), this.connector = this.require(".house-viewer__connector"), this.connectorPath = this.require(".house-viewer__connector-path"), this.panel = this.require("#house-viewer-panel"), this.panelClose = this.require(".house-viewer__panel-close"), this.panelTitle = this.require("#house-viewer-panel-title"), this.panelDescription = this.require("#house-viewer-panel-description"), this.panelAdvantages = this.require("#house-viewer-panel-advantages"), this.availability = e.querySelector("#house-viewer-availability"), this.panelStatus = e.querySelector("#house-viewer-status"), this.prevBtn = e.querySelector(".house-viewer__arrow--prev"), this.nextBtn = e.querySelector(".house-viewer__arrow--next"), this.viewsNav = e.querySelector(".house-viewer__views"), this.systemButtons = this.collectSystemButtons(), this.allowedImagePaths = new Map(t.views.map((i) => [i.image, this.normalizeImageUrl(i.image)])), this.indexHotspots(), this.bindNav(), this.bindPanelClose(), this.bindSystemButtons(), this.bindGlobalEvents(), this.renderView(0);
  }
  require(e) {
    const t = this.root.querySelector(e);
    if (!t)
      throw new Error(`HouseViewer: brak elementu "${e}" w kontenerze.`);
    return t;
  }
  indexHotspots() {
    this.data.views.forEach((e, t) => {
      e.hotspots.forEach((i) => {
        const s = this.hotspotIndex.get(i.systemId) ?? [];
        s.push({ viewIndex: t, hotspot: i }), this.hotspotIndex.set(i.systemId, s);
      });
    });
  }
  bindNav() {
    const e = { signal: this.listenerController.signal }, t = this.data.views.length > 1;
    this.prevBtn && (this.prevBtn.hidden = !t, this.prevBtn.addEventListener("click", () => this.step(-1), e)), this.nextBtn && (this.nextBtn.hidden = !t, this.nextBtn.addEventListener("click", () => this.step(1), e)), this.viewsNav && (this.viewsNav.replaceChildren(), this.data.views.forEach((i, s) => {
      var o;
      const n = document.createElement("button");
      n.type = "button", n.className = "house-viewer__view-btn", n.textContent = i.title, n.setAttribute("aria-pressed", s === this.currentIndex ? "true" : "false"), n.addEventListener("click", () => this.renderView(s), e), (o = this.viewsNav) == null || o.appendChild(n);
    })), this.root.addEventListener(
      "keydown",
      (i) => {
        this.shouldIgnoreViewNavigationKey(i) || (i.key === "ArrowLeft" && (i.preventDefault(), this.step(-1)), i.key === "ArrowRight" && (i.preventDefault(), this.step(1)));
      },
      e
    );
  }
  shouldIgnoreViewNavigationKey(e) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight")
      return !0;
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
        if (this.panel.hidden)
          return;
        const i = t.target;
        !i || this.panel.contains(i) || i.closest(".house-viewer__marker, .house-viewer__hit-area, .system-button") || this.closePanel();
      },
      e
    );
  }
  bindSystemButtons() {
    const e = { signal: this.listenerController.signal };
    this.systemButtons.forEach((t) => {
      const i = t.dataset.systemId;
      i && t.addEventListener("click", () => this.activateSystem(i, t), e);
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
    var e, t, i, s, n;
    this.listenerController.abort(), (e = this.disconnectObserver) == null || e.disconnect(), this.disconnectObserver = null, (t = this.resizeObserver) == null || t.disconnect(), this.resizeObserver = null, this.cancelConnectorRefresh(), (i = this.panelTween) == null || i.kill(), (s = this.connectorTween) == null || s.kill(), (n = this.viewTween) == null || n.kill();
  }
  collectSystemButtons() {
    const e = this.root.dataset.systemButtons;
    if (!e)
      return [];
    const t = document.querySelector(e);
    return t ? Array.from(t.querySelectorAll(".system-button[data-system-id]")) : [];
  }
  findHotspot(e) {
    const t = this.hotspotIndex.get(e);
    return t != null && t.length ? t.find((i) => i.viewIndex === this.currentIndex) ?? t[0] : null;
  }
  findSystemSummary(e) {
    return this.data.systems.find((t) => t.systemId === e);
  }
  activateSystem(e, t) {
    const i = this.findHotspot(e);
    if (!i) {
      const n = this.findSystemSummary(e);
      n && this.openPanel(n, t, null);
      return;
    }
    const s = () => {
      const n = this.markerFor(e);
      this.openPanel(i.hotspot, n ?? t, e);
    };
    if (i.viewIndex === this.currentIndex) {
      s();
      return;
    }
    this.renderView(i.viewIndex, s);
  }
  markerFor(e) {
    return this.hitAreas.querySelector(`.house-viewer__marker[data-system-id="${CSS.escape(e)}"]`);
  }
  polygonFor(e) {
    return this.overlay.querySelector(`polygon[data-system-id="${CSS.escape(e)}"]`);
  }
  step(e) {
    const t = this.data.views.length, i = (this.currentIndex + e + t) % t;
    this.renderView(i);
  }
  renderView(e, t) {
    var o;
    const i = !this.img.src, s = [this.img, this.overlay, this.hitAreas], n = () => {
      var c;
      this.currentIndex = e;
      const a = this.data.views[e];
      this.img.src = this.resolveImageUrl(a.image), this.img.alt = a.title, this.buildHotspots(a), this.syncViewButtons(), this.syncVisibleSystems(a), this.syncLayoutMetrics(), (c = this.viewTween) == null || c.kill(), this.viewTween = h.fromTo(
        s,
        { opacity: 0 },
        {
          opacity: 1,
          duration: w,
          ease: "power1.in",
          onComplete: () => {
            this.viewTween = null, t == null || t();
          }
        }
      );
    };
    if ((o = this.viewTween) == null || o.kill(), h.killTweensOf(s), i || this.closePanel(!1, !1), i) {
      n();
      return;
    }
    this.viewTween = h.to(s, {
      opacity: 0,
      duration: w,
      ease: "power1.in",
      onComplete: n
    });
  }
  syncViewButtons() {
    if (!this.viewsNav)
      return;
    Array.from(this.viewsNav.querySelectorAll(".house-viewer__view-btn")).forEach((t, i) => {
      const s = i === this.currentIndex;
      t.classList.toggle("is-active", s), t.setAttribute("aria-pressed", s ? "true" : "false");
    });
  }
  syncVisibleSystems(e) {
    const t = new Set(e.hotspots.map((s) => s.systemId));
    if (this.systemButtons.forEach((s) => {
      const n = t.has(s.dataset.systemId ?? "");
      s.classList.toggle("is-visible-in-view", n), n ? s.setAttribute("data-visible-in-view", "true") : s.removeAttribute("data-visible-in-view");
    }), !this.availability)
      return;
    const i = e.hotspots.map((s) => s.name);
    this.availability.textContent = i.length > 0 ? `Widoczne na tym widoku: ${i.join(", ")}` : "Widoczne na tym widoku: brak aktywnych systemów.";
  }
  buildHotspots(e) {
    this.overlay.replaceChildren(), this.hitAreas.replaceChildren(), e.hotspots.forEach((t, i) => {
      const s = this.getBounds(t), n = this.createPolygon(t), o = this.createHitArea(t, s), a = this.createMarker(t, s);
      this.overlay.appendChild(n), this.hitAreas.append(o, a), h.fromTo(n, { opacity: 0 }, { opacity: 1, duration: 0.16, delay: 0.03 * i, ease: "power1.out" }), h.fromTo(a, { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1, duration: 0.2, delay: 0.03 * i, ease: "back.out(1.5)" });
    }), this.syncActiveSystemState();
  }
  createPolygon(e) {
    const t = document.createElementNS(T, "polygon"), i = e.polygon.map(([s, n]) => `${s},${n}`).join(" ");
    return t.setAttribute("points", i), t.setAttribute("class", "house-viewer__hotspot"), t.dataset.systemId = e.systemId, t;
  }
  createHitArea(e, t) {
    const i = { signal: this.listenerController.signal }, s = document.createElement("button");
    s.type = "button", s.className = "house-viewer__hit-area", s.dataset.systemId = e.systemId, s.style.left = `${t.left}%`, s.style.top = `${t.top}%`, s.style.width = `${t.width}%`, s.style.height = `${t.height}%`, s.setAttribute("aria-label", `${e.name} – pokaż szczegóły`);
    const n = () => this.setHoveredState(e.systemId, !0), o = () => this.setHoveredState(e.systemId, !1);
    return s.addEventListener("mouseenter", n, i), s.addEventListener("mouseleave", o, i), s.addEventListener("focus", n, i), s.addEventListener("blur", o, i), s.addEventListener(
      "click",
      () => {
        const a = this.markerFor(e.systemId);
        this.openPanel(e, a ?? s, e.systemId);
      },
      i
    ), s;
  }
  createMarker(e, t) {
    const i = { signal: this.listenerController.signal }, s = document.createElement("button");
    s.type = "button", s.className = "house-viewer__marker", s.dataset.systemId = e.systemId, s.style.left = `${t.centerX}%`, s.style.top = `${t.centerY}%`, s.setAttribute("aria-label", `${e.name} – pokaż szczegóły`);
    const n = () => this.setHoveredState(e.systemId, !0), o = () => this.setHoveredState(e.systemId, !1);
    return s.addEventListener("mouseenter", n, i), s.addEventListener("mouseleave", o, i), s.addEventListener("focus", n, i), s.addEventListener("blur", o, i), s.addEventListener("click", () => this.openPanel(e, s, e.systemId), i), s;
  }
  getBounds(e) {
    const t = e.polygon.map(([c]) => c), i = e.polygon.map(([, c]) => c), s = Math.min(...t), n = Math.min(...i), o = Math.max(...t) - s, a = Math.max(...i) - n;
    return {
      left: s,
      top: n,
      width: o,
      height: a,
      centerX: s + o / 2,
      centerY: n + a / 2
    };
  }
  setHoveredState(e, t) {
    var i, s;
    (i = this.markerFor(e)) == null || i.classList.toggle("is-hovered", t), (s = this.polygonFor(e)) == null || s.classList.toggle("is-hovered", t);
  }
  openPanel(e, t, i) {
    this.cancelConnectorRefresh(), this.killOpenCloseTweens(), this.isClosingPanel = !1, this.lastFocused = t, this.activeSystemId = i, this.panelTitle.textContent = e.name, this.panelDescription.textContent = e.description, this.panelAdvantages.replaceChildren(), e.advantages.forEach((n) => {
      const o = document.createElement("li");
      o.textContent = n, this.panelAdvantages.appendChild(o);
    }), this.panel.hidden = !1, this.panel.setAttribute("aria-hidden", "false"), this.layout.classList.add("is-panel-open"), this.syncActiveSystemState(), this.syncLayoutMetrics();
    const s = i ? this.markerFor(i) : null;
    s && h.fromTo(s, { scale: 1 }, { scale: 1.14, duration: 0.13, repeat: 1, yoyo: !0, ease: "power1.out", overwrite: !0 }), this.panelTween = h.fromTo(
      this.panel,
      { autoAlpha: 0, x: this.isDesktopViewport() ? 28 : 0, y: this.isDesktopViewport() ? 0 : 14 },
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        duration: x,
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
    if (!t)
      throw new Error(`HouseViewer: nieobsługiwany adres obrazu "${e}".`);
    return t;
  }
  normalizeImageUrl(e) {
    const t = /^\/images\/[a-z0-9/_-]+\.(png|jpe?g|webp)$/i.exec(e);
    if (!t)
      throw new Error(`HouseViewer: nieobsługiwany adres obrazu "${e}".`);
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
    (e = this.panelTween) == null || e.kill(), this.panelTween = null, (t = this.connectorTween) == null || t.kill(), this.connectorTween = null, h.killTweensOf(this.panel), h.killTweensOf(this.connector);
  }
  scheduleConnectorRefresh() {
    this.cancelConnectorRefresh(), this.connectorRefreshUntil = performance.now() + O;
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
    if (this.systemButtons.forEach((e) => {
      const t = e.dataset.systemId === this.activeSystemId;
      e.setAttribute("aria-pressed", t ? "true" : "false"), e.classList.toggle("is-active", t);
    }), this.overlay.querySelectorAll(".house-viewer__hotspot").forEach((e) => {
      e.classList.toggle("is-active", e.dataset.systemId === this.activeSystemId);
    }), this.hitAreas.querySelectorAll(".house-viewer__marker").forEach((e) => {
      e.classList.toggle("is-active", e.dataset.systemId === this.activeSystemId);
    }), !this.activeSystemId) {
      this.setConnectorHidden(!0);
      return;
    }
    this.markerFor(this.activeSystemId) || this.setConnectorHidden(!0);
  }
  updateConnector() {
    if (this.panel.hidden || !this.activeSystemId) {
      this.panel.classList.remove("is-stacked"), this.setConnectorHidden(!0);
      return;
    }
    const e = this.markerFor(this.activeSystemId);
    if (!e) {
      this.panel.classList.remove("is-stacked"), this.setConnectorHidden(!0);
      return;
    }
    const t = this.layout.getBoundingClientRect(), i = this.stage.getBoundingClientRect(), s = this.panel.getBoundingClientRect(), n = e.getBoundingClientRect(), o = s.top >= i.bottom - 2;
    if (!this.isDesktopViewport() || o) {
      this.panel.classList.add("is-stacked"), this.setConnectorHidden(!0);
      return;
    }
    this.panel.classList.remove("is-stacked");
    const a = n.left + n.width / 2 - t.left, c = n.top + n.height / 2 - t.top, d = i.right - t.left, p = s.left - t.left, g = s.left - i.right, f = i.right - (n.left + n.width / 2), b = s.top - t.top, C = s.bottom - t.top, k = b + 28, S = C - 28;
    if (g < 24 || p <= d + 12) {
      this.setConnectorHidden(!0);
      return;
    }
    if (f > Math.min(i.width * 0.2, 150)) {
      this.setConnectorHidden(!0);
      return;
    }
    if (c < k || c > S) {
      this.setConnectorHidden(!0);
      return;
    }
    if (Array.from(this.hitAreas.querySelectorAll(".house-viewer__marker")).filter((m) => m !== e).some((m) => {
      const u = m.getBoundingClientRect(), v = u.left + u.width / 2, _ = u.top + u.height / 2;
      return Math.abs(_ - (n.top + n.height / 2)) < Math.max(u.height, n.height) * 1.2 && v > n.right && v < i.right + 8;
    })) {
      this.setConnectorHidden(!0);
      return;
    }
    const A = R(d, d, p - 12), I = `M ${a} ${c} L ${A} ${c} L ${p} ${c}`;
    this.connector.setAttribute("viewBox", `0 0 ${t.width} ${t.height}`), this.connectorPath.setAttribute("d", I), this.setConnectorHidden(!1);
  }
  isDesktopViewport() {
    return window.matchMedia(B).matches;
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
    if (e) {
      this.connector.setAttribute("hidden", "");
      return;
    }
    this.connector.removeAttribute("hidden");
  }
  closePanel(e = !0, t = !0) {
    if (!(this.panel.hidden || this.isClosingPanel)) {
      if (this.cancelConnectorRefresh(), this.killOpenCloseTweens(), this.activeSystemId = null, this.syncActiveSystemState(), !t) {
        this.finishClosePanel(e);
        return;
      }
      this.isClosingPanel = !0, this.connectorTween = h.to(this.connector, {
        autoAlpha: 0,
        duration: 0.12,
        ease: "power1.out",
        overwrite: !0,
        onComplete: () => {
          this.connectorTween = null;
        }
      }), this.panelTween = h.to(this.panel, {
        autoAlpha: 0,
        x: this.isDesktopViewport() ? 20 : 0,
        y: this.isDesktopViewport() ? 0 : 10,
        duration: P,
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
    this.isClosingPanel = !1, this.layout.classList.remove("is-panel-open"), this.panel.hidden = !0, this.panel.setAttribute("aria-hidden", "true"), this.panel.classList.remove("is-stacked"), this.setConnectorHidden(!0), h.set(this.panel, { clearProps: "opacity,visibility,transform" }), h.set(this.connector, { clearProps: "opacity,visibility,transform" }), e && ((t = this.lastFocused) == null || t.focus()), this.syncLayoutMetrics();
  }
}
function y() {
  var i;
  const l = document.getElementById("house-viewer"), e = document.getElementById("house-viewer-data");
  if (!l || !(e != null && e.textContent) || l.dataset.houseViewerInitialized === "true") return;
  let t;
  try {
    t = JSON.parse(e.textContent);
  } catch {
    console.error("HouseViewer: nie udało się sparsować danych widoku.");
    return;
  }
  if ((i = t.views) != null && i.length)
    try {
      new H(l, t), l.dataset.houseViewerInitialized = "true";
    } catch (s) {
      console.error("HouseViewer: inicjalizacja nie powiodła się.", s);
    }
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", y) : y();
