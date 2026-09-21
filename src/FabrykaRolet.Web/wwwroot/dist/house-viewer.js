var S = Object.defineProperty;
var I = (h, e, t) => e in h ? S(h, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : h[e] = t;
var r = (h, e, t) => I(h, typeof e != "symbol" ? e + "" : e, t);
import { g as o } from "./index-9nJrthwM.js";
const _ = "http://www.w3.org/2000/svg", w = 0.46, v = "power2.out";
class E {
  constructor(e, t) {
    r(this, "layout");
    r(this, "stage");
    r(this, "img");
    r(this, "overlay");
    r(this, "hitAreas");
    r(this, "connector");
    r(this, "connectorArrow");
    r(this, "connectorPath");
    r(this, "panel");
    r(this, "panelClose");
    r(this, "panelTitle");
    r(this, "panelDescription");
    r(this, "panelAdvantages");
    r(this, "prevBtn");
    r(this, "nextBtn");
    r(this, "viewsNav");
    r(this, "systemButtons");
    r(this, "allowedImagePaths");
    r(this, "connectorArrowId");
    r(this, "currentIndex", 0);
    r(this, "activeSystemId", null);
    r(this, "lastFocused", null);
    r(this, "activePulseTween", null);
    r(this, "connectorRefreshTween", null);
    r(this, "listenerController", new AbortController());
    r(this, "disconnectObserver", null);
    this.root = e, this.data = t, this.layout = this.require(".house-viewer__layout"), this.stage = this.require(".house-viewer__stage"), this.img = this.require(".house-viewer__image"), this.overlay = this.require(".house-viewer__overlay"), this.hitAreas = this.require(".house-viewer__hit-areas"), this.connector = this.require(".house-viewer__connector"), this.connectorArrow = this.require(".house-viewer__connector-arrow"), this.connectorPath = this.require(".house-viewer__connector-path"), this.panel = this.require("#house-viewer-panel"), this.panelClose = this.require(".house-viewer__panel-close"), this.panelTitle = this.require("#house-viewer-panel-title"), this.panelDescription = this.require("#house-viewer-panel-description"), this.panelAdvantages = this.require("#house-viewer-panel-advantages"), this.prevBtn = e.querySelector(".house-viewer__arrow--prev"), this.nextBtn = e.querySelector(".house-viewer__arrow--next"), this.viewsNav = e.querySelector(".house-viewer__views"), this.systemButtons = this.collectSystemButtons(), this.allowedImagePaths = new Map(t.views.map((s) => [s.image, this.normalizeImageUrl(s.image)])), this.connectorArrowId = `${this.root.id || "house-viewer"}-connector-arrow`, this.connectorArrow.id = this.connectorArrowId, this.bindNav(), this.bindPanelClose(), this.bindSystemButtons(), this.bindGlobalEvents(), this.renderView(0);
  }
  require(e) {
    const t = this.root.querySelector(e);
    if (!t) throw new Error(`HouseViewer: brak elementu "${e}" w kontenerze.`);
    return t;
  }
  bindNav() {
    var s, i;
    const e = { signal: this.listenerController.signal }, t = this.data.views.length > 1;
    this.prevBtn && (this.prevBtn.hidden = !t), this.nextBtn && (this.nextBtn.hidden = !t), (s = this.prevBtn) == null || s.addEventListener("click", () => this.step(-1), e), (i = this.nextBtn) == null || i.addEventListener("click", () => this.step(1), e), this.viewsNav && (this.viewsNav.replaceChildren(), this.data.views.forEach((n, a) => {
      var c;
      const l = document.createElement("button");
      l.type = "button", l.className = "house-viewer__view-btn", l.textContent = n.title, l.setAttribute("aria-pressed", a === this.currentIndex ? "true" : "false"), l.addEventListener("click", () => this.renderView(a), e), (c = this.viewsNav) == null || c.appendChild(l);
    })), this.root.addEventListener("keydown", (n) => {
      n.key === "ArrowLeft" && (n.preventDefault(), this.step(-1)), n.key === "ArrowRight" && (n.preventDefault(), this.step(1));
    }, e);
  }
  bindPanelClose() {
    const e = { signal: this.listenerController.signal };
    this.panelClose.addEventListener("click", () => this.closePanel(), e), document.addEventListener("keydown", (t) => {
      t.key === "Escape" && !this.panel.hidden && this.closePanel();
    }, e), document.addEventListener("click", (t) => {
      if (this.panel.hidden) return;
      const s = t.target;
      s && (this.panel.contains(s) || s.closest(".house-viewer__marker, .house-viewer__hit-area, .system-button") || this.closePanel());
    }, e);
  }
  bindSystemButtons() {
    const e = { signal: this.listenerController.signal };
    this.systemButtons.forEach((t) => {
      t.addEventListener("click", () => this.activateSystem(t.dataset.systemId, t), e);
    });
  }
  bindGlobalEvents() {
    const e = { signal: this.listenerController.signal };
    window.addEventListener("resize", () => this.scheduleConnectorRefresh(), e), this.img.addEventListener("load", () => this.updateConnector(), e), this.observeDisconnect();
  }
  observeDisconnect() {
    document.body && (this.disconnectObserver = new MutationObserver(() => {
      this.root.isConnected || this.destroy();
    }), this.disconnectObserver.observe(document.body, { childList: !0, subtree: !0 }));
  }
  destroy() {
    var e, t, s;
    this.listenerController.abort(), (e = this.disconnectObserver) == null || e.disconnect(), this.disconnectObserver = null, (t = this.connectorRefreshTween) == null || t.kill(), (s = this.activePulseTween) == null || s.kill();
  }
  collectSystemButtons() {
    const e = this.root.dataset.systemButtons;
    if (!e)
      return [];
    const t = document.querySelector(e);
    return t ? Array.from(t.querySelectorAll(".system-button[data-system-id]")) : [];
  }
  findHotspot(e) {
    for (let t = 0; t < this.data.views.length; t++) {
      const s = this.data.views[t].hotspots.find((i) => i.systemId === e);
      if (s) return { viewIndex: t, hotspot: s };
    }
    return null;
  }
  findSystemSummary(e) {
    return this.data.systems.find((t) => t.systemId === e);
  }
  activateSystem(e, t) {
    const s = this.findHotspot(e);
    if (!s) {
      const n = this.findSystemSummary(e);
      n && this.openPanel(n, t, null);
      return;
    }
    const i = () => {
      const n = this.markerFor(e);
      this.openPanel(s.hotspot, n ?? t, e);
    };
    if (s.viewIndex === this.currentIndex) {
      i();
      return;
    }
    this.renderView(s.viewIndex, i);
  }
  markerFor(e) {
    return this.hitAreas.querySelector(`.house-viewer__marker[data-system-id="${CSS.escape(e)}"]`);
  }
  polygonFor(e) {
    return this.overlay.querySelector(`polygon[data-system-id="${CSS.escape(e)}"]`);
  }
  step(e) {
    const t = this.data.views.length, s = (this.currentIndex + e + t) % t;
    this.renderView(s);
  }
  renderView(e, t) {
    const s = !this.img.src;
    this.currentIndex = e;
    const i = this.data.views[e];
    s || this.closePanel(!1);
    const n = () => {
      this.img.src = this.resolveImageUrl(i.image), this.img.alt = i.title, this.buildHotspots(i), this.syncViewButtons(), o.fromTo(
        [this.img, this.overlay, this.hitAreas],
        { opacity: 0 },
        { opacity: 1, duration: 0.35, onComplete: t }
      );
    };
    if (s) {
      n();
      return;
    }
    o.to([this.img, this.overlay, this.hitAreas], { opacity: 0, duration: 0.2, onComplete: n });
  }
  syncViewButtons() {
    if (!this.viewsNav) return;
    Array.from(this.viewsNav.querySelectorAll(".house-viewer__view-btn")).forEach((t, s) => {
      const i = s === this.currentIndex;
      t.classList.toggle("is-active", i), t.setAttribute("aria-pressed", i ? "true" : "false");
    });
  }
  buildHotspots(e) {
    this.overlay.replaceChildren(), this.hitAreas.replaceChildren(), e.hotspots.forEach((t, s) => {
      const i = this.getBounds(t), n = this.createPolygon(t), a = this.createHitArea(t, i), l = this.createMarker(t, i);
      this.overlay.appendChild(n), this.hitAreas.append(a, l), o.fromTo(n, { opacity: 0 }, { opacity: 1, duration: 0.24, delay: 0.06 * s }), o.fromTo(l, { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.28, delay: 0.08 + 0.06 * s });
    }), this.syncActiveSystemState();
  }
  createPolygon(e) {
    const t = document.createElementNS(_, "polygon"), s = e.polygon.map(([i, n]) => `${i},${n}`).join(" ");
    return t.setAttribute("points", s), t.setAttribute("class", "house-viewer__hotspot"), t.dataset.systemId = e.systemId, t;
  }
  createHitArea(e, t) {
    const s = { signal: this.listenerController.signal }, i = document.createElement("button");
    i.type = "button", i.className = "house-viewer__hit-area", i.dataset.systemId = e.systemId, i.style.left = `${t.left}%`, i.style.top = `${t.top}%`, i.style.width = `${t.width}%`, i.style.height = `${t.height}%`, i.setAttribute("aria-label", `${e.name} – pokaż szczegóły`);
    const n = () => this.setHoveredState(e.systemId, !0), a = () => this.setHoveredState(e.systemId, !1);
    return i.addEventListener("mouseenter", n, s), i.addEventListener("mouseleave", a, s), i.addEventListener("focus", n, s), i.addEventListener("blur", a, s), i.addEventListener("click", () => {
      const l = this.markerFor(e.systemId);
      this.openPanel(e, l ?? i, e.systemId);
    }, s), i;
  }
  createMarker(e, t) {
    const s = { signal: this.listenerController.signal }, i = document.createElement("button");
    i.type = "button", i.className = "house-viewer__marker", i.dataset.systemId = e.systemId, i.style.left = `${t.centerX}%`, i.style.top = `${t.centerY}%`, i.setAttribute("aria-label", `${e.name} – pokaż szczegóły`);
    const n = () => this.setHoveredState(e.systemId, !0), a = () => this.setHoveredState(e.systemId, !1);
    return i.addEventListener("mouseenter", n, s), i.addEventListener("mouseleave", a, s), i.addEventListener("focus", n, s), i.addEventListener("blur", a, s), i.addEventListener("click", () => this.openPanel(e, i, e.systemId), s), i;
  }
  getBounds(e) {
    const t = e.polygon.map(([c]) => c), s = e.polygon.map(([, c]) => c), i = Math.min(...t), n = Math.min(...s), a = Math.max(...t) - i, l = Math.max(...s) - n;
    return {
      left: i,
      top: n,
      width: a,
      height: l,
      centerX: i + a / 2,
      centerY: n + l / 2
    };
  }
  setHoveredState(e, t) {
    var s, i;
    (s = this.markerFor(e)) == null || s.classList.toggle("is-hovered", t), (i = this.polygonFor(e)) == null || i.classList.toggle("is-hovered", t);
  }
  openPanel(e, t, s) {
    this.lastFocused = t, this.activeSystemId = s, this.panelTitle.textContent = e.name, this.panelDescription.textContent = e.description, this.panelAdvantages.replaceChildren(), e.advantages.forEach((i) => {
      const n = document.createElement("li");
      n.textContent = i, this.panelAdvantages.appendChild(n);
    }), this.syncActiveSystemState(), this.panel.hidden = !1, this.layout.classList.add("is-panel-open"), o.killTweensOf(this.stage), o.killTweensOf(this.panel), o.killTweensOf(this.connector), requestAnimationFrame(() => {
      this.updateConnector(), o.to(this.stage, {
        scale: this.isDesktopViewport() ? 0.992 : 1,
        duration: w,
        ease: v
      }), o.fromTo(
        this.panel,
        { autoAlpha: 0, x: this.isDesktopViewport() ? 28 : 0, y: this.isDesktopViewport() ? 0 : 14 },
        { autoAlpha: 1, x: 0, y: 0, duration: w, ease: v }
      ), this.isConnectorHidden() || o.fromTo(this.connector, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: "expo.out" }), this.scheduleConnectorRefresh();
    }), this.panelClose.focus();
  }
  scheduleConnectorRefresh() {
    var e;
    (e = this.connectorRefreshTween) == null || e.kill(), this.connectorRefreshTween = o.to({}, { duration: 0.5, ease: "power2.out", onUpdate: () => this.updateConnector() });
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
  isConnectorHidden() {
    return this.connector.hasAttribute("hidden");
  }
  setConnectorHidden(e) {
    if (e) {
      this.connector.setAttribute("hidden", "");
      return;
    }
    this.connector.removeAttribute("hidden");
  }
  syncActiveSystemState() {
    var t;
    if (this.systemButtons.forEach((s) => {
      const i = s.dataset.systemId === this.activeSystemId;
      s.setAttribute("aria-pressed", i ? "true" : "false"), s.classList.toggle("is-active", i);
    }), this.overlay.querySelectorAll(".house-viewer__hotspot").forEach((s) => {
      s.classList.toggle("is-active", s.dataset.systemId === this.activeSystemId);
    }), this.hitAreas.querySelectorAll(".house-viewer__marker").forEach((s) => {
      s.classList.toggle("is-active", s.dataset.systemId === this.activeSystemId);
    }), (t = this.activePulseTween) == null || t.kill(), this.activePulseTween = null, !this.activeSystemId) {
      this.setConnectorHidden(!0);
      return;
    }
    const e = this.markerFor(this.activeSystemId);
    if (!e) {
      this.setConnectorHidden(!0);
      return;
    }
    this.activePulseTween = o.to(e, {
      scale: 1.18,
      duration: 0.85,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: !0
    });
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
    const t = this.layout.getBoundingClientRect(), s = this.stage.getBoundingClientRect(), i = this.panel.getBoundingClientRect(), n = e.getBoundingClientRect(), a = this.isDesktopViewport();
    if (i.top >= s.bottom - 4 || !a) {
      this.panel.classList.add("is-stacked"), this.setConnectorHidden(!0);
      return;
    }
    this.panel.classList.remove("is-stacked");
    const c = n.left + n.width / 2 - t.left, p = n.top + n.height / 2 - t.top, d = i.left - t.left + 12, g = n.top + n.height / 2 - i.top, f = i.top - t.top + Math.max(34, Math.min(g, i.height - 34)), u = s.right - t.left - 12, A = 22, k = t.height - 22, m = p < t.height * 0.52 ? A : k;
    if (d <= c + 16 || u <= c + 8) {
      this.setConnectorHidden(!0);
      return;
    }
    const b = Math.max(u + 8, d - 12), C = [
      `M ${c} ${p}`,
      `Q ${u} ${p} ${u} ${m}`,
      `L ${b} ${m}`,
      `Q ${d} ${m} ${d} ${f}`
    ].join(" ");
    this.connector.setAttribute("viewBox", `0 0 ${t.width} ${t.height}`), this.connectorPath.setAttribute("d", C), this.connectorPath.setAttribute("marker-end", `url(#${this.connectorArrowId})`), this.setConnectorHidden(!1);
  }
  isDesktopViewport() {
    return window.matchMedia("(min-width: 901px)").matches;
  }
  closePanel(e = !0) {
    var t;
    this.panel.hidden || (this.activeSystemId = null, this.syncActiveSystemState(), (t = this.connectorRefreshTween) == null || t.kill(), this.connectorRefreshTween = null, o.killTweensOf(this.stage), o.killTweensOf(this.panel), o.killTweensOf(this.connector), o.to(this.stage, { scale: 1, duration: 0.42, ease: v }), o.to(this.panel, { autoAlpha: 0, x: this.isDesktopViewport() ? 20 : 0, y: this.isDesktopViewport() ? 0 : 8, duration: 0.24, ease: "power1.in" }), o.to(this.connector, {
      autoAlpha: 0,
      duration: 0.2,
      ease: "power1.in",
      onComplete: () => {
        var s;
        this.panel.hidden = !0, this.setConnectorHidden(!0), this.layout.classList.remove("is-panel-open"), o.set(this.panel, { clearProps: "opacity,visibility,transform" }), o.set(this.connector, { clearProps: "opacity,visibility,transform" }), e && ((s = this.lastFocused) == null || s.focus());
      }
    }));
  }
}
function y() {
  var s;
  const h = document.getElementById("house-viewer"), e = document.getElementById("house-viewer-data");
  if (!h || !(e != null && e.textContent) || h.dataset.houseViewerInitialized === "true") return;
  let t;
  try {
    t = JSON.parse(e.textContent);
  } catch {
    console.error("HouseViewer: nie udało się sparsować danych widoku.");
    return;
  }
  if ((s = t.views) != null && s.length)
    try {
      new E(h, t), h.dataset.houseViewerInitialized = "true";
    } catch (i) {
      console.error("HouseViewer: inicjalizacja nie powiodła się.", i);
    }
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", y) : y();
