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
function Di(i, e, n) {
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
}, oi = 1, ir = [], P = [], dt = [], br = Date.now, _n = function(e, n) {
  return n;
}, Pi = function() {
  var e = sr.core, n = e.bridge || {}, t = e._scrollers, r = e._proxies;
  t.push.apply(t, P), r.push.apply(r, dt), P = t, dt = r, _n = function(a, s) {
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
  return xt && xt.isPressed || P.cache++;
}, rn = function(e, n) {
  var t = function r(o) {
    if (o || o === 0) {
      oi && (Ue.history.scrollRestoration = "manual");
      var a = xt && xt.isPressed;
      o = r.v = Math.round(o) || (xt && xt.iOS ? 1 : 0), e(o), r.cacheID = P.cache, a && _n("ss", o);
    } else (n || P.cache !== r.cacheID || _n("ref")) && (r.cacheID = P.cache, r.v = e());
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
    return arguments.length ? Ue.scrollTo(i, ce.sc()) : Ue.pageXOffset || At[Yr] || Rt[Yr] || or[Yr] || 0;
  })
}, ce = {
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
  var o = P.indexOf(e), a = r === ce.sc ? 1 : 2;
  !~o && (o = P.push(e) - 1), P[o + a] || Le(e, "scroll", mn);
  var s = P[o + a], f = s || (P[o + a] = rn(Lt(e, t), !0) || (Sr(e) ? r : rn(function(_) {
    return arguments.length ? e[t] = _ : e[t];
  })));
  return f.target = e, s || (f.smooth = me.getProperty(e, "scrollBehavior") === "smooth"), f;
}, vn = function(e, n, t) {
  var r = e, o = e, a = br(), s = a, f = n || 50, _ = Math.max(500, f * 3), M = function(m, X) {
    var B = br();
    X || B - a > f ? (o = r, r = m, s = a, a = B) : t ? r += m : r = o + (m - o) / (B - s) * (a - s);
  }, k = function() {
    o = r = t ? 0 : r, s = a = 0;
  }, h = function(m) {
    var X = s, B = o, G = br();
    return (m || m === 0) && m !== r && M(m), a === s || G - s > _ ? 0 : (r + (t ? B : -B)) / ((t ? G : a) - X) * 1e3;
  };
  return {
    update: M,
    reset: k,
    getVelocity: h
  };
}, hr = function(e, n) {
  return n && !e._gsapAllow && e.cancelable !== !1 && e.preventDefault(), e.changedTouches ? e.changedTouches[0] : e;
}, In = function(e) {
  var n = Math.max.apply(Math, e), t = Math.min.apply(Math, e);
  return Math.abs(n) >= Math.abs(t) ? n : t;
}, si = function() {
  sr = me.core.globals().ScrollTrigger, sr && sr.core && Pi();
}, ai = function(e) {
  return me = e || ii(), !Kr && me && typeof document < "u" && document.body && (Ue = window, At = document, Rt = At.documentElement, or = At.body, ri = [Ue, At, Rt, or], me.utils.clamp, ni = me.core.context || function() {
  }, Ht = "onpointerenter" in or ? "pointer" : "mouse", ti = j.isTouch = Ue.matchMedia && Ue.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in Ue || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, ot = j.eventTypes = ("ontouchstart" in Rt ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in Rt ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
    return oi = 0;
  }, 500), Kr = 1), sr || si(), Kr;
};
ze.op = ce;
P.cache = 0;
var j = /* @__PURE__ */ (function() {
  function i(n) {
    this.init(n);
  }
  var e = i.prototype;
  return e.init = function(t) {
    Kr || ai(me) || console.warn("Please gsap.registerPlugin(Observer)"), sr || si();
    var r = t.tolerance, o = t.dragMinimum, a = t.type, s = t.target, f = t.lineHeight, _ = t.debounce, M = t.preventDefault, k = t.onStop, h = t.onStopDelay, u = t.ignore, m = t.wheelSpeed, X = t.event, B = t.onDragStart, G = t.onDragEnd, O = t.onDrag, K = t.onPress, E = t.onRelease, Ve = t.onRight, q = t.onLeft, x = t.onUp, Ee = t.onDown, Be = t.onChangeX, g = t.onChangeY, ue = t.onChange, w = t.onToggleX, pt = t.onToggleY, oe = t.onHover, Te = t.onHoverEnd, Me = t.onMove, N = t.ignoreCheck, ee = t.isNormalizer, te = t.onGestureStart, l = t.onGestureEnd, se = t.onWheel, It = t.onEnable, St = t.onDisable, Ke = t.onClick, ht = t.scrollSpeed, ve = t.capture, re = t.allowClicks, De = t.lockAxis, ye = t.onLockAxis;
    this.target = s = Ne(s) || Rt, this.vars = t, u && (u = me.utils.toArray(u)), r = r || 1e-9, o = o || 0, m = m || 1, ht = ht || 1, a = a || "wheel,touch,pointer", _ = _ !== !1, f || (f = parseFloat(Ue.getComputedStyle(or).lineHeight) || 22);
    var kt, Pe, Ae, I, Z, Fe, He, c = this, Xe = 0, gt = 0, Ct = t.passive || !M && t.passive !== !1, U = Ot(s, ze), _t = Ot(s, ce), Et = U(), Yt = _t(), fe = ~a.indexOf("touch") && !~a.indexOf("pointer") && ot[0] === "pointerdown", Tt = Sr(s), J = s.ownerDocument || At, et = [0, 0, 0], Ze = [0, 0, 0], mt = 0, ur = function() {
      return mt = br();
    }, ne = function(y, Y) {
      return (c.event = y) && u && Ai(y.target, u) || Y && fe && y.pointerType !== "touch" || N && N(y, Y);
    }, Lr = function() {
      c._vx.reset(), c._vy.reset(), Pe.pause(), k && k(c);
    }, vt = function() {
      var y = c.deltaX = In(et), Y = c.deltaY = In(Ze), d = Math.abs(y) >= r, b = Math.abs(Y) >= r;
      ue && (d || b) && ue(c, y, Y, et, Ze), d && (Ve && c.deltaX > 0 && Ve(c), q && c.deltaX < 0 && q(c), Be && Be(c), w && c.deltaX < 0 != Xe < 0 && w(c), Xe = c.deltaX, et[0] = et[1] = et[2] = 0), b && (Ee && c.deltaY > 0 && Ee(c), x && c.deltaY < 0 && x(c), g && g(c), pt && c.deltaY < 0 != gt < 0 && pt(c), gt = c.deltaY, Ze[0] = Ze[1] = Ze[2] = 0), (I || Ae) && (Me && Me(c), Ae && (B && Ae === 1 && B(c), O && O(c), Ae = 0), I = !1), Fe && !(Fe = !1) && ye && ye(c), Z && (se(c), Z = !1), kt = 0;
    }, Zt = function(y, Y, d) {
      et[d] += y, Ze[d] += Y, c._vx.update(y), c._vy.update(Y), _ ? kt || (kt = requestAnimationFrame(vt)) : vt();
    }, Jt = function(y, Y) {
      De && !He && (c.axis = He = Math.abs(y) > Math.abs(Y) ? "x" : "y", Fe = !0), He !== "y" && (et[2] += y, c._vx.update(y, !0)), He !== "x" && (Ze[2] += Y, c._vy.update(Y, !0)), _ ? kt || (kt = requestAnimationFrame(vt)) : vt();
    }, Mt = function(y) {
      if (!ne(y, 1)) {
        y = hr(y, M);
        var Y = y.clientX, d = y.clientY, b = Y - c.x, v = d - c.y, S = c.isDragging;
        c.x = Y, c.y = d, (S || (b || v) && (Math.abs(c.startX - Y) >= o || Math.abs(c.startY - d) >= o)) && (Ae || (Ae = S ? 2 : 1), S || (c.isDragging = !0), Jt(b, v));
      }
    }, zt = c.onPress = function(C) {
      ne(C, 1) || C && C.button || (c.axis = He = null, Pe.pause(), c.isPressed = !0, C = hr(C), Xe = gt = 0, c.startX = c.x = C.clientX, c.startY = c.y = C.clientY, c._vx.reset(), c._vy.reset(), Le(ee ? s : J, ot[1], Mt, Ct, !0), c.deltaX = c.deltaY = 0, K && K(c));
    }, R = c.onRelease = function(C) {
      if (!ne(C, 1)) {
        Re(ee ? s : J, ot[1], Mt, !0);
        var y = !isNaN(c.y - c.startY), Y = c.isDragging, d = Y && (Math.abs(c.x - c.startX) > 3 || Math.abs(c.y - c.startY) > 3), b = hr(C);
        !d && y && (c._vx.reset(), c._vy.reset(), M && re && me.delayedCall(0.08, function() {
          if (br() - mt > 300 && !C.defaultPrevented) {
            if (C.target.click)
              C.target.click();
            else if (J.createEvent) {
              var v = J.createEvent("MouseEvents");
              v.initMouseEvent("click", !0, !0, Ue, 1, b.screenX, b.screenY, b.clientX, b.clientY, !1, !1, !1, !1, 0, null), C.target.dispatchEvent(v);
            }
          }
        })), c.isDragging = c.isGesturing = c.isPressed = !1, k && Y && !ee && Pe.restart(!0), Ae && vt(), G && Y && G(c), E && E(c, d);
      }
    }, Bt = function(y) {
      return y.touches && y.touches.length > 1 && (c.isGesturing = !0) && te(y, c.isDragging);
    }, tt = function() {
      return (c.isGesturing = !1) || l(c);
    }, rt = function(y) {
      if (!ne(y)) {
        var Y = U(), d = _t();
        Zt((Y - Et) * ht, (d - Yt) * ht, 1), Et = Y, Yt = d, k && Pe.restart(!0);
      }
    }, nt = function(y) {
      if (!ne(y)) {
        y = hr(y, M), se && (Z = !0);
        var Y = (y.deltaMode === 1 ? f : y.deltaMode === 2 ? Ue.innerHeight : 1) * m;
        Zt(y.deltaX * Y, y.deltaY * Y, 0), k && !ee && Pe.restart(!0);
      }
    }, Ft = function(y) {
      if (!ne(y)) {
        var Y = y.clientX, d = y.clientY, b = Y - c.x, v = d - c.y;
        c.x = Y, c.y = d, I = !0, k && Pe.restart(!0), (b || v) && Jt(b, v);
      }
    }, Qt = function(y) {
      c.event = y, oe(c);
    }, yt = function(y) {
      c.event = y, Te(c);
    }, fr = function(y) {
      return ne(y) || hr(y, M) && Ke(c);
    };
    Pe = c._dc = me.delayedCall(h || 0.25, Lr).pause(), c.deltaX = c.deltaY = 0, c._vx = vn(0, 50, !0), c._vy = vn(0, 50, !0), c.scrollX = U, c.scrollY = _t, c.isDragging = c.isGesturing = c.isPressed = !1, ni(this), c.enable = function(C) {
      return c.isEnabled || (Le(Tt ? J : s, "scroll", mn), a.indexOf("scroll") >= 0 && Le(Tt ? J : s, "scroll", rt, Ct, ve), a.indexOf("wheel") >= 0 && Le(s, "wheel", nt, Ct, ve), (a.indexOf("touch") >= 0 && ti || a.indexOf("pointer") >= 0) && (Le(s, ot[0], zt, Ct, ve), Le(J, ot[2], R), Le(J, ot[3], R), re && Le(s, "click", ur, !0, !0), Ke && Le(s, "click", fr), te && Le(J, "gesturestart", Bt), l && Le(J, "gestureend", tt), oe && Le(s, Ht + "enter", Qt), Te && Le(s, Ht + "leave", yt), Me && Le(s, Ht + "move", Ft)), c.isEnabled = !0, c.isDragging = c.isGesturing = c.isPressed = I = Ae = !1, c._vx.reset(), c._vy.reset(), Et = U(), Yt = _t(), C && C.type && zt(C), It && It(c)), c;
    }, c.disable = function() {
      c.isEnabled && (ir.filter(function(C) {
        return C !== c && Sr(C.target);
      }).length || Re(Tt ? J : s, "scroll", mn), c.isPressed && (c._vx.reset(), c._vy.reset(), Re(ee ? s : J, ot[1], Mt, !0)), Re(Tt ? J : s, "scroll", rt, ve), Re(s, "wheel", nt, ve), Re(s, ot[0], zt, ve), Re(J, ot[2], R), Re(J, ot[3], R), Re(s, "click", ur, !0), Re(s, "click", fr), Re(J, "gesturestart", Bt), Re(J, "gestureend", tt), Re(s, Ht + "enter", Qt), Re(s, Ht + "leave", yt), Re(s, Ht + "move", Ft), c.isEnabled = c.isPressed = c.isDragging = !1, St && St(c));
    }, c.kill = c.revert = function() {
      c.disable();
      var C = ir.indexOf(c);
      C >= 0 && ir.splice(C, 1), xt === c && (xt = 0);
    }, ir.push(c), ee && Sr(s) && (xt = c), c.enable(X);
  }, Di(i, [{
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
j.version = "3.15.0";
j.create = function(i) {
  return new j(i);
};
j.register = ai;
j.getAll = function() {
  return ir.slice();
};
j.getById = function(i) {
  return ir.filter(function(e) {
    return e.vars.id === i;
  })[0];
};
ii() && me.registerPlugin(j);
/*!
 * ScrollTrigger 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var p, rr, D, F, Ge, z, En, nn, Ar, kr, mr, Br, Se, an, yn, Ie, Yn, zn, nr, li, cn, ci, Oe, wn, ui, fi, Pt, xn, Tn, ar, Mn, Cr, bn, un, Fr = 1, ke = Date.now, fn = ke(), je = 0, vr = 0, Bn = function(e, n, t) {
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
  return (e === "Height" ? Mn : D["inner" + e]) || Ge["client" + e] || z["client" + e];
}, gi = function(e) {
  return Lt(e, "getBoundingClientRect") || (Ut(e) ? function() {
    return en.width = D.innerWidth, en.height = Mn, en;
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
  return Math.max(0, (t = "scroll" + r) && (a = Lt(e, t)) ? a() - gi(e)()[o] : Ut(e) ? (Ge[t] || z[t]) - hi(r) : e[t] - e["offset" + r]);
}, Nr = function(e, n) {
  for (var t = 0; t < nr.length; t += 3)
    (!n || ~n.indexOf(nr[t + 1])) && e(nr[t], nr[t + 1], nr[t + 2]);
}, $e = function(e) {
  return typeof e == "string";
}, Ce = function(e) {
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
}, er = Math.abs, _i = "left", mi = "top", Dn = "right", Pn = "bottom", Wt = "width", $t = "height", Er = "Right", Tr = "Left", Mr = "Top", Dr = "Bottom", ie = "padding", Je = "margin", cr = "Width", An = "Height", le = "px", Qe = function(e) {
  return D.getComputedStyle(e.nodeType === Node.DOCUMENT_NODE ? e.scrollingElement : e);
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
}, he = function(e, n, t, r, o) {
  return e.addEventListener(n, t, {
    passive: !r,
    capture: !!o
  });
}, pe = function(e, n, t, r) {
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
  var _ = o.startColor, M = o.endColor, k = o.fontSize, h = o.indent, u = o.fontWeight, m = F.createElement("div"), X = Ut(t) || Lt(t, "pinType") === "fixed", B = e.indexOf("scroller") !== -1, G = X ? z : t.tagName === "IFRAME" ? t.contentDocument.body : t, O = e.indexOf("start") !== -1, K = O ? _ : M, E = "border-color:" + K + ";font-size:" + k + ";color:" + K + ";font-weight:" + u + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return E += "position:" + ((B || f) && X ? "fixed;" : "absolute;"), (B || f || !X) && (E += (r === ce ? Dn : Pn) + ":" + (a + parseFloat(h)) + "px;"), s && (E += "box-sizing:border-box;text-align:left;width:" + s.offsetWidth + "px;"), m._isStart = O, m.setAttribute("class", "gsap-marker-" + e + (n ? " marker-" + n : "")), m.style.cssText = E, m.innerText = n || n === 0 ? e + "-" + n : e, G.children[0] ? G.insertBefore(m, G.children[0]) : G.appendChild(m), m._offset = m["offset" + r.op.d2], Jr(m, 0, r, O), m;
}, Jr = function(e, n, t, r) {
  var o = {
    display: "block"
  }, a = t[r ? "os2" : "p2"], s = t[r ? "p2" : "os2"];
  e._isFlipped = r, o[t.a + "Percent"] = r ? -100 : 0, o[t.a] = r ? "1px" : 0, o["border" + a + cr] = 1, o["border" + s + cr] = 0, o[t.p] = n + "px", p.set(e, o);
}, T = [], Sn = {}, Rr, Wn = function() {
  return ke() - je > 34 && (Rr || (Rr = requestAnimationFrame(bt)));
}, tr = function() {
  (!Oe || !Oe.isPressed || Oe.startX > z.clientWidth) && (P.cache++, Oe ? Rr || (Rr = requestAnimationFrame(bt)) : bt(), je || Kt("scrollStart"), je = ke());
}, dn = function() {
  fi = D.innerWidth, ui = D.innerHeight;
}, xr = function(e) {
  P.cache++, (e === !0 || !Se && !ci && !F.fullscreenElement && !F.webkitFullscreenElement && (!wn || fi !== D.innerWidth || Math.abs(D.innerHeight - ui) > D.innerHeight * 0.25)) && nn.restart(!0);
}, Vt = {}, Bi = [], yi = function i() {
  return pe(A, "scrollEnd", i) || qt(!0);
}, Kt = function(e) {
  return Vt[e] && Vt[e].map(function(n) {
    return n();
  }) || Bi;
}, We = [], wi = function(e) {
  for (var n = 0; n < We.length; n += 5)
    (!e || We[n + 4] && We[n + 4].query === e) && (We[n].style.cssText = We[n + 1], We[n].getBBox && We[n].setAttribute("transform", We[n + 2] || ""), We[n + 3].uncache = 1);
}, xi = function() {
  return P.forEach(function(e) {
    return Ce(e) && ++e.cacheID && (e.rec = e());
  });
}, Ln = function(e, n) {
  var t;
  for (Ie = 0; Ie < T.length; Ie++)
    t = T[Ie], t && (!n || t._ctx === n) && (e ? t.kill(1) : t.revert(!0, !0));
  Cr = !0, n && wi(n), n || Kt("revert");
}, bi = function(e, n) {
  P.cache++, (n || !Ye) && P.forEach(function(t) {
    return Ce(t) && t.cacheID++ && (t.rec = 0);
  }), $e(e) && (D.history.scrollRestoration = Tn = e);
}, Ye, Gt = 0, $n, Fi = function() {
  if ($n !== Gt) {
    var e = $n = Gt;
    requestAnimationFrame(function() {
      return e === Gt && qt(!0);
    });
  }
}, Si = function() {
  z.appendChild(ar), Mn = !Oe && ar.offsetHeight || D.innerHeight, z.removeChild(ar);
}, Gn = function(e) {
  return Ar(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(n) {
    return n.style.display = e ? "none" : "block";
  });
}, qt = function(e, n) {
  if (Ge = F.documentElement, z = F.body, En = [D, F, Ge, z], je && !e && !Cr) {
    he(A, "scrollEnd", yi);
    return;
  }
  Si(), Ye = A.isRefreshing = !0, Cr || xi();
  var t = Kt("refreshInit");
  li && A.sort(), n || Ln(), P.forEach(function(r) {
    Ce(r) && (r.smooth && (r.target.style.scrollBehavior = "auto"), r(0));
  }), T.slice(0).forEach(function(r) {
    return r.refresh();
  }), Cr = !1, T.forEach(function(r) {
    if (r._subPinOffset && r.pin) {
      var o = r.vars.horizontal ? "offsetWidth" : "offsetHeight", a = r.pin[o];
      r.revert(!0, 1), r.adjustPinSpacing(r.pin[o] - a), r.refresh();
    }
  }), bn = 1, Gn(!0), T.forEach(function(r) {
    var o = ft(r.scroller, r._dir), a = r.vars.end === "max" || r._endClamp && r.end > o, s = r._startClamp && r.start >= o;
    (a || s) && r.setPositions(s ? o - 1 : r.start, a ? Math.max(s ? o : r.start + 1, o) : r.end, !0);
  }), Gn(!1), bn = 0, t.forEach(function(r) {
    return r && r.render && r.render(-1);
  }), P.forEach(function(r) {
    Ce(r) && (r.smooth && requestAnimationFrame(function() {
      return r.target.style.scrollBehavior = "smooth";
    }), r.rec && r(r.rec));
  }), bi(Tn, 1), nn.pause(), Gt++, Ye = 2, bt(2), T.forEach(function(r) {
    return Ce(r.vars.onRefresh) && r.vars.onRefresh(r);
  }), Ye = A.isRefreshing = !1, Kt("refresh");
}, kn = 0, Qr = 1, Pr, bt = function(e) {
  if (e === 2 || !Ye && !Cr) {
    A.isUpdating = !0, Pr && Pr.update(0);
    var n = T.length, t = ke(), r = t - fn >= 50, o = n && T[0].scroll();
    if (Qr = kn > o ? -1 : 1, Ye || (kn = o), r && (je && !an && t - je > 200 && (je = 0, Kt("scrollEnd")), mr = fn, fn = t), Qr < 0) {
      for (Ie = n; Ie-- > 0; )
        T[Ie] && T[Ie].update(0, r);
      Qr = 1;
    } else
      for (Ie = 0; Ie < n; Ie++)
        T[Ie] && T[Ie].update(0, r);
    A.isUpdating = !1;
  }
  Rr = 0;
}, Cn = [_i, mi, Pn, Dn, Je + Dr, Je + Er, Je + Mr, Je + Tr, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], jr = Cn.concat([Wt, $t, "boxSizing", "max" + cr, "max" + An, "position", Je, ie, ie + Mr, ie + Er, ie + Dr, ie + Tr]), Ni = function(e, n, t) {
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
    for (var o = Cn.length, a = n.style, s = e.style, f; o--; )
      f = Cn[o], a[f] = t[f];
    a.position = t.position === "absolute" ? "absolute" : "relative", t.display === "inline" && (a.display = "inline-block"), s[Pn] = s[Dn] = "auto", a.flexBasis = t.flexBasis || "auto", a.overflow = "visible", a.boxSizing = "border-box", a[Wt] = on(e, ze) + le, a[$t] = on(e, ce) + le, a[ie] = s[Je] = s[mi] = s[_i] = "0", lr(r), s[Wt] = s["max" + cr] = t[Wt], s[$t] = s["max" + An] = t[$t], s[ie] = t[ie], e.parentNode !== n && (e.parentNode.insertBefore(n, e), n.appendChild(e)), e._gsap.swappedIn = !0;
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
}, Un = function(e, n, t, r, o, a, s, f, _, M, k, h, u, m) {
  Ce(e) && (e = e(f)), $e(e) && e.substr(0, 3) === "max" && (e = h + (e.charAt(4) === "=" ? Zr("0" + e.substr(3), t) : 0));
  var X = u ? u.time() : 0, B, G, O;
  if (u && u.seek(0), isNaN(e) || (e = +e), wr(e))
    u && (e = p.utils.mapRange(u.scrollTrigger.start, u.scrollTrigger.end, 0, h, e)), s && Jr(s, t, r, !0);
  else {
    Ce(n) && (n = n(f));
    var K = (e || "0").split(" "), E, Ve, q, x;
    O = Ne(n, f) || z, E = wt(O) || {}, (!E || !E.left && !E.top) && Qe(O).display === "none" && (x = O.style.display, O.style.display = "block", E = wt(O), x ? O.style.display = x : O.style.removeProperty("display")), Ve = Zr(K[0], E[r.d]), q = Zr(K[1] || "0", t), e = E[r.p] - _[r.p] - M + Ve + o - q, s && Jr(s, q, r, t - q < 20 || s._isStart && q > 20), t -= t - q;
  }
  if (m && (f[m] = e || -1e-3, e < 0 && (e = 0)), a) {
    var Ee = e + t, Be = a._isStart;
    B = "scroll" + r.d2, Jr(a, Ee, r, Be && Ee > 20 || !Be && (k ? Math.max(z[B], Ge[B]) : a.parentNode[B]) <= Ee + 1), k && (_ = wt(s), k && (a.style[r.op.p] = _[r.op.p] - r.op.m - a._offset + le));
  }
  return u && O && (B = wt(O), u.seek(h), G = wt(O), u._caScrollDist = B[r.p] - G[r.p], e = e / u._caScrollDist * h), u && u.seek(X), u ? e : Math.round(e);
}, qi = /(webkit|moz|length|cssText|inset)/i, Vn = function(e, n, t, r) {
  if (e.parentNode !== n) {
    var o = e.style, a, s;
    if (n === z) {
      e._stOrig = o.cssText, s = Qe(e);
      for (a in s)
        !+a && !qi.test(a) && s[a] && typeof o[a] == "string" && a !== "0" && (o[a] = s[a]);
      o.top = t, o.left = r;
    } else
      o.cssText = e._stOrig;
    p.core.getCache(e).uncache = 1, n.appendChild(e);
  }
}, ki = function(e, n, t) {
  var r = n, o = r;
  return function(a) {
    var s = Math.round(e());
    return s !== r && s !== o && Math.abs(s - r) > 3 && Math.abs(s - o) > 3 && (a = s, t && t()), o = r, r = Math.round(a), r;
  };
}, Gr = function(e, n, t) {
  var r = {};
  r[n.p] = "+=" + t, p.set(e, r);
}, Kn = function(e, n) {
  var t = Ot(e, n), r = "_scroll" + n.p2, o = function a(s, f, _, M, k) {
    var h = a.tween, u = f.onComplete, m = {};
    _ = _ || t();
    var X = ki(t, _, function() {
      h.kill(), a.tween = 0;
    });
    return k = M && k || 0, M = M || s - _, h && h.kill(), f[r] = s, f.inherit = !1, f.modifiers = m, m[r] = function() {
      return X(_ + M * h.ratio + k * h.ratio * h.ratio);
    }, f.onUpdate = function() {
      P.cache++, a.tween && bt();
    }, f.onComplete = function() {
      a.tween = 0, u && u.call(h);
    }, h = a.tween = p.to(e, f), h;
  };
  return e[r] = t, t.wheelHandler = function() {
    return o.tween && o.tween.kill() && (o.tween = 0);
  }, he(e, "wheel", t.wheelHandler), A.isTouch && he(e, "touchmove", t.wheelHandler), o;
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
    var o = t, a = o.onUpdate, s = o.toggleClass, f = o.id, _ = o.onToggle, M = o.onRefresh, k = o.scrub, h = o.trigger, u = o.pin, m = o.pinSpacing, X = o.invalidateOnRefresh, B = o.anticipatePin, G = o.onScrubComplete, O = o.onSnapComplete, K = o.once, E = o.snap, Ve = o.pinReparent, q = o.pinSpacer, x = o.containerAnimation, Ee = o.fastScrollEnd, Be = o.preventOverlaps, g = t.horizontal || t.containerAnimation && t.horizontal !== !1 ? ze : ce, ue = !k && k !== 0, w = Ne(t.scroller || D), pt = p.core.getCache(w), oe = Ut(w), Te = ("pinType" in t ? t.pinType : Lt(w, "pinType") || oe && "fixed") === "fixed", Me = [t.onEnter, t.onLeave, t.onEnterBack, t.onLeaveBack], N = ue && t.toggleActions.split(" "), ee = "markers" in t ? t.markers : qr.markers, te = oe ? 0 : parseFloat(Qe(w)["border" + g.p2 + cr]) || 0, l = this, se = t.onRefreshInit && function() {
      return t.onRefreshInit(l);
    }, It = Li(w, oe, g), St = Oi(w, oe), Ke = 0, ht = 0, ve = 0, re = Ot(w, g), De, ye, kt, Pe, Ae, I, Z, Fe, He, c, Xe, gt, Ct, U, _t, Et, Yt, fe, Tt, J, et, Ze, mt, ur, ne, Lr, vt, Zt, Jt, Mt, zt, R, Bt, tt, rt, nt, Ft, Qt, yt;
    if (l._startClamp = l._endClamp = !1, l._dir = g, B *= 45, l.scroller = w, l.scroll = x ? x.time.bind(x) : re, Pe = re(), l.vars = t, r = r || t.animation, "refreshPriority" in t && (li = 1, t.refreshPriority === -9999 && (Pr = l)), pt.tweenScroll = pt.tweenScroll || {
      top: Kn(w, ce),
      left: Kn(w, ze)
    }, l.tweenTo = De = pt.tweenScroll[g.p], l.scrubDuration = function(d) {
      Bt = wr(d) && d, Bt ? R ? R.duration(d) : R = p.to(r, {
        ease: "expo",
        totalProgress: "+=0",
        inherit: !1,
        duration: Bt,
        paused: !0,
        onComplete: function() {
          return G && G(l);
        }
      }) : (R && R.progress(1).kill(), R = 0);
    }, r && (r.vars.lazy = !1, r._initted && !l.isReverted || r.vars.immediateRender !== !1 && t.immediateRender !== !1 && r.duration() && r.render(0, !0, !0), l.animation = r.pause(), r.scrollTrigger = l, l.scrubDuration(k), Mt = 0, f || (f = r.vars.id)), E && ((!Xt(E) || E.push) && (E = {
      snapTo: E
    }), "scrollBehavior" in z.style && p.set(oe ? [z, Ge] : w, {
      scrollBehavior: "auto"
    }), P.forEach(function(d) {
      return Ce(d) && d.target === (oe ? F.scrollingElement || Ge : w) && (d.smooth = !1);
    }), kt = Ce(E.snapTo) ? E.snapTo : E.snapTo === "labels" ? Yi(r) : E.snapTo === "labelsDirectional" ? zi(r) : E.directional !== !1 ? function(d, b) {
      return Rn(E.snapTo)(d, ke() - ht < 500 ? 0 : b.direction);
    } : p.utils.snap(E.snapTo), tt = E.duration || {
      min: 0.1,
      max: 2
    }, tt = Xt(tt) ? kr(tt.min, tt.max) : kr(tt, tt), rt = p.delayedCall(E.delay || Bt / 2 || 0.1, function() {
      var d = re(), b = ke() - ht < 500, v = De.tween;
      if ((b || Math.abs(l.getVelocity()) < 10) && !v && !an && Ke !== d) {
        var S = (d - I) / U, de = r && !ue ? r.totalProgress() : S, L = b ? 0 : (de - zt) / (ke() - mr) * 1e3 || 0, Q = p.utils.clamp(-S, 1 - S, er(L / 2) * L / 0.185), we = S + (E.inertia === !1 ? 0 : Q), V, W, H = E, it = H.onStart, $ = H.onInterrupt, qe = H.onComplete;
        if (V = kt(we, l), wr(V) || (V = we), W = Math.max(0, Math.round(I + V * U)), d <= Z && d >= I && W !== d) {
          if (v && !v._initted && v.data <= er(W - d))
            return;
          E.inertia === !1 && (Q = V - S), De(W, {
            duration: tt(er(Math.max(er(we - de), er(V - de)) * 0.185 / L / 0.05 || 0)),
            ease: E.ease || "power3",
            data: er(W - d),
            // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
            onInterrupt: function() {
              return rt.restart(!0) && $ && jt(l, $);
            },
            onComplete: function() {
              l.update(), Ke = re(), r && !ue && (R ? R.resetTo("totalProgress", V, r._tTime / r._tDur) : r.progress(V)), Mt = zt = r && !ue ? r.totalProgress() : l.progress, O && O(l), qe && jt(l, qe);
            }
          }, d, Q * U, W - d - Q * U), it && jt(l, it, De.tween);
        }
      } else l.isActive && Ke !== d && rt.restart(!0);
    }).pause()), f && (Sn[f] = l), h = l.trigger = Ne(h || u !== !0 && u), yt = h && h._gsap && h._gsap.stRevert, yt && (yt = yt(l)), u = u === !0 ? h : Ne(u), $e(s) && (s = {
      targets: h,
      className: s
    }), u && (m === !1 || m === Je || (m = !m && u.parentNode && u.parentNode.style && Qe(u.parentNode).display === "flex" ? !1 : ie), l.pin = u, ye = p.core.getCache(u), ye.spacer ? _t = ye.pinState : (q && (q = Ne(q), q && !q.nodeType && (q = q.current || q.nativeElement), ye.spacerIsNative = !!q, q && (ye.spacerState = $r(q))), ye.spacer = fe = q || F.createElement("div"), fe.classList.add("pin-spacer"), f && fe.classList.add("pin-spacer-" + f), ye.pinState = _t = $r(u)), t.force3D !== !1 && p.set(u, {
      force3D: !0
    }), l.spacer = fe = ye.spacer, Jt = Qe(u), ur = Jt[m + g.os2], J = p.getProperty(u), et = p.quickSetter(u, g.a, le), pn(u, fe, Jt), Yt = $r(u)), ee) {
      gt = Xt(ee) ? Xn(ee, qn) : qn, c = Wr("scroller-start", f, w, g, gt, 0), Xe = Wr("scroller-end", f, w, g, gt, 0, c), Tt = c["offset" + g.op.d2];
      var fr = Ne(Lt(w, "content") || w);
      Fe = this.markerStart = Wr("start", f, fr, g, gt, Tt, 0, x), He = this.markerEnd = Wr("end", f, fr, g, gt, Tt, 0, x), x && (Qt = p.quickSetter([Fe, He], g.a, le)), !Te && !(dt.length && Lt(w, "fixedMarkers") === !0) && (Ii(oe ? z : w), p.set([c, Xe], {
        force3D: !0
      }), Lr = p.quickSetter(c, g.a, le), Zt = p.quickSetter(Xe, g.a, le));
    }
    if (x) {
      var C = x.vars.onUpdate, y = x.vars.onUpdateParams;
      x.eventCallback("onUpdate", function() {
        l.update(0, 0, 1), C && C.apply(x, y || []);
      });
    }
    if (l.previous = function() {
      return T[T.indexOf(l) - 1];
    }, l.next = function() {
      return T[T.indexOf(l) + 1];
    }, l.revert = function(d, b) {
      if (!b)
        return l.kill(!0);
      var v = d !== !1 || !l.enabled, S = Se;
      v !== l.isReverted && (v && (nt = Math.max(re(), l.scroll.rec || 0), ve = l.progress, Ft = r && r.progress()), Fe && [Fe, He, c, Xe].forEach(function(de) {
        return de.style.display = v ? "none" : "block";
      }), v && (Se = l, l.update(v)), u && (!Ve || !l.isActive) && (v ? Ni(u, fe, _t) : pn(u, fe, Qe(u), ne)), v || l.update(v), Se = S, l.isReverted = v);
    }, l.refresh = function(d, b, v, S) {
      if (!((Se || !l.enabled) && !b)) {
        if (u && d && je) {
          he(i, "scrollEnd", yi);
          return;
        }
        !Ye && se && se(l), Se = l, De.tween && !v && (De.tween.kill(), De.tween = 0), R && R.pause(), X && r && (r.revert({
          kill: !1
        }).invalidate(), r.getChildren ? r.getChildren(!0, !0, !1).forEach(function(Dt) {
          return Dt.vars.immediateRender && Dt.render(0, !0, !0);
        }) : r.vars.immediateRender && r.render(0, !0, !0)), l.isReverted || l.revert(!0, !0), l._subPinOffset = !1;
        var de = It(), L = St(), Q = x ? x.duration() : ft(w, g), we = U <= 0.01 || !U, V = 0, W = S || 0, H = Xt(v) ? v.end : t.end, it = t.endTrigger || h, $ = Xt(v) ? v.start : t.start || (t.start === 0 || !h ? 0 : u ? "0 0" : "0 100%"), qe = l.pinnedContainer = t.pinnedContainer && Ne(t.pinnedContainer, l), st = h && Math.max(0, T.indexOf(l)) || 0, ge = st, _e, xe, Nt, Or, be, ae, at, ln, On, dr, lt, pr, Ir;
        for (ee && Xt(v) && (pr = p.getProperty(c, g.p), Ir = p.getProperty(Xe, g.p)); ge-- > 0; )
          ae = T[ge], ae.end || ae.refresh(0, 1) || (Se = l), at = ae.pin, at && (at === h || at === u || at === qe) && !ae.isReverted && (dr || (dr = []), dr.unshift(ae), ae.revert(!0, !0)), ae !== T[ge] && (st--, ge--);
        for (Ce($) && ($ = $(l)), $ = Bn($, "start", l), I = Un($, h, de, g, re(), Fe, c, l, L, te, Te, Q, x, l._startClamp && "_startClamp") || (u ? -1e-3 : 0), Ce(H) && (H = H(l)), $e(H) && !H.indexOf("+=") && (~H.indexOf(" ") ? H = ($e($) ? $.split(" ")[0] : "") + H : (V = Zr(H.substr(2), de), H = $e($) ? $ : (x ? p.utils.mapRange(0, x.duration(), x.scrollTrigger.start, x.scrollTrigger.end, I) : I) + V, it = h)), H = Bn(H, "end", l), Z = Math.max(I, Un(H || (it ? "100% 0" : Q), it, de, g, re() + V, He, Xe, l, L, te, Te, Q, x, l._endClamp && "_endClamp")) || -1e-3, V = 0, ge = st; ge--; )
          ae = T[ge] || {}, at = ae.pin, at && ae.start - ae._pinPush <= I && !x && ae.end > 0 && (_e = ae.end - (l._startClamp ? Math.max(0, ae.start) : ae.start), (at === h && ae.start - ae._pinPush < I || at === qe) && isNaN($) && (V += _e * (1 - ae.progress)), at === u && (W += _e));
        if (I += V, Z += V, l._startClamp && (l._startClamp += V), l._endClamp && !Ye && (l._endClamp = Z || -1e-3, Z = Math.min(Z, ft(w, g))), U = Z - I || (I -= 0.01) && 1e-3, we && (ve = p.utils.clamp(0, 1, p.utils.normalize(I, Z, nt))), l._pinPush = W, Fe && V && (_e = {}, _e[g.a] = "+=" + V, qe && (_e[g.p] = "-=" + re()), p.set([Fe, He], _e)), u && !(bn && l.end >= ft(w, g)))
          _e = Qe(u), Or = g === ce, Nt = re(), Ze = parseFloat(J(g.a)) + W, !Q && Z > 1 && (lt = (oe ? F.scrollingElement || Ge : w).style, lt = {
            style: lt,
            value: lt["overflow" + g.a.toUpperCase()]
          }, oe && Qe(z)["overflow" + g.a.toUpperCase()] !== "scroll" && (lt.style["overflow" + g.a.toUpperCase()] = "scroll")), pn(u, fe, _e), Yt = $r(u), xe = wt(u, !0), ln = Te && Ot(w, Or ? ze : ce)(), m ? (ne = [m + g.os2, U + W + le], ne.t = fe, ge = m === ie ? on(u, g) + U + W : 0, ge && (ne.push(g.d, ge + le), fe.style.flexBasis !== "auto" && (fe.style.flexBasis = ge + le)), lr(ne), qe && T.forEach(function(Dt) {
            Dt.pin === qe && Dt.vars.pinSpacing !== !1 && (Dt._subPinOffset = !0);
          }), Te && re(nt)) : (ge = on(u, g), ge && fe.style.flexBasis !== "auto" && (fe.style.flexBasis = ge + le)), Te && (be = {
            top: xe.top + (Or ? Nt - I : ln) + le,
            left: xe.left + (Or ? ln : Nt - I) + le,
            boxSizing: "border-box",
            position: "fixed"
          }, be[Wt] = be["max" + cr] = Math.ceil(xe.width) + le, be[$t] = be["max" + An] = Math.ceil(xe.height) + le, be[Je] = be[Je + Mr] = be[Je + Er] = be[Je + Dr] = be[Je + Tr] = "0", be[ie] = _e[ie], be[ie + Mr] = _e[ie + Mr], be[ie + Er] = _e[ie + Er], be[ie + Dr] = _e[ie + Dr], be[ie + Tr] = _e[ie + Tr], Et = Xi(_t, be, Ve), Ye && re(0)), r ? (On = r._initted, cn(1), r.render(r.duration(), !0, !0), mt = J(g.a) - Ze + U + W, vt = Math.abs(U - mt) > 1, Te && vt && Et.splice(Et.length - 2, 2), r.render(0, !0, !0), On || r.invalidate(!0), r.parent || r.totalTime(r.totalTime()), cn(0)) : mt = U, lt && (lt.value ? lt.style["overflow" + g.a.toUpperCase()] = lt.value : lt.style.removeProperty("overflow-" + g.a));
        else if (h && re() && !x)
          for (xe = h.parentNode; xe && xe !== z; )
            xe._pinOffset && (I -= xe._pinOffset, Z -= xe._pinOffset), xe = xe.parentNode;
        dr && dr.forEach(function(Dt) {
          return Dt.revert(!1, !0);
        }), l.start = I, l.end = Z, Pe = Ae = Ye ? nt : re(), !x && !Ye && (Pe < nt && re(nt), l.scroll.rec = 0), l.revert(!1, !0), ht = ke(), rt && (Ke = -1, rt.restart(!0)), Se = 0, r && ue && (r._initted || Ft) && r.progress() !== Ft && r.progress(Ft || 0, !0).render(r.time(), !0, !0), (we || ve !== l.progress || x || X || r && !r._initted) && (r && !ue && (r._initted || ve || r.vars.immediateRender !== !1) && r.totalProgress(x && I < -1e-3 && !ve ? p.utils.normalize(I, Z, 0) : ve, !0), l.progress = we || (Pe - I) / U === ve ? 0 : ve), u && m && (fe._pinOffset = Math.round(l.progress * mt)), R && R.invalidate(), isNaN(pr) || (pr -= p.getProperty(c, g.p), Ir -= p.getProperty(Xe, g.p), Gr(c, g, pr), Gr(Fe, g, pr - (S || 0)), Gr(Xe, g, Ir), Gr(He, g, Ir - (S || 0))), we && !Ye && l.update(), M && !Ye && !Ct && (Ct = !0, M(l), Ct = !1);
      }
    }, l.getVelocity = function() {
      return (re() - Ae) / (ke() - mr) * 1e3 || 0;
    }, l.endAnimation = function() {
      gr(l.callbackAnimation), r && (R ? R.progress(1) : r.paused() ? ue || gr(r, l.direction < 0, 1) : gr(r, r.reversed()));
    }, l.labelToScroll = function(d) {
      return r && r.labels && (I || l.refresh() || I) + r.labels[d] / r.duration() * U || 0;
    }, l.getTrailing = function(d) {
      var b = T.indexOf(l), v = l.direction > 0 ? T.slice(0, b).reverse() : T.slice(b + 1);
      return ($e(d) ? v.filter(function(S) {
        return S.vars.preventOverlaps === d;
      }) : v).filter(function(S) {
        return l.direction > 0 ? S.end <= I : S.start >= Z;
      });
    }, l.update = function(d, b, v) {
      if (!(x && !v && !d)) {
        var S = Ye === !0 ? nt : l.scroll(), de = d ? 0 : (S - I) / U, L = de < 0 ? 0 : de > 1 ? 1 : de || 0, Q = l.progress, we, V, W, H, it, $, qe, st;
        if (b && (Ae = Pe, Pe = x ? re() : S, E && (zt = Mt, Mt = r && !ue ? r.totalProgress() : L)), B && u && !Se && !Fr && je && (!L && I < S + (S - Ae) / (ke() - mr) * B ? L = 1e-4 : L === 1 && Z > S + (S - Ae) / (ke() - mr) * B && (L = 0.9999)), L !== Q && l.enabled) {
          if (we = l.isActive = !!L && L < 1, V = !!Q && Q < 1, $ = we !== V, it = $ || !!L != !!Q, l.direction = L > Q ? 1 : -1, l.progress = L, it && !Se && (W = L && !Q ? 0 : L === 1 ? 1 : Q === 1 ? 2 : 3, ue && (H = !$ && N[W + 1] !== "none" && N[W + 1] || N[W], st = r && (H === "complete" || H === "reset" || H in r))), Be && ($ || st) && (st || k || !r) && (Ce(Be) ? Be(l) : l.getTrailing(Be).forEach(function(Nt) {
            return Nt.endAnimation();
          })), ue || (R && !Se && !Fr ? (R._dp._time - R._start !== R._time && R.render(R._dp._time - R._start), R.resetTo ? R.resetTo("totalProgress", L, r._tTime / r._tDur) : (R.vars.totalProgress = L, R.invalidate().restart())) : r && r.totalProgress(L, !!(Se && (ht || d)))), u) {
            if (d && m && (fe.style[m + g.os2] = ur), !Te)
              et(yr(Ze + mt * L));
            else if (it) {
              if (qe = !d && L > Q && Z + 1 > S && S + 1 >= ft(w, g), Ve)
                if (!d && (we || qe)) {
                  var ge = wt(u, !0), _e = S - I;
                  Vn(u, z, ge.top + (g === ce ? _e : 0) + le, ge.left + (g === ce ? 0 : _e) + le);
                } else
                  Vn(u, fe);
              lr(we || qe ? Et : Yt), vt && L < 1 && we || et(Ze + (L === 1 && !qe ? mt : 0));
            }
          }
          E && !De.tween && !Se && !Fr && rt.restart(!0), s && ($ || K && L && (L < 1 || !un)) && Ar(s.targets).forEach(function(Nt) {
            return Nt.classList[we || K ? "add" : "remove"](s.className);
          }), a && !ue && !d && a(l), it && !Se ? (ue && (st && (H === "complete" ? r.pause().totalProgress(1) : H === "reset" ? r.restart(!0).pause() : H === "restart" ? r.restart(!0) : r[H]()), a && a(l)), ($ || !un) && (_ && $ && jt(l, _), Me[W] && jt(l, Me[W]), K && (L === 1 ? l.kill(!1, 1) : Me[W] = 0), $ || (W = L === 1 ? 1 : 3, Me[W] && jt(l, Me[W]))), Ee && !we && Math.abs(l.getVelocity()) > (wr(Ee) ? Ee : 2500) && (gr(l.callbackAnimation), R ? R.progress(1) : gr(r, H === "reverse" ? 1 : !L, 1))) : ue && a && !Se && a(l);
        }
        if (Zt) {
          var xe = x ? S / x.duration() * (x._caScrollDist || 0) : S;
          Lr(xe + (c._isFlipped ? 1 : 0)), Zt(xe);
        }
        Qt && Qt(-S / x.duration() * (x._caScrollDist || 0));
      }
    }, l.enable = function(d, b) {
      l.enabled || (l.enabled = !0, he(w, "resize", xr), oe || he(w, "scroll", tr), se && he(i, "refreshInit", se), d !== !1 && (l.progress = ve = 0, Pe = Ae = Ke = re()), b !== !1 && l.refresh());
    }, l.getTween = function(d) {
      return d && De ? De.tween : R;
    }, l.setPositions = function(d, b, v, S) {
      if (x) {
        var de = x.scrollTrigger, L = x.duration(), Q = de.end - de.start;
        d = de.start + Q * d / L, b = de.start + Q * b / L;
      }
      l.refresh(!1, !1, {
        start: Fn(d, v && !!l._startClamp),
        end: Fn(b, v && !!l._endClamp)
      }, S), l.update();
    }, l.adjustPinSpacing = function(d) {
      if (ne && d) {
        var b = ne.indexOf(g.d) + 1;
        ne[b] = parseFloat(ne[b]) + d + le, ne[1] = parseFloat(ne[1]) + d + le, lr(ne);
      }
    }, l.disable = function(d, b) {
      if (d !== !1 && l.revert(!0, !0), l.enabled && (l.enabled = l.isActive = !1, b || R && R.pause(), nt = 0, ye && (ye.uncache = 1), se && pe(i, "refreshInit", se), rt && (rt.pause(), De.tween && De.tween.kill() && (De.tween = 0)), !oe)) {
        for (var v = T.length; v--; )
          if (T[v].scroller === w && T[v] !== l)
            return;
        pe(w, "resize", xr), oe || pe(w, "scroll", tr);
      }
    }, l.kill = function(d, b) {
      l.disable(d, b), R && !b && R.kill(), f && delete Sn[f];
      var v = T.indexOf(l);
      v >= 0 && T.splice(v, 1), v === Ie && Qr > 0 && Ie--, v = 0, T.forEach(function(S) {
        return S.scroller === l.scroller && (v = 1);
      }), v || Ye || (l.scroll.rec = 0), r && (r.scrollTrigger = null, d && r.revert({
        kill: !1
      }), b || r.kill()), Fe && [Fe, He, c, Xe].forEach(function(S) {
        return S.parentNode && S.parentNode.removeChild(S);
      }), Pr === l && (Pr = 0), u && (ye && (ye.uncache = 1), v = 0, T.forEach(function(S) {
        return S.pin === u && v++;
      }), v || (ye.spacer = 0)), t.onKill && t.onKill(l);
    }, T.push(l), l.enable(!1, !1), yt && yt(l), r && r.add && !U) {
      var Y = l.update;
      l.update = function() {
        l.update = Y, P.cache++, I || Z || l.refresh();
      }, p.delayedCall(0.01, l.update), U = 0.01, I = Z = 0;
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
    vr = 0, T.forEach(function(a) {
      return a[r ? "kill" : "disable"](t);
    }), pe(D, "wheel", tr), pe(F, "scroll", tr), clearInterval(Br), pe(F, "touchcancel", ut), pe(z, "touchstart", ut), Hr(pe, F, "pointerdown,touchstart,mousedown", Nn), Hr(pe, F, "pointerup,touchend,mouseup", Hn), nn.kill(), Nr(pe);
    for (var o = 0; o < P.length; o += 3)
      Xr(pe, P[o], P[o + 1]), Xr(pe, P[o], P[o + 2]);
  }, i.enable = function() {
    if (D = window, F = document, Ge = F.documentElement, z = F.body, p) {
      if (Ar = p.utils.toArray, kr = p.utils.clamp, xn = p.core.context || ut, cn = p.core.suppressOverwrites || ut, Tn = D.history.scrollRestoration || "auto", kn = D.pageYOffset || 0, p.core.globals("ScrollTrigger", i), z) {
        vr = 1, ar = document.createElement("div"), ar.style.height = "100vh", ar.style.position = "absolute", Si(), Ri(), j.register(p), i.isTouch = j.isTouch, Pt = j.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), wn = j.isTouch === 1, he(D, "wheel", tr), En = [D, F, Ge, z], p.matchMedia ? (i.matchMedia = function(M) {
          var k = p.matchMedia(), h;
          for (h in M)
            k.add(h, M[h]);
          return k;
        }, p.addEventListener("matchMediaInit", function() {
          xi(), Ln();
        }), p.addEventListener("matchMediaRevert", function() {
          return wi();
        }), p.addEventListener("matchMedia", function() {
          qt(0, 1), Kt("matchMedia");
        }), p.matchMedia().add("(orientation: portrait)", function() {
          return dn(), dn;
        })) : console.warn("Requires GSAP 3.11.0 or later"), dn(), he(F, "scroll", tr);
        var t = z.hasAttribute("style"), r = z.style, o = r.borderTopStyle, a = p.core.Animation.prototype, s, f;
        for (a.revert || Object.defineProperty(a, "revert", {
          value: function() {
            return this.time(-0.01, !0);
          }
        }), r.borderTopStyle = "solid", s = wt(z), ce.m = Math.round(s.top + ce.sc()) || 0, ze.m = Math.round(s.left + ze.sc()) || 0, o ? r.borderTopStyle = o : r.removeProperty("border-top-style"), t || (z.setAttribute("style", ""), z.removeAttribute("style")), Br = setInterval(Wn, 250), p.delayedCall(0.5, function() {
          return Fr = 0;
        }), he(F, "touchcancel", ut), he(z, "touchstart", ut), Hr(he, F, "pointerdown,touchstart,mousedown", Nn), Hr(he, F, "pointerup,touchend,mouseup", Hn), yn = p.utils.checkPrefix("transform"), jr.push(yn), rr = ke(), nn = p.delayedCall(0.2, qt).pause(), nr = [F, "visibilitychange", function() {
          var M = D.innerWidth, k = D.innerHeight;
          F.hidden ? (Yn = M, zn = k) : (Yn !== M || zn !== k) && xr();
        }, F, "DOMContentLoaded", qt, D, "load", qt, D, "resize", xr], Nr(he), T.forEach(function(M) {
          return M.enable(0, 1);
        }), f = 0; f < P.length; f += 3)
          Xr(pe, P[f], P[f + 1]), Xr(pe, P[f], P[f + 2]);
      } else if (F) {
        var _ = function M() {
          i.enable(), F.removeEventListener("DOMContentLoaded", M);
        };
        F.addEventListener("DOMContentLoaded", _);
      }
    }
  }, i.config = function(t) {
    "limitCallbacks" in t && (un = !!t.limitCallbacks);
    var r = t.syncInterval;
    r && clearInterval(Br) || (Br = r) && setInterval(Wn, r), "ignoreMobileResize" in t && (wn = i.isTouch === 1 && t.ignoreMobileResize), "autoRefreshEvents" in t && (Nr(pe) || Nr(he, t.autoRefreshEvents || "none"), ci = (t.autoRefreshEvents + "").indexOf("resize") === -1);
  }, i.scrollerProxy = function(t, r) {
    var o = Ne(t), a = P.indexOf(o), s = Ut(o);
    ~a && P.splice(a, s ? 6 : 2), r && (s ? dt.unshift(D, r, z, r, Ge, r) : dt.unshift(o, r));
  }, i.clearMatchMedia = function(t) {
    T.forEach(function(r) {
      return r._ctx && r._ctx.query === t && r._ctx.kill(!0, !0);
    });
  }, i.isInViewport = function(t, r, o) {
    var a = ($e(t) ? Ne(t) : t).getBoundingClientRect(), s = a[o ? Wt : $t] * r || 0;
    return o ? a.right - s > 0 && a.left + s < D.innerWidth : a.bottom - s > 0 && a.top + s < D.innerHeight;
  }, i.positionInViewport = function(t, r, o) {
    $e(t) && (t = Ne(t));
    var a = t.getBoundingClientRect(), s = a[o ? Wt : $t], f = r == null ? s / 2 : r in sn ? sn[r] * s : ~r.indexOf("%") ? parseFloat(r) * s / 100 : parseFloat(r) || 0;
    return o ? (a.left + f) / D.innerWidth : (a.top + f) / D.innerHeight;
  }, i.killAll = function(t) {
    if (T.slice(0).forEach(function(o) {
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
  return ++P.cache && bt(i === !0 ? 2 : 0);
};
A.clearScrollMemory = bi;
A.maxScroll = function(i, e) {
  return ft(i, e ? ze : ce);
};
A.getScrollFunc = function(i, e) {
  return Ot(Ne(i), e ? ze : ce);
};
A.getById = function(i) {
  return Sn[i];
};
A.getAll = function() {
  return T.filter(function(i) {
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
  var n = [], t = {}, r = e.interval || 0.016, o = e.batchMax || 1e9, a = function(_, M) {
    var k = [], h = [], u = p.delayedCall(r, function() {
      M(k, h), k = [], h = [];
    }).pause();
    return function(m) {
      k.length || u.restart(!0), k.push(m.trigger), h.push(m), o <= k.length && u.progress(1);
    };
  }, s;
  for (s in e)
    t[s] = s.substr(0, 2) === "on" && Ce(e[s]) && s !== "onRefreshInit" ? a(s, e[s]) : e[s];
  return Ce(o) && (o = o(), he(A, "refresh", function() {
    return o = e.batchMax();
  })), Ar(i).forEach(function(f) {
    var _ = {};
    for (s in t)
      _[s] = t[s];
    _.trigger = f, n.push(A.create(_));
  }), n;
};
var Zn = function(e, n, t, r) {
  return n > r ? e(r) : n < 0 && e(0), t > r ? (r - n) / (t - n) : t < 0 ? n / (n - t) : 1;
}, hn = function i(e, n) {
  n === !0 ? e.style.removeProperty("touch-action") : e.style.touchAction = n === !0 ? "auto" : n ? "pan-" + n + (j.isTouch ? " pinch-zoom" : "") : "none", e === Ge && i(z, n);
}, Ur = {
  auto: 1,
  scroll: 1
}, Wi = function(e) {
  var n = e.event, t = e.target, r = e.axis, o = (n.changedTouches ? n.changedTouches[0] : n).target, a = o._gsap || p.core.getCache(o), s = ke(), f;
  if (!a._isScrollT || s - a._isScrollT > 2e3) {
    for (; o && o !== z && (o.scrollHeight <= o.clientHeight && o.scrollWidth <= o.clientWidth || !(Ur[(f = Qe(o)).overflowY] || Ur[f.overflowX])); )
      o = o.parentNode;
    a._isScroll = o && o !== t && !Ut(o) && (Ur[(f = Qe(o)).overflowY] || Ur[f.overflowX]), a._isScrollT = s;
  }
  (a._isScroll || r === "x") && (n.stopPropagation(), n._gsapAllow = !0);
}, Ci = function(e, n, t, r) {
  return j.create({
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
      return t && he(F, j.eventTypes[0], Qn, !1, !0);
    },
    onDisable: function() {
      return pe(F, j.eventTypes[0], Qn, !0);
    }
  });
}, $i = /(input|label|select|textarea)/i, Jn, Qn = function(e) {
  var n = $i.test(e.target.tagName);
  (n || Jn) && (e._gsapAllow = !0, Jn = n);
}, Gi = function(e) {
  Xt(e) || (e = {}), e.preventDefault = e.isNormalizer = e.allowClicks = !0, e.type || (e.type = "wheel,touch"), e.debounce = !!e.debounce, e.id = e.id || "normalizer";
  var n = e, t = n.normalizeScrollX, r = n.momentum, o = n.allowNestedScroll, a = n.onRelease, s, f, _ = Ne(e.target) || Ge, M = p.core.globals().ScrollSmoother, k = M && M.get(), h = Pt && (e.content && Ne(e.content) || k && e.content !== !1 && !k.smooth() && k.content()), u = Ot(_, ce), m = Ot(_, ze), X = 1, B = (j.isTouch && D.visualViewport ? D.visualViewport.scale * D.visualViewport.width : D.outerWidth) / D.innerWidth, G = 0, O = Ce(r) ? function() {
    return r(s);
  } : function() {
    return r || 2.8;
  }, K, E, Ve = Ci(_, e.type, !0, o), q = function() {
    return E = !1;
  }, x = ut, Ee = ut, Be = function() {
    f = ft(_, ce), Ee = kr(Pt ? 1 : 0, f), t && (x = kr(0, ft(_, ze))), K = Gt;
  }, g = function() {
    h._gsap.y = yr(parseFloat(h._gsap.y) + u.offset) + "px", h.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(h._gsap.y) + ", 0, 1)", u.offset = u.cacheID = 0;
  }, ue = function() {
    if (E) {
      requestAnimationFrame(q);
      var ee = yr(s.deltaY / 2), te = Ee(u.v - ee);
      if (h && te !== u.v + u.offset) {
        u.offset = te - u.v;
        var l = yr((parseFloat(h && h._gsap.y) || 0) - u.offset);
        h.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + l + ", 0, 1)", h._gsap.y = l + "px", u.cacheID = P.cache, bt();
      }
      return !0;
    }
    u.offset && g(), E = !0;
  }, w, pt, oe, Te, Me = function() {
    Be(), w.isActive() && w.vars.scrollY > f && (u() > f ? w.progress(1) && u(f) : w.resetTo("scrollY", f));
  };
  return h && p.set(h, {
    y: "+=0"
  }), e.ignoreCheck = function(N) {
    return Pt && N.type === "touchmove" && ue() || X > 1.05 && N.type !== "touchstart" || s.isGesturing || N.touches && N.touches.length > 1;
  }, e.onPress = function() {
    E = !1;
    var N = X;
    X = yr((D.visualViewport && D.visualViewport.scale || 1) / B), w.pause(), N !== X && hn(_, X > 1.01 ? !0 : t ? !1 : "x"), pt = m(), oe = u(), Be(), K = Gt;
  }, e.onRelease = e.onGestureStart = function(N, ee) {
    if (u.offset && g(), !ee)
      Te.restart(!0);
    else {
      P.cache++;
      var te = O(), l, se;
      t && (l = m(), se = l + te * 0.05 * -N.velocityX / 0.227, te *= Zn(m, l, se, ft(_, ze)), w.vars.scrollX = x(se)), l = u(), se = l + te * 0.05 * -N.velocityY / 0.227, te *= Zn(u, l, se, ft(_, ce)), w.vars.scrollY = Ee(se), w.invalidate().duration(te).play(0.01), (Pt && w.vars.scrollY >= f || l >= f - 1) && p.to({}, {
        onUpdate: Me,
        duration: te
      });
    }
    a && a(N);
  }, e.onWheel = function() {
    w._ts && w.pause(), ke() - G > 1e3 && (K = 0, G = ke());
  }, e.onChange = function(N, ee, te, l, se) {
    if (Gt !== K && Be(), ee && t && m(x(l[2] === ee ? pt + (N.startX - N.x) : m() + ee - l[1])), te) {
      u.offset && g();
      var It = se[2] === te, St = It ? oe + N.startY - N.y : u() + te - se[1], Ke = Ee(St);
      It && St !== Ke && (oe += Ke - St), u(Ke);
    }
    (te || ee) && bt();
  }, e.onEnable = function() {
    hn(_, t ? !1 : "x"), A.addEventListener("refresh", Me), he(D, "resize", Me), u.smooth && (u.target.style.scrollBehavior = "auto", u.smooth = m.smooth = !1), Ve.enable();
  }, e.onDisable = function() {
    hn(_, !0), pe(D, "resize", Me), A.removeEventListener("refresh", Me), Ve.kill();
  }, e.lockAxis = e.lockAxis !== !1, s = new j(e), s.iOS = Pt, Pt && !u() && u(1), Pt && p.ticker.add(ut), Te = s._dc, w = p.to(s, {
    ease: "power4",
    paused: !0,
    inherit: !1,
    scrollX: t ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: ki(u, u(), function() {
        return w.pause();
      })
    },
    onUpdate: bt,
    onComplete: Te.vars.onComplete
  }), s;
};
A.sort = function(i) {
  if (Ce(i))
    return T.sort(i);
  var e = D.pageYOffset || 0;
  return A.getAll().forEach(function(n) {
    return n._sortY = n.trigger ? e + n.trigger.getBoundingClientRect().top : n.start + D.innerHeight;
  }), T.sort(i || function(n, t) {
    return (n.vars.refreshPriority || 0) * -1e6 + (n.vars.containerAnimation ? 1e6 : n._sortY) - ((t.vars.containerAnimation ? 1e6 : t._sortY) + (t.vars.refreshPriority || 0) * -1e6);
  });
};
A.observe = function(i) {
  return new j(i);
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
  var e = i instanceof j ? i : Gi(i);
  return Oe && Oe.target === e.target && Oe.kill(), Ut(e.target) && (Oe = e), e;
};
A.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp: vn,
  _inputObserver: Ci,
  _scrollers: P,
  _proxies: dt,
  bridge: {
    // when normalizeScroll sets the scroll position (ss = setScroll)
    ss: function() {
      je || Kt("scrollStart"), je = ke();
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
  let a = !1, s = !1;
  const f = (O) => {
    if (!a || o.matches) return;
    const K = O.target;
    !K || e.contains(K) || i.contains(K) || u();
  }, _ = (O) => {
    O.key !== "Escape" || !a || (O.preventDefault(), u(!0));
  }, M = () => {
    s || (document.addEventListener("click", f), document.addEventListener("keydown", _), s = !0);
  }, k = () => {
    s && (document.removeEventListener("click", f), document.removeEventListener("keydown", _), s = !1);
  }, h = () => {
    e.hidden = !a, i.setAttribute("aria-expanded", String(a)), i.setAttribute("aria-label", a ? "Zamknij menu główne" : "Otwórz menu główne"), n == null || n.classList.toggle("hidden", a), t == null || t.classList.toggle("hidden", !a), a ? M() : k();
  }, u = (O = !1) => {
    if (!a) {
      h();
      return;
    }
    a = !1, h(), O && i.focus();
  }, m = () => {
    a = !a, h();
  }, X = () => {
    m();
  }, B = () => {
    u();
  }, G = () => {
    a = !1, h();
  };
  i.addEventListener("click", X), r.forEach((O) => {
    O.addEventListener("click", B);
  }), document.addEventListener("click", f), document.addEventListener("keydown", _), o.addEventListener("change", G), _r = () => {
    i.removeEventListener("click", X), r.forEach((O) => {
      O.removeEventListener("click", B);
    }), k(), o.removeEventListener("change", G);
  }, h();
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
      const _ = f === s;
      f.classList.toggle("is-selected", _), _ ? f.setAttribute("aria-current", "true") : f.removeAttribute("aria-current");
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
    const _ = f.closest(".system-pill[id]");
    if (_) {
      if (f.closest(Ui))
        return;
      t !== _.id && (r(_), jn(_.id));
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
