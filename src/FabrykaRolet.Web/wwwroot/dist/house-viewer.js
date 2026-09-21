var f = Object.defineProperty;
var S = (c, e, t) => e in c ? f(c, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : c[e] = t;
var r = (c, e, t) => S(c, typeof e != "symbol" ? e + "" : e, t);
import { g as a } from "./index-9nJrthwM.js";
const A = "http://www.w3.org/2000/svg", C = {
  "/images/house/exterior-front.png": "/images/house/exterior-front.png",
  "/images/house/exterior-taras.png": "/images/house/exterior-taras.png",
  "/images/house/exterior-tyl.png": "/images/house/exterior-tyl.png",
  "/images/house/exterior-garaz.png": "/images/house/exterior-garaz.png"
};
class k {
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
    r(this, "prevBtn");
    r(this, "nextBtn");
    r(this, "viewsNav");
    r(this, "systemButtons");
    r(this, "currentIndex", 0);
    r(this, "activeSystemId", null);
    r(this, "lastFocused", null);
    r(this, "activePulseTween", null);
    r(this, "connectorRefreshTween", null);
    this.root = e, this.data = t, this.layout = this.require(".house-viewer__layout"), this.stage = this.require(".house-viewer__stage"), this.img = this.require(".house-viewer__image"), this.overlay = this.require(".house-viewer__overlay"), this.hitAreas = this.require(".house-viewer__hit-areas"), this.connector = this.require(".house-viewer__connector"), this.connectorPath = this.require(".house-viewer__connector-path"), this.panel = this.require("#house-viewer-panel"), this.panelClose = this.require(".house-viewer__panel-close"), this.panelTitle = this.require("#house-viewer-panel-title"), this.panelDescription = this.require("#house-viewer-panel-description"), this.panelAdvantages = this.require("#house-viewer-panel-advantages"), this.prevBtn = e.querySelector(".house-viewer__arrow--prev"), this.nextBtn = e.querySelector(".house-viewer__arrow--next"), this.viewsNav = e.querySelector(".house-viewer__views"), this.systemButtons = this.collectSystemButtons(), this.bindNav(), this.bindPanelClose(), this.bindSystemButtons(), this.bindGlobalEvents(), this.renderView(0);
  }
  require(e) {
    const t = this.root.querySelector(e);
    if (!t) throw new Error(`HouseViewer: brak elementu "${e}" w kontenerze.`);
    return t;
  }
  bindNav() {
    var t, s;
    const e = this.data.views.length > 1;
    this.prevBtn && (this.prevBtn.hidden = !e), this.nextBtn && (this.nextBtn.hidden = !e), (t = this.prevBtn) == null || t.addEventListener("click", () => this.step(-1)), (s = this.nextBtn) == null || s.addEventListener("click", () => this.step(1)), this.viewsNav && (this.viewsNav.replaceChildren(), this.data.views.forEach((i, n) => {
      var h;
      const o = document.createElement("button");
      o.type = "button", o.className = "house-viewer__view-btn", o.textContent = i.title, o.setAttribute("role", "tab"), o.setAttribute("aria-selected", n === this.currentIndex ? "true" : "false"), o.tabIndex = n === this.currentIndex ? 0 : -1, o.addEventListener("click", () => this.renderView(n)), (h = this.viewsNav) == null || h.appendChild(o);
    })), this.root.addEventListener("keydown", (i) => {
      i.key === "ArrowLeft" && (i.preventDefault(), this.step(-1)), i.key === "ArrowRight" && (i.preventDefault(), this.step(1));
    });
  }
  bindPanelClose() {
    this.panelClose.addEventListener("click", () => this.closePanel()), document.addEventListener("keydown", (e) => {
      e.key === "Escape" && !this.panel.hidden && this.closePanel();
    }), document.addEventListener("click", (e) => {
      if (this.panel.hidden) return;
      const t = e.target;
      t && (this.panel.contains(t) || t.closest(".house-viewer__marker, .house-viewer__hit-area, .system-button") || this.closePanel());
    });
  }
  bindSystemButtons() {
    this.systemButtons.forEach((e) => {
      e.addEventListener("click", () => this.activateSystem(e.dataset.systemId, e));
    });
  }
  bindGlobalEvents() {
    window.addEventListener("resize", () => this.updateConnector()), this.img.addEventListener("load", () => this.updateConnector());
  }
  collectSystemButtons() {
    var t;
    const e = (t = this.root.closest(".house-viewer")) == null ? void 0 : t.nextElementSibling;
    return !(e instanceof HTMLElement) || !e.classList.contains("system-grid") ? [] : Array.from(e.querySelectorAll(".system-button[data-system-id]"));
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
      t.classList.toggle("is-active", i), t.setAttribute("aria-selected", i ? "true" : "false"), t.tabIndex = i ? 0 : -1;
    });
  }
  buildHotspots(e) {
    this.overlay.replaceChildren(), this.hitAreas.replaceChildren(), e.hotspots.forEach((t, s) => {
      const i = this.getBounds(t), n = this.createPolygon(t), o = this.createHitArea(t, i), h = this.createMarker(t, i);
      this.overlay.appendChild(n), this.hitAreas.append(o, h), a.fromTo(n, { opacity: 0 }, { opacity: 1, duration: 0.24, delay: 0.06 * s }), a.fromTo(h, { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.28, delay: 0.08 + 0.06 * s });
    }), this.syncActiveSystemState();
  }
  createPolygon(e) {
    const t = document.createElementNS(A, "polygon"), s = e.polygon.map(([i, n]) => `${i},${n}`).join(" ");
    return t.setAttribute("points", s), t.setAttribute("class", "house-viewer__hotspot"), t.dataset.systemId = e.systemId, t;
  }
  createHitArea(e, t) {
    const s = document.createElement("button");
    s.type = "button", s.className = "house-viewer__hit-area", s.dataset.systemId = e.systemId, s.style.left = `${t.left}%`, s.style.top = `${t.top}%`, s.style.width = `${t.width}%`, s.style.height = `${t.height}%`, s.tabIndex = -1, s.setAttribute("aria-hidden", "true");
    const i = () => this.setHoveredState(e.systemId, !0), n = () => this.setHoveredState(e.systemId, !1);
    return s.addEventListener("mouseenter", i), s.addEventListener("mouseleave", n), s.addEventListener("click", () => {
      const o = this.markerFor(e.systemId);
      this.openPanel(e, o ?? s, e.systemId);
    }), s;
  }
  createMarker(e, t) {
    const s = document.createElement("button");
    s.type = "button", s.className = "house-viewer__marker", s.dataset.systemId = e.systemId, s.style.left = `${t.centerX}%`, s.style.top = `${t.centerY}%`, s.setAttribute("aria-label", `${e.name} – pokaż szczegóły`);
    const i = () => this.setHoveredState(e.systemId, !0), n = () => this.setHoveredState(e.systemId, !1);
    return s.addEventListener("mouseenter", i), s.addEventListener("mouseleave", n), s.addEventListener("focus", i), s.addEventListener("blur", n), s.addEventListener("click", () => this.openPanel(e, s, e.systemId)), s;
  }
  getBounds(e) {
    const t = e.polygon.map(([l]) => l), s = e.polygon.map(([, l]) => l), i = Math.min(...t), n = Math.min(...s), o = Math.max(...t) - i, h = Math.max(...s) - n;
    return {
      left: i,
      top: n,
      width: o,
      height: h,
      centerX: i + o / 2,
      centerY: n + h / 2
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
    const t = C[e];
    if (!t)
      throw new Error(`HouseViewer: nieobsługiwany adres obrazu "${e}".`);
    return t;
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
    const h = n.left + n.width / 2 - t.left, l = n.top + n.height / 2 - t.top, d = i.left - t.left + 10, v = n.top + n.height / 2 - i.top, u = i.top - t.top + Math.max(34, Math.min(v, i.height - 34));
    if (d <= h + 20) {
      this.setConnectorHidden(!0);
      return;
    }
    const p = d - h, y = h + Math.max(30, p * 0.35), w = d - Math.max(26, p * 0.26), g = `M ${h} ${l} C ${y} ${l}, ${w} ${u}, ${d} ${u}`;
    this.connector.setAttribute("viewBox", `0 0 ${t.width} ${t.height}`), this.connectorPath.setAttribute("d", g), this.connectorPath.setAttribute("marker-end", "url(#house-viewer-connector-arrow)"), this.setConnectorHidden(!1);
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
      new k(c, t), c.dataset.houseViewerInitialized = "true";
    } catch (i) {
      console.error("HouseViewer: inicjalizacja nie powiodła się.", i);
    }
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", m) : m();
