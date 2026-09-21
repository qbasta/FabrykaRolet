var w = Object.defineProperty;
var y = (l, t, e) => t in l ? w(l, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : l[t] = e;
var a = (l, t, e) => y(l, typeof t != "symbol" ? t + "" : t, e);
import { g as d } from "./index-9nJrthwM.js";
const g = "http://www.w3.org/2000/svg";
class f {
  constructor(t, e) {
    a(this, "img");
    a(this, "overlay");
    a(this, "hitAreas");
    a(this, "prevBtn");
    a(this, "nextBtn");
    a(this, "viewsNav");
    a(this, "callout");
    a(this, "calloutArrow");
    a(this, "calloutTitle");
    a(this, "calloutDescription");
    a(this, "calloutAdvantages");
    a(this, "currentIndex", 0);
    a(this, "lastFocused", null);
    a(this, "repositionHandler", null);
    this.root = t, this.data = e, this.img = this.require(".house-viewer__image"), this.overlay = this.require(".house-viewer__overlay"), this.hitAreas = this.require(".house-viewer__hit-areas"), this.prevBtn = t.querySelector(".house-viewer__arrow--prev"), this.nextBtn = t.querySelector(".house-viewer__arrow--next"), this.viewsNav = t.querySelector(".house-viewer__views"), this.callout = this.requireGlobal("#hv-callout"), this.calloutArrow = this.requireGlobal(".hv-callout__arrow"), this.calloutTitle = this.requireGlobal("#hv-callout-title"), this.calloutDescription = this.requireGlobal("#hv-callout-description"), this.calloutAdvantages = this.requireGlobal("#hv-callout-advantages"), this.bindNav(), this.bindCalloutClose(), this.bindSystemButtons(), this.renderView(0);
  }
  require(t) {
    const e = this.root.querySelector(t);
    if (!e) throw new Error(`HouseViewer: brak elementu "${t}" w kontenerze.`);
    return e;
  }
  requireGlobal(t) {
    const e = document.querySelector(t);
    if (!e) throw new Error(`HouseViewer: brak elementu globalnego "${t}".`);
    return e;
  }
  bindNav() {
    var e, i;
    const t = this.data.views.length > 1;
    this.prevBtn && (this.prevBtn.hidden = !t), this.nextBtn && (this.nextBtn.hidden = !t), (e = this.prevBtn) == null || e.addEventListener("click", () => this.step(-1)), (i = this.nextBtn) == null || i.addEventListener("click", () => this.step(1)), this.viewsNav && (this.viewsNav.innerHTML = "", this.data.views.forEach((s, o) => {
      var u;
      const r = document.createElement("button");
      r.type = "button", r.className = "house-viewer__view-btn", r.textContent = s.title, r.setAttribute("role", "tab"), r.setAttribute("aria-selected", o === this.currentIndex ? "true" : "false"), r.tabIndex = o === this.currentIndex ? 0 : -1, r.addEventListener("click", () => this.renderView(o)), (u = this.viewsNav) == null || u.appendChild(r);
    })), this.root.addEventListener("keydown", (s) => {
      s.key === "ArrowLeft" && (s.preventDefault(), this.step(-1)), s.key === "ArrowRight" && (s.preventDefault(), this.step(1));
    });
  }
  bindCalloutClose() {
    this.callout.querySelectorAll("[data-close]").forEach(
      (t) => t.addEventListener("click", () => this.closeCallout())
    ), document.addEventListener("keydown", (t) => {
      t.key === "Escape" && !this.callout.hidden && this.closeCallout();
    }), document.addEventListener("click", (t) => {
      if (this.callout.hidden) return;
      const e = t.target;
      this.callout.contains(e) || e.closest("[data-system-id], .house-viewer__hit-area") || this.closeCallout();
    });
  }
  bindSystemButtons() {
    document.querySelectorAll("[data-system-id]").forEach((t) => {
      t.addEventListener("click", () => this.activateSystem(t.dataset.systemId, t));
    });
  }
  findHotspot(t) {
    for (let e = 0; e < this.data.views.length; e++) {
      const i = this.data.views[e].hotspots.find((s) => s.systemId === t);
      if (i) return { viewIndex: e, hotspot: i };
    }
    return null;
  }
  findSystemSummary(t) {
    return this.data.systems.find((e) => e.systemId === t);
  }
  /**
   * Klik na przycisku systemu z listy: jeśli system ma hotspot na innym widoku,
   * przełącza tam, po animacji otwiera dymek przy hotspocie i go pulsuje. Jeśli
   * hotspot nie istnieje (widok jeszcze nie gotowy), dymek otwiera się przy samym
   * przycisku z listy - zawsze przy czymś klikalnym, nigdy "znikąd".
   */
  activateSystem(t, e) {
    const i = this.findHotspot(t);
    if (!i) {
      const r = this.findSystemSummary(t);
      r && this.openCallout(r, e);
      return;
    }
    const { viewIndex: s, hotspot: o } = i;
    if (s === this.currentIndex) {
      const r = this.hitAreaFor(o.systemId);
      this.openCallout(o, r ?? e), this.pulseHotspot(o.systemId);
    } else
      this.renderView(s, () => {
        const r = this.hitAreaFor(o.systemId);
        this.openCallout(o, r ?? e), this.pulseHotspot(o.systemId);
      });
  }
  hitAreaFor(t) {
    return this.hitAreas.querySelector(`[data-system-id="${CSS.escape(t)}"]`);
  }
  pulseHotspot(t) {
    const i = this.data.views[this.currentIndex].hotspots.findIndex((o) => o.systemId === t);
    if (i === -1) return;
    const s = this.overlay.querySelectorAll("polygon")[i];
    s && d.fromTo(
      s,
      { scale: 1, transformOrigin: "50% 50%" },
      { scale: 1.05, duration: 0.25, yoyo: !0, repeat: 3, ease: "power1.inOut" }
    );
  }
  step(t) {
    const e = this.data.views.length, i = (this.currentIndex + t + e) % e;
    this.renderView(i);
  }
  renderView(t, e) {
    const i = !this.img.src;
    this.currentIndex = t;
    const s = this.data.views[t];
    i || this.closeCallout();
    const o = () => {
      this.img.src = s.image, this.img.alt = s.title, this.buildHotspots(s), this.syncViewButtons(), d.fromTo([this.img, this.overlay], { opacity: 0 }, { opacity: 1, duration: 0.35, onComplete: e });
    };
    i ? o() : d.to([this.img, this.overlay], { opacity: 0, duration: 0.2, onComplete: o });
  }
  syncViewButtons() {
    if (!this.viewsNav) return;
    Array.from(this.viewsNav.querySelectorAll(".house-viewer__view-btn")).forEach((e, i) => {
      const s = i === this.currentIndex;
      e.classList.toggle("is-active", s), e.setAttribute("aria-selected", s ? "true" : "false"), e.tabIndex = s ? 0 : -1;
    });
  }
  buildHotspots(t) {
    this.overlay.innerHTML = "", this.hitAreas.innerHTML = "", t.hotspots.forEach((e, i) => {
      const s = this.createPolygon(e);
      this.overlay.appendChild(s);
      const o = this.createHitArea(e, s);
      this.hitAreas.appendChild(o), d.fromTo(s, { opacity: 0 }, { opacity: 1, duration: 0.35, delay: 0.15 + i * 0.08 });
    });
  }
  createPolygon(t) {
    const e = document.createElementNS(g, "polygon"), i = t.polygon.map(([s, o]) => `${s},${o}`).join(" ");
    return e.setAttribute("points", i), e.setAttribute("class", "house-viewer__hotspot"), e;
  }
  createHitArea(t, e) {
    const i = t.polygon.map(([v]) => v), s = t.polygon.map(([, v]) => v), o = Math.min(...i), r = Math.min(...s), u = Math.max(...i) - o, p = Math.max(...s) - r, n = document.createElement("button");
    n.type = "button", n.className = "house-viewer__hit-area", n.dataset.systemId = t.systemId, n.style.left = `${o}%`, n.style.top = `${r}%`, n.style.width = `${u}%`, n.style.height = `${p}%`, n.setAttribute("aria-label", `${t.name} – pokaż szczegóły`);
    const h = () => e.classList.add("is-active"), c = () => e.classList.remove("is-active");
    return n.addEventListener("mouseenter", h), n.addEventListener("mouseleave", c), n.addEventListener("focus", h), n.addEventListener("blur", c), n.addEventListener("click", () => this.openCallout(t, n)), n;
  }
  openCallout(t, e) {
    var i;
    this.lastFocused = e, this.calloutTitle.textContent = t.name, this.calloutDescription.textContent = t.description, this.calloutAdvantages.innerHTML = "", t.advantages.forEach((s) => {
      const o = document.createElement("li");
      o.textContent = s, this.calloutAdvantages.appendChild(o);
    }), this.positionCallout(e), d.fromTo(this.callout, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" }), (i = this.callout.querySelector(".hv-callout__close")) == null || i.focus(), this.repositionHandler || (this.repositionHandler = () => this.closeCallout(), window.addEventListener("scroll", this.repositionHandler, { passive: !0, once: !0 }), window.addEventListener("resize", this.repositionHandler, { once: !0 }));
  }
  /**
   * Pozycjonuje dymek obok `target` (hotspot na obrazie LUB przycisk z listy) i ustawia
   * strzałkę tak, żeby wskazywała dokładnie na ten element. Liczone w px względem
   * viewportu (position: fixed), więc działa identycznie niezależnie od tego, gdzie
   * na stronie leży `target`.
   */
  positionCallout(t) {
    const i = t.getBoundingClientRect();
    this.callout.style.visibility = "hidden", this.callout.hidden = !1;
    const s = this.callout.getBoundingClientRect(), o = window.innerWidth, r = window.innerHeight, u = o - i.right, p = i.left;
    let n, h;
    u >= s.width + 14 ? (n = i.right + 14, h = "left") : p >= s.width + 14 ? (n = i.left - 14 - s.width, h = "right") : (n = Math.max(14, Math.min(i.left, o - s.width - 14)), h = "none");
    let c = h === "none" ? i.bottom + 14 : i.top + i.height / 2 - s.height / 2;
    if (c = Math.max(14, Math.min(c, r - s.height - 14)), n = Math.max(14, Math.min(n, o - s.width - 14)), this.callout.style.left = `${n}px`, this.callout.style.top = `${c}px`, this.callout.style.visibility = "visible", this.calloutArrow.classList.remove("hv-callout__arrow--left", "hv-callout__arrow--right", "hv-callout__arrow--none"), this.calloutArrow.classList.add(`hv-callout__arrow--${h}`), h !== "none") {
      const v = i.top + i.height / 2 - c;
      this.calloutArrow.style.top = `${Math.max(14, Math.min(v, s.height - 14))}px`;
    }
  }
  closeCallout() {
    this.callout.hidden || (d.to(this.callout, {
      opacity: 0,
      scale: 0.96,
      duration: 0.15,
      onComplete: () => {
        var t;
        this.callout.hidden = !0, (t = this.lastFocused) == null || t.focus();
      }
    }), this.repositionHandler && (window.removeEventListener("scroll", this.repositionHandler), window.removeEventListener("resize", this.repositionHandler), this.repositionHandler = null));
  }
}
function m() {
  var i;
  const l = document.getElementById("house-viewer"), t = document.getElementById("house-viewer-data");
  if (!l || !(t != null && t.textContent)) return;
  let e;
  try {
    e = JSON.parse(t.textContent);
  } catch {
    console.error("HouseViewer: nie udało się sparsować danych widoku.");
    return;
  }
  (i = e.views) != null && i.length && new f(l, e);
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", m) : m();
