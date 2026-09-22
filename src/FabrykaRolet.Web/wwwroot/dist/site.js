var Ei = Object.defineProperty;
var Ti = (i, e, n) => e in i ? Ei(i, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : i[e] = n;
var ct = (i, e, n) => Ti(i, typeof e != "symbol" ? e + "" : e, n);
import { g as tn } from "./index-9nJrthwM.js";
function Mi(i, e) {
  for (var n = 0; n < e.length; n++) {
    var t = e[n];
    t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(i, t.key, t);
  }
}
function Pi(i, e, n) {
  return e && Mi(i.prototype, e), i;
}
/*!
 * Observer 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var me, Kr, Ue, At, Rt, or, ti, Ht, sr, ri, xt, ot, ni, ii = function() {
  return me || typeof window < "u" && (me = window.gsap) && me.registerPlugin && me;
}, oi = 1, ir = [], D = [], dt = [], br = Date.now, _n = function(e, n) {
  return n;
}, Di = function() {
  var e = sr.core, n = e.bridge || {}, t = e._scrollers, r = e._proxies;
  t.push.apply(t, D), r.push.apply(r, dt), D = t, dt = r, _n = function(a, s) {
    return n[a](s);
  };
}, Lt = function(e, n) {
  return ~dt.indexOf(e) && dt[dt.indexOf(e) + 1][n];
}, Sr = function(e) {
  return !!~ri.indexOf(e);
}, Le = function(e, n, t, r, o) {
  return e.addEventListener(n, t, {
    passive: r !== !1,
    capture: !!o
  });
}, Re = function(e, n, t, r) {
  return e.removeEventListener(n, t, !!r);
}, Yr = "scrollLeft", zr = "scrollTop", mn = function() {
  return xt && xt.isPressed || D.cache++;
}, rn = function(e, n) {
  var t = function r(o) {
    if (o || o === 0) {
      oi && (Ue.history.scrollRestoration = "manual");
      var a = xt && xt.isPressed;
      o = r.v = Math.round(o) || (xt && xt.iOS ? 1 : 0), e(o), r.cacheID = D.cache, a && _n("ss", o);
    } else (n || D.cache !== r.cacheID || _n("ref")) && (r.cacheID = D.cache, r.v = e());
    return r.v + r.offset;
  };
  return t.offset = 0, e && t;
}, ze = {
  s: Yr,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: rn(function(i) {
    return arguments.length ? Ue.scrollTo(i, le.sc()) : Ue.pageXOffset || At[Yr] || Rt[Yr] || or[Yr] || 0;
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
  op: ze,
  sc: rn(function(i) {
    return arguments.length ? Ue.scrollTo(ze.sc(), i) : Ue.pageYOffset || At[zr] || Rt[zr] || or[zr] || 0;
  })
}, Ne = function(e, n) {
  return (n && n._ctx && n._ctx.selector || me.utils.toArray)(e)[0] || (typeof e == "string" && me.config().nullTargetWarn !== !1 ? console.warn("Element not found:", e) : null);
}, Ai = function(e, n) {
  for (var t = n.length; t--; )
    if (n[t] === e || n[t].contains(e))
      return !0;
  return !1;
}, Ot = function(e, n) {
  var t = n.s, r = n.sc;
  Sr(e) && (e = At.scrollingElement || Rt);
  var o = D.indexOf(e), a = r === le.sc ? 1 : 2;
  !~o && (o = D.push(e) - 1), D[o + a] || Le(e, "scroll", mn);
  var s = D[o + a], f = s || (D[o + a] = rn(Lt(e, t), !0) || (Sr(e) ? r : rn(function(v) {
    return arguments.length ? e[t] = v : e[t];
  })));
  return f.target = e, s || (f.smooth = me.getProperty(e, "scrollBehavior") === "smooth"), f;
}, vn = function(e, n, t) {
  var r = e, o = e, a = br(), s = a, f = n || 50, v = Math.max(500, f * 3), T = function(g, O) {
    var z = br();
    O || z - a > f ? (o = r, r = g, s = a, a = z) : t ? r += g : r = o + (g - o) / (z - s) * (a - s);
  }, C = function() {
    o = r = t ? 0 : r, s = a = 0;
  }, h = function(g) {
    var O = s, z = o, ne = br();
    return (g || g === 0) && g !== r && T(g), a === s || ne - s > v ? 0 : (r + (t ? z : -z)) / ((t ? ne : a) - O) * 1e3;
  };
  return {
    update: T,
    reset: C,
    getVelocity: h
  };
}, hr = function(e, n) {
  return n && !e._gsapAllow && e.cancelable !== !1 && e.preventDefault(), e.changedTouches ? e.changedTouches[0] : e;
}, In = function(e) {
  var n = Math.max.apply(Math, e), t = Math.min.apply(Math, e);
  return Math.abs(n) >= Math.abs(t) ? n : t;
}, si = function() {
  sr = me.core.globals().ScrollTrigger, sr && sr.core && Di();
}, ai = function(e) {
  return me = e || ii(), !Kr && me && typeof document < "u" && document.body && (Ue = window, At = document, Rt = At.documentElement, or = At.body, ri = [Ue, At, Rt, or], me.utils.clamp, ni = me.core.context || function() {
  }, Ht = "onpointerenter" in or ? "pointer" : "mouse", ti = J.isTouch = Ue.matchMedia && Ue.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in Ue || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, ot = J.eventTypes = ("ontouchstart" in Rt ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in Rt ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
    return oi = 0;
  }, 500), Kr = 1), sr || si(), Kr;
};
ze.op = le;
D.cache = 0;
var J = /* @__PURE__ */ (function() {
  function i(n) {
    this.init(n);
  }
  var e = i.prototype;
  return e.init = function(t) {
    Kr || ai(me) || console.warn("Please gsap.registerPlugin(Observer)"), sr || si();
    var r = t.tolerance, o = t.dragMinimum, a = t.type, s = t.target, f = t.lineHeight, v = t.debounce, T = t.preventDefault, C = t.onStop, h = t.onStopDelay, u = t.ignore, g = t.wheelSpeed, O = t.event, z = t.onDragStart, ne = t.onDragEnd, W = t.onDrag, he = t.onPress, E = t.onRelease, Ve = t.onRight, X = t.onLeft, x = t.onUp, Ee = t.onDown, Be = t.onChangeX, _ = t.onChangeY, ce = t.onChange, w = t.onToggleX, pt = t.onToggleY, ie = t.onHover, Te = t.onHoverEnd, Me = t.onMove, N = t.ignoreCheck, Q = t.isNormalizer, j = t.onGestureStart, l = t.onGestureEnd, oe = t.onWheel, It = t.onEnable, St = t.onDisable, Ke = t.onClick, ht = t.scrollSpeed, ve = t.capture, ee = t.allowClicks, Pe = t.lockAxis, ye = t.onLockAxis;
    this.target = s = Ne(s) || Rt, this.vars = t, u && (u = me.utils.toArray(u)), r = r || 1e-9, o = o || 0, g = g || 1, ht = ht || 1, a = a || "wheel,touch,pointer", v = v !== !1, f || (f = parseFloat(Ue.getComputedStyle(or).lineHeight) || 22);
    var Ct, De, Ae, I, V, Fe, He, c = this, Xe = 0, gt = 0, kt = t.passive || !T && t.passive !== !1, G = Ot(s, ze), _t = Ot(s, le), Et = G(), Yt = _t(), ue = ~a.indexOf("touch") && !~a.indexOf("pointer") && ot[0] === "pointerdown", Tt = Sr(s), K = s.ownerDocument || At, et = [0, 0, 0], Ze = [0, 0, 0], mt = 0, ur = function() {
      return mt = br();
    }, te = function(y, Y) {
      return (c.event = y) && u && Ai(y.target, u) || Y && ue && y.pointerType !== "touch" || N && N(y, Y);
    }, Lr = function() {
      c._vx.reset(), c._vy.reset(), De.pause(), C && C(c);
    }, vt = function() {
      var y = c.deltaX = In(et), Y = c.deltaY = In(Ze), d = Math.abs(y) >= r, b = Math.abs(Y) >= r;
      ce && (d || b) && ce(c, y, Y, et, Ze), d && (Ve && c.deltaX > 0 && Ve(c), X && c.deltaX < 0 && X(c), Be && Be(c), w && c.deltaX < 0 != Xe < 0 && w(c), Xe = c.deltaX, et[0] = et[1] = et[2] = 0), b && (Ee && c.deltaY > 0 && Ee(c), x && c.deltaY < 0 && x(c), _ && _(c), pt && c.deltaY < 0 != gt < 0 && pt(c), gt = c.deltaY, Ze[0] = Ze[1] = Ze[2] = 0), (I || Ae) && (Me && Me(c), Ae && (z && Ae === 1 && z(c), W && W(c), Ae = 0), I = !1), Fe && !(Fe = !1) && ye && ye(c), V && (oe(c), V = !1), Ct = 0;
    }, Zt = function(y, Y, d) {
      et[d] += y, Ze[d] += Y, c._vx.update(y), c._vy.update(Y), v ? Ct || (Ct = requestAnimationFrame(vt)) : vt();
    }, Jt = function(y, Y) {
      Pe && !He && (c.axis = He = Math.abs(y) > Math.abs(Y) ? "x" : "y", Fe = !0), He !== "y" && (et[2] += y, c._vx.update(y, !0)), He !== "x" && (Ze[2] += Y, c._vy.update(Y, !0)), v ? Ct || (Ct = requestAnimationFrame(vt)) : vt();
    }, Mt = function(y) {
      if (!te(y, 1)) {
        y = hr(y, T);
        var Y = y.clientX, d = y.clientY, b = Y - c.x, m = d - c.y, S = c.isDragging;
        c.x = Y, c.y = d, (S || (b || m) && (Math.abs(c.startX - Y) >= o || Math.abs(c.startY - d) >= o)) && (Ae || (Ae = S ? 2 : 1), S || (c.isDragging = !0), Jt(b, m));
      }
    }, zt = c.onPress = function(k) {
      te(k, 1) || k && k.button || (c.axis = He = null, De.pause(), c.isPressed = !0, k = hr(k), Xe = gt = 0, c.startX = c.x = k.clientX, c.startY = c.y = k.clientY, c._vx.reset(), c._vy.reset(), Le(Q ? s : K, ot[1], Mt, kt, !0), c.deltaX = c.deltaY = 0, he && he(c));
    }, R = c.onRelease = function(k) {
      if (!te(k, 1)) {
        Re(Q ? s : K, ot[1], Mt, !0);
        var y = !isNaN(c.y - c.startY), Y = c.isDragging, d = Y && (Math.abs(c.x - c.startX) > 3 || Math.abs(c.y - c.startY) > 3), b = hr(k);
        !d && y && (c._vx.reset(), c._vy.reset(), T && ee && me.delayedCall(0.08, function() {
          if (br() - mt > 300 && !k.defaultPrevented) {
            if (k.target.click)
              k.target.click();
            else if (K.createEvent) {
              var m = K.createEvent("MouseEvents");
              m.initMouseEvent("click", !0, !0, Ue, 1, b.screenX, b.screenY, b.clientX, b.clientY, !1, !1, !1, !1, 0, null), k.target.dispatchEvent(m);
            }
          }
        })), c.isDragging = c.isGesturing = c.isPressed = !1, C && Y && !Q && De.restart(!0), Ae && vt(), ne && Y && ne(c), E && E(c, d);
      }
    }, Bt = function(y) {
      return y.touches && y.touches.length > 1 && (c.isGesturing = !0) && j(y, c.isDragging);
    }, tt = function() {
      return (c.isGesturing = !1) || l(c);
    }, rt = function(y) {
      if (!te(y)) {
        var Y = G(), d = _t();
        Zt((Y - Et) * ht, (d - Yt) * ht, 1), Et = Y, Yt = d, C && De.restart(!0);
      }
    }, nt = function(y) {
      if (!te(y)) {
        y = hr(y, T), oe && (V = !0);
        var Y = (y.deltaMode === 1 ? f : y.deltaMode === 2 ? Ue.innerHeight : 1) * g;
        Zt(y.deltaX * Y, y.deltaY * Y, 0), C && !Q && De.restart(!0);
      }
    }, Ft = function(y) {
      if (!te(y)) {
        var Y = y.clientX, d = y.clientY, b = Y - c.x, m = d - c.y;
        c.x = Y, c.y = d, I = !0, C && De.restart(!0), (b || m) && Jt(b, m);
      }
    }, Qt = function(y) {
      c.event = y, ie(c);
    }, yt = function(y) {
      c.event = y, Te(c);
    }, fr = function(y) {
      return te(y) || hr(y, T) && Ke(c);
    };
    De = c._dc = me.delayedCall(h || 0.25, Lr).pause(), c.deltaX = c.deltaY = 0, c._vx = vn(0, 50, !0), c._vy = vn(0, 50, !0), c.scrollX = G, c.scrollY = _t, c.isDragging = c.isGesturing = c.isPressed = !1, ni(this), c.enable = function(k) {
      return c.isEnabled || (Le(Tt ? K : s, "scroll", mn), a.indexOf("scroll") >= 0 && Le(Tt ? K : s, "scroll", rt, kt, ve), a.indexOf("wheel") >= 0 && Le(s, "wheel", nt, kt, ve), (a.indexOf("touch") >= 0 && ti || a.indexOf("pointer") >= 0) && (Le(s, ot[0], zt, kt, ve), Le(K, ot[2], R), Le(K, ot[3], R), ee && Le(s, "click", ur, !0, !0), Ke && Le(s, "click", fr), j && Le(K, "gesturestart", Bt), l && Le(K, "gestureend", tt), ie && Le(s, Ht + "enter", Qt), Te && Le(s, Ht + "leave", yt), Me && Le(s, Ht + "move", Ft)), c.isEnabled = !0, c.isDragging = c.isGesturing = c.isPressed = I = Ae = !1, c._vx.reset(), c._vy.reset(), Et = G(), Yt = _t(), k && k.type && zt(k), It && It(c)), c;
    }, c.disable = function() {
      c.isEnabled && (ir.filter(function(k) {
        return k !== c && Sr(k.target);
      }).length || Re(Tt ? K : s, "scroll", mn), c.isPressed && (c._vx.reset(), c._vy.reset(), Re(Q ? s : K, ot[1], Mt, !0)), Re(Tt ? K : s, "scroll", rt, ve), Re(s, "wheel", nt, ve), Re(s, ot[0], zt, ve), Re(K, ot[2], R), Re(K, ot[3], R), Re(s, "click", ur, !0), Re(s, "click", fr), Re(K, "gesturestart", Bt), Re(K, "gestureend", tt), Re(s, Ht + "enter", Qt), Re(s, Ht + "leave", yt), Re(s, Ht + "move", Ft), c.isEnabled = c.isPressed = c.isDragging = !1, St && St(c));
    }, c.kill = c.revert = function() {
      c.disable();
      var k = ir.indexOf(c);
      k >= 0 && ir.splice(k, 1), xt === c && (xt = 0);
    }, ir.push(c), Q && Sr(s) && (xt = c), c.enable(O);
  }, Pi(i, [{
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
J.register = ai;
J.getAll = function() {
  return ir.slice();
};
J.getById = function(i) {
  return ir.filter(function(e) {
    return e.vars.id === i;
  })[0];
};
ii() && me.registerPlugin(J);
/*!
 * ScrollTrigger 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var p, rr, P, F, Ge, B, En, nn, Ar, Cr, mr, Br, Se, an, yn, Ie, Yn, zn, nr, li, cn, ci, Oe, wn, ui, fi, Dt, xn, Tn, ar, Mn, kr, bn, un, Fr = 1, Ce = Date.now, fn = Ce(), je = 0, vr = 0, Bn = function(e, n, t) {
  var r = $e(e) && (e.substr(0, 6) === "clamp(" || e.indexOf("max") > -1);
  return t["_" + n + "Clamp"] = r, r ? e.substr(6, e.length - 7) : e;
}, Fn = function(e, n) {
  return n && (!$e(e) || e.substr(0, 6) !== "clamp(") ? "clamp(" + e + ")" : e;
}, Ri = function i() {
  return vr && requestAnimationFrame(i);
}, Nn = function() {
  return an = 1;
}, Hn = function() {
  return an = 0;
}, ut = function(e) {
  return e;
}, yr = function(e) {
  return Math.round(e * 1e5) / 1e5 || 0;
}, di = function() {
  return typeof window < "u";
}, pi = function() {
  return p || di() && (p = window.gsap) && p.registerPlugin && p;
}, Ut = function(e) {
  return !!~En.indexOf(e);
}, hi = function(e) {
  return (e === "Height" ? Mn : P["inner" + e]) || Ge["client" + e] || B["client" + e];
}, gi = function(e) {
  return Lt(e, "getBoundingClientRect") || (Ut(e) ? function() {
    return en.width = P.innerWidth, en.height = Mn, en;
  } : function() {
    return wt(e);
  });
}, Li = function(e, n, t) {
  var r = t.d, o = t.d2, a = t.a;
  return (a = Lt(e, "getBoundingClientRect")) ? function() {
    return a()[r];
  } : function() {
    return (n ? hi(o) : e["client" + o]) || 0;
  };
}, Oi = function(e, n) {
  return !n || ~dt.indexOf(e) ? gi(e) : function() {
    return en;
  };
}, ft = function(e, n) {
  var t = n.s, r = n.d2, o = n.d, a = n.a;
  return Math.max(0, (t = "scroll" + r) && (a = Lt(e, t)) ? a() - gi(e)()[o] : Ut(e) ? (Ge[t] || B[t]) - hi(r) : e[t] - e["offset" + r]);
}, Nr = function(e, n) {
  for (var t = 0; t < nr.length; t += 3)
    (!n || ~n.indexOf(nr[t + 1])) && e(nr[t], nr[t + 1], nr[t + 2]);
}, $e = function(e) {
  return typeof e == "string";
}, ke = function(e) {
  return typeof e == "function";
}, wr = function(e) {
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
}, er = Math.abs, _i = "left", mi = "top", Pn = "right", Dn = "bottom", Wt = "width", $t = "height", Er = "Right", Tr = "Left", Mr = "Top", Pr = "Bottom", re = "padding", Je = "margin", cr = "Width", An = "Height", ae = "px", Qe = function(e) {
  return P.getComputedStyle(e.nodeType === Node.DOCUMENT_NODE ? e.scrollingElement : e);
}, Ii = function(e) {
  var n = Qe(e).position;
  e.style.position = n === "absolute" || n === "fixed" ? n : "relative";
}, Xn = function(e, n) {
  for (var t in n)
    t in e || (e[t] = n[t]);
  return e;
}, wt = function(e, n) {
  var t = n && Qe(e)[yn] !== "matrix(1, 0, 0, 1, 0, 0)" && p.to(e, {
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
}, on = function(e, n) {
  var t = n.d2;
  return e["offset" + t] || e["client" + t] || 0;
}, vi = function(e) {
  var n = [], t = e.labels, r = e.duration(), o;
  for (o in t)
    n.push(t[o] / r);
  return n;
}, Yi = function(e) {
  return function(n) {
    return p.utils.snap(vi(e), n);
  };
}, Rn = function(e) {
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
    return Rn(vi(e))(n, t.direction);
  };
}, Hr = function(e, n, t, r) {
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
}, Xr = function(e, n, t) {
  t = t && t.wheelHandler, t && (e(n, "wheel", t), e(n, "touchmove", t));
}, qn = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
}, qr = {
  toggleActions: "play",
  anticipatePin: 0
}, sn = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
}, Zr = function(e, n) {
  if ($e(e)) {
    var t = e.indexOf("="), r = ~t ? +(e.charAt(t - 1) + 1) * parseFloat(e.substr(t + 1)) : 0;
    ~t && (e.indexOf("%") > t && (r *= n / 100), e = e.substr(0, t - 1)), e = r + (e in sn ? sn[e] * n : ~e.indexOf("%") ? parseFloat(e) * n / 100 : parseFloat(e) || 0);
  }
  return e;
}, Wr = function(e, n, t, r, o, a, s, f) {
  var v = o.startColor, T = o.endColor, C = o.fontSize, h = o.indent, u = o.fontWeight, g = F.createElement("div"), O = Ut(t) || Lt(t, "pinType") === "fixed", z = e.indexOf("scroller") !== -1, ne = O ? B : t.tagName === "IFRAME" ? t.contentDocument.body : t, W = e.indexOf("start") !== -1, he = W ? v : T, E = "border-color:" + he + ";font-size:" + C + ";color:" + he + ";font-weight:" + u + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return E += "position:" + ((z || f) && O ? "fixed;" : "absolute;"), (z || f || !O) && (E += (r === le ? Pn : Dn) + ":" + (a + parseFloat(h)) + "px;"), s && (E += "box-sizing:border-box;text-align:left;width:" + s.offsetWidth + "px;"), g._isStart = W, g.setAttribute("class", "gsap-marker-" + e + (n ? " marker-" + n : "")), g.style.cssText = E, g.innerText = n || n === 0 ? e + "-" + n : e, ne.children[0] ? ne.insertBefore(g, ne.children[0]) : ne.appendChild(g), g._offset = g["offset" + r.op.d2], Jr(g, 0, r, W), g;
}, Jr = function(e, n, t, r) {
  var o = {
    display: "block"
  }, a = t[r ? "os2" : "p2"], s = t[r ? "p2" : "os2"];
  e._isFlipped = r, o[t.a + "Percent"] = r ? -100 : 0, o[t.a] = r ? "1px" : 0, o["border" + a + cr] = 1, o["border" + s + cr] = 0, o[t.p] = n + "px", p.set(e, o);
}, M = [], Sn = {}, Rr, Wn = function() {
  return Ce() - je > 34 && (Rr || (Rr = requestAnimationFrame(bt)));
}, tr = function() {
  (!Oe || !Oe.isPressed || Oe.startX > B.clientWidth) && (D.cache++, Oe ? Rr || (Rr = requestAnimationFrame(bt)) : bt(), je || Kt("scrollStart"), je = Ce());
}, dn = function() {
  fi = P.innerWidth, ui = P.innerHeight;
}, xr = function(e) {
  D.cache++, (e === !0 || !Se && !ci && !F.fullscreenElement && !F.webkitFullscreenElement && (!wn || fi !== P.innerWidth || Math.abs(P.innerHeight - ui) > P.innerHeight * 0.25)) && nn.restart(!0);
}, Vt = {}, Bi = [], yi = function i() {
  return de(A, "scrollEnd", i) || qt(!0);
}, Kt = function(e) {
  return Vt[e] && Vt[e].map(function(n) {
    return n();
  }) || Bi;
}, We = [], wi = function(e) {
  for (var n = 0; n < We.length; n += 5)
    (!e || We[n + 4] && We[n + 4].query === e) && (We[n].style.cssText = We[n + 1], We[n].getBBox && We[n].setAttribute("transform", We[n + 2] || ""), We[n + 3].uncache = 1);
}, xi = function() {
  return D.forEach(function(e) {
    return ke(e) && ++e.cacheID && (e.rec = e());
  });
}, Ln = function(e, n) {
  var t;
  for (Ie = 0; Ie < M.length; Ie++)
    t = M[Ie], t && (!n || t._ctx === n) && (e ? t.kill(1) : t.revert(!0, !0));
  kr = !0, n && wi(n), n || Kt("revert");
}, bi = function(e, n) {
  D.cache++, (n || !Ye) && D.forEach(function(t) {
    return ke(t) && t.cacheID++ && (t.rec = 0);
  }), $e(e) && (P.history.scrollRestoration = Tn = e);
}, Ye, Gt = 0, $n, Fi = function() {
  if ($n !== Gt) {
    var e = $n = Gt;
    requestAnimationFrame(function() {
      return e === Gt && qt(!0);
    });
  }
}, Si = function() {
  B.appendChild(ar), Mn = !Oe && ar.offsetHeight || P.innerHeight, B.removeChild(ar);
}, Gn = function(e) {
  return Ar(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(n) {
    return n.style.display = e ? "none" : "block";
  });
}, qt = function(e, n) {
  if (Ge = F.documentElement, B = F.body, En = [P, F, Ge, B], je && !e && !kr) {
    pe(A, "scrollEnd", yi);
    return;
  }
  Si(), Ye = A.isRefreshing = !0, kr || xi();
  var t = Kt("refreshInit");
  li && A.sort(), n || Ln(), D.forEach(function(r) {
    ke(r) && (r.smooth && (r.target.style.scrollBehavior = "auto"), r(0));
  }), M.slice(0).forEach(function(r) {
    return r.refresh();
  }), kr = !1, M.forEach(function(r) {
    if (r._subPinOffset && r.pin) {
      var o = r.vars.horizontal ? "offsetWidth" : "offsetHeight", a = r.pin[o];
      r.revert(!0, 1), r.adjustPinSpacing(r.pin[o] - a), r.refresh();
    }
  }), bn = 1, Gn(!0), M.forEach(function(r) {
    var o = ft(r.scroller, r._dir), a = r.vars.end === "max" || r._endClamp && r.end > o, s = r._startClamp && r.start >= o;
    (a || s) && r.setPositions(s ? o - 1 : r.start, a ? Math.max(s ? o : r.start + 1, o) : r.end, !0);
  }), Gn(!1), bn = 0, t.forEach(function(r) {
    return r && r.render && r.render(-1);
  }), D.forEach(function(r) {
    ke(r) && (r.smooth && requestAnimationFrame(function() {
      return r.target.style.scrollBehavior = "smooth";
    }), r.rec && r(r.rec));
  }), bi(Tn, 1), nn.pause(), Gt++, Ye = 2, bt(2), M.forEach(function(r) {
    return ke(r.vars.onRefresh) && r.vars.onRefresh(r);
  }), Ye = A.isRefreshing = !1, Kt("refresh");
}, Cn = 0, Qr = 1, Dr, bt = function(e) {
  if (e === 2 || !Ye && !kr) {
    A.isUpdating = !0, Dr && Dr.update(0);
    var n = M.length, t = Ce(), r = t - fn >= 50, o = n && M[0].scroll();
    if (Qr = Cn > o ? -1 : 1, Ye || (Cn = o), r && (je && !an && t - je > 200 && (je = 0, Kt("scrollEnd")), mr = fn, fn = t), Qr < 0) {
      for (Ie = n; Ie-- > 0; )
        M[Ie] && M[Ie].update(0, r);
      Qr = 1;
    } else
      for (Ie = 0; Ie < n; Ie++)
        M[Ie] && M[Ie].update(0, r);
    A.isUpdating = !1;
  }
  Rr = 0;
}, kn = [_i, mi, Dn, Pn, Je + Pr, Je + Er, Je + Mr, Je + Tr, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], jr = kn.concat([Wt, $t, "boxSizing", "max" + cr, "max" + An, "position", Je, re, re + Mr, re + Er, re + Pr, re + Tr]), Ni = function(e, n, t) {
  lr(t);
  var r = e._gsap;
  if (r.spacerIsNative)
    lr(r.spacerState);
  else if (e._gsap.swappedIn) {
    var o = n.parentNode;
    o && (o.insertBefore(e, n), o.removeChild(n));
  }
  e._gsap.swappedIn = !1;
}, pn = function(e, n, t, r) {
  if (!e._gsap.swappedIn) {
    for (var o = kn.length, a = n.style, s = e.style, f; o--; )
      f = kn[o], a[f] = t[f];
    a.position = t.position === "absolute" ? "absolute" : "relative", t.display === "inline" && (a.display = "inline-block"), s[Dn] = s[Pn] = "auto", a.flexBasis = t.flexBasis || "auto", a.overflow = "visible", a.boxSizing = "border-box", a[Wt] = on(e, ze) + ae, a[$t] = on(e, le) + ae, a[re] = s[Je] = s[mi] = s[_i] = "0", lr(r), s[Wt] = s["max" + cr] = t[Wt], s[$t] = s["max" + An] = t[$t], s[re] = t[re], e.parentNode !== n && (e.parentNode.insertBefore(n, e), n.appendChild(e)), e._gsap.swappedIn = !0;
  }
}, Hi = /([A-Z])/g, lr = function(e) {
  if (e) {
    var n = e.t.style, t = e.length, r = 0, o, a;
    for ((e.t._gsap || p.core.getCache(e.t)).uncache = 1; r < t; r += 2)
      a = e[r + 1], o = e[r], a ? n[o] = a : n[o] && n.removeProperty(o.replace(Hi, "-$1").toLowerCase());
  }
}, $r = function(e) {
  for (var n = jr.length, t = e.style, r = [], o = 0; o < n; o++)
    r.push(jr[o], t[jr[o]]);
  return r.t = e, r;
}, Xi = function(e, n, t) {
  for (var r = [], o = e.length, a = t ? 8 : 0, s; a < o; a += 2)
    s = e[a], r.push(s, s in n ? n[s] : e[a + 1]);
  return r.t = e.t, r;
}, en = {
  left: 0,
  top: 0
}, Un = function(e, n, t, r, o, a, s, f, v, T, C, h, u, g) {
  ke(e) && (e = e(f)), $e(e) && e.substr(0, 3) === "max" && (e = h + (e.charAt(4) === "=" ? Zr("0" + e.substr(3), t) : 0));
  var O = u ? u.time() : 0, z, ne, W;
  if (u && u.seek(0), isNaN(e) || (e = +e), wr(e))
    u && (e = p.utils.mapRange(u.scrollTrigger.start, u.scrollTrigger.end, 0, h, e)), s && Jr(s, t, r, !0);
  else {
    ke(n) && (n = n(f));
    var he = (e || "0").split(" "), E, Ve, X, x;
    W = Ne(n, f) || B, E = wt(W) || {}, (!E || !E.left && !E.top) && Qe(W).display === "none" && (x = W.style.display, W.style.display = "block", E = wt(W), x ? W.style.display = x : W.style.removeProperty("display")), Ve = Zr(he[0], E[r.d]), X = Zr(he[1] || "0", t), e = E[r.p] - v[r.p] - T + Ve + o - X, s && Jr(s, X, r, t - X < 20 || s._isStart && X > 20), t -= t - X;
  }
  if (g && (f[g] = e || -1e-3, e < 0 && (e = 0)), a) {
    var Ee = e + t, Be = a._isStart;
    z = "scroll" + r.d2, Jr(a, Ee, r, Be && Ee > 20 || !Be && (C ? Math.max(B[z], Ge[z]) : a.parentNode[z]) <= Ee + 1), C && (v = wt(s), C && (a.style[r.op.p] = v[r.op.p] - r.op.m - a._offset + ae));
  }
  return u && W && (z = wt(W), u.seek(h), ne = wt(W), u._caScrollDist = z[r.p] - ne[r.p], e = e / u._caScrollDist * h), u && u.seek(O), u ? e : Math.round(e);
}, qi = /(webkit|moz|length|cssText|inset)/i, Vn = function(e, n, t, r) {
  if (e.parentNode !== n) {
    var o = e.style, a, s;
    if (n === B) {
      e._stOrig = o.cssText, s = Qe(e);
      for (a in s)
        !+a && !qi.test(a) && s[a] && typeof o[a] == "string" && a !== "0" && (o[a] = s[a]);
      o.top = t, o.left = r;
    } else
      o.cssText = e._stOrig;
    p.core.getCache(e).uncache = 1, n.appendChild(e);
  }
}, Ci = function(e, n, t) {
  var r = n, o = r;
  return function(a) {
    var s = Math.round(e());
    return s !== r && s !== o && Math.abs(s - r) > 3 && Math.abs(s - o) > 3 && (a = s, t && t()), o = r, r = Math.round(a), r;
  };
}, Gr = function(e, n, t) {
  var r = {};
  r[n.p] = "+=" + t, p.set(e, r);
}, Kn = function(e, n) {
  var t = Ot(e, n), r = "_scroll" + n.p2, o = function a(s, f, v, T, C) {
    var h = a.tween, u = f.onComplete, g = {};
    v = v || t();
    var O = Ci(t, v, function() {
      h.kill(), a.tween = 0;
    });
    return C = T && C || 0, T = T || s - v, h && h.kill(), f[r] = s, f.inherit = !1, f.modifiers = g, g[r] = function() {
      return O(v + T * h.ratio + C * h.ratio * h.ratio);
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
    rr || i.register(p) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), xn(this), this.init(n, t);
  }
  var e = i.prototype;
  return e.init = function(t, r) {
    if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !vr) {
      this.update = this.refresh = this.kill = ut;
      return;
    }
    t = Xn($e(t) || wr(t) || t.nodeType ? {
      trigger: t
    } : t, qr);
    var o = t, a = o.onUpdate, s = o.toggleClass, f = o.id, v = o.onToggle, T = o.onRefresh, C = o.scrub, h = o.trigger, u = o.pin, g = o.pinSpacing, O = o.invalidateOnRefresh, z = o.anticipatePin, ne = o.onScrubComplete, W = o.onSnapComplete, he = o.once, E = o.snap, Ve = o.pinReparent, X = o.pinSpacer, x = o.containerAnimation, Ee = o.fastScrollEnd, Be = o.preventOverlaps, _ = t.horizontal || t.containerAnimation && t.horizontal !== !1 ? ze : le, ce = !C && C !== 0, w = Ne(t.scroller || P), pt = p.core.getCache(w), ie = Ut(w), Te = ("pinType" in t ? t.pinType : Lt(w, "pinType") || ie && "fixed") === "fixed", Me = [t.onEnter, t.onLeave, t.onEnterBack, t.onLeaveBack], N = ce && t.toggleActions.split(" "), Q = "markers" in t ? t.markers : qr.markers, j = ie ? 0 : parseFloat(Qe(w)["border" + _.p2 + cr]) || 0, l = this, oe = t.onRefreshInit && function() {
      return t.onRefreshInit(l);
    }, It = Li(w, ie, _), St = Oi(w, ie), Ke = 0, ht = 0, ve = 0, ee = Ot(w, _), Pe, ye, Ct, De, Ae, I, V, Fe, He, c, Xe, gt, kt, G, _t, Et, Yt, ue, Tt, K, et, Ze, mt, ur, te, Lr, vt, Zt, Jt, Mt, zt, R, Bt, tt, rt, nt, Ft, Qt, yt;
    if (l._startClamp = l._endClamp = !1, l._dir = _, z *= 45, l.scroller = w, l.scroll = x ? x.time.bind(x) : ee, De = ee(), l.vars = t, r = r || t.animation, "refreshPriority" in t && (li = 1, t.refreshPriority === -9999 && (Dr = l)), pt.tweenScroll = pt.tweenScroll || {
      top: Kn(w, le),
      left: Kn(w, ze)
    }, l.tweenTo = Pe = pt.tweenScroll[_.p], l.scrubDuration = function(d) {
      Bt = wr(d) && d, Bt ? R ? R.duration(d) : R = p.to(r, {
        ease: "expo",
        totalProgress: "+=0",
        inherit: !1,
        duration: Bt,
        paused: !0,
        onComplete: function() {
          return ne && ne(l);
        }
      }) : (R && R.progress(1).kill(), R = 0);
    }, r && (r.vars.lazy = !1, r._initted && !l.isReverted || r.vars.immediateRender !== !1 && t.immediateRender !== !1 && r.duration() && r.render(0, !0, !0), l.animation = r.pause(), r.scrollTrigger = l, l.scrubDuration(C), Mt = 0, f || (f = r.vars.id)), E && ((!Xt(E) || E.push) && (E = {
      snapTo: E
    }), "scrollBehavior" in B.style && p.set(ie ? [B, Ge] : w, {
      scrollBehavior: "auto"
    }), D.forEach(function(d) {
      return ke(d) && d.target === (ie ? F.scrollingElement || Ge : w) && (d.smooth = !1);
    }), Ct = ke(E.snapTo) ? E.snapTo : E.snapTo === "labels" ? Yi(r) : E.snapTo === "labelsDirectional" ? zi(r) : E.directional !== !1 ? function(d, b) {
      return Rn(E.snapTo)(d, Ce() - ht < 500 ? 0 : b.direction);
    } : p.utils.snap(E.snapTo), tt = E.duration || {
      min: 0.1,
      max: 2
    }, tt = Xt(tt) ? Cr(tt.min, tt.max) : Cr(tt, tt), rt = p.delayedCall(E.delay || Bt / 2 || 0.1, function() {
      var d = ee(), b = Ce() - ht < 500, m = Pe.tween;
      if ((b || Math.abs(l.getVelocity()) < 10) && !m && !an && Ke !== d) {
        var S = (d - I) / G, fe = r && !ce ? r.totalProgress() : S, L = b ? 0 : (fe - zt) / (Ce() - mr) * 1e3 || 0, Z = p.utils.clamp(-S, 1 - S, er(L / 2) * L / 0.185), we = S + (E.inertia === !1 ? 0 : Z), U, q, H = E, it = H.onStart, $ = H.onInterrupt, qe = H.onComplete;
        if (U = Ct(we, l), wr(U) || (U = we), q = Math.max(0, Math.round(I + U * G)), d <= V && d >= I && q !== d) {
          if (m && !m._initted && m.data <= er(q - d))
            return;
          E.inertia === !1 && (Z = U - S), Pe(q, {
            duration: tt(er(Math.max(er(we - fe), er(U - fe)) * 0.185 / L / 0.05 || 0)),
            ease: E.ease || "power3",
            data: er(q - d),
            // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
            onInterrupt: function() {
              return rt.restart(!0) && $ && jt(l, $);
            },
            onComplete: function() {
              l.update(), Ke = ee(), r && !ce && (R ? R.resetTo("totalProgress", U, r._tTime / r._tDur) : r.progress(U)), Mt = zt = r && !ce ? r.totalProgress() : l.progress, W && W(l), qe && jt(l, qe);
            }
          }, d, Z * G, q - d - Z * G), it && jt(l, it, Pe.tween);
        }
      } else l.isActive && Ke !== d && rt.restart(!0);
    }).pause()), f && (Sn[f] = l), h = l.trigger = Ne(h || u !== !0 && u), yt = h && h._gsap && h._gsap.stRevert, yt && (yt = yt(l)), u = u === !0 ? h : Ne(u), $e(s) && (s = {
      targets: h,
      className: s
    }), u && (g === !1 || g === Je || (g = !g && u.parentNode && u.parentNode.style && Qe(u.parentNode).display === "flex" ? !1 : re), l.pin = u, ye = p.core.getCache(u), ye.spacer ? _t = ye.pinState : (X && (X = Ne(X), X && !X.nodeType && (X = X.current || X.nativeElement), ye.spacerIsNative = !!X, X && (ye.spacerState = $r(X))), ye.spacer = ue = X || F.createElement("div"), ue.classList.add("pin-spacer"), f && ue.classList.add("pin-spacer-" + f), ye.pinState = _t = $r(u)), t.force3D !== !1 && p.set(u, {
      force3D: !0
    }), l.spacer = ue = ye.spacer, Jt = Qe(u), ur = Jt[g + _.os2], K = p.getProperty(u), et = p.quickSetter(u, _.a, ae), pn(u, ue, Jt), Yt = $r(u)), Q) {
      gt = Xt(Q) ? Xn(Q, qn) : qn, c = Wr("scroller-start", f, w, _, gt, 0), Xe = Wr("scroller-end", f, w, _, gt, 0, c), Tt = c["offset" + _.op.d2];
      var fr = Ne(Lt(w, "content") || w);
      Fe = this.markerStart = Wr("start", f, fr, _, gt, Tt, 0, x), He = this.markerEnd = Wr("end", f, fr, _, gt, Tt, 0, x), x && (Qt = p.quickSetter([Fe, He], _.a, ae)), !Te && !(dt.length && Lt(w, "fixedMarkers") === !0) && (Ii(ie ? B : w), p.set([c, Xe], {
        force3D: !0
      }), Lr = p.quickSetter(c, _.a, ae), Zt = p.quickSetter(Xe, _.a, ae));
    }
    if (x) {
      var k = x.vars.onUpdate, y = x.vars.onUpdateParams;
      x.eventCallback("onUpdate", function() {
        l.update(0, 0, 1), k && k.apply(x, y || []);
      });
    }
    if (l.previous = function() {
      return M[M.indexOf(l) - 1];
    }, l.next = function() {
      return M[M.indexOf(l) + 1];
    }, l.revert = function(d, b) {
      if (!b)
        return l.kill(!0);
      var m = d !== !1 || !l.enabled, S = Se;
      m !== l.isReverted && (m && (nt = Math.max(ee(), l.scroll.rec || 0), ve = l.progress, Ft = r && r.progress()), Fe && [Fe, He, c, Xe].forEach(function(fe) {
        return fe.style.display = m ? "none" : "block";
      }), m && (Se = l, l.update(m)), u && (!Ve || !l.isActive) && (m ? Ni(u, ue, _t) : pn(u, ue, Qe(u), te)), m || l.update(m), Se = S, l.isReverted = m);
    }, l.refresh = function(d, b, m, S) {
      if (!((Se || !l.enabled) && !b)) {
        if (u && d && je) {
          pe(i, "scrollEnd", yi);
          return;
        }
        !Ye && oe && oe(l), Se = l, Pe.tween && !m && (Pe.tween.kill(), Pe.tween = 0), R && R.pause(), O && r && (r.revert({
          kill: !1
        }).invalidate(), r.getChildren ? r.getChildren(!0, !0, !1).forEach(function(Pt) {
          return Pt.vars.immediateRender && Pt.render(0, !0, !0);
        }) : r.vars.immediateRender && r.render(0, !0, !0)), l.isReverted || l.revert(!0, !0), l._subPinOffset = !1;
        var fe = It(), L = St(), Z = x ? x.duration() : ft(w, _), we = G <= 0.01 || !G, U = 0, q = S || 0, H = Xt(m) ? m.end : t.end, it = t.endTrigger || h, $ = Xt(m) ? m.start : t.start || (t.start === 0 || !h ? 0 : u ? "0 0" : "0 100%"), qe = l.pinnedContainer = t.pinnedContainer && Ne(t.pinnedContainer, l), st = h && Math.max(0, M.indexOf(l)) || 0, ge = st, _e, xe, Nt, Or, be, se, at, ln, On, dr, lt, pr, Ir;
        for (Q && Xt(m) && (pr = p.getProperty(c, _.p), Ir = p.getProperty(Xe, _.p)); ge-- > 0; )
          se = M[ge], se.end || se.refresh(0, 1) || (Se = l), at = se.pin, at && (at === h || at === u || at === qe) && !se.isReverted && (dr || (dr = []), dr.unshift(se), se.revert(!0, !0)), se !== M[ge] && (st--, ge--);
        for (ke($) && ($ = $(l)), $ = Bn($, "start", l), I = Un($, h, fe, _, ee(), Fe, c, l, L, j, Te, Z, x, l._startClamp && "_startClamp") || (u ? -1e-3 : 0), ke(H) && (H = H(l)), $e(H) && !H.indexOf("+=") && (~H.indexOf(" ") ? H = ($e($) ? $.split(" ")[0] : "") + H : (U = Zr(H.substr(2), fe), H = $e($) ? $ : (x ? p.utils.mapRange(0, x.duration(), x.scrollTrigger.start, x.scrollTrigger.end, I) : I) + U, it = h)), H = Bn(H, "end", l), V = Math.max(I, Un(H || (it ? "100% 0" : Z), it, fe, _, ee() + U, He, Xe, l, L, j, Te, Z, x, l._endClamp && "_endClamp")) || -1e-3, U = 0, ge = st; ge--; )
          se = M[ge] || {}, at = se.pin, at && se.start - se._pinPush <= I && !x && se.end > 0 && (_e = se.end - (l._startClamp ? Math.max(0, se.start) : se.start), (at === h && se.start - se._pinPush < I || at === qe) && isNaN($) && (U += _e * (1 - se.progress)), at === u && (q += _e));
        if (I += U, V += U, l._startClamp && (l._startClamp += U), l._endClamp && !Ye && (l._endClamp = V || -1e-3, V = Math.min(V, ft(w, _))), G = V - I || (I -= 0.01) && 1e-3, we && (ve = p.utils.clamp(0, 1, p.utils.normalize(I, V, nt))), l._pinPush = q, Fe && U && (_e = {}, _e[_.a] = "+=" + U, qe && (_e[_.p] = "-=" + ee()), p.set([Fe, He], _e)), u && !(bn && l.end >= ft(w, _)))
          _e = Qe(u), Or = _ === le, Nt = ee(), Ze = parseFloat(K(_.a)) + q, !Z && V > 1 && (lt = (ie ? F.scrollingElement || Ge : w).style, lt = {
            style: lt,
            value: lt["overflow" + _.a.toUpperCase()]
          }, ie && Qe(B)["overflow" + _.a.toUpperCase()] !== "scroll" && (lt.style["overflow" + _.a.toUpperCase()] = "scroll")), pn(u, ue, _e), Yt = $r(u), xe = wt(u, !0), ln = Te && Ot(w, Or ? ze : le)(), g ? (te = [g + _.os2, G + q + ae], te.t = ue, ge = g === re ? on(u, _) + G + q : 0, ge && (te.push(_.d, ge + ae), ue.style.flexBasis !== "auto" && (ue.style.flexBasis = ge + ae)), lr(te), qe && M.forEach(function(Pt) {
            Pt.pin === qe && Pt.vars.pinSpacing !== !1 && (Pt._subPinOffset = !0);
          }), Te && ee(nt)) : (ge = on(u, _), ge && ue.style.flexBasis !== "auto" && (ue.style.flexBasis = ge + ae)), Te && (be = {
            top: xe.top + (Or ? Nt - I : ln) + ae,
            left: xe.left + (Or ? ln : Nt - I) + ae,
            boxSizing: "border-box",
            position: "fixed"
          }, be[Wt] = be["max" + cr] = Math.ceil(xe.width) + ae, be[$t] = be["max" + An] = Math.ceil(xe.height) + ae, be[Je] = be[Je + Mr] = be[Je + Er] = be[Je + Pr] = be[Je + Tr] = "0", be[re] = _e[re], be[re + Mr] = _e[re + Mr], be[re + Er] = _e[re + Er], be[re + Pr] = _e[re + Pr], be[re + Tr] = _e[re + Tr], Et = Xi(_t, be, Ve), Ye && ee(0)), r ? (On = r._initted, cn(1), r.render(r.duration(), !0, !0), mt = K(_.a) - Ze + G + q, vt = Math.abs(G - mt) > 1, Te && vt && Et.splice(Et.length - 2, 2), r.render(0, !0, !0), On || r.invalidate(!0), r.parent || r.totalTime(r.totalTime()), cn(0)) : mt = G, lt && (lt.value ? lt.style["overflow" + _.a.toUpperCase()] = lt.value : lt.style.removeProperty("overflow-" + _.a));
        else if (h && ee() && !x)
          for (xe = h.parentNode; xe && xe !== B; )
            xe._pinOffset && (I -= xe._pinOffset, V -= xe._pinOffset), xe = xe.parentNode;
        dr && dr.forEach(function(Pt) {
          return Pt.revert(!1, !0);
        }), l.start = I, l.end = V, De = Ae = Ye ? nt : ee(), !x && !Ye && (De < nt && ee(nt), l.scroll.rec = 0), l.revert(!1, !0), ht = Ce(), rt && (Ke = -1, rt.restart(!0)), Se = 0, r && ce && (r._initted || Ft) && r.progress() !== Ft && r.progress(Ft || 0, !0).render(r.time(), !0, !0), (we || ve !== l.progress || x || O || r && !r._initted) && (r && !ce && (r._initted || ve || r.vars.immediateRender !== !1) && r.totalProgress(x && I < -1e-3 && !ve ? p.utils.normalize(I, V, 0) : ve, !0), l.progress = we || (De - I) / G === ve ? 0 : ve), u && g && (ue._pinOffset = Math.round(l.progress * mt)), R && R.invalidate(), isNaN(pr) || (pr -= p.getProperty(c, _.p), Ir -= p.getProperty(Xe, _.p), Gr(c, _, pr), Gr(Fe, _, pr - (S || 0)), Gr(Xe, _, Ir), Gr(He, _, Ir - (S || 0))), we && !Ye && l.update(), T && !Ye && !kt && (kt = !0, T(l), kt = !1);
      }
    }, l.getVelocity = function() {
      return (ee() - Ae) / (Ce() - mr) * 1e3 || 0;
    }, l.endAnimation = function() {
      gr(l.callbackAnimation), r && (R ? R.progress(1) : r.paused() ? ce || gr(r, l.direction < 0, 1) : gr(r, r.reversed()));
    }, l.labelToScroll = function(d) {
      return r && r.labels && (I || l.refresh() || I) + r.labels[d] / r.duration() * G || 0;
    }, l.getTrailing = function(d) {
      var b = M.indexOf(l), m = l.direction > 0 ? M.slice(0, b).reverse() : M.slice(b + 1);
      return ($e(d) ? m.filter(function(S) {
        return S.vars.preventOverlaps === d;
      }) : m).filter(function(S) {
        return l.direction > 0 ? S.end <= I : S.start >= V;
      });
    }, l.update = function(d, b, m) {
      if (!(x && !m && !d)) {
        var S = Ye === !0 ? nt : l.scroll(), fe = d ? 0 : (S - I) / G, L = fe < 0 ? 0 : fe > 1 ? 1 : fe || 0, Z = l.progress, we, U, q, H, it, $, qe, st;
        if (b && (Ae = De, De = x ? ee() : S, E && (zt = Mt, Mt = r && !ce ? r.totalProgress() : L)), z && u && !Se && !Fr && je && (!L && I < S + (S - Ae) / (Ce() - mr) * z ? L = 1e-4 : L === 1 && V > S + (S - Ae) / (Ce() - mr) * z && (L = 0.9999)), L !== Z && l.enabled) {
          if (we = l.isActive = !!L && L < 1, U = !!Z && Z < 1, $ = we !== U, it = $ || !!L != !!Z, l.direction = L > Z ? 1 : -1, l.progress = L, it && !Se && (q = L && !Z ? 0 : L === 1 ? 1 : Z === 1 ? 2 : 3, ce && (H = !$ && N[q + 1] !== "none" && N[q + 1] || N[q], st = r && (H === "complete" || H === "reset" || H in r))), Be && ($ || st) && (st || C || !r) && (ke(Be) ? Be(l) : l.getTrailing(Be).forEach(function(Nt) {
            return Nt.endAnimation();
          })), ce || (R && !Se && !Fr ? (R._dp._time - R._start !== R._time && R.render(R._dp._time - R._start), R.resetTo ? R.resetTo("totalProgress", L, r._tTime / r._tDur) : (R.vars.totalProgress = L, R.invalidate().restart())) : r && r.totalProgress(L, !!(Se && (ht || d)))), u) {
            if (d && g && (ue.style[g + _.os2] = ur), !Te)
              et(yr(Ze + mt * L));
            else if (it) {
              if (qe = !d && L > Z && V + 1 > S && S + 1 >= ft(w, _), Ve)
                if (!d && (we || qe)) {
                  var ge = wt(u, !0), _e = S - I;
                  Vn(u, B, ge.top + (_ === le ? _e : 0) + ae, ge.left + (_ === le ? 0 : _e) + ae);
                } else
                  Vn(u, ue);
              lr(we || qe ? Et : Yt), vt && L < 1 && we || et(Ze + (L === 1 && !qe ? mt : 0));
            }
          }
          E && !Pe.tween && !Se && !Fr && rt.restart(!0), s && ($ || he && L && (L < 1 || !un)) && Ar(s.targets).forEach(function(Nt) {
            return Nt.classList[we || he ? "add" : "remove"](s.className);
          }), a && !ce && !d && a(l), it && !Se ? (ce && (st && (H === "complete" ? r.pause().totalProgress(1) : H === "reset" ? r.restart(!0).pause() : H === "restart" ? r.restart(!0) : r[H]()), a && a(l)), ($ || !un) && (v && $ && jt(l, v), Me[q] && jt(l, Me[q]), he && (L === 1 ? l.kill(!1, 1) : Me[q] = 0), $ || (q = L === 1 ? 1 : 3, Me[q] && jt(l, Me[q]))), Ee && !we && Math.abs(l.getVelocity()) > (wr(Ee) ? Ee : 2500) && (gr(l.callbackAnimation), R ? R.progress(1) : gr(r, H === "reverse" ? 1 : !L, 1))) : ce && a && !Se && a(l);
        }
        if (Zt) {
          var xe = x ? S / x.duration() * (x._caScrollDist || 0) : S;
          Lr(xe + (c._isFlipped ? 1 : 0)), Zt(xe);
        }
        Qt && Qt(-S / x.duration() * (x._caScrollDist || 0));
      }
    }, l.enable = function(d, b) {
      l.enabled || (l.enabled = !0, pe(w, "resize", xr), ie || pe(w, "scroll", tr), oe && pe(i, "refreshInit", oe), d !== !1 && (l.progress = ve = 0, De = Ae = Ke = ee()), b !== !1 && l.refresh());
    }, l.getTween = function(d) {
      return d && Pe ? Pe.tween : R;
    }, l.setPositions = function(d, b, m, S) {
      if (x) {
        var fe = x.scrollTrigger, L = x.duration(), Z = fe.end - fe.start;
        d = fe.start + Z * d / L, b = fe.start + Z * b / L;
      }
      l.refresh(!1, !1, {
        start: Fn(d, m && !!l._startClamp),
        end: Fn(b, m && !!l._endClamp)
      }, S), l.update();
    }, l.adjustPinSpacing = function(d) {
      if (te && d) {
        var b = te.indexOf(_.d) + 1;
        te[b] = parseFloat(te[b]) + d + ae, te[1] = parseFloat(te[1]) + d + ae, lr(te);
      }
    }, l.disable = function(d, b) {
      if (d !== !1 && l.revert(!0, !0), l.enabled && (l.enabled = l.isActive = !1, b || R && R.pause(), nt = 0, ye && (ye.uncache = 1), oe && de(i, "refreshInit", oe), rt && (rt.pause(), Pe.tween && Pe.tween.kill() && (Pe.tween = 0)), !ie)) {
        for (var m = M.length; m--; )
          if (M[m].scroller === w && M[m] !== l)
            return;
        de(w, "resize", xr), ie || de(w, "scroll", tr);
      }
    }, l.kill = function(d, b) {
      l.disable(d, b), R && !b && R.kill(), f && delete Sn[f];
      var m = M.indexOf(l);
      m >= 0 && M.splice(m, 1), m === Ie && Qr > 0 && Ie--, m = 0, M.forEach(function(S) {
        return S.scroller === l.scroller && (m = 1);
      }), m || Ye || (l.scroll.rec = 0), r && (r.scrollTrigger = null, d && r.revert({
        kill: !1
      }), b || r.kill()), Fe && [Fe, He, c, Xe].forEach(function(S) {
        return S.parentNode && S.parentNode.removeChild(S);
      }), Dr === l && (Dr = 0), u && (ye && (ye.uncache = 1), m = 0, M.forEach(function(S) {
        return S.pin === u && m++;
      }), m || (ye.spacer = 0)), t.onKill && t.onKill(l);
    }, M.push(l), l.enable(!1, !1), yt && yt(l), r && r.add && !G) {
      var Y = l.update;
      l.update = function() {
        l.update = Y, D.cache++, I || V || l.refresh();
      }, p.delayedCall(0.01, l.update), G = 0.01, I = V = 0;
    } else
      l.refresh();
    u && Fi();
  }, i.register = function(t) {
    return rr || (p = t || pi(), di() && window.document && i.enable(), rr = vr), rr;
  }, i.defaults = function(t) {
    if (t)
      for (var r in t)
        qr[r] = t[r];
    return qr;
  }, i.disable = function(t, r) {
    vr = 0, M.forEach(function(a) {
      return a[r ? "kill" : "disable"](t);
    }), de(P, "wheel", tr), de(F, "scroll", tr), clearInterval(Br), de(F, "touchcancel", ut), de(B, "touchstart", ut), Hr(de, F, "pointerdown,touchstart,mousedown", Nn), Hr(de, F, "pointerup,touchend,mouseup", Hn), nn.kill(), Nr(de);
    for (var o = 0; o < D.length; o += 3)
      Xr(de, D[o], D[o + 1]), Xr(de, D[o], D[o + 2]);
  }, i.enable = function() {
    if (P = window, F = document, Ge = F.documentElement, B = F.body, p) {
      if (Ar = p.utils.toArray, Cr = p.utils.clamp, xn = p.core.context || ut, cn = p.core.suppressOverwrites || ut, Tn = P.history.scrollRestoration || "auto", Cn = P.pageYOffset || 0, p.core.globals("ScrollTrigger", i), B) {
        vr = 1, ar = document.createElement("div"), ar.style.height = "100vh", ar.style.position = "absolute", Si(), Ri(), J.register(p), i.isTouch = J.isTouch, Dt = J.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), wn = J.isTouch === 1, pe(P, "wheel", tr), En = [P, F, Ge, B], p.matchMedia ? (i.matchMedia = function(T) {
          var C = p.matchMedia(), h;
          for (h in T)
            C.add(h, T[h]);
          return C;
        }, p.addEventListener("matchMediaInit", function() {
          xi(), Ln();
        }), p.addEventListener("matchMediaRevert", function() {
          return wi();
        }), p.addEventListener("matchMedia", function() {
          qt(0, 1), Kt("matchMedia");
        }), p.matchMedia().add("(orientation: portrait)", function() {
          return dn(), dn;
        })) : console.warn("Requires GSAP 3.11.0 or later"), dn(), pe(F, "scroll", tr);
        var t = B.hasAttribute("style"), r = B.style, o = r.borderTopStyle, a = p.core.Animation.prototype, s, f;
        for (a.revert || Object.defineProperty(a, "revert", {
          value: function() {
            return this.time(-0.01, !0);
          }
        }), r.borderTopStyle = "solid", s = wt(B), le.m = Math.round(s.top + le.sc()) || 0, ze.m = Math.round(s.left + ze.sc()) || 0, o ? r.borderTopStyle = o : r.removeProperty("border-top-style"), t || (B.setAttribute("style", ""), B.removeAttribute("style")), Br = setInterval(Wn, 250), p.delayedCall(0.5, function() {
          return Fr = 0;
        }), pe(F, "touchcancel", ut), pe(B, "touchstart", ut), Hr(pe, F, "pointerdown,touchstart,mousedown", Nn), Hr(pe, F, "pointerup,touchend,mouseup", Hn), yn = p.utils.checkPrefix("transform"), jr.push(yn), rr = Ce(), nn = p.delayedCall(0.2, qt).pause(), nr = [F, "visibilitychange", function() {
          var T = P.innerWidth, C = P.innerHeight;
          F.hidden ? (Yn = T, zn = C) : (Yn !== T || zn !== C) && xr();
        }, F, "DOMContentLoaded", qt, P, "load", qt, P, "resize", xr], Nr(pe), M.forEach(function(T) {
          return T.enable(0, 1);
        }), f = 0; f < D.length; f += 3)
          Xr(de, D[f], D[f + 1]), Xr(de, D[f], D[f + 2]);
      } else if (F) {
        var v = function T() {
          i.enable(), F.removeEventListener("DOMContentLoaded", T);
        };
        F.addEventListener("DOMContentLoaded", v);
      }
    }
  }, i.config = function(t) {
    "limitCallbacks" in t && (un = !!t.limitCallbacks);
    var r = t.syncInterval;
    r && clearInterval(Br) || (Br = r) && setInterval(Wn, r), "ignoreMobileResize" in t && (wn = i.isTouch === 1 && t.ignoreMobileResize), "autoRefreshEvents" in t && (Nr(de) || Nr(pe, t.autoRefreshEvents || "none"), ci = (t.autoRefreshEvents + "").indexOf("resize") === -1);
  }, i.scrollerProxy = function(t, r) {
    var o = Ne(t), a = D.indexOf(o), s = Ut(o);
    ~a && D.splice(a, s ? 6 : 2), r && (s ? dt.unshift(P, r, B, r, Ge, r) : dt.unshift(o, r));
  }, i.clearMatchMedia = function(t) {
    M.forEach(function(r) {
      return r._ctx && r._ctx.query === t && r._ctx.kill(!0, !0);
    });
  }, i.isInViewport = function(t, r, o) {
    var a = ($e(t) ? Ne(t) : t).getBoundingClientRect(), s = a[o ? Wt : $t] * r || 0;
    return o ? a.right - s > 0 && a.left + s < P.innerWidth : a.bottom - s > 0 && a.top + s < P.innerHeight;
  }, i.positionInViewport = function(t, r, o) {
    $e(t) && (t = Ne(t));
    var a = t.getBoundingClientRect(), s = a[o ? Wt : $t], f = r == null ? s / 2 : r in sn ? sn[r] * s : ~r.indexOf("%") ? parseFloat(r) * s / 100 : parseFloat(r) || 0;
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
  return i ? Ar(i).forEach(function(e) {
    if (e && e.style) {
      var n = We.indexOf(e);
      n >= 0 && We.splice(n, 5), We.push(e, e.style.cssText, e.getBBox && e.getAttribute("transform"), p.core.getCache(e), xn());
    }
  }) : We;
};
A.revert = function(i, e) {
  return Ln(!i, e);
};
A.create = function(i, e) {
  return new A(i, e);
};
A.refresh = function(i) {
  return i ? xr(!0) : (rr || A.register()) && qt(!0);
};
A.update = function(i) {
  return ++D.cache && bt(i === !0 ? 2 : 0);
};
A.clearScrollMemory = bi;
A.maxScroll = function(i, e) {
  return ft(i, e ? ze : le);
};
A.getScrollFunc = function(i, e) {
  return Ot(Ne(i), e ? ze : le);
};
A.getById = function(i) {
  return Sn[i];
};
A.getAll = function() {
  return M.filter(function(i) {
    return i.vars.id !== "ScrollSmoother";
  });
};
A.isScrolling = function() {
  return !!je;
};
A.snapDirectional = Rn;
A.addEventListener = function(i, e) {
  var n = Vt[i] || (Vt[i] = []);
  ~n.indexOf(e) || n.push(e);
};
A.removeEventListener = function(i, e) {
  var n = Vt[i], t = n && n.indexOf(e);
  t >= 0 && n.splice(t, 1);
};
A.batch = function(i, e) {
  var n = [], t = {}, r = e.interval || 0.016, o = e.batchMax || 1e9, a = function(v, T) {
    var C = [], h = [], u = p.delayedCall(r, function() {
      T(C, h), C = [], h = [];
    }).pause();
    return function(g) {
      C.length || u.restart(!0), C.push(g.trigger), h.push(g), o <= C.length && u.progress(1);
    };
  }, s;
  for (s in e)
    t[s] = s.substr(0, 2) === "on" && ke(e[s]) && s !== "onRefreshInit" ? a(s, e[s]) : e[s];
  return ke(o) && (o = o(), pe(A, "refresh", function() {
    return o = e.batchMax();
  })), Ar(i).forEach(function(f) {
    var v = {};
    for (s in t)
      v[s] = t[s];
    v.trigger = f, n.push(A.create(v));
  }), n;
};
var Zn = function(e, n, t, r) {
  return n > r ? e(r) : n < 0 && e(0), t > r ? (r - n) / (t - n) : t < 0 ? n / (n - t) : 1;
}, hn = function i(e, n) {
  n === !0 ? e.style.removeProperty("touch-action") : e.style.touchAction = n === !0 ? "auto" : n ? "pan-" + n + (J.isTouch ? " pinch-zoom" : "") : "none", e === Ge && i(B, n);
}, Ur = {
  auto: 1,
  scroll: 1
}, Wi = function(e) {
  var n = e.event, t = e.target, r = e.axis, o = (n.changedTouches ? n.changedTouches[0] : n).target, a = o._gsap || p.core.getCache(o), s = Ce(), f;
  if (!a._isScrollT || s - a._isScrollT > 2e3) {
    for (; o && o !== B && (o.scrollHeight <= o.clientHeight && o.scrollWidth <= o.clientWidth || !(Ur[(f = Qe(o)).overflowY] || Ur[f.overflowX])); )
      o = o.parentNode;
    a._isScroll = o && o !== t && !Ut(o) && (Ur[(f = Qe(o)).overflowY] || Ur[f.overflowX]), a._isScrollT = s;
  }
  (a._isScroll || r === "x") && (n.stopPropagation(), n._gsapAllow = !0);
}, ki = function(e, n, t, r) {
  return J.create({
    target: e,
    capture: !0,
    debounce: !1,
    lockAxis: !0,
    type: n,
    onWheel: r = r && Wi,
    onPress: r,
    onDrag: r,
    onScroll: r,
    onEnable: function() {
      return t && pe(F, J.eventTypes[0], Qn, !1, !0);
    },
    onDisable: function() {
      return de(F, J.eventTypes[0], Qn, !0);
    }
  });
}, $i = /(input|label|select|textarea)/i, Jn, Qn = function(e) {
  var n = $i.test(e.target.tagName);
  (n || Jn) && (e._gsapAllow = !0, Jn = n);
}, Gi = function(e) {
  Xt(e) || (e = {}), e.preventDefault = e.isNormalizer = e.allowClicks = !0, e.type || (e.type = "wheel,touch"), e.debounce = !!e.debounce, e.id = e.id || "normalizer";
  var n = e, t = n.normalizeScrollX, r = n.momentum, o = n.allowNestedScroll, a = n.onRelease, s, f, v = Ne(e.target) || Ge, T = p.core.globals().ScrollSmoother, C = T && T.get(), h = Dt && (e.content && Ne(e.content) || C && e.content !== !1 && !C.smooth() && C.content()), u = Ot(v, le), g = Ot(v, ze), O = 1, z = (J.isTouch && P.visualViewport ? P.visualViewport.scale * P.visualViewport.width : P.outerWidth) / P.innerWidth, ne = 0, W = ke(r) ? function() {
    return r(s);
  } : function() {
    return r || 2.8;
  }, he, E, Ve = ki(v, e.type, !0, o), X = function() {
    return E = !1;
  }, x = ut, Ee = ut, Be = function() {
    f = ft(v, le), Ee = Cr(Dt ? 1 : 0, f), t && (x = Cr(0, ft(v, ze))), he = Gt;
  }, _ = function() {
    h._gsap.y = yr(parseFloat(h._gsap.y) + u.offset) + "px", h.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(h._gsap.y) + ", 0, 1)", u.offset = u.cacheID = 0;
  }, ce = function() {
    if (E) {
      requestAnimationFrame(X);
      var Q = yr(s.deltaY / 2), j = Ee(u.v - Q);
      if (h && j !== u.v + u.offset) {
        u.offset = j - u.v;
        var l = yr((parseFloat(h && h._gsap.y) || 0) - u.offset);
        h.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + l + ", 0, 1)", h._gsap.y = l + "px", u.cacheID = D.cache, bt();
      }
      return !0;
    }
    u.offset && _(), E = !0;
  }, w, pt, ie, Te, Me = function() {
    Be(), w.isActive() && w.vars.scrollY > f && (u() > f ? w.progress(1) && u(f) : w.resetTo("scrollY", f));
  };
  return h && p.set(h, {
    y: "+=0"
  }), e.ignoreCheck = function(N) {
    return Dt && N.type === "touchmove" && ce() || O > 1.05 && N.type !== "touchstart" || s.isGesturing || N.touches && N.touches.length > 1;
  }, e.onPress = function() {
    E = !1;
    var N = O;
    O = yr((P.visualViewport && P.visualViewport.scale || 1) / z), w.pause(), N !== O && hn(v, O > 1.01 ? !0 : t ? !1 : "x"), pt = g(), ie = u(), Be(), he = Gt;
  }, e.onRelease = e.onGestureStart = function(N, Q) {
    if (u.offset && _(), !Q)
      Te.restart(!0);
    else {
      D.cache++;
      var j = W(), l, oe;
      t && (l = g(), oe = l + j * 0.05 * -N.velocityX / 0.227, j *= Zn(g, l, oe, ft(v, ze)), w.vars.scrollX = x(oe)), l = u(), oe = l + j * 0.05 * -N.velocityY / 0.227, j *= Zn(u, l, oe, ft(v, le)), w.vars.scrollY = Ee(oe), w.invalidate().duration(j).play(0.01), (Dt && w.vars.scrollY >= f || l >= f - 1) && p.to({}, {
        onUpdate: Me,
        duration: j
      });
    }
    a && a(N);
  }, e.onWheel = function() {
    w._ts && w.pause(), Ce() - ne > 1e3 && (he = 0, ne = Ce());
  }, e.onChange = function(N, Q, j, l, oe) {
    if (Gt !== he && Be(), Q && t && g(x(l[2] === Q ? pt + (N.startX - N.x) : g() + Q - l[1])), j) {
      u.offset && _();
      var It = oe[2] === j, St = It ? ie + N.startY - N.y : u() + j - oe[1], Ke = Ee(St);
      It && St !== Ke && (ie += Ke - St), u(Ke);
    }
    (j || Q) && bt();
  }, e.onEnable = function() {
    hn(v, t ? !1 : "x"), A.addEventListener("refresh", Me), pe(P, "resize", Me), u.smooth && (u.target.style.scrollBehavior = "auto", u.smooth = g.smooth = !1), Ve.enable();
  }, e.onDisable = function() {
    hn(v, !0), de(P, "resize", Me), A.removeEventListener("refresh", Me), Ve.kill();
  }, e.lockAxis = e.lockAxis !== !1, s = new J(e), s.iOS = Dt, Dt && !u() && u(1), Dt && p.ticker.add(ut), Te = s._dc, w = p.to(s, {
    ease: "power4",
    paused: !0,
    inherit: !1,
    scrollX: t ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: Ci(u, u(), function() {
        return w.pause();
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
    return Oe;
  if (i === !0 && Oe)
    return Oe.enable();
  if (i === !1) {
    Oe && Oe.kill(), Oe = i;
    return;
  }
  var e = i instanceof J ? i : Gi(i);
  return Oe && Oe.target === e.target && Oe.kill(), Ut(e.target) && (Oe = e), e;
};
A.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp: vn,
  _inputObserver: ki,
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
pi() && p.registerPlugin(A);
tn.registerPlugin(A);
const Ui = ".system-carousel, [data-carousel-prev], [data-carousel-next], [data-carousel-dot], [data-carousel-viewport], a, button, input, label, select, textarea, summary";
let _r = null, Vr = null;
function Vi() {
  _r == null || _r(), _r = null;
  const i = document.querySelector("[data-mobile-nav-toggle]"), e = document.querySelector("[data-mobile-nav-menu]");
  if (!i || !e) return;
  const n = i.querySelector("[data-mobile-nav-open-icon]"), t = i.querySelector("[data-mobile-nav-close-icon]"), r = Array.from(e.querySelectorAll("[data-mobile-nav-link]")), o = window.matchMedia("(min-width: 768px)");
  let a = !1;
  const s = () => {
    e.classList.toggle("hidden", !a), i.setAttribute("aria-expanded", String(a)), i.setAttribute("aria-label", a ? "Zamknij menu główne" : "Otwórz menu główne"), n == null || n.classList.toggle("hidden", a), t == null || t.classList.toggle("hidden", !a);
  }, f = (O = !1) => {
    if (!a) {
      s();
      return;
    }
    a = !1, s(), O && i.focus();
  }, v = () => {
    a = !a, s();
  }, T = () => {
    v();
  }, C = () => {
    f();
  }, h = (O) => {
    if (!a || o.matches) return;
    const z = O.target;
    !z || e.contains(z) || i.contains(z) || f();
  }, u = (O) => {
    O.key !== "Escape" || !a || (O.preventDefault(), f(!0));
  }, g = () => {
    a = !1, s();
  };
  i.addEventListener("click", T), r.forEach((O) => {
    O.addEventListener("click", C);
  }), document.addEventListener("click", h), document.addEventListener("keydown", u), o.addEventListener("change", g), _r = () => {
    i.removeEventListener("click", T), r.forEach((O) => {
      O.removeEventListener("click", C);
    }), document.removeEventListener("click", h), document.removeEventListener("keydown", u), o.removeEventListener("change", g);
  }, s();
}
function Ki() {
  const i = document.querySelector(".hero h1"), e = document.querySelector(".hero__lead");
  i && tn.fromTo(
    [i, e].filter(Boolean),
    { opacity: 0, y: 18 },
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out" }
  );
}
function gn(i) {
  const e = document.querySelectorAll(i);
  e.length && (tn.set(e, { opacity: 0, y: 24 }), e.forEach((n, t) => {
    A.create({
      trigger: n,
      start: "top 88%",
      once: !0,
      onEnter: () => tn.to(n, { opacity: 1, y: 0, duration: 0.5, delay: t % 4 * 0.06, ease: "power2.out" })
    });
  }));
}
class Zi {
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
function jn(i) {
  const e = new URL(window.location.href);
  e.hash = i ? `#${i}` : "", window.history.replaceState(window.history.state, "", e);
}
function Ji(i) {
  if (i.dataset.systemsSelectionInitialized === "true") return;
  i.dataset.systemsSelectionInitialized = "true";
  const e = Array.from(i.querySelectorAll(".system-pill[id]"));
  if (!e.length) return;
  const n = new Map(e.map((s) => [s.id, s]));
  let t = null;
  const r = (s) => {
    t = (s == null ? void 0 : s.id) ?? null, e.forEach((f) => {
      const v = f === s;
      f.classList.toggle("is-selected", v), v ? f.setAttribute("aria-current", "true") : f.removeAttribute("aria-current");
    });
  }, o = () => {
    const s = decodeURIComponent(window.location.hash.slice(1));
    r(s ? n.get(s) ?? null : null);
  }, a = () => {
    !t && !window.location.hash || (r(null), jn(null));
  };
  i.addEventListener("click", (s) => {
    const f = s.target;
    if (!f) return;
    const v = f.closest(".system-pill[id]");
    if (v) {
      if (f.closest(Ui))
        return;
      t !== v.id && (r(v), jn(v.id));
      return;
    }
    a();
  }), i.addEventListener("change", (s) => {
    const f = s.target;
    f != null && f.matches('input[name="systems-filter"]') && a();
  }), Vr && window.removeEventListener("hashchange", Vr), Vr = o, window.addEventListener("hashchange", Vr), o();
}
function Qi() {
  const i = document.querySelector("#systems-page");
  !i || i.dataset.systemsInitialized === "true" || (i.dataset.systemsInitialized = "true", i.querySelectorAll("[data-system-carousel]").forEach((e) => {
    new Zi(e);
  }), Ji(i));
}
function ei() {
  Vi(), Ki(), gn(".section-card"), gn(".system-button"), gn(".system-card"), Qi();
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", ei) : ei();
