var f = Object.defineProperty;
var b = (c, e, t) => e in c ? f(c, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : c[e] = t;
var r = (c, e, t) => b(c, typeof e != "symbol" ? e + "" : e, t);
import { g as a } from "./index-9nJrthwM.js";
const C = "http://www.w3.org/2000/svg";
class A {
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
    this.prevBtn && (this.prevBtn.hidden = !t), this.nextBtn && (this.nextBtn.hidden = !t), (s = this.prevBtn) == null || s.addEventListener("click", () => this.step(-1), e), (i = this.nextBtn) == null || i.addEventListener("click", () => this.step(1), e), this.viewsNav && (this.viewsNav.replaceChildren(), this.data.views.forEach((n, l) => {
      var h;
      const o = document.createElement("button");
      o.type = "button", o.className = "house-viewer__view-btn", o.textContent = n.title, o.setAttribute("aria-pressed", l === this.currentIndex ? "true" : "false"), o.addEventListener("click", () => this.renderView(l), e), (h = this.viewsNav) == null || h.appendChild(o);
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
      this.img.src = this.resolveImageUrl(i.image), this.img.alt = i.title, this.buildHotspots(i), this.syncViewButtons(), a.fromTo(
        [this.img, this.overlay, this.hitAreas],
        { opacity: 0 },
        { opacity: 1, duration: 0.35, onComplete: t }
      );
    };
    if (s) {
      n();
      return;
    }
    a.to([this.img, this.overlay, this.hitAreas], { opacity: 0, duration: 0.2, onComplete: n });
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
      const i = this.getBounds(t), n = this.createPolygon(t), l = this.createHitArea(t, i), o = this.createMarker(t, i);
      this.overlay.appendChild(n), this.hitAreas.append(l, o), a.fromTo(n, { opacity: 0 }, { opacity: 1, duration: 0.24, delay: 0.06 * s }), a.fromTo(o, { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.28, delay: 0.08 + 0.06 * s });
    }), this.syncActiveSystemState();
  }
  createPolygon(e) {
    const t = document.createElementNS(C, "polygon"), s = e.polygon.map(([i, n]) => `${i},${n}`).join(" ");
    return t.setAttribute("points", s), t.setAttribute("class", "house-viewer__hotspot"), t.dataset.systemId = e.systemId, t;
  }
  createHitArea(e, t) {
    const s = { signal: this.listenerController.signal }, i = document.createElement("button");
    i.type = "button", i.className = "house-viewer__hit-area", i.dataset.systemId = e.systemId, i.style.left = `${t.left}%`, i.style.top = `${t.top}%`, i.style.width = `${t.width}%`, i.style.height = `${t.height}%`, i.setAttribute("aria-label", `${e.name} – pokaż szczegóły`);
    const n = () => this.setHoveredState(e.systemId, !0), l = () => this.setHoveredState(e.systemId, !1);
    return i.addEventListener("mouseenter", n, s), i.addEventListener("mouseleave", l, s), i.addEventListener("focus", n, s), i.addEventListener("blur", l, s), i.addEventListener("click", () => {
      const o = this.markerFor(e.systemId);
      this.openPanel(e, o ?? i, e.systemId);
    }, s), i;
  }
  createMarker(e, t) {
    const s = { signal: this.listenerController.signal }, i = document.createElement("button");
    i.type = "button", i.className = "house-viewer__marker", i.dataset.systemId = e.systemId, i.style.left = `${t.centerX}%`, i.style.top = `${t.centerY}%`, i.setAttribute("aria-label", `${e.name} – pokaż szczegóły`);
    const n = () => this.setHoveredState(e.systemId, !0), l = () => this.setHoveredState(e.systemId, !1);
    return i.addEventListener("mouseenter", n, s), i.addEventListener("mouseleave", l, s), i.addEventListener("focus", n, s), i.addEventListener("blur", l, s), i.addEventListener("click", () => this.openPanel(e, i, e.systemId), s), i;
  }
  getBounds(e) {
    const t = e.polygon.map(([h]) => h), s = e.polygon.map(([, h]) => h), i = Math.min(...t), n = Math.min(...s), l = Math.max(...t) - i, o = Math.max(...s) - n;
    return {
      left: i,
      top: n,
      width: l,
      height: o,
      centerX: i + l / 2,
      centerY: n + o / 2
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
    }), this.syncActiveSystemState(), this.panel.hidden = !1, this.layout.classList.add("is-panel-open"), a.killTweensOf(this.panel), a.killTweensOf(this.connector), requestAnimationFrame(() => {
      this.updateConnector(), a.fromTo(
        this.panel,
        { autoAlpha: 0, x: 28 },
        { autoAlpha: 1, x: 0, duration: 0.32, ease: "power2.out" }
      ), this.isConnectorHidden() || a.fromTo(this.connector, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.22, ease: "power1.out" }), this.scheduleConnectorRefresh();
    }), this.panelClose.focus();
  }
  scheduleConnectorRefresh() {
    var e;
    (e = this.connectorRefreshTween) == null || e.kill(), this.connectorRefreshTween = a.to({}, { duration: 0.4, onUpdate: () => this.updateConnector() });
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
    this.activePulseTween = a.to(e, {
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
    const t = this.layout.getBoundingClientRect(), s = this.stage.getBoundingClientRect(), i = this.panel.getBoundingClientRect(), n = e.getBoundingClientRect();
    if (i.top >= s.bottom - 4) {
      this.panel.classList.add("is-stacked"), this.setConnectorHidden(!0);
      return;
    }
    this.panel.classList.remove("is-stacked");
    const o = n.left + n.width / 2 - t.left, h = n.top + n.height / 2 - t.top, d = i.left - t.left + 10, v = n.top + n.height / 2 - i.top, u = i.top - t.top + Math.max(34, Math.min(v, i.height - 34));
    if (d <= o + 20) {
      this.setConnectorHidden(!0);
      return;
    }
    const p = d - o, y = o + Math.max(30, p * 0.35), w = d - Math.max(26, p * 0.26), g = `M ${o} ${h} C ${y} ${h}, ${w} ${u}, ${d} ${u}`;
    this.connector.setAttribute("viewBox", `0 0 ${t.width} ${t.height}`), this.connectorPath.setAttribute("d", g), this.connectorPath.setAttribute("marker-end", `url(#${this.connectorArrowId})`), this.setConnectorHidden(!1);
  }
  closePanel(e = !0) {
    var t;
    this.panel.hidden || (this.activeSystemId = null, this.syncActiveSystemState(), (t = this.connectorRefreshTween) == null || t.kill(), this.connectorRefreshTween = null, a.killTweensOf(this.panel), a.killTweensOf(this.connector), a.to(this.panel, { autoAlpha: 0, x: 20, duration: 0.18, ease: "power1.in" }), a.to(this.connector, {
      autoAlpha: 0,
      duration: 0.18,
      ease: "power1.in",
      onComplete: () => {
        var s;
        this.panel.hidden = !0, this.setConnectorHidden(!0), this.layout.classList.remove("is-panel-open"), a.set(this.panel, { clearProps: "opacity,visibility,transform" }), a.set(this.connector, { clearProps: "opacity,visibility,transform" }), e && ((s = this.lastFocused) == null || s.focus());
      }
    }));
  }
}
function m() {
  var s;
  const c = document.getElementById("house-viewer"), e = document.getElementById("house-viewer-data");
  if (!c || !(e != null && e.textContent) || c.dataset.houseViewerInitialized === "true") return;
  let t;
  try {
    t = JSON.parse(e.textContent);
  } catch {
    console.error("HouseViewer: nie udało się sparsować danych widoku.");
    return;
  }
  if ((s = t.views) != null && s.length)
    try {
      new A(c, t), c.dataset.houseViewerInitialized = "true";
    } catch (i) {
      console.error("HouseViewer: inicjalizacja nie powiodła się.", i);
    }
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", m) : m();
