import { g as Qr } from "./index-9nJrthwM.js";
function Co(i, e) {
  for (var n = 0; n < e.length; n++) {
    var t = e[n];
    t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(i, t.key, t);
  }
}
function So(i, e, n) {
  return e && Co(i.prototype, e), i;
}
/*!
 * Observer 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var ve, $r, qe, Dt, Rt, or, Jn, Nt, ir, Qn, xt, it, jn, eo = function() {
  return ve || typeof window < "u" && (ve = window.gsap) && ve.registerPlugin && ve;
}, to = 1, nr = [], P = [], ft = [], xr = Date.now, dn = function(e, n) {
  return n;
}, To = function() {
  var e = ir.core, n = e.bridge || {}, t = e._scrollers, r = e._proxies;
  t.push.apply(t, P), r.push.apply(r, ft), P = t, ft = r, dn = function(u, l) {
    return n[u](l);
  };
}, Ot = function(e, n) {
  return ~ft.indexOf(e) && ft[ft.indexOf(e) + 1][n];
}, br = function(e) {
  return !!~Qn.indexOf(e);
}, Ae = function(e, n, t, r, o) {
  return e.addEventListener(n, t, {
    passive: r !== !1,
    capture: !!o
  });
}, Oe = function(e, n, t, r) {
  return e.removeEventListener(n, t, !!r);
}, Lr = "scrollLeft", Yr = "scrollTop", gn = function() {
  return xt && xt.isPressed || P.cache++;
}, jr = function(e, n) {
  var t = function r(o) {
    if (o || o === 0) {
      to && (qe.history.scrollRestoration = "manual");
      var u = xt && xt.isPressed;
      o = r.v = Math.round(o) || (xt && xt.iOS ? 1 : 0), e(o), r.cacheID = P.cache, u && dn("ss", o);
    } else (n || P.cache !== r.cacheID || dn("ref")) && (r.cacheID = P.cache, r.v = e());
    return r.v + r.offset;
  };
  return t.offset = 0, e && t;
}, Ie = {
  s: Lr,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: jr(function(i) {
    return arguments.length ? qe.scrollTo(i, ae.sc()) : qe.pageXOffset || Dt[Lr] || Rt[Lr] || or[Lr] || 0;
  })
}, ae = {
  s: Yr,
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: Ie,
  sc: jr(function(i) {
    return arguments.length ? qe.scrollTo(Ie.sc(), i) : qe.pageYOffset || Dt[Yr] || Rt[Yr] || or[Yr] || 0;
  })
}, Ne = function(e, n) {
  return (n && n._ctx && n._ctx.selector || ve.utils.toArray)(e)[0] || (typeof e == "string" && ve.config().nullTargetWarn !== !1 ? console.warn("Element not found:", e) : null);
}, ko = function(e, n) {
  for (var t = n.length; t--; )
    if (n[t] === e || n[t].contains(e))
      return !0;
  return !1;
}, At = function(e, n) {
  var t = n.s, r = n.sc;
  br(e) && (e = Dt.scrollingElement || Rt);
  var o = P.indexOf(e), u = r === ae.sc ? 1 : 2;
  !~o && (o = P.push(e) - 1), P[o + u] || Ae(e, "scroll", gn);
  var l = P[o + u], p = l || (P[o + u] = jr(Ot(e, t), !0) || (br(e) ? r : jr(function(S) {
    return arguments.length ? e[t] = S : e[t];
  })));
  return p.target = e, l || (p.smooth = ve.getProperty(e, "scrollBehavior") === "smooth"), p;
}, hn = function(e, n, t) {
  var r = e, o = e, u = xr(), l = u, p = n || 50, S = Math.max(500, p * 3), O = function(v, U) {
    var N = xr();
    U || N - u > p ? (o = r, r = v, l = u, u = N) : t ? r += v : r = o + (v - o) / (N - l) * (u - l);
  }, k = function() {
    o = r = t ? 0 : r, l = u = 0;
  }, g = function(v) {
    var U = l, N = o, ne = xr();
    return (v || v === 0) && v !== r && O(v), u === l || ne - l > S ? 0 : (r + (t ? N : -N)) / ((t ? ne : u) - U) * 1e3;
  };
  return {
    update: O,
    reset: k,
    getVelocity: g
  };
}, dr = function(e, n) {
  return n && !e._gsapAllow && e.cancelable !== !1 && e.preventDefault(), e.changedTouches ? e.changedTouches[0] : e;
}, On = function(e) {
  var n = Math.max.apply(Math, e), t = Math.min.apply(Math, e);
  return Math.abs(n) >= Math.abs(t) ? n : t;
}, ro = function() {
  ir = ve.core.globals().ScrollTrigger, ir && ir.core && To();
}, no = function(e) {
  return ve = e || eo(), !$r && ve && typeof document < "u" && document.body && (qe = window, Dt = document, Rt = Dt.documentElement, or = Dt.body, Qn = [qe, Dt, Rt, or], ve.utils.clamp, jn = ve.core.context || function() {
  }, Nt = "onpointerenter" in or ? "pointer" : "mouse", Jn = J.isTouch = qe.matchMedia && qe.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in qe || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, it = J.eventTypes = ("ontouchstart" in Rt ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in Rt ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
    return to = 0;
  }, 500), $r = 1), ir || ro(), $r;
};
Ie.op = ae;
P.cache = 0;
var J = /* @__PURE__ */ (function() {
  function i(n) {
    this.init(n);
  }
  var e = i.prototype;
  return e.init = function(t) {
    $r || no(ve) || console.warn("Please gsap.registerPlugin(Observer)"), ir || ro();
    var r = t.tolerance, o = t.dragMinimum, u = t.type, l = t.target, p = t.lineHeight, S = t.debounce, O = t.preventDefault, k = t.onStop, g = t.onStopDelay, c = t.ignore, v = t.wheelSpeed, U = t.event, N = t.onDragStart, ne = t.onDragEnd, W = t.onDrag, ge = t.onPress, T = t.onRelease, Ve = t.onRight, X = t.onLeft, x = t.onUp, ke = t.onDown, ze = t.onChangeX, h = t.onChangeY, ue = t.onChange, y = t.onToggleX, pt = t.onToggleY, oe = t.onHover, Ee = t.onHoverEnd, Me = t.onMove, z = t.ignoreCheck, Q = t.isNormalizer, j = t.onGestureStart, s = t.onGestureEnd, ie = t.onWheel, Lt = t.onEnable, wt = t.onDisable, Ke = t.onClick, dt = t.scrollSpeed, me = t.capture, ee = t.allowClicks, Pe = t.lockAxis, ye = t.onLockAxis;
    this.target = l = Ne(l) || Rt, this.vars = t, c && (c = ve.utils.toArray(c)), r = r || 1e-9, o = o || 0, v = v || 1, dt = dt || 1, u = u || "wheel,touch,pointer", S = S !== !1, p || (p = parseFloat(qe.getComputedStyle(or).lineHeight) || 22);
    var Ct, De, Re, L, V, Be, Xe, a = this, He = 0, gt = 0, St = t.passive || !O && t.passive !== !1, $ = At(l, Ie), ht = At(l, ae), Tt = $(), Yt = ht(), ce = ~u.indexOf("touch") && !~u.indexOf("pointer") && it[0] === "pointerdown", kt = br(l), K = l.ownerDocument || Dt, et = [0, 0, 0], Ze = [0, 0, 0], _t = 0, ur = function() {
      return _t = xr();
    }, te = function(m, Y) {
      return (a.event = m) && c && ko(m.target, c) || Y && ce && m.pointerType !== "touch" || z && z(m, Y);
    }, Rr = function() {
      a._vx.reset(), a._vy.reset(), De.pause(), k && k(a);
    }, vt = function() {
      var m = a.deltaX = On(et), Y = a.deltaY = On(Ze), f = Math.abs(m) >= r, b = Math.abs(Y) >= r;
      ue && (f || b) && ue(a, m, Y, et, Ze), f && (Ve && a.deltaX > 0 && Ve(a), X && a.deltaX < 0 && X(a), ze && ze(a), y && a.deltaX < 0 != He < 0 && y(a), He = a.deltaX, et[0] = et[1] = et[2] = 0), b && (ke && a.deltaY > 0 && ke(a), x && a.deltaY < 0 && x(a), h && h(a), pt && a.deltaY < 0 != gt < 0 && pt(a), gt = a.deltaY, Ze[0] = Ze[1] = Ze[2] = 0), (L || Re) && (Me && Me(a), Re && (N && Re === 1 && N(a), W && W(a), Re = 0), L = !1), Be && !(Be = !1) && ye && ye(a), V && (ie(a), V = !1), Ct = 0;
    }, Kt = function(m, Y, f) {
      et[f] += m, Ze[f] += Y, a._vx.update(m), a._vy.update(Y), S ? Ct || (Ct = requestAnimationFrame(vt)) : vt();
    }, Zt = function(m, Y) {
      Pe && !Xe && (a.axis = Xe = Math.abs(m) > Math.abs(Y) ? "x" : "y", Be = !0), Xe !== "y" && (et[2] += m, a._vx.update(m, !0)), Xe !== "x" && (Ze[2] += Y, a._vy.update(Y, !0)), S ? Ct || (Ct = requestAnimationFrame(vt)) : vt();
    }, Et = function(m) {
      if (!te(m, 1)) {
        m = dr(m, O);
        var Y = m.clientX, f = m.clientY, b = Y - a.x, _ = f - a.y, w = a.isDragging;
        a.x = Y, a.y = f, (w || (b || _) && (Math.abs(a.startX - Y) >= o || Math.abs(a.startY - f) >= o)) && (Re || (Re = w ? 2 : 1), w || (a.isDragging = !0), Zt(b, _));
      }
    }, Ft = a.onPress = function(C) {
      te(C, 1) || C && C.button || (a.axis = Xe = null, De.pause(), a.isPressed = !0, C = dr(C), He = gt = 0, a.startX = a.x = C.clientX, a.startY = a.y = C.clientY, a._vx.reset(), a._vy.reset(), Ae(Q ? l : K, it[1], Et, St, !0), a.deltaX = a.deltaY = 0, ge && ge(a));
    }, R = a.onRelease = function(C) {
      if (!te(C, 1)) {
        Oe(Q ? l : K, it[1], Et, !0);
        var m = !isNaN(a.y - a.startY), Y = a.isDragging, f = Y && (Math.abs(a.x - a.startX) > 3 || Math.abs(a.y - a.startY) > 3), b = dr(C);
        !f && m && (a._vx.reset(), a._vy.reset(), O && ee && ve.delayedCall(0.08, function() {
          if (xr() - _t > 300 && !C.defaultPrevented) {
            if (C.target.click)
              C.target.click();
            else if (K.createEvent) {
              var _ = K.createEvent("MouseEvents");
              _.initMouseEvent("click", !0, !0, qe, 1, b.screenX, b.screenY, b.clientX, b.clientY, !1, !1, !1, !1, 0, null), C.target.dispatchEvent(_);
            }
          }
        })), a.isDragging = a.isGesturing = a.isPressed = !1, k && Y && !Q && De.restart(!0), Re && vt(), ne && Y && ne(a), T && T(a, f);
      }
    }, It = function(m) {
      return m.touches && m.touches.length > 1 && (a.isGesturing = !0) && j(m, a.isDragging);
    }, tt = function() {
      return (a.isGesturing = !1) || s(a);
    }, rt = function(m) {
      if (!te(m)) {
        var Y = $(), f = ht();
        Kt((Y - Tt) * dt, (f - Yt) * dt, 1), Tt = Y, Yt = f, k && De.restart(!0);
      }
    }, nt = function(m) {
      if (!te(m)) {
        m = dr(m, O), ie && (V = !0);
        var Y = (m.deltaMode === 1 ? p : m.deltaMode === 2 ? qe.innerHeight : 1) * v;
        Kt(m.deltaX * Y, m.deltaY * Y, 0), k && !Q && De.restart(!0);
      }
    }, zt = function(m) {
      if (!te(m)) {
        var Y = m.clientX, f = m.clientY, b = Y - a.x, _ = f - a.y;
        a.x = Y, a.y = f, L = !0, k && De.restart(!0), (b || _) && Zt(b, _);
      }
    }, Jt = function(m) {
      a.event = m, oe(a);
    }, mt = function(m) {
      a.event = m, Ee(a);
    }, cr = function(m) {
      return te(m) || dr(m, O) && Ke(a);
    };
    De = a._dc = ve.delayedCall(g || 0.25, Rr).pause(), a.deltaX = a.deltaY = 0, a._vx = hn(0, 50, !0), a._vy = hn(0, 50, !0), a.scrollX = $, a.scrollY = ht, a.isDragging = a.isGesturing = a.isPressed = !1, jn(this), a.enable = function(C) {
      return a.isEnabled || (Ae(kt ? K : l, "scroll", gn), u.indexOf("scroll") >= 0 && Ae(kt ? K : l, "scroll", rt, St, me), u.indexOf("wheel") >= 0 && Ae(l, "wheel", nt, St, me), (u.indexOf("touch") >= 0 && Jn || u.indexOf("pointer") >= 0) && (Ae(l, it[0], Ft, St, me), Ae(K, it[2], R), Ae(K, it[3], R), ee && Ae(l, "click", ur, !0, !0), Ke && Ae(l, "click", cr), j && Ae(K, "gesturestart", It), s && Ae(K, "gestureend", tt), oe && Ae(l, Nt + "enter", Jt), Ee && Ae(l, Nt + "leave", mt), Me && Ae(l, Nt + "move", zt)), a.isEnabled = !0, a.isDragging = a.isGesturing = a.isPressed = L = Re = !1, a._vx.reset(), a._vy.reset(), Tt = $(), Yt = ht(), C && C.type && Ft(C), Lt && Lt(a)), a;
    }, a.disable = function() {
      a.isEnabled && (nr.filter(function(C) {
        return C !== a && br(C.target);
      }).length || Oe(kt ? K : l, "scroll", gn), a.isPressed && (a._vx.reset(), a._vy.reset(), Oe(Q ? l : K, it[1], Et, !0)), Oe(kt ? K : l, "scroll", rt, me), Oe(l, "wheel", nt, me), Oe(l, it[0], Ft, me), Oe(K, it[2], R), Oe(K, it[3], R), Oe(l, "click", ur, !0), Oe(l, "click", cr), Oe(K, "gesturestart", It), Oe(K, "gestureend", tt), Oe(l, Nt + "enter", Jt), Oe(l, Nt + "leave", mt), Oe(l, Nt + "move", zt), a.isEnabled = a.isPressed = a.isDragging = !1, wt && wt(a));
    }, a.kill = a.revert = function() {
      a.disable();
      var C = nr.indexOf(a);
      C >= 0 && nr.splice(C, 1), xt === a && (xt = 0);
    }, nr.push(a), Q && br(l) && (xt = a), a.enable(U);
  }, So(i, [{
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
J.register = no;
J.getAll = function() {
  return nr.slice();
};
J.getById = function(i) {
  return nr.filter(function(e) {
    return e.vars.id === i;
  })[0];
};
eo() && ve.registerPlugin(J);
/*!
 * ScrollTrigger 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var d, tr, M, I, $e, F, Cn, en, Pr, wr, hr, Fr, Ce, nn, _n, Ye, An, Ln, rr, oo, sn, io, Le, vn, so, lo, Pt, mn, Sn, sr, Tn, Cr, yn, ln, Ir = 1, Se = Date.now, an = Se(), je = 0, _r = 0, Yn = function(e, n, t) {
  var r = Ue(e) && (e.substr(0, 6) === "clamp(" || e.indexOf("max") > -1);
  return t["_" + n + "Clamp"] = r, r ? e.substr(6, e.length - 7) : e;
}, Fn = function(e, n) {
  return n && (!Ue(e) || e.substr(0, 6) !== "clamp(") ? "clamp(" + e + ")" : e;
}, Eo = function i() {
  return _r && requestAnimationFrame(i);
}, In = function() {
  return nn = 1;
}, zn = function() {
  return nn = 0;
}, ut = function(e) {
  return e;
}, vr = function(e) {
  return Math.round(e * 1e5) / 1e5 || 0;
}, ao = function() {
  return typeof window < "u";
}, uo = function() {
  return d || ao() && (d = window.gsap) && d.registerPlugin && d;
}, $t = function(e) {
  return !!~Cn.indexOf(e);
}, co = function(e) {
  return (e === "Height" ? Tn : M["inner" + e]) || $e["client" + e] || F["client" + e];
}, fo = function(e) {
  return Ot(e, "getBoundingClientRect") || ($t(e) ? function() {
    return Jr.width = M.innerWidth, Jr.height = Tn, Jr;
  } : function() {
    return yt(e);
  });
}, Mo = function(e, n, t) {
  var r = t.d, o = t.d2, u = t.a;
  return (u = Ot(e, "getBoundingClientRect")) ? function() {
    return u()[r];
  } : function() {
    return (n ? co(o) : e["client" + o]) || 0;
  };
}, Po = function(e, n) {
  return !n || ~ft.indexOf(e) ? fo(e) : function() {
    return Jr;
  };
}, ct = function(e, n) {
  var t = n.s, r = n.d2, o = n.d, u = n.a;
  return Math.max(0, (t = "scroll" + r) && (u = Ot(e, t)) ? u() - fo(e)()[o] : $t(e) ? ($e[t] || F[t]) - co(r) : e[t] - e["offset" + r]);
}, zr = function(e, n) {
  for (var t = 0; t < rr.length; t += 3)
    (!n || ~n.indexOf(rr[t + 1])) && e(rr[t], rr[t + 1], rr[t + 2]);
}, Ue = function(e) {
  return typeof e == "string";
}, Te = function(e) {
  return typeof e == "function";
}, mr = function(e) {
  return typeof e == "number";
}, Xt = function(e) {
  return typeof e == "object";
}, gr = function(e, n, t) {
  return e && e.progress(n ? 0 : 1) && t && e.pause();
}, Qt = function(e, n, t) {
  if (e.enabled) {
    var r = e._ctx ? e._ctx.add(function() {
      return n(e, t);
    }) : n(e, t);
    r && r.totalTime && (e.callbackAnimation = r);
  }
}, jt = Math.abs, po = "left", go = "top", kn = "right", En = "bottom", Wt = "width", Gt = "height", Sr = "Right", Tr = "Left", kr = "Top", Er = "Bottom", re = "padding", Je = "margin", ar = "Width", Mn = "Height", le = "px", Qe = function(e) {
  return M.getComputedStyle(e.nodeType === Node.DOCUMENT_NODE ? e.scrollingElement : e);
}, Do = function(e) {
  var n = Qe(e).position;
  e.style.position = n === "absolute" || n === "fixed" ? n : "relative";
}, Bn = function(e, n) {
  for (var t in n)
    t in e || (e[t] = n[t]);
  return e;
}, yt = function(e, n) {
  var t = n && Qe(e)[_n] !== "matrix(1, 0, 0, 1, 0, 0)" && d.to(e, {
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
}, tn = function(e, n) {
  var t = n.d2;
  return e["offset" + t] || e["client" + t] || 0;
}, ho = function(e) {
  var n = [], t = e.labels, r = e.duration(), o;
  for (o in t)
    n.push(t[o] / r);
  return n;
}, Ro = function(e) {
  return function(n) {
    return d.utils.snap(ho(e), n);
  };
}, Pn = function(e) {
  var n = d.utils.snap(e), t = Array.isArray(e) && e.slice(0).sort(function(r, o) {
    return r - o;
  });
  return t ? function(r, o, u) {
    u === void 0 && (u = 1e-3);
    var l;
    if (!o)
      return n(r);
    if (o > 0) {
      for (r -= u, l = 0; l < t.length; l++)
        if (t[l] >= r)
          return t[l];
      return t[l - 1];
    } else
      for (l = t.length, r += u; l--; )
        if (t[l] <= r)
          return t[l];
    return t[0];
  } : function(r, o, u) {
    u === void 0 && (u = 1e-3);
    var l = n(r);
    return !o || Math.abs(l - r) < u || l - r < 0 == o < 0 ? l : n(o < 0 ? r - e : r + e);
  };
}, Oo = function(e) {
  return function(n, t) {
    return Pn(ho(e))(n, t.direction);
  };
}, Br = function(e, n, t, r) {
  return t.split(",").forEach(function(o) {
    return e(n, o, r);
  });
}, de = function(e, n, t, r, o) {
  return e.addEventListener(n, t, {
    passive: !r,
    capture: !!o
  });
}, pe = function(e, n, t, r) {
  return e.removeEventListener(n, t, !!r);
}, Nr = function(e, n, t) {
  t = t && t.wheelHandler, t && (e(n, "wheel", t), e(n, "touchmove", t));
}, Nn = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
}, Xr = {
  toggleActions: "play",
  anticipatePin: 0
}, rn = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
}, qr = function(e, n) {
  if (Ue(e)) {
    var t = e.indexOf("="), r = ~t ? +(e.charAt(t - 1) + 1) * parseFloat(e.substr(t + 1)) : 0;
    ~t && (e.indexOf("%") > t && (r *= n / 100), e = e.substr(0, t - 1)), e = r + (e in rn ? rn[e] * n : ~e.indexOf("%") ? parseFloat(e) * n / 100 : parseFloat(e) || 0);
  }
  return e;
}, Hr = function(e, n, t, r, o, u, l, p) {
  var S = o.startColor, O = o.endColor, k = o.fontSize, g = o.indent, c = o.fontWeight, v = I.createElement("div"), U = $t(t) || Ot(t, "pinType") === "fixed", N = e.indexOf("scroller") !== -1, ne = U ? F : t.tagName === "IFRAME" ? t.contentDocument.body : t, W = e.indexOf("start") !== -1, ge = W ? S : O, T = "border-color:" + ge + ";font-size:" + k + ";color:" + ge + ";font-weight:" + c + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return T += "position:" + ((N || p) && U ? "fixed;" : "absolute;"), (N || p || !U) && (T += (r === ae ? kn : En) + ":" + (u + parseFloat(g)) + "px;"), l && (T += "box-sizing:border-box;text-align:left;width:" + l.offsetWidth + "px;"), v._isStart = W, v.setAttribute("class", "gsap-marker-" + e + (n ? " marker-" + n : "")), v.style.cssText = T, v.innerText = n || n === 0 ? e + "-" + n : e, ne.children[0] ? ne.insertBefore(v, ne.children[0]) : ne.appendChild(v), v._offset = v["offset" + r.op.d2], Vr(v, 0, r, W), v;
}, Vr = function(e, n, t, r) {
  var o = {
    display: "block"
  }, u = t[r ? "os2" : "p2"], l = t[r ? "p2" : "os2"];
  e._isFlipped = r, o[t.a + "Percent"] = r ? -100 : 0, o[t.a] = r ? "1px" : 0, o["border" + u + ar] = 1, o["border" + l + ar] = 0, o[t.p] = n + "px", d.set(e, o);
}, E = [], xn = {}, Dr, Xn = function() {
  return Se() - je > 34 && (Dr || (Dr = requestAnimationFrame(bt)));
}, er = function() {
  (!Le || !Le.isPressed || Le.startX > F.clientWidth) && (P.cache++, Le ? Dr || (Dr = requestAnimationFrame(bt)) : bt(), je || Vt("scrollStart"), je = Se());
}, un = function() {
  lo = M.innerWidth, so = M.innerHeight;
}, yr = function(e) {
  P.cache++, (e === !0 || !Ce && !io && !I.fullscreenElement && !I.webkitFullscreenElement && (!vn || lo !== M.innerWidth || Math.abs(M.innerHeight - so) > M.innerHeight * 0.25)) && en.restart(!0);
}, qt = {}, Ao = [], _o = function i() {
  return pe(D, "scrollEnd", i) || Ht(!0);
}, Vt = function(e) {
  return qt[e] && qt[e].map(function(n) {
    return n();
  }) || Ao;
}, Ge = [], vo = function(e) {
  for (var n = 0; n < Ge.length; n += 5)
    (!e || Ge[n + 4] && Ge[n + 4].query === e) && (Ge[n].style.cssText = Ge[n + 1], Ge[n].getBBox && Ge[n].setAttribute("transform", Ge[n + 2] || ""), Ge[n + 3].uncache = 1);
}, mo = function() {
  return P.forEach(function(e) {
    return Te(e) && ++e.cacheID && (e.rec = e());
  });
}, Dn = function(e, n) {
  var t;
  for (Ye = 0; Ye < E.length; Ye++)
    t = E[Ye], t && (!n || t._ctx === n) && (e ? t.kill(1) : t.revert(!0, !0));
  Cr = !0, n && vo(n), n || Vt("revert");
}, yo = function(e, n) {
  P.cache++, (n || !Fe) && P.forEach(function(t) {
    return Te(t) && t.cacheID++ && (t.rec = 0);
  }), Ue(e) && (M.history.scrollRestoration = Sn = e);
}, Fe, Ut = 0, Hn, Lo = function() {
  if (Hn !== Ut) {
    var e = Hn = Ut;
    requestAnimationFrame(function() {
      return e === Ut && Ht(!0);
    });
  }
}, xo = function() {
  F.appendChild(sr), Tn = !Le && sr.offsetHeight || M.innerHeight, F.removeChild(sr);
}, Wn = function(e) {
  return Pr(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(n) {
    return n.style.display = e ? "none" : "block";
  });
}, Ht = function(e, n) {
  if ($e = I.documentElement, F = I.body, Cn = [M, I, $e, F], je && !e && !Cr) {
    de(D, "scrollEnd", _o);
    return;
  }
  xo(), Fe = D.isRefreshing = !0, Cr || mo();
  var t = Vt("refreshInit");
  oo && D.sort(), n || Dn(), P.forEach(function(r) {
    Te(r) && (r.smooth && (r.target.style.scrollBehavior = "auto"), r(0));
  }), E.slice(0).forEach(function(r) {
    return r.refresh();
  }), Cr = !1, E.forEach(function(r) {
    if (r._subPinOffset && r.pin) {
      var o = r.vars.horizontal ? "offsetWidth" : "offsetHeight", u = r.pin[o];
      r.revert(!0, 1), r.adjustPinSpacing(r.pin[o] - u), r.refresh();
    }
  }), yn = 1, Wn(!0), E.forEach(function(r) {
    var o = ct(r.scroller, r._dir), u = r.vars.end === "max" || r._endClamp && r.end > o, l = r._startClamp && r.start >= o;
    (u || l) && r.setPositions(l ? o - 1 : r.start, u ? Math.max(l ? o : r.start + 1, o) : r.end, !0);
  }), Wn(!1), yn = 0, t.forEach(function(r) {
    return r && r.render && r.render(-1);
  }), P.forEach(function(r) {
    Te(r) && (r.smooth && requestAnimationFrame(function() {
      return r.target.style.scrollBehavior = "smooth";
    }), r.rec && r(r.rec));
  }), yo(Sn, 1), en.pause(), Ut++, Fe = 2, bt(2), E.forEach(function(r) {
    return Te(r.vars.onRefresh) && r.vars.onRefresh(r);
  }), Fe = D.isRefreshing = !1, Vt("refresh");
}, bn = 0, Kr = 1, Mr, bt = function(e) {
  if (e === 2 || !Fe && !Cr) {
    D.isUpdating = !0, Mr && Mr.update(0);
    var n = E.length, t = Se(), r = t - an >= 50, o = n && E[0].scroll();
    if (Kr = bn > o ? -1 : 1, Fe || (bn = o), r && (je && !nn && t - je > 200 && (je = 0, Vt("scrollEnd")), hr = an, an = t), Kr < 0) {
      for (Ye = n; Ye-- > 0; )
        E[Ye] && E[Ye].update(0, r);
      Kr = 1;
    } else
      for (Ye = 0; Ye < n; Ye++)
        E[Ye] && E[Ye].update(0, r);
    D.isUpdating = !1;
  }
  Dr = 0;
}, wn = [po, go, En, kn, Je + Er, Je + Sr, Je + kr, Je + Tr, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], Zr = wn.concat([Wt, Gt, "boxSizing", "max" + ar, "max" + Mn, "position", Je, re, re + kr, re + Sr, re + Er, re + Tr]), Yo = function(e, n, t) {
  lr(t);
  var r = e._gsap;
  if (r.spacerIsNative)
    lr(r.spacerState);
  else if (e._gsap.swappedIn) {
    var o = n.parentNode;
    o && (o.insertBefore(e, n), o.removeChild(n));
  }
  e._gsap.swappedIn = !1;
}, cn = function(e, n, t, r) {
  if (!e._gsap.swappedIn) {
    for (var o = wn.length, u = n.style, l = e.style, p; o--; )
      p = wn[o], u[p] = t[p];
    u.position = t.position === "absolute" ? "absolute" : "relative", t.display === "inline" && (u.display = "inline-block"), l[En] = l[kn] = "auto", u.flexBasis = t.flexBasis || "auto", u.overflow = "visible", u.boxSizing = "border-box", u[Wt] = tn(e, Ie) + le, u[Gt] = tn(e, ae) + le, u[re] = l[Je] = l[go] = l[po] = "0", lr(r), l[Wt] = l["max" + ar] = t[Wt], l[Gt] = l["max" + Mn] = t[Gt], l[re] = t[re], e.parentNode !== n && (e.parentNode.insertBefore(n, e), n.appendChild(e)), e._gsap.swappedIn = !0;
  }
}, Fo = /([A-Z])/g, lr = function(e) {
  if (e) {
    var n = e.t.style, t = e.length, r = 0, o, u;
    for ((e.t._gsap || d.core.getCache(e.t)).uncache = 1; r < t; r += 2)
      u = e[r + 1], o = e[r], u ? n[o] = u : n[o] && n.removeProperty(o.replace(Fo, "-$1").toLowerCase());
  }
}, Wr = function(e) {
  for (var n = Zr.length, t = e.style, r = [], o = 0; o < n; o++)
    r.push(Zr[o], t[Zr[o]]);
  return r.t = e, r;
}, Io = function(e, n, t) {
  for (var r = [], o = e.length, u = t ? 8 : 0, l; u < o; u += 2)
    l = e[u], r.push(l, l in n ? n[l] : e[u + 1]);
  return r.t = e.t, r;
}, Jr = {
  left: 0,
  top: 0
}, Gn = function(e, n, t, r, o, u, l, p, S, O, k, g, c, v) {
  Te(e) && (e = e(p)), Ue(e) && e.substr(0, 3) === "max" && (e = g + (e.charAt(4) === "=" ? qr("0" + e.substr(3), t) : 0));
  var U = c ? c.time() : 0, N, ne, W;
  if (c && c.seek(0), isNaN(e) || (e = +e), mr(e))
    c && (e = d.utils.mapRange(c.scrollTrigger.start, c.scrollTrigger.end, 0, g, e)), l && Vr(l, t, r, !0);
  else {
    Te(n) && (n = n(p));
    var ge = (e || "0").split(" "), T, Ve, X, x;
    W = Ne(n, p) || F, T = yt(W) || {}, (!T || !T.left && !T.top) && Qe(W).display === "none" && (x = W.style.display, W.style.display = "block", T = yt(W), x ? W.style.display = x : W.style.removeProperty("display")), Ve = qr(ge[0], T[r.d]), X = qr(ge[1] || "0", t), e = T[r.p] - S[r.p] - O + Ve + o - X, l && Vr(l, X, r, t - X < 20 || l._isStart && X > 20), t -= t - X;
  }
  if (v && (p[v] = e || -1e-3, e < 0 && (e = 0)), u) {
    var ke = e + t, ze = u._isStart;
    N = "scroll" + r.d2, Vr(u, ke, r, ze && ke > 20 || !ze && (k ? Math.max(F[N], $e[N]) : u.parentNode[N]) <= ke + 1), k && (S = yt(l), k && (u.style[r.op.p] = S[r.op.p] - r.op.m - u._offset + le));
  }
  return c && W && (N = yt(W), c.seek(g), ne = yt(W), c._caScrollDist = N[r.p] - ne[r.p], e = e / c._caScrollDist * g), c && c.seek(U), c ? e : Math.round(e);
}, zo = /(webkit|moz|length|cssText|inset)/i, Un = function(e, n, t, r) {
  if (e.parentNode !== n) {
    var o = e.style, u, l;
    if (n === F) {
      e._stOrig = o.cssText, l = Qe(e);
      for (u in l)
        !+u && !zo.test(u) && l[u] && typeof o[u] == "string" && u !== "0" && (o[u] = l[u]);
      o.top = t, o.left = r;
    } else
      o.cssText = e._stOrig;
    d.core.getCache(e).uncache = 1, n.appendChild(e);
  }
}, bo = function(e, n, t) {
  var r = n, o = r;
  return function(u) {
    var l = Math.round(e());
    return l !== r && l !== o && Math.abs(l - r) > 3 && Math.abs(l - o) > 3 && (u = l, t && t()), o = r, r = Math.round(u), r;
  };
}, Gr = function(e, n, t) {
  var r = {};
  r[n.p] = "+=" + t, d.set(e, r);
}, $n = function(e, n) {
  var t = At(e, n), r = "_scroll" + n.p2, o = function u(l, p, S, O, k) {
    var g = u.tween, c = p.onComplete, v = {};
    S = S || t();
    var U = bo(t, S, function() {
      g.kill(), u.tween = 0;
    });
    return k = O && k || 0, O = O || l - S, g && g.kill(), p[r] = l, p.inherit = !1, p.modifiers = v, v[r] = function() {
      return U(S + O * g.ratio + k * g.ratio * g.ratio);
    }, p.onUpdate = function() {
      P.cache++, u.tween && bt();
    }, p.onComplete = function() {
      u.tween = 0, c && c.call(g);
    }, g = u.tween = d.to(e, p), g;
  };
  return e[r] = t, t.wheelHandler = function() {
    return o.tween && o.tween.kill() && (o.tween = 0);
  }, de(e, "wheel", t.wheelHandler), D.isTouch && de(e, "touchmove", t.wheelHandler), o;
}, D = /* @__PURE__ */ (function() {
  function i(n, t) {
    tr || i.register(d) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), mn(this), this.init(n, t);
  }
  var e = i.prototype;
  return e.init = function(t, r) {
    if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !_r) {
      this.update = this.refresh = this.kill = ut;
      return;
    }
    t = Bn(Ue(t) || mr(t) || t.nodeType ? {
      trigger: t
    } : t, Xr);
    var o = t, u = o.onUpdate, l = o.toggleClass, p = o.id, S = o.onToggle, O = o.onRefresh, k = o.scrub, g = o.trigger, c = o.pin, v = o.pinSpacing, U = o.invalidateOnRefresh, N = o.anticipatePin, ne = o.onScrubComplete, W = o.onSnapComplete, ge = o.once, T = o.snap, Ve = o.pinReparent, X = o.pinSpacer, x = o.containerAnimation, ke = o.fastScrollEnd, ze = o.preventOverlaps, h = t.horizontal || t.containerAnimation && t.horizontal !== !1 ? Ie : ae, ue = !k && k !== 0, y = Ne(t.scroller || M), pt = d.core.getCache(y), oe = $t(y), Ee = ("pinType" in t ? t.pinType : Ot(y, "pinType") || oe && "fixed") === "fixed", Me = [t.onEnter, t.onLeave, t.onEnterBack, t.onLeaveBack], z = ue && t.toggleActions.split(" "), Q = "markers" in t ? t.markers : Xr.markers, j = oe ? 0 : parseFloat(Qe(y)["border" + h.p2 + ar]) || 0, s = this, ie = t.onRefreshInit && function() {
      return t.onRefreshInit(s);
    }, Lt = Mo(y, oe, h), wt = Po(y, oe), Ke = 0, dt = 0, me = 0, ee = At(y, h), Pe, ye, Ct, De, Re, L, V, Be, Xe, a, He, gt, St, $, ht, Tt, Yt, ce, kt, K, et, Ze, _t, ur, te, Rr, vt, Kt, Zt, Et, Ft, R, It, tt, rt, nt, zt, Jt, mt;
    if (s._startClamp = s._endClamp = !1, s._dir = h, N *= 45, s.scroller = y, s.scroll = x ? x.time.bind(x) : ee, De = ee(), s.vars = t, r = r || t.animation, "refreshPriority" in t && (oo = 1, t.refreshPriority === -9999 && (Mr = s)), pt.tweenScroll = pt.tweenScroll || {
      top: $n(y, ae),
      left: $n(y, Ie)
    }, s.tweenTo = Pe = pt.tweenScroll[h.p], s.scrubDuration = function(f) {
      It = mr(f) && f, It ? R ? R.duration(f) : R = d.to(r, {
        ease: "expo",
        totalProgress: "+=0",
        inherit: !1,
        duration: It,
        paused: !0,
        onComplete: function() {
          return ne && ne(s);
        }
      }) : (R && R.progress(1).kill(), R = 0);
    }, r && (r.vars.lazy = !1, r._initted && !s.isReverted || r.vars.immediateRender !== !1 && t.immediateRender !== !1 && r.duration() && r.render(0, !0, !0), s.animation = r.pause(), r.scrollTrigger = s, s.scrubDuration(k), Et = 0, p || (p = r.vars.id)), T && ((!Xt(T) || T.push) && (T = {
      snapTo: T
    }), "scrollBehavior" in F.style && d.set(oe ? [F, $e] : y, {
      scrollBehavior: "auto"
    }), P.forEach(function(f) {
      return Te(f) && f.target === (oe ? I.scrollingElement || $e : y) && (f.smooth = !1);
    }), Ct = Te(T.snapTo) ? T.snapTo : T.snapTo === "labels" ? Ro(r) : T.snapTo === "labelsDirectional" ? Oo(r) : T.directional !== !1 ? function(f, b) {
      return Pn(T.snapTo)(f, Se() - dt < 500 ? 0 : b.direction);
    } : d.utils.snap(T.snapTo), tt = T.duration || {
      min: 0.1,
      max: 2
    }, tt = Xt(tt) ? wr(tt.min, tt.max) : wr(tt, tt), rt = d.delayedCall(T.delay || It / 2 || 0.1, function() {
      var f = ee(), b = Se() - dt < 500, _ = Pe.tween;
      if ((b || Math.abs(s.getVelocity()) < 10) && !_ && !nn && Ke !== f) {
        var w = (f - L) / $, fe = r && !ue ? r.totalProgress() : w, A = b ? 0 : (fe - Ft) / (Se() - hr) * 1e3 || 0, Z = d.utils.clamp(-w, 1 - w, jt(A / 2) * A / 0.185), xe = w + (T.inertia === !1 ? 0 : Z), q, H, B = T, ot = B.onStart, G = B.onInterrupt, We = B.onComplete;
        if (q = Ct(xe, s), mr(q) || (q = xe), H = Math.max(0, Math.round(L + q * $)), f <= V && f >= L && H !== f) {
          if (_ && !_._initted && _.data <= jt(H - f))
            return;
          T.inertia === !1 && (Z = q - w), Pe(H, {
            duration: tt(jt(Math.max(jt(xe - fe), jt(q - fe)) * 0.185 / A / 0.05 || 0)),
            ease: T.ease || "power3",
            data: jt(H - f),
            // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
            onInterrupt: function() {
              return rt.restart(!0) && G && Qt(s, G);
            },
            onComplete: function() {
              s.update(), Ke = ee(), r && !ue && (R ? R.resetTo("totalProgress", q, r._tTime / r._tDur) : r.progress(q)), Et = Ft = r && !ue ? r.totalProgress() : s.progress, W && W(s), We && Qt(s, We);
            }
          }, f, Z * $, H - f - Z * $), ot && Qt(s, ot, Pe.tween);
        }
      } else s.isActive && Ke !== f && rt.restart(!0);
    }).pause()), p && (xn[p] = s), g = s.trigger = Ne(g || c !== !0 && c), mt = g && g._gsap && g._gsap.stRevert, mt && (mt = mt(s)), c = c === !0 ? g : Ne(c), Ue(l) && (l = {
      targets: g,
      className: l
    }), c && (v === !1 || v === Je || (v = !v && c.parentNode && c.parentNode.style && Qe(c.parentNode).display === "flex" ? !1 : re), s.pin = c, ye = d.core.getCache(c), ye.spacer ? ht = ye.pinState : (X && (X = Ne(X), X && !X.nodeType && (X = X.current || X.nativeElement), ye.spacerIsNative = !!X, X && (ye.spacerState = Wr(X))), ye.spacer = ce = X || I.createElement("div"), ce.classList.add("pin-spacer"), p && ce.classList.add("pin-spacer-" + p), ye.pinState = ht = Wr(c)), t.force3D !== !1 && d.set(c, {
      force3D: !0
    }), s.spacer = ce = ye.spacer, Zt = Qe(c), ur = Zt[v + h.os2], K = d.getProperty(c), et = d.quickSetter(c, h.a, le), cn(c, ce, Zt), Yt = Wr(c)), Q) {
      gt = Xt(Q) ? Bn(Q, Nn) : Nn, a = Hr("scroller-start", p, y, h, gt, 0), He = Hr("scroller-end", p, y, h, gt, 0, a), kt = a["offset" + h.op.d2];
      var cr = Ne(Ot(y, "content") || y);
      Be = this.markerStart = Hr("start", p, cr, h, gt, kt, 0, x), Xe = this.markerEnd = Hr("end", p, cr, h, gt, kt, 0, x), x && (Jt = d.quickSetter([Be, Xe], h.a, le)), !Ee && !(ft.length && Ot(y, "fixedMarkers") === !0) && (Do(oe ? F : y), d.set([a, He], {
        force3D: !0
      }), Rr = d.quickSetter(a, h.a, le), Kt = d.quickSetter(He, h.a, le));
    }
    if (x) {
      var C = x.vars.onUpdate, m = x.vars.onUpdateParams;
      x.eventCallback("onUpdate", function() {
        s.update(0, 0, 1), C && C.apply(x, m || []);
      });
    }
    if (s.previous = function() {
      return E[E.indexOf(s) - 1];
    }, s.next = function() {
      return E[E.indexOf(s) + 1];
    }, s.revert = function(f, b) {
      if (!b)
        return s.kill(!0);
      var _ = f !== !1 || !s.enabled, w = Ce;
      _ !== s.isReverted && (_ && (nt = Math.max(ee(), s.scroll.rec || 0), me = s.progress, zt = r && r.progress()), Be && [Be, Xe, a, He].forEach(function(fe) {
        return fe.style.display = _ ? "none" : "block";
      }), _ && (Ce = s, s.update(_)), c && (!Ve || !s.isActive) && (_ ? Yo(c, ce, ht) : cn(c, ce, Qe(c), te)), _ || s.update(_), Ce = w, s.isReverted = _);
    }, s.refresh = function(f, b, _, w) {
      if (!((Ce || !s.enabled) && !b)) {
        if (c && f && je) {
          de(i, "scrollEnd", _o);
          return;
        }
        !Fe && ie && ie(s), Ce = s, Pe.tween && !_ && (Pe.tween.kill(), Pe.tween = 0), R && R.pause(), U && r && (r.revert({
          kill: !1
        }).invalidate(), r.getChildren ? r.getChildren(!0, !0, !1).forEach(function(Mt) {
          return Mt.vars.immediateRender && Mt.render(0, !0, !0);
        }) : r.vars.immediateRender && r.render(0, !0, !0)), s.isReverted || s.revert(!0, !0), s._subPinOffset = !1;
        var fe = Lt(), A = wt(), Z = x ? x.duration() : ct(y, h), xe = $ <= 0.01 || !$, q = 0, H = w || 0, B = Xt(_) ? _.end : t.end, ot = t.endTrigger || g, G = Xt(_) ? _.start : t.start || (t.start === 0 || !g ? 0 : c ? "0 0" : "0 100%"), We = s.pinnedContainer = t.pinnedContainer && Ne(t.pinnedContainer, s), st = g && Math.max(0, E.indexOf(s)) || 0, he = st, _e, be, Bt, Or, we, se, lt, on, Rn, fr, at, pr, Ar;
        for (Q && Xt(_) && (pr = d.getProperty(a, h.p), Ar = d.getProperty(He, h.p)); he-- > 0; )
          se = E[he], se.end || se.refresh(0, 1) || (Ce = s), lt = se.pin, lt && (lt === g || lt === c || lt === We) && !se.isReverted && (fr || (fr = []), fr.unshift(se), se.revert(!0, !0)), se !== E[he] && (st--, he--);
        for (Te(G) && (G = G(s)), G = Yn(G, "start", s), L = Gn(G, g, fe, h, ee(), Be, a, s, A, j, Ee, Z, x, s._startClamp && "_startClamp") || (c ? -1e-3 : 0), Te(B) && (B = B(s)), Ue(B) && !B.indexOf("+=") && (~B.indexOf(" ") ? B = (Ue(G) ? G.split(" ")[0] : "") + B : (q = qr(B.substr(2), fe), B = Ue(G) ? G : (x ? d.utils.mapRange(0, x.duration(), x.scrollTrigger.start, x.scrollTrigger.end, L) : L) + q, ot = g)), B = Yn(B, "end", s), V = Math.max(L, Gn(B || (ot ? "100% 0" : Z), ot, fe, h, ee() + q, Xe, He, s, A, j, Ee, Z, x, s._endClamp && "_endClamp")) || -1e-3, q = 0, he = st; he--; )
          se = E[he] || {}, lt = se.pin, lt && se.start - se._pinPush <= L && !x && se.end > 0 && (_e = se.end - (s._startClamp ? Math.max(0, se.start) : se.start), (lt === g && se.start - se._pinPush < L || lt === We) && isNaN(G) && (q += _e * (1 - se.progress)), lt === c && (H += _e));
        if (L += q, V += q, s._startClamp && (s._startClamp += q), s._endClamp && !Fe && (s._endClamp = V || -1e-3, V = Math.min(V, ct(y, h))), $ = V - L || (L -= 0.01) && 1e-3, xe && (me = d.utils.clamp(0, 1, d.utils.normalize(L, V, nt))), s._pinPush = H, Be && q && (_e = {}, _e[h.a] = "+=" + q, We && (_e[h.p] = "-=" + ee()), d.set([Be, Xe], _e)), c && !(yn && s.end >= ct(y, h)))
          _e = Qe(c), Or = h === ae, Bt = ee(), Ze = parseFloat(K(h.a)) + H, !Z && V > 1 && (at = (oe ? I.scrollingElement || $e : y).style, at = {
            style: at,
            value: at["overflow" + h.a.toUpperCase()]
          }, oe && Qe(F)["overflow" + h.a.toUpperCase()] !== "scroll" && (at.style["overflow" + h.a.toUpperCase()] = "scroll")), cn(c, ce, _e), Yt = Wr(c), be = yt(c, !0), on = Ee && At(y, Or ? Ie : ae)(), v ? (te = [v + h.os2, $ + H + le], te.t = ce, he = v === re ? tn(c, h) + $ + H : 0, he && (te.push(h.d, he + le), ce.style.flexBasis !== "auto" && (ce.style.flexBasis = he + le)), lr(te), We && E.forEach(function(Mt) {
            Mt.pin === We && Mt.vars.pinSpacing !== !1 && (Mt._subPinOffset = !0);
          }), Ee && ee(nt)) : (he = tn(c, h), he && ce.style.flexBasis !== "auto" && (ce.style.flexBasis = he + le)), Ee && (we = {
            top: be.top + (Or ? Bt - L : on) + le,
            left: be.left + (Or ? on : Bt - L) + le,
            boxSizing: "border-box",
            position: "fixed"
          }, we[Wt] = we["max" + ar] = Math.ceil(be.width) + le, we[Gt] = we["max" + Mn] = Math.ceil(be.height) + le, we[Je] = we[Je + kr] = we[Je + Sr] = we[Je + Er] = we[Je + Tr] = "0", we[re] = _e[re], we[re + kr] = _e[re + kr], we[re + Sr] = _e[re + Sr], we[re + Er] = _e[re + Er], we[re + Tr] = _e[re + Tr], Tt = Io(ht, we, Ve), Fe && ee(0)), r ? (Rn = r._initted, sn(1), r.render(r.duration(), !0, !0), _t = K(h.a) - Ze + $ + H, vt = Math.abs($ - _t) > 1, Ee && vt && Tt.splice(Tt.length - 2, 2), r.render(0, !0, !0), Rn || r.invalidate(!0), r.parent || r.totalTime(r.totalTime()), sn(0)) : _t = $, at && (at.value ? at.style["overflow" + h.a.toUpperCase()] = at.value : at.style.removeProperty("overflow-" + h.a));
        else if (g && ee() && !x)
          for (be = g.parentNode; be && be !== F; )
            be._pinOffset && (L -= be._pinOffset, V -= be._pinOffset), be = be.parentNode;
        fr && fr.forEach(function(Mt) {
          return Mt.revert(!1, !0);
        }), s.start = L, s.end = V, De = Re = Fe ? nt : ee(), !x && !Fe && (De < nt && ee(nt), s.scroll.rec = 0), s.revert(!1, !0), dt = Se(), rt && (Ke = -1, rt.restart(!0)), Ce = 0, r && ue && (r._initted || zt) && r.progress() !== zt && r.progress(zt || 0, !0).render(r.time(), !0, !0), (xe || me !== s.progress || x || U || r && !r._initted) && (r && !ue && (r._initted || me || r.vars.immediateRender !== !1) && r.totalProgress(x && L < -1e-3 && !me ? d.utils.normalize(L, V, 0) : me, !0), s.progress = xe || (De - L) / $ === me ? 0 : me), c && v && (ce._pinOffset = Math.round(s.progress * _t)), R && R.invalidate(), isNaN(pr) || (pr -= d.getProperty(a, h.p), Ar -= d.getProperty(He, h.p), Gr(a, h, pr), Gr(Be, h, pr - (w || 0)), Gr(He, h, Ar), Gr(Xe, h, Ar - (w || 0))), xe && !Fe && s.update(), O && !Fe && !St && (St = !0, O(s), St = !1);
      }
    }, s.getVelocity = function() {
      return (ee() - Re) / (Se() - hr) * 1e3 || 0;
    }, s.endAnimation = function() {
      gr(s.callbackAnimation), r && (R ? R.progress(1) : r.paused() ? ue || gr(r, s.direction < 0, 1) : gr(r, r.reversed()));
    }, s.labelToScroll = function(f) {
      return r && r.labels && (L || s.refresh() || L) + r.labels[f] / r.duration() * $ || 0;
    }, s.getTrailing = function(f) {
      var b = E.indexOf(s), _ = s.direction > 0 ? E.slice(0, b).reverse() : E.slice(b + 1);
      return (Ue(f) ? _.filter(function(w) {
        return w.vars.preventOverlaps === f;
      }) : _).filter(function(w) {
        return s.direction > 0 ? w.end <= L : w.start >= V;
      });
    }, s.update = function(f, b, _) {
      if (!(x && !_ && !f)) {
        var w = Fe === !0 ? nt : s.scroll(), fe = f ? 0 : (w - L) / $, A = fe < 0 ? 0 : fe > 1 ? 1 : fe || 0, Z = s.progress, xe, q, H, B, ot, G, We, st;
        if (b && (Re = De, De = x ? ee() : w, T && (Ft = Et, Et = r && !ue ? r.totalProgress() : A)), N && c && !Ce && !Ir && je && (!A && L < w + (w - Re) / (Se() - hr) * N ? A = 1e-4 : A === 1 && V > w + (w - Re) / (Se() - hr) * N && (A = 0.9999)), A !== Z && s.enabled) {
          if (xe = s.isActive = !!A && A < 1, q = !!Z && Z < 1, G = xe !== q, ot = G || !!A != !!Z, s.direction = A > Z ? 1 : -1, s.progress = A, ot && !Ce && (H = A && !Z ? 0 : A === 1 ? 1 : Z === 1 ? 2 : 3, ue && (B = !G && z[H + 1] !== "none" && z[H + 1] || z[H], st = r && (B === "complete" || B === "reset" || B in r))), ze && (G || st) && (st || k || !r) && (Te(ze) ? ze(s) : s.getTrailing(ze).forEach(function(Bt) {
            return Bt.endAnimation();
          })), ue || (R && !Ce && !Ir ? (R._dp._time - R._start !== R._time && R.render(R._dp._time - R._start), R.resetTo ? R.resetTo("totalProgress", A, r._tTime / r._tDur) : (R.vars.totalProgress = A, R.invalidate().restart())) : r && r.totalProgress(A, !!(Ce && (dt || f)))), c) {
            if (f && v && (ce.style[v + h.os2] = ur), !Ee)
              et(vr(Ze + _t * A));
            else if (ot) {
              if (We = !f && A > Z && V + 1 > w && w + 1 >= ct(y, h), Ve)
                if (!f && (xe || We)) {
                  var he = yt(c, !0), _e = w - L;
                  Un(c, F, he.top + (h === ae ? _e : 0) + le, he.left + (h === ae ? 0 : _e) + le);
                } else
                  Un(c, ce);
              lr(xe || We ? Tt : Yt), vt && A < 1 && xe || et(Ze + (A === 1 && !We ? _t : 0));
            }
          }
          T && !Pe.tween && !Ce && !Ir && rt.restart(!0), l && (G || ge && A && (A < 1 || !ln)) && Pr(l.targets).forEach(function(Bt) {
            return Bt.classList[xe || ge ? "add" : "remove"](l.className);
          }), u && !ue && !f && u(s), ot && !Ce ? (ue && (st && (B === "complete" ? r.pause().totalProgress(1) : B === "reset" ? r.restart(!0).pause() : B === "restart" ? r.restart(!0) : r[B]()), u && u(s)), (G || !ln) && (S && G && Qt(s, S), Me[H] && Qt(s, Me[H]), ge && (A === 1 ? s.kill(!1, 1) : Me[H] = 0), G || (H = A === 1 ? 1 : 3, Me[H] && Qt(s, Me[H]))), ke && !xe && Math.abs(s.getVelocity()) > (mr(ke) ? ke : 2500) && (gr(s.callbackAnimation), R ? R.progress(1) : gr(r, B === "reverse" ? 1 : !A, 1))) : ue && u && !Ce && u(s);
        }
        if (Kt) {
          var be = x ? w / x.duration() * (x._caScrollDist || 0) : w;
          Rr(be + (a._isFlipped ? 1 : 0)), Kt(be);
        }
        Jt && Jt(-w / x.duration() * (x._caScrollDist || 0));
      }
    }, s.enable = function(f, b) {
      s.enabled || (s.enabled = !0, de(y, "resize", yr), oe || de(y, "scroll", er), ie && de(i, "refreshInit", ie), f !== !1 && (s.progress = me = 0, De = Re = Ke = ee()), b !== !1 && s.refresh());
    }, s.getTween = function(f) {
      return f && Pe ? Pe.tween : R;
    }, s.setPositions = function(f, b, _, w) {
      if (x) {
        var fe = x.scrollTrigger, A = x.duration(), Z = fe.end - fe.start;
        f = fe.start + Z * f / A, b = fe.start + Z * b / A;
      }
      s.refresh(!1, !1, {
        start: Fn(f, _ && !!s._startClamp),
        end: Fn(b, _ && !!s._endClamp)
      }, w), s.update();
    }, s.adjustPinSpacing = function(f) {
      if (te && f) {
        var b = te.indexOf(h.d) + 1;
        te[b] = parseFloat(te[b]) + f + le, te[1] = parseFloat(te[1]) + f + le, lr(te);
      }
    }, s.disable = function(f, b) {
      if (f !== !1 && s.revert(!0, !0), s.enabled && (s.enabled = s.isActive = !1, b || R && R.pause(), nt = 0, ye && (ye.uncache = 1), ie && pe(i, "refreshInit", ie), rt && (rt.pause(), Pe.tween && Pe.tween.kill() && (Pe.tween = 0)), !oe)) {
        for (var _ = E.length; _--; )
          if (E[_].scroller === y && E[_] !== s)
            return;
        pe(y, "resize", yr), oe || pe(y, "scroll", er);
      }
    }, s.kill = function(f, b) {
      s.disable(f, b), R && !b && R.kill(), p && delete xn[p];
      var _ = E.indexOf(s);
      _ >= 0 && E.splice(_, 1), _ === Ye && Kr > 0 && Ye--, _ = 0, E.forEach(function(w) {
        return w.scroller === s.scroller && (_ = 1);
      }), _ || Fe || (s.scroll.rec = 0), r && (r.scrollTrigger = null, f && r.revert({
        kill: !1
      }), b || r.kill()), Be && [Be, Xe, a, He].forEach(function(w) {
        return w.parentNode && w.parentNode.removeChild(w);
      }), Mr === s && (Mr = 0), c && (ye && (ye.uncache = 1), _ = 0, E.forEach(function(w) {
        return w.pin === c && _++;
      }), _ || (ye.spacer = 0)), t.onKill && t.onKill(s);
    }, E.push(s), s.enable(!1, !1), mt && mt(s), r && r.add && !$) {
      var Y = s.update;
      s.update = function() {
        s.update = Y, P.cache++, L || V || s.refresh();
      }, d.delayedCall(0.01, s.update), $ = 0.01, L = V = 0;
    } else
      s.refresh();
    c && Lo();
  }, i.register = function(t) {
    return tr || (d = t || uo(), ao() && window.document && i.enable(), tr = _r), tr;
  }, i.defaults = function(t) {
    if (t)
      for (var r in t)
        Xr[r] = t[r];
    return Xr;
  }, i.disable = function(t, r) {
    _r = 0, E.forEach(function(u) {
      return u[r ? "kill" : "disable"](t);
    }), pe(M, "wheel", er), pe(I, "scroll", er), clearInterval(Fr), pe(I, "touchcancel", ut), pe(F, "touchstart", ut), Br(pe, I, "pointerdown,touchstart,mousedown", In), Br(pe, I, "pointerup,touchend,mouseup", zn), en.kill(), zr(pe);
    for (var o = 0; o < P.length; o += 3)
      Nr(pe, P[o], P[o + 1]), Nr(pe, P[o], P[o + 2]);
  }, i.enable = function() {
    if (M = window, I = document, $e = I.documentElement, F = I.body, d) {
      if (Pr = d.utils.toArray, wr = d.utils.clamp, mn = d.core.context || ut, sn = d.core.suppressOverwrites || ut, Sn = M.history.scrollRestoration || "auto", bn = M.pageYOffset || 0, d.core.globals("ScrollTrigger", i), F) {
        _r = 1, sr = document.createElement("div"), sr.style.height = "100vh", sr.style.position = "absolute", xo(), Eo(), J.register(d), i.isTouch = J.isTouch, Pt = J.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), vn = J.isTouch === 1, de(M, "wheel", er), Cn = [M, I, $e, F], d.matchMedia ? (i.matchMedia = function(O) {
          var k = d.matchMedia(), g;
          for (g in O)
            k.add(g, O[g]);
          return k;
        }, d.addEventListener("matchMediaInit", function() {
          mo(), Dn();
        }), d.addEventListener("matchMediaRevert", function() {
          return vo();
        }), d.addEventListener("matchMedia", function() {
          Ht(0, 1), Vt("matchMedia");
        }), d.matchMedia().add("(orientation: portrait)", function() {
          return un(), un;
        })) : console.warn("Requires GSAP 3.11.0 or later"), un(), de(I, "scroll", er);
        var t = F.hasAttribute("style"), r = F.style, o = r.borderTopStyle, u = d.core.Animation.prototype, l, p;
        for (u.revert || Object.defineProperty(u, "revert", {
          value: function() {
            return this.time(-0.01, !0);
          }
        }), r.borderTopStyle = "solid", l = yt(F), ae.m = Math.round(l.top + ae.sc()) || 0, Ie.m = Math.round(l.left + Ie.sc()) || 0, o ? r.borderTopStyle = o : r.removeProperty("border-top-style"), t || (F.setAttribute("style", ""), F.removeAttribute("style")), Fr = setInterval(Xn, 250), d.delayedCall(0.5, function() {
          return Ir = 0;
        }), de(I, "touchcancel", ut), de(F, "touchstart", ut), Br(de, I, "pointerdown,touchstart,mousedown", In), Br(de, I, "pointerup,touchend,mouseup", zn), _n = d.utils.checkPrefix("transform"), Zr.push(_n), tr = Se(), en = d.delayedCall(0.2, Ht).pause(), rr = [I, "visibilitychange", function() {
          var O = M.innerWidth, k = M.innerHeight;
          I.hidden ? (An = O, Ln = k) : (An !== O || Ln !== k) && yr();
        }, I, "DOMContentLoaded", Ht, M, "load", Ht, M, "resize", yr], zr(de), E.forEach(function(O) {
          return O.enable(0, 1);
        }), p = 0; p < P.length; p += 3)
          Nr(pe, P[p], P[p + 1]), Nr(pe, P[p], P[p + 2]);
      } else if (I) {
        var S = function O() {
          i.enable(), I.removeEventListener("DOMContentLoaded", O);
        };
        I.addEventListener("DOMContentLoaded", S);
      }
    }
  }, i.config = function(t) {
    "limitCallbacks" in t && (ln = !!t.limitCallbacks);
    var r = t.syncInterval;
    r && clearInterval(Fr) || (Fr = r) && setInterval(Xn, r), "ignoreMobileResize" in t && (vn = i.isTouch === 1 && t.ignoreMobileResize), "autoRefreshEvents" in t && (zr(pe) || zr(de, t.autoRefreshEvents || "none"), io = (t.autoRefreshEvents + "").indexOf("resize") === -1);
  }, i.scrollerProxy = function(t, r) {
    var o = Ne(t), u = P.indexOf(o), l = $t(o);
    ~u && P.splice(u, l ? 6 : 2), r && (l ? ft.unshift(M, r, F, r, $e, r) : ft.unshift(o, r));
  }, i.clearMatchMedia = function(t) {
    E.forEach(function(r) {
      return r._ctx && r._ctx.query === t && r._ctx.kill(!0, !0);
    });
  }, i.isInViewport = function(t, r, o) {
    var u = (Ue(t) ? Ne(t) : t).getBoundingClientRect(), l = u[o ? Wt : Gt] * r || 0;
    return o ? u.right - l > 0 && u.left + l < M.innerWidth : u.bottom - l > 0 && u.top + l < M.innerHeight;
  }, i.positionInViewport = function(t, r, o) {
    Ue(t) && (t = Ne(t));
    var u = t.getBoundingClientRect(), l = u[o ? Wt : Gt], p = r == null ? l / 2 : r in rn ? rn[r] * l : ~r.indexOf("%") ? parseFloat(r) * l / 100 : parseFloat(r) || 0;
    return o ? (u.left + p) / M.innerWidth : (u.top + p) / M.innerHeight;
  }, i.killAll = function(t) {
    if (E.slice(0).forEach(function(o) {
      return o.vars.id !== "ScrollSmoother" && o.kill();
    }), t !== !0) {
      var r = qt.killAll || [];
      qt = {}, r.forEach(function(o) {
        return o();
      });
    }
  }, i;
})();
D.version = "3.15.0";
D.saveStyles = function(i) {
  return i ? Pr(i).forEach(function(e) {
    if (e && e.style) {
      var n = Ge.indexOf(e);
      n >= 0 && Ge.splice(n, 5), Ge.push(e, e.style.cssText, e.getBBox && e.getAttribute("transform"), d.core.getCache(e), mn());
    }
  }) : Ge;
};
D.revert = function(i, e) {
  return Dn(!i, e);
};
D.create = function(i, e) {
  return new D(i, e);
};
D.refresh = function(i) {
  return i ? yr(!0) : (tr || D.register()) && Ht(!0);
};
D.update = function(i) {
  return ++P.cache && bt(i === !0 ? 2 : 0);
};
D.clearScrollMemory = yo;
D.maxScroll = function(i, e) {
  return ct(i, e ? Ie : ae);
};
D.getScrollFunc = function(i, e) {
  return At(Ne(i), e ? Ie : ae);
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
D.snapDirectional = Pn;
D.addEventListener = function(i, e) {
  var n = qt[i] || (qt[i] = []);
  ~n.indexOf(e) || n.push(e);
};
D.removeEventListener = function(i, e) {
  var n = qt[i], t = n && n.indexOf(e);
  t >= 0 && n.splice(t, 1);
};
D.batch = function(i, e) {
  var n = [], t = {}, r = e.interval || 0.016, o = e.batchMax || 1e9, u = function(S, O) {
    var k = [], g = [], c = d.delayedCall(r, function() {
      O(k, g), k = [], g = [];
    }).pause();
    return function(v) {
      k.length || c.restart(!0), k.push(v.trigger), g.push(v), o <= k.length && c.progress(1);
    };
  }, l;
  for (l in e)
    t[l] = l.substr(0, 2) === "on" && Te(e[l]) && l !== "onRefreshInit" ? u(l, e[l]) : e[l];
  return Te(o) && (o = o(), de(D, "refresh", function() {
    return o = e.batchMax();
  })), Pr(i).forEach(function(p) {
    var S = {};
    for (l in t)
      S[l] = t[l];
    S.trigger = p, n.push(D.create(S));
  }), n;
};
var qn = function(e, n, t, r) {
  return n > r ? e(r) : n < 0 && e(0), t > r ? (r - n) / (t - n) : t < 0 ? n / (n - t) : 1;
}, fn = function i(e, n) {
  n === !0 ? e.style.removeProperty("touch-action") : e.style.touchAction = n === !0 ? "auto" : n ? "pan-" + n + (J.isTouch ? " pinch-zoom" : "") : "none", e === $e && i(F, n);
}, Ur = {
  auto: 1,
  scroll: 1
}, Bo = function(e) {
  var n = e.event, t = e.target, r = e.axis, o = (n.changedTouches ? n.changedTouches[0] : n).target, u = o._gsap || d.core.getCache(o), l = Se(), p;
  if (!u._isScrollT || l - u._isScrollT > 2e3) {
    for (; o && o !== F && (o.scrollHeight <= o.clientHeight && o.scrollWidth <= o.clientWidth || !(Ur[(p = Qe(o)).overflowY] || Ur[p.overflowX])); )
      o = o.parentNode;
    u._isScroll = o && o !== t && !$t(o) && (Ur[(p = Qe(o)).overflowY] || Ur[p.overflowX]), u._isScrollT = l;
  }
  (u._isScroll || r === "x") && (n.stopPropagation(), n._gsapAllow = !0);
}, wo = function(e, n, t, r) {
  return J.create({
    target: e,
    capture: !0,
    debounce: !1,
    lockAxis: !0,
    type: n,
    onWheel: r = r && Bo,
    onPress: r,
    onDrag: r,
    onScroll: r,
    onEnable: function() {
      return t && de(I, J.eventTypes[0], Kn, !1, !0);
    },
    onDisable: function() {
      return pe(I, J.eventTypes[0], Kn, !0);
    }
  });
}, No = /(input|label|select|textarea)/i, Vn, Kn = function(e) {
  var n = No.test(e.target.tagName);
  (n || Vn) && (e._gsapAllow = !0, Vn = n);
}, Xo = function(e) {
  Xt(e) || (e = {}), e.preventDefault = e.isNormalizer = e.allowClicks = !0, e.type || (e.type = "wheel,touch"), e.debounce = !!e.debounce, e.id = e.id || "normalizer";
  var n = e, t = n.normalizeScrollX, r = n.momentum, o = n.allowNestedScroll, u = n.onRelease, l, p, S = Ne(e.target) || $e, O = d.core.globals().ScrollSmoother, k = O && O.get(), g = Pt && (e.content && Ne(e.content) || k && e.content !== !1 && !k.smooth() && k.content()), c = At(S, ae), v = At(S, Ie), U = 1, N = (J.isTouch && M.visualViewport ? M.visualViewport.scale * M.visualViewport.width : M.outerWidth) / M.innerWidth, ne = 0, W = Te(r) ? function() {
    return r(l);
  } : function() {
    return r || 2.8;
  }, ge, T, Ve = wo(S, e.type, !0, o), X = function() {
    return T = !1;
  }, x = ut, ke = ut, ze = function() {
    p = ct(S, ae), ke = wr(Pt ? 1 : 0, p), t && (x = wr(0, ct(S, Ie))), ge = Ut;
  }, h = function() {
    g._gsap.y = vr(parseFloat(g._gsap.y) + c.offset) + "px", g.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(g._gsap.y) + ", 0, 1)", c.offset = c.cacheID = 0;
  }, ue = function() {
    if (T) {
      requestAnimationFrame(X);
      var Q = vr(l.deltaY / 2), j = ke(c.v - Q);
      if (g && j !== c.v + c.offset) {
        c.offset = j - c.v;
        var s = vr((parseFloat(g && g._gsap.y) || 0) - c.offset);
        g.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + s + ", 0, 1)", g._gsap.y = s + "px", c.cacheID = P.cache, bt();
      }
      return !0;
    }
    c.offset && h(), T = !0;
  }, y, pt, oe, Ee, Me = function() {
    ze(), y.isActive() && y.vars.scrollY > p && (c() > p ? y.progress(1) && c(p) : y.resetTo("scrollY", p));
  };
  return g && d.set(g, {
    y: "+=0"
  }), e.ignoreCheck = function(z) {
    return Pt && z.type === "touchmove" && ue() || U > 1.05 && z.type !== "touchstart" || l.isGesturing || z.touches && z.touches.length > 1;
  }, e.onPress = function() {
    T = !1;
    var z = U;
    U = vr((M.visualViewport && M.visualViewport.scale || 1) / N), y.pause(), z !== U && fn(S, U > 1.01 ? !0 : t ? !1 : "x"), pt = v(), oe = c(), ze(), ge = Ut;
  }, e.onRelease = e.onGestureStart = function(z, Q) {
    if (c.offset && h(), !Q)
      Ee.restart(!0);
    else {
      P.cache++;
      var j = W(), s, ie;
      t && (s = v(), ie = s + j * 0.05 * -z.velocityX / 0.227, j *= qn(v, s, ie, ct(S, Ie)), y.vars.scrollX = x(ie)), s = c(), ie = s + j * 0.05 * -z.velocityY / 0.227, j *= qn(c, s, ie, ct(S, ae)), y.vars.scrollY = ke(ie), y.invalidate().duration(j).play(0.01), (Pt && y.vars.scrollY >= p || s >= p - 1) && d.to({}, {
        onUpdate: Me,
        duration: j
      });
    }
    u && u(z);
  }, e.onWheel = function() {
    y._ts && y.pause(), Se() - ne > 1e3 && (ge = 0, ne = Se());
  }, e.onChange = function(z, Q, j, s, ie) {
    if (Ut !== ge && ze(), Q && t && v(x(s[2] === Q ? pt + (z.startX - z.x) : v() + Q - s[1])), j) {
      c.offset && h();
      var Lt = ie[2] === j, wt = Lt ? oe + z.startY - z.y : c() + j - ie[1], Ke = ke(wt);
      Lt && wt !== Ke && (oe += Ke - wt), c(Ke);
    }
    (j || Q) && bt();
  }, e.onEnable = function() {
    fn(S, t ? !1 : "x"), D.addEventListener("refresh", Me), de(M, "resize", Me), c.smooth && (c.target.style.scrollBehavior = "auto", c.smooth = v.smooth = !1), Ve.enable();
  }, e.onDisable = function() {
    fn(S, !0), pe(M, "resize", Me), D.removeEventListener("refresh", Me), Ve.kill();
  }, e.lockAxis = e.lockAxis !== !1, l = new J(e), l.iOS = Pt, Pt && !c() && c(1), Pt && d.ticker.add(ut), Ee = l._dc, y = d.to(l, {
    ease: "power4",
    paused: !0,
    inherit: !1,
    scrollX: t ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: bo(c, c(), function() {
        return y.pause();
      })
    },
    onUpdate: bt,
    onComplete: Ee.vars.onComplete
  }), l;
};
D.sort = function(i) {
  if (Te(i))
    return E.sort(i);
  var e = M.pageYOffset || 0;
  return D.getAll().forEach(function(n) {
    return n._sortY = n.trigger ? e + n.trigger.getBoundingClientRect().top : n.start + M.innerHeight;
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
  var e = i instanceof J ? i : Xo(i);
  return Le && Le.target === e.target && Le.kill(), $t(e.target) && (Le = e), e;
};
D.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp: hn,
  _inputObserver: wo,
  _scrollers: P,
  _proxies: ft,
  bridge: {
    // when normalizeScroll sets the scroll position (ss = setScroll)
    ss: function() {
      je || Vt("scrollStart"), je = Se();
    },
    // a way to get the _refreshing value in Observer
    ref: function() {
      return Ce;
    }
  }
};
uo() && d.registerPlugin(D);
Qr.registerPlugin(D);
function Ho() {
  const i = document.querySelector(".hero h1"), e = document.querySelector(".hero__lead");
  i && Qr.fromTo(
    [i, e].filter(Boolean),
    { opacity: 0, y: 18 },
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out" }
  );
}
function pn(i) {
  const e = document.querySelectorAll(i);
  e.length && (Qr.set(e, { opacity: 0, y: 24 }), e.forEach((n, t) => {
    D.create({
      trigger: n,
      start: "top 88%",
      once: !0,
      onEnter: () => Qr.to(n, { opacity: 1, y: 0, duration: 0.5, delay: t % 4 * 0.06, ease: "power2.out" })
    });
  }));
}
function Zn() {
  Ho(), pn(".section-card"), pn(".system-button"), pn(".system-card");
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", Zn) : Zn();
