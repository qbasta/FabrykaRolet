var v = Object.defineProperty;
var y = (l, t, e) => t in l ? v(l, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : l[t] = e;
var o = (l, t, e) => y(l, typeof t != "symbol" ? t + "" : t, e);
import { g as d } from "./index-9nJrthwM.js";
const w = "http://www.w3.org/2000/svg";
class g {
  constructor(t, e) {
    o(this, "img");
    o(this, "overlay");
    o(this, "hitAreas");
    o(this, "prevBtn");
    o(this, "nextBtn");
    o(this, "viewsNav");
    o(this, "modal");
    o(this, "modalPanel");
    o(this, "modalTitle");
    o(this, "modalDescription");
    o(this, "modalAdvantages");
    o(this, "infoTitle");
    o(this, "infoDescription");
    o(this, "infoAdvantages");
    o(this, "filterButtons");
    o(this, "systemButtons");
    o(this, "listEmpty");
    o(this, "currentIndex", 0);
    o(this, "lastFocused", null);
    this.root = t, this.data = e, this.img = this.require(".house-viewer__image"), this.overlay = this.require(".house-viewer__overlay"), this.hitAreas = this.require(".house-viewer__hit-areas"), this.prevBtn = t.querySelector(".house-viewer__arrow--prev"), this.nextBtn = t.querySelector(".house-viewer__arrow--next"), this.viewsNav = t.querySelector(".house-viewer__views"), this.modal = this.requireGlobal("#house-viewer-modal"), this.modalPanel = this.requireGlobal(".hv-modal__panel"), this.modalTitle = this.requireGlobal("#hv-modal-title"), this.modalDescription = this.requireGlobal("#hv-modal-description"), this.modalAdvantages = this.requireGlobal("#hv-modal-advantages"), this.infoTitle = document.querySelector("#hv-info-title"), this.infoDescription = document.querySelector("#hv-info-description"), this.infoAdvantages = document.querySelector("#hv-info-advantages"), this.filterButtons = Array.from(document.querySelectorAll("[data-filter]")), this.systemButtons = Array.from(document.querySelectorAll("[data-system-id]")), this.listEmpty = document.querySelector(".system-list__empty"), this.bindNav(), this.bindModalClose(), this.bindSystemButtons(), this.bindFilters(), this.renderView(0), this.applyFilter("all");
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
    var e, s;
    const t = this.data.views.length > 1;
    this.prevBtn && (this.prevBtn.hidden = !t), this.nextBtn && (this.nextBtn.hidden = !t), (e = this.prevBtn) == null || e.addEventListener("click", () => this.step(-1)), (s = this.nextBtn) == null || s.addEventListener("click", () => this.step(1)), this.viewsNav && (this.viewsNav.innerHTML = "", this.data.views.forEach((i, n) => {
      var h;
      const a = document.createElement("button");
      a.type = "button", a.className = "house-viewer__view-btn", a.textContent = i.title, a.setAttribute("role", "tab"), a.setAttribute("aria-selected", n === this.currentIndex ? "true" : "false"), a.tabIndex = n === this.currentIndex ? 0 : -1, a.addEventListener("click", () => this.renderView(n)), (h = this.viewsNav) == null || h.appendChild(a);
    })), this.root.addEventListener("keydown", (i) => {
      i.key === "ArrowLeft" && (i.preventDefault(), this.step(-1)), i.key === "ArrowRight" && (i.preventDefault(), this.step(1));
    });
  }
  bindModalClose() {
    this.modal.querySelectorAll("[data-close]").forEach(
      (t) => t.addEventListener("click", () => this.closeModal())
    ), document.addEventListener("keydown", (t) => {
      t.key === "Escape" && !this.modal.hidden && this.closeModal(), t.key === "Tab" && !this.modal.hidden && this.trapFocus(t);
    });
  }
  trapFocus(t) {
    const e = Array.from(
      this.modalPanel.querySelectorAll(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      )
    ).filter((a) => !a.hasAttribute("disabled"));
    if (!e.length) return;
    const s = e[0], i = e[e.length - 1], n = document.activeElement;
    if (t.shiftKey && n === s) {
      t.preventDefault(), i.focus();
      return;
    }
    !t.shiftKey && n === i && (t.preventDefault(), s.focus());
  }
  bindSystemButtons() {
    this.systemButtons.forEach((t) => {
      t.addEventListener("click", () => this.activateSystem(t.dataset.systemId, t));
    });
  }
  bindFilters() {
    this.filterButtons.forEach((t) => {
      const e = t.dataset.filter;
      e && t.addEventListener("click", () => {
        this.applyFilter(e);
      });
    });
  }
  applyFilter(t) {
    this.filterButtons.forEach((s) => {
      const i = s.dataset.filter === t;
      s.classList.toggle("is-active", i), s.setAttribute("aria-pressed", i ? "true" : "false");
    });
    let e = 0;
    this.systemButtons.forEach((s) => {
      const i = s.dataset.systemSection, n = t === "all" || i === t;
      s.hidden = !n, n && e++;
    }), this.listEmpty && (this.listEmpty.hidden = e > 0);
  }
  findHotspot(t) {
    for (let e = 0; e < this.data.views.length; e++) {
      const s = this.data.views[e].hotspots.find((i) => i.systemId === t);
      if (s) return { viewIndex: e, hotspot: s };
    }
    return null;
  }
  findSystemSummary(t) {
    return this.data.systems.find((e) => e.systemId === t);
  }
  activateSystem(t, e) {
    const s = this.findHotspot(t);
    if (!s) {
      const a = this.findSystemSummary(t);
      a && (this.updateInfoPanel(a), this.openModal(a, e));
      return;
    }
    const { viewIndex: i, hotspot: n } = s;
    i === this.currentIndex ? (this.updateInfoPanel(n), this.openModal(n, e), this.pulseHotspot(n.systemId)) : this.renderView(i, () => {
      this.updateInfoPanel(n), this.openModal(n, e), this.pulseHotspot(n.systemId);
    });
  }
  updateInfoPanel(t) {
    if (!this.infoTitle || !this.infoDescription || !this.infoAdvantages) return;
    const e = this.infoAdvantages;
    this.infoTitle.textContent = t.name, this.infoDescription.textContent = t.description, e.innerHTML = "", t.advantages.forEach((s) => {
      const i = document.createElement("li");
      i.textContent = s, e.appendChild(i);
    });
  }
  pulseHotspot(t) {
    const s = this.data.views[this.currentIndex].hotspots.findIndex((n) => n.systemId === t);
    if (s === -1) return;
    const i = this.overlay.querySelectorAll("polygon")[s];
    i && d.fromTo(
      i,
      { scale: 1, transformOrigin: "50% 50%" },
      { scale: 1.05, duration: 0.25, yoyo: !0, repeat: 3, ease: "power1.inOut" }
    );
  }
  step(t) {
    const e = this.data.views.length, s = (this.currentIndex + t + e) % e;
    this.renderView(s);
  }
  renderView(t, e) {
    const s = !this.img.src;
    this.currentIndex = t;
    const i = this.data.views[t], n = () => {
      this.img.src = i.image, this.img.alt = i.title, this.buildHotspots(i), this.syncViewButtons(), d.fromTo([this.img, this.overlay], { opacity: 0 }, { opacity: 1, duration: 0.35, onComplete: e });
    };
    s ? n() : d.to([this.img, this.overlay], { opacity: 0, duration: 0.2, onComplete: n });
  }
  syncViewButtons() {
    if (!this.viewsNav) return;
    Array.from(this.viewsNav.querySelectorAll(".house-viewer__view-btn")).forEach((e, s) => {
      const i = s === this.currentIndex;
      e.classList.toggle("is-active", i), e.setAttribute("aria-selected", i ? "true" : "false"), e.tabIndex = i ? 0 : -1;
    });
  }
  buildHotspots(t) {
    this.overlay.innerHTML = "", this.hitAreas.innerHTML = "", t.hotspots.forEach((e, s) => {
      const i = this.createPolygon(e);
      this.overlay.appendChild(i);
      const n = this.createHitArea(e, i);
      this.hitAreas.appendChild(n), d.fromTo(i, { opacity: 0 }, { opacity: 1, duration: 0.35, delay: 0.15 + s * 0.08 });
    });
  }
  createPolygon(t) {
    const e = document.createElementNS(w, "polygon"), s = t.polygon.map(([i, n]) => `${i},${n}`).join(" ");
    return e.setAttribute("points", s), e.setAttribute("class", "house-viewer__hotspot"), e;
  }
  createHitArea(t, e) {
    const s = t.polygon.map(([c]) => c), i = t.polygon.map(([, c]) => c), n = Math.min(...s), a = Math.min(...i), h = Math.max(...s) - n, f = Math.max(...i) - a, r = document.createElement("button");
    r.type = "button", r.className = "house-viewer__hit-area", r.style.left = `${n}%`, r.style.top = `${a}%`, r.style.width = `${h}%`, r.style.height = `${f}%`, r.setAttribute("aria-label", `${t.name} – pokaż szczegóły`);
    const u = () => e.classList.add("is-active"), m = () => e.classList.remove("is-active");
    return r.addEventListener("mouseenter", u), r.addEventListener("mouseleave", m), r.addEventListener("focus", u), r.addEventListener("blur", m), r.addEventListener("click", () => {
      this.updateInfoPanel(t), this.openModal(t, r);
    }), r;
  }
  openModal(t, e) {
    this.lastFocused = e, this.modalTitle.textContent = t.name, this.modalDescription.textContent = t.description, this.modalAdvantages.innerHTML = "", t.advantages.forEach((s) => {
      const i = document.createElement("li");
      i.textContent = s, this.modalAdvantages.appendChild(i);
    }), this.modal.hidden = !1, d.fromTo(
      this.modalPanel,
      { opacity: 0, scale: 0.96, y: 8 },
      { opacity: 1, scale: 1, y: 0, duration: 0.25, ease: "power2.out" }
    ), this.modalPanel.focus();
  }
  closeModal() {
    d.to(this.modalPanel, {
      opacity: 0,
      scale: 0.96,
      y: 8,
      duration: 0.18,
      onComplete: () => {
        var t;
        this.modal.hidden = !0, (t = this.lastFocused) == null || t.focus();
      }
    });
  }
}
function p() {
  var s;
  const l = document.getElementById("house-viewer"), t = document.getElementById("house-viewer-data");
  if (!l || !(t != null && t.textContent)) return;
  let e;
  try {
    e = JSON.parse(t.textContent);
  } catch {
    console.error("HouseViewer: nie udało się sparsować danych widoku.");
    return;
  }
  (s = e.views) != null && s.length && new g(l, e);
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", p) : p();
