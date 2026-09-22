var Ci = Object.defineProperty;
var ki = (i, e, n) => e in i ? Ci(i, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : i[e] = n;
var ct = (i, e, n) => ki(i, typeof e != "symbol" ? e + "" : e, n);
import { g as jr } from "./index-9nJrthwM.js";
function Ti(i, e) {
  for (var n = 0; n < e.length; n++) {
    var t = e[n];
    t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(i, t.key, t);
  }
}
function Ei(i, e, n) {
  return e && Ti(i.prototype, e), i;
}
/*!
 * Observer 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var ve, Ur, Ue, Rt, At, or, jn, Ht, sr, ei, xt, ot, ti, ri = function() {
  return ve || typeof window < "u" && (ve = window.gsap) && ve.registerPlugin && ve;
}, ni = 1, ir = [], M = [], dt = [], xr = Date.now, hn = function(e, n) {
  return n;
}, Pi = function() {
  var e = sr.core, n = e.bridge || {}, t = e._scrollers, r = e._proxies;
  t.push.apply(t, M), r.push.apply(r, dt), M = t, dt = r, hn = function(l, s) {
    return n[l](s);
  };
}, Ot = function(e, n) {
  return ~dt.indexOf(e) && dt[dt.indexOf(e) + 1][n];
}, br = function(e) {
  return !!~ei.indexOf(e);
}, Oe = function(e, n, t, r, o) {
  return e.addEventListener(n, t, {
    passive: r !== !1,
    capture: !!o
  });
}, Ae = function(e, n, t, r) {
  return e.removeEventListener(n, t, !!r);
}, Ir = "scrollLeft", Yr = "scrollTop", gn = function() {
  return xt && xt.isPressed || M.cache++;
}, en = function(e, n) {
  var t = function r(o) {
    if (o || o === 0) {
      ni && (Ue.history.scrollRestoration = "manual");
      var l = xt && xt.isPressed;
      o = r.v = Math.round(o) || (xt && xt.iOS ? 1 : 0), e(o), r.cacheID = M.cache, l && hn("ss", o);
    } else (n || M.cache !== r.cacheID || hn("ref")) && (r.cacheID = M.cache, r.v = e());
    return r.v + r.offset;
  };
  return t.offset = 0, e && t;
}, ze = {
  s: Ir,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: en(function(i) {
    return arguments.length ? Ue.scrollTo(i, le.sc()) : Ue.pageXOffset || Rt[Ir] || At[Ir] || or[Ir] || 0;
  })
}, le = {
  s: Yr,
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: ze,
  sc: en(function(i) {
    return arguments.length ? Ue.scrollTo(ze.sc(), i) : Ue.pageYOffset || Rt[Yr] || At[Yr] || or[Yr] || 0;
  })
}, Ne = function(e, n) {
  return (n && n._ctx && n._ctx.selector || ve.utils.toArray)(e)[0] || (typeof e == "string" && ve.config().nullTargetWarn !== !1 ? console.warn("Element not found:", e) : null);
}, Mi = function(e, n) {
  for (var t = n.length; t--; )
    if (n[t] === e || n[t].contains(e))
      return !0;
  return !1;
}, Lt = function(e, n) {
  var t = n.s, r = n.sc;
  br(e) && (e = Rt.scrollingElement || At);
  var o = M.indexOf(e), l = r === le.sc ? 1 : 2;
  !~o && (o = M.push(e) - 1), M[o + l] || Oe(e, "scroll", gn);
  var s = M[o + l], f = s || (M[o + l] = en(Ot(e, t), !0) || (br(e) ? r : en(function(y) {
    return arguments.length ? e[t] = y : e[t];
  })));
  return f.target = e, s || (f.smooth = ve.getProperty(e, "scrollBehavior") === "smooth"), f;
}, _n = function(e, n, t) {
  var r = e, o = e, l = xr(), s = l, f = n || 50, y = Math.max(500, f * 3), A = function(v, $) {
    var N = xr();
    $ || N - l > f ? (o = r, r = v, s = l, l = N) : t ? r += v : r = o + (v - o) / (N - s) * (l - s);
  }, T = function() {
    o = r = t ? 0 : r, s = l = 0;
  }, h = function(v) {
    var $ = s, N = o, ne = xr();
    return (v || v === 0) && v !== r && A(v), l === s || ne - s > y ? 0 : (r + (t ? N : -N)) / ((t ? ne : l) - $) * 1e3;
  };
  return {
    update: A,
    reset: T,
    getVelocity: h
  };
}, hr = function(e, n) {
  return n && !e._gsapAllow && e.cancelable !== !1 && e.preventDefault(), e.changedTouches ? e.changedTouches[0] : e;
}, On = function(e) {
  var n = Math.max.apply(Math, e), t = Math.min.apply(Math, e);
  return Math.abs(n) >= Math.abs(t) ? n : t;
}, ii = function() {
  sr = ve.core.globals().ScrollTrigger, sr && sr.core && Pi();
}, oi = function(e) {
  return ve = e || ri(), !Ur && ve && typeof document < "u" && document.body && (Ue = window, Rt = document, At = Rt.documentElement, or = Rt.body, ei = [Ue, Rt, At, or], ve.utils.clamp, ti = ve.core.context || function() {
  }, Ht = "onpointerenter" in or ? "pointer" : "mouse", jn = J.isTouch = Ue.matchMedia && Ue.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in Ue || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, ot = J.eventTypes = ("ontouchstart" in At ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in At ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
    return ni = 0;
  }, 500), Ur = 1), sr || ii(), Ur;
};
ze.op = le;
M.cache = 0;
var J = /* @__PURE__ */ (function() {
  function i(n) {
    this.init(n);
  }
  var e = i.prototype;
  return e.init = function(t) {
    Ur || oi(ve) || console.warn("Please gsap.registerPlugin(Observer)"), sr || ii();
    var r = t.tolerance, o = t.dragMinimum, l = t.type, s = t.target, f = t.lineHeight, y = t.debounce, A = t.preventDefault, T = t.onStop, h = t.onStopDelay, u = t.ignore, v = t.wheelSpeed, $ = t.event, N = t.onDragStart, ne = t.onDragEnd, W = t.onDrag, he = t.onPress, k = t.onRelease, Ve = t.onRight, H = t.onLeft, x = t.onUp, Te = t.onDown, Be = t.onChangeX, g = t.onChangeY, ce = t.onChange, w = t.onToggleX, pt = t.onToggleY, ie = t.onHover, Ee = t.onHoverEnd, Pe = t.onMove, B = t.ignoreCheck, Q = t.isNormalizer, j = t.onGestureStart, a = t.onGestureEnd, oe = t.onWheel, It = t.onEnable, St = t.onDisable, Ke = t.onClick, ht = t.scrollSpeed, me = t.capture, ee = t.allowClicks, Me = t.lockAxis, ye = t.onLockAxis;
    this.target = s = Ne(s) || At, this.vars = t, u && (u = ve.utils.toArray(u)), r = r || 1e-9, o = o || 0, v = v || 1, ht = ht || 1, l = l || "wheel,touch,pointer", y = y !== !1, f || (f = parseFloat(Ue.getComputedStyle(or).lineHeight) || 22);
    var Ct, De, Re, L, V, Fe, He, c = this, Xe = 0, gt = 0, kt = t.passive || !A && t.passive !== !1, G = Lt(s, ze), _t = Lt(s, le), Tt = G(), Yt = _t(), ue = ~l.indexOf("touch") && !~l.indexOf("pointer") && ot[0] === "pointerdown", Et = br(s), K = s.ownerDocument || Rt, et = [0, 0, 0], Ze = [0, 0, 0], vt = 0, ur = function() {
      return vt = xr();
    }, te = function(m, I) {
      return (c.event = m) && u && Mi(m.target, u) || I && ue && m.pointerType !== "touch" || B && B(m, I);
    }, Ar = function() {
      c._vx.reset(), c._vy.reset(), De.pause(), T && T(c);
    }, mt = function() {
      var m = c.deltaX = On(et), I = c.deltaY = On(Ze), d = Math.abs(m) >= r, b = Math.abs(I) >= r;
      ce && (d || b) && ce(c, m, I, et, Ze), d && (Ve && c.deltaX > 0 && Ve(c), H && c.deltaX < 0 && H(c), Be && Be(c), w && c.deltaX < 0 != Xe < 0 && w(c), Xe = c.deltaX, et[0] = et[1] = et[2] = 0), b && (Te && c.deltaY > 0 && Te(c), x && c.deltaY < 0 && x(c), g && g(c), pt && c.deltaY < 0 != gt < 0 && pt(c), gt = c.deltaY, Ze[0] = Ze[1] = Ze[2] = 0), (L || Re) && (Pe && Pe(c), Re && (N && Re === 1 && N(c), W && W(c), Re = 0), L = !1), Fe && !(Fe = !1) && ye && ye(c), V && (oe(c), V = !1), Ct = 0;
    }, Zt = function(m, I, d) {
      et[d] += m, Ze[d] += I, c._vx.update(m), c._vy.update(I), y ? Ct || (Ct = requestAnimationFrame(mt)) : mt();
    }, Jt = function(m, I) {
      Me && !He && (c.axis = He = Math.abs(m) > Math.abs(I) ? "x" : "y", Fe = !0), He !== "y" && (et[2] += m, c._vx.update(m, !0)), He !== "x" && (Ze[2] += I, c._vy.update(I, !0)), y ? Ct || (Ct = requestAnimationFrame(mt)) : mt();
    }, Pt = function(m) {
      if (!te(m, 1)) {
        m = hr(m, A);
        var I = m.clientX, d = m.clientY, b = I - c.x, _ = d - c.y, S = c.isDragging;
        c.x = I, c.y = d, (S || (b || _) && (Math.abs(c.startX - I) >= o || Math.abs(c.startY - d) >= o)) && (Re || (Re = S ? 2 : 1), S || (c.isDragging = !0), Jt(b, _));
      }
    }, zt = c.onPress = function(C) {
      te(C, 1) || C && C.button || (c.axis = He = null, De.pause(), c.isPressed = !0, C = hr(C), Xe = gt = 0, c.startX = c.x = C.clientX, c.startY = c.y = C.clientY, c._vx.reset(), c._vy.reset(), Oe(Q ? s : K, ot[1], Pt, kt, !0), c.deltaX = c.deltaY = 0, he && he(c));
    }, R = c.onRelease = function(C) {
      if (!te(C, 1)) {
        Ae(Q ? s : K, ot[1], Pt, !0);
        var m = !isNaN(c.y - c.startY), I = c.isDragging, d = I && (Math.abs(c.x - c.startX) > 3 || Math.abs(c.y - c.startY) > 3), b = hr(C);
        !d && m && (c._vx.reset(), c._vy.reset(), A && ee && ve.delayedCall(0.08, function() {
          if (xr() - vt > 300 && !C.defaultPrevented) {
            if (C.target.click)
              C.target.click();
            else if (K.createEvent) {
              var _ = K.createEvent("MouseEvents");
              _.initMouseEvent("click", !0, !0, Ue, 1, b.screenX, b.screenY, b.clientX, b.clientY, !1, !1, !1, !1, 0, null), C.target.dispatchEvent(_);
            }
          }
        })), c.isDragging = c.isGesturing = c.isPressed = !1, T && I && !Q && De.restart(!0), Re && mt(), ne && I && ne(c), k && k(c, d);
      }
    }, Bt = function(m) {
      return m.touches && m.touches.length > 1 && (c.isGesturing = !0) && j(m, c.isDragging);
    }, tt = function() {
      return (c.isGesturing = !1) || a(c);
    }, rt = function(m) {
      if (!te(m)) {
        var I = G(), d = _t();
        Zt((I - Tt) * ht, (d - Yt) * ht, 1), Tt = I, Yt = d, T && De.restart(!0);
      }
    }, nt = function(m) {
      if (!te(m)) {
        m = hr(m, A), oe && (V = !0);
        var I = (m.deltaMode === 1 ? f : m.deltaMode === 2 ? Ue.innerHeight : 1) * v;
        Zt(m.deltaX * I, m.deltaY * I, 0), T && !Q && De.restart(!0);
      }
    }, Ft = function(m) {
      if (!te(m)) {
        var I = m.clientX, d = m.clientY, b = I - c.x, _ = d - c.y;
        c.x = I, c.y = d, L = !0, T && De.restart(!0), (b || _) && Jt(b, _);
      }
    }, Qt = function(m) {
      c.event = m, ie(c);
    }, yt = function(m) {
      c.event = m, Ee(c);
    }, fr = function(m) {
      return te(m) || hr(m, A) && Ke(c);
    };
    De = c._dc = ve.delayedCall(h || 0.25, Ar).pause(), c.deltaX = c.deltaY = 0, c._vx = _n(0, 50, !0), c._vy = _n(0, 50, !0), c.scrollX = G, c.scrollY = _t, c.isDragging = c.isGesturing = c.isPressed = !1, ti(this), c.enable = function(C) {
      return c.isEnabled || (Oe(Et ? K : s, "scroll", gn), l.indexOf("scroll") >= 0 && Oe(Et ? K : s, "scroll", rt, kt, me), l.indexOf("wheel") >= 0 && Oe(s, "wheel", nt, kt, me), (l.indexOf("touch") >= 0 && jn || l.indexOf("pointer") >= 0) && (Oe(s, ot[0], zt, kt, me), Oe(K, ot[2], R), Oe(K, ot[3], R), ee && Oe(s, "click", ur, !0, !0), Ke && Oe(s, "click", fr), j && Oe(K, "gesturestart", Bt), a && Oe(K, "gestureend", tt), ie && Oe(s, Ht + "enter", Qt), Ee && Oe(s, Ht + "leave", yt), Pe && Oe(s, Ht + "move", Ft)), c.isEnabled = !0, c.isDragging = c.isGesturing = c.isPressed = L = Re = !1, c._vx.reset(), c._vy.reset(), Tt = G(), Yt = _t(), C && C.type && zt(C), It && It(c)), c;
    }, c.disable = function() {
      c.isEnabled && (ir.filter(function(C) {
        return C !== c && br(C.target);
      }).length || Ae(Et ? K : s, "scroll", gn), c.isPressed && (c._vx.reset(), c._vy.reset(), Ae(Q ? s : K, ot[1], Pt, !0)), Ae(Et ? K : s, "scroll", rt, me), Ae(s, "wheel", nt, me), Ae(s, ot[0], zt, me), Ae(K, ot[2], R), Ae(K, ot[3], R), Ae(s, "click", ur, !0), Ae(s, "click", fr), Ae(K, "gesturestart", Bt), Ae(K, "gestureend", tt), Ae(s, Ht + "enter", Qt), Ae(s, Ht + "leave", yt), Ae(s, Ht + "move", Ft), c.isEnabled = c.isPressed = c.isDragging = !1, St && St(c));
    }, c.kill = c.revert = function() {
      c.disable();
      var C = ir.indexOf(c);
      C >= 0 && ir.splice(C, 1), xt === c && (xt = 0);
    }, ir.push(c), Q && br(s) && (xt = c), c.enable($);
  }, Ei(i, [{
    key: "velocityX",
    get: function() {
      return this._vx.getVelocity();
    }
  }, {
    key: "velocityY",
    get: function() {
      return this._vy.getVelocity();
    }
  }]), i;
})();
J.version = "3.15.0";
J.create = function(i) {
  return new J(i);
};
J.register = oi;
J.getAll = function() {
  return ir.slice();
};
J.getById = function(i) {
  return ir.filter(function(e) {
    return e.vars.id === i;
  })[0];
};
ri() && ve.registerPlugin(J);
/*!
 * ScrollTrigger 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var p, rr, P, z, Ge, Y, Cn, tn, Dr, Sr, _r, zr, Se, on, vn, Ie, Ln, In, nr, si, an, ai, Le, mn, li, ci, Dt, yn, kn, ar, Tn, Cr, wn, ln, Br = 1, Ce = Date.now, cn = Ce(), je = 0, vr = 0, Yn = function(e, n, t) {
  var r = $e(e) && (e.substr(0, 6) === "clamp(" || e.indexOf("max") > -1);
  return t["_" + n + "Clamp"] = r, r ? e.substr(6, e.length - 7) : e;
}, zn = function(e, n) {
  return n && (!$e(e) || e.substr(0, 6) !== "clamp(") ? "clamp(" + e + ")" : e;
}, Di = function i() {
  return vr && requestAnimationFrame(i);
}, Bn = function() {
  return on = 1;
}, Fn = function() {
  return on = 0;
}, ut = function(e) {
  return e;
}, mr = function(e) {
  return Math.round(e * 1e5) / 1e5 || 0;
}, ui = function() {
  return typeof window < "u";
}, fi = function() {
  return p || ui() && (p = window.gsap) && p.registerPlugin && p;
}, Ut = function(e) {
  return !!~Cn.indexOf(e);
}, di = function(e) {
  return (e === "Height" ? Tn : P["inner" + e]) || Ge["client" + e] || Y["client" + e];
}, pi = function(e) {
  return Ot(e, "getBoundingClientRect") || (Ut(e) ? function() {
    return Qr.width = P.innerWidth, Qr.height = Tn, Qr;
  } : function() {
    return wt(e);
  });
}, Ri = function(e, n, t) {
  var r = t.d, o = t.d2, l = t.a;
  return (l = Ot(e, "getBoundingClientRect")) ? function() {
    return l()[r];
  } : function() {
    return (n ? di(o) : e["client" + o]) || 0;
  };
}, Ai = function(e, n) {
  return !n || ~dt.indexOf(e) ? pi(e) : function() {
    return Qr;
  };
}, ft = function(e, n) {
  var t = n.s, r = n.d2, o = n.d, l = n.a;
  return Math.max(0, (t = "scroll" + r) && (l = Ot(e, t)) ? l() - pi(e)()[o] : Ut(e) ? (Ge[t] || Y[t]) - di(r) : e[t] - e["offset" + r]);
}, Fr = function(e, n) {
  for (var t = 0; t < nr.length; t += 3)
    (!n || ~n.indexOf(nr[t + 1])) && e(nr[t], nr[t + 1], nr[t + 2]);
}, $e = function(e) {
  return typeof e == "string";
}, ke = function(e) {
  return typeof e == "function";
}, yr = function(e) {
  return typeof e == "number";
}, Xt = function(e) {
  return typeof e == "object";
}, gr = function(e, n, t) {
  return e && e.progress(n ? 0 : 1) && t && e.pause();
}, jt = function(e, n, t) {
  if (e.enabled) {
    var r = e._ctx ? e._ctx.add(function() {
      return n(e, t);
    }) : n(e, t);
    r && r.totalTime && (e.callbackAnimation = r);
  }
}, er = Math.abs, hi = "left", gi = "top", En = "right", Pn = "bottom", qt = "width", $t = "height", kr = "Right", Tr = "Left", Er = "Top", Pr = "Bottom", re = "padding", Je = "margin", cr = "Width", Mn = "Height", ae = "px", Qe = function(e) {
  return P.getComputedStyle(e.nodeType === Node.DOCUMENT_NODE ? e.scrollingElement : e);
}, Oi = function(e) {
  var n = Qe(e).position;
  e.style.position = n === "absolute" || n === "fixed" ? n : "relative";
}, Nn = function(e, n) {
  for (var t in n)
    t in e || (e[t] = n[t]);
  return e;
}, wt = function(e, n) {
  var t = n && Qe(e)[vn] !== "matrix(1, 0, 0, 1, 0, 0)" && p.to(e, {
    x: 0,
    y: 0,
    xPercent: 0,
    yPercent: 0,
    rotation: 0,
    rotationX: 0,
    rotationY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0
  }).progress(1), r = e.getBoundingClientRect ? e.getBoundingClientRect() : e.scrollingElement.getBoundingClientRect();
  return t && t.progress(0).kill(), r;
}, rn = function(e, n) {
  var t = n.d2;
  return e["offset" + t] || e["client" + t] || 0;
}, _i = function(e) {
  var n = [], t = e.labels, r = e.duration(), o;
  for (o in t)
    n.push(t[o] / r);
  return n;
}, Li = function(e) {
  return function(n) {
    return p.utils.snap(_i(e), n);
  };
}, Dn = function(e) {
  var n = p.utils.snap(e), t = Array.isArray(e) && e.slice(0).sort(function(r, o) {
    return r - o;
  });
  return t ? function(r, o, l) {
    l === void 0 && (l = 1e-3);
    var s;
    if (!o)
      return n(r);
    if (o > 0) {
      for (r -= l, s = 0; s < t.length; s++)
        if (t[s] >= r)
          return t[s];
      return t[s - 1];
    } else
      for (s = t.length, r += l; s--; )
        if (t[s] <= r)
          return t[s];
    return t[0];
  } : function(r, o, l) {
    l === void 0 && (l = 1e-3);
    var s = n(r);
    return !o || Math.abs(s - r) < l || s - r < 0 == o < 0 ? s : n(o < 0 ? r - e : r + e);
  };
}, Ii = function(e) {
  return function(n, t) {
    return Dn(_i(e))(n, t.direction);
  };
}, Nr = function(e, n, t, r) {
  return t.split(",").forEach(function(o) {
    return e(n, o, r);
  });
}, pe = function(e, n, t, r, o) {
  return e.addEventListener(n, t, {
    passive: !r,
    capture: !!o
  });
}, de = function(e, n, t, r) {
  return e.removeEventListener(n, t, !!r);
}, Hr = function(e, n, t) {
  t = t && t.wheelHandler, t && (e(n, "wheel", t), e(n, "touchmove", t));
}, Hn = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
}, Xr = {
  toggleActions: "play",
  anticipatePin: 0
}, nn = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
}, Vr = function(e, n) {
  if ($e(e)) {
    var t = e.indexOf("="), r = ~t ? +(e.charAt(t - 1) + 1) * parseFloat(e.substr(t + 1)) : 0;
    ~t && (e.indexOf("%") > t && (r *= n / 100), e = e.substr(0, t - 1)), e = r + (e in nn ? nn[e] * n : ~e.indexOf("%") ? parseFloat(e) * n / 100 : parseFloat(e) || 0);
  }
  return e;
}, Wr = function(e, n, t, r, o, l, s, f) {
  var y = o.startColor, A = o.endColor, T = o.fontSize, h = o.indent, u = o.fontWeight, v = z.createElement("div"), $ = Ut(t) || Ot(t, "pinType") === "fixed", N = e.indexOf("scroller") !== -1, ne = $ ? Y : t.tagName === "IFRAME" ? t.contentDocument.body : t, W = e.indexOf("start") !== -1, he = W ? y : A, k = "border-color:" + he + ";font-size:" + T + ";color:" + he + ";font-weight:" + u + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return k += "position:" + ((N || f) && $ ? "fixed;" : "absolute;"), (N || f || !$) && (k += (r === le ? En : Pn) + ":" + (l + parseFloat(h)) + "px;"), s && (k += "box-sizing:border-box;text-align:left;width:" + s.offsetWidth + "px;"), v._isStart = W, v.setAttribute("class", "gsap-marker-" + e + (n ? " marker-" + n : "")), v.style.cssText = k, v.innerText = n || n === 0 ? e + "-" + n : e, ne.children[0] ? ne.insertBefore(v, ne.children[0]) : ne.appendChild(v), v._offset = v["offset" + r.op.d2], Kr(v, 0, r, W), v;
}, Kr = function(e, n, t, r) {
  var o = {
    display: "block"
  }, l = t[r ? "os2" : "p2"], s = t[r ? "p2" : "os2"];
  e._isFlipped = r, o[t.a + "Percent"] = r ? -100 : 0, o[t.a] = r ? "1px" : 0, o["border" + l + cr] = 1, o["border" + s + cr] = 0, o[t.p] = n + "px", p.set(e, o);
}, E = [], xn = {}, Rr, Xn = function() {
  return Ce() - je > 34 && (Rr || (Rr = requestAnimationFrame(bt)));
}, tr = function() {
  (!Le || !Le.isPressed || Le.startX > Y.clientWidth) && (M.cache++, Le ? Rr || (Rr = requestAnimationFrame(bt)) : bt(), je || Kt("scrollStart"), je = Ce());
}, un = function() {
  ci = P.innerWidth, li = P.innerHeight;
}, wr = function(e) {
  M.cache++, (e === !0 || !Se && !ai && !z.fullscreenElement && !z.webkitFullscreenElement && (!mn || ci !== P.innerWidth || Math.abs(P.innerHeight - li) > P.innerHeight * 0.25)) && tn.restart(!0);
}, Vt = {}, Yi = [], vi = function i() {
  return de(D, "scrollEnd", i) || Wt(!0);
}, Kt = function(e) {
  return Vt[e] && Vt[e].map(function(n) {
    return n();
  }) || Yi;
}, qe = [], mi = function(e) {
  for (var n = 0; n < qe.length; n += 5)
    (!e || qe[n + 4] && qe[n + 4].query === e) && (qe[n].style.cssText = qe[n + 1], qe[n].getBBox && qe[n].setAttribute("transform", qe[n + 2] || ""), qe[n + 3].uncache = 1);
}, yi = function() {
  return M.forEach(function(e) {
    return ke(e) && ++e.cacheID && (e.rec = e());
  });
}, Rn = function(e, n) {
  var t;
  for (Ie = 0; Ie < E.length; Ie++)
    t = E[Ie], t && (!n || t._ctx === n) && (e ? t.kill(1) : t.revert(!0, !0));
  Cr = !0, n && mi(n), n || Kt("revert");
}, wi = function(e, n) {
  M.cache++, (n || !Ye) && M.forEach(function(t) {
    return ke(t) && t.cacheID++ && (t.rec = 0);
  }), $e(e) && (P.history.scrollRestoration = kn = e);
}, Ye, Gt = 0, Wn, zi = function() {
  if (Wn !== Gt) {
    var e = Wn = Gt;
    requestAnimationFrame(function() {
      return e === Gt && Wt(!0);
    });
  }
}, xi = function() {
  Y.appendChild(ar), Tn = !Le && ar.offsetHeight || P.innerHeight, Y.removeChild(ar);
}, qn = function(e) {
  return Dr(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(n) {
    return n.style.display = e ? "none" : "block";
  });
}, Wt = function(e, n) {
  if (Ge = z.documentElement, Y = z.body, Cn = [P, z, Ge, Y], je && !e && !Cr) {
    pe(D, "scrollEnd", vi);
    return;
  }
  xi(), Ye = D.isRefreshing = !0, Cr || yi();
  var t = Kt("refreshInit");
  si && D.sort(), n || Rn(), M.forEach(function(r) {
    ke(r) && (r.smooth && (r.target.style.scrollBehavior = "auto"), r(0));
  }), E.slice(0).forEach(function(r) {
    return r.refresh();
  }), Cr = !1, E.forEach(function(r) {
    if (r._subPinOffset && r.pin) {
      var o = r.vars.horizontal ? "offsetWidth" : "offsetHeight", l = r.pin[o];
      r.revert(!0, 1), r.adjustPinSpacing(r.pin[o] - l), r.refresh();
    }
  }), wn = 1, qn(!0), E.forEach(function(r) {
    var o = ft(r.scroller, r._dir), l = r.vars.end === "max" || r._endClamp && r.end > o, s = r._startClamp && r.start >= o;
    (l || s) && r.setPositions(s ? o - 1 : r.start, l ? Math.max(s ? o : r.start + 1, o) : r.end, !0);
  }), qn(!1), wn = 0, t.forEach(function(r) {
    return r && r.render && r.render(-1);
  }), M.forEach(function(r) {
    ke(r) && (r.smooth && requestAnimationFrame(function() {
      return r.target.style.scrollBehavior = "smooth";
    }), r.rec && r(r.rec));
  }), wi(kn, 1), tn.pause(), Gt++, Ye = 2, bt(2), E.forEach(function(r) {
    return ke(r.vars.onRefresh) && r.vars.onRefresh(r);
  }), Ye = D.isRefreshing = !1, Kt("refresh");
}, bn = 0, Zr = 1, Mr, bt = function(e) {
  if (e === 2 || !Ye && !Cr) {
    D.isUpdating = !0, Mr && Mr.update(0);
    var n = E.length, t = Ce(), r = t - cn >= 50, o = n && E[0].scroll();
    if (Zr = bn > o ? -1 : 1, Ye || (bn = o), r && (je && !on && t - je > 200 && (je = 0, Kt("scrollEnd")), _r = cn, cn = t), Zr < 0) {
      for (Ie = n; Ie-- > 0; )
        E[Ie] && E[Ie].update(0, r);
      Zr = 1;
    } else
      for (Ie = 0; Ie < n; Ie++)
        E[Ie] && E[Ie].update(0, r);
    D.isUpdating = !1;
  }
  Rr = 0;
}, Sn = [hi, gi, Pn, En, Je + Pr, Je + kr, Je + Er, Je + Tr, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], Jr = Sn.concat([qt, $t, "boxSizing", "max" + cr, "max" + Mn, "position", Je, re, re + Er, re + kr, re + Pr, re + Tr]), Bi = function(e, n, t) {
  lr(t);
  var r = e._gsap;
  if (r.spacerIsNative)
    lr(r.spacerState);
  else if (e._gsap.swappedIn) {
    var o = n.parentNode;
    o && (o.insertBefore(e, n), o.removeChild(n));
  }
  e._gsap.swappedIn = !1;
}, fn = function(e, n, t, r) {
  if (!e._gsap.swappedIn) {
    for (var o = Sn.length, l = n.style, s = e.style, f; o--; )
      f = Sn[o], l[f] = t[f];
    l.position = t.position === "absolute" ? "absolute" : "relative", t.display === "inline" && (l.display = "inline-block"), s[Pn] = s[En] = "auto", l.flexBasis = t.flexBasis || "auto", l.overflow = "visible", l.boxSizing = "border-box", l[qt] = rn(e, ze) + ae, l[$t] = rn(e, le) + ae, l[re] = s[Je] = s[gi] = s[hi] = "0", lr(r), s[qt] = s["max" + cr] = t[qt], s[$t] = s["max" + Mn] = t[$t], s[re] = t[re], e.parentNode !== n && (e.parentNode.insertBefore(n, e), n.appendChild(e)), e._gsap.swappedIn = !0;
  }
}, Fi = /([A-Z])/g, lr = function(e) {
  if (e) {
    var n = e.t.style, t = e.length, r = 0, o, l;
    for ((e.t._gsap || p.core.getCache(e.t)).uncache = 1; r < t; r += 2)
      l = e[r + 1], o = e[r], l ? n[o] = l : n[o] && n.removeProperty(o.replace(Fi, "-$1").toLowerCase());
  }
}, qr = function(e) {
  for (var n = Jr.length, t = e.style, r = [], o = 0; o < n; o++)
    r.push(Jr[o], t[Jr[o]]);
  return r.t = e, r;
}, Ni = function(e, n, t) {
  for (var r = [], o = e.length, l = t ? 8 : 0, s; l < o; l += 2)
    s = e[l], r.push(s, s in n ? n[s] : e[l + 1]);
  return r.t = e.t, r;
}, Qr = {
  left: 0,
  top: 0
}, $n = function(e, n, t, r, o, l, s, f, y, A, T, h, u, v) {
  ke(e) && (e = e(f)), $e(e) && e.substr(0, 3) === "max" && (e = h + (e.charAt(4) === "=" ? Vr("0" + e.substr(3), t) : 0));
  var $ = u ? u.time() : 0, N, ne, W;
  if (u && u.seek(0), isNaN(e) || (e = +e), yr(e))
    u && (e = p.utils.mapRange(u.scrollTrigger.start, u.scrollTrigger.end, 0, h, e)), s && Kr(s, t, r, !0);
  else {
    ke(n) && (n = n(f));
    var he = (e || "0").split(" "), k, Ve, H, x;
    W = Ne(n, f) || Y, k = wt(W) || {}, (!k || !k.left && !k.top) && Qe(W).display === "none" && (x = W.style.display, W.style.display = "block", k = wt(W), x ? W.style.display = x : W.style.removeProperty("display")), Ve = Vr(he[0], k[r.d]), H = Vr(he[1] || "0", t), e = k[r.p] - y[r.p] - A + Ve + o - H, s && Kr(s, H, r, t - H < 20 || s._isStart && H > 20), t -= t - H;
  }
  if (v && (f[v] = e || -1e-3, e < 0 && (e = 0)), l) {
    var Te = e + t, Be = l._isStart;
    N = "scroll" + r.d2, Kr(l, Te, r, Be && Te > 20 || !Be && (T ? Math.max(Y[N], Ge[N]) : l.parentNode[N]) <= Te + 1), T && (y = wt(s), T && (l.style[r.op.p] = y[r.op.p] - r.op.m - l._offset + ae));
  }
  return u && W && (N = wt(W), u.seek(h), ne = wt(W), u._caScrollDist = N[r.p] - ne[r.p], e = e / u._caScrollDist * h), u && u.seek($), u ? e : Math.round(e);
}, Hi = /(webkit|moz|length|cssText|inset)/i, Gn = function(e, n, t, r) {
  if (e.parentNode !== n) {
    var o = e.style, l, s;
    if (n === Y) {
      e._stOrig = o.cssText, s = Qe(e);
      for (l in s)
        !+l && !Hi.test(l) && s[l] && typeof o[l] == "string" && l !== "0" && (o[l] = s[l]);
      o.top = t, o.left = r;
    } else
      o.cssText = e._stOrig;
    p.core.getCache(e).uncache = 1, n.appendChild(e);
  }
}, bi = function(e, n, t) {
  var r = n, o = r;
  return function(l) {
    var s = Math.round(e());
    return s !== r && s !== o && Math.abs(s - r) > 3 && Math.abs(s - o) > 3 && (l = s, t && t()), o = r, r = Math.round(l), r;
  };
}, $r = function(e, n, t) {
  var r = {};
  r[n.p] = "+=" + t, p.set(e, r);
}, Un = function(e, n) {
  var t = Lt(e, n), r = "_scroll" + n.p2, o = function l(s, f, y, A, T) {
    var h = l.tween, u = f.onComplete, v = {};
    y = y || t();
    var $ = bi(t, y, function() {
      h.kill(), l.tween = 0;
    });
    return T = A && T || 0, A = A || s - y, h && h.kill(), f[r] = s, f.inherit = !1, f.modifiers = v, v[r] = function() {
      return $(y + A * h.ratio + T * h.ratio * h.ratio);
    }, f.onUpdate = function() {
      M.cache++, l.tween && bt();
    }, f.onComplete = function() {
      l.tween = 0, u && u.call(h);
    }, h = l.tween = p.to(e, f), h;
  };
  return e[r] = t, t.wheelHandler = function() {
    return o.tween && o.tween.kill() && (o.tween = 0);
  }, pe(e, "wheel", t.wheelHandler), D.isTouch && pe(e, "touchmove", t.wheelHandler), o;
}, D = /* @__PURE__ */ (function() {
  function i(n, t) {
    rr || i.register(p) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), yn(this), this.init(n, t);
  }
  var e = i.prototype;
  return e.init = function(t, r) {
    if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !vr) {
      this.update = this.refresh = this.kill = ut;
      return;
    }
    t = Nn($e(t) || yr(t) || t.nodeType ? {
      trigger: t
    } : t, Xr);
    var o = t, l = o.onUpdate, s = o.toggleClass, f = o.id, y = o.onToggle, A = o.onRefresh, T = o.scrub, h = o.trigger, u = o.pin, v = o.pinSpacing, $ = o.invalidateOnRefresh, N = o.anticipatePin, ne = o.onScrubComplete, W = o.onSnapComplete, he = o.once, k = o.snap, Ve = o.pinReparent, H = o.pinSpacer, x = o.containerAnimation, Te = o.fastScrollEnd, Be = o.preventOverlaps, g = t.horizontal || t.containerAnimation && t.horizontal !== !1 ? ze : le, ce = !T && T !== 0, w = Ne(t.scroller || P), pt = p.core.getCache(w), ie = Ut(w), Ee = ("pinType" in t ? t.pinType : Ot(w, "pinType") || ie && "fixed") === "fixed", Pe = [t.onEnter, t.onLeave, t.onEnterBack, t.onLeaveBack], B = ce && t.toggleActions.split(" "), Q = "markers" in t ? t.markers : Xr.markers, j = ie ? 0 : parseFloat(Qe(w)["border" + g.p2 + cr]) || 0, a = this, oe = t.onRefreshInit && function() {
      return t.onRefreshInit(a);
    }, It = Ri(w, ie, g), St = Ai(w, ie), Ke = 0, ht = 0, me = 0, ee = Lt(w, g), Me, ye, Ct, De, Re, L, V, Fe, He, c, Xe, gt, kt, G, _t, Tt, Yt, ue, Et, K, et, Ze, vt, ur, te, Ar, mt, Zt, Jt, Pt, zt, R, Bt, tt, rt, nt, Ft, Qt, yt;
    if (a._startClamp = a._endClamp = !1, a._dir = g, N *= 45, a.scroller = w, a.scroll = x ? x.time.bind(x) : ee, De = ee(), a.vars = t, r = r || t.animation, "refreshPriority" in t && (si = 1, t.refreshPriority === -9999 && (Mr = a)), pt.tweenScroll = pt.tweenScroll || {
      top: Un(w, le),
      left: Un(w, ze)
    }, a.tweenTo = Me = pt.tweenScroll[g.p], a.scrubDuration = function(d) {
      Bt = yr(d) && d, Bt ? R ? R.duration(d) : R = p.to(r, {
        ease: "expo",
        totalProgress: "+=0",
        inherit: !1,
        duration: Bt,
        paused: !0,
        onComplete: function() {
          return ne && ne(a);
        }
      }) : (R && R.progress(1).kill(), R = 0);
    }, r && (r.vars.lazy = !1, r._initted && !a.isReverted || r.vars.immediateRender !== !1 && t.immediateRender !== !1 && r.duration() && r.render(0, !0, !0), a.animation = r.pause(), r.scrollTrigger = a, a.scrubDuration(T), Pt = 0, f || (f = r.vars.id)), k && ((!Xt(k) || k.push) && (k = {
      snapTo: k
    }), "scrollBehavior" in Y.style && p.set(ie ? [Y, Ge] : w, {
      scrollBehavior: "auto"
    }), M.forEach(function(d) {
      return ke(d) && d.target === (ie ? z.scrollingElement || Ge : w) && (d.smooth = !1);
    }), Ct = ke(k.snapTo) ? k.snapTo : k.snapTo === "labels" ? Li(r) : k.snapTo === "labelsDirectional" ? Ii(r) : k.directional !== !1 ? function(d, b) {
      return Dn(k.snapTo)(d, Ce() - ht < 500 ? 0 : b.direction);
    } : p.utils.snap(k.snapTo), tt = k.duration || {
      min: 0.1,
      max: 2
    }, tt = Xt(tt) ? Sr(tt.min, tt.max) : Sr(tt, tt), rt = p.delayedCall(k.delay || Bt / 2 || 0.1, function() {
      var d = ee(), b = Ce() - ht < 500, _ = Me.tween;
      if ((b || Math.abs(a.getVelocity()) < 10) && !_ && !on && Ke !== d) {
        var S = (d - L) / G, fe = r && !ce ? r.totalProgress() : S, O = b ? 0 : (fe - zt) / (Ce() - _r) * 1e3 || 0, Z = p.utils.clamp(-S, 1 - S, er(O / 2) * O / 0.185), we = S + (k.inertia === !1 ? 0 : Z), U, X, F = k, it = F.onStart, q = F.onInterrupt, We = F.onComplete;
        if (U = Ct(we, a), yr(U) || (U = we), X = Math.max(0, Math.round(L + U * G)), d <= V && d >= L && X !== d) {
          if (_ && !_._initted && _.data <= er(X - d))
            return;
          k.inertia === !1 && (Z = U - S), Me(X, {
            duration: tt(er(Math.max(er(we - fe), er(U - fe)) * 0.185 / O / 0.05 || 0)),
            ease: k.ease || "power3",
            data: er(X - d),
            // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
            onInterrupt: function() {
              return rt.restart(!0) && q && jt(a, q);
            },
            onComplete: function() {
              a.update(), Ke = ee(), r && !ce && (R ? R.resetTo("totalProgress", U, r._tTime / r._tDur) : r.progress(U)), Pt = zt = r && !ce ? r.totalProgress() : a.progress, W && W(a), We && jt(a, We);
            }
          }, d, Z * G, X - d - Z * G), it && jt(a, it, Me.tween);
        }
      } else a.isActive && Ke !== d && rt.restart(!0);
    }).pause()), f && (xn[f] = a), h = a.trigger = Ne(h || u !== !0 && u), yt = h && h._gsap && h._gsap.stRevert, yt && (yt = yt(a)), u = u === !0 ? h : Ne(u), $e(s) && (s = {
      targets: h,
      className: s
    }), u && (v === !1 || v === Je || (v = !v && u.parentNode && u.parentNode.style && Qe(u.parentNode).display === "flex" ? !1 : re), a.pin = u, ye = p.core.getCache(u), ye.spacer ? _t = ye.pinState : (H && (H = Ne(H), H && !H.nodeType && (H = H.current || H.nativeElement), ye.spacerIsNative = !!H, H && (ye.spacerState = qr(H))), ye.spacer = ue = H || z.createElement("div"), ue.classList.add("pin-spacer"), f && ue.classList.add("pin-spacer-" + f), ye.pinState = _t = qr(u)), t.force3D !== !1 && p.set(u, {
      force3D: !0
    }), a.spacer = ue = ye.spacer, Jt = Qe(u), ur = Jt[v + g.os2], K = p.getProperty(u), et = p.quickSetter(u, g.a, ae), fn(u, ue, Jt), Yt = qr(u)), Q) {
      gt = Xt(Q) ? Nn(Q, Hn) : Hn, c = Wr("scroller-start", f, w, g, gt, 0), Xe = Wr("scroller-end", f, w, g, gt, 0, c), Et = c["offset" + g.op.d2];
      var fr = Ne(Ot(w, "content") || w);
      Fe = this.markerStart = Wr("start", f, fr, g, gt, Et, 0, x), He = this.markerEnd = Wr("end", f, fr, g, gt, Et, 0, x), x && (Qt = p.quickSetter([Fe, He], g.a, ae)), !Ee && !(dt.length && Ot(w, "fixedMarkers") === !0) && (Oi(ie ? Y : w), p.set([c, Xe], {
        force3D: !0
      }), Ar = p.quickSetter(c, g.a, ae), Zt = p.quickSetter(Xe, g.a, ae));
    }
    if (x) {
      var C = x.vars.onUpdate, m = x.vars.onUpdateParams;
      x.eventCallback("onUpdate", function() {
        a.update(0, 0, 1), C && C.apply(x, m || []);
      });
    }
    if (a.previous = function() {
      return E[E.indexOf(a) - 1];
    }, a.next = function() {
      return E[E.indexOf(a) + 1];
    }, a.revert = function(d, b) {
      if (!b)
        return a.kill(!0);
      var _ = d !== !1 || !a.enabled, S = Se;
      _ !== a.isReverted && (_ && (nt = Math.max(ee(), a.scroll.rec || 0), me = a.progress, Ft = r && r.progress()), Fe && [Fe, He, c, Xe].forEach(function(fe) {
        return fe.style.display = _ ? "none" : "block";
      }), _ && (Se = a, a.update(_)), u && (!Ve || !a.isActive) && (_ ? Bi(u, ue, _t) : fn(u, ue, Qe(u), te)), _ || a.update(_), Se = S, a.isReverted = _);
    }, a.refresh = function(d, b, _, S) {
      if (!((Se || !a.enabled) && !b)) {
        if (u && d && je) {
          pe(i, "scrollEnd", vi);
          return;
        }
        !Ye && oe && oe(a), Se = a, Me.tween && !_ && (Me.tween.kill(), Me.tween = 0), R && R.pause(), $ && r && (r.revert({
          kill: !1
        }).invalidate(), r.getChildren ? r.getChildren(!0, !0, !1).forEach(function(Mt) {
          return Mt.vars.immediateRender && Mt.render(0, !0, !0);
        }) : r.vars.immediateRender && r.render(0, !0, !0)), a.isReverted || a.revert(!0, !0), a._subPinOffset = !1;
        var fe = It(), O = St(), Z = x ? x.duration() : ft(w, g), we = G <= 0.01 || !G, U = 0, X = S || 0, F = Xt(_) ? _.end : t.end, it = t.endTrigger || h, q = Xt(_) ? _.start : t.start || (t.start === 0 || !h ? 0 : u ? "0 0" : "0 100%"), We = a.pinnedContainer = t.pinnedContainer && Ne(t.pinnedContainer, a), st = h && Math.max(0, E.indexOf(a)) || 0, ge = st, _e, xe, Nt, Or, be, se, at, sn, An, dr, lt, pr, Lr;
        for (Q && Xt(_) && (pr = p.getProperty(c, g.p), Lr = p.getProperty(Xe, g.p)); ge-- > 0; )
          se = E[ge], se.end || se.refresh(0, 1) || (Se = a), at = se.pin, at && (at === h || at === u || at === We) && !se.isReverted && (dr || (dr = []), dr.unshift(se), se.revert(!0, !0)), se !== E[ge] && (st--, ge--);
        for (ke(q) && (q = q(a)), q = Yn(q, "start", a), L = $n(q, h, fe, g, ee(), Fe, c, a, O, j, Ee, Z, x, a._startClamp && "_startClamp") || (u ? -1e-3 : 0), ke(F) && (F = F(a)), $e(F) && !F.indexOf("+=") && (~F.indexOf(" ") ? F = ($e(q) ? q.split(" ")[0] : "") + F : (U = Vr(F.substr(2), fe), F = $e(q) ? q : (x ? p.utils.mapRange(0, x.duration(), x.scrollTrigger.start, x.scrollTrigger.end, L) : L) + U, it = h)), F = Yn(F, "end", a), V = Math.max(L, $n(F || (it ? "100% 0" : Z), it, fe, g, ee() + U, He, Xe, a, O, j, Ee, Z, x, a._endClamp && "_endClamp")) || -1e-3, U = 0, ge = st; ge--; )
          se = E[ge] || {}, at = se.pin, at && se.start - se._pinPush <= L && !x && se.end > 0 && (_e = se.end - (a._startClamp ? Math.max(0, se.start) : se.start), (at === h && se.start - se._pinPush < L || at === We) && isNaN(q) && (U += _e * (1 - se.progress)), at === u && (X += _e));
        if (L += U, V += U, a._startClamp && (a._startClamp += U), a._endClamp && !Ye && (a._endClamp = V || -1e-3, V = Math.min(V, ft(w, g))), G = V - L || (L -= 0.01) && 1e-3, we && (me = p.utils.clamp(0, 1, p.utils.normalize(L, V, nt))), a._pinPush = X, Fe && U && (_e = {}, _e[g.a] = "+=" + U, We && (_e[g.p] = "-=" + ee()), p.set([Fe, He], _e)), u && !(wn && a.end >= ft(w, g)))
          _e = Qe(u), Or = g === le, Nt = ee(), Ze = parseFloat(K(g.a)) + X, !Z && V > 1 && (lt = (ie ? z.scrollingElement || Ge : w).style, lt = {
            style: lt,
            value: lt["overflow" + g.a.toUpperCase()]
          }, ie && Qe(Y)["overflow" + g.a.toUpperCase()] !== "scroll" && (lt.style["overflow" + g.a.toUpperCase()] = "scroll")), fn(u, ue, _e), Yt = qr(u), xe = wt(u, !0), sn = Ee && Lt(w, Or ? ze : le)(), v ? (te = [v + g.os2, G + X + ae], te.t = ue, ge = v === re ? rn(u, g) + G + X : 0, ge && (te.push(g.d, ge + ae), ue.style.flexBasis !== "auto" && (ue.style.flexBasis = ge + ae)), lr(te), We && E.forEach(function(Mt) {
            Mt.pin === We && Mt.vars.pinSpacing !== !1 && (Mt._subPinOffset = !0);
          }), Ee && ee(nt)) : (ge = rn(u, g), ge && ue.style.flexBasis !== "auto" && (ue.style.flexBasis = ge + ae)), Ee && (be = {
            top: xe.top + (Or ? Nt - L : sn) + ae,
            left: xe.left + (Or ? sn : Nt - L) + ae,
            boxSizing: "border-box",
            position: "fixed"
          }, be[qt] = be["max" + cr] = Math.ceil(xe.width) + ae, be[$t] = be["max" + Mn] = Math.ceil(xe.height) + ae, be[Je] = be[Je + Er] = be[Je + kr] = be[Je + Pr] = be[Je + Tr] = "0", be[re] = _e[re], be[re + Er] = _e[re + Er], be[re + kr] = _e[re + kr], be[re + Pr] = _e[re + Pr], be[re + Tr] = _e[re + Tr], Tt = Ni(_t, be, Ve), Ye && ee(0)), r ? (An = r._initted, an(1), r.render(r.duration(), !0, !0), vt = K(g.a) - Ze + G + X, mt = Math.abs(G - vt) > 1, Ee && mt && Tt.splice(Tt.length - 2, 2), r.render(0, !0, !0), An || r.invalidate(!0), r.parent || r.totalTime(r.totalTime()), an(0)) : vt = G, lt && (lt.value ? lt.style["overflow" + g.a.toUpperCase()] = lt.value : lt.style.removeProperty("overflow-" + g.a));
        else if (h && ee() && !x)
          for (xe = h.parentNode; xe && xe !== Y; )
            xe._pinOffset && (L -= xe._pinOffset, V -= xe._pinOffset), xe = xe.parentNode;
        dr && dr.forEach(function(Mt) {
          return Mt.revert(!1, !0);
        }), a.start = L, a.end = V, De = Re = Ye ? nt : ee(), !x && !Ye && (De < nt && ee(nt), a.scroll.rec = 0), a.revert(!1, !0), ht = Ce(), rt && (Ke = -1, rt.restart(!0)), Se = 0, r && ce && (r._initted || Ft) && r.progress() !== Ft && r.progress(Ft || 0, !0).render(r.time(), !0, !0), (we || me !== a.progress || x || $ || r && !r._initted) && (r && !ce && (r._initted || me || r.vars.immediateRender !== !1) && r.totalProgress(x && L < -1e-3 && !me ? p.utils.normalize(L, V, 0) : me, !0), a.progress = we || (De - L) / G === me ? 0 : me), u && v && (ue._pinOffset = Math.round(a.progress * vt)), R && R.invalidate(), isNaN(pr) || (pr -= p.getProperty(c, g.p), Lr -= p.getProperty(Xe, g.p), $r(c, g, pr), $r(Fe, g, pr - (S || 0)), $r(Xe, g, Lr), $r(He, g, Lr - (S || 0))), we && !Ye && a.update(), A && !Ye && !kt && (kt = !0, A(a), kt = !1);
      }
    }, a.getVelocity = function() {
      return (ee() - Re) / (Ce() - _r) * 1e3 || 0;
    }, a.endAnimation = function() {
      gr(a.callbackAnimation), r && (R ? R.progress(1) : r.paused() ? ce || gr(r, a.direction < 0, 1) : gr(r, r.reversed()));
    }, a.labelToScroll = function(d) {
      return r && r.labels && (L || a.refresh() || L) + r.labels[d] / r.duration() * G || 0;
    }, a.getTrailing = function(d) {
      var b = E.indexOf(a), _ = a.direction > 0 ? E.slice(0, b).reverse() : E.slice(b + 1);
      return ($e(d) ? _.filter(function(S) {
        return S.vars.preventOverlaps === d;
      }) : _).filter(function(S) {
        return a.direction > 0 ? S.end <= L : S.start >= V;
      });
    }, a.update = function(d, b, _) {
      if (!(x && !_ && !d)) {
        var S = Ye === !0 ? nt : a.scroll(), fe = d ? 0 : (S - L) / G, O = fe < 0 ? 0 : fe > 1 ? 1 : fe || 0, Z = a.progress, we, U, X, F, it, q, We, st;
        if (b && (Re = De, De = x ? ee() : S, k && (zt = Pt, Pt = r && !ce ? r.totalProgress() : O)), N && u && !Se && !Br && je && (!O && L < S + (S - Re) / (Ce() - _r) * N ? O = 1e-4 : O === 1 && V > S + (S - Re) / (Ce() - _r) * N && (O = 0.9999)), O !== Z && a.enabled) {
          if (we = a.isActive = !!O && O < 1, U = !!Z && Z < 1, q = we !== U, it = q || !!O != !!Z, a.direction = O > Z ? 1 : -1, a.progress = O, it && !Se && (X = O && !Z ? 0 : O === 1 ? 1 : Z === 1 ? 2 : 3, ce && (F = !q && B[X + 1] !== "none" && B[X + 1] || B[X], st = r && (F === "complete" || F === "reset" || F in r))), Be && (q || st) && (st || T || !r) && (ke(Be) ? Be(a) : a.getTrailing(Be).forEach(function(Nt) {
            return Nt.endAnimation();
          })), ce || (R && !Se && !Br ? (R._dp._time - R._start !== R._time && R.render(R._dp._time - R._start), R.resetTo ? R.resetTo("totalProgress", O, r._tTime / r._tDur) : (R.vars.totalProgress = O, R.invalidate().restart())) : r && r.totalProgress(O, !!(Se && (ht || d)))), u) {
            if (d && v && (ue.style[v + g.os2] = ur), !Ee)
              et(mr(Ze + vt * O));
            else if (it) {
              if (We = !d && O > Z && V + 1 > S && S + 1 >= ft(w, g), Ve)
                if (!d && (we || We)) {
                  var ge = wt(u, !0), _e = S - L;
                  Gn(u, Y, ge.top + (g === le ? _e : 0) + ae, ge.left + (g === le ? 0 : _e) + ae);
                } else
                  Gn(u, ue);
              lr(we || We ? Tt : Yt), mt && O < 1 && we || et(Ze + (O === 1 && !We ? vt : 0));
            }
          }
          k && !Me.tween && !Se && !Br && rt.restart(!0), s && (q || he && O && (O < 1 || !ln)) && Dr(s.targets).forEach(function(Nt) {
            return Nt.classList[we || he ? "add" : "remove"](s.className);
          }), l && !ce && !d && l(a), it && !Se ? (ce && (st && (F === "complete" ? r.pause().totalProgress(1) : F === "reset" ? r.restart(!0).pause() : F === "restart" ? r.restart(!0) : r[F]()), l && l(a)), (q || !ln) && (y && q && jt(a, y), Pe[X] && jt(a, Pe[X]), he && (O === 1 ? a.kill(!1, 1) : Pe[X] = 0), q || (X = O === 1 ? 1 : 3, Pe[X] && jt(a, Pe[X]))), Te && !we && Math.abs(a.getVelocity()) > (yr(Te) ? Te : 2500) && (gr(a.callbackAnimation), R ? R.progress(1) : gr(r, F === "reverse" ? 1 : !O, 1))) : ce && l && !Se && l(a);
        }
        if (Zt) {
          var xe = x ? S / x.duration() * (x._caScrollDist || 0) : S;
          Ar(xe + (c._isFlipped ? 1 : 0)), Zt(xe);
        }
        Qt && Qt(-S / x.duration() * (x._caScrollDist || 0));
      }
    }, a.enable = function(d, b) {
      a.enabled || (a.enabled = !0, pe(w, "resize", wr), ie || pe(w, "scroll", tr), oe && pe(i, "refreshInit", oe), d !== !1 && (a.progress = me = 0, De = Re = Ke = ee()), b !== !1 && a.refresh());
    }, a.getTween = function(d) {
      return d && Me ? Me.tween : R;
    }, a.setPositions = function(d, b, _, S) {
      if (x) {
        var fe = x.scrollTrigger, O = x.duration(), Z = fe.end - fe.start;
        d = fe.start + Z * d / O, b = fe.start + Z * b / O;
      }
      a.refresh(!1, !1, {
        start: zn(d, _ && !!a._startClamp),
        end: zn(b, _ && !!a._endClamp)
      }, S), a.update();
    }, a.adjustPinSpacing = function(d) {
      if (te && d) {
        var b = te.indexOf(g.d) + 1;
        te[b] = parseFloat(te[b]) + d + ae, te[1] = parseFloat(te[1]) + d + ae, lr(te);
      }
    }, a.disable = function(d, b) {
      if (d !== !1 && a.revert(!0, !0), a.enabled && (a.enabled = a.isActive = !1, b || R && R.pause(), nt = 0, ye && (ye.uncache = 1), oe && de(i, "refreshInit", oe), rt && (rt.pause(), Me.tween && Me.tween.kill() && (Me.tween = 0)), !ie)) {
        for (var _ = E.length; _--; )
          if (E[_].scroller === w && E[_] !== a)
            return;
        de(w, "resize", wr), ie || de(w, "scroll", tr);
      }
    }, a.kill = function(d, b) {
      a.disable(d, b), R && !b && R.kill(), f && delete xn[f];
      var _ = E.indexOf(a);
      _ >= 0 && E.splice(_, 1), _ === Ie && Zr > 0 && Ie--, _ = 0, E.forEach(function(S) {
        return S.scroller === a.scroller && (_ = 1);
      }), _ || Ye || (a.scroll.rec = 0), r && (r.scrollTrigger = null, d && r.revert({
        kill: !1
      }), b || r.kill()), Fe && [Fe, He, c, Xe].forEach(function(S) {
        return S.parentNode && S.parentNode.removeChild(S);
      }), Mr === a && (Mr = 0), u && (ye && (ye.uncache = 1), _ = 0, E.forEach(function(S) {
        return S.pin === u && _++;
      }), _ || (ye.spacer = 0)), t.onKill && t.onKill(a);
    }, E.push(a), a.enable(!1, !1), yt && yt(a), r && r.add && !G) {
      var I = a.update;
      a.update = function() {
        a.update = I, M.cache++, L || V || a.refresh();
      }, p.delayedCall(0.01, a.update), G = 0.01, L = V = 0;
    } else
      a.refresh();
    u && zi();
  }, i.register = function(t) {
    return rr || (p = t || fi(), ui() && window.document && i.enable(), rr = vr), rr;
  }, i.defaults = function(t) {
    if (t)
      for (var r in t)
        Xr[r] = t[r];
    return Xr;
  }, i.disable = function(t, r) {
    vr = 0, E.forEach(function(l) {
      return l[r ? "kill" : "disable"](t);
    }), de(P, "wheel", tr), de(z, "scroll", tr), clearInterval(zr), de(z, "touchcancel", ut), de(Y, "touchstart", ut), Nr(de, z, "pointerdown,touchstart,mousedown", Bn), Nr(de, z, "pointerup,touchend,mouseup", Fn), tn.kill(), Fr(de);
    for (var o = 0; o < M.length; o += 3)
      Hr(de, M[o], M[o + 1]), Hr(de, M[o], M[o + 2]);
  }, i.enable = function() {
    if (P = window, z = document, Ge = z.documentElement, Y = z.body, p) {
      if (Dr = p.utils.toArray, Sr = p.utils.clamp, yn = p.core.context || ut, an = p.core.suppressOverwrites || ut, kn = P.history.scrollRestoration || "auto", bn = P.pageYOffset || 0, p.core.globals("ScrollTrigger", i), Y) {
        vr = 1, ar = document.createElement("div"), ar.style.height = "100vh", ar.style.position = "absolute", xi(), Di(), J.register(p), i.isTouch = J.isTouch, Dt = J.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), mn = J.isTouch === 1, pe(P, "wheel", tr), Cn = [P, z, Ge, Y], p.matchMedia ? (i.matchMedia = function(A) {
          var T = p.matchMedia(), h;
          for (h in A)
            T.add(h, A[h]);
          return T;
        }, p.addEventListener("matchMediaInit", function() {
          yi(), Rn();
        }), p.addEventListener("matchMediaRevert", function() {
          return mi();
        }), p.addEventListener("matchMedia", function() {
          Wt(0, 1), Kt("matchMedia");
        }), p.matchMedia().add("(orientation: portrait)", function() {
          return un(), un;
        })) : console.warn("Requires GSAP 3.11.0 or later"), un(), pe(z, "scroll", tr);
        var t = Y.hasAttribute("style"), r = Y.style, o = r.borderTopStyle, l = p.core.Animation.prototype, s, f;
        for (l.revert || Object.defineProperty(l, "revert", {
          value: function() {
            return this.time(-0.01, !0);
          }
        }), r.borderTopStyle = "solid", s = wt(Y), le.m = Math.round(s.top + le.sc()) || 0, ze.m = Math.round(s.left + ze.sc()) || 0, o ? r.borderTopStyle = o : r.removeProperty("border-top-style"), t || (Y.setAttribute("style", ""), Y.removeAttribute("style")), zr = setInterval(Xn, 250), p.delayedCall(0.5, function() {
          return Br = 0;
        }), pe(z, "touchcancel", ut), pe(Y, "touchstart", ut), Nr(pe, z, "pointerdown,touchstart,mousedown", Bn), Nr(pe, z, "pointerup,touchend,mouseup", Fn), vn = p.utils.checkPrefix("transform"), Jr.push(vn), rr = Ce(), tn = p.delayedCall(0.2, Wt).pause(), nr = [z, "visibilitychange", function() {
          var A = P.innerWidth, T = P.innerHeight;
          z.hidden ? (Ln = A, In = T) : (Ln !== A || In !== T) && wr();
        }, z, "DOMContentLoaded", Wt, P, "load", Wt, P, "resize", wr], Fr(pe), E.forEach(function(A) {
          return A.enable(0, 1);
        }), f = 0; f < M.length; f += 3)
          Hr(de, M[f], M[f + 1]), Hr(de, M[f], M[f + 2]);
      } else if (z) {
        var y = function A() {
          i.enable(), z.removeEventListener("DOMContentLoaded", A);
        };
        z.addEventListener("DOMContentLoaded", y);
      }
    }
  }, i.config = function(t) {
    "limitCallbacks" in t && (ln = !!t.limitCallbacks);
    var r = t.syncInterval;
    r && clearInterval(zr) || (zr = r) && setInterval(Xn, r), "ignoreMobileResize" in t && (mn = i.isTouch === 1 && t.ignoreMobileResize), "autoRefreshEvents" in t && (Fr(de) || Fr(pe, t.autoRefreshEvents || "none"), ai = (t.autoRefreshEvents + "").indexOf("resize") === -1);
  }, i.scrollerProxy = function(t, r) {
    var o = Ne(t), l = M.indexOf(o), s = Ut(o);
    ~l && M.splice(l, s ? 6 : 2), r && (s ? dt.unshift(P, r, Y, r, Ge, r) : dt.unshift(o, r));
  }, i.clearMatchMedia = function(t) {
    E.forEach(function(r) {
      return r._ctx && r._ctx.query === t && r._ctx.kill(!0, !0);
    });
  }, i.isInViewport = function(t, r, o) {
    var l = ($e(t) ? Ne(t) : t).getBoundingClientRect(), s = l[o ? qt : $t] * r || 0;
    return o ? l.right - s > 0 && l.left + s < P.innerWidth : l.bottom - s > 0 && l.top + s < P.innerHeight;
  }, i.positionInViewport = function(t, r, o) {
    $e(t) && (t = Ne(t));
    var l = t.getBoundingClientRect(), s = l[o ? qt : $t], f = r == null ? s / 2 : r in nn ? nn[r] * s : ~r.indexOf("%") ? parseFloat(r) * s / 100 : parseFloat(r) || 0;
    return o ? (l.left + f) / P.innerWidth : (l.top + f) / P.innerHeight;
  }, i.killAll = function(t) {
    if (E.slice(0).forEach(function(o) {
      return o.vars.id !== "ScrollSmoother" && o.kill();
    }), t !== !0) {
      var r = Vt.killAll || [];
      Vt = {}, r.forEach(function(o) {
        return o();
      });
    }
  }, i;
})();
D.version = "3.15.0";
D.saveStyles = function(i) {
  return i ? Dr(i).forEach(function(e) {
    if (e && e.style) {
      var n = qe.indexOf(e);
      n >= 0 && qe.splice(n, 5), qe.push(e, e.style.cssText, e.getBBox && e.getAttribute("transform"), p.core.getCache(e), yn());
    }
  }) : qe;
};
D.revert = function(i, e) {
  return Rn(!i, e);
};
D.create = function(i, e) {
  return new D(i, e);
};
D.refresh = function(i) {
  return i ? wr(!0) : (rr || D.register()) && Wt(!0);
};
D.update = function(i) {
  return ++M.cache && bt(i === !0 ? 2 : 0);
};
D.clearScrollMemory = wi;
D.maxScroll = function(i, e) {
  return ft(i, e ? ze : le);
};
D.getScrollFunc = function(i, e) {
  return Lt(Ne(i), e ? ze : le);
};
D.getById = function(i) {
  return xn[i];
};
D.getAll = function() {
  return E.filter(function(i) {
    return i.vars.id !== "ScrollSmoother";
  });
};
D.isScrolling = function() {
  return !!je;
};
D.snapDirectional = Dn;
D.addEventListener = function(i, e) {
  var n = Vt[i] || (Vt[i] = []);
  ~n.indexOf(e) || n.push(e);
};
D.removeEventListener = function(i, e) {
  var n = Vt[i], t = n && n.indexOf(e);
  t >= 0 && n.splice(t, 1);
};
D.batch = function(i, e) {
  var n = [], t = {}, r = e.interval || 0.016, o = e.batchMax || 1e9, l = function(y, A) {
    var T = [], h = [], u = p.delayedCall(r, function() {
      A(T, h), T = [], h = [];
    }).pause();
    return function(v) {
      T.length || u.restart(!0), T.push(v.trigger), h.push(v), o <= T.length && u.progress(1);
    };
  }, s;
  for (s in e)
    t[s] = s.substr(0, 2) === "on" && ke(e[s]) && s !== "onRefreshInit" ? l(s, e[s]) : e[s];
  return ke(o) && (o = o(), pe(D, "refresh", function() {
    return o = e.batchMax();
  })), Dr(i).forEach(function(f) {
    var y = {};
    for (s in t)
      y[s] = t[s];
    y.trigger = f, n.push(D.create(y));
  }), n;
};
var Vn = function(e, n, t, r) {
  return n > r ? e(r) : n < 0 && e(0), t > r ? (r - n) / (t - n) : t < 0 ? n / (n - t) : 1;
}, dn = function i(e, n) {
  n === !0 ? e.style.removeProperty("touch-action") : e.style.touchAction = n === !0 ? "auto" : n ? "pan-" + n + (J.isTouch ? " pinch-zoom" : "") : "none", e === Ge && i(Y, n);
}, Gr = {
  auto: 1,
  scroll: 1
}, Xi = function(e) {
  var n = e.event, t = e.target, r = e.axis, o = (n.changedTouches ? n.changedTouches[0] : n).target, l = o._gsap || p.core.getCache(o), s = Ce(), f;
  if (!l._isScrollT || s - l._isScrollT > 2e3) {
    for (; o && o !== Y && (o.scrollHeight <= o.clientHeight && o.scrollWidth <= o.clientWidth || !(Gr[(f = Qe(o)).overflowY] || Gr[f.overflowX])); )
      o = o.parentNode;
    l._isScroll = o && o !== t && !Ut(o) && (Gr[(f = Qe(o)).overflowY] || Gr[f.overflowX]), l._isScrollT = s;
  }
  (l._isScroll || r === "x") && (n.stopPropagation(), n._gsapAllow = !0);
}, Si = function(e, n, t, r) {
  return J.create({
    target: e,
    capture: !0,
    debounce: !1,
    lockAxis: !0,
    type: n,
    onWheel: r = r && Xi,
    onPress: r,
    onDrag: r,
    onScroll: r,
    onEnable: function() {
      return t && pe(z, J.eventTypes[0], Zn, !1, !0);
    },
    onDisable: function() {
      return de(z, J.eventTypes[0], Zn, !0);
    }
  });
}, Wi = /(input|label|select|textarea)/i, Kn, Zn = function(e) {
  var n = Wi.test(e.target.tagName);
  (n || Kn) && (e._gsapAllow = !0, Kn = n);
}, qi = function(e) {
  Xt(e) || (e = {}), e.preventDefault = e.isNormalizer = e.allowClicks = !0, e.type || (e.type = "wheel,touch"), e.debounce = !!e.debounce, e.id = e.id || "normalizer";
  var n = e, t = n.normalizeScrollX, r = n.momentum, o = n.allowNestedScroll, l = n.onRelease, s, f, y = Ne(e.target) || Ge, A = p.core.globals().ScrollSmoother, T = A && A.get(), h = Dt && (e.content && Ne(e.content) || T && e.content !== !1 && !T.smooth() && T.content()), u = Lt(y, le), v = Lt(y, ze), $ = 1, N = (J.isTouch && P.visualViewport ? P.visualViewport.scale * P.visualViewport.width : P.outerWidth) / P.innerWidth, ne = 0, W = ke(r) ? function() {
    return r(s);
  } : function() {
    return r || 2.8;
  }, he, k, Ve = Si(y, e.type, !0, o), H = function() {
    return k = !1;
  }, x = ut, Te = ut, Be = function() {
    f = ft(y, le), Te = Sr(Dt ? 1 : 0, f), t && (x = Sr(0, ft(y, ze))), he = Gt;
  }, g = function() {
    h._gsap.y = mr(parseFloat(h._gsap.y) + u.offset) + "px", h.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(h._gsap.y) + ", 0, 1)", u.offset = u.cacheID = 0;
  }, ce = function() {
    if (k) {
      requestAnimationFrame(H);
      var Q = mr(s.deltaY / 2), j = Te(u.v - Q);
      if (h && j !== u.v + u.offset) {
        u.offset = j - u.v;
        var a = mr((parseFloat(h && h._gsap.y) || 0) - u.offset);
        h.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + a + ", 0, 1)", h._gsap.y = a + "px", u.cacheID = M.cache, bt();
      }
      return !0;
    }
    u.offset && g(), k = !0;
  }, w, pt, ie, Ee, Pe = function() {
    Be(), w.isActive() && w.vars.scrollY > f && (u() > f ? w.progress(1) && u(f) : w.resetTo("scrollY", f));
  };
  return h && p.set(h, {
    y: "+=0"
  }), e.ignoreCheck = function(B) {
    return Dt && B.type === "touchmove" && ce() || $ > 1.05 && B.type !== "touchstart" || s.isGesturing || B.touches && B.touches.length > 1;
  }, e.onPress = function() {
    k = !1;
    var B = $;
    $ = mr((P.visualViewport && P.visualViewport.scale || 1) / N), w.pause(), B !== $ && dn(y, $ > 1.01 ? !0 : t ? !1 : "x"), pt = v(), ie = u(), Be(), he = Gt;
  }, e.onRelease = e.onGestureStart = function(B, Q) {
    if (u.offset && g(), !Q)
      Ee.restart(!0);
    else {
      M.cache++;
      var j = W(), a, oe;
      t && (a = v(), oe = a + j * 0.05 * -B.velocityX / 0.227, j *= Vn(v, a, oe, ft(y, ze)), w.vars.scrollX = x(oe)), a = u(), oe = a + j * 0.05 * -B.velocityY / 0.227, j *= Vn(u, a, oe, ft(y, le)), w.vars.scrollY = Te(oe), w.invalidate().duration(j).play(0.01), (Dt && w.vars.scrollY >= f || a >= f - 1) && p.to({}, {
        onUpdate: Pe,
        duration: j
      });
    }
    l && l(B);
  }, e.onWheel = function() {
    w._ts && w.pause(), Ce() - ne > 1e3 && (he = 0, ne = Ce());
  }, e.onChange = function(B, Q, j, a, oe) {
    if (Gt !== he && Be(), Q && t && v(x(a[2] === Q ? pt + (B.startX - B.x) : v() + Q - a[1])), j) {
      u.offset && g();
      var It = oe[2] === j, St = It ? ie + B.startY - B.y : u() + j - oe[1], Ke = Te(St);
      It && St !== Ke && (ie += Ke - St), u(Ke);
    }
    (j || Q) && bt();
  }, e.onEnable = function() {
    dn(y, t ? !1 : "x"), D.addEventListener("refresh", Pe), pe(P, "resize", Pe), u.smooth && (u.target.style.scrollBehavior = "auto", u.smooth = v.smooth = !1), Ve.enable();
  }, e.onDisable = function() {
    dn(y, !0), de(P, "resize", Pe), D.removeEventListener("refresh", Pe), Ve.kill();
  }, e.lockAxis = e.lockAxis !== !1, s = new J(e), s.iOS = Dt, Dt && !u() && u(1), Dt && p.ticker.add(ut), Ee = s._dc, w = p.to(s, {
    ease: "power4",
    paused: !0,
    inherit: !1,
    scrollX: t ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: bi(u, u(), function() {
        return w.pause();
      })
    },
    onUpdate: bt,
    onComplete: Ee.vars.onComplete
  }), s;
};
D.sort = function(i) {
  if (ke(i))
    return E.sort(i);
  var e = P.pageYOffset || 0;
  return D.getAll().forEach(function(n) {
    return n._sortY = n.trigger ? e + n.trigger.getBoundingClientRect().top : n.start + P.innerHeight;
  }), E.sort(i || function(n, t) {
    return (n.vars.refreshPriority || 0) * -1e6 + (n.vars.containerAnimation ? 1e6 : n._sortY) - ((t.vars.containerAnimation ? 1e6 : t._sortY) + (t.vars.refreshPriority || 0) * -1e6);
  });
};
D.observe = function(i) {
  return new J(i);
};
D.normalizeScroll = function(i) {
  if (typeof i > "u")
    return Le;
  if (i === !0 && Le)
    return Le.enable();
  if (i === !1) {
    Le && Le.kill(), Le = i;
    return;
  }
  var e = i instanceof J ? i : qi(i);
  return Le && Le.target === e.target && Le.kill(), Ut(e.target) && (Le = e), e;
};
D.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp: _n,
  _inputObserver: Si,
  _scrollers: M,
  _proxies: dt,
  bridge: {
    // when normalizeScroll sets the scroll position (ss = setScroll)
    ss: function() {
      je || Kt("scrollStart"), je = Ce();
    },
    // a way to get the _refreshing value in Observer
    ref: function() {
      return Se;
    }
  }
};
fi() && p.registerPlugin(D);
jr.registerPlugin(D);
const $i = ".system-carousel, [data-carousel-prev], [data-carousel-next], [data-carousel-dot], [data-carousel-viewport], a, button, input, label, select, textarea, summary";
function Gi() {
  const i = document.querySelector(".hero h1"), e = document.querySelector(".hero__lead");
  i && jr.fromTo(
    [i, e].filter(Boolean),
    { opacity: 0, y: 18 },
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out" }
  );
}
function pn(i) {
  const e = document.querySelectorAll(i);
  e.length && (jr.set(e, { opacity: 0, y: 24 }), e.forEach((n, t) => {
    D.create({
      trigger: n,
      start: "top 88%",
      once: !0,
      onEnter: () => jr.to(n, { opacity: 1, y: 0, duration: 0.5, delay: t % 4 * 0.06, ease: "power2.out" })
    });
  }));
}
class Ui {
  constructor(e) {
    ct(this, "activeIndex", 0);
    ct(this, "slides");
    ct(this, "dots");
    ct(this, "prevButton");
    ct(this, "nextButton");
    ct(this, "viewport");
    ct(this, "counter");
    ct(this, "status");
    ct(this, "systemName");
    var n, t, r, o;
    if (this.root = e, this.slides = Array.from(e.querySelectorAll("[data-carousel-slide]")), this.dots = Array.from(e.querySelectorAll("[data-carousel-dot]")), this.prevButton = e.querySelector("[data-carousel-prev]"), this.nextButton = e.querySelector("[data-carousel-next]"), this.viewport = e.querySelector("[data-carousel-viewport]"), this.counter = e.querySelector("[data-carousel-counter]"), this.status = e.querySelector("[data-carousel-status]"), this.systemName = e.dataset.systemName ?? "systemu", this.slides.length <= 1) {
      this.update();
      return;
    }
    (n = this.prevButton) == null || n.addEventListener("click", (l) => {
      l.stopPropagation(), this.show(this.activeIndex - 1);
    }), (t = this.nextButton) == null || t.addEventListener("click", (l) => {
      l.stopPropagation(), this.show(this.activeIndex + 1);
    }), this.dots.forEach((l, s) => {
      l.addEventListener("click", (f) => {
        f.stopPropagation(), this.show(s);
      });
    }), (r = this.viewport) == null || r.addEventListener("click", (l) => {
      l.stopPropagation();
    }), (o = this.viewport) == null || o.addEventListener("keydown", (l) => {
      l.key === "ArrowLeft" && (l.preventDefault(), this.show(this.activeIndex - 1)), l.key === "ArrowRight" && (l.preventDefault(), this.show(this.activeIndex + 1)), l.key === "Home" && (l.preventDefault(), this.show(0)), l.key === "End" && (l.preventDefault(), this.show(this.slides.length - 1));
    }), this.update();
  }
  show(e) {
    const n = this.slides.length;
    this.activeIndex = (e + n) % n, this.update();
  }
  update() {
    this.slides.forEach((e, n) => {
      const t = n === this.activeIndex;
      e.classList.toggle("is-active", t), e.setAttribute("aria-hidden", String(!t));
    }), this.dots.forEach((e, n) => {
      const t = n === this.activeIndex;
      e.classList.toggle("is-active", t), e.setAttribute("aria-pressed", String(t));
    }), this.counter && (this.counter.textContent = `${this.activeIndex + 1} / ${this.slides.length}`), this.status && (this.status.textContent = `${this.systemName}: zdjęcie ${this.activeIndex + 1} z ${this.slides.length}`);
  }
}
function Jn(i) {
  const e = new URL(window.location.href);
  e.hash = i ? `#${i}` : "", window.history.replaceState(window.history.state, "", e);
}
function Vi(i) {
  if (i.dataset.systemsSelectionInitialized === "true") return;
  i.dataset.systemsSelectionInitialized = "true";
  const e = Array.from(i.querySelectorAll(".system-pill[id]"));
  if (!e.length) return;
  const n = new Map(e.map((s) => [s.id, s]));
  let t = null;
  const r = (s) => {
    t = (s == null ? void 0 : s.id) ?? null, e.forEach((f) => f.classList.toggle("is-selected", f === s));
  }, o = () => {
    const s = decodeURIComponent(window.location.hash.slice(1));
    r(s ? n.get(s) ?? null : null);
  }, l = () => {
    !t && !window.location.hash || (r(null), Jn(null));
  };
  i.addEventListener("click", (s) => {
    const f = s.target;
    if (!f) return;
    const y = f.closest(".system-pill[id]");
    if (y) {
      if (f.closest($i))
        return;
      t !== y.id && (r(y), Jn(y.id));
      return;
    }
    l();
  }), i.addEventListener("change", (s) => {
    const f = s.target;
    f != null && f.matches('input[name="systems-filter"]') && l();
  }), window.addEventListener("hashchange", o), o();
}
function Ki() {
  const i = document.querySelector("#systems-page");
  !i || i.dataset.systemsInitialized === "true" || (i.dataset.systemsInitialized = "true", i.querySelectorAll("[data-system-carousel]").forEach((e) => {
    new Ui(e);
  }), Vi(i));
}
function Qn() {
  Gi(), pn(".section-card"), pn(".system-button"), pn(".system-card"), Ki();
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", Qn) : Qn();
