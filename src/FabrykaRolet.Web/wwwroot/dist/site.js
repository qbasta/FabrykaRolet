var ki = Object.defineProperty;
var Ei = (i, e, n) => e in i ? ki(i, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : i[e] = n;
var ct = (i, e, n) => Ei(i, typeof e != "symbol" ? e + "" : e, n);
import { g as en } from "./index-9nJrthwM.js";
function Ti(i, e) {
  for (var n = 0; n < e.length; n++) {
    var t = e[n];
    t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(i, t.key, t);
  }
}
function Mi(i, e, n) {
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
var me, Vr, Ue, At, Rt, or, ei, Ht, sr, ti, xt, ot, ri, ni = function() {
  return me || typeof window < "u" && (me = window.gsap) && me.registerPlugin && me;
}, ii = 1, ir = [], D = [], dt = [], xr = Date.now, gn = function(e, n) {
  return n;
}, Pi = function() {
  var e = sr.core, n = e.bridge || {}, t = e._scrollers, r = e._proxies;
  t.push.apply(t, D), r.push.apply(r, dt), D = t, dt = r, gn = function(a, s) {
    return n[a](s);
  };
}, Ot = function(e, n) {
  return ~dt.indexOf(e) && dt[dt.indexOf(e) + 1][n];
}, br = function(e) {
  return !!~ti.indexOf(e);
}, Oe = function(e, n, t, r, o) {
  return e.addEventListener(n, t, {
    passive: r !== !1,
    capture: !!o
  });
}, Re = function(e, n, t, r) {
  return e.removeEventListener(n, t, !!r);
}, Ir = "scrollLeft", zr = "scrollTop", _n = function() {
  return xt && xt.isPressed || D.cache++;
}, tn = function(e, n) {
  var t = function r(o) {
    if (o || o === 0) {
      ii && (Ue.history.scrollRestoration = "manual");
      var a = xt && xt.isPressed;
      o = r.v = Math.round(o) || (xt && xt.iOS ? 1 : 0), e(o), r.cacheID = D.cache, a && gn("ss", o);
    } else (n || D.cache !== r.cacheID || gn("ref")) && (r.cacheID = D.cache, r.v = e());
    return r.v + r.offset;
  };
  return t.offset = 0, e && t;
}, Ne = {
  s: Ir,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: tn(function(i) {
    return arguments.length ? Ue.scrollTo(i, le.sc()) : Ue.pageXOffset || At[Ir] || Rt[Ir] || or[Ir] || 0;
  })
}, le = {
  s: zr,
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: Ne,
  sc: tn(function(i) {
    return arguments.length ? Ue.scrollTo(Ne.sc(), i) : Ue.pageYOffset || At[zr] || Rt[zr] || or[zr] || 0;
  })
}, Fe = function(e, n) {
  return (n && n._ctx && n._ctx.selector || me.utils.toArray)(e)[0] || (typeof e == "string" && me.config().nullTargetWarn !== !1 ? console.warn("Element not found:", e) : null);
}, Di = function(e, n) {
  for (var t = n.length; t--; )
    if (n[t] === e || n[t].contains(e))
      return !0;
  return !1;
}, Lt = function(e, n) {
  var t = n.s, r = n.sc;
  br(e) && (e = At.scrollingElement || Rt);
  var o = D.indexOf(e), a = r === le.sc ? 1 : 2;
  !~o && (o = D.push(e) - 1), D[o + a] || Oe(e, "scroll", _n);
  var s = D[o + a], f = s || (D[o + a] = tn(Ot(e, t), !0) || (br(e) ? r : tn(function(m) {
    return arguments.length ? e[t] = m : e[t];
  })));
  return f.target = e, s || (f.smooth = me.getProperty(e, "scrollBehavior") === "smooth"), f;
}, mn = function(e, n, t) {
  var r = e, o = e, a = xr(), s = a, f = n || 50, m = Math.max(500, f * 3), T = function(v, $) {
    var F = xr();
    $ || F - a > f ? (o = r, r = v, s = a, a = F) : t ? r += v : r = o + (v - o) / (F - s) * (a - s);
  }, w = function() {
    o = r = t ? 0 : r, s = a = 0;
  }, h = function(v) {
    var $ = s, F = o, ne = xr();
    return (v || v === 0) && v !== r && T(v), a === s || ne - s > m ? 0 : (r + (t ? F : -F)) / ((t ? ne : a) - $) * 1e3;
  };
  return {
    update: T,
    reset: w,
    getVelocity: h
  };
}, hr = function(e, n) {
  return n && !e._gsapAllow && e.cancelable !== !1 && e.preventDefault(), e.changedTouches ? e.changedTouches[0] : e;
}, Ln = function(e) {
  var n = Math.max.apply(Math, e), t = Math.min.apply(Math, e);
  return Math.abs(n) >= Math.abs(t) ? n : t;
}, oi = function() {
  sr = me.core.globals().ScrollTrigger, sr && sr.core && Pi();
}, si = function(e) {
  return me = e || ni(), !Vr && me && typeof document < "u" && document.body && (Ue = window, At = document, Rt = At.documentElement, or = At.body, ti = [Ue, At, Rt, or], me.utils.clamp, ri = me.core.context || function() {
  }, Ht = "onpointerenter" in or ? "pointer" : "mouse", ei = J.isTouch = Ue.matchMedia && Ue.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in Ue || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, ot = J.eventTypes = ("ontouchstart" in Rt ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in Rt ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
    return ii = 0;
  }, 500), Vr = 1), sr || oi(), Vr;
};
Ne.op = le;
D.cache = 0;
var J = /* @__PURE__ */ (function() {
  function i(n) {
    this.init(n);
  }
  var e = i.prototype;
  return e.init = function(t) {
    Vr || si(me) || console.warn("Please gsap.registerPlugin(Observer)"), sr || oi();
    var r = t.tolerance, o = t.dragMinimum, a = t.type, s = t.target, f = t.lineHeight, m = t.debounce, T = t.preventDefault, w = t.onStop, h = t.onStopDelay, u = t.ignore, v = t.wheelSpeed, $ = t.event, F = t.onDragStart, ne = t.onDragEnd, q = t.onDrag, he = t.onPress, E = t.onRelease, Ve = t.onRight, H = t.onLeft, b = t.onUp, Ee = t.onDown, Ye = t.onChangeX, g = t.onChangeY, ce = t.onChange, x = t.onToggleX, pt = t.onToggleY, ie = t.onHover, Te = t.onHoverEnd, Me = t.onMove, Y = t.ignoreCheck, Q = t.isNormalizer, j = t.onGestureStart, l = t.onGestureEnd, oe = t.onWheel, It = t.onEnable, St = t.onDisable, Ke = t.onClick, ht = t.scrollSpeed, ve = t.capture, ee = t.allowClicks, Pe = t.lockAxis, ye = t.onLockAxis;
    this.target = s = Fe(s) || Rt, this.vars = t, u && (u = me.utils.toArray(u)), r = r || 1e-9, o = o || 0, v = v || 1, ht = ht || 1, a = a || "wheel,touch,pointer", m = m !== !1, f || (f = parseFloat(Ue.getComputedStyle(or).lineHeight) || 22);
    var Ct, De, Ae, L, V, Be, He, c = this, Xe = 0, gt = 0, kt = t.passive || !T && t.passive !== !1, G = Lt(s, Ne), _t = Lt(s, le), Et = G(), zt = _t(), ue = ~a.indexOf("touch") && !~a.indexOf("pointer") && ot[0] === "pointerdown", Tt = br(s), K = s.ownerDocument || At, et = [0, 0, 0], Ze = [0, 0, 0], mt = 0, ur = function() {
      return mt = xr();
    }, te = function(y, I) {
      return (c.event = y) && u && Di(y.target, u) || I && ue && y.pointerType !== "touch" || Y && Y(y, I);
    }, Rr = function() {
      c._vx.reset(), c._vy.reset(), De.pause(), w && w(c);
    }, vt = function() {
      var y = c.deltaX = Ln(et), I = c.deltaY = Ln(Ze), d = Math.abs(y) >= r, S = Math.abs(I) >= r;
      ce && (d || S) && ce(c, y, I, et, Ze), d && (Ve && c.deltaX > 0 && Ve(c), H && c.deltaX < 0 && H(c), Ye && Ye(c), x && c.deltaX < 0 != Xe < 0 && x(c), Xe = c.deltaX, et[0] = et[1] = et[2] = 0), S && (Ee && c.deltaY > 0 && Ee(c), b && c.deltaY < 0 && b(c), g && g(c), pt && c.deltaY < 0 != gt < 0 && pt(c), gt = c.deltaY, Ze[0] = Ze[1] = Ze[2] = 0), (L || Ae) && (Me && Me(c), Ae && (F && Ae === 1 && F(c), q && q(c), Ae = 0), L = !1), Be && !(Be = !1) && ye && ye(c), V && (oe(c), V = !1), Ct = 0;
    }, Zt = function(y, I, d) {
      et[d] += y, Ze[d] += I, c._vx.update(y), c._vy.update(I), m ? Ct || (Ct = requestAnimationFrame(vt)) : vt();
    }, Jt = function(y, I) {
      Pe && !He && (c.axis = He = Math.abs(y) > Math.abs(I) ? "x" : "y", Be = !0), He !== "y" && (et[2] += y, c._vx.update(y, !0)), He !== "x" && (Ze[2] += I, c._vy.update(I, !0)), m ? Ct || (Ct = requestAnimationFrame(vt)) : vt();
    }, Mt = function(y) {
      if (!te(y, 1)) {
        y = hr(y, T);
        var I = y.clientX, d = y.clientY, S = I - c.x, _ = d - c.y, C = c.isDragging;
        c.x = I, c.y = d, (C || (S || _) && (Math.abs(c.startX - I) >= o || Math.abs(c.startY - d) >= o)) && (Ae || (Ae = C ? 2 : 1), C || (c.isDragging = !0), Jt(S, _));
      }
    }, Nt = c.onPress = function(k) {
      te(k, 1) || k && k.button || (c.axis = He = null, De.pause(), c.isPressed = !0, k = hr(k), Xe = gt = 0, c.startX = c.x = k.clientX, c.startY = c.y = k.clientY, c._vx.reset(), c._vy.reset(), Oe(Q ? s : K, ot[1], Mt, kt, !0), c.deltaX = c.deltaY = 0, he && he(c));
    }, R = c.onRelease = function(k) {
      if (!te(k, 1)) {
        Re(Q ? s : K, ot[1], Mt, !0);
        var y = !isNaN(c.y - c.startY), I = c.isDragging, d = I && (Math.abs(c.x - c.startX) > 3 || Math.abs(c.y - c.startY) > 3), S = hr(k);
        !d && y && (c._vx.reset(), c._vy.reset(), T && ee && me.delayedCall(0.08, function() {
          if (xr() - mt > 300 && !k.defaultPrevented) {
            if (k.target.click)
              k.target.click();
            else if (K.createEvent) {
              var _ = K.createEvent("MouseEvents");
              _.initMouseEvent("click", !0, !0, Ue, 1, S.screenX, S.screenY, S.clientX, S.clientY, !1, !1, !1, !1, 0, null), k.target.dispatchEvent(_);
            }
          }
        })), c.isDragging = c.isGesturing = c.isPressed = !1, w && I && !Q && De.restart(!0), Ae && vt(), ne && I && ne(c), E && E(c, d);
      }
    }, Yt = function(y) {
      return y.touches && y.touches.length > 1 && (c.isGesturing = !0) && j(y, c.isDragging);
    }, tt = function() {
      return (c.isGesturing = !1) || l(c);
    }, rt = function(y) {
      if (!te(y)) {
        var I = G(), d = _t();
        Zt((I - Et) * ht, (d - zt) * ht, 1), Et = I, zt = d, w && De.restart(!0);
      }
    }, nt = function(y) {
      if (!te(y)) {
        y = hr(y, T), oe && (V = !0);
        var I = (y.deltaMode === 1 ? f : y.deltaMode === 2 ? Ue.innerHeight : 1) * v;
        Zt(y.deltaX * I, y.deltaY * I, 0), w && !Q && De.restart(!0);
      }
    }, Bt = function(y) {
      if (!te(y)) {
        var I = y.clientX, d = y.clientY, S = I - c.x, _ = d - c.y;
        c.x = I, c.y = d, L = !0, w && De.restart(!0), (S || _) && Jt(S, _);
      }
    }, Qt = function(y) {
      c.event = y, ie(c);
    }, yt = function(y) {
      c.event = y, Te(c);
    }, fr = function(y) {
      return te(y) || hr(y, T) && Ke(c);
    };
    De = c._dc = me.delayedCall(h || 0.25, Rr).pause(), c.deltaX = c.deltaY = 0, c._vx = mn(0, 50, !0), c._vy = mn(0, 50, !0), c.scrollX = G, c.scrollY = _t, c.isDragging = c.isGesturing = c.isPressed = !1, ri(this), c.enable = function(k) {
      return c.isEnabled || (Oe(Tt ? K : s, "scroll", _n), a.indexOf("scroll") >= 0 && Oe(Tt ? K : s, "scroll", rt, kt, ve), a.indexOf("wheel") >= 0 && Oe(s, "wheel", nt, kt, ve), (a.indexOf("touch") >= 0 && ei || a.indexOf("pointer") >= 0) && (Oe(s, ot[0], Nt, kt, ve), Oe(K, ot[2], R), Oe(K, ot[3], R), ee && Oe(s, "click", ur, !0, !0), Ke && Oe(s, "click", fr), j && Oe(K, "gesturestart", Yt), l && Oe(K, "gestureend", tt), ie && Oe(s, Ht + "enter", Qt), Te && Oe(s, Ht + "leave", yt), Me && Oe(s, Ht + "move", Bt)), c.isEnabled = !0, c.isDragging = c.isGesturing = c.isPressed = L = Ae = !1, c._vx.reset(), c._vy.reset(), Et = G(), zt = _t(), k && k.type && Nt(k), It && It(c)), c;
    }, c.disable = function() {
      c.isEnabled && (ir.filter(function(k) {
        return k !== c && br(k.target);
      }).length || Re(Tt ? K : s, "scroll", _n), c.isPressed && (c._vx.reset(), c._vy.reset(), Re(Q ? s : K, ot[1], Mt, !0)), Re(Tt ? K : s, "scroll", rt, ve), Re(s, "wheel", nt, ve), Re(s, ot[0], Nt, ve), Re(K, ot[2], R), Re(K, ot[3], R), Re(s, "click", ur, !0), Re(s, "click", fr), Re(K, "gesturestart", Yt), Re(K, "gestureend", tt), Re(s, Ht + "enter", Qt), Re(s, Ht + "leave", yt), Re(s, Ht + "move", Bt), c.isEnabled = c.isPressed = c.isDragging = !1, St && St(c));
    }, c.kill = c.revert = function() {
      c.disable();
      var k = ir.indexOf(c);
      k >= 0 && ir.splice(k, 1), xt === c && (xt = 0);
    }, ir.push(c), Q && br(s) && (xt = c), c.enable($);
  }, Mi(i, [{
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
J.register = si;
J.getAll = function() {
  return ir.slice();
};
J.getById = function(i) {
  return ir.filter(function(e) {
    return e.vars.id === i;
  })[0];
};
ni() && me.registerPlugin(J);
/*!
 * ScrollTrigger 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var p, rr, P, N, Ge, z, kn, rn, Dr, Sr, _r, Nr, Se, sn, vn, Ie, In, zn, nr, ai, ln, li, Le, yn, ci, ui, Dt, wn, En, ar, Tn, Cr, xn, cn, Yr = 1, Ce = Date.now, un = Ce(), je = 0, mr = 0, Nn = function(e, n, t) {
  var r = $e(e) && (e.substr(0, 6) === "clamp(" || e.indexOf("max") > -1);
  return t["_" + n + "Clamp"] = r, r ? e.substr(6, e.length - 7) : e;
}, Yn = function(e, n) {
  return n && (!$e(e) || e.substr(0, 6) !== "clamp(") ? "clamp(" + e + ")" : e;
}, Ai = function i() {
  return mr && requestAnimationFrame(i);
}, Bn = function() {
  return sn = 1;
}, Fn = function() {
  return sn = 0;
}, ut = function(e) {
  return e;
}, vr = function(e) {
  return Math.round(e * 1e5) / 1e5 || 0;
}, fi = function() {
  return typeof window < "u";
}, di = function() {
  return p || fi() && (p = window.gsap) && p.registerPlugin && p;
}, Ut = function(e) {
  return !!~kn.indexOf(e);
}, pi = function(e) {
  return (e === "Height" ? Tn : P["inner" + e]) || Ge["client" + e] || z["client" + e];
}, hi = function(e) {
  return Ot(e, "getBoundingClientRect") || (Ut(e) ? function() {
    return jr.width = P.innerWidth, jr.height = Tn, jr;
  } : function() {
    return wt(e);
  });
}, Ri = function(e, n, t) {
  var r = t.d, o = t.d2, a = t.a;
  return (a = Ot(e, "getBoundingClientRect")) ? function() {
    return a()[r];
  } : function() {
    return (n ? pi(o) : e["client" + o]) || 0;
  };
}, Oi = function(e, n) {
  return !n || ~dt.indexOf(e) ? hi(e) : function() {
    return jr;
  };
}, ft = function(e, n) {
  var t = n.s, r = n.d2, o = n.d, a = n.a;
  return Math.max(0, (t = "scroll" + r) && (a = Ot(e, t)) ? a() - hi(e)()[o] : Ut(e) ? (Ge[t] || z[t]) - pi(r) : e[t] - e["offset" + r]);
}, Br = function(e, n) {
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
}, er = Math.abs, gi = "left", _i = "top", Mn = "right", Pn = "bottom", Wt = "width", $t = "height", kr = "Right", Er = "Left", Tr = "Top", Mr = "Bottom", re = "padding", Je = "margin", cr = "Width", Dn = "Height", ae = "px", Qe = function(e) {
  return P.getComputedStyle(e.nodeType === Node.DOCUMENT_NODE ? e.scrollingElement : e);
}, Li = function(e) {
  var n = Qe(e).position;
  e.style.position = n === "absolute" || n === "fixed" ? n : "relative";
}, Hn = function(e, n) {
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
}, nn = function(e, n) {
  var t = n.d2;
  return e["offset" + t] || e["client" + t] || 0;
}, mi = function(e) {
  var n = [], t = e.labels, r = e.duration(), o;
  for (o in t)
    n.push(t[o] / r);
  return n;
}, Ii = function(e) {
  return function(n) {
    return p.utils.snap(mi(e), n);
  };
}, An = function(e) {
  var n = p.utils.snap(e), t = Array.isArray(e) && e.slice(0).sort(function(r, o) {
    return r - o;
  });
  return t ? function(r, o, a) {
    a === void 0 && (a = 1e-3);
    var s;
    if (!o)
      return n(r);
    if (o > 0) {
      for (r -= a, s = 0; s < t.length; s++)
        if (t[s] >= r)
          return t[s];
      return t[s - 1];
    } else
      for (s = t.length, r += a; s--; )
        if (t[s] <= r)
          return t[s];
    return t[0];
  } : function(r, o, a) {
    a === void 0 && (a = 1e-3);
    var s = n(r);
    return !o || Math.abs(s - r) < a || s - r < 0 == o < 0 ? s : n(o < 0 ? r - e : r + e);
  };
}, zi = function(e) {
  return function(n, t) {
    return An(mi(e))(n, t.direction);
  };
}, Fr = function(e, n, t, r) {
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
}, Xn = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
}, Xr = {
  toggleActions: "play",
  anticipatePin: 0
}, on = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
}, Kr = function(e, n) {
  if ($e(e)) {
    var t = e.indexOf("="), r = ~t ? +(e.charAt(t - 1) + 1) * parseFloat(e.substr(t + 1)) : 0;
    ~t && (e.indexOf("%") > t && (r *= n / 100), e = e.substr(0, t - 1)), e = r + (e in on ? on[e] * n : ~e.indexOf("%") ? parseFloat(e) * n / 100 : parseFloat(e) || 0);
  }
  return e;
}, qr = function(e, n, t, r, o, a, s, f) {
  var m = o.startColor, T = o.endColor, w = o.fontSize, h = o.indent, u = o.fontWeight, v = N.createElement("div"), $ = Ut(t) || Ot(t, "pinType") === "fixed", F = e.indexOf("scroller") !== -1, ne = $ ? z : t.tagName === "IFRAME" ? t.contentDocument.body : t, q = e.indexOf("start") !== -1, he = q ? m : T, E = "border-color:" + he + ";font-size:" + w + ";color:" + he + ";font-weight:" + u + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return E += "position:" + ((F || f) && $ ? "fixed;" : "absolute;"), (F || f || !$) && (E += (r === le ? Mn : Pn) + ":" + (a + parseFloat(h)) + "px;"), s && (E += "box-sizing:border-box;text-align:left;width:" + s.offsetWidth + "px;"), v._isStart = q, v.setAttribute("class", "gsap-marker-" + e + (n ? " marker-" + n : "")), v.style.cssText = E, v.innerText = n || n === 0 ? e + "-" + n : e, ne.children[0] ? ne.insertBefore(v, ne.children[0]) : ne.appendChild(v), v._offset = v["offset" + r.op.d2], Zr(v, 0, r, q), v;
}, Zr = function(e, n, t, r) {
  var o = {
    display: "block"
  }, a = t[r ? "os2" : "p2"], s = t[r ? "p2" : "os2"];
  e._isFlipped = r, o[t.a + "Percent"] = r ? -100 : 0, o[t.a] = r ? "1px" : 0, o["border" + a + cr] = 1, o["border" + s + cr] = 0, o[t.p] = n + "px", p.set(e, o);
}, M = [], bn = {}, Ar, qn = function() {
  return Ce() - je > 34 && (Ar || (Ar = requestAnimationFrame(bt)));
}, tr = function() {
  (!Le || !Le.isPressed || Le.startX > z.clientWidth) && (D.cache++, Le ? Ar || (Ar = requestAnimationFrame(bt)) : bt(), je || Kt("scrollStart"), je = Ce());
}, fn = function() {
  ui = P.innerWidth, ci = P.innerHeight;
}, wr = function(e) {
  D.cache++, (e === !0 || !Se && !li && !N.fullscreenElement && !N.webkitFullscreenElement && (!yn || ui !== P.innerWidth || Math.abs(P.innerHeight - ci) > P.innerHeight * 0.25)) && rn.restart(!0);
}, Vt = {}, Ni = [], vi = function i() {
  return de(A, "scrollEnd", i) || qt(!0);
}, Kt = function(e) {
  return Vt[e] && Vt[e].map(function(n) {
    return n();
  }) || Ni;
}, We = [], yi = function(e) {
  for (var n = 0; n < We.length; n += 5)
    (!e || We[n + 4] && We[n + 4].query === e) && (We[n].style.cssText = We[n + 1], We[n].getBBox && We[n].setAttribute("transform", We[n + 2] || ""), We[n + 3].uncache = 1);
}, wi = function() {
  return D.forEach(function(e) {
    return ke(e) && ++e.cacheID && (e.rec = e());
  });
}, Rn = function(e, n) {
  var t;
  for (Ie = 0; Ie < M.length; Ie++)
    t = M[Ie], t && (!n || t._ctx === n) && (e ? t.kill(1) : t.revert(!0, !0));
  Cr = !0, n && yi(n), n || Kt("revert");
}, xi = function(e, n) {
  D.cache++, (n || !ze) && D.forEach(function(t) {
    return ke(t) && t.cacheID++ && (t.rec = 0);
  }), $e(e) && (P.history.scrollRestoration = En = e);
}, ze, Gt = 0, Wn, Yi = function() {
  if (Wn !== Gt) {
    var e = Wn = Gt;
    requestAnimationFrame(function() {
      return e === Gt && qt(!0);
    });
  }
}, bi = function() {
  z.appendChild(ar), Tn = !Le && ar.offsetHeight || P.innerHeight, z.removeChild(ar);
}, $n = function(e) {
  return Dr(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(n) {
    return n.style.display = e ? "none" : "block";
  });
}, qt = function(e, n) {
  if (Ge = N.documentElement, z = N.body, kn = [P, N, Ge, z], je && !e && !Cr) {
    pe(A, "scrollEnd", vi);
    return;
  }
  bi(), ze = A.isRefreshing = !0, Cr || wi();
  var t = Kt("refreshInit");
  ai && A.sort(), n || Rn(), D.forEach(function(r) {
    ke(r) && (r.smooth && (r.target.style.scrollBehavior = "auto"), r(0));
  }), M.slice(0).forEach(function(r) {
    return r.refresh();
  }), Cr = !1, M.forEach(function(r) {
    if (r._subPinOffset && r.pin) {
      var o = r.vars.horizontal ? "offsetWidth" : "offsetHeight", a = r.pin[o];
      r.revert(!0, 1), r.adjustPinSpacing(r.pin[o] - a), r.refresh();
    }
  }), xn = 1, $n(!0), M.forEach(function(r) {
    var o = ft(r.scroller, r._dir), a = r.vars.end === "max" || r._endClamp && r.end > o, s = r._startClamp && r.start >= o;
    (a || s) && r.setPositions(s ? o - 1 : r.start, a ? Math.max(s ? o : r.start + 1, o) : r.end, !0);
  }), $n(!1), xn = 0, t.forEach(function(r) {
    return r && r.render && r.render(-1);
  }), D.forEach(function(r) {
    ke(r) && (r.smooth && requestAnimationFrame(function() {
      return r.target.style.scrollBehavior = "smooth";
    }), r.rec && r(r.rec));
  }), xi(En, 1), rn.pause(), Gt++, ze = 2, bt(2), M.forEach(function(r) {
    return ke(r.vars.onRefresh) && r.vars.onRefresh(r);
  }), ze = A.isRefreshing = !1, Kt("refresh");
}, Sn = 0, Jr = 1, Pr, bt = function(e) {
  if (e === 2 || !ze && !Cr) {
    A.isUpdating = !0, Pr && Pr.update(0);
    var n = M.length, t = Ce(), r = t - un >= 50, o = n && M[0].scroll();
    if (Jr = Sn > o ? -1 : 1, ze || (Sn = o), r && (je && !sn && t - je > 200 && (je = 0, Kt("scrollEnd")), _r = un, un = t), Jr < 0) {
      for (Ie = n; Ie-- > 0; )
        M[Ie] && M[Ie].update(0, r);
      Jr = 1;
    } else
      for (Ie = 0; Ie < n; Ie++)
        M[Ie] && M[Ie].update(0, r);
    A.isUpdating = !1;
  }
  Ar = 0;
}, Cn = [gi, _i, Pn, Mn, Je + Mr, Je + kr, Je + Tr, Je + Er, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], Qr = Cn.concat([Wt, $t, "boxSizing", "max" + cr, "max" + Dn, "position", Je, re, re + Tr, re + kr, re + Mr, re + Er]), Bi = function(e, n, t) {
  lr(t);
  var r = e._gsap;
  if (r.spacerIsNative)
    lr(r.spacerState);
  else if (e._gsap.swappedIn) {
    var o = n.parentNode;
    o && (o.insertBefore(e, n), o.removeChild(n));
  }
  e._gsap.swappedIn = !1;
}, dn = function(e, n, t, r) {
  if (!e._gsap.swappedIn) {
    for (var o = Cn.length, a = n.style, s = e.style, f; o--; )
      f = Cn[o], a[f] = t[f];
    a.position = t.position === "absolute" ? "absolute" : "relative", t.display === "inline" && (a.display = "inline-block"), s[Pn] = s[Mn] = "auto", a.flexBasis = t.flexBasis || "auto", a.overflow = "visible", a.boxSizing = "border-box", a[Wt] = nn(e, Ne) + ae, a[$t] = nn(e, le) + ae, a[re] = s[Je] = s[_i] = s[gi] = "0", lr(r), s[Wt] = s["max" + cr] = t[Wt], s[$t] = s["max" + Dn] = t[$t], s[re] = t[re], e.parentNode !== n && (e.parentNode.insertBefore(n, e), n.appendChild(e)), e._gsap.swappedIn = !0;
  }
}, Fi = /([A-Z])/g, lr = function(e) {
  if (e) {
    var n = e.t.style, t = e.length, r = 0, o, a;
    for ((e.t._gsap || p.core.getCache(e.t)).uncache = 1; r < t; r += 2)
      a = e[r + 1], o = e[r], a ? n[o] = a : n[o] && n.removeProperty(o.replace(Fi, "-$1").toLowerCase());
  }
}, Wr = function(e) {
  for (var n = Qr.length, t = e.style, r = [], o = 0; o < n; o++)
    r.push(Qr[o], t[Qr[o]]);
  return r.t = e, r;
}, Hi = function(e, n, t) {
  for (var r = [], o = e.length, a = t ? 8 : 0, s; a < o; a += 2)
    s = e[a], r.push(s, s in n ? n[s] : e[a + 1]);
  return r.t = e.t, r;
}, jr = {
  left: 0,
  top: 0
}, Gn = function(e, n, t, r, o, a, s, f, m, T, w, h, u, v) {
  ke(e) && (e = e(f)), $e(e) && e.substr(0, 3) === "max" && (e = h + (e.charAt(4) === "=" ? Kr("0" + e.substr(3), t) : 0));
  var $ = u ? u.time() : 0, F, ne, q;
  if (u && u.seek(0), isNaN(e) || (e = +e), yr(e))
    u && (e = p.utils.mapRange(u.scrollTrigger.start, u.scrollTrigger.end, 0, h, e)), s && Zr(s, t, r, !0);
  else {
    ke(n) && (n = n(f));
    var he = (e || "0").split(" "), E, Ve, H, b;
    q = Fe(n, f) || z, E = wt(q) || {}, (!E || !E.left && !E.top) && Qe(q).display === "none" && (b = q.style.display, q.style.display = "block", E = wt(q), b ? q.style.display = b : q.style.removeProperty("display")), Ve = Kr(he[0], E[r.d]), H = Kr(he[1] || "0", t), e = E[r.p] - m[r.p] - T + Ve + o - H, s && Zr(s, H, r, t - H < 20 || s._isStart && H > 20), t -= t - H;
  }
  if (v && (f[v] = e || -1e-3, e < 0 && (e = 0)), a) {
    var Ee = e + t, Ye = a._isStart;
    F = "scroll" + r.d2, Zr(a, Ee, r, Ye && Ee > 20 || !Ye && (w ? Math.max(z[F], Ge[F]) : a.parentNode[F]) <= Ee + 1), w && (m = wt(s), w && (a.style[r.op.p] = m[r.op.p] - r.op.m - a._offset + ae));
  }
  return u && q && (F = wt(q), u.seek(h), ne = wt(q), u._caScrollDist = F[r.p] - ne[r.p], e = e / u._caScrollDist * h), u && u.seek($), u ? e : Math.round(e);
}, Xi = /(webkit|moz|length|cssText|inset)/i, Un = function(e, n, t, r) {
  if (e.parentNode !== n) {
    var o = e.style, a, s;
    if (n === z) {
      e._stOrig = o.cssText, s = Qe(e);
      for (a in s)
        !+a && !Xi.test(a) && s[a] && typeof o[a] == "string" && a !== "0" && (o[a] = s[a]);
      o.top = t, o.left = r;
    } else
      o.cssText = e._stOrig;
    p.core.getCache(e).uncache = 1, n.appendChild(e);
  }
}, Si = function(e, n, t) {
  var r = n, o = r;
  return function(a) {
    var s = Math.round(e());
    return s !== r && s !== o && Math.abs(s - r) > 3 && Math.abs(s - o) > 3 && (a = s, t && t()), o = r, r = Math.round(a), r;
  };
}, $r = function(e, n, t) {
  var r = {};
  r[n.p] = "+=" + t, p.set(e, r);
}, Vn = function(e, n) {
  var t = Lt(e, n), r = "_scroll" + n.p2, o = function a(s, f, m, T, w) {
    var h = a.tween, u = f.onComplete, v = {};
    m = m || t();
    var $ = Si(t, m, function() {
      h.kill(), a.tween = 0;
    });
    return w = T && w || 0, T = T || s - m, h && h.kill(), f[r] = s, f.inherit = !1, f.modifiers = v, v[r] = function() {
      return $(m + T * h.ratio + w * h.ratio * h.ratio);
    }, f.onUpdate = function() {
      D.cache++, a.tween && bt();
    }, f.onComplete = function() {
      a.tween = 0, u && u.call(h);
    }, h = a.tween = p.to(e, f), h;
  };
  return e[r] = t, t.wheelHandler = function() {
    return o.tween && o.tween.kill() && (o.tween = 0);
  }, pe(e, "wheel", t.wheelHandler), A.isTouch && pe(e, "touchmove", t.wheelHandler), o;
}, A = /* @__PURE__ */ (function() {
  function i(n, t) {
    rr || i.register(p) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), wn(this), this.init(n, t);
  }
  var e = i.prototype;
  return e.init = function(t, r) {
    if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !mr) {
      this.update = this.refresh = this.kill = ut;
      return;
    }
    t = Hn($e(t) || yr(t) || t.nodeType ? {
      trigger: t
    } : t, Xr);
    var o = t, a = o.onUpdate, s = o.toggleClass, f = o.id, m = o.onToggle, T = o.onRefresh, w = o.scrub, h = o.trigger, u = o.pin, v = o.pinSpacing, $ = o.invalidateOnRefresh, F = o.anticipatePin, ne = o.onScrubComplete, q = o.onSnapComplete, he = o.once, E = o.snap, Ve = o.pinReparent, H = o.pinSpacer, b = o.containerAnimation, Ee = o.fastScrollEnd, Ye = o.preventOverlaps, g = t.horizontal || t.containerAnimation && t.horizontal !== !1 ? Ne : le, ce = !w && w !== 0, x = Fe(t.scroller || P), pt = p.core.getCache(x), ie = Ut(x), Te = ("pinType" in t ? t.pinType : Ot(x, "pinType") || ie && "fixed") === "fixed", Me = [t.onEnter, t.onLeave, t.onEnterBack, t.onLeaveBack], Y = ce && t.toggleActions.split(" "), Q = "markers" in t ? t.markers : Xr.markers, j = ie ? 0 : parseFloat(Qe(x)["border" + g.p2 + cr]) || 0, l = this, oe = t.onRefreshInit && function() {
      return t.onRefreshInit(l);
    }, It = Ri(x, ie, g), St = Oi(x, ie), Ke = 0, ht = 0, ve = 0, ee = Lt(x, g), Pe, ye, Ct, De, Ae, L, V, Be, He, c, Xe, gt, kt, G, _t, Et, zt, ue, Tt, K, et, Ze, mt, ur, te, Rr, vt, Zt, Jt, Mt, Nt, R, Yt, tt, rt, nt, Bt, Qt, yt;
    if (l._startClamp = l._endClamp = !1, l._dir = g, F *= 45, l.scroller = x, l.scroll = b ? b.time.bind(b) : ee, De = ee(), l.vars = t, r = r || t.animation, "refreshPriority" in t && (ai = 1, t.refreshPriority === -9999 && (Pr = l)), pt.tweenScroll = pt.tweenScroll || {
      top: Vn(x, le),
      left: Vn(x, Ne)
    }, l.tweenTo = Pe = pt.tweenScroll[g.p], l.scrubDuration = function(d) {
      Yt = yr(d) && d, Yt ? R ? R.duration(d) : R = p.to(r, {
        ease: "expo",
        totalProgress: "+=0",
        inherit: !1,
        duration: Yt,
        paused: !0,
        onComplete: function() {
          return ne && ne(l);
        }
      }) : (R && R.progress(1).kill(), R = 0);
    }, r && (r.vars.lazy = !1, r._initted && !l.isReverted || r.vars.immediateRender !== !1 && t.immediateRender !== !1 && r.duration() && r.render(0, !0, !0), l.animation = r.pause(), r.scrollTrigger = l, l.scrubDuration(w), Mt = 0, f || (f = r.vars.id)), E && ((!Xt(E) || E.push) && (E = {
      snapTo: E
    }), "scrollBehavior" in z.style && p.set(ie ? [z, Ge] : x, {
      scrollBehavior: "auto"
    }), D.forEach(function(d) {
      return ke(d) && d.target === (ie ? N.scrollingElement || Ge : x) && (d.smooth = !1);
    }), Ct = ke(E.snapTo) ? E.snapTo : E.snapTo === "labels" ? Ii(r) : E.snapTo === "labelsDirectional" ? zi(r) : E.directional !== !1 ? function(d, S) {
      return An(E.snapTo)(d, Ce() - ht < 500 ? 0 : S.direction);
    } : p.utils.snap(E.snapTo), tt = E.duration || {
      min: 0.1,
      max: 2
    }, tt = Xt(tt) ? Sr(tt.min, tt.max) : Sr(tt, tt), rt = p.delayedCall(E.delay || Yt / 2 || 0.1, function() {
      var d = ee(), S = Ce() - ht < 500, _ = Pe.tween;
      if ((S || Math.abs(l.getVelocity()) < 10) && !_ && !sn && Ke !== d) {
        var C = (d - L) / G, fe = r && !ce ? r.totalProgress() : C, O = S ? 0 : (fe - Nt) / (Ce() - _r) * 1e3 || 0, Z = p.utils.clamp(-C, 1 - C, er(O / 2) * O / 0.185), we = C + (E.inertia === !1 ? 0 : Z), U, X, B = E, it = B.onStart, W = B.onInterrupt, qe = B.onComplete;
        if (U = Ct(we, l), yr(U) || (U = we), X = Math.max(0, Math.round(L + U * G)), d <= V && d >= L && X !== d) {
          if (_ && !_._initted && _.data <= er(X - d))
            return;
          E.inertia === !1 && (Z = U - C), Pe(X, {
            duration: tt(er(Math.max(er(we - fe), er(U - fe)) * 0.185 / O / 0.05 || 0)),
            ease: E.ease || "power3",
            data: er(X - d),
            // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
            onInterrupt: function() {
              return rt.restart(!0) && W && jt(l, W);
            },
            onComplete: function() {
              l.update(), Ke = ee(), r && !ce && (R ? R.resetTo("totalProgress", U, r._tTime / r._tDur) : r.progress(U)), Mt = Nt = r && !ce ? r.totalProgress() : l.progress, q && q(l), qe && jt(l, qe);
            }
          }, d, Z * G, X - d - Z * G), it && jt(l, it, Pe.tween);
        }
      } else l.isActive && Ke !== d && rt.restart(!0);
    }).pause()), f && (bn[f] = l), h = l.trigger = Fe(h || u !== !0 && u), yt = h && h._gsap && h._gsap.stRevert, yt && (yt = yt(l)), u = u === !0 ? h : Fe(u), $e(s) && (s = {
      targets: h,
      className: s
    }), u && (v === !1 || v === Je || (v = !v && u.parentNode && u.parentNode.style && Qe(u.parentNode).display === "flex" ? !1 : re), l.pin = u, ye = p.core.getCache(u), ye.spacer ? _t = ye.pinState : (H && (H = Fe(H), H && !H.nodeType && (H = H.current || H.nativeElement), ye.spacerIsNative = !!H, H && (ye.spacerState = Wr(H))), ye.spacer = ue = H || N.createElement("div"), ue.classList.add("pin-spacer"), f && ue.classList.add("pin-spacer-" + f), ye.pinState = _t = Wr(u)), t.force3D !== !1 && p.set(u, {
      force3D: !0
    }), l.spacer = ue = ye.spacer, Jt = Qe(u), ur = Jt[v + g.os2], K = p.getProperty(u), et = p.quickSetter(u, g.a, ae), dn(u, ue, Jt), zt = Wr(u)), Q) {
      gt = Xt(Q) ? Hn(Q, Xn) : Xn, c = qr("scroller-start", f, x, g, gt, 0), Xe = qr("scroller-end", f, x, g, gt, 0, c), Tt = c["offset" + g.op.d2];
      var fr = Fe(Ot(x, "content") || x);
      Be = this.markerStart = qr("start", f, fr, g, gt, Tt, 0, b), He = this.markerEnd = qr("end", f, fr, g, gt, Tt, 0, b), b && (Qt = p.quickSetter([Be, He], g.a, ae)), !Te && !(dt.length && Ot(x, "fixedMarkers") === !0) && (Li(ie ? z : x), p.set([c, Xe], {
        force3D: !0
      }), Rr = p.quickSetter(c, g.a, ae), Zt = p.quickSetter(Xe, g.a, ae));
    }
    if (b) {
      var k = b.vars.onUpdate, y = b.vars.onUpdateParams;
      b.eventCallback("onUpdate", function() {
        l.update(0, 0, 1), k && k.apply(b, y || []);
      });
    }
    if (l.previous = function() {
      return M[M.indexOf(l) - 1];
    }, l.next = function() {
      return M[M.indexOf(l) + 1];
    }, l.revert = function(d, S) {
      if (!S)
        return l.kill(!0);
      var _ = d !== !1 || !l.enabled, C = Se;
      _ !== l.isReverted && (_ && (nt = Math.max(ee(), l.scroll.rec || 0), ve = l.progress, Bt = r && r.progress()), Be && [Be, He, c, Xe].forEach(function(fe) {
        return fe.style.display = _ ? "none" : "block";
      }), _ && (Se = l, l.update(_)), u && (!Ve || !l.isActive) && (_ ? Bi(u, ue, _t) : dn(u, ue, Qe(u), te)), _ || l.update(_), Se = C, l.isReverted = _);
    }, l.refresh = function(d, S, _, C) {
      if (!((Se || !l.enabled) && !S)) {
        if (u && d && je) {
          pe(i, "scrollEnd", vi);
          return;
        }
        !ze && oe && oe(l), Se = l, Pe.tween && !_ && (Pe.tween.kill(), Pe.tween = 0), R && R.pause(), $ && r && (r.revert({
          kill: !1
        }).invalidate(), r.getChildren ? r.getChildren(!0, !0, !1).forEach(function(Pt) {
          return Pt.vars.immediateRender && Pt.render(0, !0, !0);
        }) : r.vars.immediateRender && r.render(0, !0, !0)), l.isReverted || l.revert(!0, !0), l._subPinOffset = !1;
        var fe = It(), O = St(), Z = b ? b.duration() : ft(x, g), we = G <= 0.01 || !G, U = 0, X = C || 0, B = Xt(_) ? _.end : t.end, it = t.endTrigger || h, W = Xt(_) ? _.start : t.start || (t.start === 0 || !h ? 0 : u ? "0 0" : "0 100%"), qe = l.pinnedContainer = t.pinnedContainer && Fe(t.pinnedContainer, l), st = h && Math.max(0, M.indexOf(l)) || 0, ge = st, _e, xe, Ft, Or, be, se, at, an, On, dr, lt, pr, Lr;
        for (Q && Xt(_) && (pr = p.getProperty(c, g.p), Lr = p.getProperty(Xe, g.p)); ge-- > 0; )
          se = M[ge], se.end || se.refresh(0, 1) || (Se = l), at = se.pin, at && (at === h || at === u || at === qe) && !se.isReverted && (dr || (dr = []), dr.unshift(se), se.revert(!0, !0)), se !== M[ge] && (st--, ge--);
        for (ke(W) && (W = W(l)), W = Nn(W, "start", l), L = Gn(W, h, fe, g, ee(), Be, c, l, O, j, Te, Z, b, l._startClamp && "_startClamp") || (u ? -1e-3 : 0), ke(B) && (B = B(l)), $e(B) && !B.indexOf("+=") && (~B.indexOf(" ") ? B = ($e(W) ? W.split(" ")[0] : "") + B : (U = Kr(B.substr(2), fe), B = $e(W) ? W : (b ? p.utils.mapRange(0, b.duration(), b.scrollTrigger.start, b.scrollTrigger.end, L) : L) + U, it = h)), B = Nn(B, "end", l), V = Math.max(L, Gn(B || (it ? "100% 0" : Z), it, fe, g, ee() + U, He, Xe, l, O, j, Te, Z, b, l._endClamp && "_endClamp")) || -1e-3, U = 0, ge = st; ge--; )
          se = M[ge] || {}, at = se.pin, at && se.start - se._pinPush <= L && !b && se.end > 0 && (_e = se.end - (l._startClamp ? Math.max(0, se.start) : se.start), (at === h && se.start - se._pinPush < L || at === qe) && isNaN(W) && (U += _e * (1 - se.progress)), at === u && (X += _e));
        if (L += U, V += U, l._startClamp && (l._startClamp += U), l._endClamp && !ze && (l._endClamp = V || -1e-3, V = Math.min(V, ft(x, g))), G = V - L || (L -= 0.01) && 1e-3, we && (ve = p.utils.clamp(0, 1, p.utils.normalize(L, V, nt))), l._pinPush = X, Be && U && (_e = {}, _e[g.a] = "+=" + U, qe && (_e[g.p] = "-=" + ee()), p.set([Be, He], _e)), u && !(xn && l.end >= ft(x, g)))
          _e = Qe(u), Or = g === le, Ft = ee(), Ze = parseFloat(K(g.a)) + X, !Z && V > 1 && (lt = (ie ? N.scrollingElement || Ge : x).style, lt = {
            style: lt,
            value: lt["overflow" + g.a.toUpperCase()]
          }, ie && Qe(z)["overflow" + g.a.toUpperCase()] !== "scroll" && (lt.style["overflow" + g.a.toUpperCase()] = "scroll")), dn(u, ue, _e), zt = Wr(u), xe = wt(u, !0), an = Te && Lt(x, Or ? Ne : le)(), v ? (te = [v + g.os2, G + X + ae], te.t = ue, ge = v === re ? nn(u, g) + G + X : 0, ge && (te.push(g.d, ge + ae), ue.style.flexBasis !== "auto" && (ue.style.flexBasis = ge + ae)), lr(te), qe && M.forEach(function(Pt) {
            Pt.pin === qe && Pt.vars.pinSpacing !== !1 && (Pt._subPinOffset = !0);
          }), Te && ee(nt)) : (ge = nn(u, g), ge && ue.style.flexBasis !== "auto" && (ue.style.flexBasis = ge + ae)), Te && (be = {
            top: xe.top + (Or ? Ft - L : an) + ae,
            left: xe.left + (Or ? an : Ft - L) + ae,
            boxSizing: "border-box",
            position: "fixed"
          }, be[Wt] = be["max" + cr] = Math.ceil(xe.width) + ae, be[$t] = be["max" + Dn] = Math.ceil(xe.height) + ae, be[Je] = be[Je + Tr] = be[Je + kr] = be[Je + Mr] = be[Je + Er] = "0", be[re] = _e[re], be[re + Tr] = _e[re + Tr], be[re + kr] = _e[re + kr], be[re + Mr] = _e[re + Mr], be[re + Er] = _e[re + Er], Et = Hi(_t, be, Ve), ze && ee(0)), r ? (On = r._initted, ln(1), r.render(r.duration(), !0, !0), mt = K(g.a) - Ze + G + X, vt = Math.abs(G - mt) > 1, Te && vt && Et.splice(Et.length - 2, 2), r.render(0, !0, !0), On || r.invalidate(!0), r.parent || r.totalTime(r.totalTime()), ln(0)) : mt = G, lt && (lt.value ? lt.style["overflow" + g.a.toUpperCase()] = lt.value : lt.style.removeProperty("overflow-" + g.a));
        else if (h && ee() && !b)
          for (xe = h.parentNode; xe && xe !== z; )
            xe._pinOffset && (L -= xe._pinOffset, V -= xe._pinOffset), xe = xe.parentNode;
        dr && dr.forEach(function(Pt) {
          return Pt.revert(!1, !0);
        }), l.start = L, l.end = V, De = Ae = ze ? nt : ee(), !b && !ze && (De < nt && ee(nt), l.scroll.rec = 0), l.revert(!1, !0), ht = Ce(), rt && (Ke = -1, rt.restart(!0)), Se = 0, r && ce && (r._initted || Bt) && r.progress() !== Bt && r.progress(Bt || 0, !0).render(r.time(), !0, !0), (we || ve !== l.progress || b || $ || r && !r._initted) && (r && !ce && (r._initted || ve || r.vars.immediateRender !== !1) && r.totalProgress(b && L < -1e-3 && !ve ? p.utils.normalize(L, V, 0) : ve, !0), l.progress = we || (De - L) / G === ve ? 0 : ve), u && v && (ue._pinOffset = Math.round(l.progress * mt)), R && R.invalidate(), isNaN(pr) || (pr -= p.getProperty(c, g.p), Lr -= p.getProperty(Xe, g.p), $r(c, g, pr), $r(Be, g, pr - (C || 0)), $r(Xe, g, Lr), $r(He, g, Lr - (C || 0))), we && !ze && l.update(), T && !ze && !kt && (kt = !0, T(l), kt = !1);
      }
    }, l.getVelocity = function() {
      return (ee() - Ae) / (Ce() - _r) * 1e3 || 0;
    }, l.endAnimation = function() {
      gr(l.callbackAnimation), r && (R ? R.progress(1) : r.paused() ? ce || gr(r, l.direction < 0, 1) : gr(r, r.reversed()));
    }, l.labelToScroll = function(d) {
      return r && r.labels && (L || l.refresh() || L) + r.labels[d] / r.duration() * G || 0;
    }, l.getTrailing = function(d) {
      var S = M.indexOf(l), _ = l.direction > 0 ? M.slice(0, S).reverse() : M.slice(S + 1);
      return ($e(d) ? _.filter(function(C) {
        return C.vars.preventOverlaps === d;
      }) : _).filter(function(C) {
        return l.direction > 0 ? C.end <= L : C.start >= V;
      });
    }, l.update = function(d, S, _) {
      if (!(b && !_ && !d)) {
        var C = ze === !0 ? nt : l.scroll(), fe = d ? 0 : (C - L) / G, O = fe < 0 ? 0 : fe > 1 ? 1 : fe || 0, Z = l.progress, we, U, X, B, it, W, qe, st;
        if (S && (Ae = De, De = b ? ee() : C, E && (Nt = Mt, Mt = r && !ce ? r.totalProgress() : O)), F && u && !Se && !Yr && je && (!O && L < C + (C - Ae) / (Ce() - _r) * F ? O = 1e-4 : O === 1 && V > C + (C - Ae) / (Ce() - _r) * F && (O = 0.9999)), O !== Z && l.enabled) {
          if (we = l.isActive = !!O && O < 1, U = !!Z && Z < 1, W = we !== U, it = W || !!O != !!Z, l.direction = O > Z ? 1 : -1, l.progress = O, it && !Se && (X = O && !Z ? 0 : O === 1 ? 1 : Z === 1 ? 2 : 3, ce && (B = !W && Y[X + 1] !== "none" && Y[X + 1] || Y[X], st = r && (B === "complete" || B === "reset" || B in r))), Ye && (W || st) && (st || w || !r) && (ke(Ye) ? Ye(l) : l.getTrailing(Ye).forEach(function(Ft) {
            return Ft.endAnimation();
          })), ce || (R && !Se && !Yr ? (R._dp._time - R._start !== R._time && R.render(R._dp._time - R._start), R.resetTo ? R.resetTo("totalProgress", O, r._tTime / r._tDur) : (R.vars.totalProgress = O, R.invalidate().restart())) : r && r.totalProgress(O, !!(Se && (ht || d)))), u) {
            if (d && v && (ue.style[v + g.os2] = ur), !Te)
              et(vr(Ze + mt * O));
            else if (it) {
              if (qe = !d && O > Z && V + 1 > C && C + 1 >= ft(x, g), Ve)
                if (!d && (we || qe)) {
                  var ge = wt(u, !0), _e = C - L;
                  Un(u, z, ge.top + (g === le ? _e : 0) + ae, ge.left + (g === le ? 0 : _e) + ae);
                } else
                  Un(u, ue);
              lr(we || qe ? Et : zt), vt && O < 1 && we || et(Ze + (O === 1 && !qe ? mt : 0));
            }
          }
          E && !Pe.tween && !Se && !Yr && rt.restart(!0), s && (W || he && O && (O < 1 || !cn)) && Dr(s.targets).forEach(function(Ft) {
            return Ft.classList[we || he ? "add" : "remove"](s.className);
          }), a && !ce && !d && a(l), it && !Se ? (ce && (st && (B === "complete" ? r.pause().totalProgress(1) : B === "reset" ? r.restart(!0).pause() : B === "restart" ? r.restart(!0) : r[B]()), a && a(l)), (W || !cn) && (m && W && jt(l, m), Me[X] && jt(l, Me[X]), he && (O === 1 ? l.kill(!1, 1) : Me[X] = 0), W || (X = O === 1 ? 1 : 3, Me[X] && jt(l, Me[X]))), Ee && !we && Math.abs(l.getVelocity()) > (yr(Ee) ? Ee : 2500) && (gr(l.callbackAnimation), R ? R.progress(1) : gr(r, B === "reverse" ? 1 : !O, 1))) : ce && a && !Se && a(l);
        }
        if (Zt) {
          var xe = b ? C / b.duration() * (b._caScrollDist || 0) : C;
          Rr(xe + (c._isFlipped ? 1 : 0)), Zt(xe);
        }
        Qt && Qt(-C / b.duration() * (b._caScrollDist || 0));
      }
    }, l.enable = function(d, S) {
      l.enabled || (l.enabled = !0, pe(x, "resize", wr), ie || pe(x, "scroll", tr), oe && pe(i, "refreshInit", oe), d !== !1 && (l.progress = ve = 0, De = Ae = Ke = ee()), S !== !1 && l.refresh());
    }, l.getTween = function(d) {
      return d && Pe ? Pe.tween : R;
    }, l.setPositions = function(d, S, _, C) {
      if (b) {
        var fe = b.scrollTrigger, O = b.duration(), Z = fe.end - fe.start;
        d = fe.start + Z * d / O, S = fe.start + Z * S / O;
      }
      l.refresh(!1, !1, {
        start: Yn(d, _ && !!l._startClamp),
        end: Yn(S, _ && !!l._endClamp)
      }, C), l.update();
    }, l.adjustPinSpacing = function(d) {
      if (te && d) {
        var S = te.indexOf(g.d) + 1;
        te[S] = parseFloat(te[S]) + d + ae, te[1] = parseFloat(te[1]) + d + ae, lr(te);
      }
    }, l.disable = function(d, S) {
      if (d !== !1 && l.revert(!0, !0), l.enabled && (l.enabled = l.isActive = !1, S || R && R.pause(), nt = 0, ye && (ye.uncache = 1), oe && de(i, "refreshInit", oe), rt && (rt.pause(), Pe.tween && Pe.tween.kill() && (Pe.tween = 0)), !ie)) {
        for (var _ = M.length; _--; )
          if (M[_].scroller === x && M[_] !== l)
            return;
        de(x, "resize", wr), ie || de(x, "scroll", tr);
      }
    }, l.kill = function(d, S) {
      l.disable(d, S), R && !S && R.kill(), f && delete bn[f];
      var _ = M.indexOf(l);
      _ >= 0 && M.splice(_, 1), _ === Ie && Jr > 0 && Ie--, _ = 0, M.forEach(function(C) {
        return C.scroller === l.scroller && (_ = 1);
      }), _ || ze || (l.scroll.rec = 0), r && (r.scrollTrigger = null, d && r.revert({
        kill: !1
      }), S || r.kill()), Be && [Be, He, c, Xe].forEach(function(C) {
        return C.parentNode && C.parentNode.removeChild(C);
      }), Pr === l && (Pr = 0), u && (ye && (ye.uncache = 1), _ = 0, M.forEach(function(C) {
        return C.pin === u && _++;
      }), _ || (ye.spacer = 0)), t.onKill && t.onKill(l);
    }, M.push(l), l.enable(!1, !1), yt && yt(l), r && r.add && !G) {
      var I = l.update;
      l.update = function() {
        l.update = I, D.cache++, L || V || l.refresh();
      }, p.delayedCall(0.01, l.update), G = 0.01, L = V = 0;
    } else
      l.refresh();
    u && Yi();
  }, i.register = function(t) {
    return rr || (p = t || di(), fi() && window.document && i.enable(), rr = mr), rr;
  }, i.defaults = function(t) {
    if (t)
      for (var r in t)
        Xr[r] = t[r];
    return Xr;
  }, i.disable = function(t, r) {
    mr = 0, M.forEach(function(a) {
      return a[r ? "kill" : "disable"](t);
    }), de(P, "wheel", tr), de(N, "scroll", tr), clearInterval(Nr), de(N, "touchcancel", ut), de(z, "touchstart", ut), Fr(de, N, "pointerdown,touchstart,mousedown", Bn), Fr(de, N, "pointerup,touchend,mouseup", Fn), rn.kill(), Br(de);
    for (var o = 0; o < D.length; o += 3)
      Hr(de, D[o], D[o + 1]), Hr(de, D[o], D[o + 2]);
  }, i.enable = function() {
    if (P = window, N = document, Ge = N.documentElement, z = N.body, p) {
      if (Dr = p.utils.toArray, Sr = p.utils.clamp, wn = p.core.context || ut, ln = p.core.suppressOverwrites || ut, En = P.history.scrollRestoration || "auto", Sn = P.pageYOffset || 0, p.core.globals("ScrollTrigger", i), z) {
        mr = 1, ar = document.createElement("div"), ar.style.height = "100vh", ar.style.position = "absolute", bi(), Ai(), J.register(p), i.isTouch = J.isTouch, Dt = J.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), yn = J.isTouch === 1, pe(P, "wheel", tr), kn = [P, N, Ge, z], p.matchMedia ? (i.matchMedia = function(T) {
          var w = p.matchMedia(), h;
          for (h in T)
            w.add(h, T[h]);
          return w;
        }, p.addEventListener("matchMediaInit", function() {
          wi(), Rn();
        }), p.addEventListener("matchMediaRevert", function() {
          return yi();
        }), p.addEventListener("matchMedia", function() {
          qt(0, 1), Kt("matchMedia");
        }), p.matchMedia().add("(orientation: portrait)", function() {
          return fn(), fn;
        })) : console.warn("Requires GSAP 3.11.0 or later"), fn(), pe(N, "scroll", tr);
        var t = z.hasAttribute("style"), r = z.style, o = r.borderTopStyle, a = p.core.Animation.prototype, s, f;
        for (a.revert || Object.defineProperty(a, "revert", {
          value: function() {
            return this.time(-0.01, !0);
          }
        }), r.borderTopStyle = "solid", s = wt(z), le.m = Math.round(s.top + le.sc()) || 0, Ne.m = Math.round(s.left + Ne.sc()) || 0, o ? r.borderTopStyle = o : r.removeProperty("border-top-style"), t || (z.setAttribute("style", ""), z.removeAttribute("style")), Nr = setInterval(qn, 250), p.delayedCall(0.5, function() {
          return Yr = 0;
        }), pe(N, "touchcancel", ut), pe(z, "touchstart", ut), Fr(pe, N, "pointerdown,touchstart,mousedown", Bn), Fr(pe, N, "pointerup,touchend,mouseup", Fn), vn = p.utils.checkPrefix("transform"), Qr.push(vn), rr = Ce(), rn = p.delayedCall(0.2, qt).pause(), nr = [N, "visibilitychange", function() {
          var T = P.innerWidth, w = P.innerHeight;
          N.hidden ? (In = T, zn = w) : (In !== T || zn !== w) && wr();
        }, N, "DOMContentLoaded", qt, P, "load", qt, P, "resize", wr], Br(pe), M.forEach(function(T) {
          return T.enable(0, 1);
        }), f = 0; f < D.length; f += 3)
          Hr(de, D[f], D[f + 1]), Hr(de, D[f], D[f + 2]);
      } else if (N) {
        var m = function T() {
          i.enable(), N.removeEventListener("DOMContentLoaded", T);
        };
        N.addEventListener("DOMContentLoaded", m);
      }
    }
  }, i.config = function(t) {
    "limitCallbacks" in t && (cn = !!t.limitCallbacks);
    var r = t.syncInterval;
    r && clearInterval(Nr) || (Nr = r) && setInterval(qn, r), "ignoreMobileResize" in t && (yn = i.isTouch === 1 && t.ignoreMobileResize), "autoRefreshEvents" in t && (Br(de) || Br(pe, t.autoRefreshEvents || "none"), li = (t.autoRefreshEvents + "").indexOf("resize") === -1);
  }, i.scrollerProxy = function(t, r) {
    var o = Fe(t), a = D.indexOf(o), s = Ut(o);
    ~a && D.splice(a, s ? 6 : 2), r && (s ? dt.unshift(P, r, z, r, Ge, r) : dt.unshift(o, r));
  }, i.clearMatchMedia = function(t) {
    M.forEach(function(r) {
      return r._ctx && r._ctx.query === t && r._ctx.kill(!0, !0);
    });
  }, i.isInViewport = function(t, r, o) {
    var a = ($e(t) ? Fe(t) : t).getBoundingClientRect(), s = a[o ? Wt : $t] * r || 0;
    return o ? a.right - s > 0 && a.left + s < P.innerWidth : a.bottom - s > 0 && a.top + s < P.innerHeight;
  }, i.positionInViewport = function(t, r, o) {
    $e(t) && (t = Fe(t));
    var a = t.getBoundingClientRect(), s = a[o ? Wt : $t], f = r == null ? s / 2 : r in on ? on[r] * s : ~r.indexOf("%") ? parseFloat(r) * s / 100 : parseFloat(r) || 0;
    return o ? (a.left + f) / P.innerWidth : (a.top + f) / P.innerHeight;
  }, i.killAll = function(t) {
    if (M.slice(0).forEach(function(o) {
      return o.vars.id !== "ScrollSmoother" && o.kill();
    }), t !== !0) {
      var r = Vt.killAll || [];
      Vt = {}, r.forEach(function(o) {
        return o();
      });
    }
  }, i;
})();
A.version = "3.15.0";
A.saveStyles = function(i) {
  return i ? Dr(i).forEach(function(e) {
    if (e && e.style) {
      var n = We.indexOf(e);
      n >= 0 && We.splice(n, 5), We.push(e, e.style.cssText, e.getBBox && e.getAttribute("transform"), p.core.getCache(e), wn());
    }
  }) : We;
};
A.revert = function(i, e) {
  return Rn(!i, e);
};
A.create = function(i, e) {
  return new A(i, e);
};
A.refresh = function(i) {
  return i ? wr(!0) : (rr || A.register()) && qt(!0);
};
A.update = function(i) {
  return ++D.cache && bt(i === !0 ? 2 : 0);
};
A.clearScrollMemory = xi;
A.maxScroll = function(i, e) {
  return ft(i, e ? Ne : le);
};
A.getScrollFunc = function(i, e) {
  return Lt(Fe(i), e ? Ne : le);
};
A.getById = function(i) {
  return bn[i];
};
A.getAll = function() {
  return M.filter(function(i) {
    return i.vars.id !== "ScrollSmoother";
  });
};
A.isScrolling = function() {
  return !!je;
};
A.snapDirectional = An;
A.addEventListener = function(i, e) {
  var n = Vt[i] || (Vt[i] = []);
  ~n.indexOf(e) || n.push(e);
};
A.removeEventListener = function(i, e) {
  var n = Vt[i], t = n && n.indexOf(e);
  t >= 0 && n.splice(t, 1);
};
A.batch = function(i, e) {
  var n = [], t = {}, r = e.interval || 0.016, o = e.batchMax || 1e9, a = function(m, T) {
    var w = [], h = [], u = p.delayedCall(r, function() {
      T(w, h), w = [], h = [];
    }).pause();
    return function(v) {
      w.length || u.restart(!0), w.push(v.trigger), h.push(v), o <= w.length && u.progress(1);
    };
  }, s;
  for (s in e)
    t[s] = s.substr(0, 2) === "on" && ke(e[s]) && s !== "onRefreshInit" ? a(s, e[s]) : e[s];
  return ke(o) && (o = o(), pe(A, "refresh", function() {
    return o = e.batchMax();
  })), Dr(i).forEach(function(f) {
    var m = {};
    for (s in t)
      m[s] = t[s];
    m.trigger = f, n.push(A.create(m));
  }), n;
};
var Kn = function(e, n, t, r) {
  return n > r ? e(r) : n < 0 && e(0), t > r ? (r - n) / (t - n) : t < 0 ? n / (n - t) : 1;
}, pn = function i(e, n) {
  n === !0 ? e.style.removeProperty("touch-action") : e.style.touchAction = n === !0 ? "auto" : n ? "pan-" + n + (J.isTouch ? " pinch-zoom" : "") : "none", e === Ge && i(z, n);
}, Gr = {
  auto: 1,
  scroll: 1
}, qi = function(e) {
  var n = e.event, t = e.target, r = e.axis, o = (n.changedTouches ? n.changedTouches[0] : n).target, a = o._gsap || p.core.getCache(o), s = Ce(), f;
  if (!a._isScrollT || s - a._isScrollT > 2e3) {
    for (; o && o !== z && (o.scrollHeight <= o.clientHeight && o.scrollWidth <= o.clientWidth || !(Gr[(f = Qe(o)).overflowY] || Gr[f.overflowX])); )
      o = o.parentNode;
    a._isScroll = o && o !== t && !Ut(o) && (Gr[(f = Qe(o)).overflowY] || Gr[f.overflowX]), a._isScrollT = s;
  }
  (a._isScroll || r === "x") && (n.stopPropagation(), n._gsapAllow = !0);
}, Ci = function(e, n, t, r) {
  return J.create({
    target: e,
    capture: !0,
    debounce: !1,
    lockAxis: !0,
    type: n,
    onWheel: r = r && qi,
    onPress: r,
    onDrag: r,
    onScroll: r,
    onEnable: function() {
      return t && pe(N, J.eventTypes[0], Jn, !1, !0);
    },
    onDisable: function() {
      return de(N, J.eventTypes[0], Jn, !0);
    }
  });
}, Wi = /(input|label|select|textarea)/i, Zn, Jn = function(e) {
  var n = Wi.test(e.target.tagName);
  (n || Zn) && (e._gsapAllow = !0, Zn = n);
}, $i = function(e) {
  Xt(e) || (e = {}), e.preventDefault = e.isNormalizer = e.allowClicks = !0, e.type || (e.type = "wheel,touch"), e.debounce = !!e.debounce, e.id = e.id || "normalizer";
  var n = e, t = n.normalizeScrollX, r = n.momentum, o = n.allowNestedScroll, a = n.onRelease, s, f, m = Fe(e.target) || Ge, T = p.core.globals().ScrollSmoother, w = T && T.get(), h = Dt && (e.content && Fe(e.content) || w && e.content !== !1 && !w.smooth() && w.content()), u = Lt(m, le), v = Lt(m, Ne), $ = 1, F = (J.isTouch && P.visualViewport ? P.visualViewport.scale * P.visualViewport.width : P.outerWidth) / P.innerWidth, ne = 0, q = ke(r) ? function() {
    return r(s);
  } : function() {
    return r || 2.8;
  }, he, E, Ve = Ci(m, e.type, !0, o), H = function() {
    return E = !1;
  }, b = ut, Ee = ut, Ye = function() {
    f = ft(m, le), Ee = Sr(Dt ? 1 : 0, f), t && (b = Sr(0, ft(m, Ne))), he = Gt;
  }, g = function() {
    h._gsap.y = vr(parseFloat(h._gsap.y) + u.offset) + "px", h.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(h._gsap.y) + ", 0, 1)", u.offset = u.cacheID = 0;
  }, ce = function() {
    if (E) {
      requestAnimationFrame(H);
      var Q = vr(s.deltaY / 2), j = Ee(u.v - Q);
      if (h && j !== u.v + u.offset) {
        u.offset = j - u.v;
        var l = vr((parseFloat(h && h._gsap.y) || 0) - u.offset);
        h.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + l + ", 0, 1)", h._gsap.y = l + "px", u.cacheID = D.cache, bt();
      }
      return !0;
    }
    u.offset && g(), E = !0;
  }, x, pt, ie, Te, Me = function() {
    Ye(), x.isActive() && x.vars.scrollY > f && (u() > f ? x.progress(1) && u(f) : x.resetTo("scrollY", f));
  };
  return h && p.set(h, {
    y: "+=0"
  }), e.ignoreCheck = function(Y) {
    return Dt && Y.type === "touchmove" && ce() || $ > 1.05 && Y.type !== "touchstart" || s.isGesturing || Y.touches && Y.touches.length > 1;
  }, e.onPress = function() {
    E = !1;
    var Y = $;
    $ = vr((P.visualViewport && P.visualViewport.scale || 1) / F), x.pause(), Y !== $ && pn(m, $ > 1.01 ? !0 : t ? !1 : "x"), pt = v(), ie = u(), Ye(), he = Gt;
  }, e.onRelease = e.onGestureStart = function(Y, Q) {
    if (u.offset && g(), !Q)
      Te.restart(!0);
    else {
      D.cache++;
      var j = q(), l, oe;
      t && (l = v(), oe = l + j * 0.05 * -Y.velocityX / 0.227, j *= Kn(v, l, oe, ft(m, Ne)), x.vars.scrollX = b(oe)), l = u(), oe = l + j * 0.05 * -Y.velocityY / 0.227, j *= Kn(u, l, oe, ft(m, le)), x.vars.scrollY = Ee(oe), x.invalidate().duration(j).play(0.01), (Dt && x.vars.scrollY >= f || l >= f - 1) && p.to({}, {
        onUpdate: Me,
        duration: j
      });
    }
    a && a(Y);
  }, e.onWheel = function() {
    x._ts && x.pause(), Ce() - ne > 1e3 && (he = 0, ne = Ce());
  }, e.onChange = function(Y, Q, j, l, oe) {
    if (Gt !== he && Ye(), Q && t && v(b(l[2] === Q ? pt + (Y.startX - Y.x) : v() + Q - l[1])), j) {
      u.offset && g();
      var It = oe[2] === j, St = It ? ie + Y.startY - Y.y : u() + j - oe[1], Ke = Ee(St);
      It && St !== Ke && (ie += Ke - St), u(Ke);
    }
    (j || Q) && bt();
  }, e.onEnable = function() {
    pn(m, t ? !1 : "x"), A.addEventListener("refresh", Me), pe(P, "resize", Me), u.smooth && (u.target.style.scrollBehavior = "auto", u.smooth = v.smooth = !1), Ve.enable();
  }, e.onDisable = function() {
    pn(m, !0), de(P, "resize", Me), A.removeEventListener("refresh", Me), Ve.kill();
  }, e.lockAxis = e.lockAxis !== !1, s = new J(e), s.iOS = Dt, Dt && !u() && u(1), Dt && p.ticker.add(ut), Te = s._dc, x = p.to(s, {
    ease: "power4",
    paused: !0,
    inherit: !1,
    scrollX: t ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: Si(u, u(), function() {
        return x.pause();
      })
    },
    onUpdate: bt,
    onComplete: Te.vars.onComplete
  }), s;
};
A.sort = function(i) {
  if (ke(i))
    return M.sort(i);
  var e = P.pageYOffset || 0;
  return A.getAll().forEach(function(n) {
    return n._sortY = n.trigger ? e + n.trigger.getBoundingClientRect().top : n.start + P.innerHeight;
  }), M.sort(i || function(n, t) {
    return (n.vars.refreshPriority || 0) * -1e6 + (n.vars.containerAnimation ? 1e6 : n._sortY) - ((t.vars.containerAnimation ? 1e6 : t._sortY) + (t.vars.refreshPriority || 0) * -1e6);
  });
};
A.observe = function(i) {
  return new J(i);
};
A.normalizeScroll = function(i) {
  if (typeof i > "u")
    return Le;
  if (i === !0 && Le)
    return Le.enable();
  if (i === !1) {
    Le && Le.kill(), Le = i;
    return;
  }
  var e = i instanceof J ? i : $i(i);
  return Le && Le.target === e.target && Le.kill(), Ut(e.target) && (Le = e), e;
};
A.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp: mn,
  _inputObserver: Ci,
  _scrollers: D,
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
di() && p.registerPlugin(A);
en.registerPlugin(A);
const Gi = ".system-carousel, [data-carousel-prev], [data-carousel-next], [data-carousel-dot], [data-carousel-viewport], a, button, input, label, select, textarea, summary";
let Ur = null;
function Ui() {
  const i = document.querySelector("[data-mobile-nav-toggle]"), e = document.querySelector("[data-mobile-nav-menu]");
  if (!i || !e || i.dataset.mobileNavInitialized === "true") return;
  i.dataset.mobileNavInitialized = "true";
  const n = i.querySelector("[data-mobile-nav-open-icon]"), t = i.querySelector("[data-mobile-nav-close-icon]"), r = Array.from(e.querySelectorAll("[data-mobile-nav-link]")), o = window.matchMedia("(min-width: 768px)");
  let a = !1;
  const s = () => {
    e.classList.toggle("hidden", !a), i.setAttribute("aria-expanded", String(a)), i.setAttribute("aria-label", a ? "Zamknij menu główne" : "Otwórz menu główne"), n == null || n.classList.toggle("hidden", a), t == null || t.classList.toggle("hidden", !a);
  }, f = (w = !1) => {
    if (!a) {
      s();
      return;
    }
    a = !1, s(), w && i.focus();
  }, m = () => {
    a = !a, s();
  };
  i.addEventListener("click", () => {
    m();
  }), r.forEach((w) => {
    w.addEventListener("click", () => {
      f();
    });
  }), document.addEventListener("click", (w) => {
    if (!a || o.matches) return;
    const h = w.target;
    !h || e.contains(h) || i.contains(h) || f();
  }), document.addEventListener("keydown", (w) => {
    w.key !== "Escape" || !a || (w.preventDefault(), f(!0));
  });
  const T = () => {
    a = !1, s();
  };
  o.addEventListener("change", T), window.addEventListener("resize", T), s();
}
function Vi() {
  const i = document.querySelector(".hero h1"), e = document.querySelector(".hero__lead");
  i && en.fromTo(
    [i, e].filter(Boolean),
    { opacity: 0, y: 18 },
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out" }
  );
}
function hn(i) {
  const e = document.querySelectorAll(i);
  e.length && (en.set(e, { opacity: 0, y: 24 }), e.forEach((n, t) => {
    A.create({
      trigger: n,
      start: "top 88%",
      once: !0,
      onEnter: () => en.to(n, { opacity: 1, y: 0, duration: 0.5, delay: t % 4 * 0.06, ease: "power2.out" })
    });
  }));
}
class Ki {
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
    (n = this.prevButton) == null || n.addEventListener("click", (a) => {
      a.stopPropagation(), this.show(this.activeIndex - 1);
    }), (t = this.nextButton) == null || t.addEventListener("click", (a) => {
      a.stopPropagation(), this.show(this.activeIndex + 1);
    }), this.dots.forEach((a, s) => {
      a.addEventListener("click", (f) => {
        f.stopPropagation(), this.show(s);
      });
    }), (r = this.viewport) == null || r.addEventListener("click", (a) => {
      a.stopPropagation();
    }), (o = this.viewport) == null || o.addEventListener("keydown", (a) => {
      a.key === "ArrowLeft" && (a.preventDefault(), this.show(this.activeIndex - 1)), a.key === "ArrowRight" && (a.preventDefault(), this.show(this.activeIndex + 1)), a.key === "Home" && (a.preventDefault(), this.show(0)), a.key === "End" && (a.preventDefault(), this.show(this.slides.length - 1));
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
function Qn(i) {
  const e = new URL(window.location.href);
  e.hash = i ? `#${i}` : "", window.history.replaceState(window.history.state, "", e);
}
function Zi(i) {
  if (i.dataset.systemsSelectionInitialized === "true") return;
  i.dataset.systemsSelectionInitialized = "true";
  const e = Array.from(i.querySelectorAll(".system-pill[id]"));
  if (!e.length) return;
  const n = new Map(e.map((s) => [s.id, s]));
  let t = null;
  const r = (s) => {
    t = (s == null ? void 0 : s.id) ?? null, e.forEach((f) => {
      const m = f === s;
      f.classList.toggle("is-selected", m), m ? f.setAttribute("aria-current", "true") : f.removeAttribute("aria-current");
    });
  }, o = () => {
    const s = decodeURIComponent(window.location.hash.slice(1));
    r(s ? n.get(s) ?? null : null);
  }, a = () => {
    !t && !window.location.hash || (r(null), Qn(null));
  };
  i.addEventListener("click", (s) => {
    const f = s.target;
    if (!f) return;
    const m = f.closest(".system-pill[id]");
    if (m) {
      if (f.closest(Gi))
        return;
      t !== m.id && (r(m), Qn(m.id));
      return;
    }
    a();
  }), i.addEventListener("change", (s) => {
    const f = s.target;
    f != null && f.matches('input[name="systems-filter"]') && a();
  }), Ur && window.removeEventListener("hashchange", Ur), Ur = o, window.addEventListener("hashchange", Ur), o();
}
function Ji() {
  const i = document.querySelector("#systems-page");
  !i || i.dataset.systemsInitialized === "true" || (i.dataset.systemsInitialized = "true", i.querySelectorAll("[data-system-carousel]").forEach((e) => {
    new Ki(e);
  }), Zi(i));
}
function jn() {
  Ui(), Vi(), hn(".section-card"), hn(".system-button"), hn(".system-card"), Ji();
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", jn) : jn();
