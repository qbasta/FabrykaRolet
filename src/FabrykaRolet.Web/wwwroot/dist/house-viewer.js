var Er = Object.defineProperty;
var zr = (h, t, e) => t in h ? Er(h, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : h[t] = e;
var tt = (h, t, e) => zr(h, typeof t != "symbol" ? t + "" : t, e);
function gt(h) {
  if (h === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return h;
}
function Ii(h, t) {
  h.prototype = Object.create(t.prototype), h.prototype.constructor = h, h.__proto__ = t;
}
/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var st = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, ue = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, Je, G, A, ft = 1e8, M = 1 / ft, Ne = Math.PI * 2, Fr = Ne / 4, Lr = 0, Bi = Math.sqrt, Ir = Math.cos, Br = Math.sin, X = function(t) {
  return typeof t == "string";
}, I = function(t) {
  return typeof t == "function";
}, vt = function(t) {
  return typeof t == "number";
}, ti = function(t) {
  return typeof t > "u";
}, pt = function(t) {
  return typeof t == "object";
}, K = function(t) {
  return t !== !1;
}, ei = function() {
  return typeof window < "u";
}, ge = function(t) {
  return I(t) || X(t);
}, Ni = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, $ = Array.isArray, Nr = /random\([^)]+\)/g, Vr = /,\s*/g, yi = /(?:-?\.?\d|\.)+/gi, Vi = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, Xt = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, Ae = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, qi = /[+-]=-?[.\d]+/, qr = /[^,'"\[\]\s]+/gi, Ur = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, E, _t, Ve, ii, at = {}, Te = {}, Ui, Yi = function(t) {
  return (Te = Kt(t, at)) && J;
}, ri = function(t, e) {
  return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()");
}, he = function(t, e) {
  return !e && console.warn(t);
}, Xi = function(t, e) {
  return t && (at[t] = e) && Te && (Te[t] = e) || at;
}, fe = function() {
  return 0;
}, Yr = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, ye = {
  suppressEvents: !0,
  kill: !1
}, Xr = {
  suppressEvents: !0
}, ni = {}, Pt = [], qe = {}, Gi, et = {}, Re = {}, vi = 30, ve = [], si = "", ai = function(t) {
  var e = t[0], i, r;
  if (pt(e) || I(e) || (t = [t]), !(i = (e._gsap || {}).harness)) {
    for (r = ve.length; r-- && !ve[r].targetTest(e); )
      ;
    i = ve[r];
  }
  for (r = t.length; r--; )
    t[r] && (t[r]._gsap || (t[r]._gsap = new cr(t[r], i))) || t.splice(r, 1);
  return t;
}, Lt = function(t) {
  return t._gsap || ai(lt(t))[0]._gsap;
}, Wi = function(t, e, i) {
  return (i = t[e]) && I(i) ? t[e]() : ti(i) && t.getAttribute && t.getAttribute(e) || i;
}, Q = function(t, e) {
  return (t = t.split(",")).forEach(e) || t;
}, V = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, R = function(t) {
  return Math.round(t * 1e7) / 1e7 || 0;
}, Wt = function(t, e) {
  var i = e.charAt(0), r = parseFloat(e.substr(2));
  return t = parseFloat(t), i === "+" ? t + r : i === "-" ? t - r : i === "*" ? t * r : t / r;
}, Gr = function(t, e) {
  for (var i = e.length, r = 0; t.indexOf(e[r]) < 0 && ++r < i; )
    ;
  return r < i;
}, we = function() {
  var t = Pt.length, e = Pt.slice(0), i, r;
  for (qe = {}, Pt.length = 0, i = 0; i < t; i++)
    r = e[i], r && r._lazy && (r.render(r._lazy[0], r._lazy[1], !0)._lazy = 0);
}, oi = function(t) {
  return !!(t._initted || t._startAt || t.add);
}, $i = function(t, e, i, r) {
  Pt.length && !G && we(), t.render(e, i, !!(G && e < 0 && oi(t))), Pt.length && !G && we();
}, Hi = function(t) {
  var e = parseFloat(t);
  return (e || e === 0) && (t + "").match(qr).length < 2 ? e : X(t) ? t.trim() : t;
}, Ki = function(t) {
  return t;
}, ot = function(t, e) {
  for (var i in e)
    i in t || (t[i] = e[i]);
  return t;
}, Wr = function(t) {
  return function(e, i) {
    for (var r in i)
      r in e || r === "duration" && t || r === "ease" || (e[r] = i[r]);
  };
}, Kt = function(t, e) {
  for (var i in e)
    t[i] = e[i];
  return t;
}, xi = function h(t, e) {
  for (var i in e)
    i !== "__proto__" && i !== "constructor" && i !== "prototype" && (t[i] = pt(e[i]) ? h(t[i] || (t[i] = {}), e[i]) : e[i]);
  return t;
}, be = function(t, e) {
  var i = {}, r;
  for (r in t)
    r in e || (i[r] = t[r]);
  return i;
}, se = function(t) {
  var e = t.parent || E, i = t.keyframes ? Wr($(t.keyframes)) : ot;
  if (K(t.inherit))
    for (; e; )
      i(t, e.vars.defaults), e = e.parent || e._dp;
  return t;
}, $r = function(t, e) {
  for (var i = t.length, r = i === e.length; r && i-- && t[i] === e[i]; )
    ;
  return i < 0;
}, Qi = function(t, e, i, r, n) {
  var s = t[r], a;
  if (n)
    for (a = e[n]; s && s[n] > a; )
      s = s._prev;
  return s ? (e._next = s._next, s._next = e) : (e._next = t[i], t[i] = e), e._next ? e._next._prev = e : t[r] = e, e._prev = s, e.parent = e._dp = t, e;
}, Ce = function(t, e, i, r) {
  i === void 0 && (i = "_first"), r === void 0 && (r = "_last");
  var n = e._prev, s = e._next;
  n ? n._next = s : t[i] === e && (t[i] = s), s ? s._prev = n : t[r] === e && (t[r] = n), e._next = e._prev = e.parent = null;
}, Ot = function(t, e) {
  t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove && t.parent.remove(t), t._act = 0;
}, It = function(t, e) {
  if (t && (!e || e._end > t._dur || e._start < 0))
    for (var i = t; i; )
      i._dirty = 1, i = i.parent;
  return t;
}, Hr = function(t) {
  for (var e = t.parent; e && e.parent; )
    e._dirty = 1, e.totalDuration(), e = e.parent;
  return t;
}, Ue = function(t, e, i, r) {
  return t._startAt && (G ? t._startAt.revert(ye) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(e, !0, r));
}, Kr = function h(t) {
  return !t || t._ts && h(t.parent);
}, Ti = function(t) {
  return t._repeat ? Qt(t._tTime, t = t.duration() + t._rDelay) * t : 0;
}, Qt = function(t, e) {
  var i = Math.floor(t = R(t / e));
  return t && i === t ? i - 1 : i;
}, Pe = function(t, e) {
  return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur);
}, Me = function(t) {
  return t._end = R(t._start + (t._tDur / Math.abs(t._ts || t._rts || M) || 0));
}, De = function(t, e) {
  var i = t._dp;
  return i && i.smoothChildTiming && t._ts && (t._start = R(i._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)), Me(t), i._dirty || It(i, t)), t;
}, ji = function(t, e) {
  var i;
  if ((e._time || !e._dur && e._initted || e._start < t._time && (e._dur || !e.add)) && (i = Pe(t.rawTime(), e), (!e._dur || me(0, e.totalDuration(), i) - e._tTime > M) && e.render(i, !0)), It(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
    if (t._dur < t.duration())
      for (i = t; i._dp; )
        i.rawTime() >= 0 && i.totalTime(i._tTime), i = i._dp;
    t._zTime = -M;
  }
}, ct = function(t, e, i, r) {
  return e.parent && Ot(e), e._start = R((vt(i) ? i : i || t !== E ? ht(t, i, e) : t._time) + e._delay), e._end = R(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)), Qi(t, e, "_first", "_last", t._sort ? "_start" : 0), Ye(e) || (t._recent = e), r || ji(t, e), t._ts < 0 && De(t, t._tTime), t;
}, Zi = function(t, e) {
  return (at.ScrollTrigger || ri("scrollTrigger", e)) && at.ScrollTrigger.create(e, t);
}, Ji = function(t, e, i, r, n) {
  if (hi(t, e, n), !t._initted)
    return 1;
  if (!i && t._pt && !G && (t._dur && t.vars.lazy !== !1 || !t._dur && t.vars.lazy) && Gi !== it.frame)
    return Pt.push(t), t._lazy = [n, r], 1;
}, Qr = function h(t) {
  var e = t.parent;
  return e && e._ts && e._initted && !e._lock && (e.rawTime() < 0 || h(e));
}, Ye = function(t) {
  var e = t.data;
  return e === "isFromStart" || e === "isStart";
}, jr = function(t, e, i, r) {
  var n = t.ratio, s = e < 0 || !e && (!t._start && Qr(t) && !(!t._initted && Ye(t)) || (t._ts < 0 || t._dp._ts < 0) && !Ye(t)) ? 0 : 1, a = t._rDelay, o = 0, u, f, _;
  if (a && t._repeat && (o = me(0, t._tDur, e), f = Qt(o, a), t._yoyo && f & 1 && (s = 1 - s), f !== Qt(t._tTime, a) && (n = 1 - s, t.vars.repeatRefresh && t._initted && t.invalidate())), s !== n || G || r || t._zTime === M || !e && t._zTime) {
    if (!t._initted && Ji(t, e, r, i, o))
      return;
    for (_ = t._zTime, t._zTime = e || (i ? M : 0), i || (i = e && !_), t.ratio = s, t._from && (s = 1 - s), t._time = 0, t._tTime = o, u = t._pt; u; )
      u.r(s, u.d), u = u._next;
    e < 0 && Ue(t, e, i, !0), t._onUpdate && !i && rt(t, "onUpdate"), o && t._repeat && !i && t.parent && rt(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === s && (s && Ot(t, 1), !i && !G && (rt(t, s ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()));
  } else t._zTime || (t._zTime = e);
}, Zr = function(t, e, i) {
  var r;
  if (i > e)
    for (r = t._first; r && r._start <= i; ) {
      if (r.data === "isPause" && r._start > e)
        return r;
      r = r._next;
    }
  else
    for (r = t._last; r && r._start >= i; ) {
      if (r.data === "isPause" && r._start < e)
        return r;
      r = r._prev;
    }
}, jt = function(t, e, i, r) {
  var n = t._repeat, s = R(e) || 0, a = t._tTime / t._tDur;
  return a && !r && (t._time *= s / t._dur), t._dur = s, t._tDur = n ? n < 0 ? 1e10 : R(s * (n + 1) + t._rDelay * n) : s, a > 0 && !r && De(t, t._tTime = t._tDur * a), t.parent && Me(t), i || It(t.parent, t), t;
}, wi = function(t) {
  return t instanceof H ? It(t) : jt(t, t._dur);
}, Jr = {
  _start: 0,
  endTime: fe,
  totalDuration: fe
}, ht = function h(t, e, i) {
  var r = t.labels, n = t._recent || Jr, s = t.duration() >= ft ? n.endTime(!1) : t._dur, a, o, u;
  return X(e) && (isNaN(e) || e in r) ? (o = e.charAt(0), u = e.substr(-1) === "%", a = e.indexOf("="), o === "<" || o === ">" ? (a >= 0 && (e = e.replace(/=/, "")), (o === "<" ? n._start : n.endTime(n._repeat >= 0)) + (parseFloat(e.substr(1)) || 0) * (u ? (a < 0 ? n : i).totalDuration() / 100 : 1)) : a < 0 ? (e in r || (r[e] = s), r[e]) : (o = parseFloat(e.charAt(a - 1) + e.substr(a + 1)), u && i && (o = o / 100 * ($(i) ? i[0] : i).totalDuration()), a > 1 ? h(t, e.substr(0, a - 1), i) + o : s + o)) : e == null ? s : +e;
}, ae = function(t, e, i) {
  var r = vt(e[1]), n = (r ? 2 : 1) + (t < 2 ? 0 : 1), s = e[n], a, o;
  if (r && (s.duration = e[1]), s.parent = i, t) {
    for (a = s, o = i; o && !("immediateRender" in a); )
      a = o.vars.defaults || {}, o = K(o.vars.inherit) && o.parent;
    s.immediateRender = K(a.immediateRender), t < 2 ? s.runBackwards = 1 : s.startAt = e[n - 1];
  }
  return new q(e[0], s, e[n + 1]);
}, Mt = function(t, e) {
  return t || t === 0 ? e(t) : e;
}, me = function(t, e, i) {
  return i < t ? t : i > e ? e : i;
}, W = function(t, e) {
  return !X(t) || !(e = Ur.exec(t)) ? "" : e[1];
}, tn = function(t, e, i) {
  return Mt(i, function(r) {
    return me(t, e, r);
  });
}, Xe = [].slice, tr = function(t, e) {
  return t && pt(t) && "length" in t && (!e && !t.length || t.length - 1 in t && pt(t[0])) && !t.nodeType && t !== _t;
}, en = function(t, e, i) {
  return i === void 0 && (i = []), t.forEach(function(r) {
    var n;
    return X(r) && !e || tr(r, 1) ? (n = i).push.apply(n, lt(r)) : i.push(r);
  }) || i;
}, lt = function(t, e, i) {
  return A && !e && A.selector ? A.selector(t) : X(t) && !i && (Ve || !Zt()) ? Xe.call((e || ii).querySelectorAll(t), 0) : $(t) ? en(t, i) : tr(t) ? Xe.call(t, 0) : t ? [t] : [];
}, Ge = function(t) {
  return t = lt(t)[0] || he("Invalid scope") || {}, function(e) {
    var i = t.current || t.nativeElement || t;
    return lt(e, i.querySelectorAll ? i : i === t ? he("Invalid scope") || ii.createElement("div") : t);
  };
}, er = function(t) {
  return t.sort(function() {
    return 0.5 - Math.random();
  });
}, ir = function(t) {
  if (I(t))
    return t;
  var e = pt(t) ? t : {
    each: t
  }, i = Bt(e.ease), r = e.from || 0, n = parseFloat(e.base) || 0, s = {}, a = r > 0 && r < 1, o = isNaN(r) || a, u = e.axis, f = r, _ = r;
  return X(r) ? f = _ = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[r] || 0 : !a && o && (f = r[0], _ = r[1]), function(c, d, p) {
    var l = (p || e).length, m = s[l], v, y, x, T, g, S, w, P, b;
    if (!m) {
      if (b = e.grid === "auto" ? 0 : (e.grid || [1, ft])[1], !b) {
        for (w = -ft; w < (w = p[b++].getBoundingClientRect().left) && b < l; )
          ;
        b < l && b--;
      }
      for (m = s[l] = [], v = o ? Math.min(b, l) * f - 0.5 : r % b, y = b === ft ? 0 : o ? l * _ / b - 0.5 : r / b | 0, w = 0, P = ft, S = 0; S < l; S++)
        x = S % b - v, T = y - (S / b | 0), m[S] = g = u ? Math.abs(u === "y" ? T : x) : Bi(x * x + T * T), g > w && (w = g), g < P && (P = g);
      r === "random" && er(m), m.max = w - P, m.min = P, m.v = l = (parseFloat(e.amount) || parseFloat(e.each) * (b > l ? l - 1 : u ? u === "y" ? l / b : b : Math.max(b, l / b)) || 0) * (r === "edges" ? -1 : 1), m.b = l < 0 ? n - l : n, m.u = W(e.amount || e.each) || 0, i = i && l < 0 ? pn(i) : i;
    }
    return l = (m[c] - m.min) / m.max || 0, R(m.b + (i ? i(l) : l) * m.v) + m.u;
  };
}, We = function(t) {
  var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
  return function(i) {
    var r = R(Math.round(parseFloat(i) / t) * t * e);
    return (r - r % 1) / e + (vt(i) ? 0 : W(i));
  };
}, rr = function(t, e) {
  var i = $(t), r, n;
  return !i && pt(t) && (r = i = t.radius || ft, t.values ? (t = lt(t.values), (n = !vt(t[0])) && (r *= r)) : t = We(t.increment)), Mt(e, i ? I(t) ? function(s) {
    return n = t(s), Math.abs(n - s) <= r ? n : s;
  } : function(s) {
    for (var a = parseFloat(n ? s.x : s), o = parseFloat(n ? s.y : 0), u = ft, f = 0, _ = t.length, c, d; _--; )
      n ? (c = t[_].x - a, d = t[_].y - o, c = c * c + d * d) : c = Math.abs(t[_] - a), c < u && (u = c, f = _);
    return f = !r || u <= r ? t[f] : s, n || f === s || vt(s) ? f : f + W(s);
  } : We(t));
}, nr = function(t, e, i, r) {
  return Mt($(t) ? !e : i === !0 ? !!(i = 0) : !r, function() {
    return $(t) ? t[~~(Math.random() * t.length)] : (i = i || 1e-5) && (r = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) && Math.floor(Math.round((t - i / 2 + Math.random() * (e - t + i * 0.99)) / i) * i * r) / r;
  });
}, rn = function() {
  for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
    e[i] = arguments[i];
  return function(r) {
    return e.reduce(function(n, s) {
      return s(n);
    }, r);
  };
}, nn = function(t, e) {
  return function(i) {
    return t(parseFloat(i)) + (e || W(i));
  };
}, sn = function(t, e, i) {
  return ar(t, e, 0, 1, i);
}, sr = function(t, e, i) {
  return Mt(i, function(r) {
    return t[~~e(r)];
  });
}, an = function h(t, e, i) {
  var r = e - t;
  return $(t) ? sr(t, h(0, t.length), e) : Mt(i, function(n) {
    return (r + (n - t) % r) % r + t;
  });
}, on = function h(t, e, i) {
  var r = e - t, n = r * 2;
  return $(t) ? sr(t, h(0, t.length - 1), e) : Mt(i, function(s) {
    return s = (n + (s - t) % n) % n || 0, t + (s > r ? n - s : s);
  });
}, le = function(t) {
  return t.replace(Nr, function(e) {
    var i = e.indexOf("[") + 1, r = e.substring(i || 7, i ? e.indexOf("]") : e.length - 1).split(Vr);
    return nr(i ? r : +r[0], i ? 0 : +r[1], +r[2] || 1e-5);
  });
}, ar = function(t, e, i, r, n) {
  var s = e - t, a = r - i;
  return Mt(n, function(o) {
    return i + ((o - t) / s * a || 0);
  });
}, un = function h(t, e, i, r) {
  var n = isNaN(t + e) ? 0 : function(d) {
    return (1 - d) * t + d * e;
  };
  if (!n) {
    var s = X(t), a = {}, o, u, f, _, c;
    if (i === !0 && (r = 1) && (i = null), s)
      t = {
        p: t
      }, e = {
        p: e
      };
    else if ($(t) && !$(e)) {
      for (f = [], _ = t.length, c = _ - 2, u = 1; u < _; u++)
        f.push(h(t[u - 1], t[u]));
      _--, n = function(p) {
        p *= _;
        var l = Math.min(c, ~~p);
        return f[l](p - l);
      }, i = e;
    } else r || (t = Kt($(t) ? [] : {}, t));
    if (!f) {
      for (o in e)
        ui.call(a, t, o, "get", e[o]);
      n = function(p) {
        return _i(p, a) || (s ? t.p : t);
      };
    }
  }
  return Mt(i, n);
}, bi = function(t, e, i) {
  var r = t.labels, n = ft, s, a, o;
  for (s in r)
    a = r[s] - e, a < 0 == !!i && a && n > (a = Math.abs(a)) && (o = s, n = a);
  return o;
}, rt = function(t, e, i) {
  var r = t.vars, n = r[e], s = A, a = t._ctx, o, u, f;
  if (n)
    return o = r[e + "Params"], u = r.callbackScope || t, i && Pt.length && we(), a && (A = a), f = o ? n.apply(u, o) : n.call(u), A = s, f;
}, re = function(t) {
  return Ot(t), t.scrollTrigger && t.scrollTrigger.kill(!!G), t.progress() < 1 && rt(t, "onInterrupt"), t;
}, Gt, or = [], ur = function(t) {
  if (t)
    if (t = !t.name && t.default || t, ei() || t.headless) {
      var e = t.name, i = I(t), r = e && !i && t.init ? function() {
        this._props = [];
      } : t, n = {
        init: fe,
        render: _i,
        add: ui,
        kill: Sn,
        modifier: Pn,
        rawVars: 0
      }, s = {
        targetTest: 0,
        get: 0,
        getSetter: li,
        aliases: {},
        register: 0
      };
      if (Zt(), t !== r) {
        if (et[e])
          return;
        ot(r, ot(be(t, n), s)), Kt(r.prototype, Kt(n, be(t, s))), et[r.prop = e] = r, t.targetTest && (ve.push(r), ni[e] = 1), e = (e === "css" ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin";
      }
      Xi(e, r), t.register && t.register(J, r, j);
    } else
      or.push(t);
}, C = 255, ne = {
  aqua: [0, C, C],
  lime: [0, C, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, C],
  navy: [0, 0, 128],
  white: [C, C, C],
  olive: [128, 128, 0],
  yellow: [C, C, 0],
  orange: [C, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [C, 0, 0],
  pink: [C, 192, 203],
  cyan: [0, C, C],
  transparent: [C, C, C, 0]
}, Ee = function(t, e, i) {
  return t += t < 0 ? 1 : t > 1 ? -1 : 0, (t * 6 < 1 ? e + (i - e) * t * 6 : t < 0.5 ? i : t * 3 < 2 ? e + (i - e) * (2 / 3 - t) * 6 : e) * C + 0.5 | 0;
}, hr = function(t, e, i) {
  var r = t ? vt(t) ? [t >> 16, t >> 8 & C, t & C] : 0 : ne.black, n, s, a, o, u, f, _, c, d, p;
  if (!r) {
    if (t.substr(-1) === "," && (t = t.substr(0, t.length - 1)), ne[t])
      r = ne[t];
    else if (t.charAt(0) === "#") {
      if (t.length < 6 && (n = t.charAt(1), s = t.charAt(2), a = t.charAt(3), t = "#" + n + n + s + s + a + a + (t.length === 5 ? t.charAt(4) + t.charAt(4) : "")), t.length === 9)
        return r = parseInt(t.substr(1, 6), 16), [r >> 16, r >> 8 & C, r & C, parseInt(t.substr(7), 16) / 255];
      t = parseInt(t.substr(1), 16), r = [t >> 16, t >> 8 & C, t & C];
    } else if (t.substr(0, 3) === "hsl") {
      if (r = p = t.match(yi), !e)
        o = +r[0] % 360 / 360, u = +r[1] / 100, f = +r[2] / 100, s = f <= 0.5 ? f * (u + 1) : f + u - f * u, n = f * 2 - s, r.length > 3 && (r[3] *= 1), r[0] = Ee(o + 1 / 3, n, s), r[1] = Ee(o, n, s), r[2] = Ee(o - 1 / 3, n, s);
      else if (~t.indexOf("="))
        return r = t.match(Vi), i && r.length < 4 && (r[3] = 1), r;
    } else
      r = t.match(yi) || ne.transparent;
    r = r.map(Number);
  }
  return e && !p && (n = r[0] / C, s = r[1] / C, a = r[2] / C, _ = Math.max(n, s, a), c = Math.min(n, s, a), f = (_ + c) / 2, _ === c ? o = u = 0 : (d = _ - c, u = f > 0.5 ? d / (2 - _ - c) : d / (_ + c), o = _ === n ? (s - a) / d + (s < a ? 6 : 0) : _ === s ? (a - n) / d + 2 : (n - s) / d + 4, o *= 60), r[0] = ~~(o + 0.5), r[1] = ~~(u * 100 + 0.5), r[2] = ~~(f * 100 + 0.5)), i && r.length < 4 && (r[3] = 1), r;
}, fr = function(t) {
  var e = [], i = [], r = -1;
  return t.split(St).forEach(function(n) {
    var s = n.match(Xt) || [];
    e.push.apply(e, s), i.push(r += s.length + 1);
  }), e.c = i, e;
}, Pi = function(t, e, i) {
  var r = "", n = (t + r).match(St), s = e ? "hsla(" : "rgba(", a = 0, o, u, f, _;
  if (!n)
    return t;
  if (n = n.map(function(c) {
    return (c = hr(c, e, 1)) && s + (e ? c[0] + "," + c[1] + "%," + c[2] + "%," + c[3] : c.join(",")) + ")";
  }), i && (f = fr(t), o = i.c, o.join(r) !== f.c.join(r)))
    for (u = t.replace(St, "1").split(Xt), _ = u.length - 1; a < _; a++)
      r += u[a] + (~o.indexOf(a) ? n.shift() || s + "0,0,0,0)" : (f.length ? f : n.length ? n : i).shift());
  if (!u)
    for (u = t.split(St), _ = u.length - 1; a < _; a++)
      r += u[a] + n[a];
  return r + u[_];
}, St = (function() {
  var h = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", t;
  for (t in ne)
    h += "|" + t + "\\b";
  return new RegExp(h + ")", "gi");
})(), hn = /hsl[a]?\(/, lr = function(t) {
  var e = t.join(" "), i;
  if (St.lastIndex = 0, St.test(e))
    return i = hn.test(e), t[1] = Pi(t[1], i), t[0] = Pi(t[0], i, fr(t[1])), !0;
}, _e, it = (function() {
  var h = Date.now, t = 500, e = 33, i = h(), r = i, n = 1e3 / 240, s = n, a = [], o, u, f, _, c, d, p = function l(m) {
    var v = h() - r, y = m === !0, x, T, g, S;
    if ((v > t || v < 0) && (i += v - e), r += v, g = r - i, x = g - s, (x > 0 || y) && (S = ++_.frame, c = g - _.time * 1e3, _.time = g = g / 1e3, s += x + (x >= n ? 4 : n - x), T = 1), y || (o = u(l)), T)
      for (d = 0; d < a.length; d++)
        a[d](g, c, S, m);
  };
  return _ = {
    time: 0,
    frame: 0,
    tick: function() {
      p(!0);
    },
    deltaRatio: function(m) {
      return c / (1e3 / (m || 60));
    },
    wake: function() {
      Ui && (!Ve && ei() && (_t = Ve = window, ii = _t.document || {}, at.gsap = J, (_t.gsapVersions || (_t.gsapVersions = [])).push(J.version), Yi(Te || _t.GreenSockGlobals || !_t.gsap && _t || {}), or.forEach(ur)), f = typeof requestAnimationFrame < "u" && requestAnimationFrame, o && _.sleep(), u = f || function(m) {
        return setTimeout(m, s - _.time * 1e3 + 1 | 0);
      }, _e = 1, p(2));
    },
    sleep: function() {
      (f ? cancelAnimationFrame : clearTimeout)(o), _e = 0, u = fe;
    },
    lagSmoothing: function(m, v) {
      t = m || 1 / 0, e = Math.min(v || 33, t);
    },
    fps: function(m) {
      n = 1e3 / (m || 240), s = _.time * 1e3 + n;
    },
    add: function(m, v, y) {
      var x = v ? function(T, g, S, w) {
        m(T, g, S, w), _.remove(x);
      } : m;
      return _.remove(m), a[y ? "unshift" : "push"](x), Zt(), x;
    },
    remove: function(m, v) {
      ~(v = a.indexOf(m)) && a.splice(v, 1) && d >= v && d--;
    },
    _listeners: a
  }, _;
})(), Zt = function() {
  return !_e && it.wake();
}, k = {}, fn = /^[\d.\-M][\d.\-,\s]/, ln = /["']/g, _n = function(t) {
  for (var e = {}, i = t.substr(1, t.length - 3).split(":"), r = i[0], n = 1, s = i.length, a, o, u; n < s; n++)
    o = i[n], a = n !== s - 1 ? o.lastIndexOf(",") : o.length, u = o.substr(0, a), e[r] = isNaN(u) ? u.replace(ln, "").trim() : +u, r = o.substr(a + 1).trim();
  return e;
}, cn = function(t) {
  var e = t.indexOf("(") + 1, i = t.indexOf(")"), r = t.indexOf("(", e);
  return t.substring(e, ~r && r < i ? t.indexOf(")", i + 1) : i);
}, dn = function(t) {
  var e = (t + "").split("("), i = k[e[0]];
  return i && e.length > 1 && i.config ? i.config.apply(null, ~t.indexOf("{") ? [_n(e[1])] : cn(t).split(",").map(Hi)) : k._CE && fn.test(t) ? k._CE("", t) : i;
}, pn = function(t) {
  return function(e) {
    return 1 - t(1 - e);
  };
}, Bt = function(t, e) {
  return t && (I(t) ? t : k[t] || dn(t)) || e;
}, Vt = function(t, e, i, r) {
  i === void 0 && (i = function(o) {
    return 1 - e(1 - o);
  }), r === void 0 && (r = function(o) {
    return o < 0.5 ? e(o * 2) / 2 : 1 - e((1 - o) * 2) / 2;
  });
  var n = {
    easeIn: e,
    easeOut: i,
    easeInOut: r
  }, s;
  return Q(t, function(a) {
    k[a] = at[a] = n, k[s = a.toLowerCase()] = i;
    for (var o in n)
      k[s + (o === "easeIn" ? ".in" : o === "easeOut" ? ".out" : ".inOut")] = k[a + "." + o] = n[o];
  }), n;
}, _r = function(t) {
  return function(e) {
    return e < 0.5 ? (1 - t(1 - e * 2)) / 2 : 0.5 + t((e - 0.5) * 2) / 2;
  };
}, ze = function h(t, e, i) {
  var r = e >= 1 ? e : 1, n = (i || (t ? 0.3 : 0.45)) / (e < 1 ? e : 1), s = n / Ne * (Math.asin(1 / r) || 0), a = function(f) {
    return f === 1 ? 1 : r * Math.pow(2, -10 * f) * Br((f - s) * n) + 1;
  }, o = t === "out" ? a : t === "in" ? function(u) {
    return 1 - a(1 - u);
  } : _r(a);
  return n = Ne / n, o.config = function(u, f) {
    return h(t, u, f);
  }, o;
}, Fe = function h(t, e) {
  e === void 0 && (e = 1.70158);
  var i = function(s) {
    return s ? --s * s * ((e + 1) * s + e) + 1 : 0;
  }, r = t === "out" ? i : t === "in" ? function(n) {
    return 1 - i(1 - n);
  } : _r(i);
  return r.config = function(n) {
    return h(t, n);
  }, r;
};
Q("Linear,Quad,Cubic,Quart,Quint,Strong", function(h, t) {
  var e = t < 5 ? t + 1 : t;
  Vt(h + ",Power" + (e - 1), t ? function(i) {
    return Math.pow(i, e);
  } : function(i) {
    return i;
  }, function(i) {
    return 1 - Math.pow(1 - i, e);
  }, function(i) {
    return i < 0.5 ? Math.pow(i * 2, e) / 2 : 1 - Math.pow((1 - i) * 2, e) / 2;
  });
});
k.Linear.easeNone = k.none = k.Linear.easeIn;
Vt("Elastic", ze("in"), ze("out"), ze());
(function(h, t) {
  var e = 1 / t, i = 2 * e, r = 2.5 * e, n = function(a) {
    return a < e ? h * a * a : a < i ? h * Math.pow(a - 1.5 / t, 2) + 0.75 : a < r ? h * (a -= 2.25 / t) * a + 0.9375 : h * Math.pow(a - 2.625 / t, 2) + 0.984375;
  };
  Vt("Bounce", function(s) {
    return 1 - n(1 - s);
  }, n);
})(7.5625, 2.75);
Vt("Expo", function(h) {
  return Math.pow(2, 10 * (h - 1)) * h + h * h * h * h * h * h * (1 - h);
});
Vt("Circ", function(h) {
  return -(Bi(1 - h * h) - 1);
});
Vt("Sine", function(h) {
  return h === 1 ? 1 : -Ir(h * Fr) + 1;
});
Vt("Back", Fe("in"), Fe("out"), Fe());
k.SteppedEase = k.steps = at.SteppedEase = {
  config: function(t, e) {
    t === void 0 && (t = 1);
    var i = 1 / t, r = t + (e ? 0 : 1), n = e ? 1 : 0, s = 1 - M;
    return function(a) {
      return ((r * me(0, s, a) | 0) + n) * i;
    };
  }
};
ue.ease = k["quad.out"];
Q("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(h) {
  return si += h + "," + h + "Params,";
});
var cr = function(t, e) {
  this.id = Lr++, t._gsap = this, this.target = t, this.harness = e, this.get = e ? e.get : Wi, this.set = e ? e.getSetter : li;
}, ce = /* @__PURE__ */ (function() {
  function h(e) {
    this.vars = e, this._delay = +e.delay || 0, (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) && (this._rDelay = e.repeatDelay || 0, this._yoyo = !!e.yoyo || !!e.yoyoEase), this._ts = 1, jt(this, +e.duration, 1, 1), this.data = e.data, A && (this._ctx = A, A.data.push(this)), _e || it.wake();
  }
  var t = h.prototype;
  return t.delay = function(i) {
    return i || i === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + i - this._delay), this._delay = i, this) : this._delay;
  }, t.duration = function(i) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? i + (i + this._rDelay) * this._repeat : i) : this.totalDuration() && this._dur;
  }, t.totalDuration = function(i) {
    return arguments.length ? (this._dirty = 0, jt(this, this._repeat < 0 ? i : (i - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, t.totalTime = function(i, r) {
    if (Zt(), !arguments.length)
      return this._tTime;
    var n = this._dp;
    if (n && n.smoothChildTiming && this._ts) {
      for (De(this, i), !n._dp || n.parent || ji(n, this); n && n.parent; )
        n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0), n = n.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && i < this._tDur || this._ts < 0 && i > 0 || !this._tDur && !i) && ct(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== i || !this._dur && !r || this._initted && Math.abs(this._zTime) === M || !this._initted && this._dur && i || !i && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = i), $i(this, i, r)), this;
  }, t.time = function(i, r) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), i + Ti(this)) % (this._dur + this._rDelay) || (i ? this._dur : 0), r) : this._time;
  }, t.totalProgress = function(i, r) {
    return arguments.length ? this.totalTime(this.totalDuration() * i, r) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, t.progress = function(i, r) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - i : i) + Ti(this), r) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, t.iteration = function(i, r) {
    var n = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (i - 1) * n, r) : this._repeat ? Qt(this._tTime, n) + 1 : 1;
  }, t.timeScale = function(i, r) {
    if (!arguments.length)
      return this._rts === -M ? 0 : this._rts;
    if (this._rts === i)
      return this;
    var n = this.parent && this._ts ? Pe(this.parent._time, this) : this._tTime;
    return this._rts = +i || 0, this._ts = this._ps || i === -M ? 0 : this._rts, this.totalTime(me(-Math.abs(this._delay), this.totalDuration(), n), r !== !1), Me(this), Hr(this);
  }, t.paused = function(i) {
    return arguments.length ? (this._ps !== i && (this._ps = i, i ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (Zt(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== M && (this._tTime -= M)))), this) : this._ps;
  }, t.startTime = function(i) {
    if (arguments.length) {
      this._start = R(i);
      var r = this.parent || this._dp;
      return r && (r._sort || !this.parent) && ct(r, this, this._start - this._delay), this;
    }
    return this._start;
  }, t.endTime = function(i) {
    return this._start + (K(i) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, t.rawTime = function(i) {
    var r = this.parent || this._dp;
    return r ? i && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Pe(r.rawTime(i), this) : this._tTime : this._tTime;
  }, t.revert = function(i) {
    i === void 0 && (i = Xr);
    var r = G;
    return G = i, oi(this) && (this.timeline && this.timeline.revert(i), this.totalTime(-0.01, i.suppressEvents)), this.data !== "nested" && i.kill !== !1 && this.kill(), G = r, this;
  }, t.globalTime = function(i) {
    for (var r = this, n = arguments.length ? i : r.rawTime(); r; )
      n = r._start + n / (Math.abs(r._ts) || 1), r = r._dp;
    return !this.parent && this._sat ? this._sat.globalTime(i) : n;
  }, t.repeat = function(i) {
    return arguments.length ? (this._repeat = i === 1 / 0 ? -2 : i, wi(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, t.repeatDelay = function(i) {
    if (arguments.length) {
      var r = this._time;
      return this._rDelay = i, wi(this), r ? this.time(r) : this;
    }
    return this._rDelay;
  }, t.yoyo = function(i) {
    return arguments.length ? (this._yoyo = i, this) : this._yoyo;
  }, t.seek = function(i, r) {
    return this.totalTime(ht(this, i), K(r));
  }, t.restart = function(i, r) {
    return this.play().totalTime(i ? -this._delay : 0, K(r)), this._dur || (this._zTime = -M), this;
  }, t.play = function(i, r) {
    return i != null && this.seek(i, r), this.reversed(!1).paused(!1);
  }, t.reverse = function(i, r) {
    return i != null && this.seek(i || this.totalDuration(), r), this.reversed(!0).paused(!1);
  }, t.pause = function(i, r) {
    return i != null && this.seek(i, r), this.paused(!0);
  }, t.resume = function() {
    return this.paused(!1);
  }, t.reversed = function(i) {
    return arguments.length ? (!!i !== this.reversed() && this.timeScale(-this._rts || (i ? -M : 0)), this) : this._rts < 0;
  }, t.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -M, this;
  }, t.isActive = function() {
    var i = this.parent || this._dp, r = this._start, n;
    return !!(!i || this._ts && this._initted && i.isActive() && (n = i.rawTime(!0)) >= r && n < this.endTime(!0) - M);
  }, t.eventCallback = function(i, r, n) {
    var s = this.vars;
    return arguments.length > 1 ? (r ? (s[i] = r, n && (s[i + "Params"] = n), i === "onUpdate" && (this._onUpdate = r)) : delete s[i], this) : s[i];
  }, t.then = function(i) {
    var r = this, n = r._prom;
    return new Promise(function(s) {
      var a = I(i) ? i : Ki, o = function() {
        var f = r.then;
        r.then = null, n && n(), I(a) && (a = a(r)) && (a.then || a === r) && (r.then = f), s(a), r.then = f;
      };
      r._initted && r.totalProgress() === 1 && r._ts >= 0 || !r._tTime && r._ts < 0 ? o() : r._prom = o;
    });
  }, t.kill = function() {
    re(this);
  }, h;
})();
ot(ce.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: !1,
  parent: null,
  _initted: !1,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -M,
  _prom: 0,
  _ps: !1,
  _rts: 1
});
var H = /* @__PURE__ */ (function(h) {
  Ii(t, h);
  function t(i, r) {
    var n;
    return i === void 0 && (i = {}), n = h.call(this, i) || this, n.labels = {}, n.smoothChildTiming = !!i.smoothChildTiming, n.autoRemoveChildren = !!i.autoRemoveChildren, n._sort = K(i.sortChildren), E && ct(i.parent || E, gt(n), r), i.reversed && n.reverse(), i.paused && n.paused(!0), i.scrollTrigger && Zi(gt(n), i.scrollTrigger), n;
  }
  var e = t.prototype;
  return e.to = function(r, n, s) {
    return ae(0, arguments, this), this;
  }, e.from = function(r, n, s) {
    return ae(1, arguments, this), this;
  }, e.fromTo = function(r, n, s, a) {
    return ae(2, arguments, this), this;
  }, e.set = function(r, n, s) {
    return n.duration = 0, n.parent = this, se(n).repeatDelay || (n.repeat = 0), n.immediateRender = !!n.immediateRender, new q(r, n, ht(this, s), 1), this;
  }, e.call = function(r, n, s) {
    return ct(this, q.delayedCall(0, r, n), s);
  }, e.staggerTo = function(r, n, s, a, o, u, f) {
    return s.duration = n, s.stagger = s.stagger || a, s.onComplete = u, s.onCompleteParams = f, s.parent = this, new q(r, s, ht(this, o)), this;
  }, e.staggerFrom = function(r, n, s, a, o, u, f) {
    return s.runBackwards = 1, se(s).immediateRender = K(s.immediateRender), this.staggerTo(r, n, s, a, o, u, f);
  }, e.staggerFromTo = function(r, n, s, a, o, u, f, _) {
    return a.startAt = s, se(a).immediateRender = K(a.immediateRender), this.staggerTo(r, n, a, o, u, f, _);
  }, e.render = function(r, n, s) {
    var a = this._time, o = this._dirty ? this.totalDuration() : this._tDur, u = this._dur, f = r <= 0 ? 0 : R(r), _ = this._zTime < 0 != r < 0 && (this._initted || !u), c, d, p, l, m, v, y, x, T, g, S, w;
    if (this !== E && f > o && r >= 0 && (f = o), f !== this._tTime || s || _) {
      if (a !== this._time && u && (f += this._time - a, r += this._time - a), c = f, T = this._start, x = this._ts, v = !x, _ && (u || (a = this._zTime), (r || !n) && (this._zTime = r)), this._repeat) {
        if (S = this._yoyo, m = u + this._rDelay, this._repeat < -1 && r < 0)
          return this.totalTime(m * 100 + r, n, s);
        if (c = R(f % m), f === o ? (l = this._repeat, c = u) : (g = R(f / m), l = ~~g, l && l === g && (c = u, l--), c > u && (c = u)), g = Qt(this._tTime, m), !a && this._tTime && g !== l && this._tTime - g * m - this._dur <= 0 && (g = l), S && l & 1 && (c = u - c, w = 1), l !== g && !this._lock) {
          var P = S && g & 1, b = P === (S && l & 1);
          if (l < g && (P = !P), a = P ? 0 : f % u ? u : f, this._lock = 1, this.render(a || (w ? 0 : R(l * m)), n, !u)._lock = 0, this._tTime = f, !n && this.parent && rt(this, "onRepeat"), this.vars.repeatRefresh && !w && (this.invalidate()._lock = 1, g = l), a && a !== this._time || v !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (u = this._dur, o = this._tDur, b && (this._lock = 2, a = P ? u : -1e-4, this.render(a, !0), this.vars.repeatRefresh && !w && this.invalidate()), this._lock = 0, !this._ts && !v)
            return this;
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (y = Zr(this, R(a), R(c)), y && (f -= c - (c = y._start))), this._tTime = f, this._time = c, this._act = !!x, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = r, a = 0), !a && f && u && !n && !g && (rt(this, "onStart"), this._tTime !== f))
        return this;
      if (c >= a && r >= 0)
        for (d = this._first; d; ) {
          if (p = d._next, (d._act || c >= d._start) && d._ts && y !== d) {
            if (d.parent !== this)
              return this.render(r, n, s);
            if (d.render(d._ts > 0 ? (c - d._start) * d._ts : (d._dirty ? d.totalDuration() : d._tDur) + (c - d._start) * d._ts, n, s), c !== this._time || !this._ts && !v) {
              y = 0, p && (f += this._zTime = -M);
              break;
            }
          }
          d = p;
        }
      else {
        d = this._last;
        for (var O = r < 0 ? r : c; d; ) {
          if (p = d._prev, (d._act || O <= d._end) && d._ts && y !== d) {
            if (d.parent !== this)
              return this.render(r, n, s);
            if (d.render(d._ts > 0 ? (O - d._start) * d._ts : (d._dirty ? d.totalDuration() : d._tDur) + (O - d._start) * d._ts, n, s || G && oi(d)), c !== this._time || !this._ts && !v) {
              y = 0, p && (f += this._zTime = O ? -M : M);
              break;
            }
          }
          d = p;
        }
      }
      if (y && !n && (this.pause(), y.render(c >= a ? 0 : -M)._zTime = c >= a ? 1 : -1, this._ts))
        return this._start = T, Me(this), this.render(r, n, s);
      this._onUpdate && !n && rt(this, "onUpdate", !0), (f === o && this._tTime >= this.totalDuration() || !f && a) && (T === this._start || Math.abs(x) !== Math.abs(this._ts)) && (this._lock || ((r || !u) && (f === o && this._ts > 0 || !f && this._ts < 0) && Ot(this, 1), !n && !(r < 0 && !a) && (f || a || !o) && (rt(this, f === o && r >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(f < o && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, e.add = function(r, n) {
    var s = this;
    if (vt(n) || (n = ht(this, n, r)), !(r instanceof ce)) {
      if ($(r))
        return r.forEach(function(a) {
          return s.add(a, n);
        }), this;
      if (X(r))
        return this.addLabel(r, n);
      if (I(r))
        r = q.delayedCall(0, r);
      else
        return this;
    }
    return this !== r ? ct(this, r, n) : this;
  }, e.getChildren = function(r, n, s, a) {
    r === void 0 && (r = !0), n === void 0 && (n = !0), s === void 0 && (s = !0), a === void 0 && (a = -ft);
    for (var o = [], u = this._first; u; )
      u._start >= a && (u instanceof q ? n && o.push(u) : (s && o.push(u), r && o.push.apply(o, u.getChildren(!0, n, s)))), u = u._next;
    return o;
  }, e.getById = function(r) {
    for (var n = this.getChildren(1, 1, 1), s = n.length; s--; )
      if (n[s].vars.id === r)
        return n[s];
  }, e.remove = function(r) {
    return X(r) ? this.removeLabel(r) : I(r) ? this.killTweensOf(r) : (r.parent === this && Ce(this, r), r === this._recent && (this._recent = this._last), It(this));
  }, e.totalTime = function(r, n) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = R(it.time - (this._ts > 0 ? r / this._ts : (this.totalDuration() - r) / -this._ts))), h.prototype.totalTime.call(this, r, n), this._forcing = 0, this) : this._tTime;
  }, e.addLabel = function(r, n) {
    return this.labels[r] = ht(this, n), this;
  }, e.removeLabel = function(r) {
    return delete this.labels[r], this;
  }, e.addPause = function(r, n, s) {
    var a = q.delayedCall(0, n || fe, s);
    return a.data = "isPause", this._hasPause = 1, ct(this, a, ht(this, r));
  }, e.removePause = function(r) {
    var n = this._first;
    for (r = ht(this, r); n; )
      n._start === r && n.data === "isPause" && Ot(n), n = n._next;
  }, e.killTweensOf = function(r, n, s) {
    for (var a = this.getTweensOf(r, s), o = a.length; o--; )
      Tt !== a[o] && a[o].kill(r, n);
    return this;
  }, e.getTweensOf = function(r, n) {
    for (var s = [], a = lt(r), o = this._first, u = vt(n), f; o; )
      o instanceof q ? Gr(o._targets, a) && (u ? (!Tt || o._initted && o._ts) && o.globalTime(0) <= n && o.globalTime(o.totalDuration()) > n : !n || o.isActive()) && s.push(o) : (f = o.getTweensOf(a, n)).length && s.push.apply(s, f), o = o._next;
    return s;
  }, e.tweenTo = function(r, n) {
    n = n || {};
    var s = this, a = ht(s, r), o = n, u = o.startAt, f = o.onStart, _ = o.onStartParams, c = o.immediateRender, d, p = q.to(s, ot({
      ease: n.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: a,
      overwrite: "auto",
      duration: n.duration || Math.abs((a - (u && "time" in u ? u.time : s._time)) / s.timeScale()) || M,
      onStart: function() {
        if (s.pause(), !d) {
          var m = n.duration || Math.abs((a - (u && "time" in u ? u.time : s._time)) / s.timeScale());
          p._dur !== m && jt(p, m, 0, 1).render(p._time, !0, !0), d = 1;
        }
        f && f.apply(p, _ || []);
      }
    }, n));
    return c ? p.render(0) : p;
  }, e.tweenFromTo = function(r, n, s) {
    return this.tweenTo(n, ot({
      startAt: {
        time: ht(this, r)
      }
    }, s));
  }, e.recent = function() {
    return this._recent;
  }, e.nextLabel = function(r) {
    return r === void 0 && (r = this._time), bi(this, ht(this, r));
  }, e.previousLabel = function(r) {
    return r === void 0 && (r = this._time), bi(this, ht(this, r), 1);
  }, e.currentLabel = function(r) {
    return arguments.length ? this.seek(r, !0) : this.previousLabel(this._time + M);
  }, e.shiftChildren = function(r, n, s) {
    s === void 0 && (s = 0);
    var a = this._first, o = this.labels, u;
    for (r = R(r); a; )
      a._start >= s && (a._start += r, a._end += r), a = a._next;
    if (n)
      for (u in o)
        o[u] >= s && (o[u] += r);
    return It(this);
  }, e.invalidate = function(r) {
    var n = this._first;
    for (this._lock = 0; n; )
      n.invalidate(r), n = n._next;
    return h.prototype.invalidate.call(this, r);
  }, e.clear = function(r) {
    r === void 0 && (r = !0);
    for (var n = this._first, s; n; )
      s = n._next, this.remove(n), n = s;
    return this._dp && (this._time = this._tTime = this._pTime = 0), r && (this.labels = {}), It(this);
  }, e.totalDuration = function(r) {
    var n = 0, s = this, a = s._last, o = ft, u, f, _;
    if (arguments.length)
      return s.timeScale((s._repeat < 0 ? s.duration() : s.totalDuration()) / (s.reversed() ? -r : r));
    if (s._dirty) {
      for (_ = s.parent; a; )
        u = a._prev, a._dirty && a.totalDuration(), f = a._start, f > o && s._sort && a._ts && !s._lock ? (s._lock = 1, ct(s, a, f - a._delay, 1)._lock = 0) : o = f, f < 0 && a._ts && (n -= f, (!_ && !s._dp || _ && _.smoothChildTiming) && (s._start += R(f / s._ts), s._time -= f, s._tTime -= f), s.shiftChildren(-f, !1, -1 / 0), o = 0), a._end > n && a._ts && (n = a._end), a = u;
      jt(s, s === E && s._time > n ? s._time : n, 1, 1), s._dirty = 0;
    }
    return s._tDur;
  }, t.updateRoot = function(r) {
    if (E._ts && ($i(E, Pe(r, E)), Gi = it.frame), it.frame >= vi) {
      vi += st.autoSleep || 120;
      var n = E._first;
      if ((!n || !n._ts) && st.autoSleep && it._listeners.length < 2) {
        for (; n && !n._ts; )
          n = n._next;
        n || it.sleep();
      }
    }
  }, t;
})(ce);
ot(H.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var mn = function(t, e, i, r, n, s, a) {
  var o = new j(this._pt, t, e, 0, 1, vr, null, n), u = 0, f = 0, _, c, d, p, l, m, v, y;
  for (o.b = i, o.e = r, i += "", r += "", (v = ~r.indexOf("random(")) && (r = le(r)), s && (y = [i, r], s(y, t, e), i = y[0], r = y[1]), c = i.match(Ae) || []; _ = Ae.exec(r); )
    p = _[0], l = r.substring(u, _.index), d ? d = (d + 1) % 5 : l.substr(-5) === "rgba(" && (d = 1), p !== c[f++] && (m = parseFloat(c[f - 1]) || 0, o._pt = {
      _next: o._pt,
      p: l || f === 1 ? l : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: m,
      c: p.charAt(1) === "=" ? Wt(m, p) - m : parseFloat(p) - m,
      m: d && d < 4 ? Math.round : 0
    }, u = Ae.lastIndex);
  return o.c = u < r.length ? r.substring(u, r.length) : "", o.fp = a, (qi.test(r) || v) && (o.e = 0), this._pt = o, o;
}, ui = function(t, e, i, r, n, s, a, o, u, f) {
  I(r) && (r = r(n || 0, t, s));
  var _ = t[e], c = i !== "get" ? i : I(_) ? u ? t[e.indexOf("set") || !I(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](u) : t[e]() : _, d = I(_) ? u ? Tn : gr : fi, p;
  if (X(r) && (~r.indexOf("random(") && (r = le(r)), r.charAt(1) === "=" && (p = Wt(c, r) + (W(c) || 0), (p || p === 0) && (r = p))), !f || c !== r || $e)
    return !isNaN(c * r) && r !== "" ? (p = new j(this._pt, t, e, +c || 0, r - (c || 0), typeof _ == "boolean" ? bn : yr, 0, d), u && (p.fp = u), a && p.modifier(a, this, t), this._pt = p) : (!_ && !(e in t) && ri(e, r), mn.call(this, t, e, c, r, d, o || st.stringFilter, u));
}, gn = function(t, e, i, r, n) {
  if (I(t) && (t = oe(t, n, e, i, r)), !pt(t) || t.style && t.nodeType || $(t) || Ni(t))
    return X(t) ? oe(t, n, e, i, r) : t;
  var s = {}, a;
  for (a in t)
    s[a] = oe(t[a], n, e, i, r);
  return s;
}, dr = function(t, e, i, r, n, s) {
  var a, o, u, f;
  if (et[t] && (a = new et[t]()).init(n, a.rawVars ? e[t] : gn(e[t], r, n, s, i), i, r, s) !== !1 && (i._pt = o = new j(i._pt, n, t, 0, 1, a.render, a, 0, a.priority), i !== Gt))
    for (u = i._ptLookup[i._targets.indexOf(n)], f = a._props.length; f--; )
      u[a._props[f]] = o;
  return a;
}, Tt, $e, hi = function h(t, e, i) {
  var r = t.vars, n = r.ease, s = r.startAt, a = r.immediateRender, o = r.lazy, u = r.onUpdate, f = r.runBackwards, _ = r.yoyoEase, c = r.keyframes, d = r.autoRevert, p = t._dur, l = t._startAt, m = t._targets, v = t.parent, y = v && v.data === "nested" ? v.vars.targets : m, x = t._overwrite === "auto" && !Je, T = t.timeline, g = r.easeReverse || _, S, w, P, b, O, B, F, D, L, Y, U, N, ut;
  if (T && (!c || !n) && (n = "none"), t._ease = Bt(n, ue.ease), t._rEase = g && (Bt(g) || t._ease), t._from = !T && !!r.runBackwards, t._from && (t.ratio = 1), !T || c && !r.stagger) {
    if (D = m[0] ? Lt(m[0]).harness : 0, N = D && r[D.prop], S = be(r, ni), l && (l._zTime < 0 && l.progress(1), e < 0 && f && a && !d ? l.render(-1, !0) : l.revert(f && p ? ye : Yr), l._lazy = 0), s) {
      if (Ot(t._startAt = q.set(m, ot({
        data: "isStart",
        overwrite: !1,
        parent: v,
        immediateRender: !0,
        lazy: !l && K(o),
        startAt: null,
        delay: 0,
        onUpdate: u && function() {
          return rt(t, "onUpdate");
        },
        stagger: 0
      }, s))), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (G || !a && !d) && t._startAt.revert(ye), a && p && e <= 0 && i <= 0) {
        e && (t._zTime = e);
        return;
      }
    } else if (f && p && !l) {
      if (e && (a = !1), P = ot({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: a && !l && K(o),
        immediateRender: a,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: v
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, S), N && (P[D.prop] = N), Ot(t._startAt = q.set(m, P)), t._startAt._dp = 0, t._startAt._sat = t, e < 0 && (G ? t._startAt.revert(ye) : t._startAt.render(-1, !0)), t._zTime = e, !a)
        h(t._startAt, M, M);
      else if (!e)
        return;
    }
    for (t._pt = t._ptCache = 0, o = p && K(o) || o && !p, w = 0; w < m.length; w++) {
      if (O = m[w], F = O._gsap || ai(m)[w]._gsap, t._ptLookup[w] = Y = {}, qe[F.id] && Pt.length && we(), U = y === m ? w : y.indexOf(O), D && (L = new D()).init(O, N || S, t, U, y) !== !1 && (t._pt = b = new j(t._pt, O, L.name, 0, 1, L.render, L, 0, L.priority), L._props.forEach(function(qt) {
        Y[qt] = b;
      }), L.priority && (B = 1)), !D || N)
        for (P in S)
          et[P] && (L = dr(P, S, t, U, O, y)) ? L.priority && (B = 1) : Y[P] = b = ui.call(t, O, P, "get", S[P], U, y, 0, r.stringFilter);
      t._op && t._op[w] && t.kill(O, t._op[w]), x && t._pt && (Tt = t, E.killTweensOf(O, Y, t.globalTime(e)), ut = !t.parent, Tt = 0), t._pt && o && (qe[F.id] = 1);
    }
    B && xr(t), t._onInit && t._onInit(t);
  }
  t._onUpdate = u, t._initted = (!t._op || t._pt) && !ut, c && e <= 0 && T.render(ft, !0, !0);
}, yn = function(t, e, i, r, n, s, a, o) {
  var u = (t._pt && t._ptCache || (t._ptCache = {}))[e], f, _, c, d;
  if (!u)
    for (u = t._ptCache[e] = [], c = t._ptLookup, d = t._targets.length; d--; ) {
      if (f = c[d][e], f && f.d && f.d._pt)
        for (f = f.d._pt; f && f.p !== e && f.fp !== e; )
          f = f._next;
      if (!f)
        return $e = 1, t.vars[e] = "+=0", hi(t, a), $e = 0, o ? he(e + " not eligible for reset. Try splitting into individual properties") : 1;
      u.push(f);
    }
  for (d = u.length; d--; )
    _ = u[d], f = _._pt || _, f.s = (r || r === 0) && !n ? r : f.s + (r || 0) + s * f.c, f.c = i - f.s, _.e && (_.e = V(i) + W(_.e)), _.b && (_.b = f.s + W(_.b));
}, vn = function(t, e) {
  var i = t[0] ? Lt(t[0]).harness : 0, r = i && i.aliases, n, s, a, o;
  if (!r)
    return e;
  n = Kt({}, e);
  for (s in r)
    if (s in n)
      for (o = r[s].split(","), a = o.length; a--; )
        n[o[a]] = n[s];
  return n;
}, xn = function(t, e, i, r) {
  var n = e.ease || r || "power1.inOut", s, a;
  if ($(e))
    a = i[t] || (i[t] = []), e.forEach(function(o, u) {
      return a.push({
        t: u / (e.length - 1) * 100,
        v: o,
        e: n
      });
    });
  else
    for (s in e)
      a = i[s] || (i[s] = []), s === "ease" || a.push({
        t: parseFloat(t),
        v: e[s],
        e: n
      });
}, oe = function(t, e, i, r, n) {
  return I(t) ? t.call(e, i, r, n) : X(t) && ~t.indexOf("random(") ? le(t) : t;
}, pr = si + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert", mr = {};
Q(pr + ",id,stagger,delay,duration,paused,scrollTrigger", function(h) {
  return mr[h] = 1;
});
var q = /* @__PURE__ */ (function(h) {
  Ii(t, h);
  function t(i, r, n, s) {
    var a;
    typeof r == "number" && (n.duration = r, r = n, n = null), a = h.call(this, s ? r : se(r)) || this;
    var o = a.vars, u = o.duration, f = o.delay, _ = o.immediateRender, c = o.stagger, d = o.overwrite, p = o.keyframes, l = o.defaults, m = o.scrollTrigger, v = r.parent || E, y = ($(i) || Ni(i) ? vt(i[0]) : "length" in r) ? [i] : lt(i), x, T, g, S, w, P, b, O;
    if (a._targets = y.length ? ai(y) : he("GSAP target " + i + " not found. https://gsap.com", !st.nullTargetWarn) || [], a._ptLookup = [], a._overwrite = d, p || c || ge(u) || ge(f)) {
      r = a.vars;
      var B = r.easeReverse || r.yoyoEase;
      if (x = a.timeline = new H({
        data: "nested",
        defaults: l || {},
        targets: v && v.data === "nested" ? v.vars.targets : y
      }), x.kill(), x.parent = x._dp = gt(a), x._start = 0, c || ge(u) || ge(f)) {
        if (S = y.length, b = c && ir(c), pt(c))
          for (w in c)
            ~pr.indexOf(w) && (O || (O = {}), O[w] = c[w]);
        for (T = 0; T < S; T++)
          g = be(r, mr), g.stagger = 0, B && (g.easeReverse = B), O && Kt(g, O), P = y[T], g.duration = +oe(u, gt(a), T, P, y), g.delay = (+oe(f, gt(a), T, P, y) || 0) - a._delay, !c && S === 1 && g.delay && (a._delay = f = g.delay, a._start += f, g.delay = 0), x.to(P, g, b ? b(T, P, y) : 0), x._ease = k.none;
        x.duration() ? u = f = 0 : a.timeline = 0;
      } else if (p) {
        se(ot(x.vars.defaults, {
          ease: "none"
        })), x._ease = Bt(p.ease || r.ease || "none");
        var F = 0, D, L, Y;
        if ($(p))
          p.forEach(function(U) {
            return x.to(y, U, ">");
          }), x.duration();
        else {
          g = {};
          for (w in p)
            w === "ease" || w === "easeEach" || xn(w, p[w], g, p.easeEach);
          for (w in g)
            for (D = g[w].sort(function(U, N) {
              return U.t - N.t;
            }), F = 0, T = 0; T < D.length; T++)
              L = D[T], Y = {
                ease: L.e,
                duration: (L.t - (T ? D[T - 1].t : 0)) / 100 * u
              }, Y[w] = L.v, x.to(y, Y, F), F += Y.duration;
          x.duration() < u && x.to({}, {
            duration: u - x.duration()
          });
        }
      }
      u || a.duration(u = x.duration());
    } else
      a.timeline = 0;
    return d === !0 && !Je && (Tt = gt(a), E.killTweensOf(y), Tt = 0), ct(v, gt(a), n), r.reversed && a.reverse(), r.paused && a.paused(!0), (_ || !u && !p && a._start === R(v._time) && K(_) && Kr(gt(a)) && v.data !== "nested") && (a._tTime = -M, a.render(Math.max(0, -f) || 0)), m && Zi(gt(a), m), a;
  }
  var e = t.prototype;
  return e.render = function(r, n, s) {
    var a = this._time, o = this._tDur, u = this._dur, f = r < 0, _ = r > o - M && !f ? o : r < M ? 0 : r, c, d, p, l, m, v, y, x;
    if (!u)
      jr(this, r, n, s);
    else if (_ !== this._tTime || !r || s || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== f || this._lazy) {
      if (c = _, x = this.timeline, this._repeat) {
        if (l = u + this._rDelay, this._repeat < -1 && f)
          return this.totalTime(l * 100 + r, n, s);
        if (c = R(_ % l), _ === o ? (p = this._repeat, c = u) : (m = R(_ / l), p = ~~m, p && p === m ? (c = u, p--) : c > u && (c = u)), v = this._yoyo && p & 1, v && (c = u - c), m = Qt(this._tTime, l), c === a && !s && this._initted && p === m)
          return this._tTime = _, this;
        p !== m && this.vars.repeatRefresh && !v && !this._lock && c !== l && this._initted && (this._lock = s = 1, this.render(R(l * p), !0).invalidate()._lock = 0);
      }
      if (!this._initted) {
        if (Ji(this, f ? r : c, s, n, _))
          return this._tTime = 0, this;
        if (a !== this._time && !(s && this.vars.repeatRefresh && p !== m))
          return this;
        if (u !== this._dur)
          return this.render(r, n, s);
      }
      if (this._rEase) {
        var T = c < a;
        if (T !== this._inv) {
          var g = T ? a : u - a;
          this._inv = T, this._from && (this.ratio = 1 - this.ratio), this._invRatio = this.ratio, this._invTime = a, this._invRecip = g ? (T ? -1 : 1) / g : 0, this._invScale = T ? -this.ratio : 1 - this.ratio, this._invEase = T ? this._rEase : this._ease;
        }
        this.ratio = y = this._invRatio + this._invScale * this._invEase((c - this._invTime) * this._invRecip);
      } else
        this.ratio = y = this._ease(c / u);
      if (this._from && (this.ratio = y = 1 - y), this._tTime = _, this._time = c, !this._act && this._ts && (this._act = 1, this._lazy = 0), !a && _ && !n && !m && (rt(this, "onStart"), this._tTime !== _))
        return this;
      for (d = this._pt; d; )
        d.r(y, d.d), d = d._next;
      x && x.render(r < 0 ? r : x._dur * x._ease(c / this._dur), n, s) || this._startAt && (this._zTime = r), this._onUpdate && !n && (f && Ue(this, r, n, s), rt(this, "onUpdate")), this._repeat && p !== m && this.vars.onRepeat && !n && this.parent && rt(this, "onRepeat"), (_ === this._tDur || !_) && this._tTime === _ && (f && !this._onUpdate && Ue(this, r, !0, !0), (r || !u) && (_ === this._tDur && this._ts > 0 || !_ && this._ts < 0) && Ot(this, 1), !n && !(f && !a) && (_ || a || v) && (rt(this, _ === o ? "onComplete" : "onReverseComplete", !0), this._prom && !(_ < o && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, e.targets = function() {
    return this._targets;
  }, e.invalidate = function(r) {
    return (!r || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(r), h.prototype.invalidate.call(this, r);
  }, e.resetTo = function(r, n, s, a, o) {
    _e || it.wake(), this._ts || this.play();
    var u = Math.min(this._dur, (this._dp._time - this._start) * this._ts), f;
    return this._initted || hi(this, u), f = this._ease(u / this._dur), yn(this, r, n, s, a, f, u, o) ? this.resetTo(r, n, s, a, 1) : (De(this, 0), this.parent || Qi(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, e.kill = function(r, n) {
    if (n === void 0 && (n = "all"), !r && (!n || n === "all"))
      return this._lazy = this._pt = 0, this.parent ? re(this) : this.scrollTrigger && this.scrollTrigger.kill(!!G), this;
    if (this.timeline) {
      var s = this.timeline.totalDuration();
      return this.timeline.killTweensOf(r, n, Tt && Tt.vars.overwrite !== !0)._first || re(this), this.parent && s !== this.timeline.totalDuration() && jt(this, this._dur * this.timeline._tDur / s, 0, 1), this;
    }
    var a = this._targets, o = r ? lt(r) : a, u = this._ptLookup, f = this._pt, _, c, d, p, l, m, v;
    if ((!n || n === "all") && $r(a, o))
      return n === "all" && (this._pt = 0), re(this);
    for (_ = this._op = this._op || [], n !== "all" && (X(n) && (l = {}, Q(n, function(y) {
      return l[y] = 1;
    }), n = l), n = vn(a, n)), v = a.length; v--; )
      if (~o.indexOf(a[v])) {
        c = u[v], n === "all" ? (_[v] = n, p = c, d = {}) : (d = _[v] = _[v] || {}, p = n);
        for (l in p)
          m = c && c[l], m && ((!("kill" in m.d) || m.d.kill(l) === !0) && Ce(this, m, "_pt"), delete c[l]), d !== "all" && (d[l] = 1);
      }
    return this._initted && !this._pt && f && re(this), this;
  }, t.to = function(r, n) {
    return new t(r, n, arguments[2]);
  }, t.from = function(r, n) {
    return ae(1, arguments);
  }, t.delayedCall = function(r, n, s, a) {
    return new t(n, 0, {
      immediateRender: !1,
      lazy: !1,
      overwrite: !1,
      delay: r,
      onComplete: n,
      onReverseComplete: n,
      onCompleteParams: s,
      onReverseCompleteParams: s,
      callbackScope: a
    });
  }, t.fromTo = function(r, n, s) {
    return ae(2, arguments);
  }, t.set = function(r, n) {
    return n.duration = 0, n.repeatDelay || (n.repeat = 0), new t(r, n);
  }, t.killTweensOf = function(r, n, s) {
    return E.killTweensOf(r, n, s);
  }, t;
})(ce);
ot(q.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
Q("staggerTo,staggerFrom,staggerFromTo", function(h) {
  q[h] = function() {
    var t = new H(), e = Xe.call(arguments, 0);
    return e.splice(h === "staggerFromTo" ? 5 : 4, 0, 0), t[h].apply(t, e);
  };
});
var fi = function(t, e, i) {
  return t[e] = i;
}, gr = function(t, e, i) {
  return t[e](i);
}, Tn = function(t, e, i, r) {
  return t[e](r.fp, i);
}, wn = function(t, e, i) {
  return t.setAttribute(e, i);
}, li = function(t, e) {
  return I(t[e]) ? gr : ti(t[e]) && t.setAttribute ? wn : fi;
}, yr = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e6) / 1e6, e);
}, bn = function(t, e) {
  return e.set(e.t, e.p, !!(e.s + e.c * t), e);
}, vr = function(t, e) {
  var i = e._pt, r = "";
  if (!t && e.b)
    r = e.b;
  else if (t === 1 && e.e)
    r = e.e;
  else {
    for (; i; )
      r = i.p + (i.m ? i.m(i.s + i.c * t) : Math.round((i.s + i.c * t) * 1e4) / 1e4) + r, i = i._next;
    r += e.c;
  }
  e.set(e.t, e.p, r, e);
}, _i = function(t, e) {
  for (var i = e._pt; i; )
    i.r(t, i.d), i = i._next;
}, Pn = function(t, e, i, r) {
  for (var n = this._pt, s; n; )
    s = n._next, n.p === r && n.modifier(t, e, i), n = s;
}, Sn = function(t) {
  for (var e = this._pt, i, r; e; )
    r = e._next, e.p === t && !e.op || e.op === t ? Ce(this, e, "_pt") : e.dep || (i = 1), e = r;
  return !i;
}, On = function(t, e, i, r) {
  r.mSet(t, e, r.m.call(r.tween, i, r.mt), r);
}, xr = function(t) {
  for (var e = t._pt, i, r, n, s; e; ) {
    for (i = e._next, r = n; r && r.pr > e.pr; )
      r = r._next;
    (e._prev = r ? r._prev : s) ? e._prev._next = e : n = e, (e._next = r) ? r._prev = e : s = e, e = i;
  }
  t._pt = n;
}, j = /* @__PURE__ */ (function() {
  function h(e, i, r, n, s, a, o, u, f) {
    this.t = i, this.s = n, this.c = s, this.p = r, this.r = a || yr, this.d = o || this, this.set = u || fi, this.pr = f || 0, this._next = e, e && (e._prev = this);
  }
  var t = h.prototype;
  return t.modifier = function(i, r, n) {
    this.mSet = this.mSet || this.set, this.set = On, this.m = i, this.mt = n, this.tween = r;
  }, h;
})();
Q(si + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse", function(h) {
  return ni[h] = 1;
});
at.TweenMax = at.TweenLite = q;
at.TimelineLite = at.TimelineMax = H;
E = new H({
  sortChildren: !1,
  defaults: ue,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
st.stringFilter = lr;
var Nt = [], xe = {}, kn = [], Si = 0, Cn = 0, Le = function(t) {
  return (xe[t] || kn).map(function(e) {
    return e();
  });
}, He = function() {
  var t = Date.now(), e = [];
  t - Si > 2 && (Le("matchMediaInit"), Nt.forEach(function(i) {
    var r = i.queries, n = i.conditions, s, a, o, u;
    for (a in r)
      s = _t.matchMedia(r[a]).matches, s && (o = 1), s !== n[a] && (n[a] = s, u = 1);
    u && (i.revert(), o && e.push(i));
  }), Le("matchMediaRevert"), e.forEach(function(i) {
    return i.onMatch(i, function(r) {
      return i.add(null, r);
    });
  }), Si = t, Le("matchMedia"));
}, Tr = /* @__PURE__ */ (function() {
  function h(e, i) {
    this.selector = i && Ge(i), this.data = [], this._r = [], this.isReverted = !1, this.id = Cn++, e && this.add(e);
  }
  var t = h.prototype;
  return t.add = function(i, r, n) {
    I(i) && (n = r, r = i, i = I);
    var s = this, a = function() {
      var u = A, f = s.selector, _;
      return u && u !== s && u.data.push(s), n && (s.selector = Ge(n)), A = s, _ = r.apply(s, arguments), I(_) && s._r.push(_), A = u, s.selector = f, s.isReverted = !1, _;
    };
    return s.last = a, i === I ? a(s, function(o) {
      return s.add(null, o);
    }) : i ? s[i] = a : a;
  }, t.ignore = function(i) {
    var r = A;
    A = null, i(this), A = r;
  }, t.getTweens = function() {
    var i = [];
    return this.data.forEach(function(r) {
      return r instanceof h ? i.push.apply(i, r.getTweens()) : r instanceof q && !(r.parent && r.parent.data === "nested") && i.push(r);
    }), i;
  }, t.clear = function() {
    this._r.length = this.data.length = 0;
  }, t.kill = function(i, r) {
    var n = this;
    if (i ? (function() {
      for (var a = n.getTweens(), o = n.data.length, u; o--; )
        u = n.data[o], u.data === "isFlip" && (u.revert(), u.getChildren(!0, !0, !1).forEach(function(f) {
          return a.splice(a.indexOf(f), 1);
        }));
      for (a.map(function(f) {
        return {
          g: f._dur || f._delay || f._sat && !f._sat.vars.immediateRender ? f.globalTime(0) : -1 / 0,
          t: f
        };
      }).sort(function(f, _) {
        return _.g - f.g || -1 / 0;
      }).forEach(function(f) {
        return f.t.revert(i);
      }), o = n.data.length; o--; )
        u = n.data[o], u instanceof H ? u.data !== "nested" && (u.scrollTrigger && u.scrollTrigger.revert(), u.kill()) : !(u instanceof q) && u.revert && u.revert(i);
      n._r.forEach(function(f) {
        return f(i, n);
      }), n.isReverted = !0;
    })() : this.data.forEach(function(a) {
      return a.kill && a.kill();
    }), this.clear(), r)
      for (var s = Nt.length; s--; )
        Nt[s].id === this.id && Nt.splice(s, 1);
  }, t.revert = function(i) {
    this.kill(i || {});
  }, h;
})(), Mn = /* @__PURE__ */ (function() {
  function h(e) {
    this.contexts = [], this.scope = e, A && A.data.push(this);
  }
  var t = h.prototype;
  return t.add = function(i, r, n) {
    pt(i) || (i = {
      matches: i
    });
    var s = new Tr(0, n || this.scope), a = s.conditions = {}, o, u, f;
    A && !s.selector && (s.selector = A.selector), this.contexts.push(s), r = s.add("onMatch", r), s.queries = i;
    for (u in i)
      u === "all" ? f = 1 : (o = _t.matchMedia(i[u]), o && (Nt.indexOf(s) < 0 && Nt.push(s), (a[u] = o.matches) && (f = 1), o.addListener ? o.addListener(He) : o.addEventListener("change", He)));
    return f && r(s, function(_) {
      return s.add(null, _);
    }), this;
  }, t.revert = function(i) {
    this.kill(i || {});
  }, t.kill = function(i) {
    this.contexts.forEach(function(r) {
      return r.kill(i, !0);
    });
  }, h;
})(), Se = {
  registerPlugin: function() {
    for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
      e[i] = arguments[i];
    e.forEach(function(r) {
      return ur(r);
    });
  },
  timeline: function(t) {
    return new H(t);
  },
  getTweensOf: function(t, e) {
    return E.getTweensOf(t, e);
  },
  getProperty: function(t, e, i, r) {
    X(t) && (t = lt(t)[0]);
    var n = Lt(t || {}).get, s = i ? Ki : Hi;
    return i === "native" && (i = ""), t && (e ? s((et[e] && et[e].get || n)(t, e, i, r)) : function(a, o, u) {
      return s((et[a] && et[a].get || n)(t, a, o, u));
    });
  },
  quickSetter: function(t, e, i) {
    if (t = lt(t), t.length > 1) {
      var r = t.map(function(f) {
        return J.quickSetter(f, e, i);
      }), n = r.length;
      return function(f) {
        for (var _ = n; _--; )
          r[_](f);
      };
    }
    t = t[0] || {};
    var s = et[e], a = Lt(t), o = a.harness && (a.harness.aliases || {})[e] || e, u = s ? function(f) {
      var _ = new s();
      Gt._pt = 0, _.init(t, i ? f + i : f, Gt, 0, [t]), _.render(1, _), Gt._pt && _i(1, Gt);
    } : a.set(t, o);
    return s ? u : function(f) {
      return u(t, o, i ? f + i : f, a, 1);
    };
  },
  quickTo: function(t, e, i) {
    var r, n = J.to(t, ot((r = {}, r[e] = "+=0.1", r.paused = !0, r.stagger = 0, r), i || {})), s = function(o, u, f) {
      return n.resetTo(e, o, u, f);
    };
    return s.tween = n, s;
  },
  isTweening: function(t) {
    return E.getTweensOf(t, !0).length > 0;
  },
  defaults: function(t) {
    return t && t.ease && (t.ease = Bt(t.ease, ue.ease)), xi(ue, t || {});
  },
  config: function(t) {
    return xi(st, t || {});
  },
  registerEffect: function(t) {
    var e = t.name, i = t.effect, r = t.plugins, n = t.defaults, s = t.extendTimeline;
    (r || "").split(",").forEach(function(a) {
      return a && !et[a] && !at[a] && he(e + " effect requires " + a + " plugin.");
    }), Re[e] = function(a, o, u) {
      return i(lt(a), ot(o || {}, n), u);
    }, s && (H.prototype[e] = function(a, o, u) {
      return this.add(Re[e](a, pt(o) ? o : (u = o) && {}, this), u);
    });
  },
  registerEase: function(t, e) {
    k[t] = Bt(e);
  },
  parseEase: function(t, e) {
    return arguments.length ? Bt(t, e) : k;
  },
  getById: function(t) {
    return E.getById(t);
  },
  exportRoot: function(t, e) {
    t === void 0 && (t = {});
    var i = new H(t), r, n;
    for (i.smoothChildTiming = K(t.smoothChildTiming), E.remove(i), i._dp = 0, i._time = i._tTime = E._time, r = E._first; r; )
      n = r._next, (e || !(!r._dur && r instanceof q && r.vars.onComplete === r._targets[0])) && ct(i, r, r._start - r._delay), r = n;
    return ct(E, i, 0), i;
  },
  context: function(t, e) {
    return t ? new Tr(t, e) : A;
  },
  matchMedia: function(t) {
    return new Mn(t);
  },
  matchMediaRefresh: function() {
    return Nt.forEach(function(t) {
      var e = t.conditions, i, r;
      for (r in e)
        e[r] && (e[r] = !1, i = 1);
      i && t.revert();
    }) || He();
  },
  addEventListener: function(t, e) {
    var i = xe[t] || (xe[t] = []);
    ~i.indexOf(e) || i.push(e);
  },
  removeEventListener: function(t, e) {
    var i = xe[t], r = i && i.indexOf(e);
    r >= 0 && i.splice(r, 1);
  },
  utils: {
    wrap: an,
    wrapYoyo: on,
    distribute: ir,
    random: nr,
    snap: rr,
    normalize: sn,
    getUnit: W,
    clamp: tn,
    splitColor: hr,
    toArray: lt,
    selector: Ge,
    mapRange: ar,
    pipe: rn,
    unitize: nn,
    interpolate: un,
    shuffle: er
  },
  install: Yi,
  effects: Re,
  ticker: it,
  updateRoot: H.updateRoot,
  plugins: et,
  globalTimeline: E,
  core: {
    PropTween: j,
    globals: Xi,
    Tween: q,
    Timeline: H,
    Animation: ce,
    getCache: Lt,
    _removeLinkedListItem: Ce,
    reverting: function() {
      return G;
    },
    context: function(t) {
      return t && A && (A.data.push(t), t._ctx = A), A;
    },
    suppressOverwrites: function(t) {
      return Je = t;
    }
  }
};
Q("to,from,fromTo,delayedCall,set,killTweensOf", function(h) {
  return Se[h] = q[h];
});
it.add(H.updateRoot);
Gt = Se.to({}, {
  duration: 0
});
var Dn = function(t, e) {
  for (var i = t._pt; i && i.p !== e && i.op !== e && i.fp !== e; )
    i = i._next;
  return i;
}, An = function(t, e) {
  var i = t._targets, r, n, s;
  for (r in e)
    for (n = i.length; n--; )
      s = t._ptLookup[n][r], s && (s = s.d) && (s._pt && (s = Dn(s, r)), s && s.modifier && s.modifier(e[r], t, i[n], r));
}, Ie = function(t, e) {
  return {
    name: t,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(r, n, s) {
      s._onInit = function(a) {
        var o, u;
        if (X(n) && (o = {}, Q(n, function(f) {
          return o[f] = 1;
        }), n = o), e) {
          o = {};
          for (u in n)
            o[u] = e(n[u]);
          n = o;
        }
        An(a, n);
      };
    }
  };
}, J = Se.registerPlugin({
  name: "attr",
  init: function(t, e, i, r, n) {
    var s, a, o;
    this.tween = i;
    for (s in e)
      o = t.getAttribute(s) || "", a = this.add(t, "setAttribute", (o || 0) + "", e[s], r, n, 0, 0, s), a.op = s, a.b = o, this._props.push(s);
  },
  render: function(t, e) {
    for (var i = e._pt; i; )
      G ? i.set(i.t, i.p, i.b, i) : i.r(t, i.d), i = i._next;
  }
}, {
  name: "endArray",
  headless: 1,
  init: function(t, e) {
    for (var i = e.length; i--; )
      this.add(t, i, t[i] || 0, e[i], 0, 0, 0, 0, 0, 1);
  }
}, Ie("roundProps", We), Ie("modifiers"), Ie("snap", rr)) || Se;
q.version = H.version = J.version = "3.15.0";
Ui = 1;
ei() && Zt();
k.Power0;
k.Power1;
k.Power2;
k.Power3;
k.Power4;
k.Linear;
k.Quad;
k.Cubic;
k.Quart;
k.Quint;
k.Strong;
k.Elastic;
k.Back;
k.SteppedEase;
k.Bounce;
k.Sine;
k.Expo;
k.Circ;
/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Oi, wt, $t, ci, Ft, ki, di, Rn = function() {
  return typeof window < "u";
}, xt = {}, zt = 180 / Math.PI, Ht = Math.PI / 180, Ut = Math.atan2, Ci = 1e8, pi = /([A-Z])/g, En = /(left|right|width|margin|padding|x)/i, zn = /[\s,\(]\S/, dt = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, Ke = function(t, e) {
  return e.set(e.t, e.p, Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, Fn = function(t, e) {
  return e.set(e.t, e.p, t === 1 ? e.e : Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u, e);
}, Ln = function(t, e) {
  return e.set(e.t, e.p, t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e);
}, In = function(t, e) {
  return e.set(e.t, e.p, t === 1 ? e.e : t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b, e);
}, Bn = function(t, e) {
  var i = e.s + e.c * t;
  e.set(e.t, e.p, ~~(i + (i < 0 ? -0.5 : 0.5)) + e.u, e);
}, wr = function(t, e) {
  return e.set(e.t, e.p, t ? e.e : e.b, e);
}, br = function(t, e) {
  return e.set(e.t, e.p, t !== 1 ? e.b : e.e, e);
}, Nn = function(t, e, i) {
  return t.style[e] = i;
}, Vn = function(t, e, i) {
  return t.style.setProperty(e, i);
}, qn = function(t, e, i) {
  return t._gsap[e] = i;
}, Un = function(t, e, i) {
  return t._gsap.scaleX = t._gsap.scaleY = i;
}, Yn = function(t, e, i, r, n) {
  var s = t._gsap;
  s.scaleX = s.scaleY = i, s.renderTransform(n, s);
}, Xn = function(t, e, i, r, n) {
  var s = t._gsap;
  s[e] = i, s.renderTransform(n, s);
}, z = "transform", Z = z + "Origin", Gn = function h(t, e) {
  var i = this, r = this.target, n = r.style, s = r._gsap;
  if (t in xt && n) {
    if (this.tfm = this.tfm || {}, t !== "transform")
      t = dt[t] || t, ~t.indexOf(",") ? t.split(",").forEach(function(a) {
        return i.tfm[a] = yt(r, a);
      }) : this.tfm[t] = s.x ? s[t] : yt(r, t), t === Z && (this.tfm.zOrigin = s.zOrigin);
    else
      return dt.transform.split(",").forEach(function(a) {
        return h.call(i, a, e);
      });
    if (this.props.indexOf(z) >= 0)
      return;
    s.svg && (this.svgo = r.getAttribute("data-svg-origin"), this.props.push(Z, e, "")), t = z;
  }
  (n || e) && this.props.push(t, e, n[t]);
}, Pr = function(t) {
  t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"));
}, Wn = function() {
  var t = this.props, e = this.target, i = e.style, r = e._gsap, n, s;
  for (n = 0; n < t.length; n += 3)
    t[n + 1] ? t[n + 1] === 2 ? e[t[n]](t[n + 2]) : e[t[n]] = t[n + 2] : t[n + 2] ? i[t[n]] = t[n + 2] : i.removeProperty(t[n].substr(0, 2) === "--" ? t[n] : t[n].replace(pi, "-$1").toLowerCase());
  if (this.tfm) {
    for (s in this.tfm)
      r[s] = this.tfm[s];
    r.svg && (r.renderTransform(), e.setAttribute("data-svg-origin", this.svgo || "")), n = di(), (!n || !n.isStart) && !i[z] && (Pr(i), r.zOrigin && i[Z] && (i[Z] += " " + r.zOrigin + "px", r.zOrigin = 0, r.renderTransform()), r.uncache = 1);
  }
}, Sr = function(t, e) {
  var i = {
    target: t,
    props: [],
    revert: Wn,
    save: Gn
  };
  return t._gsap || J.core.getCache(t), e && t.style && t.nodeType && e.split(",").forEach(function(r) {
    return i.save(r);
  }), i;
}, Or, Qe = function(t, e) {
  var i = wt.createElementNS ? wt.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : wt.createElement(t);
  return i && i.style ? i : wt.createElement(t);
}, nt = function h(t, e, i) {
  var r = getComputedStyle(t);
  return r[e] || r.getPropertyValue(e.replace(pi, "-$1").toLowerCase()) || r.getPropertyValue(e) || !i && h(t, Jt(e) || e, 1) || "";
}, Mi = "O,Moz,ms,Ms,Webkit".split(","), Jt = function(t, e, i) {
  var r = e || Ft, n = r.style, s = 5;
  if (t in n && !i)
    return t;
  for (t = t.charAt(0).toUpperCase() + t.substr(1); s-- && !(Mi[s] + t in n); )
    ;
  return s < 0 ? null : (s === 3 ? "ms" : s >= 0 ? Mi[s] : "") + t;
}, je = function() {
  Rn() && window.document && (Oi = window, wt = Oi.document, $t = wt.documentElement, Ft = Qe("div") || {
    style: {}
  }, Qe("div"), z = Jt(z), Z = z + "Origin", Ft.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", Or = !!Jt("perspective"), di = J.core.reverting, ci = 1);
}, Di = function(t) {
  var e = t.ownerSVGElement, i = Qe("svg", e && e.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), r = t.cloneNode(!0), n;
  r.style.display = "block", i.appendChild(r), $t.appendChild(i);
  try {
    n = r.getBBox();
  } catch {
  }
  return i.removeChild(r), $t.removeChild(i), n;
}, Ai = function(t, e) {
  for (var i = e.length; i--; )
    if (t.hasAttribute(e[i]))
      return t.getAttribute(e[i]);
}, kr = function(t) {
  var e, i;
  try {
    e = t.getBBox();
  } catch {
    e = Di(t), i = 1;
  }
  return e && (e.width || e.height) || i || (e = Di(t)), e && !e.width && !e.x && !e.y ? {
    x: +Ai(t, ["x", "cx", "x1"]) || 0,
    y: +Ai(t, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : e;
}, Cr = function(t) {
  return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && kr(t));
}, kt = function(t, e) {
  if (e) {
    var i = t.style, r;
    e in xt && e !== Z && (e = z), i.removeProperty ? (r = e.substr(0, 2), (r === "ms" || e.substr(0, 6) === "webkit") && (e = "-" + e), i.removeProperty(r === "--" ? e : e.replace(pi, "-$1").toLowerCase())) : i.removeAttribute(e);
  }
}, bt = function(t, e, i, r, n, s) {
  var a = new j(t._pt, e, i, 0, 1, s ? br : wr);
  return t._pt = a, a.b = r, a.e = n, t._props.push(i), a;
}, Ri = {
  deg: 1,
  rad: 1,
  turn: 1
}, $n = {
  grid: 1,
  flex: 1
}, Ct = function h(t, e, i, r) {
  var n = parseFloat(i) || 0, s = (i + "").trim().substr((n + "").length) || "px", a = Ft.style, o = En.test(e), u = t.tagName.toLowerCase() === "svg", f = (u ? "client" : "offset") + (o ? "Width" : "Height"), _ = 100, c = r === "px", d = r === "%", p, l, m, v;
  if (r === s || !n || Ri[r] || Ri[s])
    return n;
  if (s !== "px" && !c && (n = h(t, e, i, "px")), v = t.getCTM && Cr(t), (d || s === "%") && (xt[e] || ~e.indexOf("adius")))
    return p = v ? t.getBBox()[o ? "width" : "height"] : t[f], V(d ? n / p * _ : n / 100 * p);
  if (a[o ? "width" : "height"] = _ + (c ? s : r), l = r !== "rem" && ~e.indexOf("adius") || r === "em" && t.appendChild && !u ? t : t.parentNode, v && (l = (t.ownerSVGElement || {}).parentNode), (!l || l === wt || !l.appendChild) && (l = wt.body), m = l._gsap, m && d && m.width && o && m.time === it.time && !m.uncache)
    return V(n / m.width * _);
  if (d && (e === "height" || e === "width")) {
    var y = t.style[e];
    t.style[e] = _ + r, p = t[f], y ? t.style[e] = y : kt(t, e);
  } else
    (d || s === "%") && !$n[nt(l, "display")] && (a.position = nt(t, "position")), l === t && (a.position = "static"), l.appendChild(Ft), p = Ft[f], l.removeChild(Ft), a.position = "absolute";
  return o && d && (m = Lt(l), m.time = it.time, m.width = l[f]), V(c ? p * n / _ : p && n ? _ / p * n : 0);
}, yt = function(t, e, i, r) {
  var n;
  return ci || je(), e in dt && e !== "transform" && (e = dt[e], ~e.indexOf(",") && (e = e.split(",")[0])), xt[e] && e !== "transform" ? (n = pe(t, r), n = e !== "transformOrigin" ? n[e] : n.svg ? n.origin : ke(nt(t, Z)) + " " + n.zOrigin + "px") : (n = t.style[e], (!n || n === "auto" || r || ~(n + "").indexOf("calc(")) && (n = Oe[e] && Oe[e](t, e, i) || nt(t, e) || Wi(t, e) || (e === "opacity" ? 1 : 0))), i && !~(n + "").trim().indexOf(" ") ? Ct(t, e, n, i) + i : n;
}, Hn = function(t, e, i, r) {
  if (!i || i === "none") {
    var n = Jt(e, t, 1), s = n && nt(t, n, 1);
    s && s !== i ? (e = n, i = s) : e === "borderColor" && (i = nt(t, "borderTopColor"));
  }
  var a = new j(this._pt, t.style, e, 0, 1, vr), o = 0, u = 0, f, _, c, d, p, l, m, v, y, x, T, g;
  if (a.b = i, a.e = r, i += "", r += "", r.substring(0, 6) === "var(--" && (r = nt(t, r.substring(4, r.indexOf(")")))), r === "auto" && (l = t.style[e], t.style[e] = r, r = nt(t, e) || r, l ? t.style[e] = l : kt(t, e)), f = [i, r], lr(f), i = f[0], r = f[1], c = i.match(Xt) || [], g = r.match(Xt) || [], g.length) {
    for (; _ = Xt.exec(r); )
      m = _[0], y = r.substring(o, _.index), p ? p = (p + 1) % 5 : (y.substr(-5) === "rgba(" || y.substr(-5) === "hsla(") && (p = 1), m !== (l = c[u++] || "") && (d = parseFloat(l) || 0, T = l.substr((d + "").length), m.charAt(1) === "=" && (m = Wt(d, m) + T), v = parseFloat(m), x = m.substr((v + "").length), o = Xt.lastIndex - x.length, x || (x = x || st.units[e] || T, o === r.length && (r += x, a.e += x)), T !== x && (d = Ct(t, e, l, x) || 0), a._pt = {
        _next: a._pt,
        p: y || u === 1 ? y : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: d,
        c: v - d,
        m: p && p < 4 || e === "zIndex" ? Math.round : 0
      });
    a.c = o < r.length ? r.substring(o, r.length) : "";
  } else
    a.r = e === "display" && r === "none" ? br : wr;
  return qi.test(r) && (a.e = 0), this._pt = a, a;
}, Ei = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, Kn = function(t) {
  var e = t.split(" "), i = e[0], r = e[1] || "50%";
  return (i === "top" || i === "bottom" || r === "left" || r === "right") && (t = i, i = r, r = t), e[0] = Ei[i] || i, e[1] = Ei[r] || r, e.join(" ");
}, Qn = function(t, e) {
  if (e.tween && e.tween._time === e.tween._dur) {
    var i = e.t, r = i.style, n = e.u, s = i._gsap, a, o, u;
    if (n === "all" || n === !0)
      r.cssText = "", o = 1;
    else
      for (n = n.split(","), u = n.length; --u > -1; )
        a = n[u], xt[a] && (o = 1, a = a === "transformOrigin" ? Z : z), kt(i, a);
    o && (kt(i, z), s && (s.svg && i.removeAttribute("transform"), r.scale = r.rotate = r.translate = "none", pe(i, 1), s.uncache = 1, Pr(r)));
  }
}, Oe = {
  clearProps: function(t, e, i, r, n) {
    if (n.data !== "isFromStart") {
      var s = t._pt = new j(t._pt, e, i, 0, 0, Qn);
      return s.u = r, s.pr = -10, s.tween = n, t._props.push(i), 1;
    }
  }
  /* className feature (about 0.4kb gzipped).
  , className(plugin, target, property, endValue, tween) {
  	let _renderClassName = (ratio, data) => {
  			data.css.render(ratio, data.css);
  			if (!ratio || ratio === 1) {
  				let inline = data.rmv,
  					target = data.t,
  					p;
  				target.setAttribute("class", ratio ? data.e : data.b);
  				for (p in inline) {
  					_removeProperty(target, p);
  				}
  			}
  		},
  		_getAllStyles = (target) => {
  			let styles = {},
  				computed = getComputedStyle(target),
  				p;
  			for (p in computed) {
  				if (isNaN(p) && p !== "cssText" && p !== "length") {
  					styles[p] = computed[p];
  				}
  			}
  			_setDefaults(styles, _parseTransform(target, 1));
  			return styles;
  		},
  		startClassList = target.getAttribute("class"),
  		style = target.style,
  		cssText = style.cssText,
  		cache = target._gsap,
  		classPT = cache.classPT,
  		inlineToRemoveAtEnd = {},
  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
  		changingVars = {},
  		startVars = _getAllStyles(target),
  		transformRelated = /(transform|perspective)/i,
  		endVars, p;
  	if (classPT) {
  		classPT.r(1, classPT.d);
  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
  	}
  	target.setAttribute("class", data.e);
  	endVars = _getAllStyles(target, true);
  	target.setAttribute("class", startClassList);
  	for (p in endVars) {
  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
  			changingVars[p] = endVars[p];
  			if (!style[p] && style[p] !== "0") {
  				inlineToRemoveAtEnd[p] = 1;
  			}
  		}
  	}
  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://gsap.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */
}, de = [1, 0, 0, 1, 0, 0], Mr = {}, Dr = function(t) {
  return t === "matrix(1, 0, 0, 1, 0, 0)" || t === "none" || !t;
}, zi = function(t) {
  var e = nt(t, z);
  return Dr(e) ? de : e.substr(7).match(Vi).map(V);
}, mi = function(t, e) {
  var i = t._gsap || Lt(t), r = t.style, n = zi(t), s, a, o, u;
  return i.svg && t.getAttribute("transform") ? (o = t.transform.baseVal.consolidate().matrix, n = [o.a, o.b, o.c, o.d, o.e, o.f], n.join(",") === "1,0,0,1,0,0" ? de : n) : (n === de && !t.offsetParent && t !== $t && !i.svg && (o = r.display, r.display = "block", s = t.parentNode, (!s || !t.offsetParent && !t.getBoundingClientRect().width) && (u = 1, a = t.nextElementSibling, $t.appendChild(t)), n = zi(t), o ? r.display = o : kt(t, "display"), u && (a ? s.insertBefore(t, a) : s ? s.appendChild(t) : $t.removeChild(t))), e && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n);
}, Ze = function(t, e, i, r, n, s) {
  var a = t._gsap, o = n || mi(t, !0), u = a.xOrigin || 0, f = a.yOrigin || 0, _ = a.xOffset || 0, c = a.yOffset || 0, d = o[0], p = o[1], l = o[2], m = o[3], v = o[4], y = o[5], x = e.split(" "), T = parseFloat(x[0]) || 0, g = parseFloat(x[1]) || 0, S, w, P, b;
  i ? o !== de && (w = d * m - p * l) && (P = T * (m / w) + g * (-l / w) + (l * y - m * v) / w, b = T * (-p / w) + g * (d / w) - (d * y - p * v) / w, T = P, g = b) : (S = kr(t), T = S.x + (~x[0].indexOf("%") ? T / 100 * S.width : T), g = S.y + (~(x[1] || x[0]).indexOf("%") ? g / 100 * S.height : g)), r || r !== !1 && a.smooth ? (v = T - u, y = g - f, a.xOffset = _ + (v * d + y * l) - v, a.yOffset = c + (v * p + y * m) - y) : a.xOffset = a.yOffset = 0, a.xOrigin = T, a.yOrigin = g, a.smooth = !!r, a.origin = e, a.originIsAbsolute = !!i, t.style[Z] = "0px 0px", s && (bt(s, a, "xOrigin", u, T), bt(s, a, "yOrigin", f, g), bt(s, a, "xOffset", _, a.xOffset), bt(s, a, "yOffset", c, a.yOffset)), t.setAttribute("data-svg-origin", T + " " + g);
}, pe = function(t, e) {
  var i = t._gsap || new cr(t);
  if ("x" in i && !e && !i.uncache)
    return i;
  var r = t.style, n = i.scaleX < 0, s = "px", a = "deg", o = getComputedStyle(t), u = nt(t, Z) || "0", f, _, c, d, p, l, m, v, y, x, T, g, S, w, P, b, O, B, F, D, L, Y, U, N, ut, qt, te, ee, Dt, gi, mt, At;
  return f = _ = c = l = m = v = y = x = T = 0, d = p = 1, i.svg = !!(t.getCTM && Cr(t)), o.translate && ((o.translate !== "none" || o.scale !== "none" || o.rotate !== "none") && (r[z] = (o.translate !== "none" ? "translate3d(" + (o.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (o.rotate !== "none" ? "rotate(" + o.rotate + ") " : "") + (o.scale !== "none" ? "scale(" + o.scale.split(" ").join(",") + ") " : "") + (o[z] !== "none" ? o[z] : "")), r.scale = r.rotate = r.translate = "none"), w = mi(t, i.svg), i.svg && (i.uncache ? (ut = t.getBBox(), u = i.xOrigin - ut.x + "px " + (i.yOrigin - ut.y) + "px", N = "") : N = !e && t.getAttribute("data-svg-origin"), Ze(t, N || u, !!N || i.originIsAbsolute, i.smooth !== !1, w)), g = i.xOrigin || 0, S = i.yOrigin || 0, w !== de && (B = w[0], F = w[1], D = w[2], L = w[3], f = Y = w[4], _ = U = w[5], w.length === 6 ? (d = Math.sqrt(B * B + F * F), p = Math.sqrt(L * L + D * D), l = B || F ? Ut(F, B) * zt : 0, y = D || L ? Ut(D, L) * zt + l : 0, y && (p *= Math.abs(Math.cos(y * Ht))), i.svg && (f -= g - (g * B + S * D), _ -= S - (g * F + S * L))) : (At = w[6], gi = w[7], te = w[8], ee = w[9], Dt = w[10], mt = w[11], f = w[12], _ = w[13], c = w[14], P = Ut(At, Dt), m = P * zt, P && (b = Math.cos(-P), O = Math.sin(-P), N = Y * b + te * O, ut = U * b + ee * O, qt = At * b + Dt * O, te = Y * -O + te * b, ee = U * -O + ee * b, Dt = At * -O + Dt * b, mt = gi * -O + mt * b, Y = N, U = ut, At = qt), P = Ut(-D, Dt), v = P * zt, P && (b = Math.cos(-P), O = Math.sin(-P), N = B * b - te * O, ut = F * b - ee * O, qt = D * b - Dt * O, mt = L * O + mt * b, B = N, F = ut, D = qt), P = Ut(F, B), l = P * zt, P && (b = Math.cos(P), O = Math.sin(P), N = B * b + F * O, ut = Y * b + U * O, F = F * b - B * O, U = U * b - Y * O, B = N, Y = ut), m && Math.abs(m) + Math.abs(l) > 359.9 && (m = l = 0, v = 180 - v), d = V(Math.sqrt(B * B + F * F + D * D)), p = V(Math.sqrt(U * U + At * At)), P = Ut(Y, U), y = Math.abs(P) > 2e-4 ? P * zt : 0, T = mt ? 1 / (mt < 0 ? -mt : mt) : 0), i.svg && (N = t.getAttribute("transform"), i.forceCSS = t.setAttribute("transform", "") || !Dr(nt(t, z)), N && t.setAttribute("transform", N))), Math.abs(y) > 90 && Math.abs(y) < 270 && (n ? (d *= -1, y += l <= 0 ? 180 : -180, l += l <= 0 ? 180 : -180) : (p *= -1, y += y <= 0 ? 180 : -180)), e = e || i.uncache, i.x = f - ((i.xPercent = f && (!e && i.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-f) ? -50 : 0))) ? t.offsetWidth * i.xPercent / 100 : 0) + s, i.y = _ - ((i.yPercent = _ && (!e && i.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-_) ? -50 : 0))) ? t.offsetHeight * i.yPercent / 100 : 0) + s, i.z = c + s, i.scaleX = V(d), i.scaleY = V(p), i.rotation = V(l) + a, i.rotationX = V(m) + a, i.rotationY = V(v) + a, i.skewX = y + a, i.skewY = x + a, i.transformPerspective = T + s, (i.zOrigin = parseFloat(u.split(" ")[2]) || !e && i.zOrigin || 0) && (r[Z] = ke(u)), i.xOffset = i.yOffset = 0, i.force3D = st.force3D, i.renderTransform = i.svg ? Zn : Or ? Ar : jn, i.uncache = 0, i;
}, ke = function(t) {
  return (t = t.split(" "))[0] + " " + t[1];
}, Be = function(t, e, i) {
  var r = W(e);
  return V(parseFloat(e) + parseFloat(Ct(t, "x", i + "px", r))) + r;
}, jn = function(t, e) {
  e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, Ar(t, e);
}, Rt = "0deg", ie = "0px", Et = ") ", Ar = function(t, e) {
  var i = e || this, r = i.xPercent, n = i.yPercent, s = i.x, a = i.y, o = i.z, u = i.rotation, f = i.rotationY, _ = i.rotationX, c = i.skewX, d = i.skewY, p = i.scaleX, l = i.scaleY, m = i.transformPerspective, v = i.force3D, y = i.target, x = i.zOrigin, T = "", g = v === "auto" && t && t !== 1 || v === !0;
  if (x && (_ !== Rt || f !== Rt)) {
    var S = parseFloat(f) * Ht, w = Math.sin(S), P = Math.cos(S), b;
    S = parseFloat(_) * Ht, b = Math.cos(S), s = Be(y, s, w * b * -x), a = Be(y, a, -Math.sin(S) * -x), o = Be(y, o, P * b * -x + x);
  }
  m !== ie && (T += "perspective(" + m + Et), (r || n) && (T += "translate(" + r + "%, " + n + "%) "), (g || s !== ie || a !== ie || o !== ie) && (T += o !== ie || g ? "translate3d(" + s + ", " + a + ", " + o + ") " : "translate(" + s + ", " + a + Et), u !== Rt && (T += "rotate(" + u + Et), f !== Rt && (T += "rotateY(" + f + Et), _ !== Rt && (T += "rotateX(" + _ + Et), (c !== Rt || d !== Rt) && (T += "skew(" + c + ", " + d + Et), (p !== 1 || l !== 1) && (T += "scale(" + p + ", " + l + Et), y.style[z] = T || "translate(0, 0)";
}, Zn = function(t, e) {
  var i = e || this, r = i.xPercent, n = i.yPercent, s = i.x, a = i.y, o = i.rotation, u = i.skewX, f = i.skewY, _ = i.scaleX, c = i.scaleY, d = i.target, p = i.xOrigin, l = i.yOrigin, m = i.xOffset, v = i.yOffset, y = i.forceCSS, x = parseFloat(s), T = parseFloat(a), g, S, w, P, b;
  o = parseFloat(o), u = parseFloat(u), f = parseFloat(f), f && (f = parseFloat(f), u += f, o += f), o || u ? (o *= Ht, u *= Ht, g = Math.cos(o) * _, S = Math.sin(o) * _, w = Math.sin(o - u) * -c, P = Math.cos(o - u) * c, u && (f *= Ht, b = Math.tan(u - f), b = Math.sqrt(1 + b * b), w *= b, P *= b, f && (b = Math.tan(f), b = Math.sqrt(1 + b * b), g *= b, S *= b)), g = V(g), S = V(S), w = V(w), P = V(P)) : (g = _, P = c, S = w = 0), (x && !~(s + "").indexOf("px") || T && !~(a + "").indexOf("px")) && (x = Ct(d, "x", s, "px"), T = Ct(d, "y", a, "px")), (p || l || m || v) && (x = V(x + p - (p * g + l * w) + m), T = V(T + l - (p * S + l * P) + v)), (r || n) && (b = d.getBBox(), x = V(x + r / 100 * b.width), T = V(T + n / 100 * b.height)), b = "matrix(" + g + "," + S + "," + w + "," + P + "," + x + "," + T + ")", d.setAttribute("transform", b), y && (d.style[z] = b);
}, Jn = function(t, e, i, r, n) {
  var s = 360, a = X(n), o = parseFloat(n) * (a && ~n.indexOf("rad") ? zt : 1), u = o - r, f = r + u + "deg", _, c;
  return a && (_ = n.split("_")[1], _ === "short" && (u %= s, u !== u % (s / 2) && (u += u < 0 ? s : -s)), _ === "cw" && u < 0 ? u = (u + s * Ci) % s - ~~(u / s) * s : _ === "ccw" && u > 0 && (u = (u - s * Ci) % s - ~~(u / s) * s)), t._pt = c = new j(t._pt, e, i, r, u, Fn), c.e = f, c.u = "deg", t._props.push(i), c;
}, Fi = function(t, e) {
  for (var i in e)
    t[i] = e[i];
  return t;
}, ts = function(t, e, i) {
  var r = Fi({}, i._gsap), n = "perspective,force3D,transformOrigin,svgOrigin", s = i.style, a, o, u, f, _, c, d, p;
  r.svg ? (u = i.getAttribute("transform"), i.setAttribute("transform", ""), s[z] = e, a = pe(i, 1), kt(i, z), i.setAttribute("transform", u)) : (u = getComputedStyle(i)[z], s[z] = e, a = pe(i, 1), s[z] = u);
  for (o in xt)
    u = r[o], f = a[o], u !== f && n.indexOf(o) < 0 && (d = W(u), p = W(f), _ = d !== p ? Ct(i, o, u, p) : parseFloat(u), c = parseFloat(f), t._pt = new j(t._pt, a, o, _, c - _, Ke), t._pt.u = p || 0, t._props.push(o));
  Fi(a, r);
};
Q("padding,margin,Width,Radius", function(h, t) {
  var e = "Top", i = "Right", r = "Bottom", n = "Left", s = (t < 3 ? [e, i, r, n] : [e + n, e + i, r + i, r + n]).map(function(a) {
    return t < 2 ? h + a : "border" + a + h;
  });
  Oe[t > 1 ? "border" + h : h] = function(a, o, u, f, _) {
    var c, d;
    if (arguments.length < 4)
      return c = s.map(function(p) {
        return yt(a, p, u);
      }), d = c.join(" "), d.split(c[0]).length === 5 ? c[0] : d;
    c = (f + "").split(" "), d = {}, s.forEach(function(p, l) {
      return d[p] = c[l] = c[l] || c[(l - 1) / 2 | 0];
    }), a.init(o, d, _);
  };
});
var Rr = {
  name: "css",
  register: je,
  targetTest: function(t) {
    return t.style && t.nodeType;
  },
  init: function(t, e, i, r, n) {
    var s = this._props, a = t.style, o = i.vars.startAt, u, f, _, c, d, p, l, m, v, y, x, T, g, S, w, P, b;
    ci || je(), this.styles = this.styles || Sr(t), P = this.styles.props, this.tween = i;
    for (l in e)
      if (l !== "autoRound" && (f = e[l], !(et[l] && dr(l, e, i, r, t, n)))) {
        if (d = typeof f, p = Oe[l], d === "function" && (f = f.call(i, r, t, n), d = typeof f), d === "string" && ~f.indexOf("random(") && (f = le(f)), p)
          p(this, t, l, f, i) && (w = 1);
        else if (l.substr(0, 2) === "--")
          u = (getComputedStyle(t).getPropertyValue(l) + "").trim(), f += "", St.lastIndex = 0, St.test(u) || (m = W(u), v = W(f), v ? m !== v && (u = Ct(t, l, u, v) + v) : m && (f += m)), this.add(a, "setProperty", u, f, r, n, 0, 0, l), s.push(l), P.push(l, 0, a[l]);
        else if (d !== "undefined") {
          if (o && l in o ? (u = typeof o[l] == "function" ? o[l].call(i, r, t, n) : o[l], X(u) && ~u.indexOf("random(") && (u = le(u)), W(u + "") || u === "auto" || (u += st.units[l] || W(yt(t, l)) || ""), (u + "").charAt(1) === "=" && (u = yt(t, l))) : u = yt(t, l), c = parseFloat(u), y = d === "string" && f.charAt(1) === "=" && f.substr(0, 2), y && (f = f.substr(2)), _ = parseFloat(f), l in dt && (l === "autoAlpha" && (c === 1 && yt(t, "visibility") === "hidden" && _ && (c = 0), P.push("visibility", 0, a.visibility), bt(this, a, "visibility", c ? "inherit" : "hidden", _ ? "inherit" : "hidden", !_)), l !== "scale" && l !== "transform" && (l = dt[l], ~l.indexOf(",") && (l = l.split(",")[0]))), x = l in xt, x) {
            if (this.styles.save(l), b = f, d === "string" && f.substring(0, 6) === "var(--") {
              if (f = nt(t, f.substring(4, f.indexOf(")"))), f.substring(0, 5) === "calc(") {
                var O = t.style.perspective;
                t.style.perspective = f, f = nt(t, "perspective"), O ? t.style.perspective = O : kt(t, "perspective");
              }
              _ = parseFloat(f);
            }
            if (T || (g = t._gsap, g.renderTransform && !e.parseTransform || pe(t, e.parseTransform), S = e.smoothOrigin !== !1 && g.smooth, T = this._pt = new j(this._pt, a, z, 0, 1, g.renderTransform, g, 0, -1), T.dep = 1), l === "scale")
              this._pt = new j(this._pt, g, "scaleY", g.scaleY, (y ? Wt(g.scaleY, y + _) : _) - g.scaleY || 0, Ke), this._pt.u = 0, s.push("scaleY", l), l += "X";
            else if (l === "transformOrigin") {
              P.push(Z, 0, a[Z]), f = Kn(f), g.svg ? Ze(t, f, 0, S, 0, this) : (v = parseFloat(f.split(" ")[2]) || 0, v !== g.zOrigin && bt(this, g, "zOrigin", g.zOrigin, v), bt(this, a, l, ke(u), ke(f)));
              continue;
            } else if (l === "svgOrigin") {
              Ze(t, f, 1, S, 0, this);
              continue;
            } else if (l in Mr) {
              Jn(this, g, l, c, y ? Wt(c, y + f) : f);
              continue;
            } else if (l === "smoothOrigin") {
              bt(this, g, "smooth", g.smooth, f);
              continue;
            } else if (l === "force3D") {
              g[l] = f;
              continue;
            } else if (l === "transform") {
              ts(this, f, t);
              continue;
            }
          } else l in a || (l = Jt(l) || l);
          if (x || (_ || _ === 0) && (c || c === 0) && !zn.test(f) && l in a)
            m = (u + "").substr((c + "").length), _ || (_ = 0), v = W(f) || (l in st.units ? st.units[l] : m), m !== v && (c = Ct(t, l, u, v)), this._pt = new j(this._pt, x ? g : a, l, c, (y ? Wt(c, y + _) : _) - c, !x && (v === "px" || l === "zIndex") && e.autoRound !== !1 ? Bn : Ke), this._pt.u = v || 0, x && b !== f ? (this._pt.b = u, this._pt.e = b, this._pt.r = In) : m !== v && v !== "%" && (this._pt.b = u, this._pt.r = Ln);
          else if (l in a)
            Hn.call(this, t, l, u, y ? y + f : f);
          else if (l in t)
            this.add(t, l, u || t[l], y ? y + f : f, r, n);
          else if (l !== "parseTransform") {
            ri(l, f);
            continue;
          }
          x || (l in a ? P.push(l, 0, a[l]) : typeof t[l] == "function" ? P.push(l, 2, t[l]()) : P.push(l, 1, u || t[l])), s.push(l);
        }
      }
    w && xr(this);
  },
  render: function(t, e) {
    if (e.tween._time || !di())
      for (var i = e._pt; i; )
        i.r(t, i.d), i = i._next;
    else
      e.styles.revert();
  },
  get: yt,
  aliases: dt,
  getSetter: function(t, e, i) {
    var r = dt[e];
    return r && r.indexOf(",") < 0 && (e = r), e in xt && e !== Z && (t._gsap.x || yt(t, "x")) ? i && ki === i ? e === "scale" ? Un : qn : (ki = i || {}) && (e === "scale" ? Yn : Xn) : t.style && !ti(t.style[e]) ? Nn : ~e.indexOf("-") ? Vn : li(t, e);
  },
  core: {
    _removeProperty: kt,
    _getMatrix: mi
  }
};
J.utils.checkPrefix = Jt;
J.core.getStyleSaver = Sr;
(function(h, t, e, i) {
  var r = Q(h + "," + t + "," + e, function(n) {
    xt[n] = 1;
  });
  Q(t, function(n) {
    st.units[n] = "deg", Mr[n] = 1;
  }), dt[r[13]] = h + "," + t, Q(i, function(n) {
    var s = n.split(":");
    dt[s[1]] = r[s[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
Q("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(h) {
  st.units[h] = "px";
});
J.registerPlugin(Rr);
var Yt = J.registerPlugin(Rr) || J;
Yt.core.Tween;
const es = "http://www.w3.org/2000/svg";
class is {
  constructor(t, e) {
    tt(this, "img");
    tt(this, "overlay");
    tt(this, "hitAreas");
    tt(this, "prevBtn");
    tt(this, "nextBtn");
    tt(this, "modal");
    tt(this, "modalPanel");
    tt(this, "modalTitle");
    tt(this, "modalDescription");
    tt(this, "modalAdvantages");
    tt(this, "currentIndex", 0);
    tt(this, "lastFocused", null);
    this.root = t, this.data = e, this.img = this.require(".house-viewer__image"), this.overlay = this.require(".house-viewer__overlay"), this.hitAreas = this.require(".house-viewer__hit-areas"), this.prevBtn = t.querySelector(".house-viewer__arrow--prev"), this.nextBtn = t.querySelector(".house-viewer__arrow--next"), this.modal = this.requireGlobal("#house-viewer-modal"), this.modalPanel = this.requireGlobal(".hv-modal__panel"), this.modalTitle = this.requireGlobal("#hv-modal-title"), this.modalDescription = this.requireGlobal("#hv-modal-description"), this.modalAdvantages = this.requireGlobal("#hv-modal-advantages"), this.bindNav(), this.bindModalClose(), this.renderView(0, !1);
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
    this.prevBtn && (this.prevBtn.hidden = !t), this.nextBtn && (this.nextBtn.hidden = !t), (e = this.prevBtn) == null || e.addEventListener("click", () => this.step(-1)), (i = this.nextBtn) == null || i.addEventListener("click", () => this.step(1));
  }
  bindModalClose() {
    this.modal.querySelectorAll("[data-close]").forEach(
      (t) => t.addEventListener("click", () => this.closeModal())
    ), document.addEventListener("keydown", (t) => {
      t.key === "Escape" && !this.modal.hidden && this.closeModal();
    });
  }
  step(t) {
    const e = this.data.views.length, i = (this.currentIndex + t + e) % e;
    this.renderView(i, !0);
  }
  renderView(t, e) {
    this.currentIndex = t;
    const i = this.data.views[t], r = () => {
      this.img.src = i.image, this.img.alt = i.title, this.buildHotspots(i), Yt.fromTo([this.img, this.overlay], { opacity: 0 }, { opacity: 1, duration: 0.35 });
    };
    e ? Yt.to([this.img, this.overlay], {
      opacity: 0,
      duration: 0.2,
      onComplete: r
    }) : r();
  }
  buildHotspots(t) {
    this.overlay.innerHTML = "", this.hitAreas.innerHTML = "", t.hotspots.forEach((e, i) => {
      const r = this.createPolygon(e);
      this.overlay.appendChild(r);
      const n = this.createHitArea(e, r);
      this.hitAreas.appendChild(n), Yt.fromTo(
        r,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, delay: 0.15 + i * 0.08 }
      );
    });
  }
  createPolygon(t) {
    const e = document.createElementNS(es, "polygon"), i = t.polygon.map(([r, n]) => `${r},${n}`).join(" ");
    return e.setAttribute("points", i), e.setAttribute("class", "house-viewer__hotspot"), e;
  }
  createHitArea(t, e) {
    const i = t.polygon.map(([c]) => c), r = t.polygon.map(([, c]) => c), n = Math.min(...i), s = Math.min(...r), a = Math.max(...i) - n, o = Math.max(...r) - s, u = document.createElement("button");
    u.type = "button", u.className = "house-viewer__hit-area", u.style.left = `${n}%`, u.style.top = `${s}%`, u.style.width = `${a}%`, u.style.height = `${o}%`, u.setAttribute("aria-label", `${t.name} – pokaż szczegóły`);
    const f = () => e.classList.add("is-active"), _ = () => e.classList.remove("is-active");
    return u.addEventListener("mouseenter", f), u.addEventListener("mouseleave", _), u.addEventListener("focus", f), u.addEventListener("blur", _), u.addEventListener("click", () => this.openModal(t, u)), u;
  }
  openModal(t, e) {
    this.lastFocused = e, this.modalTitle.textContent = t.name, this.modalDescription.textContent = t.description, this.modalAdvantages.innerHTML = "", t.advantages.forEach((i) => {
      const r = document.createElement("li");
      r.textContent = i, this.modalAdvantages.appendChild(r);
    }), this.modal.hidden = !1, Yt.fromTo(
      this.modalPanel,
      { opacity: 0, scale: 0.96, y: 8 },
      { opacity: 1, scale: 1, y: 0, duration: 0.25, ease: "power2.out" }
    ), this.modalPanel.focus();
  }
  closeModal() {
    Yt.to(this.modalPanel, {
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
function Li() {
  var i;
  const h = document.getElementById("house-viewer"), t = document.getElementById("house-viewer-data");
  if (!h || !(t != null && t.textContent)) return;
  let e;
  try {
    e = JSON.parse(t.textContent);
  } catch {
    console.error("HouseViewer: nie udało się sparsować danych widoku.");
    return;
  }
  (i = e.views) != null && i.length && new is(h, e);
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", Li) : Li();
