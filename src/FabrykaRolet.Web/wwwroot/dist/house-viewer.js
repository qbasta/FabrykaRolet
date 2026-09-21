var v = Object.defineProperty;
var w = (r, e, t) => e in r ? v(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var a = (r, e, t) => w(r, typeof e != "symbol" ? e + "" : e, t);
import { g as l } from "./index-9nJrthwM.js";
const f = "http://www.w3.org/2000/svg";
class g {
  constructor(e, t) {
    a(this, "img");
    a(this, "overlay");
    a(this, "hitAreas");
    a(this, "prevBtn");
    a(this, "nextBtn");
    a(this, "modal");
    a(this, "modalPanel");
    a(this, "modalTitle");
    a(this, "modalDescription");
    a(this, "modalAdvantages");
    a(this, "currentIndex", 0);
    a(this, "lastFocused", null);
    this.root = e, this.data = t, this.img = this.require(".house-viewer__image"), this.overlay = this.require(".house-viewer__overlay"), this.hitAreas = this.require(".house-viewer__hit-areas"), this.prevBtn = e.querySelector(".house-viewer__arrow--prev"), this.nextBtn = e.querySelector(".house-viewer__arrow--next"), this.modal = this.requireGlobal("#house-viewer-modal"), this.modalPanel = this.requireGlobal(".hv-modal__panel"), this.modalTitle = this.requireGlobal("#hv-modal-title"), this.modalDescription = this.requireGlobal("#hv-modal-description"), this.modalAdvantages = this.requireGlobal("#hv-modal-advantages"), this.bindNav(), this.bindModalClose(), this.bindSystemButtons(), this.renderView(0);
  }
  require(e) {
    const t = this.root.querySelector(e);
    if (!t) throw new Error(`HouseViewer: brak elementu "${e}" w kontenerze.`);
    return t;
  }
  requireGlobal(e) {
    const t = document.querySelector(e);
    if (!t) throw new Error(`HouseViewer: brak elementu globalnego "${e}".`);
    return t;
  }
  bindNav() {
    var t, s;
    const e = this.data.views.length > 1;
    this.prevBtn && (this.prevBtn.hidden = !e), this.nextBtn && (this.nextBtn.hidden = !e), (t = this.prevBtn) == null || t.addEventListener("click", () => this.step(-1)), (s = this.nextBtn) == null || s.addEventListener("click", () => this.step(1));
  }
  bindModalClose() {
    this.modal.querySelectorAll("[data-close]").forEach(
      (e) => e.addEventListener("click", () => this.closeModal())
    ), document.addEventListener("keydown", (e) => {
      e.key === "Escape" && !this.modal.hidden && this.closeModal();
    });
  }
  /**
   * Przyciski listy systemów żyją POZA kontenerem widgetu (osobna sekcja na stronie),
   * więc szukamy ich w całym dokumencie, nie tylko wewnątrz `root`.
   */
  bindSystemButtons() {
    document.querySelectorAll("[data-system-id]").forEach((e) => {
      e.addEventListener("click", () => this.activateSystem(e.dataset.systemId, e));
    });
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
  /**
   * Kliknięcie przycisku systemu z listy pod domem: jeśli system ma hotspot na
   * (innym) widoku - przełącza tam i po animacji otwiera opis, podświetlając hotspot.
   * Jeśli nie ma jeszcze żadnego hotspotu (widok dla niego nie istnieje) - po prostu
   * otwiera opis w tym samym oknie, bez zmiany widoku.
   */
  activateSystem(e, t) {
    const s = this.findHotspot(e);
    if (!s) {
      const d = this.findSystemSummary(e);
      d && this.openModal(d, t);
      return;
    }
    const { viewIndex: i, hotspot: o } = s;
    i === this.currentIndex ? (this.openModal(o, t), this.pulseHotspot(o.systemId)) : this.renderView(i, () => {
      this.openModal(o, t), this.pulseHotspot(o.systemId);
    });
  }
  pulseHotspot(e) {
    const s = this.data.views[this.currentIndex].hotspots.findIndex((o) => o.systemId === e);
    if (s === -1) return;
    const i = this.overlay.querySelectorAll("polygon")[s];
    i && l.fromTo(
      i,
      { scale: 1, transformOrigin: "50% 50%" },
      { scale: 1.05, duration: 0.25, yoyo: !0, repeat: 3, ease: "power1.inOut" }
    );
  }
  step(e) {
    const t = this.data.views.length, s = (this.currentIndex + e + t) % t;
    this.renderView(s);
  }
  renderView(e, t) {
    const s = !this.img.src;
    this.currentIndex = e;
    const i = this.data.views[e], o = () => {
      this.img.src = i.image, this.img.alt = i.title, this.buildHotspots(i), l.fromTo([this.img, this.overlay], { opacity: 0 }, { opacity: 1, duration: 0.35, onComplete: t });
    };
    s ? o() : l.to([this.img, this.overlay], { opacity: 0, duration: 0.2, onComplete: o });
  }
  buildHotspots(e) {
    this.overlay.innerHTML = "", this.hitAreas.innerHTML = "", e.hotspots.forEach((t, s) => {
      const i = this.createPolygon(t);
      this.overlay.appendChild(i);
      const o = this.createHitArea(t, i);
      this.hitAreas.appendChild(o), l.fromTo(
        i,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, delay: 0.15 + s * 0.08 }
      );
    });
  }
  createPolygon(e) {
    const t = document.createElementNS(f, "polygon"), s = e.polygon.map(([i, o]) => `${i},${o}`).join(" ");
    return t.setAttribute("points", s), t.setAttribute("class", "house-viewer__hotspot"), t;
  }
  createHitArea(e, t) {
    const s = e.polygon.map(([h]) => h), i = e.polygon.map(([, h]) => h), o = Math.min(...s), d = Math.min(...i), p = Math.max(...s) - o, y = Math.max(...i) - d, n = document.createElement("button");
    n.type = "button", n.className = "house-viewer__hit-area", n.style.left = `${o}%`, n.style.top = `${d}%`, n.style.width = `${p}%`, n.style.height = `${y}%`, n.setAttribute("aria-label", `${e.name} – pokaż szczegóły`);
    const c = () => t.classList.add("is-active"), u = () => t.classList.remove("is-active");
    return n.addEventListener("mouseenter", c), n.addEventListener("mouseleave", u), n.addEventListener("focus", c), n.addEventListener("blur", u), n.addEventListener("click", () => this.openModal(e, n)), n;
  }
  openModal(e, t) {
    this.lastFocused = t, this.modalTitle.textContent = e.name, this.modalDescription.textContent = e.description, this.modalAdvantages.innerHTML = "", e.advantages.forEach((s) => {
      const i = document.createElement("li");
      i.textContent = s, this.modalAdvantages.appendChild(i);
    }), this.modal.hidden = !1, l.fromTo(
      this.modalPanel,
      { opacity: 0, scale: 0.96, y: 8 },
      { opacity: 1, scale: 1, y: 0, duration: 0.25, ease: "power2.out" }
    ), this.modalPanel.focus();
  }
  closeModal() {
    l.to(this.modalPanel, {
      opacity: 0,
      scale: 0.96,
      y: 8,
      duration: 0.18,
      onComplete: () => {
        var e;
        this.modal.hidden = !0, (e = this.lastFocused) == null || e.focus();
      }
    });
  }
}
function m() {
  var s;
  const r = document.getElementById("house-viewer"), e = document.getElementById("house-viewer-data");
  if (!r || !(e != null && e.textContent)) return;
  let t;
  try {
    t = JSON.parse(e.textContent);
  } catch {
    console.error("HouseViewer: nie udało się sparsować danych widoku.");
    return;
  }
  (s = t.views) != null && s.length && new g(r, t);
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", m) : m();
