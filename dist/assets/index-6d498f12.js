(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
  new MutationObserver((s) => {
    for (const o of s)
      if (o.type === "childList")
        for (const l of o.addedNodes)
          l.tagName === "LINK" && l.rel === "modulepreload" && r(l);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(s) {
    const o = {};
    return (
      s.integrity && (o.integrity = s.integrity),
      s.referrerPolicy && (o.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : s.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function r(s) {
    if (s.ep) return;
    s.ep = !0;
    const o = n(s);
    fetch(s.href, o);
  }
})();
function makeMap(e, t) {
  const n = Object.create(null),
    r = e.split(",");
  for (let s = 0; s < r.length; s++) n[r[s]] = !0;
  return t ? (s) => !!n[s.toLowerCase()] : (s) => !!n[s];
}
const EMPTY_OBJ = {},
  EMPTY_ARR = [],
  NOOP = () => {},
  NO = () => !1,
  onRE = /^on[^a-z]/,
  isOn = (e) => onRE.test(e),
  isModelListener = (e) => e.startsWith("onUpdate:"),
  extend$1 = Object.assign,
  remove = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  hasOwnProperty$2 = Object.prototype.hasOwnProperty,
  hasOwn = (e, t) => hasOwnProperty$2.call(e, t),
  isArray$1 = Array.isArray,
  isMap = (e) => toTypeString(e) === "[object Map]",
  isSet = (e) => toTypeString(e) === "[object Set]",
  isFunction$1 = (e) => typeof e == "function",
  isString$1 = (e) => typeof e == "string",
  isSymbol = (e) => typeof e == "symbol",
  isObject$1 = (e) => e !== null && typeof e == "object",
  isPromise = (e) =>
    isObject$1(e) && isFunction$1(e.then) && isFunction$1(e.catch),
  objectToString = Object.prototype.toString,
  toTypeString = (e) => objectToString.call(e),
  toRawType = (e) => toTypeString(e).slice(8, -1),
  isPlainObject$1 = (e) => toTypeString(e) === "[object Object]",
  isIntegerKey = (e) =>
    isString$1(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  isReservedProp = makeMap(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  cacheStringFunction = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  camelizeRE = /-(\w)/g,
  camelize = cacheStringFunction((e) =>
    e.replace(camelizeRE, (t, n) => (n ? n.toUpperCase() : ""))
  ),
  hyphenateRE = /\B([A-Z])/g,
  hyphenate = cacheStringFunction((e) =>
    e.replace(hyphenateRE, "-$1").toLowerCase()
  ),
  capitalize = cacheStringFunction(
    (e) => e.charAt(0).toUpperCase() + e.slice(1)
  ),
  toHandlerKey = cacheStringFunction((e) => (e ? `on${capitalize(e)}` : "")),
  hasChanged = (e, t) => !Object.is(e, t),
  invokeArrayFns = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  def = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  looseToNumber = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let _globalThis;
const getGlobalThis = () =>
  _globalThis ||
  (_globalThis =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
function normalizeStyle(e) {
  if (isArray$1(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        s = isString$1(r) ? parseStringStyle(r) : normalizeStyle(r);
      if (s) for (const o in s) t[o] = s[o];
    }
    return t;
  } else {
    if (isString$1(e)) return e;
    if (isObject$1(e)) return e;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g,
  propertyDelimiterRE = /:([^]+)/,
  styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(e) {
  const t = {};
  return (
    e
      .replace(styleCommentRE, "")
      .split(listDelimiterRE)
      .forEach((n) => {
        if (n) {
          const r = n.split(propertyDelimiterRE);
          r.length > 1 && (t[r[0].trim()] = r[1].trim());
        }
      }),
    t
  );
}
function normalizeClass(e) {
  let t = "";
  if (isString$1(e)) t = e;
  else if (isArray$1(e))
    for (let n = 0; n < e.length; n++) {
      const r = normalizeClass(e[n]);
      r && (t += r + " ");
    }
  else if (isObject$1(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const specialBooleanAttrs =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  isSpecialBooleanAttr = makeMap(specialBooleanAttrs);
function includeBooleanAttr(e) {
  return !!e || e === "";
}
const toDisplayString = (e) =>
    isString$1(e)
      ? e
      : e == null
      ? ""
      : isArray$1(e) ||
        (isObject$1(e) &&
          (e.toString === objectToString || !isFunction$1(e.toString)))
      ? JSON.stringify(e, replacer, 2)
      : String(e),
  replacer = (e, t) =>
    t && t.__v_isRef
      ? replacer(e, t.value)
      : isMap(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [r, s]) => ((n[`${r} =>`] = s), n),
            {}
          ),
        }
      : isSet(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : isObject$1(t) && !isArray$1(t) && !isPlainObject$1(t)
      ? String(t)
      : t;
let activeEffectScope;
class EffectScope {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = activeEffectScope),
      !t &&
        activeEffectScope &&
        (this.index =
          (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
            this
          ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = activeEffectScope;
      try {
        return (activeEffectScope = this), t();
      } finally {
        activeEffectScope = n;
      }
    }
  }
  on() {
    activeEffectScope = this;
  }
  off() {
    activeEffectScope = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s &&
          s !== this &&
          ((this.parent.scopes[this.index] = s), (s.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function recordEffectScope(e, t = activeEffectScope) {
  t && t.active && t.effects.push(e);
}
function getCurrentScope() {
  return activeEffectScope;
}
const createDep = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  wasTracked = (e) => (e.w & trackOpBit) > 0,
  newTracked = (e) => (e.n & trackOpBit) > 0,
  initDepMarkers = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= trackOpBit;
  },
  finalizeDepMarkers = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let r = 0; r < t.length; r++) {
        const s = t[r];
        wasTracked(s) && !newTracked(s) ? s.delete(e) : (t[n++] = s),
          (s.w &= ~trackOpBit),
          (s.n &= ~trackOpBit);
      }
      t.length = n;
    }
  },
  targetMap = new WeakMap();
let effectTrackDepth = 0,
  trackOpBit = 1;
const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol(""),
  MAP_KEY_ITERATE_KEY = Symbol("");
class ReactiveEffect {
  constructor(t, n = null, r) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      recordEffectScope(this, r);
  }
  run() {
    if (!this.active) return this.fn();
    let t = activeEffect,
      n = shouldTrack;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = activeEffect),
        (activeEffect = this),
        (shouldTrack = !0),
        (trackOpBit = 1 << ++effectTrackDepth),
        effectTrackDepth <= maxMarkerBits
          ? initDepMarkers(this)
          : cleanupEffect(this),
        this.fn()
      );
    } finally {
      effectTrackDepth <= maxMarkerBits && finalizeDepMarkers(this),
        (trackOpBit = 1 << --effectTrackDepth),
        (activeEffect = this.parent),
        (shouldTrack = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    activeEffect === this
      ? (this.deferStop = !0)
      : this.active &&
        (cleanupEffect(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function cleanupEffect(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let shouldTrack = !0;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack), (shouldTrack = !1);
}
function resetTracking() {
  const e = trackStack.pop();
  shouldTrack = e === void 0 ? !0 : e;
}
function track(e, t, n) {
  if (shouldTrack && activeEffect) {
    let r = targetMap.get(e);
    r || targetMap.set(e, (r = new Map()));
    let s = r.get(n);
    s || r.set(n, (s = createDep())), trackEffects(s);
  }
}
function trackEffects(e, t) {
  let n = !1;
  effectTrackDepth <= maxMarkerBits
    ? newTracked(e) || ((e.n |= trackOpBit), (n = !wasTracked(e)))
    : (n = !e.has(activeEffect)),
    n && (e.add(activeEffect), activeEffect.deps.push(e));
}
function trigger(e, t, n, r, s, o) {
  const l = targetMap.get(e);
  if (!l) return;
  let u = [];
  if (t === "clear") u = [...l.values()];
  else if (n === "length" && isArray$1(e)) {
    const f = Number(r);
    l.forEach((c, h) => {
      (h === "length" || h >= f) && u.push(c);
    });
  } else
    switch ((n !== void 0 && u.push(l.get(n)), t)) {
      case "add":
        isArray$1(e)
          ? isIntegerKey(n) && u.push(l.get("length"))
          : (u.push(l.get(ITERATE_KEY)),
            isMap(e) && u.push(l.get(MAP_KEY_ITERATE_KEY)));
        break;
      case "delete":
        isArray$1(e) ||
          (u.push(l.get(ITERATE_KEY)),
          isMap(e) && u.push(l.get(MAP_KEY_ITERATE_KEY)));
        break;
      case "set":
        isMap(e) && u.push(l.get(ITERATE_KEY));
        break;
    }
  if (u.length === 1) u[0] && triggerEffects(u[0]);
  else {
    const f = [];
    for (const c of u) c && f.push(...c);
    triggerEffects(createDep(f));
  }
}
function triggerEffects(e, t) {
  const n = isArray$1(e) ? e : [...e];
  for (const r of n) r.computed && triggerEffect(r);
  for (const r of n) r.computed || triggerEffect(r);
}
function triggerEffect(e, t) {
  (e !== activeEffect || e.allowRecurse) &&
    (e.scheduler ? e.scheduler() : e.run());
}
const isNonTrackableKeys = makeMap("__proto__,__v_isRef,__isVue"),
  builtInSymbols = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(isSymbol)
  ),
  get$1 = createGetter(),
  shallowGet = createGetter(!1, !0),
  readonlyGet = createGetter(!0),
  arrayInstrumentations = createArrayInstrumentations();
function createArrayInstrumentations() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const r = toRaw(this);
        for (let o = 0, l = this.length; o < l; o++) track(r, "get", o + "");
        const s = r[t](...n);
        return s === -1 || s === !1 ? r[t](...n.map(toRaw)) : s;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        pauseTracking();
        const r = toRaw(this)[t].apply(this, n);
        return resetTracking(), r;
      };
    }),
    e
  );
}
function hasOwnProperty$1(e) {
  const t = toRaw(this);
  return track(t, "has", e), t.hasOwnProperty(e);
}
function createGetter(e = !1, t = !1) {
  return function (r, s, o) {
    if (s === "__v_isReactive") return !e;
    if (s === "__v_isReadonly") return e;
    if (s === "__v_isShallow") return t;
    if (
      s === "__v_raw" &&
      o ===
        (e
          ? t
            ? shallowReadonlyMap
            : readonlyMap
          : t
          ? shallowReactiveMap
          : reactiveMap
        ).get(r)
    )
      return r;
    const l = isArray$1(r);
    if (!e) {
      if (l && hasOwn(arrayInstrumentations, s))
        return Reflect.get(arrayInstrumentations, s, o);
      if (s === "hasOwnProperty") return hasOwnProperty$1;
    }
    const u = Reflect.get(r, s, o);
    return (isSymbol(s) ? builtInSymbols.has(s) : isNonTrackableKeys(s)) ||
      (e || track(r, "get", s), t)
      ? u
      : isRef(u)
      ? l && isIntegerKey(s)
        ? u
        : u.value
      : isObject$1(u)
      ? e
        ? readonly(u)
        : reactive(u)
      : u;
  };
}
const set$1 = createSetter(),
  shallowSet = createSetter(!0);
function createSetter(e = !1) {
  return function (n, r, s, o) {
    let l = n[r];
    if (isReadonly(l) && isRef(l) && !isRef(s)) return !1;
    if (
      !e &&
      (!isShallow(s) && !isReadonly(s) && ((l = toRaw(l)), (s = toRaw(s))),
      !isArray$1(n) && isRef(l) && !isRef(s))
    )
      return (l.value = s), !0;
    const u =
        isArray$1(n) && isIntegerKey(r) ? Number(r) < n.length : hasOwn(n, r),
      f = Reflect.set(n, r, s, o);
    return (
      n === toRaw(o) &&
        (u
          ? hasChanged(s, l) && trigger(n, "set", r, s)
          : trigger(n, "add", r, s)),
      f
    );
  };
}
function deleteProperty(e, t) {
  const n = hasOwn(e, t);
  e[t];
  const r = Reflect.deleteProperty(e, t);
  return r && n && trigger(e, "delete", t, void 0), r;
}
function has$1(e, t) {
  const n = Reflect.has(e, t);
  return (!isSymbol(t) || !builtInSymbols.has(t)) && track(e, "has", t), n;
}
function ownKeys(e) {
  return (
    track(e, "iterate", isArray$1(e) ? "length" : ITERATE_KEY),
    Reflect.ownKeys(e)
  );
}
const mutableHandlers = {
    get: get$1,
    set: set$1,
    deleteProperty,
    has: has$1,
    ownKeys,
  },
  readonlyHandlers = {
    get: readonlyGet,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  shallowReactiveHandlers = extend$1({}, mutableHandlers, {
    get: shallowGet,
    set: shallowSet,
  }),
  toShallow = (e) => e,
  getProto = (e) => Reflect.getPrototypeOf(e);
function get(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const s = toRaw(e),
    o = toRaw(t);
  n || (t !== o && track(s, "get", t), track(s, "get", o));
  const { has: l } = getProto(s),
    u = r ? toShallow : n ? toReadonly : toReactive;
  if (l.call(s, t)) return u(e.get(t));
  if (l.call(s, o)) return u(e.get(o));
  e !== s && e.get(t);
}
function has(e, t = !1) {
  const n = this.__v_raw,
    r = toRaw(n),
    s = toRaw(e);
  return (
    t || (e !== s && track(r, "has", e), track(r, "has", s)),
    e === s ? n.has(e) : n.has(e) || n.has(s)
  );
}
function size(e, t = !1) {
  return (
    (e = e.__v_raw),
    !t && track(toRaw(e), "iterate", ITERATE_KEY),
    Reflect.get(e, "size", e)
  );
}
function add(e) {
  e = toRaw(e);
  const t = toRaw(this);
  return (
    getProto(t).has.call(t, e) || (t.add(e), trigger(t, "add", e, e)), this
  );
}
function set(e, t) {
  t = toRaw(t);
  const n = toRaw(this),
    { has: r, get: s } = getProto(n);
  let o = r.call(n, e);
  o || ((e = toRaw(e)), (o = r.call(n, e)));
  const l = s.call(n, e);
  return (
    n.set(e, t),
    o ? hasChanged(t, l) && trigger(n, "set", e, t) : trigger(n, "add", e, t),
    this
  );
}
function deleteEntry(e) {
  const t = toRaw(this),
    { has: n, get: r } = getProto(t);
  let s = n.call(t, e);
  s || ((e = toRaw(e)), (s = n.call(t, e))), r && r.call(t, e);
  const o = t.delete(e);
  return s && trigger(t, "delete", e, void 0), o;
}
function clear() {
  const e = toRaw(this),
    t = e.size !== 0,
    n = e.clear();
  return t && trigger(e, "clear", void 0, void 0), n;
}
function createForEach(e, t) {
  return function (r, s) {
    const o = this,
      l = o.__v_raw,
      u = toRaw(l),
      f = t ? toShallow : e ? toReadonly : toReactive;
    return (
      !e && track(u, "iterate", ITERATE_KEY),
      l.forEach((c, h) => r.call(s, f(c), f(h), o))
    );
  };
}
function createIterableMethod(e, t, n) {
  return function (...r) {
    const s = this.__v_raw,
      o = toRaw(s),
      l = isMap(o),
      u = e === "entries" || (e === Symbol.iterator && l),
      f = e === "keys" && l,
      c = s[e](...r),
      h = n ? toShallow : t ? toReadonly : toReactive;
    return (
      !t && track(o, "iterate", f ? MAP_KEY_ITERATE_KEY : ITERATE_KEY),
      {
        next() {
          const { value: v, done: x } = c.next();
          return x
            ? { value: v, done: x }
            : { value: u ? [h(v[0]), h(v[1])] : h(v), done: x };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function createReadonlyMethod(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function createInstrumentations() {
  const e = {
      get(o) {
        return get(this, o);
      },
      get size() {
        return size(this);
      },
      has,
      add,
      set,
      delete: deleteEntry,
      clear,
      forEach: createForEach(!1, !1),
    },
    t = {
      get(o) {
        return get(this, o, !1, !0);
      },
      get size() {
        return size(this);
      },
      has,
      add,
      set,
      delete: deleteEntry,
      clear,
      forEach: createForEach(!1, !0),
    },
    n = {
      get(o) {
        return get(this, o, !0);
      },
      get size() {
        return size(this, !0);
      },
      has(o) {
        return has.call(this, o, !0);
      },
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear"),
      forEach: createForEach(!0, !1),
    },
    r = {
      get(o) {
        return get(this, o, !0, !0);
      },
      get size() {
        return size(this, !0);
      },
      has(o) {
        return has.call(this, o, !0);
      },
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear"),
      forEach: createForEach(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
      (e[o] = createIterableMethod(o, !1, !1)),
        (n[o] = createIterableMethod(o, !0, !1)),
        (t[o] = createIterableMethod(o, !1, !0)),
        (r[o] = createIterableMethod(o, !0, !0));
    }),
    [e, n, t, r]
  );
}
const [
  mutableInstrumentations,
  readonlyInstrumentations,
  shallowInstrumentations,
  shallowReadonlyInstrumentations,
] = createInstrumentations();
function createInstrumentationGetter(e, t) {
  const n = t
    ? e
      ? shallowReadonlyInstrumentations
      : shallowInstrumentations
    : e
    ? readonlyInstrumentations
    : mutableInstrumentations;
  return (r, s, o) =>
    s === "__v_isReactive"
      ? !e
      : s === "__v_isReadonly"
      ? e
      : s === "__v_raw"
      ? r
      : Reflect.get(hasOwn(n, s) && s in r ? n : r, s, o);
}
const mutableCollectionHandlers = { get: createInstrumentationGetter(!1, !1) },
  shallowCollectionHandlers = { get: createInstrumentationGetter(!1, !0) },
  readonlyCollectionHandlers = { get: createInstrumentationGetter(!0, !1) },
  reactiveMap = new WeakMap(),
  shallowReactiveMap = new WeakMap(),
  readonlyMap = new WeakMap(),
  shallowReadonlyMap = new WeakMap();
function targetTypeMap(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(e) {
  return e.__v_skip || !Object.isExtensible(e)
    ? 0
    : targetTypeMap(toRawType(e));
}
function reactive(e) {
  return isReadonly(e)
    ? e
    : createReactiveObject(
        e,
        !1,
        mutableHandlers,
        mutableCollectionHandlers,
        reactiveMap
      );
}
function shallowReactive(e) {
  return createReactiveObject(
    e,
    !1,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(e) {
  return createReactiveObject(
    e,
    !0,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function createReactiveObject(e, t, n, r, s) {
  if (!isObject$1(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const o = s.get(e);
  if (o) return o;
  const l = getTargetType(e);
  if (l === 0) return e;
  const u = new Proxy(e, l === 2 ? r : n);
  return s.set(e, u), u;
}
function isReactive(e) {
  return isReadonly(e) ? isReactive(e.__v_raw) : !!(e && e.__v_isReactive);
}
function isReadonly(e) {
  return !!(e && e.__v_isReadonly);
}
function isShallow(e) {
  return !!(e && e.__v_isShallow);
}
function isProxy(e) {
  return isReactive(e) || isReadonly(e);
}
function toRaw(e) {
  const t = e && e.__v_raw;
  return t ? toRaw(t) : e;
}
function markRaw(e) {
  return def(e, "__v_skip", !0), e;
}
const toReactive = (e) => (isObject$1(e) ? reactive(e) : e),
  toReadonly = (e) => (isObject$1(e) ? readonly(e) : e);
function trackRefValue(e) {
  shouldTrack &&
    activeEffect &&
    ((e = toRaw(e)), trackEffects(e.dep || (e.dep = createDep())));
}
function triggerRefValue(e, t) {
  e = toRaw(e);
  const n = e.dep;
  n && triggerEffects(n);
}
function isRef(e) {
  return !!(e && e.__v_isRef === !0);
}
function ref(e) {
  return createRef(e, !1);
}
function createRef(e, t) {
  return isRef(e) ? e : new RefImpl(e, t);
}
class RefImpl {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : toRaw(t)),
      (this._value = n ? t : toReactive(t));
  }
  get value() {
    return trackRefValue(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || isShallow(t) || isReadonly(t);
    (t = n ? t : toRaw(t)),
      hasChanged(t, this._rawValue) &&
        ((this._rawValue = t),
        (this._value = n ? t : toReactive(t)),
        triggerRefValue(this));
  }
}
function unref(e) {
  return isRef(e) ? e.value : e;
}
const shallowUnwrapHandlers = {
  get: (e, t, n) => unref(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const s = e[t];
    return isRef(s) && !isRef(n)
      ? ((s.value = n), !0)
      : Reflect.set(e, t, n, r);
  },
};
function proxyRefs(e) {
  return isReactive(e) ? e : new Proxy(e, shallowUnwrapHandlers);
}
class ComputedRefImpl {
  constructor(t, n, r, s) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this._dirty = !0),
      (this.effect = new ReactiveEffect(t, () => {
        this._dirty || ((this._dirty = !0), triggerRefValue(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !s),
      (this.__v_isReadonly = r);
  }
  get value() {
    const t = toRaw(this);
    return (
      trackRefValue(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function computed$1(e, t, n = !1) {
  let r, s;
  const o = isFunction$1(e);
  return (
    o ? ((r = e), (s = NOOP)) : ((r = e.get), (s = e.set)),
    new ComputedRefImpl(r, s, o || !s, n)
  );
}
function warn(e, ...t) {}
function callWithErrorHandling(e, t, n, r) {
  let s;
  try {
    s = r ? e(...r) : e();
  } catch (o) {
    handleError(o, t, n);
  }
  return s;
}
function callWithAsyncErrorHandling(e, t, n, r) {
  if (isFunction$1(e)) {
    const o = callWithErrorHandling(e, t, n, r);
    return (
      o &&
        isPromise(o) &&
        o.catch((l) => {
          handleError(l, t, n);
        }),
      o
    );
  }
  const s = [];
  for (let o = 0; o < e.length; o++)
    s.push(callWithAsyncErrorHandling(e[o], t, n, r));
  return s;
}
function handleError(e, t, n, r = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const l = t.proxy,
      u = n;
    for (; o; ) {
      const c = o.ec;
      if (c) {
        for (let h = 0; h < c.length; h++) if (c[h](e, l, u) === !1) return;
      }
      o = o.parent;
    }
    const f = t.appContext.config.errorHandler;
    if (f) {
      callWithErrorHandling(f, null, 10, [e, l, u]);
      return;
    }
  }
  logError(e, n, s, r);
}
function logError(e, t, n, r = !0) {
  console.error(e);
}
let isFlushing = !1,
  isFlushPending = !1;
const queue = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null,
  postFlushIndex = 0;
const resolvedPromise = Promise.resolve();
let currentFlushPromise = null;
function nextTick(e) {
  const t = currentFlushPromise || resolvedPromise;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function findInsertionIndex(e) {
  let t = flushIndex + 1,
    n = queue.length;
  for (; t < n; ) {
    const r = (t + n) >>> 1;
    getId(queue[r]) < e ? (t = r + 1) : (n = r);
  }
  return t;
}
function queueJob(e) {
  (!queue.length ||
    !queue.includes(
      e,
      isFlushing && e.allowRecurse ? flushIndex + 1 : flushIndex
    )) &&
    (e.id == null
      ? queue.push(e)
      : queue.splice(findInsertionIndex(e.id), 0, e),
    queueFlush());
}
function queueFlush() {
  !isFlushing &&
    !isFlushPending &&
    ((isFlushPending = !0),
    (currentFlushPromise = resolvedPromise.then(flushJobs)));
}
function invalidateJob(e) {
  const t = queue.indexOf(e);
  t > flushIndex && queue.splice(t, 1);
}
function queuePostFlushCb(e) {
  isArray$1(e)
    ? pendingPostFlushCbs.push(...e)
    : (!activePostFlushCbs ||
        !activePostFlushCbs.includes(
          e,
          e.allowRecurse ? postFlushIndex + 1 : postFlushIndex
        )) &&
      pendingPostFlushCbs.push(e),
    queueFlush();
}
function flushPreFlushCbs(e, t = isFlushing ? flushIndex + 1 : 0) {
  for (; t < queue.length; t++) {
    const n = queue[t];
    n && n.pre && (queue.splice(t, 1), t--, n());
  }
}
function flushPostFlushCbs(e) {
  if (pendingPostFlushCbs.length) {
    const t = [...new Set(pendingPostFlushCbs)];
    if (((pendingPostFlushCbs.length = 0), activePostFlushCbs)) {
      activePostFlushCbs.push(...t);
      return;
    }
    for (
      activePostFlushCbs = t,
        activePostFlushCbs.sort((n, r) => getId(n) - getId(r)),
        postFlushIndex = 0;
      postFlushIndex < activePostFlushCbs.length;
      postFlushIndex++
    )
      activePostFlushCbs[postFlushIndex]();
    (activePostFlushCbs = null), (postFlushIndex = 0);
  }
}
const getId = (e) => (e.id == null ? 1 / 0 : e.id),
  comparator = (e, t) => {
    const n = getId(e) - getId(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function flushJobs(e) {
  (isFlushPending = !1), (isFlushing = !0), queue.sort(comparator);
  const t = NOOP;
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const n = queue[flushIndex];
      n && n.active !== !1 && callWithErrorHandling(n, null, 14);
    }
  } finally {
    (flushIndex = 0),
      (queue.length = 0),
      flushPostFlushCbs(),
      (isFlushing = !1),
      (currentFlushPromise = null),
      (queue.length || pendingPostFlushCbs.length) && flushJobs();
  }
}
function emit(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || EMPTY_OBJ;
  let s = n;
  const o = t.startsWith("update:"),
    l = o && t.slice(7);
  if (l && l in r) {
    const h = `${l === "modelValue" ? "model" : l}Modifiers`,
      { number: v, trim: x } = r[h] || EMPTY_OBJ;
    x && (s = n.map((R) => (isString$1(R) ? R.trim() : R))),
      v && (s = n.map(looseToNumber));
  }
  let u,
    f = r[(u = toHandlerKey(t))] || r[(u = toHandlerKey(camelize(t)))];
  !f && o && (f = r[(u = toHandlerKey(hyphenate(t)))]),
    f && callWithAsyncErrorHandling(f, e, 6, s);
  const c = r[u + "Once"];
  if (c) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[u]) return;
    (e.emitted[u] = !0), callWithAsyncErrorHandling(c, e, 6, s);
  }
}
function normalizeEmitsOptions(e, t, n = !1) {
  const r = t.emitsCache,
    s = r.get(e);
  if (s !== void 0) return s;
  const o = e.emits;
  let l = {},
    u = !1;
  if (!isFunction$1(e)) {
    const f = (c) => {
      const h = normalizeEmitsOptions(c, t, !0);
      h && ((u = !0), extend$1(l, h));
    };
    !n && t.mixins.length && t.mixins.forEach(f),
      e.extends && f(e.extends),
      e.mixins && e.mixins.forEach(f);
  }
  return !o && !u
    ? (isObject$1(e) && r.set(e, null), null)
    : (isArray$1(o) ? o.forEach((f) => (l[f] = null)) : extend$1(l, o),
      isObject$1(e) && r.set(e, l),
      l);
}
function isEmitListener(e, t) {
  return !e || !isOn(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      hasOwn(e, t[0].toLowerCase() + t.slice(1)) ||
        hasOwn(e, hyphenate(t)) ||
        hasOwn(e, t));
}
let currentRenderingInstance = null,
  currentScopeId = null;
function setCurrentRenderingInstance(e) {
  const t = currentRenderingInstance;
  return (
    (currentRenderingInstance = e),
    (currentScopeId = (e && e.type.__scopeId) || null),
    t
  );
}
function pushScopeId(e) {
  currentScopeId = e;
}
function popScopeId() {
  currentScopeId = null;
}
function withCtx(e, t = currentRenderingInstance, n) {
  if (!t || e._n) return e;
  const r = (...s) => {
    r._d && setBlockTracking(-1);
    const o = setCurrentRenderingInstance(t);
    let l;
    try {
      l = e(...s);
    } finally {
      setCurrentRenderingInstance(o), r._d && setBlockTracking(1);
    }
    return l;
  };
  return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function markAttrsAccessed() {}
function renderComponentRoot(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: s,
    props: o,
    propsOptions: [l],
    slots: u,
    attrs: f,
    emit: c,
    render: h,
    renderCache: v,
    data: x,
    setupState: R,
    ctx: g,
    inheritAttrs: y,
  } = e;
  let A, O;
  const L = setCurrentRenderingInstance(e);
  try {
    if (n.shapeFlag & 4) {
      const P = s || r;
      (A = normalizeVNode(h.call(P, P, v, o, R, x, g))), (O = f);
    } else {
      const P = t;
      (A = normalizeVNode(
        P.length > 1 ? P(o, { attrs: f, slots: u, emit: c }) : P(o, null)
      )),
        (O = t.props ? f : getFunctionalFallthrough(f));
    }
  } catch (P) {
    (blockStack.length = 0), handleError(P, e, 1), (A = createVNode(Comment));
  }
  let K = A;
  if (O && y !== !1) {
    const P = Object.keys(O),
      { shapeFlag: W } = K;
    P.length &&
      W & 7 &&
      (l && P.some(isModelListener) && (O = filterModelListeners(O, l)),
      (K = cloneVNode(K, O)));
  }
  return (
    n.dirs &&
      ((K = cloneVNode(K)), (K.dirs = K.dirs ? K.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (K.transition = n.transition),
    (A = K),
    setCurrentRenderingInstance(L),
    A
  );
}
const getFunctionalFallthrough = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || isOn(n)) &&
        ((t || (t = {}))[n] = e[n]);
    return t;
  },
  filterModelListeners = (e, t) => {
    const n = {};
    for (const r in e)
      (!isModelListener(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n;
  };
function shouldUpdateComponent(e, t, n) {
  const { props: r, children: s, component: o } = e,
    { props: l, children: u, patchFlag: f } = t,
    c = o.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && f >= 0) {
    if (f & 1024) return !0;
    if (f & 16) return r ? hasPropsChanged(r, l, c) : !!l;
    if (f & 8) {
      const h = t.dynamicProps;
      for (let v = 0; v < h.length; v++) {
        const x = h[v];
        if (l[x] !== r[x] && !isEmitListener(c, x)) return !0;
      }
    }
  } else
    return (s || u) && (!u || !u.$stable)
      ? !0
      : r === l
      ? !1
      : r
      ? l
        ? hasPropsChanged(r, l, c)
        : !0
      : !!l;
  return !1;
}
function hasPropsChanged(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let s = 0; s < r.length; s++) {
    const o = r[s];
    if (t[o] !== e[o] && !isEmitListener(n, o)) return !0;
  }
  return !1;
}
function updateHOCHostEl({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const isSuspense = (e) => e.__isSuspense;
function queueEffectWithSuspense(e, t) {
  t && t.pendingBranch
    ? isArray$1(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : queuePostFlushCb(e);
}
const INITIAL_WATCHER_VALUE = {};
function watch(e, t, n) {
  return doWatch(e, t, n);
}
function doWatch(
  e,
  t,
  { immediate: n, deep: r, flush: s, onTrack: o, onTrigger: l } = EMPTY_OBJ
) {
  var u;
  const f =
    getCurrentScope() === ((u = currentInstance) == null ? void 0 : u.scope)
      ? currentInstance
      : null;
  let c,
    h = !1,
    v = !1;
  if (
    (isRef(e)
      ? ((c = () => e.value), (h = isShallow(e)))
      : isReactive(e)
      ? ((c = () => e), (r = !0))
      : isArray$1(e)
      ? ((v = !0),
        (h = e.some((P) => isReactive(P) || isShallow(P))),
        (c = () =>
          e.map((P) => {
            if (isRef(P)) return P.value;
            if (isReactive(P)) return traverse(P);
            if (isFunction$1(P)) return callWithErrorHandling(P, f, 2);
          })))
      : isFunction$1(e)
      ? t
        ? (c = () => callWithErrorHandling(e, f, 2))
        : (c = () => {
            if (!(f && f.isUnmounted))
              return x && x(), callWithAsyncErrorHandling(e, f, 3, [R]);
          })
      : (c = NOOP),
    t && r)
  ) {
    const P = c;
    c = () => traverse(P());
  }
  let x,
    R = (P) => {
      x = L.onStop = () => {
        callWithErrorHandling(P, f, 4);
      };
    },
    g;
  if (isInSSRComponentSetup)
    if (
      ((R = NOOP),
      t
        ? n && callWithAsyncErrorHandling(t, f, 3, [c(), v ? [] : void 0, R])
        : c(),
      s === "sync")
    ) {
      const P = useSSRContext();
      g = P.__watcherHandles || (P.__watcherHandles = []);
    } else return NOOP;
  let y = v
    ? new Array(e.length).fill(INITIAL_WATCHER_VALUE)
    : INITIAL_WATCHER_VALUE;
  const A = () => {
    if (L.active)
      if (t) {
        const P = L.run();
        (r ||
          h ||
          (v ? P.some((W, Z) => hasChanged(W, y[Z])) : hasChanged(P, y))) &&
          (x && x(),
          callWithAsyncErrorHandling(t, f, 3, [
            P,
            y === INITIAL_WATCHER_VALUE
              ? void 0
              : v && y[0] === INITIAL_WATCHER_VALUE
              ? []
              : y,
            R,
          ]),
          (y = P));
      } else L.run();
  };
  A.allowRecurse = !!t;
  let O;
  s === "sync"
    ? (O = A)
    : s === "post"
    ? (O = () => queuePostRenderEffect(A, f && f.suspense))
    : ((A.pre = !0), f && (A.id = f.uid), (O = () => queueJob(A)));
  const L = new ReactiveEffect(c, O);
  t
    ? n
      ? A()
      : (y = L.run())
    : s === "post"
    ? queuePostRenderEffect(L.run.bind(L), f && f.suspense)
    : L.run();
  const K = () => {
    L.stop(), f && f.scope && remove(f.scope.effects, L);
  };
  return g && g.push(K), K;
}
function instanceWatch(e, t, n) {
  const r = this.proxy,
    s = isString$1(e)
      ? e.includes(".")
        ? createPathGetter(r, e)
        : () => r[e]
      : e.bind(r, r);
  let o;
  isFunction$1(t) ? (o = t) : ((o = t.handler), (n = t));
  const l = currentInstance;
  setCurrentInstance(this);
  const u = doWatch(s, o.bind(r), n);
  return l ? setCurrentInstance(l) : unsetCurrentInstance(), u;
}
function createPathGetter(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let s = 0; s < n.length && r; s++) r = r[n[s]];
    return r;
  };
}
function traverse(e, t) {
  if (!isObject$1(e) || e.__v_skip || ((t = t || new Set()), t.has(e)))
    return e;
  if ((t.add(e), isRef(e))) traverse(e.value, t);
  else if (isArray$1(e)) for (let n = 0; n < e.length; n++) traverse(e[n], t);
  else if (isSet(e) || isMap(e))
    e.forEach((n) => {
      traverse(n, t);
    });
  else if (isPlainObject$1(e)) for (const n in e) traverse(e[n], t);
  return e;
}
function invokeDirectiveHook(e, t, n, r) {
  const s = e.dirs,
    o = t && t.dirs;
  for (let l = 0; l < s.length; l++) {
    const u = s[l];
    o && (u.oldValue = o[l].value);
    let f = u.dir[r];
    f &&
      (pauseTracking(),
      callWithAsyncErrorHandling(f, n, 8, [e.el, u, e, t]),
      resetTracking());
  }
}
function defineComponent(e, t) {
  return isFunction$1(e)
    ? (() => extend$1({ name: e.name }, t, { setup: e }))()
    : e;
}
const isAsyncWrapper = (e) => !!e.type.__asyncLoader,
  isKeepAlive = (e) => e.type.__isKeepAlive;
function onActivated(e, t) {
  registerKeepAliveHook(e, "a", t);
}
function onDeactivated(e, t) {
  registerKeepAliveHook(e, "da", t);
}
function registerKeepAliveHook(e, t, n = currentInstance) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let s = n;
      for (; s; ) {
        if (s.isDeactivated) return;
        s = s.parent;
      }
      return e();
    });
  if ((injectHook(t, r, n), n)) {
    let s = n.parent;
    for (; s && s.parent; )
      isKeepAlive(s.parent.vnode) && injectToKeepAliveRoot(r, t, n, s),
        (s = s.parent);
  }
}
function injectToKeepAliveRoot(e, t, n, r) {
  const s = injectHook(t, e, r, !0);
  onUnmounted(() => {
    remove(r[t], s);
  }, n);
}
function injectHook(e, t, n = currentInstance, r = !1) {
  if (n) {
    const s = n[e] || (n[e] = []),
      o =
        t.__weh ||
        (t.__weh = (...l) => {
          if (n.isUnmounted) return;
          pauseTracking(), setCurrentInstance(n);
          const u = callWithAsyncErrorHandling(t, n, e, l);
          return unsetCurrentInstance(), resetTracking(), u;
        });
    return r ? s.unshift(o) : s.push(o), o;
  }
}
const createHook =
    (e) =>
    (t, n = currentInstance) =>
      (!isInSSRComponentSetup || e === "sp") &&
      injectHook(e, (...r) => t(...r), n),
  onBeforeMount = createHook("bm"),
  onMounted = createHook("m"),
  onBeforeUpdate = createHook("bu"),
  onUpdated = createHook("u"),
  onBeforeUnmount = createHook("bum"),
  onUnmounted = createHook("um"),
  onServerPrefetch = createHook("sp"),
  onRenderTriggered = createHook("rtg"),
  onRenderTracked = createHook("rtc");
function onErrorCaptured(e, t = currentInstance) {
  injectHook("ec", e, t);
}
const NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc"),
  getPublicInstance = (e) =>
    e
      ? isStatefulComponent(e)
        ? getExposeProxy(e) || e.proxy
        : getPublicInstance(e.parent)
      : null,
  publicPropertiesMap = extend$1(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => getPublicInstance(e.parent),
    $root: (e) => getPublicInstance(e.root),
    $emit: (e) => e.emit,
    $options: (e) => resolveMergedOptions(e),
    $forceUpdate: (e) => e.f || (e.f = () => queueJob(e.update)),
    $nextTick: (e) => e.n || (e.n = nextTick.bind(e.proxy)),
    $watch: (e) => instanceWatch.bind(e),
  }),
  hasSetupBinding = (e, t) =>
    e !== EMPTY_OBJ && !e.__isScriptSetup && hasOwn(e, t),
  PublicInstanceProxyHandlers = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: r,
        data: s,
        props: o,
        accessCache: l,
        type: u,
        appContext: f,
      } = e;
      let c;
      if (t[0] !== "$") {
        const R = l[t];
        if (R !== void 0)
          switch (R) {
            case 1:
              return r[t];
            case 2:
              return s[t];
            case 4:
              return n[t];
            case 3:
              return o[t];
          }
        else {
          if (hasSetupBinding(r, t)) return (l[t] = 1), r[t];
          if (s !== EMPTY_OBJ && hasOwn(s, t)) return (l[t] = 2), s[t];
          if ((c = e.propsOptions[0]) && hasOwn(c, t)) return (l[t] = 3), o[t];
          if (n !== EMPTY_OBJ && hasOwn(n, t)) return (l[t] = 4), n[t];
          shouldCacheAccess && (l[t] = 0);
        }
      }
      const h = publicPropertiesMap[t];
      let v, x;
      if (h) return t === "$attrs" && track(e, "get", t), h(e);
      if ((v = u.__cssModules) && (v = v[t])) return v;
      if (n !== EMPTY_OBJ && hasOwn(n, t)) return (l[t] = 4), n[t];
      if (((x = f.config.globalProperties), hasOwn(x, t))) return x[t];
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: s, ctx: o } = e;
      return hasSetupBinding(s, t)
        ? ((s[t] = n), !0)
        : r !== EMPTY_OBJ && hasOwn(r, t)
        ? ((r[t] = n), !0)
        : hasOwn(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((o[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: r,
          appContext: s,
          propsOptions: o,
        },
      },
      l
    ) {
      let u;
      return (
        !!n[l] ||
        (e !== EMPTY_OBJ && hasOwn(e, l)) ||
        hasSetupBinding(t, l) ||
        ((u = o[0]) && hasOwn(u, l)) ||
        hasOwn(r, l) ||
        hasOwn(publicPropertiesMap, l) ||
        hasOwn(s.config.globalProperties, l)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : hasOwn(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
function normalizePropsOrEmits(e) {
  return isArray$1(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let shouldCacheAccess = !0;
function applyOptions(e) {
  const t = resolveMergedOptions(e),
    n = e.proxy,
    r = e.ctx;
  (shouldCacheAccess = !1), t.beforeCreate && callHook(t.beforeCreate, e, "bc");
  const {
    data: s,
    computed: o,
    methods: l,
    watch: u,
    provide: f,
    inject: c,
    created: h,
    beforeMount: v,
    mounted: x,
    beforeUpdate: R,
    updated: g,
    activated: y,
    deactivated: A,
    beforeDestroy: O,
    beforeUnmount: L,
    destroyed: K,
    unmounted: P,
    render: W,
    renderTracked: Z,
    renderTriggered: T,
    errorCaptured: Y,
    serverPrefetch: se,
    expose: oe,
    inheritAttrs: H,
    components: ye,
    directives: ae,
    filters: ve,
  } = t;
  if ((c && resolveInjections(c, r, null), l))
    for (const te in l) {
      const G = l[te];
      isFunction$1(G) && (r[te] = G.bind(n));
    }
  if (s) {
    const te = s.call(n, n);
    isObject$1(te) && (e.data = reactive(te));
  }
  if (((shouldCacheAccess = !0), o))
    for (const te in o) {
      const G = o[te],
        ce = isFunction$1(G)
          ? G.bind(n, n)
          : isFunction$1(G.get)
          ? G.get.bind(n, n)
          : NOOP,
        le = !isFunction$1(G) && isFunction$1(G.set) ? G.set.bind(n) : NOOP,
        me = computed({ get: ce, set: le });
      Object.defineProperty(r, te, {
        enumerable: !0,
        configurable: !0,
        get: () => me.value,
        set: (he) => (me.value = he),
      });
    }
  if (u) for (const te in u) createWatcher(u[te], r, n, te);
  if (f) {
    const te = isFunction$1(f) ? f.call(n) : f;
    Reflect.ownKeys(te).forEach((G) => {
      provide(G, te[G]);
    });
  }
  h && callHook(h, e, "c");
  function ie(te, G) {
    isArray$1(G) ? G.forEach((ce) => te(ce.bind(n))) : G && te(G.bind(n));
  }
  if (
    (ie(onBeforeMount, v),
    ie(onMounted, x),
    ie(onBeforeUpdate, R),
    ie(onUpdated, g),
    ie(onActivated, y),
    ie(onDeactivated, A),
    ie(onErrorCaptured, Y),
    ie(onRenderTracked, Z),
    ie(onRenderTriggered, T),
    ie(onBeforeUnmount, L),
    ie(onUnmounted, P),
    ie(onServerPrefetch, se),
    isArray$1(oe))
  )
    if (oe.length) {
      const te = e.exposed || (e.exposed = {});
      oe.forEach((G) => {
        Object.defineProperty(te, G, {
          get: () => n[G],
          set: (ce) => (n[G] = ce),
        });
      });
    } else e.exposed || (e.exposed = {});
  W && e.render === NOOP && (e.render = W),
    H != null && (e.inheritAttrs = H),
    ye && (e.components = ye),
    ae && (e.directives = ae);
}
function resolveInjections(e, t, n = NOOP) {
  isArray$1(e) && (e = normalizeInject(e));
  for (const r in e) {
    const s = e[r];
    let o;
    isObject$1(s)
      ? "default" in s
        ? (o = inject(s.from || r, s.default, !0))
        : (o = inject(s.from || r))
      : (o = inject(s)),
      isRef(o)
        ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: (l) => (o.value = l),
          })
        : (t[r] = o);
  }
}
function callHook(e, t, n) {
  callWithAsyncErrorHandling(
    isArray$1(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function createWatcher(e, t, n, r) {
  const s = r.includes(".") ? createPathGetter(n, r) : () => n[r];
  if (isString$1(e)) {
    const o = t[e];
    isFunction$1(o) && watch(s, o);
  } else if (isFunction$1(e)) watch(s, e.bind(n));
  else if (isObject$1(e))
    if (isArray$1(e)) e.forEach((o) => createWatcher(o, t, n, r));
    else {
      const o = isFunction$1(e.handler) ? e.handler.bind(n) : t[e.handler];
      isFunction$1(o) && watch(s, o, e);
    }
}
function resolveMergedOptions(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: s,
      optionsCache: o,
      config: { optionMergeStrategies: l },
    } = e.appContext,
    u = o.get(t);
  let f;
  return (
    u
      ? (f = u)
      : !s.length && !n && !r
      ? (f = t)
      : ((f = {}),
        s.length && s.forEach((c) => mergeOptions(f, c, l, !0)),
        mergeOptions(f, t, l)),
    isObject$1(t) && o.set(t, f),
    f
  );
}
function mergeOptions(e, t, n, r = !1) {
  const { mixins: s, extends: o } = t;
  o && mergeOptions(e, o, n, !0),
    s && s.forEach((l) => mergeOptions(e, l, n, !0));
  for (const l in t)
    if (!(r && l === "expose")) {
      const u = internalOptionMergeStrats[l] || (n && n[l]);
      e[l] = u ? u(e[l], t[l]) : t[l];
    }
  return e;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  watch: mergeWatchOptions,
  provide: mergeDataFn,
  inject: mergeInject,
};
function mergeDataFn(e, t) {
  return t
    ? e
      ? function () {
          return extend$1(
            isFunction$1(e) ? e.call(this, this) : e,
            isFunction$1(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function mergeInject(e, t) {
  return mergeObjectOptions(normalizeInject(e), normalizeInject(t));
}
function normalizeInject(e) {
  if (isArray$1(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function mergeAsArray(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function mergeObjectOptions(e, t) {
  return e ? extend$1(Object.create(null), e, t) : t;
}
function mergeEmitsOrPropsOptions(e, t) {
  return e
    ? isArray$1(e) && isArray$1(t)
      ? [...new Set([...e, ...t])]
      : extend$1(
          Object.create(null),
          normalizePropsOrEmits(e),
          normalizePropsOrEmits(t ?? {})
        )
    : t;
}
function mergeWatchOptions(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = extend$1(Object.create(null), e);
  for (const r in t) n[r] = mergeAsArray(e[r], t[r]);
  return n;
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let uid$1 = 0;
function createAppAPI(e, t) {
  return function (r, s = null) {
    isFunction$1(r) || (r = extend$1({}, r)),
      s != null && !isObject$1(s) && (s = null);
    const o = createAppContext(),
      l = new Set();
    let u = !1;
    const f = (o.app = {
      _uid: uid$1++,
      _component: r,
      _props: s,
      _container: null,
      _context: o,
      _instance: null,
      version,
      get config() {
        return o.config;
      },
      set config(c) {},
      use(c, ...h) {
        return (
          l.has(c) ||
            (c && isFunction$1(c.install)
              ? (l.add(c), c.install(f, ...h))
              : isFunction$1(c) && (l.add(c), c(f, ...h))),
          f
        );
      },
      mixin(c) {
        return o.mixins.includes(c) || o.mixins.push(c), f;
      },
      component(c, h) {
        return h ? ((o.components[c] = h), f) : o.components[c];
      },
      directive(c, h) {
        return h ? ((o.directives[c] = h), f) : o.directives[c];
      },
      mount(c, h, v) {
        if (!u) {
          const x = createVNode(r, s);
          return (
            (x.appContext = o),
            h && t ? t(x, c) : e(x, c, v),
            (u = !0),
            (f._container = c),
            (c.__vue_app__ = f),
            getExposeProxy(x.component) || x.component.proxy
          );
        }
      },
      unmount() {
        u && (e(null, f._container), delete f._container.__vue_app__);
      },
      provide(c, h) {
        return (o.provides[c] = h), f;
      },
      runWithContext(c) {
        currentApp = f;
        try {
          return c();
        } finally {
          currentApp = null;
        }
      },
    });
    return f;
  };
}
let currentApp = null;
function provide(e, t) {
  if (currentInstance) {
    let n = currentInstance.provides;
    const r = currentInstance.parent && currentInstance.parent.provides;
    r === n && (n = currentInstance.provides = Object.create(r)), (n[e] = t);
  }
}
function inject(e, t, n = !1) {
  const r = currentInstance || currentRenderingInstance;
  if (r || currentApp) {
    const s = r
      ? r.parent == null
        ? r.vnode.appContext && r.vnode.appContext.provides
        : r.parent.provides
      : currentApp._context.provides;
    if (s && e in s) return s[e];
    if (arguments.length > 1)
      return n && isFunction$1(t) ? t.call(r && r.proxy) : t;
  }
}
function initProps(e, t, n, r = !1) {
  const s = {},
    o = {};
  def(o, InternalObjectKey, 1),
    (e.propsDefaults = Object.create(null)),
    setFullProps(e, t, s, o);
  for (const l in e.propsOptions[0]) l in s || (s[l] = void 0);
  n
    ? (e.props = r ? s : shallowReactive(s))
    : e.type.props
    ? (e.props = s)
    : (e.props = o),
    (e.attrs = o);
}
function updateProps(e, t, n, r) {
  const {
      props: s,
      attrs: o,
      vnode: { patchFlag: l },
    } = e,
    u = toRaw(s),
    [f] = e.propsOptions;
  let c = !1;
  if ((r || l > 0) && !(l & 16)) {
    if (l & 8) {
      const h = e.vnode.dynamicProps;
      for (let v = 0; v < h.length; v++) {
        let x = h[v];
        if (isEmitListener(e.emitsOptions, x)) continue;
        const R = t[x];
        if (f)
          if (hasOwn(o, x)) R !== o[x] && ((o[x] = R), (c = !0));
          else {
            const g = camelize(x);
            s[g] = resolvePropValue(f, u, g, R, e, !1);
          }
        else R !== o[x] && ((o[x] = R), (c = !0));
      }
    }
  } else {
    setFullProps(e, t, s, o) && (c = !0);
    let h;
    for (const v in u)
      (!t || (!hasOwn(t, v) && ((h = hyphenate(v)) === v || !hasOwn(t, h)))) &&
        (f
          ? n &&
            (n[v] !== void 0 || n[h] !== void 0) &&
            (s[v] = resolvePropValue(f, u, v, void 0, e, !0))
          : delete s[v]);
    if (o !== u)
      for (const v in o) (!t || !hasOwn(t, v)) && (delete o[v], (c = !0));
  }
  c && trigger(e, "set", "$attrs");
}
function setFullProps(e, t, n, r) {
  const [s, o] = e.propsOptions;
  let l = !1,
    u;
  if (t)
    for (let f in t) {
      if (isReservedProp(f)) continue;
      const c = t[f];
      let h;
      s && hasOwn(s, (h = camelize(f)))
        ? !o || !o.includes(h)
          ? (n[h] = c)
          : ((u || (u = {}))[h] = c)
        : isEmitListener(e.emitsOptions, f) ||
          ((!(f in r) || c !== r[f]) && ((r[f] = c), (l = !0)));
    }
  if (o) {
    const f = toRaw(n),
      c = u || EMPTY_OBJ;
    for (let h = 0; h < o.length; h++) {
      const v = o[h];
      n[v] = resolvePropValue(s, f, v, c[v], e, !hasOwn(c, v));
    }
  }
  return l;
}
function resolvePropValue(e, t, n, r, s, o) {
  const l = e[n];
  if (l != null) {
    const u = hasOwn(l, "default");
    if (u && r === void 0) {
      const f = l.default;
      if (l.type !== Function && !l.skipFactory && isFunction$1(f)) {
        const { propsDefaults: c } = s;
        n in c
          ? (r = c[n])
          : (setCurrentInstance(s),
            (r = c[n] = f.call(null, t)),
            unsetCurrentInstance());
      } else r = f;
    }
    l[0] &&
      (o && !u
        ? (r = !1)
        : l[1] && (r === "" || r === hyphenate(n)) && (r = !0));
  }
  return r;
}
function normalizePropsOptions(e, t, n = !1) {
  const r = t.propsCache,
    s = r.get(e);
  if (s) return s;
  const o = e.props,
    l = {},
    u = [];
  let f = !1;
  if (!isFunction$1(e)) {
    const h = (v) => {
      f = !0;
      const [x, R] = normalizePropsOptions(v, t, !0);
      extend$1(l, x), R && u.push(...R);
    };
    !n && t.mixins.length && t.mixins.forEach(h),
      e.extends && h(e.extends),
      e.mixins && e.mixins.forEach(h);
  }
  if (!o && !f) return isObject$1(e) && r.set(e, EMPTY_ARR), EMPTY_ARR;
  if (isArray$1(o))
    for (let h = 0; h < o.length; h++) {
      const v = camelize(o[h]);
      validatePropName(v) && (l[v] = EMPTY_OBJ);
    }
  else if (o)
    for (const h in o) {
      const v = camelize(h);
      if (validatePropName(v)) {
        const x = o[h],
          R = (l[v] =
            isArray$1(x) || isFunction$1(x) ? { type: x } : extend$1({}, x));
        if (R) {
          const g = getTypeIndex(Boolean, R.type),
            y = getTypeIndex(String, R.type);
          (R[0] = g > -1),
            (R[1] = y < 0 || g < y),
            (g > -1 || hasOwn(R, "default")) && u.push(v);
        }
      }
    }
  const c = [l, u];
  return isObject$1(e) && r.set(e, c), c;
}
function validatePropName(e) {
  return e[0] !== "$";
}
function getType(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function isSameType(e, t) {
  return getType(e) === getType(t);
}
function getTypeIndex(e, t) {
  return isArray$1(t)
    ? t.findIndex((n) => isSameType(n, e))
    : isFunction$1(t) && isSameType(t, e)
    ? 0
    : -1;
}
const isInternalKey = (e) => e[0] === "_" || e === "$stable",
  normalizeSlotValue = (e) =>
    isArray$1(e) ? e.map(normalizeVNode) : [normalizeVNode(e)],
  normalizeSlot = (e, t, n) => {
    if (t._n) return t;
    const r = withCtx((...s) => normalizeSlotValue(t(...s)), n);
    return (r._c = !1), r;
  },
  normalizeObjectSlots = (e, t, n) => {
    const r = e._ctx;
    for (const s in e) {
      if (isInternalKey(s)) continue;
      const o = e[s];
      if (isFunction$1(o)) t[s] = normalizeSlot(s, o, r);
      else if (o != null) {
        const l = normalizeSlotValue(o);
        t[s] = () => l;
      }
    }
  },
  normalizeVNodeSlots = (e, t) => {
    const n = normalizeSlotValue(t);
    e.slots.default = () => n;
  },
  initSlots = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n
        ? ((e.slots = toRaw(t)), def(t, "_", n))
        : normalizeObjectSlots(t, (e.slots = {}));
    } else (e.slots = {}), t && normalizeVNodeSlots(e, t);
    def(e.slots, InternalObjectKey, 1);
  },
  updateSlots = (e, t, n) => {
    const { vnode: r, slots: s } = e;
    let o = !0,
      l = EMPTY_OBJ;
    if (r.shapeFlag & 32) {
      const u = t._;
      u
        ? n && u === 1
          ? (o = !1)
          : (extend$1(s, t), !n && u === 1 && delete s._)
        : ((o = !t.$stable), normalizeObjectSlots(t, s)),
        (l = t);
    } else t && (normalizeVNodeSlots(e, t), (l = { default: 1 }));
    if (o) for (const u in s) !isInternalKey(u) && !(u in l) && delete s[u];
  };
function setRef(e, t, n, r, s = !1) {
  if (isArray$1(e)) {
    e.forEach((x, R) => setRef(x, t && (isArray$1(t) ? t[R] : t), n, r, s));
    return;
  }
  if (isAsyncWrapper(r) && !s) return;
  const o =
      r.shapeFlag & 4 ? getExposeProxy(r.component) || r.component.proxy : r.el,
    l = s ? null : o,
    { i: u, r: f } = e,
    c = t && t.r,
    h = u.refs === EMPTY_OBJ ? (u.refs = {}) : u.refs,
    v = u.setupState;
  if (
    (c != null &&
      c !== f &&
      (isString$1(c)
        ? ((h[c] = null), hasOwn(v, c) && (v[c] = null))
        : isRef(c) && (c.value = null)),
    isFunction$1(f))
  )
    callWithErrorHandling(f, u, 12, [l, h]);
  else {
    const x = isString$1(f),
      R = isRef(f);
    if (x || R) {
      const g = () => {
        if (e.f) {
          const y = x ? (hasOwn(v, f) ? v[f] : h[f]) : f.value;
          s
            ? isArray$1(y) && remove(y, o)
            : isArray$1(y)
            ? y.includes(o) || y.push(o)
            : x
            ? ((h[f] = [o]), hasOwn(v, f) && (v[f] = h[f]))
            : ((f.value = [o]), e.k && (h[e.k] = f.value));
        } else
          x
            ? ((h[f] = l), hasOwn(v, f) && (v[f] = l))
            : R && ((f.value = l), e.k && (h[e.k] = l));
      };
      l ? ((g.id = -1), queuePostRenderEffect(g, n)) : g();
    }
  }
}
const queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(e) {
  return baseCreateRenderer(e);
}
function baseCreateRenderer(e, t) {
  const n = getGlobalThis();
  n.__VUE__ = !0;
  const {
      insert: r,
      remove: s,
      patchProp: o,
      createElement: l,
      createText: u,
      createComment: f,
      setText: c,
      setElementText: h,
      parentNode: v,
      nextSibling: x,
      setScopeId: R = NOOP,
      insertStaticContent: g,
    } = e,
    y = (
      b,
      E,
      w,
      S = null,
      _ = null,
      F = null,
      $ = !1,
      k = null,
      M = !!E.dynamicChildren
    ) => {
      if (b === E) return;
      b && !isSameVNodeType(b, E) && ((S = we(b)), he(b, _, F, !0), (b = null)),
        E.patchFlag === -2 && ((M = !1), (E.dynamicChildren = null));
      const { type: I, ref: U, shapeFlag: B } = E;
      switch (I) {
        case Text:
          A(b, E, w, S);
          break;
        case Comment:
          O(b, E, w, S);
          break;
        case Static:
          b == null && L(E, w, S, $);
          break;
        case Fragment:
          ye(b, E, w, S, _, F, $, k, M);
          break;
        default:
          B & 1
            ? W(b, E, w, S, _, F, $, k, M)
            : B & 6
            ? ae(b, E, w, S, _, F, $, k, M)
            : (B & 64 || B & 128) && I.process(b, E, w, S, _, F, $, k, M, xe);
      }
      U != null && _ && setRef(U, b && b.ref, F, E || b, !E);
    },
    A = (b, E, w, S) => {
      if (b == null) r((E.el = u(E.children)), w, S);
      else {
        const _ = (E.el = b.el);
        E.children !== b.children && c(_, E.children);
      }
    },
    O = (b, E, w, S) => {
      b == null ? r((E.el = f(E.children || "")), w, S) : (E.el = b.el);
    },
    L = (b, E, w, S) => {
      [b.el, b.anchor] = g(b.children, E, w, S, b.el, b.anchor);
    },
    K = ({ el: b, anchor: E }, w, S) => {
      let _;
      for (; b && b !== E; ) (_ = x(b)), r(b, w, S), (b = _);
      r(E, w, S);
    },
    P = ({ el: b, anchor: E }) => {
      let w;
      for (; b && b !== E; ) (w = x(b)), s(b), (b = w);
      s(E);
    },
    W = (b, E, w, S, _, F, $, k, M) => {
      ($ = $ || E.type === "svg"),
        b == null ? Z(E, w, S, _, F, $, k, M) : se(b, E, _, F, $, k, M);
    },
    Z = (b, E, w, S, _, F, $, k) => {
      let M, I;
      const { type: U, props: B, shapeFlag: q, transition: V, dirs: J } = b;
      if (
        ((M = b.el = l(b.type, F, B && B.is, B)),
        q & 8
          ? h(M, b.children)
          : q & 16 &&
            Y(b.children, M, null, S, _, F && U !== "foreignObject", $, k),
        J && invokeDirectiveHook(b, null, S, "created"),
        T(M, b, b.scopeId, $, S),
        B)
      ) {
        for (const Q in B)
          Q !== "value" &&
            !isReservedProp(Q) &&
            o(M, Q, null, B[Q], F, b.children, S, _, pe);
        "value" in B && o(M, "value", null, B.value),
          (I = B.onVnodeBeforeMount) && invokeVNodeHook(I, S, b);
      }
      J && invokeDirectiveHook(b, null, S, "beforeMount");
      const ee = (!_ || (_ && !_.pendingBranch)) && V && !V.persisted;
      ee && V.beforeEnter(M),
        r(M, E, w),
        ((I = B && B.onVnodeMounted) || ee || J) &&
          queuePostRenderEffect(() => {
            I && invokeVNodeHook(I, S, b),
              ee && V.enter(M),
              J && invokeDirectiveHook(b, null, S, "mounted");
          }, _);
    },
    T = (b, E, w, S, _) => {
      if ((w && R(b, w), S)) for (let F = 0; F < S.length; F++) R(b, S[F]);
      if (_) {
        let F = _.subTree;
        if (E === F) {
          const $ = _.vnode;
          T(b, $, $.scopeId, $.slotScopeIds, _.parent);
        }
      }
    },
    Y = (b, E, w, S, _, F, $, k, M = 0) => {
      for (let I = M; I < b.length; I++) {
        const U = (b[I] = k ? cloneIfMounted(b[I]) : normalizeVNode(b[I]));
        y(null, U, E, w, S, _, F, $, k);
      }
    },
    se = (b, E, w, S, _, F, $) => {
      const k = (E.el = b.el);
      let { patchFlag: M, dynamicChildren: I, dirs: U } = E;
      M |= b.patchFlag & 16;
      const B = b.props || EMPTY_OBJ,
        q = E.props || EMPTY_OBJ;
      let V;
      w && toggleRecurse(w, !1),
        (V = q.onVnodeBeforeUpdate) && invokeVNodeHook(V, w, E, b),
        U && invokeDirectiveHook(E, b, w, "beforeUpdate"),
        w && toggleRecurse(w, !0);
      const J = _ && E.type !== "foreignObject";
      if (
        (I
          ? oe(b.dynamicChildren, I, k, w, S, J, F)
          : $ || G(b, E, k, null, w, S, J, F, !1),
        M > 0)
      ) {
        if (M & 16) H(k, E, B, q, w, S, _);
        else if (
          (M & 2 && B.class !== q.class && o(k, "class", null, q.class, _),
          M & 4 && o(k, "style", B.style, q.style, _),
          M & 8)
        ) {
          const ee = E.dynamicProps;
          for (let Q = 0; Q < ee.length; Q++) {
            const ne = ee[Q],
              fe = B[ne],
              ge = q[ne];
            (ge !== fe || ne === "value") &&
              o(k, ne, fe, ge, _, b.children, w, S, pe);
          }
        }
        M & 1 && b.children !== E.children && h(k, E.children);
      } else !$ && I == null && H(k, E, B, q, w, S, _);
      ((V = q.onVnodeUpdated) || U) &&
        queuePostRenderEffect(() => {
          V && invokeVNodeHook(V, w, E, b),
            U && invokeDirectiveHook(E, b, w, "updated");
        }, S);
    },
    oe = (b, E, w, S, _, F, $) => {
      for (let k = 0; k < E.length; k++) {
        const M = b[k],
          I = E[k],
          U =
            M.el &&
            (M.type === Fragment || !isSameVNodeType(M, I) || M.shapeFlag & 70)
              ? v(M.el)
              : w;
        y(M, I, U, null, S, _, F, $, !0);
      }
    },
    H = (b, E, w, S, _, F, $) => {
      if (w !== S) {
        if (w !== EMPTY_OBJ)
          for (const k in w)
            !isReservedProp(k) &&
              !(k in S) &&
              o(b, k, w[k], null, $, E.children, _, F, pe);
        for (const k in S) {
          if (isReservedProp(k)) continue;
          const M = S[k],
            I = w[k];
          M !== I && k !== "value" && o(b, k, I, M, $, E.children, _, F, pe);
        }
        "value" in S && o(b, "value", w.value, S.value);
      }
    },
    ye = (b, E, w, S, _, F, $, k, M) => {
      const I = (E.el = b ? b.el : u("")),
        U = (E.anchor = b ? b.anchor : u(""));
      let { patchFlag: B, dynamicChildren: q, slotScopeIds: V } = E;
      V && (k = k ? k.concat(V) : V),
        b == null
          ? (r(I, w, S), r(U, w, S), Y(E.children, w, U, _, F, $, k, M))
          : B > 0 && B & 64 && q && b.dynamicChildren
          ? (oe(b.dynamicChildren, q, w, _, F, $, k),
            (E.key != null || (_ && E === _.subTree)) &&
              traverseStaticChildren(b, E, !0))
          : G(b, E, w, U, _, F, $, k, M);
    },
    ae = (b, E, w, S, _, F, $, k, M) => {
      (E.slotScopeIds = k),
        b == null
          ? E.shapeFlag & 512
            ? _.ctx.activate(E, w, S, $, M)
            : ve(E, w, S, _, F, $, M)
          : be(b, E, M);
    },
    ve = (b, E, w, S, _, F, $) => {
      const k = (b.component = createComponentInstance(b, S, _));
      if (
        (isKeepAlive(b) && (k.ctx.renderer = xe), setupComponent(k), k.asyncDep)
      ) {
        if ((_ && _.registerDep(k, ie), !b.el)) {
          const M = (k.subTree = createVNode(Comment));
          O(null, M, E, w);
        }
        return;
      }
      ie(k, b, E, w, _, F, $);
    },
    be = (b, E, w) => {
      const S = (E.component = b.component);
      if (shouldUpdateComponent(b, E, w))
        if (S.asyncDep && !S.asyncResolved) {
          te(S, E, w);
          return;
        } else (S.next = E), invalidateJob(S.update), S.update();
      else (E.el = b.el), (S.vnode = E);
    },
    ie = (b, E, w, S, _, F, $) => {
      const k = () => {
          if (b.isMounted) {
            let { next: U, bu: B, u: q, parent: V, vnode: J } = b,
              ee = U,
              Q;
            toggleRecurse(b, !1),
              U ? ((U.el = J.el), te(b, U, $)) : (U = J),
              B && invokeArrayFns(B),
              (Q = U.props && U.props.onVnodeBeforeUpdate) &&
                invokeVNodeHook(Q, V, U, J),
              toggleRecurse(b, !0);
            const ne = renderComponentRoot(b),
              fe = b.subTree;
            (b.subTree = ne),
              y(fe, ne, v(fe.el), we(fe), b, _, F),
              (U.el = ne.el),
              ee === null && updateHOCHostEl(b, ne.el),
              q && queuePostRenderEffect(q, _),
              (Q = U.props && U.props.onVnodeUpdated) &&
                queuePostRenderEffect(() => invokeVNodeHook(Q, V, U, J), _);
          } else {
            let U;
            const { el: B, props: q } = E,
              { bm: V, m: J, parent: ee } = b,
              Q = isAsyncWrapper(E);
            if (
              (toggleRecurse(b, !1),
              V && invokeArrayFns(V),
              !Q &&
                (U = q && q.onVnodeBeforeMount) &&
                invokeVNodeHook(U, ee, E),
              toggleRecurse(b, !0),
              B && _e)
            ) {
              const ne = () => {
                (b.subTree = renderComponentRoot(b)),
                  _e(B, b.subTree, b, _, null);
              };
              Q
                ? E.type.__asyncLoader().then(() => !b.isUnmounted && ne())
                : ne();
            } else {
              const ne = (b.subTree = renderComponentRoot(b));
              y(null, ne, w, S, b, _, F), (E.el = ne.el);
            }
            if (
              (J && queuePostRenderEffect(J, _),
              !Q && (U = q && q.onVnodeMounted))
            ) {
              const ne = E;
              queuePostRenderEffect(() => invokeVNodeHook(U, ee, ne), _);
            }
            (E.shapeFlag & 256 ||
              (ee && isAsyncWrapper(ee.vnode) && ee.vnode.shapeFlag & 256)) &&
              b.a &&
              queuePostRenderEffect(b.a, _),
              (b.isMounted = !0),
              (E = w = S = null);
          }
        },
        M = (b.effect = new ReactiveEffect(k, () => queueJob(I), b.scope)),
        I = (b.update = () => M.run());
      (I.id = b.uid), toggleRecurse(b, !0), I();
    },
    te = (b, E, w) => {
      E.component = b;
      const S = b.vnode.props;
      (b.vnode = E),
        (b.next = null),
        updateProps(b, E.props, S, w),
        updateSlots(b, E.children, w),
        pauseTracking(),
        flushPreFlushCbs(),
        resetTracking();
    },
    G = (b, E, w, S, _, F, $, k, M = !1) => {
      const I = b && b.children,
        U = b ? b.shapeFlag : 0,
        B = E.children,
        { patchFlag: q, shapeFlag: V } = E;
      if (q > 0) {
        if (q & 128) {
          le(I, B, w, S, _, F, $, k, M);
          return;
        } else if (q & 256) {
          ce(I, B, w, S, _, F, $, k, M);
          return;
        }
      }
      V & 8
        ? (U & 16 && pe(I, _, F), B !== I && h(w, B))
        : U & 16
        ? V & 16
          ? le(I, B, w, S, _, F, $, k, M)
          : pe(I, _, F, !0)
        : (U & 8 && h(w, ""), V & 16 && Y(B, w, S, _, F, $, k, M));
    },
    ce = (b, E, w, S, _, F, $, k, M) => {
      (b = b || EMPTY_ARR), (E = E || EMPTY_ARR);
      const I = b.length,
        U = E.length,
        B = Math.min(I, U);
      let q;
      for (q = 0; q < B; q++) {
        const V = (E[q] = M ? cloneIfMounted(E[q]) : normalizeVNode(E[q]));
        y(b[q], V, w, null, _, F, $, k, M);
      }
      I > U ? pe(b, _, F, !0, !1, B) : Y(E, w, S, _, F, $, k, M, B);
    },
    le = (b, E, w, S, _, F, $, k, M) => {
      let I = 0;
      const U = E.length;
      let B = b.length - 1,
        q = U - 1;
      for (; I <= B && I <= q; ) {
        const V = b[I],
          J = (E[I] = M ? cloneIfMounted(E[I]) : normalizeVNode(E[I]));
        if (isSameVNodeType(V, J)) y(V, J, w, null, _, F, $, k, M);
        else break;
        I++;
      }
      for (; I <= B && I <= q; ) {
        const V = b[B],
          J = (E[q] = M ? cloneIfMounted(E[q]) : normalizeVNode(E[q]));
        if (isSameVNodeType(V, J)) y(V, J, w, null, _, F, $, k, M);
        else break;
        B--, q--;
      }
      if (I > B) {
        if (I <= q) {
          const V = q + 1,
            J = V < U ? E[V].el : S;
          for (; I <= q; )
            y(
              null,
              (E[I] = M ? cloneIfMounted(E[I]) : normalizeVNode(E[I])),
              w,
              J,
              _,
              F,
              $,
              k,
              M
            ),
              I++;
        }
      } else if (I > q) for (; I <= B; ) he(b[I], _, F, !0), I++;
      else {
        const V = I,
          J = I,
          ee = new Map();
        for (I = J; I <= q; I++) {
          const ue = (E[I] = M ? cloneIfMounted(E[I]) : normalizeVNode(E[I]));
          ue.key != null && ee.set(ue.key, I);
        }
        let Q,
          ne = 0;
        const fe = q - J + 1;
        let ge = !1,
          Te = 0;
        const Ee = new Array(fe);
        for (I = 0; I < fe; I++) Ee[I] = 0;
        for (I = V; I <= B; I++) {
          const ue = b[I];
          if (ne >= fe) {
            he(ue, _, F, !0);
            continue;
          }
          let de;
          if (ue.key != null) de = ee.get(ue.key);
          else
            for (Q = J; Q <= q; Q++)
              if (Ee[Q - J] === 0 && isSameVNodeType(ue, E[Q])) {
                de = Q;
                break;
              }
          de === void 0
            ? he(ue, _, F, !0)
            : ((Ee[de - J] = I + 1),
              de >= Te ? (Te = de) : (ge = !0),
              y(ue, E[de], w, null, _, F, $, k, M),
              ne++);
        }
        const Se = ge ? getSequence(Ee) : EMPTY_ARR;
        for (Q = Se.length - 1, I = fe - 1; I >= 0; I--) {
          const ue = J + I,
            de = E[ue],
            Pe = ue + 1 < U ? E[ue + 1].el : S;
          Ee[I] === 0
            ? y(null, de, w, Pe, _, F, $, k, M)
            : ge && (Q < 0 || I !== Se[Q] ? me(de, w, Pe, 2) : Q--);
        }
      }
    },
    me = (b, E, w, S, _ = null) => {
      const { el: F, type: $, transition: k, children: M, shapeFlag: I } = b;
      if (I & 6) {
        me(b.component.subTree, E, w, S);
        return;
      }
      if (I & 128) {
        b.suspense.move(E, w, S);
        return;
      }
      if (I & 64) {
        $.move(b, E, w, xe);
        return;
      }
      if ($ === Fragment) {
        r(F, E, w);
        for (let B = 0; B < M.length; B++) me(M[B], E, w, S);
        r(b.anchor, E, w);
        return;
      }
      if ($ === Static) {
        K(b, E, w);
        return;
      }
      if (S !== 2 && I & 1 && k)
        if (S === 0)
          k.beforeEnter(F),
            r(F, E, w),
            queuePostRenderEffect(() => k.enter(F), _);
        else {
          const { leave: B, delayLeave: q, afterLeave: V } = k,
            J = () => r(F, E, w),
            ee = () => {
              B(F, () => {
                J(), V && V();
              });
            };
          q ? q(F, J, ee) : ee();
        }
      else r(F, E, w);
    },
    he = (b, E, w, S = !1, _ = !1) => {
      const {
        type: F,
        props: $,
        ref: k,
        children: M,
        dynamicChildren: I,
        shapeFlag: U,
        patchFlag: B,
        dirs: q,
      } = b;
      if ((k != null && setRef(k, null, w, b, !0), U & 256)) {
        E.ctx.deactivate(b);
        return;
      }
      const V = U & 1 && q,
        J = !isAsyncWrapper(b);
      let ee;
      if (
        (J && (ee = $ && $.onVnodeBeforeUnmount) && invokeVNodeHook(ee, E, b),
        U & 6)
      )
        Ue(b.component, w, S);
      else {
        if (U & 128) {
          b.suspense.unmount(w, S);
          return;
        }
        V && invokeDirectiveHook(b, null, E, "beforeUnmount"),
          U & 64
            ? b.type.remove(b, E, w, _, xe, S)
            : I && (F !== Fragment || (B > 0 && B & 64))
            ? pe(I, E, w, !1, !0)
            : ((F === Fragment && B & 384) || (!_ && U & 16)) && pe(M, E, w),
          S && Fe(b);
      }
      ((J && (ee = $ && $.onVnodeUnmounted)) || V) &&
        queuePostRenderEffect(() => {
          ee && invokeVNodeHook(ee, E, b),
            V && invokeDirectiveHook(b, null, E, "unmounted");
        }, w);
    },
    Fe = (b) => {
      const { type: E, el: w, anchor: S, transition: _ } = b;
      if (E === Fragment) {
        je(w, S);
        return;
      }
      if (E === Static) {
        P(b);
        return;
      }
      const F = () => {
        s(w), _ && !_.persisted && _.afterLeave && _.afterLeave();
      };
      if (b.shapeFlag & 1 && _ && !_.persisted) {
        const { leave: $, delayLeave: k } = _,
          M = () => $(w, F);
        k ? k(b.el, F, M) : M();
      } else F();
    },
    je = (b, E) => {
      let w;
      for (; b !== E; ) (w = x(b)), s(b), (b = w);
      s(E);
    },
    Ue = (b, E, w) => {
      const { bum: S, scope: _, update: F, subTree: $, um: k } = b;
      S && invokeArrayFns(S),
        _.stop(),
        F && ((F.active = !1), he($, b, E, w)),
        k && queuePostRenderEffect(k, E),
        queuePostRenderEffect(() => {
          b.isUnmounted = !0;
        }, E),
        E &&
          E.pendingBranch &&
          !E.isUnmounted &&
          b.asyncDep &&
          !b.asyncResolved &&
          b.suspenseId === E.pendingId &&
          (E.deps--, E.deps === 0 && E.resolve());
    },
    pe = (b, E, w, S = !1, _ = !1, F = 0) => {
      for (let $ = F; $ < b.length; $++) he(b[$], E, w, S, _);
    },
    we = (b) =>
      b.shapeFlag & 6
        ? we(b.component.subTree)
        : b.shapeFlag & 128
        ? b.suspense.next()
        : x(b.anchor || b.el),
    Ae = (b, E, w) => {
      b == null
        ? E._vnode && he(E._vnode, null, null, !0)
        : y(E._vnode || null, b, E, null, null, null, w),
        flushPreFlushCbs(),
        flushPostFlushCbs(),
        (E._vnode = b);
    },
    xe = {
      p: y,
      um: he,
      m: me,
      r: Fe,
      mt: ve,
      mc: Y,
      pc: G,
      pbc: oe,
      n: we,
      o: e,
    };
  let Oe, _e;
  return (
    t && ([Oe, _e] = t(xe)),
    { render: Ae, hydrate: Oe, createApp: createAppAPI(Ae, Oe) }
  );
}
function toggleRecurse({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function traverseStaticChildren(e, t, n = !1) {
  const r = e.children,
    s = t.children;
  if (isArray$1(r) && isArray$1(s))
    for (let o = 0; o < r.length; o++) {
      const l = r[o];
      let u = s[o];
      u.shapeFlag & 1 &&
        !u.dynamicChildren &&
        ((u.patchFlag <= 0 || u.patchFlag === 32) &&
          ((u = s[o] = cloneIfMounted(s[o])), (u.el = l.el)),
        n || traverseStaticChildren(l, u)),
        u.type === Text && (u.el = l.el);
    }
}
function getSequence(e) {
  const t = e.slice(),
    n = [0];
  let r, s, o, l, u;
  const f = e.length;
  for (r = 0; r < f; r++) {
    const c = e[r];
    if (c !== 0) {
      if (((s = n[n.length - 1]), e[s] < c)) {
        (t[r] = s), n.push(r);
        continue;
      }
      for (o = 0, l = n.length - 1; o < l; )
        (u = (o + l) >> 1), e[n[u]] < c ? (o = u + 1) : (l = u);
      c < e[n[o]] && (o > 0 && (t[r] = n[o - 1]), (n[o] = r));
    }
  }
  for (o = n.length, l = n[o - 1]; o-- > 0; ) (n[o] = l), (l = t[l]);
  return n;
}
const isTeleport = (e) => e.__isTeleport,
  Fragment = Symbol.for("v-fgt"),
  Text = Symbol.for("v-txt"),
  Comment = Symbol.for("v-cmt"),
  Static = Symbol.for("v-stc"),
  blockStack = [];
let currentBlock = null;
function openBlock(e = !1) {
  blockStack.push((currentBlock = e ? null : []));
}
function closeBlock() {
  blockStack.pop(), (currentBlock = blockStack[blockStack.length - 1] || null);
}
let isBlockTreeEnabled = 1;
function setBlockTracking(e) {
  isBlockTreeEnabled += e;
}
function setupBlock(e) {
  return (
    (e.dynamicChildren =
      isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null),
    closeBlock(),
    isBlockTreeEnabled > 0 && currentBlock && currentBlock.push(e),
    e
  );
}
function createElementBlock(e, t, n, r, s, o) {
  return setupBlock(createBaseVNode(e, t, n, r, s, o, !0));
}
function isVNode(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function isSameVNodeType(e, t) {
  return e.type === t.type && e.key === t.key;
}
const InternalObjectKey = "__vInternal",
  normalizeKey = ({ key: e }) => e ?? null,
  normalizeRef = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? isString$1(e) || isRef(e) || isFunction$1(e)
        ? { i: currentRenderingInstance, r: e, k: t, f: !!n }
        : e
      : null
  );
function createBaseVNode(
  e,
  t = null,
  n = null,
  r = 0,
  s = null,
  o = e === Fragment ? 0 : 1,
  l = !1,
  u = !1
) {
  const f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && normalizeKey(t),
    ref: t && normalizeRef(t),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance,
  };
  return (
    u
      ? (normalizeChildren(f, n), o & 128 && e.normalize(f))
      : n && (f.shapeFlag |= isString$1(n) ? 8 : 16),
    isBlockTreeEnabled > 0 &&
      !l &&
      currentBlock &&
      (f.patchFlag > 0 || o & 6) &&
      f.patchFlag !== 32 &&
      currentBlock.push(f),
    f
  );
}
const createVNode = _createVNode;
function _createVNode(e, t = null, n = null, r = 0, s = null, o = !1) {
  if (((!e || e === NULL_DYNAMIC_COMPONENT) && (e = Comment), isVNode(e))) {
    const u = cloneVNode(e, t, !0);
    return (
      n && normalizeChildren(u, n),
      isBlockTreeEnabled > 0 &&
        !o &&
        currentBlock &&
        (u.shapeFlag & 6
          ? (currentBlock[currentBlock.indexOf(e)] = u)
          : currentBlock.push(u)),
      (u.patchFlag |= -2),
      u
    );
  }
  if ((isClassComponent(e) && (e = e.__vccOpts), t)) {
    t = guardReactiveProps(t);
    let { class: u, style: f } = t;
    u && !isString$1(u) && (t.class = normalizeClass(u)),
      isObject$1(f) &&
        (isProxy(f) && !isArray$1(f) && (f = extend$1({}, f)),
        (t.style = normalizeStyle(f)));
  }
  const l = isString$1(e)
    ? 1
    : isSuspense(e)
    ? 128
    : isTeleport(e)
    ? 64
    : isObject$1(e)
    ? 4
    : isFunction$1(e)
    ? 2
    : 0;
  return createBaseVNode(e, t, n, r, s, l, o, !0);
}
function guardReactiveProps(e) {
  return e
    ? isProxy(e) || InternalObjectKey in e
      ? extend$1({}, e)
      : e
    : null;
}
function cloneVNode(e, t, n = !1) {
  const { props: r, ref: s, patchFlag: o, children: l } = e,
    u = t ? mergeProps(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: u,
    key: u && normalizeKey(u),
    ref:
      t && t.ref
        ? n && s
          ? isArray$1(s)
            ? s.concat(normalizeRef(t))
            : [s, normalizeRef(t)]
          : normalizeRef(t)
        : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: l,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Fragment ? (o === -1 ? 16 : o | 16) : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && cloneVNode(e.ssContent),
    ssFallback: e.ssFallback && cloneVNode(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  };
}
function createTextVNode(e = " ", t = 0) {
  return createVNode(Text, null, e, t);
}
function normalizeVNode(e) {
  return e == null || typeof e == "boolean"
    ? createVNode(Comment)
    : isArray$1(e)
    ? createVNode(Fragment, null, e.slice())
    : typeof e == "object"
    ? cloneIfMounted(e)
    : createVNode(Text, null, String(e));
}
function cloneIfMounted(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : cloneVNode(e);
}
function normalizeChildren(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (isArray$1(t)) n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const s = t.default;
      s &&
        (s._c && (s._d = !1), normalizeChildren(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !(InternalObjectKey in t)
        ? (t._ctx = currentRenderingInstance)
        : s === 3 &&
          currentRenderingInstance &&
          (currentRenderingInstance.slots._ === 1
            ? (t._ = 1)
            : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    isFunction$1(t)
      ? ((t = { default: t, _ctx: currentRenderingInstance }), (n = 32))
      : ((t = String(t)),
        r & 64 ? ((n = 16), (t = [createTextVNode(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function mergeProps(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const s in r)
      if (s === "class")
        t.class !== r.class && (t.class = normalizeClass([t.class, r.class]));
      else if (s === "style") t.style = normalizeStyle([t.style, r.style]);
      else if (isOn(s)) {
        const o = t[s],
          l = r[s];
        l &&
          o !== l &&
          !(isArray$1(o) && o.includes(l)) &&
          (t[s] = o ? [].concat(o, l) : l);
      } else s !== "" && (t[s] = r[s]);
  }
  return t;
}
function invokeVNodeHook(e, t, n, r = null) {
  callWithAsyncErrorHandling(e, t, 7, [n, r]);
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(e, t, n) {
  const r = e.type,
    s = (t ? t.appContext : e.appContext) || emptyAppContext,
    o = {
      uid: uid++,
      vnode: e,
      type: r,
      parent: t,
      appContext: s,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new EffectScope(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(s.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: normalizePropsOptions(r, s),
      emitsOptions: normalizeEmitsOptions(r, s),
      emit: null,
      emitted: null,
      propsDefaults: EMPTY_OBJ,
      inheritAttrs: r.inheritAttrs,
      ctx: EMPTY_OBJ,
      data: EMPTY_OBJ,
      props: EMPTY_OBJ,
      attrs: EMPTY_OBJ,
      slots: EMPTY_OBJ,
      refs: EMPTY_OBJ,
      setupState: EMPTY_OBJ,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (o.ctx = { _: o }),
    (o.root = t ? t.root : o),
    (o.emit = emit.bind(null, o)),
    e.ce && e.ce(o),
    o
  );
}
let currentInstance = null,
  internalSetCurrentInstance,
  globalCurrentInstanceSetters,
  settersKey = "__VUE_INSTANCE_SETTERS__";
(globalCurrentInstanceSetters = getGlobalThis()[settersKey]) ||
  (globalCurrentInstanceSetters = getGlobalThis()[settersKey] = []),
  globalCurrentInstanceSetters.push((e) => (currentInstance = e)),
  (internalSetCurrentInstance = (e) => {
    globalCurrentInstanceSetters.length > 1
      ? globalCurrentInstanceSetters.forEach((t) => t(e))
      : globalCurrentInstanceSetters[0](e);
  });
const setCurrentInstance = (e) => {
    internalSetCurrentInstance(e), e.scope.on();
  },
  unsetCurrentInstance = () => {
    currentInstance && currentInstance.scope.off(),
      internalSetCurrentInstance(null);
  };
function isStatefulComponent(e) {
  return e.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = !1;
function setupComponent(e, t = !1) {
  isInSSRComponentSetup = t;
  const { props: n, children: r } = e.vnode,
    s = isStatefulComponent(e);
  initProps(e, n, s, t), initSlots(e, r);
  const o = s ? setupStatefulComponent(e, t) : void 0;
  return (isInSSRComponentSetup = !1), o;
}
function setupStatefulComponent(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)),
    (e.proxy = markRaw(new Proxy(e.ctx, PublicInstanceProxyHandlers)));
  const { setup: r } = n;
  if (r) {
    const s = (e.setupContext = r.length > 1 ? createSetupContext(e) : null);
    setCurrentInstance(e), pauseTracking();
    const o = callWithErrorHandling(r, e, 0, [e.props, s]);
    if ((resetTracking(), unsetCurrentInstance(), isPromise(o))) {
      if ((o.then(unsetCurrentInstance, unsetCurrentInstance), t))
        return o
          .then((l) => {
            handleSetupResult(e, l, t);
          })
          .catch((l) => {
            handleError(l, e, 0);
          });
      e.asyncDep = o;
    } else handleSetupResult(e, o, t);
  } else finishComponentSetup(e, t);
}
function handleSetupResult(e, t, n) {
  isFunction$1(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : isObject$1(t) && (e.setupState = proxyRefs(t)),
    finishComponentSetup(e, n);
}
let compile;
function finishComponentSetup(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && compile && !r.render) {
      const s = r.template || resolveMergedOptions(e).template;
      if (s) {
        const { isCustomElement: o, compilerOptions: l } = e.appContext.config,
          { delimiters: u, compilerOptions: f } = r,
          c = extend$1(extend$1({ isCustomElement: o, delimiters: u }, l), f);
        r.render = compile(s, c);
      }
    }
    e.render = r.render || NOOP;
  }
  setCurrentInstance(e),
    pauseTracking(),
    applyOptions(e),
    resetTracking(),
    unsetCurrentInstance();
}
function getAttrsProxy(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return track(e, "get", "$attrs"), t[n];
      },
    }))
  );
}
function createSetupContext(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return getAttrsProxy(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function getExposeProxy(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(proxyRefs(markRaw(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in publicPropertiesMap) return publicPropertiesMap[n](e);
        },
        has(t, n) {
          return n in t || n in publicPropertiesMap;
        },
      }))
    );
}
function isClassComponent(e) {
  return isFunction$1(e) && "__vccOpts" in e;
}
const computed = (e, t) => computed$1(e, t, isInSSRComponentSetup),
  ssrContextKey = Symbol.for("v-scx"),
  useSSRContext = () => inject(ssrContextKey),
  version = "3.3.4",
  svgNS = "http://www.w3.org/2000/svg",
  doc = typeof document < "u" ? document : null,
  templateContainer = doc && doc.createElement("template"),
  nodeOps = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, r) => {
      const s = t
        ? doc.createElementNS(svgNS, e)
        : doc.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          r &&
          r.multiple != null &&
          s.setAttribute("multiple", r.multiple),
        s
      );
    },
    createText: (e) => doc.createTextNode(e),
    createComment: (e) => doc.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => doc.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, r, s, o) {
      const l = n ? n.previousSibling : t.lastChild;
      if (s && (s === o || s.nextSibling))
        for (
          ;
          t.insertBefore(s.cloneNode(!0), n),
            !(s === o || !(s = s.nextSibling));

        );
      else {
        templateContainer.innerHTML = r ? `<svg>${e}</svg>` : e;
        const u = templateContainer.content;
        if (r) {
          const f = u.firstChild;
          for (; f.firstChild; ) u.appendChild(f.firstChild);
          u.removeChild(f);
        }
        t.insertBefore(u, n);
      }
      return [
        l ? l.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  };
function patchClass(e, t, n) {
  const r = e._vtc;
  r && (t = (t ? [t, ...r] : [...r]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function patchStyle(e, t, n) {
  const r = e.style,
    s = isString$1(n);
  if (n && !s) {
    if (t && !isString$1(t))
      for (const o in t) n[o] == null && setStyle(r, o, "");
    for (const o in n) setStyle(r, o, n[o]);
  } else {
    const o = r.display;
    s ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"),
      "_vod" in e && (r.display = o);
  }
}
const importantRE = /\s*!important$/;
function setStyle(e, t, n) {
  if (isArray$1(n)) n.forEach((r) => setStyle(e, t, r));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const r = autoPrefix(e, t);
    importantRE.test(n)
      ? e.setProperty(hyphenate(r), n.replace(importantRE, ""), "important")
      : (e[r] = n);
  }
}
const prefixes = ["Webkit", "Moz", "ms"],
  prefixCache = {};
function autoPrefix(e, t) {
  const n = prefixCache[t];
  if (n) return n;
  let r = camelize(t);
  if (r !== "filter" && r in e) return (prefixCache[t] = r);
  r = capitalize(r);
  for (let s = 0; s < prefixes.length; s++) {
    const o = prefixes[s] + r;
    if (o in e) return (prefixCache[t] = o);
  }
  return t;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(e, t, n, r, s) {
  if (r && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(xlinkNS, t.slice(6, t.length))
      : e.setAttributeNS(xlinkNS, t, n);
  else {
    const o = isSpecialBooleanAttr(t);
    n == null || (o && !includeBooleanAttr(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, o ? "" : n);
  }
}
function patchDOMProp(e, t, n, r, s, o, l) {
  if (t === "innerHTML" || t === "textContent") {
    r && l(r, s, o), (e[t] = n ?? "");
    return;
  }
  const u = e.tagName;
  if (t === "value" && u !== "PROGRESS" && !u.includes("-")) {
    e._value = n;
    const c = u === "OPTION" ? e.getAttribute("value") : e.value,
      h = n ?? "";
    c !== h && (e.value = h), n == null && e.removeAttribute(t);
    return;
  }
  let f = !1;
  if (n === "" || n == null) {
    const c = typeof e[t];
    c === "boolean"
      ? (n = includeBooleanAttr(n))
      : n == null && c === "string"
      ? ((n = ""), (f = !0))
      : c === "number" && ((n = 0), (f = !0));
  }
  try {
    e[t] = n;
  } catch {}
  f && e.removeAttribute(t);
}
function addEventListener(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function removeEventListener(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
function patchEvent(e, t, n, r, s = null) {
  const o = e._vei || (e._vei = {}),
    l = o[t];
  if (r && l) l.value = r;
  else {
    const [u, f] = parseName(t);
    if (r) {
      const c = (o[t] = createInvoker(r, s));
      addEventListener(e, u, c, f);
    } else l && (removeEventListener(e, u, l, f), (o[t] = void 0));
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(e) {
  let t;
  if (optionsModifierRE.test(e)) {
    t = {};
    let r;
    for (; (r = e.match(optionsModifierRE)); )
      (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : hyphenate(e.slice(2)), t];
}
let cachedNow = 0;
const p = Promise.resolve(),
  getNow = () =>
    cachedNow || (p.then(() => (cachedNow = 0)), (cachedNow = Date.now()));
function createInvoker(e, t) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= n.attached) return;
    callWithAsyncErrorHandling(
      patchStopImmediatePropagation(r, n.value),
      t,
      5,
      [r]
    );
  };
  return (n.value = e), (n.attached = getNow()), n;
}
function patchStopImmediatePropagation(e, t) {
  if (isArray$1(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((r) => (s) => !s._stopped && r && r(s))
    );
  } else return t;
}
const nativeOnRE = /^on[a-z]/,
  patchProp = (e, t, n, r, s = !1, o, l, u, f) => {
    t === "class"
      ? patchClass(e, r, s)
      : t === "style"
      ? patchStyle(e, n, r)
      : isOn(t)
      ? isModelListener(t) || patchEvent(e, t, n, r, l)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : shouldSetAsProp(e, t, r, s)
        )
      ? patchDOMProp(e, t, r, o, l, u, f)
      : (t === "true-value"
          ? (e._trueValue = r)
          : t === "false-value" && (e._falseValue = r),
        patchAttr(e, t, r, s));
  };
function shouldSetAsProp(e, t, n, r) {
  return r
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && nativeOnRE.test(t) && isFunction$1(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (nativeOnRE.test(t) && isString$1(n))
    ? !1
    : t in e;
}
const rendererOptions = extend$1({ patchProp }, nodeOps);
let renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
const createApp = (...e) => {
  const t = ensureRenderer().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (r) => {
      const s = normalizeContainer(r);
      if (!s) return;
      const o = t._component;
      !isFunction$1(o) &&
        !o.render &&
        !o.template &&
        (o.template = s.innerHTML),
        (s.innerHTML = "");
      const l = n(s, !1, s instanceof SVGElement);
      return (
        s instanceof Element &&
          (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")),
        l
      );
    }),
    t
  );
};
function normalizeContainer(e) {
  return isString$1(e) ? document.querySelector(e) : e;
}
const style = "",
  _imports_0 = "/vite.svg",
  _imports_1 = "/assets/vue-5532db34.svg",
  _withScopeId$1 = (e) => (
    pushScopeId("data-v-1d5be6d4"), (e = e()), popScopeId(), e
  ),
  _hoisted_1$1 = { class: "card" },
  _hoisted_2 = _withScopeId$1(() =>
    createBaseVNode(
      "p",
      null,
      [
        createTextVNode(" Edit "),
        createBaseVNode("code", null, "components/HelloWorld.vue"),
        createTextVNode(" to test HMR "),
      ],
      -1
    )
  ),
  _hoisted_3 = _withScopeId$1(() =>
    createBaseVNode(
      "p",
      null,
      [
        createTextVNode(" Check out "),
        createBaseVNode(
          "a",
          {
            href: "https://vuejs.org/guide/quick-start.html#local",
            target: "_blank",
          },
          "create-vue"
        ),
        createTextVNode(", the official Vue + Vite starter "),
      ],
      -1
    )
  ),
  _hoisted_4 = _withScopeId$1(() =>
    createBaseVNode(
      "p",
      null,
      [
        createTextVNode(" Install "),
        createBaseVNode(
          "a",
          { href: "https://github.com/vuejs/language-tools", target: "_blank" },
          "Volar"
        ),
        createTextVNode(" in your IDE for a better DX "),
      ],
      -1
    )
  ),
  _hoisted_5 = _withScopeId$1(() =>
    createBaseVNode(
      "p",
      { class: "read-the-docs" },
      "Click on the Vite and Vue logos to learn more",
      -1
    )
  ),
  _sfc_main$1 = defineComponent({
    __name: "HelloWorld",
    props: { msg: {} },
    setup(e) {
      const t = ref(0);
      return (n, r) => (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createBaseVNode("h1", null, toDisplayString(n.msg), 1),
            createBaseVNode("div", _hoisted_1$1, [
              createBaseVNode(
                "button",
                { type: "button", onClick: r[0] || (r[0] = (s) => t.value++) },
                "count is " + toDisplayString(t.value),
                1
              ),
              _hoisted_2,
            ]),
            _hoisted_3,
            _hoisted_4,
            _hoisted_5,
          ],
          64
        )
      );
    },
  }),
  HelloWorld_vue_vue_type_style_index_0_scoped_1d5be6d4_lang = "",
  _export_sfc = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [r, s] of t) n[r] = s;
    return n;
  },
  HelloWorld = _export_sfc(_sfc_main$1, [["__scopeId", "data-v-1d5be6d4"]]);
function bind(e, t) {
  return function () {
    return e.apply(t, arguments);
  };
}
const { toString } = Object.prototype,
  { getPrototypeOf } = Object,
  kindOf = ((e) => (t) => {
    const n = toString.call(t);
    return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  kindOfTest = (e) => ((e = e.toLowerCase()), (t) => kindOf(t) === e),
  typeOfTest = (e) => (t) => typeof t === e,
  { isArray } = Array,
  isUndefined = typeOfTest("undefined");
function isBuffer(e) {
  return (
    e !== null &&
    !isUndefined(e) &&
    e.constructor !== null &&
    !isUndefined(e.constructor) &&
    isFunction(e.constructor.isBuffer) &&
    e.constructor.isBuffer(e)
  );
}
const isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(e) {
  let t;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && isArrayBuffer(e.buffer)),
    t
  );
}
const isString = typeOfTest("string"),
  isFunction = typeOfTest("function"),
  isNumber = typeOfTest("number"),
  isObject = (e) => e !== null && typeof e == "object",
  isBoolean = (e) => e === !0 || e === !1,
  isPlainObject = (e) => {
    if (kindOf(e) !== "object") return !1;
    const t = getPrototypeOf(e);
    return (
      (t === null ||
        t === Object.prototype ||
        Object.getPrototypeOf(t) === null) &&
      !(Symbol.toStringTag in e) &&
      !(Symbol.iterator in e)
    );
  },
  isDate = kindOfTest("Date"),
  isFile = kindOfTest("File"),
  isBlob = kindOfTest("Blob"),
  isFileList = kindOfTest("FileList"),
  isStream = (e) => isObject(e) && isFunction(e.pipe),
  isFormData = (e) => {
    let t;
    return (
      e &&
      ((typeof FormData == "function" && e instanceof FormData) ||
        (isFunction(e.append) &&
          ((t = kindOf(e)) === "formdata" ||
            (t === "object" &&
              isFunction(e.toString) &&
              e.toString() === "[object FormData]"))))
    );
  },
  isURLSearchParams = kindOfTest("URLSearchParams"),
  trim = (e) =>
    e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function forEach(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u") return;
  let r, s;
  if ((typeof e != "object" && (e = [e]), isArray(e)))
    for (r = 0, s = e.length; r < s; r++) t.call(null, e[r], r, e);
  else {
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
      l = o.length;
    let u;
    for (r = 0; r < l; r++) (u = o[r]), t.call(null, e[u], u, e);
  }
}
function findKey(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length,
    s;
  for (; r-- > 0; ) if (((s = n[r]), t === s.toLowerCase())) return s;
  return null;
}
const _global = (() =>
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : global)(),
  isContextDefined = (e) => !isUndefined(e) && e !== _global;
function merge() {
  const { caseless: e } = (isContextDefined(this) && this) || {},
    t = {},
    n = (r, s) => {
      const o = (e && findKey(t, s)) || s;
      isPlainObject(t[o]) && isPlainObject(r)
        ? (t[o] = merge(t[o], r))
        : isPlainObject(r)
        ? (t[o] = merge({}, r))
        : isArray(r)
        ? (t[o] = r.slice())
        : (t[o] = r);
    };
  for (let r = 0, s = arguments.length; r < s; r++)
    arguments[r] && forEach(arguments[r], n);
  return t;
}
const extend = (e, t, n, { allOwnKeys: r } = {}) => (
    forEach(
      t,
      (s, o) => {
        n && isFunction(s) ? (e[o] = bind(s, n)) : (e[o] = s);
      },
      { allOwnKeys: r }
    ),
    e
  ),
  stripBOM = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  inherits = (e, t, n, r) => {
    (e.prototype = Object.create(t.prototype, r)),
      (e.prototype.constructor = e),
      Object.defineProperty(e, "super", { value: t.prototype }),
      n && Object.assign(e.prototype, n);
  },
  toFlatObject = (e, t, n, r) => {
    let s, o, l;
    const u = {};
    if (((t = t || {}), e == null)) return t;
    do {
      for (s = Object.getOwnPropertyNames(e), o = s.length; o-- > 0; )
        (l = s[o]), (!r || r(l, e, t)) && !u[l] && ((t[l] = e[l]), (u[l] = !0));
      e = n !== !1 && getPrototypeOf(e);
    } while (e && (!n || n(e, t)) && e !== Object.prototype);
    return t;
  },
  endsWith = (e, t, n) => {
    (e = String(e)),
      (n === void 0 || n > e.length) && (n = e.length),
      (n -= t.length);
    const r = e.indexOf(t, n);
    return r !== -1 && r === n;
  },
  toArray = (e) => {
    if (!e) return null;
    if (isArray(e)) return e;
    let t = e.length;
    if (!isNumber(t)) return null;
    const n = new Array(t);
    for (; t-- > 0; ) n[t] = e[t];
    return n;
  },
  isTypedArray = (
    (e) => (t) =>
      e && t instanceof e
  )(typeof Uint8Array < "u" && getPrototypeOf(Uint8Array)),
  forEachEntry = (e, t) => {
    const r = (e && e[Symbol.iterator]).call(e);
    let s;
    for (; (s = r.next()) && !s.done; ) {
      const o = s.value;
      t.call(e, o[0], o[1]);
    }
  },
  matchAll = (e, t) => {
    let n;
    const r = [];
    for (; (n = e.exec(t)) !== null; ) r.push(n);
    return r;
  },
  isHTMLForm = kindOfTest("HTMLFormElement"),
  toCamelCase = (e) =>
    e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, r, s) {
      return r.toUpperCase() + s;
    }),
  hasOwnProperty = (
    ({ hasOwnProperty: e }) =>
    (t, n) =>
      e.call(t, n)
  )(Object.prototype),
  isRegExp = kindOfTest("RegExp"),
  reduceDescriptors = (e, t) => {
    const n = Object.getOwnPropertyDescriptors(e),
      r = {};
    forEach(n, (s, o) => {
      t(s, o, e) !== !1 && (r[o] = s);
    }),
      Object.defineProperties(e, r);
  },
  freezeMethods = (e) => {
    reduceDescriptors(e, (t, n) => {
      if (isFunction(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
        return !1;
      const r = e[n];
      if (isFunction(r)) {
        if (((t.enumerable = !1), "writable" in t)) {
          t.writable = !1;
          return;
        }
        t.set ||
          (t.set = () => {
            throw Error("Can not rewrite read-only method '" + n + "'");
          });
      }
    });
  },
  toObjectSet = (e, t) => {
    const n = {},
      r = (s) => {
        s.forEach((o) => {
          n[o] = !0;
        });
      };
    return isArray(e) ? r(e) : r(String(e).split(t)), n;
  },
  noop = () => {},
  toFiniteNumber = (e, t) => ((e = +e), Number.isFinite(e) ? e : t),
  ALPHA = "abcdefghijklmnopqrstuvwxyz",
  DIGIT = "0123456789",
  ALPHABET = { DIGIT, ALPHA, ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT },
  generateString = (e = 16, t = ALPHABET.ALPHA_DIGIT) => {
    let n = "";
    const { length: r } = t;
    for (; e--; ) n += t[(Math.random() * r) | 0];
    return n;
  };
function isSpecCompliantForm(e) {
  return !!(
    e &&
    isFunction(e.append) &&
    e[Symbol.toStringTag] === "FormData" &&
    e[Symbol.iterator]
  );
}
const toJSONObject = (e) => {
    const t = new Array(10),
      n = (r, s) => {
        if (isObject(r)) {
          if (t.indexOf(r) >= 0) return;
          if (!("toJSON" in r)) {
            t[s] = r;
            const o = isArray(r) ? [] : {};
            return (
              forEach(r, (l, u) => {
                const f = n(l, s + 1);
                !isUndefined(f) && (o[u] = f);
              }),
              (t[s] = void 0),
              o
            );
          }
        }
        return r;
      };
    return n(e, 0);
  },
  isAsyncFn = kindOfTest("AsyncFunction"),
  isThenable = (e) =>
    e &&
    (isObject(e) || isFunction(e)) &&
    isFunction(e.then) &&
    isFunction(e.catch),
  utils = {
    isArray,
    isArrayBuffer,
    isBuffer,
    isFormData,
    isArrayBufferView,
    isString,
    isNumber,
    isBoolean,
    isObject,
    isPlainObject,
    isUndefined,
    isDate,
    isFile,
    isBlob,
    isRegExp,
    isFunction,
    isStream,
    isURLSearchParams,
    isTypedArray,
    isFileList,
    forEach,
    merge,
    extend,
    trim,
    stripBOM,
    inherits,
    toFlatObject,
    kindOf,
    kindOfTest,
    endsWith,
    toArray,
    forEachEntry,
    matchAll,
    isHTMLForm,
    hasOwnProperty,
    hasOwnProp: hasOwnProperty,
    reduceDescriptors,
    freezeMethods,
    toObjectSet,
    toCamelCase,
    noop,
    toFiniteNumber,
    findKey,
    global: _global,
    isContextDefined,
    ALPHABET,
    generateString,
    isSpecCompliantForm,
    toJSONObject,
    isAsyncFn,
    isThenable,
  };
function AxiosError(e, t, n, r, s) {
  Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = e),
    (this.name = "AxiosError"),
    t && (this.code = t),
    n && (this.config = n),
    r && (this.request = r),
    s && (this.response = s);
}
utils.inherits(AxiosError, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: utils.toJSONObject(this.config),
      code: this.code,
      status:
        this.response && this.response.status ? this.response.status : null,
    };
  },
});
const prototype$1 = AxiosError.prototype,
  descriptors = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL",
].forEach((e) => {
  descriptors[e] = { value: e };
});
Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype$1, "isAxiosError", { value: !0 });
AxiosError.from = (e, t, n, r, s, o) => {
  const l = Object.create(prototype$1);
  return (
    utils.toFlatObject(
      e,
      l,
      function (f) {
        return f !== Error.prototype;
      },
      (u) => u !== "isAxiosError"
    ),
    AxiosError.call(l, e.message, t, n, r, s),
    (l.cause = e),
    (l.name = e.name),
    o && Object.assign(l, o),
    l
  );
};
const httpAdapter = null;
function isVisitable(e) {
  return utils.isPlainObject(e) || utils.isArray(e);
}
function removeBrackets(e) {
  return utils.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function renderKey(e, t, n) {
  return e
    ? e
        .concat(t)
        .map(function (s, o) {
          return (s = removeBrackets(s)), !n && o ? "[" + s + "]" : s;
        })
        .join(n ? "." : "")
    : t;
}
function isFlatArray(e) {
  return utils.isArray(e) && !e.some(isVisitable);
}
const predicates = utils.toFlatObject(utils, {}, null, function (t) {
  return /^is[A-Z]/.test(t);
});
function toFormData(e, t, n) {
  if (!utils.isObject(e)) throw new TypeError("target must be an object");
  (t = t || new FormData()),
    (n = utils.toFlatObject(
      n,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (y, A) {
        return !utils.isUndefined(A[y]);
      }
    ));
  const r = n.metaTokens,
    s = n.visitor || h,
    o = n.dots,
    l = n.indexes,
    f = (n.Blob || (typeof Blob < "u" && Blob)) && utils.isSpecCompliantForm(t);
  if (!utils.isFunction(s)) throw new TypeError("visitor must be a function");
  function c(g) {
    if (g === null) return "";
    if (utils.isDate(g)) return g.toISOString();
    if (!f && utils.isBlob(g))
      throw new AxiosError("Blob is not supported. Use a Buffer instead.");
    return utils.isArrayBuffer(g) || utils.isTypedArray(g)
      ? f && typeof Blob == "function"
        ? new Blob([g])
        : Buffer.from(g)
      : g;
  }
  function h(g, y, A) {
    let O = g;
    if (g && !A && typeof g == "object") {
      if (utils.endsWith(y, "{}"))
        (y = r ? y : y.slice(0, -2)), (g = JSON.stringify(g));
      else if (
        (utils.isArray(g) && isFlatArray(g)) ||
        ((utils.isFileList(g) || utils.endsWith(y, "[]")) &&
          (O = utils.toArray(g)))
      )
        return (
          (y = removeBrackets(y)),
          O.forEach(function (K, P) {
            !(utils.isUndefined(K) || K === null) &&
              t.append(
                l === !0 ? renderKey([y], P, o) : l === null ? y : y + "[]",
                c(K)
              );
          }),
          !1
        );
    }
    return isVisitable(g) ? !0 : (t.append(renderKey(A, y, o), c(g)), !1);
  }
  const v = [],
    x = Object.assign(predicates, {
      defaultVisitor: h,
      convertValue: c,
      isVisitable,
    });
  function R(g, y) {
    if (!utils.isUndefined(g)) {
      if (v.indexOf(g) !== -1)
        throw Error("Circular reference detected in " + y.join("."));
      v.push(g),
        utils.forEach(g, function (O, L) {
          (!(utils.isUndefined(O) || O === null) &&
            s.call(t, O, utils.isString(L) ? L.trim() : L, y, x)) === !0 &&
            R(O, y ? y.concat(L) : [L]);
        }),
        v.pop();
    }
  }
  if (!utils.isObject(e)) throw new TypeError("data must be an object");
  return R(e), t;
}
function encode$1(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (r) {
    return t[r];
  });
}
function AxiosURLSearchParams(e, t) {
  (this._pairs = []), e && toFormData(e, this, t);
}
const prototype = AxiosURLSearchParams.prototype;
prototype.append = function (t, n) {
  this._pairs.push([t, n]);
};
prototype.toString = function (t) {
  const n = t
    ? function (r) {
        return t.call(this, r, encode$1);
      }
    : encode$1;
  return this._pairs
    .map(function (s) {
      return n(s[0]) + "=" + n(s[1]);
    }, "")
    .join("&");
};
function encode(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}
function buildURL(e, t, n) {
  if (!t) return e;
  const r = (n && n.encode) || encode,
    s = n && n.serialize;
  let o;
  if (
    (s
      ? (o = s(t, n))
      : (o = utils.isURLSearchParams(t)
          ? t.toString()
          : new AxiosURLSearchParams(t, n).toString(r)),
    o)
  ) {
    const l = e.indexOf("#");
    l !== -1 && (e = e.slice(0, l)),
      (e += (e.indexOf("?") === -1 ? "?" : "&") + o);
  }
  return e;
}
class InterceptorManager {
  constructor() {
    this.handlers = [];
  }
  use(t, n, r) {
    return (
      this.handlers.push({
        fulfilled: t,
        rejected: n,
        synchronous: r ? r.synchronous : !1,
        runWhen: r ? r.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(t) {
    utils.forEach(this.handlers, function (r) {
      r !== null && t(r);
    });
  }
}
const InterceptorManager$1 = InterceptorManager,
  transitionalDefaults = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  URLSearchParams$1 =
    typeof URLSearchParams < "u" ? URLSearchParams : AxiosURLSearchParams,
  FormData$1 = typeof FormData < "u" ? FormData : null,
  Blob$1 = typeof Blob < "u" ? Blob : null,
  isStandardBrowserEnv = (() => {
    let e;
    return typeof navigator < "u" &&
      ((e = navigator.product) === "ReactNative" ||
        e === "NativeScript" ||
        e === "NS")
      ? !1
      : typeof window < "u" && typeof document < "u";
  })(),
  isStandardBrowserWebWorkerEnv = (() =>
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function")(),
  platform = {
    isBrowser: !0,
    classes: {
      URLSearchParams: URLSearchParams$1,
      FormData: FormData$1,
      Blob: Blob$1,
    },
    isStandardBrowserEnv,
    isStandardBrowserWebWorkerEnv,
    protocols: ["http", "https", "file", "blob", "url", "data"],
  };
function toURLEncodedForm(e, t) {
  return toFormData(
    e,
    new platform.classes.URLSearchParams(),
    Object.assign(
      {
        visitor: function (n, r, s, o) {
          return platform.isNode && utils.isBuffer(n)
            ? (this.append(r, n.toString("base64")), !1)
            : o.defaultVisitor.apply(this, arguments);
        },
      },
      t
    )
  );
}
function parsePropPath(e) {
  return utils
    .matchAll(/\w+|\[(\w*)]/g, e)
    .map((t) => (t[0] === "[]" ? "" : t[1] || t[0]));
}
function arrayToObject(e) {
  const t = {},
    n = Object.keys(e);
  let r;
  const s = n.length;
  let o;
  for (r = 0; r < s; r++) (o = n[r]), (t[o] = e[o]);
  return t;
}
function formDataToJSON(e) {
  function t(n, r, s, o) {
    let l = n[o++];
    const u = Number.isFinite(+l),
      f = o >= n.length;
    return (
      (l = !l && utils.isArray(s) ? s.length : l),
      f
        ? (utils.hasOwnProp(s, l) ? (s[l] = [s[l], r]) : (s[l] = r), !u)
        : ((!s[l] || !utils.isObject(s[l])) && (s[l] = []),
          t(n, r, s[l], o) &&
            utils.isArray(s[l]) &&
            (s[l] = arrayToObject(s[l])),
          !u)
    );
  }
  if (utils.isFormData(e) && utils.isFunction(e.entries)) {
    const n = {};
    return (
      utils.forEachEntry(e, (r, s) => {
        t(parsePropPath(r), s, n, 0);
      }),
      n
    );
  }
  return null;
}
const DEFAULT_CONTENT_TYPE = { "Content-Type": void 0 };
function stringifySafely(e, t, n) {
  if (utils.isString(e))
    try {
      return (t || JSON.parse)(e), utils.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError") throw r;
    }
  return (n || JSON.stringify)(e);
}
const defaults = {
  transitional: transitionalDefaults,
  adapter: ["xhr", "http"],
  transformRequest: [
    function (t, n) {
      const r = n.getContentType() || "",
        s = r.indexOf("application/json") > -1,
        o = utils.isObject(t);
      if (
        (o && utils.isHTMLForm(t) && (t = new FormData(t)), utils.isFormData(t))
      )
        return s && s ? JSON.stringify(formDataToJSON(t)) : t;
      if (
        utils.isArrayBuffer(t) ||
        utils.isBuffer(t) ||
        utils.isStream(t) ||
        utils.isFile(t) ||
        utils.isBlob(t)
      )
        return t;
      if (utils.isArrayBufferView(t)) return t.buffer;
      if (utils.isURLSearchParams(t))
        return (
          n.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1
          ),
          t.toString()
        );
      let u;
      if (o) {
        if (r.indexOf("application/x-www-form-urlencoded") > -1)
          return toURLEncodedForm(t, this.formSerializer).toString();
        if (
          (u = utils.isFileList(t)) ||
          r.indexOf("multipart/form-data") > -1
        ) {
          const f = this.env && this.env.FormData;
          return toFormData(
            u ? { "files[]": t } : t,
            f && new f(),
            this.formSerializer
          );
        }
      }
      return o || s
        ? (n.setContentType("application/json", !1), stringifySafely(t))
        : t;
    },
  ],
  transformResponse: [
    function (t) {
      const n = this.transitional || defaults.transitional,
        r = n && n.forcedJSONParsing,
        s = this.responseType === "json";
      if (t && utils.isString(t) && ((r && !this.responseType) || s)) {
        const l = !(n && n.silentJSONParsing) && s;
        try {
          return JSON.parse(t);
        } catch (u) {
          if (l)
            throw u.name === "SyntaxError"
              ? AxiosError.from(
                  u,
                  AxiosError.ERR_BAD_RESPONSE,
                  this,
                  null,
                  this.response
                )
              : u;
        }
      }
      return t;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: platform.classes.FormData, Blob: platform.classes.Blob },
  validateStatus: function (t) {
    return t >= 200 && t < 300;
  },
  headers: { common: { Accept: "application/json, text/plain, */*" } },
};
utils.forEach(["delete", "get", "head"], function (t) {
  defaults.headers[t] = {};
});
utils.forEach(["post", "put", "patch"], function (t) {
  defaults.headers[t] = utils.merge(DEFAULT_CONTENT_TYPE);
});
const defaults$1 = defaults,
  ignoreDuplicateOf = utils.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  parseHeaders = (e) => {
    const t = {};
    let n, r, s;
    return (
      e &&
        e
          .split(
            `
`
          )
          .forEach(function (l) {
            (s = l.indexOf(":")),
              (n = l.substring(0, s).trim().toLowerCase()),
              (r = l.substring(s + 1).trim()),
              !(!n || (t[n] && ignoreDuplicateOf[n])) &&
                (n === "set-cookie"
                  ? t[n]
                    ? t[n].push(r)
                    : (t[n] = [r])
                  : (t[n] = t[n] ? t[n] + ", " + r : r));
          }),
      t
    );
  },
  $internals = Symbol("internals");
function normalizeHeader(e) {
  return e && String(e).trim().toLowerCase();
}
function normalizeValue(e) {
  return e === !1 || e == null
    ? e
    : utils.isArray(e)
    ? e.map(normalizeValue)
    : String(e);
}
function parseTokens(e) {
  const t = Object.create(null),
    n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; (r = n.exec(e)); ) t[r[1]] = r[2];
  return t;
}
const isValidHeaderName = (e) =>
  /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function matchHeaderValue(e, t, n, r, s) {
  if (utils.isFunction(r)) return r.call(this, t, n);
  if ((s && (t = n), !!utils.isString(t))) {
    if (utils.isString(r)) return t.indexOf(r) !== -1;
    if (utils.isRegExp(r)) return r.test(t);
  }
}
function formatHeader(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function buildAccessors(e, t) {
  const n = utils.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function (s, o, l) {
        return this[r].call(this, t, s, o, l);
      },
      configurable: !0,
    });
  });
}
class AxiosHeaders {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const s = this;
    function o(u, f, c) {
      const h = normalizeHeader(f);
      if (!h) throw new Error("header name must be a non-empty string");
      const v = utils.findKey(s, h);
      (!v || s[v] === void 0 || c === !0 || (c === void 0 && s[v] !== !1)) &&
        (s[v || f] = normalizeValue(u));
    }
    const l = (u, f) => utils.forEach(u, (c, h) => o(c, h, f));
    return (
      utils.isPlainObject(t) || t instanceof this.constructor
        ? l(t, n)
        : utils.isString(t) && (t = t.trim()) && !isValidHeaderName(t)
        ? l(parseHeaders(t), n)
        : t != null && o(n, t, r),
      this
    );
  }
  get(t, n) {
    if (((t = normalizeHeader(t)), t)) {
      const r = utils.findKey(this, t);
      if (r) {
        const s = this[r];
        if (!n) return s;
        if (n === !0) return parseTokens(s);
        if (utils.isFunction(n)) return n.call(this, s, r);
        if (utils.isRegExp(n)) return n.exec(s);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (((t = normalizeHeader(t)), t)) {
      const r = utils.findKey(this, t);
      return !!(
        r &&
        this[r] !== void 0 &&
        (!n || matchHeaderValue(this, this[r], r, n))
      );
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let s = !1;
    function o(l) {
      if (((l = normalizeHeader(l)), l)) {
        const u = utils.findKey(r, l);
        u && (!n || matchHeaderValue(r, r[u], u, n)) && (delete r[u], (s = !0));
      }
    }
    return utils.isArray(t) ? t.forEach(o) : o(t), s;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length,
      s = !1;
    for (; r--; ) {
      const o = n[r];
      (!t || matchHeaderValue(this, this[o], o, t, !0)) &&
        (delete this[o], (s = !0));
    }
    return s;
  }
  normalize(t) {
    const n = this,
      r = {};
    return (
      utils.forEach(this, (s, o) => {
        const l = utils.findKey(r, o);
        if (l) {
          (n[l] = normalizeValue(s)), delete n[o];
          return;
        }
        const u = t ? formatHeader(o) : String(o).trim();
        u !== o && delete n[o], (n[u] = normalizeValue(s)), (r[u] = !0);
      }),
      this
    );
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = Object.create(null);
    return (
      utils.forEach(this, (r, s) => {
        r != null &&
          r !== !1 &&
          (n[s] = t && utils.isArray(r) ? r.join(", ") : r);
      }),
      n
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach((s) => r.set(s)), r;
  }
  static accessor(t) {
    const r = (this[$internals] = this[$internals] = { accessors: {} })
        .accessors,
      s = this.prototype;
    function o(l) {
      const u = normalizeHeader(l);
      r[u] || (buildAccessors(s, l), (r[u] = !0));
    }
    return utils.isArray(t) ? t.forEach(o) : o(t), this;
  }
}
AxiosHeaders.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
utils.freezeMethods(AxiosHeaders.prototype);
utils.freezeMethods(AxiosHeaders);
const AxiosHeaders$1 = AxiosHeaders;
function transformData(e, t) {
  const n = this || defaults$1,
    r = t || n,
    s = AxiosHeaders$1.from(r.headers);
  let o = r.data;
  return (
    utils.forEach(e, function (u) {
      o = u.call(n, o, s.normalize(), t ? t.status : void 0);
    }),
    s.normalize(),
    o
  );
}
function isCancel(e) {
  return !!(e && e.__CANCEL__);
}
function CanceledError(e, t, n) {
  AxiosError.call(this, e ?? "canceled", AxiosError.ERR_CANCELED, t, n),
    (this.name = "CanceledError");
}
utils.inherits(CanceledError, AxiosError, { __CANCEL__: !0 });
function settle(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status)
    ? e(n)
    : t(
        new AxiosError(
          "Request failed with status code " + n.status,
          [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][
            Math.floor(n.status / 100) - 4
          ],
          n.config,
          n.request,
          n
        )
      );
}
const cookies = platform.isStandardBrowserEnv
  ? (function () {
      return {
        write: function (n, r, s, o, l, u) {
          const f = [];
          f.push(n + "=" + encodeURIComponent(r)),
            utils.isNumber(s) && f.push("expires=" + new Date(s).toGMTString()),
            utils.isString(o) && f.push("path=" + o),
            utils.isString(l) && f.push("domain=" + l),
            u === !0 && f.push("secure"),
            (document.cookie = f.join("; "));
        },
        read: function (n) {
          const r = document.cookie.match(
            new RegExp("(^|;\\s*)(" + n + ")=([^;]*)")
          );
          return r ? decodeURIComponent(r[3]) : null;
        },
        remove: function (n) {
          this.write(n, "", Date.now() - 864e5);
        },
      };
    })()
  : (function () {
      return {
        write: function () {},
        read: function () {
          return null;
        },
        remove: function () {},
      };
    })();
function isAbsoluteURL(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function combineURLs(e, t) {
  return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function buildFullPath(e, t) {
  return e && !isAbsoluteURL(t) ? combineURLs(e, t) : t;
}
const isURLSameOrigin = platform.isStandardBrowserEnv
  ? (function () {
      const t = /(msie|trident)/i.test(navigator.userAgent),
        n = document.createElement("a");
      let r;
      function s(o) {
        let l = o;
        return (
          t && (n.setAttribute("href", l), (l = n.href)),
          n.setAttribute("href", l),
          {
            href: n.href,
            protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
            host: n.host,
            search: n.search ? n.search.replace(/^\?/, "") : "",
            hash: n.hash ? n.hash.replace(/^#/, "") : "",
            hostname: n.hostname,
            port: n.port,
            pathname:
              n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname,
          }
        );
      }
      return (
        (r = s(window.location.href)),
        function (l) {
          const u = utils.isString(l) ? s(l) : l;
          return u.protocol === r.protocol && u.host === r.host;
        }
      );
    })()
  : (function () {
      return function () {
        return !0;
      };
    })();
function parseProtocol(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return (t && t[1]) || "";
}
function speedometer(e, t) {
  e = e || 10;
  const n = new Array(e),
    r = new Array(e);
  let s = 0,
    o = 0,
    l;
  return (
    (t = t !== void 0 ? t : 1e3),
    function (f) {
      const c = Date.now(),
        h = r[o];
      l || (l = c), (n[s] = f), (r[s] = c);
      let v = o,
        x = 0;
      for (; v !== s; ) (x += n[v++]), (v = v % e);
      if (((s = (s + 1) % e), s === o && (o = (o + 1) % e), c - l < t)) return;
      const R = h && c - h;
      return R ? Math.round((x * 1e3) / R) : void 0;
    }
  );
}
function progressEventReducer(e, t) {
  let n = 0;
  const r = speedometer(50, 250);
  return (s) => {
    const o = s.loaded,
      l = s.lengthComputable ? s.total : void 0,
      u = o - n,
      f = r(u),
      c = o <= l;
    n = o;
    const h = {
      loaded: o,
      total: l,
      progress: l ? o / l : void 0,
      bytes: u,
      rate: f || void 0,
      estimated: f && l && c ? (l - o) / f : void 0,
      event: s,
    };
    (h[t ? "download" : "upload"] = !0), e(h);
  };
}
const isXHRAdapterSupported = typeof XMLHttpRequest < "u",
  xhrAdapter =
    isXHRAdapterSupported &&
    function (e) {
      return new Promise(function (n, r) {
        let s = e.data;
        const o = AxiosHeaders$1.from(e.headers).normalize(),
          l = e.responseType;
        let u;
        function f() {
          e.cancelToken && e.cancelToken.unsubscribe(u),
            e.signal && e.signal.removeEventListener("abort", u);
        }
        utils.isFormData(s) &&
          (platform.isStandardBrowserEnv ||
          platform.isStandardBrowserWebWorkerEnv
            ? o.setContentType(!1)
            : o.setContentType("multipart/form-data;", !1));
        let c = new XMLHttpRequest();
        if (e.auth) {
          const R = e.auth.username || "",
            g = e.auth.password
              ? unescape(encodeURIComponent(e.auth.password))
              : "";
          o.set("Authorization", "Basic " + btoa(R + ":" + g));
        }
        const h = buildFullPath(e.baseURL, e.url);
        c.open(
          e.method.toUpperCase(),
          buildURL(h, e.params, e.paramsSerializer),
          !0
        ),
          (c.timeout = e.timeout);
        function v() {
          if (!c) return;
          const R = AxiosHeaders$1.from(
              "getAllResponseHeaders" in c && c.getAllResponseHeaders()
            ),
            y = {
              data:
                !l || l === "text" || l === "json"
                  ? c.responseText
                  : c.response,
              status: c.status,
              statusText: c.statusText,
              headers: R,
              config: e,
              request: c,
            };
          settle(
            function (O) {
              n(O), f();
            },
            function (O) {
              r(O), f();
            },
            y
          ),
            (c = null);
        }
        if (
          ("onloadend" in c
            ? (c.onloadend = v)
            : (c.onreadystatechange = function () {
                !c ||
                  c.readyState !== 4 ||
                  (c.status === 0 &&
                    !(c.responseURL && c.responseURL.indexOf("file:") === 0)) ||
                  setTimeout(v);
              }),
          (c.onabort = function () {
            c &&
              (r(
                new AxiosError("Request aborted", AxiosError.ECONNABORTED, e, c)
              ),
              (c = null));
          }),
          (c.onerror = function () {
            r(new AxiosError("Network Error", AxiosError.ERR_NETWORK, e, c)),
              (c = null);
          }),
          (c.ontimeout = function () {
            let g = e.timeout
              ? "timeout of " + e.timeout + "ms exceeded"
              : "timeout exceeded";
            const y = e.transitional || transitionalDefaults;
            e.timeoutErrorMessage && (g = e.timeoutErrorMessage),
              r(
                new AxiosError(
                  g,
                  y.clarifyTimeoutError
                    ? AxiosError.ETIMEDOUT
                    : AxiosError.ECONNABORTED,
                  e,
                  c
                )
              ),
              (c = null);
          }),
          platform.isStandardBrowserEnv)
        ) {
          const R =
            (e.withCredentials || isURLSameOrigin(h)) &&
            e.xsrfCookieName &&
            cookies.read(e.xsrfCookieName);
          R && o.set(e.xsrfHeaderName, R);
        }
        s === void 0 && o.setContentType(null),
          "setRequestHeader" in c &&
            utils.forEach(o.toJSON(), function (g, y) {
              c.setRequestHeader(y, g);
            }),
          utils.isUndefined(e.withCredentials) ||
            (c.withCredentials = !!e.withCredentials),
          l && l !== "json" && (c.responseType = e.responseType),
          typeof e.onDownloadProgress == "function" &&
            c.addEventListener(
              "progress",
              progressEventReducer(e.onDownloadProgress, !0)
            ),
          typeof e.onUploadProgress == "function" &&
            c.upload &&
            c.upload.addEventListener(
              "progress",
              progressEventReducer(e.onUploadProgress)
            ),
          (e.cancelToken || e.signal) &&
            ((u = (R) => {
              c &&
                (r(!R || R.type ? new CanceledError(null, e, c) : R),
                c.abort(),
                (c = null));
            }),
            e.cancelToken && e.cancelToken.subscribe(u),
            e.signal &&
              (e.signal.aborted ? u() : e.signal.addEventListener("abort", u)));
        const x = parseProtocol(h);
        if (x && platform.protocols.indexOf(x) === -1) {
          r(
            new AxiosError(
              "Unsupported protocol " + x + ":",
              AxiosError.ERR_BAD_REQUEST,
              e
            )
          );
          return;
        }
        c.send(s || null);
      });
    },
  knownAdapters = { http: httpAdapter, xhr: xhrAdapter };
utils.forEach(knownAdapters, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {}
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const adapters = {
  getAdapter: (e) => {
    e = utils.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, r;
    for (
      let s = 0;
      s < t &&
      ((n = e[s]),
      !(r = utils.isString(n) ? knownAdapters[n.toLowerCase()] : n));
      s++
    );
    if (!r)
      throw r === !1
        ? new AxiosError(
            `Adapter ${n} is not supported by the environment`,
            "ERR_NOT_SUPPORT"
          )
        : new Error(
            utils.hasOwnProp(knownAdapters, n)
              ? `Adapter '${n}' is not available in the build`
              : `Unknown adapter '${n}'`
          );
    if (!utils.isFunction(r)) throw new TypeError("adapter is not a function");
    return r;
  },
  adapters: knownAdapters,
};
function throwIfCancellationRequested(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new CanceledError(null, e);
}
function dispatchRequest(e) {
  return (
    throwIfCancellationRequested(e),
    (e.headers = AxiosHeaders$1.from(e.headers)),
    (e.data = transformData.call(e, e.transformRequest)),
    ["post", "put", "patch"].indexOf(e.method) !== -1 &&
      e.headers.setContentType("application/x-www-form-urlencoded", !1),
    adapters
      .getAdapter(e.adapter || defaults$1.adapter)(e)
      .then(
        function (r) {
          return (
            throwIfCancellationRequested(e),
            (r.data = transformData.call(e, e.transformResponse, r)),
            (r.headers = AxiosHeaders$1.from(r.headers)),
            r
          );
        },
        function (r) {
          return (
            isCancel(r) ||
              (throwIfCancellationRequested(e),
              r &&
                r.response &&
                ((r.response.data = transformData.call(
                  e,
                  e.transformResponse,
                  r.response
                )),
                (r.response.headers = AxiosHeaders$1.from(
                  r.response.headers
                )))),
            Promise.reject(r)
          );
        }
      )
  );
}
const headersToObject = (e) => (e instanceof AxiosHeaders$1 ? e.toJSON() : e);
function mergeConfig(e, t) {
  t = t || {};
  const n = {};
  function r(c, h, v) {
    return utils.isPlainObject(c) && utils.isPlainObject(h)
      ? utils.merge.call({ caseless: v }, c, h)
      : utils.isPlainObject(h)
      ? utils.merge({}, h)
      : utils.isArray(h)
      ? h.slice()
      : h;
  }
  function s(c, h, v) {
    if (utils.isUndefined(h)) {
      if (!utils.isUndefined(c)) return r(void 0, c, v);
    } else return r(c, h, v);
  }
  function o(c, h) {
    if (!utils.isUndefined(h)) return r(void 0, h);
  }
  function l(c, h) {
    if (utils.isUndefined(h)) {
      if (!utils.isUndefined(c)) return r(void 0, c);
    } else return r(void 0, h);
  }
  function u(c, h, v) {
    if (v in t) return r(c, h);
    if (v in e) return r(void 0, c);
  }
  const f = {
    url: o,
    method: o,
    data: o,
    baseURL: l,
    transformRequest: l,
    transformResponse: l,
    paramsSerializer: l,
    timeout: l,
    timeoutMessage: l,
    withCredentials: l,
    adapter: l,
    responseType: l,
    xsrfCookieName: l,
    xsrfHeaderName: l,
    onUploadProgress: l,
    onDownloadProgress: l,
    decompress: l,
    maxContentLength: l,
    maxBodyLength: l,
    beforeRedirect: l,
    transport: l,
    httpAgent: l,
    httpsAgent: l,
    cancelToken: l,
    socketPath: l,
    responseEncoding: l,
    validateStatus: u,
    headers: (c, h) => s(headersToObject(c), headersToObject(h), !0),
  };
  return (
    utils.forEach(Object.keys(Object.assign({}, e, t)), function (h) {
      const v = f[h] || s,
        x = v(e[h], t[h], h);
      (utils.isUndefined(x) && v !== u) || (n[h] = x);
    }),
    n
  );
}
const VERSION = "1.4.0",
  validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (e, t) => {
    validators$1[e] = function (r) {
      return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
    };
  }
);
const deprecatedWarnings = {};
validators$1.transitional = function (t, n, r) {
  function s(o, l) {
    return (
      "[Axios v" +
      VERSION +
      "] Transitional option '" +
      o +
      "'" +
      l +
      (r ? ". " + r : "")
    );
  }
  return (o, l, u) => {
    if (t === !1)
      throw new AxiosError(
        s(l, " has been removed" + (n ? " in " + n : "")),
        AxiosError.ERR_DEPRECATED
      );
    return (
      n &&
        !deprecatedWarnings[l] &&
        ((deprecatedWarnings[l] = !0),
        console.warn(
          s(
            l,
            " has been deprecated since v" +
              n +
              " and will be removed in the near future"
          )
        )),
      t ? t(o, l, u) : !0
    );
  };
};
function assertOptions(e, t, n) {
  if (typeof e != "object")
    throw new AxiosError(
      "options must be an object",
      AxiosError.ERR_BAD_OPTION_VALUE
    );
  const r = Object.keys(e);
  let s = r.length;
  for (; s-- > 0; ) {
    const o = r[s],
      l = t[o];
    if (l) {
      const u = e[o],
        f = u === void 0 || l(u, o, e);
      if (f !== !0)
        throw new AxiosError(
          "option " + o + " must be " + f,
          AxiosError.ERR_BAD_OPTION_VALUE
        );
      continue;
    }
    if (n !== !0)
      throw new AxiosError("Unknown option " + o, AxiosError.ERR_BAD_OPTION);
  }
}
const validator = { assertOptions, validators: validators$1 },
  validators = validator.validators;
class Axios {
  constructor(t) {
    (this.defaults = t),
      (this.interceptors = {
        request: new InterceptorManager$1(),
        response: new InterceptorManager$1(),
      });
  }
  request(t, n) {
    typeof t == "string" ? ((n = n || {}), (n.url = t)) : (n = t || {}),
      (n = mergeConfig(this.defaults, n));
    const { transitional: r, paramsSerializer: s, headers: o } = n;
    r !== void 0 &&
      validator.assertOptions(
        r,
        {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean),
        },
        !1
      ),
      s != null &&
        (utils.isFunction(s)
          ? (n.paramsSerializer = { serialize: s })
          : validator.assertOptions(
              s,
              { encode: validators.function, serialize: validators.function },
              !0
            )),
      (n.method = (n.method || this.defaults.method || "get").toLowerCase());
    let l;
    (l = o && utils.merge(o.common, o[n.method])),
      l &&
        utils.forEach(
          ["delete", "get", "head", "post", "put", "patch", "common"],
          (g) => {
            delete o[g];
          }
        ),
      (n.headers = AxiosHeaders$1.concat(l, o));
    const u = [];
    let f = !0;
    this.interceptors.request.forEach(function (y) {
      (typeof y.runWhen == "function" && y.runWhen(n) === !1) ||
        ((f = f && y.synchronous), u.unshift(y.fulfilled, y.rejected));
    });
    const c = [];
    this.interceptors.response.forEach(function (y) {
      c.push(y.fulfilled, y.rejected);
    });
    let h,
      v = 0,
      x;
    if (!f) {
      const g = [dispatchRequest.bind(this), void 0];
      for (
        g.unshift.apply(g, u),
          g.push.apply(g, c),
          x = g.length,
          h = Promise.resolve(n);
        v < x;

      )
        h = h.then(g[v++], g[v++]);
      return h;
    }
    x = u.length;
    let R = n;
    for (v = 0; v < x; ) {
      const g = u[v++],
        y = u[v++];
      try {
        R = g(R);
      } catch (A) {
        y.call(this, A);
        break;
      }
    }
    try {
      h = dispatchRequest.call(this, R);
    } catch (g) {
      return Promise.reject(g);
    }
    for (v = 0, x = c.length; v < x; ) h = h.then(c[v++], c[v++]);
    return h;
  }
  getUri(t) {
    t = mergeConfig(this.defaults, t);
    const n = buildFullPath(t.baseURL, t.url);
    return buildURL(n, t.params, t.paramsSerializer);
  }
}
utils.forEach(["delete", "get", "head", "options"], function (t) {
  Axios.prototype[t] = function (n, r) {
    return this.request(
      mergeConfig(r || {}, { method: t, url: n, data: (r || {}).data })
    );
  };
});
utils.forEach(["post", "put", "patch"], function (t) {
  function n(r) {
    return function (o, l, u) {
      return this.request(
        mergeConfig(u || {}, {
          method: t,
          headers: r ? { "Content-Type": "multipart/form-data" } : {},
          url: o,
          data: l,
        })
      );
    };
  }
  (Axios.prototype[t] = n()), (Axios.prototype[t + "Form"] = n(!0));
});
const Axios$1 = Axios;
class CancelToken {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function (o) {
      n = o;
    });
    const r = this;
    this.promise.then((s) => {
      if (!r._listeners) return;
      let o = r._listeners.length;
      for (; o-- > 0; ) r._listeners[o](s);
      r._listeners = null;
    }),
      (this.promise.then = (s) => {
        let o;
        const l = new Promise((u) => {
          r.subscribe(u), (o = u);
        }).then(s);
        return (
          (l.cancel = function () {
            r.unsubscribe(o);
          }),
          l
        );
      }),
      t(function (o, l, u) {
        r.reason || ((r.reason = new CanceledError(o, l, u)), n(r.reason));
      });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
  }
  unsubscribe(t) {
    if (!this._listeners) return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  static source() {
    let t;
    return {
      token: new CancelToken(function (s) {
        t = s;
      }),
      cancel: t,
    };
  }
}
const CancelToken$1 = CancelToken;
function spread(e) {
  return function (n) {
    return e.apply(null, n);
  };
}
function isAxiosError(e) {
  return utils.isObject(e) && e.isAxiosError === !0;
}
const HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};
Object.entries(HttpStatusCode).forEach(([e, t]) => {
  HttpStatusCode[t] = e;
});
const HttpStatusCode$1 = HttpStatusCode;
function createInstance(e) {
  const t = new Axios$1(e),
    n = bind(Axios$1.prototype.request, t);
  return (
    utils.extend(n, Axios$1.prototype, t, { allOwnKeys: !0 }),
    utils.extend(n, t, null, { allOwnKeys: !0 }),
    (n.create = function (s) {
      return createInstance(mergeConfig(e, s));
    }),
    n
  );
}
const axios = createInstance(defaults$1);
axios.Axios = Axios$1;
axios.CanceledError = CanceledError;
axios.CancelToken = CancelToken$1;
axios.isCancel = isCancel;
axios.VERSION = VERSION;
axios.toFormData = toFormData;
axios.AxiosError = AxiosError;
axios.Cancel = axios.CanceledError;
axios.all = function (t) {
  return Promise.all(t);
};
axios.spread = spread;
axios.isAxiosError = isAxiosError;
axios.mergeConfig = mergeConfig;
axios.AxiosHeaders = AxiosHeaders$1;
axios.formToJSON = (e) =>
  formDataToJSON(utils.isHTMLForm(e) ? new FormData(e) : e);
axios.HttpStatusCode = HttpStatusCode$1;
axios.default = axios;
const axios$1 = axios,
  _withScopeId = (e) => (
    pushScopeId("data-v-f21c958c"), (e = e()), popScopeId(), e
  ),
  _hoisted_1 = _withScopeId(() =>
    createBaseVNode(
      "div",
      null,
      [
        createBaseVNode("a", { href: "https://vitejs.dev", target: "_blank" }, [
          createBaseVNode("img", {
            src: _imports_0,
            class: "logo",
            alt: "Vite logo",
          }),
        ]),
        createBaseVNode("a", { href: "https://vuejs.org/", target: "_blank" }, [
          createBaseVNode("img", {
            src: _imports_1,
            class: "logo vue",
            alt: "Vue logo",
          }),
        ]),
      ],
      -1
    )
  ),
  _sfc_main = defineComponent({
    __name: "App",
    setup(e) {
      return (
        axios$1.get("/api/yujing/sisetu").then((t) => {
          console.log(t, "res--------------");
        }),
        (t, n) => (
          openBlock(),
          createElementBlock(
            Fragment,
            null,
            [_hoisted_1, createVNode(HelloWorld, { msg: "Vite + Vue" })],
            64
          )
        )
      );
    },
  }),
  App_vue_vue_type_style_index_0_scoped_f21c958c_lang = "",
  App = _export_sfc(_sfc_main, [["__scopeId", "data-v-f21c958c"]]);
var commonjsGlobal =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
    ? window
    : typeof global < "u"
    ? global
    : typeof self < "u"
    ? self
    : {};
function getDefaultExportFromCjs(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var mock = { exports: {} };
(function (module, exports) {
  (function (t, n) {
    module.exports = n();
  })(commonjsGlobal, function () {
    return (function (e) {
      var t = {};
      function n(r) {
        if (t[r]) return t[r].exports;
        var s = (t[r] = { exports: {}, id: r, loaded: !1 });
        return (
          e[r].call(s.exports, s, s.exports, n), (s.loaded = !0), s.exports
        );
      }
      return (n.m = e), (n.c = t), (n.p = ""), n(0);
    })([
      function (e, t, n) {
        var r = n(1),
          s = n(3),
          o = n(5),
          l = n(20),
          u = n(23),
          f = n(25),
          c;
        typeof window < "u" && (c = n(27));
        /*!
    Mock - 模拟请求 & 模拟数据
    https://github.com/nuysoft/Mock
    墨智 mozhi.gyy@taobao.com nuysoft@gmail.com
*/ var h = {
          Handler: r,
          Random: o,
          Util: s,
          XHR: c,
          RE: l,
          toJSONSchema: u,
          valid: f,
          heredoc: s.heredoc,
          setup: function (v) {
            return c.setup(v);
          },
          _mocked: {},
        };
        (h.version = "1.0.1-beta3"),
          c && (c.Mock = h),
          (h.mock = function (v, x, R) {
            return arguments.length === 1
              ? r.gen(v)
              : (arguments.length === 2 && ((R = x), (x = void 0)),
                c && (window.XMLHttpRequest = c),
                (h._mocked[v + (x || "")] = { rurl: v, rtype: x, template: R }),
                h);
          }),
          (e.exports = h);
      },
      function (module, exports, __webpack_require__) {
        var Constant = __webpack_require__(2),
          Util = __webpack_require__(3),
          Parser = __webpack_require__(4),
          Random = __webpack_require__(5),
          RE = __webpack_require__(20),
          Handler = { extend: Util.extend };
        (Handler.gen = function (e, t, n) {
          (t = t == null ? "" : t + ""),
            (n = n || {}),
            (n = {
              path: n.path || [Constant.GUID],
              templatePath: n.templatePath || [Constant.GUID++],
              currentContext: n.currentContext,
              templateCurrentContext: n.templateCurrentContext || e,
              root: n.root || n.currentContext,
              templateRoot: n.templateRoot || n.templateCurrentContext || e,
            });
          var r = Parser.parse(t),
            s = Util.type(e),
            o;
          return Handler[s]
            ? ((o = Handler[s]({
                type: s,
                template: e,
                name: t,
                parsedName: t && t.replace(Constant.RE_KEY, "$1"),
                rule: r,
                context: n,
              })),
              n.root || (n.root = o),
              o)
            : e;
        }),
          Handler.extend({
            array: function (e) {
              var t = [],
                n,
                r;
              if (e.template.length === 0) return t;
              if (e.rule.parameters)
                if (e.rule.min === 1 && e.rule.max === void 0)
                  e.context.path.push(e.name),
                    e.context.templatePath.push(e.name),
                    (t = Random.pick(
                      Handler.gen(e.template, void 0, {
                        path: e.context.path,
                        templatePath: e.context.templatePath,
                        currentContext: t,
                        templateCurrentContext: e.template,
                        root: e.context.root || t,
                        templateRoot: e.context.templateRoot || e.template,
                      })
                    )),
                    e.context.path.pop(),
                    e.context.templatePath.pop();
                else if (e.rule.parameters[2])
                  (e.template.__order_index = e.template.__order_index || 0),
                    e.context.path.push(e.name),
                    e.context.templatePath.push(e.name),
                    (t = Handler.gen(e.template, void 0, {
                      path: e.context.path,
                      templatePath: e.context.templatePath,
                      currentContext: t,
                      templateCurrentContext: e.template,
                      root: e.context.root || t,
                      templateRoot: e.context.templateRoot || e.template,
                    })[e.template.__order_index % e.template.length]),
                    (e.template.__order_index += +e.rule.parameters[2]),
                    e.context.path.pop(),
                    e.context.templatePath.pop();
                else
                  for (n = 0; n < e.rule.count; n++)
                    for (r = 0; r < e.template.length; r++)
                      e.context.path.push(t.length),
                        e.context.templatePath.push(r),
                        t.push(
                          Handler.gen(e.template[r], t.length, {
                            path: e.context.path,
                            templatePath: e.context.templatePath,
                            currentContext: t,
                            templateCurrentContext: e.template,
                            root: e.context.root || t,
                            templateRoot: e.context.templateRoot || e.template,
                          })
                        ),
                        e.context.path.pop(),
                        e.context.templatePath.pop();
              else
                for (n = 0; n < e.template.length; n++)
                  e.context.path.push(n),
                    e.context.templatePath.push(n),
                    t.push(
                      Handler.gen(e.template[n], n, {
                        path: e.context.path,
                        templatePath: e.context.templatePath,
                        currentContext: t,
                        templateCurrentContext: e.template,
                        root: e.context.root || t,
                        templateRoot: e.context.templateRoot || e.template,
                      })
                    ),
                    e.context.path.pop(),
                    e.context.templatePath.pop();
              return t;
            },
            object: function (e) {
              var t = {},
                n,
                r,
                s,
                o,
                l,
                u;
              if (e.rule.min != null)
                for (
                  n = Util.keys(e.template),
                    n = Random.shuffle(n),
                    n = n.slice(0, e.rule.count),
                    u = 0;
                  u < n.length;
                  u++
                )
                  (s = n[u]),
                    (o = s.replace(Constant.RE_KEY, "$1")),
                    e.context.path.push(o),
                    e.context.templatePath.push(s),
                    (t[o] = Handler.gen(e.template[s], s, {
                      path: e.context.path,
                      templatePath: e.context.templatePath,
                      currentContext: t,
                      templateCurrentContext: e.template,
                      root: e.context.root || t,
                      templateRoot: e.context.templateRoot || e.template,
                    })),
                    e.context.path.pop(),
                    e.context.templatePath.pop();
              else {
                (n = []), (r = []);
                for (s in e.template)
                  (typeof e.template[s] == "function" ? r : n).push(s);
                for (n = n.concat(r), u = 0; u < n.length; u++)
                  (s = n[u]),
                    (o = s.replace(Constant.RE_KEY, "$1")),
                    e.context.path.push(o),
                    e.context.templatePath.push(s),
                    (t[o] = Handler.gen(e.template[s], s, {
                      path: e.context.path,
                      templatePath: e.context.templatePath,
                      currentContext: t,
                      templateCurrentContext: e.template,
                      root: e.context.root || t,
                      templateRoot: e.context.templateRoot || e.template,
                    })),
                    e.context.path.pop(),
                    e.context.templatePath.pop(),
                    (l = s.match(Constant.RE_KEY)),
                    l &&
                      l[2] &&
                      Util.type(e.template[s]) === "number" &&
                      (e.template[s] += parseInt(l[2], 10));
              }
              return t;
            },
            number: function (e) {
              var t, n;
              if (e.rule.decimal) {
                for (
                  e.template += "",
                    n = e.template.split("."),
                    n[0] = e.rule.range ? e.rule.count : n[0],
                    n[1] = (n[1] || "").slice(0, e.rule.dcount);
                  n[1].length < e.rule.dcount;

                )
                  n[1] +=
                    n[1].length < e.rule.dcount - 1
                      ? Random.character("number")
                      : Random.character("123456789");
                t = parseFloat(n.join("."), 10);
              } else
                t =
                  e.rule.range && !e.rule.parameters[2]
                    ? e.rule.count
                    : e.template;
              return t;
            },
            boolean: function (e) {
              var t;
              return (
                (t = e.rule.parameters
                  ? Random.bool(e.rule.min, e.rule.max, e.template)
                  : e.template),
                t
              );
            },
            string: function (e) {
              var t = "",
                n,
                r,
                s,
                o;
              if (e.template.length) {
                for (
                  e.rule.count == null && (t += e.template), n = 0;
                  n < e.rule.count;
                  n++
                )
                  t += e.template;
                for (
                  r = t.match(Constant.RE_PLACEHOLDER) || [], n = 0;
                  n < r.length;
                  n++
                ) {
                  if (((s = r[n]), /^\\/.test(s))) {
                    r.splice(n--, 1);
                    continue;
                  }
                  if (
                    ((o = Handler.placeholder(
                      s,
                      e.context.currentContext,
                      e.context.templateCurrentContext,
                      e
                    )),
                    r.length === 1 && s === t && typeof o != typeof t)
                  ) {
                    t = o;
                    break;
                  }
                  t = t.replace(s, o);
                }
              } else
                t = e.rule.range ? Random.string(e.rule.count) : e.template;
              return t;
            },
            function: function (e) {
              return e.template.call(e.context.currentContext, e);
            },
            regexp: function (e) {
              var t = "";
              e.rule.count == null && (t += e.template.source);
              for (var n = 0; n < e.rule.count; n++) t += e.template.source;
              return RE.Handler.gen(RE.Parser.parse(t));
            },
          }),
          Handler.extend({
            _all: function () {
              var e = {};
              for (var t in Random) e[t.toLowerCase()] = t;
              return e;
            },
            placeholder: function (placeholder, obj, templateContext, options) {
              Constant.RE_PLACEHOLDER.exec("");
              var parts = Constant.RE_PLACEHOLDER.exec(placeholder),
                key = parts && parts[1],
                lkey = key && key.toLowerCase(),
                okey = this._all()[lkey],
                params = (parts && parts[2]) || "",
                pathParts = this.splitPathToArray(key);
              try {
                params = eval(
                  "(function(){ return [].splice.call(arguments, 0 ) })(" +
                    params +
                    ")"
                );
              } catch (e) {
                params = parts[2].split(/,\s*/);
              }
              if (obj && key in obj) return obj[key];
              if (key.charAt(0) === "/" || pathParts.length > 1)
                return this.getValueByKeyPath(key, options);
              if (
                templateContext &&
                typeof templateContext == "object" &&
                key in templateContext &&
                placeholder !== templateContext[key]
              )
                return (
                  (templateContext[key] = Handler.gen(
                    templateContext[key],
                    key,
                    {
                      currentContext: obj,
                      templateCurrentContext: templateContext,
                    }
                  )),
                  templateContext[key]
                );
              if (!(key in Random) && !(lkey in Random) && !(okey in Random))
                return placeholder;
              for (var i = 0; i < params.length; i++)
                Constant.RE_PLACEHOLDER.exec(""),
                  Constant.RE_PLACEHOLDER.test(params[i]) &&
                    (params[i] = Handler.placeholder(
                      params[i],
                      obj,
                      templateContext,
                      options
                    ));
              var handle = Random[key] || Random[lkey] || Random[okey];
              switch (Util.type(handle)) {
                case "array":
                  return Random.pick(handle);
                case "function":
                  handle.options = options;
                  var re = handle.apply(Random, params);
                  return re === void 0 && (re = ""), delete handle.options, re;
              }
            },
            getValueByKeyPath: function (e, t) {
              var n = e,
                r = this.splitPathToArray(e),
                s = [];
              e.charAt(0) === "/"
                ? (s = [t.context.path[0]].concat(this.normalizePath(r)))
                : r.length > 1 &&
                  ((s = t.context.path.slice(0)),
                  s.pop(),
                  (s = this.normalizePath(s.concat(r))));
              try {
                e = r[r.length - 1];
                for (
                  var o = t.context.root, l = t.context.templateRoot, u = 1;
                  u < s.length - 1;
                  u++
                )
                  (o = o[s[u]]), (l = l[s[u]]);
                if (o && e in o) return o[e];
                if (l && typeof l == "object" && e in l && n !== l[e])
                  return (
                    (l[e] = Handler.gen(l[e], e, {
                      currentContext: o,
                      templateCurrentContext: l,
                    })),
                    l[e]
                  );
              } catch {}
              return "@" + r.join("/");
            },
            normalizePath: function (e) {
              for (var t = [], n = 0; n < e.length; n++)
                switch (e[n]) {
                  case "..":
                    t.pop();
                    break;
                  case ".":
                    break;
                  default:
                    t.push(e[n]);
                }
              return t;
            },
            splitPathToArray: function (e) {
              var t = e.split(/\/+/);
              return (
                t[t.length - 1] || (t = t.slice(0, -1)),
                t[0] || (t = t.slice(1)),
                t
              );
            },
          }),
          (module.exports = Handler);
      },
      function (e, t) {
        e.exports = {
          GUID: 1,
          RE_KEY:
            /(.+)\|(?:\+(\d+)|([\+\-]?\d+-?[\+\-]?\d*)?(?:\.(\d+-?\d*))?)/,
          RE_RANGE: /([\+\-]?\d+)-?([\+\-]?\d+)?/,
          RE_PLACEHOLDER: /\\*@([^@#%&()\?\s]+)(?:\((.*?)\))?/g,
        };
      },
      function (e, t) {
        var n = {};
        (n.extend = function () {
          var s = arguments[0] || {},
            o = 1,
            l = arguments.length,
            u,
            f,
            c,
            h,
            v;
          for (l === 1 && ((s = this), (o = 0)); o < l; o++)
            if (((u = arguments[o]), !!u))
              for (f in u)
                (c = s[f]),
                  (h = u[f]),
                  s !== h &&
                    h !== void 0 &&
                    (n.isArray(h) || n.isObject(h)
                      ? (n.isArray(h) && (v = c && n.isArray(c) ? c : []),
                        n.isObject(h) && (v = c && n.isObject(c) ? c : {}),
                        (s[f] = n.extend(v, h)))
                      : (s[f] = h));
          return s;
        }),
          (n.each = function (s, o, l) {
            var u, f;
            if (this.type(s) === "number") for (u = 0; u < s; u++) o(u, u);
            else if (s.length === +s.length)
              for (u = 0; u < s.length && o.call(l, s[u], u, s) !== !1; u++);
            else for (f in s) if (o.call(l, s[f], f, s) === !1) break;
          }),
          (n.type = function (s) {
            return s == null
              ? String(s)
              : Object.prototype.toString
                  .call(s)
                  .match(/\[object (\w+)\]/)[1]
                  .toLowerCase();
          }),
          n.each(
            "String Object Array RegExp Function".split(" "),
            function (r) {
              n["is" + r] = function (s) {
                return n.type(s) === r.toLowerCase();
              };
            }
          ),
          (n.isObjectOrArray = function (r) {
            return n.isObject(r) || n.isArray(r);
          }),
          (n.isNumeric = function (r) {
            return !isNaN(parseFloat(r)) && isFinite(r);
          }),
          (n.keys = function (r) {
            var s = [];
            for (var o in r) r.hasOwnProperty(o) && s.push(o);
            return s;
          }),
          (n.values = function (r) {
            var s = [];
            for (var o in r) r.hasOwnProperty(o) && s.push(r[o]);
            return s;
          }),
          (n.heredoc = function (s) {
            return s
              .toString()
              .replace(/^[^\/]+\/\*!?/, "")
              .replace(/\*\/[^\/]+$/, "")
              .replace(/^[\s\xA0]+/, "")
              .replace(/[\s\xA0]+$/, "");
          }),
          (n.noop = function () {}),
          (e.exports = n);
      },
      function (e, t, n) {
        var r = n(2),
          s = n(5);
        e.exports = {
          parse: function (o) {
            o = o == null ? "" : o + "";
            var l = (o || "").match(r.RE_KEY),
              u = l && l[3] && l[3].match(r.RE_RANGE),
              f = u && u[1] && parseInt(u[1], 10),
              c = u && u[2] && parseInt(u[2], 10),
              h = u ? (u[2] ? s.integer(f, c) : parseInt(u[1], 10)) : void 0,
              v = l && l[4] && l[4].match(r.RE_RANGE),
              x = v && v[1] && parseInt(v[1], 10),
              R = v && v[2] && parseInt(v[2], 10),
              g = v ? (!v[2] && parseInt(v[1], 10)) || s.integer(x, R) : void 0,
              y = {
                parameters: l,
                range: u,
                min: f,
                max: c,
                count: h,
                decimal: v,
                dmin: x,
                dmax: R,
                dcount: g,
              };
            for (var A in y) if (y[A] != null) return y;
            return {};
          },
        };
      },
      function (e, t, n) {
        var r = n(3),
          s = { extend: r.extend };
        s.extend(n(6)),
          s.extend(n(7)),
          s.extend(n(8)),
          s.extend(n(10)),
          s.extend(n(13)),
          s.extend(n(15)),
          s.extend(n(16)),
          s.extend(n(17)),
          s.extend(n(14)),
          s.extend(n(19)),
          (e.exports = s);
      },
      function (e, t) {
        e.exports = {
          boolean: function (n, r, s) {
            return s !== void 0
              ? ((n = typeof n < "u" && !isNaN(n) ? parseInt(n, 10) : 1),
                (r = typeof r < "u" && !isNaN(r) ? parseInt(r, 10) : 1),
                Math.random() > (1 / (n + r)) * n ? !s : s)
              : Math.random() >= 0.5;
          },
          bool: function (n, r, s) {
            return this.boolean(n, r, s);
          },
          natural: function (n, r) {
            return (
              (n = typeof n < "u" ? parseInt(n, 10) : 0),
              (r = typeof r < "u" ? parseInt(r, 10) : 9007199254740992),
              Math.round(Math.random() * (r - n)) + n
            );
          },
          integer: function (n, r) {
            return (
              (n = typeof n < "u" ? parseInt(n, 10) : -9007199254740992),
              (r = typeof r < "u" ? parseInt(r, 10) : 9007199254740992),
              Math.round(Math.random() * (r - n)) + n
            );
          },
          int: function (n, r) {
            return this.integer(n, r);
          },
          float: function (n, r, s, o) {
            (s = s === void 0 ? 0 : s),
              (s = Math.max(Math.min(s, 17), 0)),
              (o = o === void 0 ? 17 : o),
              (o = Math.max(Math.min(o, 17), 0));
            for (
              var l = this.integer(n, r) + ".", u = 0, f = this.natural(s, o);
              u < f;
              u++
            )
              l +=
                u < f - 1
                  ? this.character("number")
                  : this.character("123456789");
            return parseFloat(l, 10);
          },
          character: function (n) {
            var r = {
              lower: "abcdefghijklmnopqrstuvwxyz",
              upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
              number: "0123456789",
              symbol: "!@#$%^&*()[]",
            };
            return (
              (r.alpha = r.lower + r.upper),
              (r.undefined = r.lower + r.upper + r.number + r.symbol),
              (n = r[("" + n).toLowerCase()] || n),
              n.charAt(this.natural(0, n.length - 1))
            );
          },
          char: function (n) {
            return this.character(n);
          },
          string: function (n, r, s) {
            var o;
            switch (arguments.length) {
              case 0:
                o = this.natural(3, 7);
                break;
              case 1:
                (o = n), (n = void 0);
                break;
              case 2:
                typeof arguments[0] == "string"
                  ? (o = r)
                  : ((o = this.natural(n, r)), (n = void 0));
                break;
              case 3:
                o = this.natural(r, s);
                break;
            }
            for (var l = "", u = 0; u < o; u++) l += this.character(n);
            return l;
          },
          str: function () {
            return this.string.apply(this, arguments);
          },
          range: function (n, r, s) {
            arguments.length <= 1 && ((r = n || 0), (n = 0)),
              (s = arguments[2] || 1),
              (n = +n),
              (r = +r),
              (s = +s);
            for (
              var o = Math.max(Math.ceil((r - n) / s), 0),
                l = 0,
                u = new Array(o);
              l < o;

            )
              (u[l++] = n), (n += s);
            return u;
          },
        };
      },
      function (e, t) {
        var n = {
          yyyy: "getFullYear",
          yy: function (r) {
            return ("" + r.getFullYear()).slice(2);
          },
          y: "yy",
          MM: function (r) {
            var s = r.getMonth() + 1;
            return s < 10 ? "0" + s : s;
          },
          M: function (r) {
            return r.getMonth() + 1;
          },
          dd: function (r) {
            var s = r.getDate();
            return s < 10 ? "0" + s : s;
          },
          d: "getDate",
          HH: function (r) {
            var s = r.getHours();
            return s < 10 ? "0" + s : s;
          },
          H: "getHours",
          hh: function (r) {
            var s = r.getHours() % 12;
            return s < 10 ? "0" + s : s;
          },
          h: function (r) {
            return r.getHours() % 12;
          },
          mm: function (r) {
            var s = r.getMinutes();
            return s < 10 ? "0" + s : s;
          },
          m: "getMinutes",
          ss: function (r) {
            var s = r.getSeconds();
            return s < 10 ? "0" + s : s;
          },
          s: "getSeconds",
          SS: function (r) {
            var s = r.getMilliseconds();
            return (s < 10 && "00" + s) || (s < 100 && "0" + s) || s;
          },
          S: "getMilliseconds",
          A: function (r) {
            return r.getHours() < 12 ? "AM" : "PM";
          },
          a: function (r) {
            return r.getHours() < 12 ? "am" : "pm";
          },
          T: "getTime",
        };
        e.exports = {
          _patternLetters: n,
          _rformat: new RegExp(
            (function () {
              var r = [];
              for (var s in n) r.push(s);
              return "(" + r.join("|") + ")";
            })(),
            "g"
          ),
          _formatDate: function (r, s) {
            return s.replace(this._rformat, function o(l, u) {
              return typeof n[u] == "function"
                ? n[u](r)
                : n[u] in n
                ? o(l, n[u])
                : r[n[u]]();
            });
          },
          _randomDate: function (r, s) {
            return (
              (r = r === void 0 ? new Date(0) : r),
              (s = s === void 0 ? new Date() : s),
              new Date(Math.random() * (s.getTime() - r.getTime()))
            );
          },
          date: function (r) {
            return (
              (r = r || "yyyy-MM-dd"), this._formatDate(this._randomDate(), r)
            );
          },
          time: function (r) {
            return (
              (r = r || "HH:mm:ss"), this._formatDate(this._randomDate(), r)
            );
          },
          datetime: function (r) {
            return (
              (r = r || "yyyy-MM-dd HH:mm:ss"),
              this._formatDate(this._randomDate(), r)
            );
          },
          now: function (r, s) {
            arguments.length === 1 &&
              (/year|month|day|hour|minute|second|week/.test(r) ||
                ((s = r), (r = ""))),
              (r = (r || "").toLowerCase()),
              (s = s || "yyyy-MM-dd HH:mm:ss");
            var o = new Date();
            switch (r) {
              case "year":
                o.setMonth(0);
              case "month":
                o.setDate(1);
              case "week":
              case "day":
                o.setHours(0);
              case "hour":
                o.setMinutes(0);
              case "minute":
                o.setSeconds(0);
              case "second":
                o.setMilliseconds(0);
            }
            switch (r) {
              case "week":
                o.setDate(o.getDate() - o.getDay());
            }
            return this._formatDate(o, s);
          },
        };
      },
      function (e, t, n) {
        (function (r) {
          r.exports = {
            _adSize: [
              "300x250",
              "250x250",
              "240x400",
              "336x280",
              "180x150",
              "720x300",
              "468x60",
              "234x60",
              "88x31",
              "120x90",
              "120x60",
              "120x240",
              "125x125",
              "728x90",
              "160x600",
              "120x600",
              "300x600",
            ],
            _screenSize: [
              "320x200",
              "320x240",
              "640x480",
              "800x480",
              "800x480",
              "1024x600",
              "1024x768",
              "1280x800",
              "1440x900",
              "1920x1200",
              "2560x1600",
            ],
            _videoSize: ["720x480", "768x576", "1280x720", "1920x1080"],
            image: function (s, o, l, u, f) {
              return (
                arguments.length === 4 && ((f = u), (u = void 0)),
                arguments.length === 3 && ((f = l), (l = void 0)),
                s || (s = this.pick(this._adSize)),
                o && ~o.indexOf("#") && (o = o.slice(1)),
                l && ~l.indexOf("#") && (l = l.slice(1)),
                "http://dummyimage.com/" +
                  s +
                  (o ? "/" + o : "") +
                  (l ? "/" + l : "") +
                  (u ? "." + u : "") +
                  (f ? "&text=" + f : "")
              );
            },
            img: function () {
              return this.image.apply(this, arguments);
            },
            _brandColors: {
              "4ormat": "#fb0a2a",
              "500px": "#02adea",
              "About.me (blue)": "#00405d",
              "About.me (yellow)": "#ffcc33",
              Addvocate: "#ff6138",
              Adobe: "#ff0000",
              Aim: "#fcd20b",
              Amazon: "#e47911",
              Android: "#a4c639",
              "Angie's List": "#7fbb00",
              AOL: "#0060a3",
              Atlassian: "#003366",
              Behance: "#053eff",
              "Big Cartel": "#97b538",
              bitly: "#ee6123",
              Blogger: "#fc4f08",
              Boeing: "#0039a6",
              "Booking.com": "#003580",
              Carbonmade: "#613854",
              Cheddar: "#ff7243",
              "Code School": "#3d4944",
              Delicious: "#205cc0",
              Dell: "#3287c1",
              Designmoo: "#e54a4f",
              Deviantart: "#4e6252",
              "Designer News": "#2d72da",
              Devour: "#fd0001",
              DEWALT: "#febd17",
              "Disqus (blue)": "#59a3fc",
              "Disqus (orange)": "#db7132",
              Dribbble: "#ea4c89",
              Dropbox: "#3d9ae8",
              Drupal: "#0c76ab",
              Dunked: "#2a323a",
              eBay: "#89c507",
              Ember: "#f05e1b",
              Engadget: "#00bdf6",
              Envato: "#528036",
              Etsy: "#eb6d20",
              Evernote: "#5ba525",
              "Fab.com": "#dd0017",
              Facebook: "#3b5998",
              Firefox: "#e66000",
              "Flickr (blue)": "#0063dc",
              "Flickr (pink)": "#ff0084",
              Forrst: "#5b9a68",
              Foursquare: "#25a0ca",
              Garmin: "#007cc3",
              GetGlue: "#2d75a2",
              Gimmebar: "#f70078",
              GitHub: "#171515",
              "Google Blue": "#0140ca",
              "Google Green": "#16a61e",
              "Google Red": "#dd1812",
              "Google Yellow": "#fcca03",
              "Google+": "#dd4b39",
              Grooveshark: "#f77f00",
              Groupon: "#82b548",
              "Hacker News": "#ff6600",
              HelloWallet: "#0085ca",
              "Heroku (light)": "#c7c5e6",
              "Heroku (dark)": "#6567a5",
              HootSuite: "#003366",
              Houzz: "#73ba37",
              HTML5: "#ec6231",
              IKEA: "#ffcc33",
              IMDb: "#f3ce13",
              Instagram: "#3f729b",
              Intel: "#0071c5",
              Intuit: "#365ebf",
              Kickstarter: "#76cc1e",
              kippt: "#e03500",
              Kodery: "#00af81",
              LastFM: "#c3000d",
              LinkedIn: "#0e76a8",
              Livestream: "#cf0005",
              Lumo: "#576396",
              Mixpanel: "#a086d3",
              Meetup: "#e51937",
              Nokia: "#183693",
              NVIDIA: "#76b900",
              Opera: "#cc0f16",
              Path: "#e41f11",
              "PayPal (dark)": "#1e477a",
              "PayPal (light)": "#3b7bbf",
              Pinboard: "#0000e6",
              Pinterest: "#c8232c",
              PlayStation: "#665cbe",
              Pocket: "#ee4056",
              Prezi: "#318bff",
              Pusha: "#0f71b4",
              Quora: "#a82400",
              "QUOTE.fm": "#66ceff",
              Rdio: "#008fd5",
              Readability: "#9c0000",
              "Red Hat": "#cc0000",
              Resource: "#7eb400",
              Rockpack: "#0ba6ab",
              Roon: "#62b0d9",
              RSS: "#ee802f",
              Salesforce: "#1798c1",
              Samsung: "#0c4da2",
              Shopify: "#96bf48",
              Skype: "#00aff0",
              Snagajob: "#f47a20",
              Softonic: "#008ace",
              SoundCloud: "#ff7700",
              "Space Box": "#f86960",
              Spotify: "#81b71a",
              Sprint: "#fee100",
              Squarespace: "#121212",
              StackOverflow: "#ef8236",
              Staples: "#cc0000",
              "Status Chart": "#d7584f",
              Stripe: "#008cdd",
              StudyBlue: "#00afe1",
              StumbleUpon: "#f74425",
              "T-Mobile": "#ea0a8e",
              Technorati: "#40a800",
              "The Next Web": "#ef4423",
              Treehouse: "#5cb868",
              Trulia: "#5eab1f",
              Tumblr: "#34526f",
              "Twitch.tv": "#6441a5",
              Twitter: "#00acee",
              TYPO3: "#ff8700",
              Ubuntu: "#dd4814",
              Ustream: "#3388ff",
              Verizon: "#ef1d1d",
              Vimeo: "#86c9ef",
              Vine: "#00a478",
              Virb: "#06afd8",
              "Virgin Media": "#cc0000",
              Wooga: "#5b009c",
              "WordPress (blue)": "#21759b",
              "WordPress (orange)": "#d54e21",
              "WordPress (grey)": "#464646",
              Wunderlist: "#2b88d9",
              XBOX: "#9bc848",
              XING: "#126567",
              "Yahoo!": "#720e9e",
              Yandex: "#ffcc00",
              Yelp: "#c41200",
              YouTube: "#c4302b",
              Zalongo: "#5498dc",
              Zendesk: "#78a300",
              Zerply: "#9dcc7a",
              Zootool: "#5e8b1d",
            },
            _brandNames: function () {
              var s = [];
              for (var o in this._brandColors) s.push(o);
              return s;
            },
            dataImage: function (s, o) {
              var l;
              if (typeof document < "u") l = document.createElement("canvas");
              else {
                var u = r.require("canvas");
                l = new u();
              }
              var f = l && l.getContext && l.getContext("2d");
              if (!l || !f) return "";
              s || (s = this.pick(this._adSize)),
                (o = o !== void 0 ? o : s),
                (s = s.split("x"));
              var c = parseInt(s[0], 10),
                h = parseInt(s[1], 10),
                v = this._brandColors[this.pick(this._brandNames())],
                x = "#FFF",
                R = 14,
                g = "sans-serif";
              return (
                (l.width = c),
                (l.height = h),
                (f.textAlign = "center"),
                (f.textBaseline = "middle"),
                (f.fillStyle = v),
                f.fillRect(0, 0, c, h),
                (f.fillStyle = x),
                (f.font = "bold " + R + "px " + g),
                f.fillText(o, c / 2, h / 2, c),
                l.toDataURL("image/png")
              );
            },
          };
        }).call(t, n(9)(e));
      },
      function (e, t) {
        e.exports = function (n) {
          return (
            n.webpackPolyfill ||
              ((n.deprecate = function () {}),
              (n.paths = []),
              (n.children = []),
              (n.webpackPolyfill = 1)),
            n
          );
        };
      },
      function (e, t, n) {
        var r = n(11),
          s = n(12);
        e.exports = {
          color: function (o) {
            return o || s[o] ? s[o].nicer : this.hex();
          },
          hex: function () {
            var o = this._goldenRatioColor(),
              l = r.hsv2rgb(o),
              u = r.rgb2hex(l[0], l[1], l[2]);
            return u;
          },
          rgb: function () {
            var o = this._goldenRatioColor(),
              l = r.hsv2rgb(o);
            return (
              "rgb(" +
              parseInt(l[0], 10) +
              ", " +
              parseInt(l[1], 10) +
              ", " +
              parseInt(l[2], 10) +
              ")"
            );
          },
          rgba: function () {
            var o = this._goldenRatioColor(),
              l = r.hsv2rgb(o);
            return (
              "rgba(" +
              parseInt(l[0], 10) +
              ", " +
              parseInt(l[1], 10) +
              ", " +
              parseInt(l[2], 10) +
              ", " +
              Math.random().toFixed(2) +
              ")"
            );
          },
          hsl: function () {
            var o = this._goldenRatioColor(),
              l = r.hsv2hsl(o);
            return (
              "hsl(" +
              parseInt(l[0], 10) +
              ", " +
              parseInt(l[1], 10) +
              ", " +
              parseInt(l[2], 10) +
              ")"
            );
          },
          _goldenRatioColor: function (o, l) {
            return (
              (this._goldenRatio = 0.618033988749895),
              (this._hue = this._hue || Math.random()),
              (this._hue += this._goldenRatio),
              (this._hue %= 1),
              typeof o != "number" && (o = 0.5),
              typeof l != "number" && (l = 0.95),
              [this._hue * 360, o * 100, l * 100]
            );
          },
        };
      },
      function (e, t) {
        e.exports = {
          rgb2hsl: function (r) {
            var s = r[0] / 255,
              o = r[1] / 255,
              l = r[2] / 255,
              u = Math.min(s, o, l),
              f = Math.max(s, o, l),
              c = f - u,
              h,
              v,
              x;
            return (
              f == u
                ? (h = 0)
                : s == f
                ? (h = (o - l) / c)
                : o == f
                ? (h = 2 + (l - s) / c)
                : l == f && (h = 4 + (s - o) / c),
              (h = Math.min(h * 60, 360)),
              h < 0 && (h += 360),
              (x = (u + f) / 2),
              f == u
                ? (v = 0)
                : x <= 0.5
                ? (v = c / (f + u))
                : (v = c / (2 - f - u)),
              [h, v * 100, x * 100]
            );
          },
          rgb2hsv: function (r) {
            var s = r[0],
              o = r[1],
              l = r[2],
              u = Math.min(s, o, l),
              f = Math.max(s, o, l),
              c = f - u,
              h,
              v,
              x;
            return (
              f === 0 ? (v = 0) : (v = ((c / f) * 1e3) / 10),
              f == u
                ? (h = 0)
                : s == f
                ? (h = (o - l) / c)
                : o == f
                ? (h = 2 + (l - s) / c)
                : l == f && (h = 4 + (s - o) / c),
              (h = Math.min(h * 60, 360)),
              h < 0 && (h += 360),
              (x = ((f / 255) * 1e3) / 10),
              [h, v, x]
            );
          },
          hsl2rgb: function (r) {
            var s = r[0] / 360,
              o = r[1] / 100,
              l = r[2] / 100,
              u,
              f,
              c,
              h,
              v;
            if (o === 0) return (v = l * 255), [v, v, v];
            l < 0.5 ? (f = l * (1 + o)) : (f = l + o - l * o),
              (u = 2 * l - f),
              (h = [0, 0, 0]);
            for (var x = 0; x < 3; x++)
              (c = s + (1 / 3) * -(x - 1)),
                c < 0 && c++,
                c > 1 && c--,
                6 * c < 1
                  ? (v = u + (f - u) * 6 * c)
                  : 2 * c < 1
                  ? (v = f)
                  : 3 * c < 2
                  ? (v = u + (f - u) * (2 / 3 - c) * 6)
                  : (v = u),
                (h[x] = v * 255);
            return h;
          },
          hsl2hsv: function (r) {
            var s = r[0],
              o = r[1] / 100,
              l = r[2] / 100,
              u,
              f;
            return (
              (l *= 2),
              (o *= l <= 1 ? l : 2 - l),
              (f = (l + o) / 2),
              (u = (2 * o) / (l + o)),
              [s, u * 100, f * 100]
            );
          },
          hsv2rgb: function (r) {
            var s = r[0] / 60,
              o = r[1] / 100,
              l = r[2] / 100,
              u = Math.floor(s) % 6,
              f = s - Math.floor(s),
              c = 255 * l * (1 - o),
              h = 255 * l * (1 - o * f),
              v = 255 * l * (1 - o * (1 - f));
            switch (((l = 255 * l), u)) {
              case 0:
                return [l, v, c];
              case 1:
                return [h, l, c];
              case 2:
                return [c, l, v];
              case 3:
                return [c, h, l];
              case 4:
                return [v, c, l];
              case 5:
                return [l, c, h];
            }
          },
          hsv2hsl: function (r) {
            var s = r[0],
              o = r[1] / 100,
              l = r[2] / 100,
              u,
              f;
            return (
              (f = (2 - o) * l),
              (u = o * l),
              (u /= f <= 1 ? f : 2 - f),
              (f /= 2),
              [s, u * 100, f * 100]
            );
          },
          rgb2hex: function (n, r, s) {
            return (
              "#" + (((((256 + n) << 8) | r) << 8) | s).toString(16).slice(1)
            );
          },
          hex2rgb: function (n) {
            return (
              (n =
                ("0x" + n.slice(1).replace(n.length > 4 ? n : /./g, "$&$&")) |
                0),
              [n >> 16, (n >> 8) & 255, n & 255]
            );
          },
        };
      },
      function (e, t) {
        e.exports = {
          navy: { value: "#000080", nicer: "#001F3F" },
          blue: { value: "#0000ff", nicer: "#0074D9" },
          aqua: { value: "#00ffff", nicer: "#7FDBFF" },
          teal: { value: "#008080", nicer: "#39CCCC" },
          olive: { value: "#008000", nicer: "#3D9970" },
          green: { value: "#008000", nicer: "#2ECC40" },
          lime: { value: "#00ff00", nicer: "#01FF70" },
          yellow: { value: "#ffff00", nicer: "#FFDC00" },
          orange: { value: "#ffa500", nicer: "#FF851B" },
          red: { value: "#ff0000", nicer: "#FF4136" },
          maroon: { value: "#800000", nicer: "#85144B" },
          fuchsia: { value: "#ff00ff", nicer: "#F012BE" },
          purple: { value: "#800080", nicer: "#B10DC9" },
          silver: { value: "#c0c0c0", nicer: "#DDDDDD" },
          gray: { value: "#808080", nicer: "#AAAAAA" },
          black: { value: "#000000", nicer: "#111111" },
          white: { value: "#FFFFFF", nicer: "#FFFFFF" },
        };
      },
      function (e, t, n) {
        var r = n(6),
          s = n(14);
        function o(l, u, f, c) {
          return f === void 0
            ? r.natural(l, u)
            : c === void 0
            ? f
            : r.natural(parseInt(f, 10), parseInt(c, 10));
        }
        e.exports = {
          paragraph: function (l, u) {
            for (var f = o(3, 7, l, u), c = [], h = 0; h < f; h++)
              c.push(this.sentence());
            return c.join(" ");
          },
          cparagraph: function (l, u) {
            for (var f = o(3, 7, l, u), c = [], h = 0; h < f; h++)
              c.push(this.csentence());
            return c.join("");
          },
          sentence: function (l, u) {
            for (var f = o(12, 18, l, u), c = [], h = 0; h < f; h++)
              c.push(this.word());
            return s.capitalize(c.join(" ")) + ".";
          },
          csentence: function (l, u) {
            for (var f = o(12, 18, l, u), c = [], h = 0; h < f; h++)
              c.push(this.cword());
            return c.join("") + "。";
          },
          word: function (l, u) {
            for (var f = o(3, 10, l, u), c = "", h = 0; h < f; h++)
              c += r.character("lower");
            return c;
          },
          cword: function (l, u, f) {
            var c =
                "的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实加量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样与关各重新线内数正心反你明看原又么利比或但质气第向道命此变条只没结解问意建月公无系军很情者最立代想已通并提直题党程展五果料象员革位入常文总次品式活设及管特件长求老头基资边流路级少图山统接知较将组见计别她手角期根论运农指几九区强放决西被干做必战先回则任取据处队南给色光门即保治北造百规热领七海口东导器压志世金增争济阶油思术极交受联什认六共权收证改清己美再采转更单风切打白教速花带安场身车例真务具万每目至达走积示议声报斗完类八离华名确才科张信马节话米整空元况今集温传土许步群广石记需段研界拉林律叫且究观越织装影算低持音众书布复容儿须际商非验连断深难近矿千周委素技备半办青省列习响约支般史感劳便团往酸历市克何除消构府称太准精值号率族维划选标写存候毛亲快效斯院查江型眼王按格养易置派层片始却专状育厂京识适属圆包火住调满县局照参红细引听该铁价严龙飞",
              h;
            switch (arguments.length) {
              case 0:
                (l = c), (h = 1);
                break;
              case 1:
                typeof arguments[0] == "string" ? (h = 1) : ((h = l), (l = c));
                break;
              case 2:
                typeof arguments[0] == "string"
                  ? (h = u)
                  : ((h = this.natural(l, u)), (l = c));
                break;
              case 3:
                h = this.natural(u, f);
                break;
            }
            for (var v = "", x = 0; x < h; x++)
              v += l.charAt(this.natural(0, l.length - 1));
            return v;
          },
          title: function (l, u) {
            for (var f = o(3, 7, l, u), c = [], h = 0; h < f; h++)
              c.push(this.capitalize(this.word()));
            return c.join(" ");
          },
          ctitle: function (l, u) {
            for (var f = o(3, 7, l, u), c = [], h = 0; h < f; h++)
              c.push(this.cword());
            return c.join("");
          },
        };
      },
      function (e, t, n) {
        var r = n(3);
        e.exports = {
          capitalize: function (s) {
            return (s + "").charAt(0).toUpperCase() + (s + "").substr(1);
          },
          upper: function (s) {
            return (s + "").toUpperCase();
          },
          lower: function (s) {
            return (s + "").toLowerCase();
          },
          pick: function (o, l, u) {
            return (
              r.isArray(o)
                ? (l === void 0 && (l = 1), u === void 0 && (u = l))
                : ((o = [].slice.call(arguments)), (l = 1), (u = 1)),
              l === 1 && u === 1
                ? o[this.natural(0, o.length - 1)]
                : this.shuffle(o, l, u)
            );
          },
          shuffle: function (o, l, u) {
            o = o || [];
            for (
              var f = o.slice(0), c = [], h = 0, v = f.length, x = 0;
              x < v;
              x++
            )
              (h = this.natural(0, f.length - 1)), c.push(f[h]), f.splice(h, 1);
            switch (arguments.length) {
              case 0:
              case 1:
                return c;
              case 2:
                u = l;
              case 3:
                return (
                  (l = parseInt(l, 10)),
                  (u = parseInt(u, 10)),
                  c.slice(0, this.natural(l, u))
                );
            }
          },
          order: function s(o) {
            (s.cache = s.cache || {}),
              arguments.length > 1 && (o = [].slice.call(arguments, 0));
            var l = s.options,
              u = l.context.templatePath.join("."),
              f = (s.cache[u] = s.cache[u] || { index: 0, array: o });
            return f.array[f.index++ % f.array.length];
          },
        };
      },
      function (e, t) {
        e.exports = {
          first: function () {
            var n = [
              "James",
              "John",
              "Robert",
              "Michael",
              "William",
              "David",
              "Richard",
              "Charles",
              "Joseph",
              "Thomas",
              "Christopher",
              "Daniel",
              "Paul",
              "Mark",
              "Donald",
              "George",
              "Kenneth",
              "Steven",
              "Edward",
              "Brian",
              "Ronald",
              "Anthony",
              "Kevin",
              "Jason",
              "Matthew",
              "Gary",
              "Timothy",
              "Jose",
              "Larry",
              "Jeffrey",
              "Frank",
              "Scott",
              "Eric",
            ].concat([
              "Mary",
              "Patricia",
              "Linda",
              "Barbara",
              "Elizabeth",
              "Jennifer",
              "Maria",
              "Susan",
              "Margaret",
              "Dorothy",
              "Lisa",
              "Nancy",
              "Karen",
              "Betty",
              "Helen",
              "Sandra",
              "Donna",
              "Carol",
              "Ruth",
              "Sharon",
              "Michelle",
              "Laura",
              "Sarah",
              "Kimberly",
              "Deborah",
              "Jessica",
              "Shirley",
              "Cynthia",
              "Angela",
              "Melissa",
              "Brenda",
              "Amy",
              "Anna",
            ]);
            return this.pick(n);
          },
          last: function () {
            var n = [
              "Smith",
              "Johnson",
              "Williams",
              "Brown",
              "Jones",
              "Miller",
              "Davis",
              "Garcia",
              "Rodriguez",
              "Wilson",
              "Martinez",
              "Anderson",
              "Taylor",
              "Thomas",
              "Hernandez",
              "Moore",
              "Martin",
              "Jackson",
              "Thompson",
              "White",
              "Lopez",
              "Lee",
              "Gonzalez",
              "Harris",
              "Clark",
              "Lewis",
              "Robinson",
              "Walker",
              "Perez",
              "Hall",
              "Young",
              "Allen",
            ];
            return this.pick(n);
          },
          name: function (n) {
            return (
              this.first() + " " + (n ? this.first() + " " : "") + this.last()
            );
          },
          cfirst: function () {
            var n =
              "王 李 张 刘 陈 杨 赵 黄 周 吴 徐 孙 胡 朱 高 林 何 郭 马 罗 梁 宋 郑 谢 韩 唐 冯 于 董 萧 程 曹 袁 邓 许 傅 沈 曾 彭 吕 苏 卢 蒋 蔡 贾 丁 魏 薛 叶 阎 余 潘 杜 戴 夏 锺 汪 田 任 姜 范 方 石 姚 谭 廖 邹 熊 金 陆 郝 孔 白 崔 康 毛 邱 秦 江 史 顾 侯 邵 孟 龙 万 段 雷 钱 汤 尹 黎 易 常 武 乔 贺 赖 龚 文".split(
                " "
              );
            return this.pick(n);
          },
          clast: function () {
            var n =
              "伟 芳 娜 秀英 敏 静 丽 强 磊 军 洋 勇 艳 杰 娟 涛 明 超 秀兰 霞 平 刚 桂英".split(
                " "
              );
            return this.pick(n);
          },
          cname: function () {
            return this.cfirst() + this.clast();
          },
        };
      },
      function (e, t) {
        e.exports = {
          url: function (n, r) {
            return (
              (n || this.protocol()) +
              "://" +
              (r || this.domain()) +
              "/" +
              this.word()
            );
          },
          protocol: function () {
            return this.pick(
              "http ftp gopher mailto mid cid news nntp prospero telnet rlogin tn3270 wais".split(
                " "
              )
            );
          },
          domain: function (n) {
            return this.word() + "." + (n || this.tld());
          },
          tld: function () {
            return this.pick(
              "com net org edu gov int mil cn com.cn net.cn gov.cn org.cn 中国 中国互联.公司 中国互联.网络 tel biz cc tv info name hk mobi asia cd travel pro museum coop aero ad ae af ag ai al am an ao aq ar as at au aw az ba bb bd be bf bg bh bi bj bm bn bo br bs bt bv bw by bz ca cc cf cg ch ci ck cl cm cn co cq cr cu cv cx cy cz de dj dk dm do dz ec ee eg eh es et ev fi fj fk fm fo fr ga gb gd ge gf gh gi gl gm gn gp gr gt gu gw gy hk hm hn hr ht hu id ie il in io iq ir is it jm jo jp ke kg kh ki km kn kp kr kw ky kz la lb lc li lk lr ls lt lu lv ly ma mc md mg mh ml mm mn mo mp mq mr ms mt mv mw mx my mz na nc ne nf ng ni nl no np nr nt nu nz om qa pa pe pf pg ph pk pl pm pn pr pt pw py re ro ru rw sa sb sc sd se sg sh si sj sk sl sm sn so sr st su sy sz tc td tf tg th tj tk tm tn to tp tr tt tv tw tz ua ug uk us uy va vc ve vg vn vu wf ws ye yu za zm zr zw".split(
                " "
              )
            );
          },
          email: function (n) {
            return (
              this.character("lower") +
              "." +
              this.word() +
              "@" +
              (n || this.word() + "." + this.tld())
            );
          },
          ip: function () {
            return (
              this.natural(0, 255) +
              "." +
              this.natural(0, 255) +
              "." +
              this.natural(0, 255) +
              "." +
              this.natural(0, 255)
            );
          },
        };
      },
      function (e, t, n) {
        var r = n(18),
          s = ["东北", "华北", "华东", "华中", "华南", "西南", "西北"];
        e.exports = {
          region: function () {
            return this.pick(s);
          },
          province: function () {
            return this.pick(r).name;
          },
          city: function (o) {
            var l = this.pick(r),
              u = this.pick(l.children);
            return o ? [l.name, u.name].join(" ") : u.name;
          },
          county: function (o) {
            var l = this.pick(r),
              u = this.pick(l.children),
              f = this.pick(u.children) || { name: "-" };
            return o ? [l.name, u.name, f.name].join(" ") : f.name;
          },
          zip: function (o) {
            for (var l = "", u = 0; u < (o || 6); u++) l += this.natural(0, 9);
            return l;
          },
        };
      },
      function (e, t) {
        var n = {
          11e4: "北京",
          110100: "北京市",
          110101: "东城区",
          110102: "西城区",
          110105: "朝阳区",
          110106: "丰台区",
          110107: "石景山区",
          110108: "海淀区",
          110109: "门头沟区",
          110111: "房山区",
          110112: "通州区",
          110113: "顺义区",
          110114: "昌平区",
          110115: "大兴区",
          110116: "怀柔区",
          110117: "平谷区",
          110228: "密云县",
          110229: "延庆县",
          110230: "其它区",
          12e4: "天津",
          120100: "天津市",
          120101: "和平区",
          120102: "河东区",
          120103: "河西区",
          120104: "南开区",
          120105: "河北区",
          120106: "红桥区",
          120110: "东丽区",
          120111: "西青区",
          120112: "津南区",
          120113: "北辰区",
          120114: "武清区",
          120115: "宝坻区",
          120116: "滨海新区",
          120221: "宁河县",
          120223: "静海县",
          120225: "蓟县",
          120226: "其它区",
          13e4: "河北省",
          130100: "石家庄市",
          130102: "长安区",
          130103: "桥东区",
          130104: "桥西区",
          130105: "新华区",
          130107: "井陉矿区",
          130108: "裕华区",
          130121: "井陉县",
          130123: "正定县",
          130124: "栾城县",
          130125: "行唐县",
          130126: "灵寿县",
          130127: "高邑县",
          130128: "深泽县",
          130129: "赞皇县",
          130130: "无极县",
          130131: "平山县",
          130132: "元氏县",
          130133: "赵县",
          130181: "辛集市",
          130182: "藁城市",
          130183: "晋州市",
          130184: "新乐市",
          130185: "鹿泉市",
          130186: "其它区",
          130200: "唐山市",
          130202: "路南区",
          130203: "路北区",
          130204: "古冶区",
          130205: "开平区",
          130207: "丰南区",
          130208: "丰润区",
          130223: "滦县",
          130224: "滦南县",
          130225: "乐亭县",
          130227: "迁西县",
          130229: "玉田县",
          130230: "曹妃甸区",
          130281: "遵化市",
          130283: "迁安市",
          130284: "其它区",
          130300: "秦皇岛市",
          130302: "海港区",
          130303: "山海关区",
          130304: "北戴河区",
          130321: "青龙满族自治县",
          130322: "昌黎县",
          130323: "抚宁县",
          130324: "卢龙县",
          130398: "其它区",
          130400: "邯郸市",
          130402: "邯山区",
          130403: "丛台区",
          130404: "复兴区",
          130406: "峰峰矿区",
          130421: "邯郸县",
          130423: "临漳县",
          130424: "成安县",
          130425: "大名县",
          130426: "涉县",
          130427: "磁县",
          130428: "肥乡县",
          130429: "永年县",
          130430: "邱县",
          130431: "鸡泽县",
          130432: "广平县",
          130433: "馆陶县",
          130434: "魏县",
          130435: "曲周县",
          130481: "武安市",
          130482: "其它区",
          130500: "邢台市",
          130502: "桥东区",
          130503: "桥西区",
          130521: "邢台县",
          130522: "临城县",
          130523: "内丘县",
          130524: "柏乡县",
          130525: "隆尧县",
          130526: "任县",
          130527: "南和县",
          130528: "宁晋县",
          130529: "巨鹿县",
          130530: "新河县",
          130531: "广宗县",
          130532: "平乡县",
          130533: "威县",
          130534: "清河县",
          130535: "临西县",
          130581: "南宫市",
          130582: "沙河市",
          130583: "其它区",
          130600: "保定市",
          130602: "新市区",
          130603: "北市区",
          130604: "南市区",
          130621: "满城县",
          130622: "清苑县",
          130623: "涞水县",
          130624: "阜平县",
          130625: "徐水县",
          130626: "定兴县",
          130627: "唐县",
          130628: "高阳县",
          130629: "容城县",
          130630: "涞源县",
          130631: "望都县",
          130632: "安新县",
          130633: "易县",
          130634: "曲阳县",
          130635: "蠡县",
          130636: "顺平县",
          130637: "博野县",
          130638: "雄县",
          130681: "涿州市",
          130682: "定州市",
          130683: "安国市",
          130684: "高碑店市",
          130699: "其它区",
          130700: "张家口市",
          130702: "桥东区",
          130703: "桥西区",
          130705: "宣化区",
          130706: "下花园区",
          130721: "宣化县",
          130722: "张北县",
          130723: "康保县",
          130724: "沽源县",
          130725: "尚义县",
          130726: "蔚县",
          130727: "阳原县",
          130728: "怀安县",
          130729: "万全县",
          130730: "怀来县",
          130731: "涿鹿县",
          130732: "赤城县",
          130733: "崇礼县",
          130734: "其它区",
          130800: "承德市",
          130802: "双桥区",
          130803: "双滦区",
          130804: "鹰手营子矿区",
          130821: "承德县",
          130822: "兴隆县",
          130823: "平泉县",
          130824: "滦平县",
          130825: "隆化县",
          130826: "丰宁满族自治县",
          130827: "宽城满族自治县",
          130828: "围场满族蒙古族自治县",
          130829: "其它区",
          130900: "沧州市",
          130902: "新华区",
          130903: "运河区",
          130921: "沧县",
          130922: "青县",
          130923: "东光县",
          130924: "海兴县",
          130925: "盐山县",
          130926: "肃宁县",
          130927: "南皮县",
          130928: "吴桥县",
          130929: "献县",
          130930: "孟村回族自治县",
          130981: "泊头市",
          130982: "任丘市",
          130983: "黄骅市",
          130984: "河间市",
          130985: "其它区",
          131e3: "廊坊市",
          131002: "安次区",
          131003: "广阳区",
          131022: "固安县",
          131023: "永清县",
          131024: "香河县",
          131025: "大城县",
          131026: "文安县",
          131028: "大厂回族自治县",
          131081: "霸州市",
          131082: "三河市",
          131083: "其它区",
          131100: "衡水市",
          131102: "桃城区",
          131121: "枣强县",
          131122: "武邑县",
          131123: "武强县",
          131124: "饶阳县",
          131125: "安平县",
          131126: "故城县",
          131127: "景县",
          131128: "阜城县",
          131181: "冀州市",
          131182: "深州市",
          131183: "其它区",
          14e4: "山西省",
          140100: "太原市",
          140105: "小店区",
          140106: "迎泽区",
          140107: "杏花岭区",
          140108: "尖草坪区",
          140109: "万柏林区",
          140110: "晋源区",
          140121: "清徐县",
          140122: "阳曲县",
          140123: "娄烦县",
          140181: "古交市",
          140182: "其它区",
          140200: "大同市",
          140202: "城区",
          140203: "矿区",
          140211: "南郊区",
          140212: "新荣区",
          140221: "阳高县",
          140222: "天镇县",
          140223: "广灵县",
          140224: "灵丘县",
          140225: "浑源县",
          140226: "左云县",
          140227: "大同县",
          140228: "其它区",
          140300: "阳泉市",
          140302: "城区",
          140303: "矿区",
          140311: "郊区",
          140321: "平定县",
          140322: "盂县",
          140323: "其它区",
          140400: "长治市",
          140421: "长治县",
          140423: "襄垣县",
          140424: "屯留县",
          140425: "平顺县",
          140426: "黎城县",
          140427: "壶关县",
          140428: "长子县",
          140429: "武乡县",
          140430: "沁县",
          140431: "沁源县",
          140481: "潞城市",
          140482: "城区",
          140483: "郊区",
          140485: "其它区",
          140500: "晋城市",
          140502: "城区",
          140521: "沁水县",
          140522: "阳城县",
          140524: "陵川县",
          140525: "泽州县",
          140581: "高平市",
          140582: "其它区",
          140600: "朔州市",
          140602: "朔城区",
          140603: "平鲁区",
          140621: "山阴县",
          140622: "应县",
          140623: "右玉县",
          140624: "怀仁县",
          140625: "其它区",
          140700: "晋中市",
          140702: "榆次区",
          140721: "榆社县",
          140722: "左权县",
          140723: "和顺县",
          140724: "昔阳县",
          140725: "寿阳县",
          140726: "太谷县",
          140727: "祁县",
          140728: "平遥县",
          140729: "灵石县",
          140781: "介休市",
          140782: "其它区",
          140800: "运城市",
          140802: "盐湖区",
          140821: "临猗县",
          140822: "万荣县",
          140823: "闻喜县",
          140824: "稷山县",
          140825: "新绛县",
          140826: "绛县",
          140827: "垣曲县",
          140828: "夏县",
          140829: "平陆县",
          140830: "芮城县",
          140881: "永济市",
          140882: "河津市",
          140883: "其它区",
          140900: "忻州市",
          140902: "忻府区",
          140921: "定襄县",
          140922: "五台县",
          140923: "代县",
          140924: "繁峙县",
          140925: "宁武县",
          140926: "静乐县",
          140927: "神池县",
          140928: "五寨县",
          140929: "岢岚县",
          140930: "河曲县",
          140931: "保德县",
          140932: "偏关县",
          140981: "原平市",
          140982: "其它区",
          141e3: "临汾市",
          141002: "尧都区",
          141021: "曲沃县",
          141022: "翼城县",
          141023: "襄汾县",
          141024: "洪洞县",
          141025: "古县",
          141026: "安泽县",
          141027: "浮山县",
          141028: "吉县",
          141029: "乡宁县",
          141030: "大宁县",
          141031: "隰县",
          141032: "永和县",
          141033: "蒲县",
          141034: "汾西县",
          141081: "侯马市",
          141082: "霍州市",
          141083: "其它区",
          141100: "吕梁市",
          141102: "离石区",
          141121: "文水县",
          141122: "交城县",
          141123: "兴县",
          141124: "临县",
          141125: "柳林县",
          141126: "石楼县",
          141127: "岚县",
          141128: "方山县",
          141129: "中阳县",
          141130: "交口县",
          141181: "孝义市",
          141182: "汾阳市",
          141183: "其它区",
          15e4: "内蒙古自治区",
          150100: "呼和浩特市",
          150102: "新城区",
          150103: "回民区",
          150104: "玉泉区",
          150105: "赛罕区",
          150121: "土默特左旗",
          150122: "托克托县",
          150123: "和林格尔县",
          150124: "清水河县",
          150125: "武川县",
          150126: "其它区",
          150200: "包头市",
          150202: "东河区",
          150203: "昆都仑区",
          150204: "青山区",
          150205: "石拐区",
          150206: "白云鄂博矿区",
          150207: "九原区",
          150221: "土默特右旗",
          150222: "固阳县",
          150223: "达尔罕茂明安联合旗",
          150224: "其它区",
          150300: "乌海市",
          150302: "海勃湾区",
          150303: "海南区",
          150304: "乌达区",
          150305: "其它区",
          150400: "赤峰市",
          150402: "红山区",
          150403: "元宝山区",
          150404: "松山区",
          150421: "阿鲁科尔沁旗",
          150422: "巴林左旗",
          150423: "巴林右旗",
          150424: "林西县",
          150425: "克什克腾旗",
          150426: "翁牛特旗",
          150428: "喀喇沁旗",
          150429: "宁城县",
          150430: "敖汉旗",
          150431: "其它区",
          150500: "通辽市",
          150502: "科尔沁区",
          150521: "科尔沁左翼中旗",
          150522: "科尔沁左翼后旗",
          150523: "开鲁县",
          150524: "库伦旗",
          150525: "奈曼旗",
          150526: "扎鲁特旗",
          150581: "霍林郭勒市",
          150582: "其它区",
          150600: "鄂尔多斯市",
          150602: "东胜区",
          150621: "达拉特旗",
          150622: "准格尔旗",
          150623: "鄂托克前旗",
          150624: "鄂托克旗",
          150625: "杭锦旗",
          150626: "乌审旗",
          150627: "伊金霍洛旗",
          150628: "其它区",
          150700: "呼伦贝尔市",
          150702: "海拉尔区",
          150703: "扎赉诺尔区",
          150721: "阿荣旗",
          150722: "莫力达瓦达斡尔族自治旗",
          150723: "鄂伦春自治旗",
          150724: "鄂温克族自治旗",
          150725: "陈巴尔虎旗",
          150726: "新巴尔虎左旗",
          150727: "新巴尔虎右旗",
          150781: "满洲里市",
          150782: "牙克石市",
          150783: "扎兰屯市",
          150784: "额尔古纳市",
          150785: "根河市",
          150786: "其它区",
          150800: "巴彦淖尔市",
          150802: "临河区",
          150821: "五原县",
          150822: "磴口县",
          150823: "乌拉特前旗",
          150824: "乌拉特中旗",
          150825: "乌拉特后旗",
          150826: "杭锦后旗",
          150827: "其它区",
          150900: "乌兰察布市",
          150902: "集宁区",
          150921: "卓资县",
          150922: "化德县",
          150923: "商都县",
          150924: "兴和县",
          150925: "凉城县",
          150926: "察哈尔右翼前旗",
          150927: "察哈尔右翼中旗",
          150928: "察哈尔右翼后旗",
          150929: "四子王旗",
          150981: "丰镇市",
          150982: "其它区",
          152200: "兴安盟",
          152201: "乌兰浩特市",
          152202: "阿尔山市",
          152221: "科尔沁右翼前旗",
          152222: "科尔沁右翼中旗",
          152223: "扎赉特旗",
          152224: "突泉县",
          152225: "其它区",
          152500: "锡林郭勒盟",
          152501: "二连浩特市",
          152502: "锡林浩特市",
          152522: "阿巴嘎旗",
          152523: "苏尼特左旗",
          152524: "苏尼特右旗",
          152525: "东乌珠穆沁旗",
          152526: "西乌珠穆沁旗",
          152527: "太仆寺旗",
          152528: "镶黄旗",
          152529: "正镶白旗",
          152530: "正蓝旗",
          152531: "多伦县",
          152532: "其它区",
          152900: "阿拉善盟",
          152921: "阿拉善左旗",
          152922: "阿拉善右旗",
          152923: "额济纳旗",
          152924: "其它区",
          21e4: "辽宁省",
          210100: "沈阳市",
          210102: "和平区",
          210103: "沈河区",
          210104: "大东区",
          210105: "皇姑区",
          210106: "铁西区",
          210111: "苏家屯区",
          210112: "东陵区",
          210113: "新城子区",
          210114: "于洪区",
          210122: "辽中县",
          210123: "康平县",
          210124: "法库县",
          210181: "新民市",
          210184: "沈北新区",
          210185: "其它区",
          210200: "大连市",
          210202: "中山区",
          210203: "西岗区",
          210204: "沙河口区",
          210211: "甘井子区",
          210212: "旅顺口区",
          210213: "金州区",
          210224: "长海县",
          210281: "瓦房店市",
          210282: "普兰店市",
          210283: "庄河市",
          210298: "其它区",
          210300: "鞍山市",
          210302: "铁东区",
          210303: "铁西区",
          210304: "立山区",
          210311: "千山区",
          210321: "台安县",
          210323: "岫岩满族自治县",
          210381: "海城市",
          210382: "其它区",
          210400: "抚顺市",
          210402: "新抚区",
          210403: "东洲区",
          210404: "望花区",
          210411: "顺城区",
          210421: "抚顺县",
          210422: "新宾满族自治县",
          210423: "清原满族自治县",
          210424: "其它区",
          210500: "本溪市",
          210502: "平山区",
          210503: "溪湖区",
          210504: "明山区",
          210505: "南芬区",
          210521: "本溪满族自治县",
          210522: "桓仁满族自治县",
          210523: "其它区",
          210600: "丹东市",
          210602: "元宝区",
          210603: "振兴区",
          210604: "振安区",
          210624: "宽甸满族自治县",
          210681: "东港市",
          210682: "凤城市",
          210683: "其它区",
          210700: "锦州市",
          210702: "古塔区",
          210703: "凌河区",
          210711: "太和区",
          210726: "黑山县",
          210727: "义县",
          210781: "凌海市",
          210782: "北镇市",
          210783: "其它区",
          210800: "营口市",
          210802: "站前区",
          210803: "西市区",
          210804: "鲅鱼圈区",
          210811: "老边区",
          210881: "盖州市",
          210882: "大石桥市",
          210883: "其它区",
          210900: "阜新市",
          210902: "海州区",
          210903: "新邱区",
          210904: "太平区",
          210905: "清河门区",
          210911: "细河区",
          210921: "阜新蒙古族自治县",
          210922: "彰武县",
          210923: "其它区",
          211e3: "辽阳市",
          211002: "白塔区",
          211003: "文圣区",
          211004: "宏伟区",
          211005: "弓长岭区",
          211011: "太子河区",
          211021: "辽阳县",
          211081: "灯塔市",
          211082: "其它区",
          211100: "盘锦市",
          211102: "双台子区",
          211103: "兴隆台区",
          211121: "大洼县",
          211122: "盘山县",
          211123: "其它区",
          211200: "铁岭市",
          211202: "银州区",
          211204: "清河区",
          211221: "铁岭县",
          211223: "西丰县",
          211224: "昌图县",
          211281: "调兵山市",
          211282: "开原市",
          211283: "其它区",
          211300: "朝阳市",
          211302: "双塔区",
          211303: "龙城区",
          211321: "朝阳县",
          211322: "建平县",
          211324: "喀喇沁左翼蒙古族自治县",
          211381: "北票市",
          211382: "凌源市",
          211383: "其它区",
          211400: "葫芦岛市",
          211402: "连山区",
          211403: "龙港区",
          211404: "南票区",
          211421: "绥中县",
          211422: "建昌县",
          211481: "兴城市",
          211482: "其它区",
          22e4: "吉林省",
          220100: "长春市",
          220102: "南关区",
          220103: "宽城区",
          220104: "朝阳区",
          220105: "二道区",
          220106: "绿园区",
          220112: "双阳区",
          220122: "农安县",
          220181: "九台市",
          220182: "榆树市",
          220183: "德惠市",
          220188: "其它区",
          220200: "吉林市",
          220202: "昌邑区",
          220203: "龙潭区",
          220204: "船营区",
          220211: "丰满区",
          220221: "永吉县",
          220281: "蛟河市",
          220282: "桦甸市",
          220283: "舒兰市",
          220284: "磐石市",
          220285: "其它区",
          220300: "四平市",
          220302: "铁西区",
          220303: "铁东区",
          220322: "梨树县",
          220323: "伊通满族自治县",
          220381: "公主岭市",
          220382: "双辽市",
          220383: "其它区",
          220400: "辽源市",
          220402: "龙山区",
          220403: "西安区",
          220421: "东丰县",
          220422: "东辽县",
          220423: "其它区",
          220500: "通化市",
          220502: "东昌区",
          220503: "二道江区",
          220521: "通化县",
          220523: "辉南县",
          220524: "柳河县",
          220581: "梅河口市",
          220582: "集安市",
          220583: "其它区",
          220600: "白山市",
          220602: "浑江区",
          220621: "抚松县",
          220622: "靖宇县",
          220623: "长白朝鲜族自治县",
          220625: "江源区",
          220681: "临江市",
          220682: "其它区",
          220700: "松原市",
          220702: "宁江区",
          220721: "前郭尔罗斯蒙古族自治县",
          220722: "长岭县",
          220723: "乾安县",
          220724: "扶余市",
          220725: "其它区",
          220800: "白城市",
          220802: "洮北区",
          220821: "镇赉县",
          220822: "通榆县",
          220881: "洮南市",
          220882: "大安市",
          220883: "其它区",
          222400: "延边朝鲜族自治州",
          222401: "延吉市",
          222402: "图们市",
          222403: "敦化市",
          222404: "珲春市",
          222405: "龙井市",
          222406: "和龙市",
          222424: "汪清县",
          222426: "安图县",
          222427: "其它区",
          23e4: "黑龙江省",
          230100: "哈尔滨市",
          230102: "道里区",
          230103: "南岗区",
          230104: "道外区",
          230106: "香坊区",
          230108: "平房区",
          230109: "松北区",
          230111: "呼兰区",
          230123: "依兰县",
          230124: "方正县",
          230125: "宾县",
          230126: "巴彦县",
          230127: "木兰县",
          230128: "通河县",
          230129: "延寿县",
          230181: "阿城区",
          230182: "双城市",
          230183: "尚志市",
          230184: "五常市",
          230186: "其它区",
          230200: "齐齐哈尔市",
          230202: "龙沙区",
          230203: "建华区",
          230204: "铁锋区",
          230205: "昂昂溪区",
          230206: "富拉尔基区",
          230207: "碾子山区",
          230208: "梅里斯达斡尔族区",
          230221: "龙江县",
          230223: "依安县",
          230224: "泰来县",
          230225: "甘南县",
          230227: "富裕县",
          230229: "克山县",
          230230: "克东县",
          230231: "拜泉县",
          230281: "讷河市",
          230282: "其它区",
          230300: "鸡西市",
          230302: "鸡冠区",
          230303: "恒山区",
          230304: "滴道区",
          230305: "梨树区",
          230306: "城子河区",
          230307: "麻山区",
          230321: "鸡东县",
          230381: "虎林市",
          230382: "密山市",
          230383: "其它区",
          230400: "鹤岗市",
          230402: "向阳区",
          230403: "工农区",
          230404: "南山区",
          230405: "兴安区",
          230406: "东山区",
          230407: "兴山区",
          230421: "萝北县",
          230422: "绥滨县",
          230423: "其它区",
          230500: "双鸭山市",
          230502: "尖山区",
          230503: "岭东区",
          230505: "四方台区",
          230506: "宝山区",
          230521: "集贤县",
          230522: "友谊县",
          230523: "宝清县",
          230524: "饶河县",
          230525: "其它区",
          230600: "大庆市",
          230602: "萨尔图区",
          230603: "龙凤区",
          230604: "让胡路区",
          230605: "红岗区",
          230606: "大同区",
          230621: "肇州县",
          230622: "肇源县",
          230623: "林甸县",
          230624: "杜尔伯特蒙古族自治县",
          230625: "其它区",
          230700: "伊春市",
          230702: "伊春区",
          230703: "南岔区",
          230704: "友好区",
          230705: "西林区",
          230706: "翠峦区",
          230707: "新青区",
          230708: "美溪区",
          230709: "金山屯区",
          230710: "五营区",
          230711: "乌马河区",
          230712: "汤旺河区",
          230713: "带岭区",
          230714: "乌伊岭区",
          230715: "红星区",
          230716: "上甘岭区",
          230722: "嘉荫县",
          230781: "铁力市",
          230782: "其它区",
          230800: "佳木斯市",
          230803: "向阳区",
          230804: "前进区",
          230805: "东风区",
          230811: "郊区",
          230822: "桦南县",
          230826: "桦川县",
          230828: "汤原县",
          230833: "抚远县",
          230881: "同江市",
          230882: "富锦市",
          230883: "其它区",
          230900: "七台河市",
          230902: "新兴区",
          230903: "桃山区",
          230904: "茄子河区",
          230921: "勃利县",
          230922: "其它区",
          231e3: "牡丹江市",
          231002: "东安区",
          231003: "阳明区",
          231004: "爱民区",
          231005: "西安区",
          231024: "东宁县",
          231025: "林口县",
          231081: "绥芬河市",
          231083: "海林市",
          231084: "宁安市",
          231085: "穆棱市",
          231086: "其它区",
          231100: "黑河市",
          231102: "爱辉区",
          231121: "嫩江县",
          231123: "逊克县",
          231124: "孙吴县",
          231181: "北安市",
          231182: "五大连池市",
          231183: "其它区",
          231200: "绥化市",
          231202: "北林区",
          231221: "望奎县",
          231222: "兰西县",
          231223: "青冈县",
          231224: "庆安县",
          231225: "明水县",
          231226: "绥棱县",
          231281: "安达市",
          231282: "肇东市",
          231283: "海伦市",
          231284: "其它区",
          232700: "大兴安岭地区",
          232702: "松岭区",
          232703: "新林区",
          232704: "呼中区",
          232721: "呼玛县",
          232722: "塔河县",
          232723: "漠河县",
          232724: "加格达奇区",
          232725: "其它区",
          31e4: "上海",
          310100: "上海市",
          310101: "黄浦区",
          310104: "徐汇区",
          310105: "长宁区",
          310106: "静安区",
          310107: "普陀区",
          310108: "闸北区",
          310109: "虹口区",
          310110: "杨浦区",
          310112: "闵行区",
          310113: "宝山区",
          310114: "嘉定区",
          310115: "浦东新区",
          310116: "金山区",
          310117: "松江区",
          310118: "青浦区",
          310120: "奉贤区",
          310230: "崇明县",
          310231: "其它区",
          32e4: "江苏省",
          320100: "南京市",
          320102: "玄武区",
          320104: "秦淮区",
          320105: "建邺区",
          320106: "鼓楼区",
          320111: "浦口区",
          320113: "栖霞区",
          320114: "雨花台区",
          320115: "江宁区",
          320116: "六合区",
          320124: "溧水区",
          320125: "高淳区",
          320126: "其它区",
          320200: "无锡市",
          320202: "崇安区",
          320203: "南长区",
          320204: "北塘区",
          320205: "锡山区",
          320206: "惠山区",
          320211: "滨湖区",
          320281: "江阴市",
          320282: "宜兴市",
          320297: "其它区",
          320300: "徐州市",
          320302: "鼓楼区",
          320303: "云龙区",
          320305: "贾汪区",
          320311: "泉山区",
          320321: "丰县",
          320322: "沛县",
          320323: "铜山区",
          320324: "睢宁县",
          320381: "新沂市",
          320382: "邳州市",
          320383: "其它区",
          320400: "常州市",
          320402: "天宁区",
          320404: "钟楼区",
          320405: "戚墅堰区",
          320411: "新北区",
          320412: "武进区",
          320481: "溧阳市",
          320482: "金坛市",
          320483: "其它区",
          320500: "苏州市",
          320505: "虎丘区",
          320506: "吴中区",
          320507: "相城区",
          320508: "姑苏区",
          320581: "常熟市",
          320582: "张家港市",
          320583: "昆山市",
          320584: "吴江区",
          320585: "太仓市",
          320596: "其它区",
          320600: "南通市",
          320602: "崇川区",
          320611: "港闸区",
          320612: "通州区",
          320621: "海安县",
          320623: "如东县",
          320681: "启东市",
          320682: "如皋市",
          320684: "海门市",
          320694: "其它区",
          320700: "连云港市",
          320703: "连云区",
          320705: "新浦区",
          320706: "海州区",
          320721: "赣榆县",
          320722: "东海县",
          320723: "灌云县",
          320724: "灌南县",
          320725: "其它区",
          320800: "淮安市",
          320802: "清河区",
          320803: "淮安区",
          320804: "淮阴区",
          320811: "清浦区",
          320826: "涟水县",
          320829: "洪泽县",
          320830: "盱眙县",
          320831: "金湖县",
          320832: "其它区",
          320900: "盐城市",
          320902: "亭湖区",
          320903: "盐都区",
          320921: "响水县",
          320922: "滨海县",
          320923: "阜宁县",
          320924: "射阳县",
          320925: "建湖县",
          320981: "东台市",
          320982: "大丰市",
          320983: "其它区",
          321e3: "扬州市",
          321002: "广陵区",
          321003: "邗江区",
          321023: "宝应县",
          321081: "仪征市",
          321084: "高邮市",
          321088: "江都区",
          321093: "其它区",
          321100: "镇江市",
          321102: "京口区",
          321111: "润州区",
          321112: "丹徒区",
          321181: "丹阳市",
          321182: "扬中市",
          321183: "句容市",
          321184: "其它区",
          321200: "泰州市",
          321202: "海陵区",
          321203: "高港区",
          321281: "兴化市",
          321282: "靖江市",
          321283: "泰兴市",
          321284: "姜堰区",
          321285: "其它区",
          321300: "宿迁市",
          321302: "宿城区",
          321311: "宿豫区",
          321322: "沭阳县",
          321323: "泗阳县",
          321324: "泗洪县",
          321325: "其它区",
          33e4: "浙江省",
          330100: "杭州市",
          330102: "上城区",
          330103: "下城区",
          330104: "江干区",
          330105: "拱墅区",
          330106: "西湖区",
          330108: "滨江区",
          330109: "萧山区",
          330110: "余杭区",
          330122: "桐庐县",
          330127: "淳安县",
          330182: "建德市",
          330183: "富阳市",
          330185: "临安市",
          330186: "其它区",
          330200: "宁波市",
          330203: "海曙区",
          330204: "江东区",
          330205: "江北区",
          330206: "北仑区",
          330211: "镇海区",
          330212: "鄞州区",
          330225: "象山县",
          330226: "宁海县",
          330281: "余姚市",
          330282: "慈溪市",
          330283: "奉化市",
          330284: "其它区",
          330300: "温州市",
          330302: "鹿城区",
          330303: "龙湾区",
          330304: "瓯海区",
          330322: "洞头县",
          330324: "永嘉县",
          330326: "平阳县",
          330327: "苍南县",
          330328: "文成县",
          330329: "泰顺县",
          330381: "瑞安市",
          330382: "乐清市",
          330383: "其它区",
          330400: "嘉兴市",
          330402: "南湖区",
          330411: "秀洲区",
          330421: "嘉善县",
          330424: "海盐县",
          330481: "海宁市",
          330482: "平湖市",
          330483: "桐乡市",
          330484: "其它区",
          330500: "湖州市",
          330502: "吴兴区",
          330503: "南浔区",
          330521: "德清县",
          330522: "长兴县",
          330523: "安吉县",
          330524: "其它区",
          330600: "绍兴市",
          330602: "越城区",
          330621: "绍兴县",
          330624: "新昌县",
          330681: "诸暨市",
          330682: "上虞市",
          330683: "嵊州市",
          330684: "其它区",
          330700: "金华市",
          330702: "婺城区",
          330703: "金东区",
          330723: "武义县",
          330726: "浦江县",
          330727: "磐安县",
          330781: "兰溪市",
          330782: "义乌市",
          330783: "东阳市",
          330784: "永康市",
          330785: "其它区",
          330800: "衢州市",
          330802: "柯城区",
          330803: "衢江区",
          330822: "常山县",
          330824: "开化县",
          330825: "龙游县",
          330881: "江山市",
          330882: "其它区",
          330900: "舟山市",
          330902: "定海区",
          330903: "普陀区",
          330921: "岱山县",
          330922: "嵊泗县",
          330923: "其它区",
          331e3: "台州市",
          331002: "椒江区",
          331003: "黄岩区",
          331004: "路桥区",
          331021: "玉环县",
          331022: "三门县",
          331023: "天台县",
          331024: "仙居县",
          331081: "温岭市",
          331082: "临海市",
          331083: "其它区",
          331100: "丽水市",
          331102: "莲都区",
          331121: "青田县",
          331122: "缙云县",
          331123: "遂昌县",
          331124: "松阳县",
          331125: "云和县",
          331126: "庆元县",
          331127: "景宁畲族自治县",
          331181: "龙泉市",
          331182: "其它区",
          34e4: "安徽省",
          340100: "合肥市",
          340102: "瑶海区",
          340103: "庐阳区",
          340104: "蜀山区",
          340111: "包河区",
          340121: "长丰县",
          340122: "肥东县",
          340123: "肥西县",
          340192: "其它区",
          340200: "芜湖市",
          340202: "镜湖区",
          340203: "弋江区",
          340207: "鸠江区",
          340208: "三山区",
          340221: "芜湖县",
          340222: "繁昌县",
          340223: "南陵县",
          340224: "其它区",
          340300: "蚌埠市",
          340302: "龙子湖区",
          340303: "蚌山区",
          340304: "禹会区",
          340311: "淮上区",
          340321: "怀远县",
          340322: "五河县",
          340323: "固镇县",
          340324: "其它区",
          340400: "淮南市",
          340402: "大通区",
          340403: "田家庵区",
          340404: "谢家集区",
          340405: "八公山区",
          340406: "潘集区",
          340421: "凤台县",
          340422: "其它区",
          340500: "马鞍山市",
          340503: "花山区",
          340504: "雨山区",
          340506: "博望区",
          340521: "当涂县",
          340522: "其它区",
          340600: "淮北市",
          340602: "杜集区",
          340603: "相山区",
          340604: "烈山区",
          340621: "濉溪县",
          340622: "其它区",
          340700: "铜陵市",
          340702: "铜官山区",
          340703: "狮子山区",
          340711: "郊区",
          340721: "铜陵县",
          340722: "其它区",
          340800: "安庆市",
          340802: "迎江区",
          340803: "大观区",
          340811: "宜秀区",
          340822: "怀宁县",
          340823: "枞阳县",
          340824: "潜山县",
          340825: "太湖县",
          340826: "宿松县",
          340827: "望江县",
          340828: "岳西县",
          340881: "桐城市",
          340882: "其它区",
          341e3: "黄山市",
          341002: "屯溪区",
          341003: "黄山区",
          341004: "徽州区",
          341021: "歙县",
          341022: "休宁县",
          341023: "黟县",
          341024: "祁门县",
          341025: "其它区",
          341100: "滁州市",
          341102: "琅琊区",
          341103: "南谯区",
          341122: "来安县",
          341124: "全椒县",
          341125: "定远县",
          341126: "凤阳县",
          341181: "天长市",
          341182: "明光市",
          341183: "其它区",
          341200: "阜阳市",
          341202: "颍州区",
          341203: "颍东区",
          341204: "颍泉区",
          341221: "临泉县",
          341222: "太和县",
          341225: "阜南县",
          341226: "颍上县",
          341282: "界首市",
          341283: "其它区",
          341300: "宿州市",
          341302: "埇桥区",
          341321: "砀山县",
          341322: "萧县",
          341323: "灵璧县",
          341324: "泗县",
          341325: "其它区",
          341400: "巢湖市",
          341421: "庐江县",
          341422: "无为县",
          341423: "含山县",
          341424: "和县",
          341500: "六安市",
          341502: "金安区",
          341503: "裕安区",
          341521: "寿县",
          341522: "霍邱县",
          341523: "舒城县",
          341524: "金寨县",
          341525: "霍山县",
          341526: "其它区",
          341600: "亳州市",
          341602: "谯城区",
          341621: "涡阳县",
          341622: "蒙城县",
          341623: "利辛县",
          341624: "其它区",
          341700: "池州市",
          341702: "贵池区",
          341721: "东至县",
          341722: "石台县",
          341723: "青阳县",
          341724: "其它区",
          341800: "宣城市",
          341802: "宣州区",
          341821: "郎溪县",
          341822: "广德县",
          341823: "泾县",
          341824: "绩溪县",
          341825: "旌德县",
          341881: "宁国市",
          341882: "其它区",
          35e4: "福建省",
          350100: "福州市",
          350102: "鼓楼区",
          350103: "台江区",
          350104: "仓山区",
          350105: "马尾区",
          350111: "晋安区",
          350121: "闽侯县",
          350122: "连江县",
          350123: "罗源县",
          350124: "闽清县",
          350125: "永泰县",
          350128: "平潭县",
          350181: "福清市",
          350182: "长乐市",
          350183: "其它区",
          350200: "厦门市",
          350203: "思明区",
          350205: "海沧区",
          350206: "湖里区",
          350211: "集美区",
          350212: "同安区",
          350213: "翔安区",
          350214: "其它区",
          350300: "莆田市",
          350302: "城厢区",
          350303: "涵江区",
          350304: "荔城区",
          350305: "秀屿区",
          350322: "仙游县",
          350323: "其它区",
          350400: "三明市",
          350402: "梅列区",
          350403: "三元区",
          350421: "明溪县",
          350423: "清流县",
          350424: "宁化县",
          350425: "大田县",
          350426: "尤溪县",
          350427: "沙县",
          350428: "将乐县",
          350429: "泰宁县",
          350430: "建宁县",
          350481: "永安市",
          350482: "其它区",
          350500: "泉州市",
          350502: "鲤城区",
          350503: "丰泽区",
          350504: "洛江区",
          350505: "泉港区",
          350521: "惠安县",
          350524: "安溪县",
          350525: "永春县",
          350526: "德化县",
          350527: "金门县",
          350581: "石狮市",
          350582: "晋江市",
          350583: "南安市",
          350584: "其它区",
          350600: "漳州市",
          350602: "芗城区",
          350603: "龙文区",
          350622: "云霄县",
          350623: "漳浦县",
          350624: "诏安县",
          350625: "长泰县",
          350626: "东山县",
          350627: "南靖县",
          350628: "平和县",
          350629: "华安县",
          350681: "龙海市",
          350682: "其它区",
          350700: "南平市",
          350702: "延平区",
          350721: "顺昌县",
          350722: "浦城县",
          350723: "光泽县",
          350724: "松溪县",
          350725: "政和县",
          350781: "邵武市",
          350782: "武夷山市",
          350783: "建瓯市",
          350784: "建阳市",
          350785: "其它区",
          350800: "龙岩市",
          350802: "新罗区",
          350821: "长汀县",
          350822: "永定县",
          350823: "上杭县",
          350824: "武平县",
          350825: "连城县",
          350881: "漳平市",
          350882: "其它区",
          350900: "宁德市",
          350902: "蕉城区",
          350921: "霞浦县",
          350922: "古田县",
          350923: "屏南县",
          350924: "寿宁县",
          350925: "周宁县",
          350926: "柘荣县",
          350981: "福安市",
          350982: "福鼎市",
          350983: "其它区",
          36e4: "江西省",
          360100: "南昌市",
          360102: "东湖区",
          360103: "西湖区",
          360104: "青云谱区",
          360105: "湾里区",
          360111: "青山湖区",
          360121: "南昌县",
          360122: "新建县",
          360123: "安义县",
          360124: "进贤县",
          360128: "其它区",
          360200: "景德镇市",
          360202: "昌江区",
          360203: "珠山区",
          360222: "浮梁县",
          360281: "乐平市",
          360282: "其它区",
          360300: "萍乡市",
          360302: "安源区",
          360313: "湘东区",
          360321: "莲花县",
          360322: "上栗县",
          360323: "芦溪县",
          360324: "其它区",
          360400: "九江市",
          360402: "庐山区",
          360403: "浔阳区",
          360421: "九江县",
          360423: "武宁县",
          360424: "修水县",
          360425: "永修县",
          360426: "德安县",
          360427: "星子县",
          360428: "都昌县",
          360429: "湖口县",
          360430: "彭泽县",
          360481: "瑞昌市",
          360482: "其它区",
          360483: "共青城市",
          360500: "新余市",
          360502: "渝水区",
          360521: "分宜县",
          360522: "其它区",
          360600: "鹰潭市",
          360602: "月湖区",
          360622: "余江县",
          360681: "贵溪市",
          360682: "其它区",
          360700: "赣州市",
          360702: "章贡区",
          360721: "赣县",
          360722: "信丰县",
          360723: "大余县",
          360724: "上犹县",
          360725: "崇义县",
          360726: "安远县",
          360727: "龙南县",
          360728: "定南县",
          360729: "全南县",
          360730: "宁都县",
          360731: "于都县",
          360732: "兴国县",
          360733: "会昌县",
          360734: "寻乌县",
          360735: "石城县",
          360781: "瑞金市",
          360782: "南康市",
          360783: "其它区",
          360800: "吉安市",
          360802: "吉州区",
          360803: "青原区",
          360821: "吉安县",
          360822: "吉水县",
          360823: "峡江县",
          360824: "新干县",
          360825: "永丰县",
          360826: "泰和县",
          360827: "遂川县",
          360828: "万安县",
          360829: "安福县",
          360830: "永新县",
          360881: "井冈山市",
          360882: "其它区",
          360900: "宜春市",
          360902: "袁州区",
          360921: "奉新县",
          360922: "万载县",
          360923: "上高县",
          360924: "宜丰县",
          360925: "靖安县",
          360926: "铜鼓县",
          360981: "丰城市",
          360982: "樟树市",
          360983: "高安市",
          360984: "其它区",
          361e3: "抚州市",
          361002: "临川区",
          361021: "南城县",
          361022: "黎川县",
          361023: "南丰县",
          361024: "崇仁县",
          361025: "乐安县",
          361026: "宜黄县",
          361027: "金溪县",
          361028: "资溪县",
          361029: "东乡县",
          361030: "广昌县",
          361031: "其它区",
          361100: "上饶市",
          361102: "信州区",
          361121: "上饶县",
          361122: "广丰县",
          361123: "玉山县",
          361124: "铅山县",
          361125: "横峰县",
          361126: "弋阳县",
          361127: "余干县",
          361128: "鄱阳县",
          361129: "万年县",
          361130: "婺源县",
          361181: "德兴市",
          361182: "其它区",
          37e4: "山东省",
          370100: "济南市",
          370102: "历下区",
          370103: "市中区",
          370104: "槐荫区",
          370105: "天桥区",
          370112: "历城区",
          370113: "长清区",
          370124: "平阴县",
          370125: "济阳县",
          370126: "商河县",
          370181: "章丘市",
          370182: "其它区",
          370200: "青岛市",
          370202: "市南区",
          370203: "市北区",
          370211: "黄岛区",
          370212: "崂山区",
          370213: "李沧区",
          370214: "城阳区",
          370281: "胶州市",
          370282: "即墨市",
          370283: "平度市",
          370285: "莱西市",
          370286: "其它区",
          370300: "淄博市",
          370302: "淄川区",
          370303: "张店区",
          370304: "博山区",
          370305: "临淄区",
          370306: "周村区",
          370321: "桓台县",
          370322: "高青县",
          370323: "沂源县",
          370324: "其它区",
          370400: "枣庄市",
          370402: "市中区",
          370403: "薛城区",
          370404: "峄城区",
          370405: "台儿庄区",
          370406: "山亭区",
          370481: "滕州市",
          370482: "其它区",
          370500: "东营市",
          370502: "东营区",
          370503: "河口区",
          370521: "垦利县",
          370522: "利津县",
          370523: "广饶县",
          370591: "其它区",
          370600: "烟台市",
          370602: "芝罘区",
          370611: "福山区",
          370612: "牟平区",
          370613: "莱山区",
          370634: "长岛县",
          370681: "龙口市",
          370682: "莱阳市",
          370683: "莱州市",
          370684: "蓬莱市",
          370685: "招远市",
          370686: "栖霞市",
          370687: "海阳市",
          370688: "其它区",
          370700: "潍坊市",
          370702: "潍城区",
          370703: "寒亭区",
          370704: "坊子区",
          370705: "奎文区",
          370724: "临朐县",
          370725: "昌乐县",
          370781: "青州市",
          370782: "诸城市",
          370783: "寿光市",
          370784: "安丘市",
          370785: "高密市",
          370786: "昌邑市",
          370787: "其它区",
          370800: "济宁市",
          370802: "市中区",
          370811: "任城区",
          370826: "微山县",
          370827: "鱼台县",
          370828: "金乡县",
          370829: "嘉祥县",
          370830: "汶上县",
          370831: "泗水县",
          370832: "梁山县",
          370881: "曲阜市",
          370882: "兖州市",
          370883: "邹城市",
          370884: "其它区",
          370900: "泰安市",
          370902: "泰山区",
          370903: "岱岳区",
          370921: "宁阳县",
          370923: "东平县",
          370982: "新泰市",
          370983: "肥城市",
          370984: "其它区",
          371e3: "威海市",
          371002: "环翠区",
          371081: "文登市",
          371082: "荣成市",
          371083: "乳山市",
          371084: "其它区",
          371100: "日照市",
          371102: "东港区",
          371103: "岚山区",
          371121: "五莲县",
          371122: "莒县",
          371123: "其它区",
          371200: "莱芜市",
          371202: "莱城区",
          371203: "钢城区",
          371204: "其它区",
          371300: "临沂市",
          371302: "兰山区",
          371311: "罗庄区",
          371312: "河东区",
          371321: "沂南县",
          371322: "郯城县",
          371323: "沂水县",
          371324: "苍山县",
          371325: "费县",
          371326: "平邑县",
          371327: "莒南县",
          371328: "蒙阴县",
          371329: "临沭县",
          371330: "其它区",
          371400: "德州市",
          371402: "德城区",
          371421: "陵县",
          371422: "宁津县",
          371423: "庆云县",
          371424: "临邑县",
          371425: "齐河县",
          371426: "平原县",
          371427: "夏津县",
          371428: "武城县",
          371481: "乐陵市",
          371482: "禹城市",
          371483: "其它区",
          371500: "聊城市",
          371502: "东昌府区",
          371521: "阳谷县",
          371522: "莘县",
          371523: "茌平县",
          371524: "东阿县",
          371525: "冠县",
          371526: "高唐县",
          371581: "临清市",
          371582: "其它区",
          371600: "滨州市",
          371602: "滨城区",
          371621: "惠民县",
          371622: "阳信县",
          371623: "无棣县",
          371624: "沾化县",
          371625: "博兴县",
          371626: "邹平县",
          371627: "其它区",
          371700: "菏泽市",
          371702: "牡丹区",
          371721: "曹县",
          371722: "单县",
          371723: "成武县",
          371724: "巨野县",
          371725: "郓城县",
          371726: "鄄城县",
          371727: "定陶县",
          371728: "东明县",
          371729: "其它区",
          41e4: "河南省",
          410100: "郑州市",
          410102: "中原区",
          410103: "二七区",
          410104: "管城回族区",
          410105: "金水区",
          410106: "上街区",
          410108: "惠济区",
          410122: "中牟县",
          410181: "巩义市",
          410182: "荥阳市",
          410183: "新密市",
          410184: "新郑市",
          410185: "登封市",
          410188: "其它区",
          410200: "开封市",
          410202: "龙亭区",
          410203: "顺河回族区",
          410204: "鼓楼区",
          410205: "禹王台区",
          410211: "金明区",
          410221: "杞县",
          410222: "通许县",
          410223: "尉氏县",
          410224: "开封县",
          410225: "兰考县",
          410226: "其它区",
          410300: "洛阳市",
          410302: "老城区",
          410303: "西工区",
          410304: "瀍河回族区",
          410305: "涧西区",
          410306: "吉利区",
          410307: "洛龙区",
          410322: "孟津县",
          410323: "新安县",
          410324: "栾川县",
          410325: "嵩县",
          410326: "汝阳县",
          410327: "宜阳县",
          410328: "洛宁县",
          410329: "伊川县",
          410381: "偃师市",
          410400: "平顶山市",
          410402: "新华区",
          410403: "卫东区",
          410404: "石龙区",
          410411: "湛河区",
          410421: "宝丰县",
          410422: "叶县",
          410423: "鲁山县",
          410425: "郏县",
          410481: "舞钢市",
          410482: "汝州市",
          410483: "其它区",
          410500: "安阳市",
          410502: "文峰区",
          410503: "北关区",
          410505: "殷都区",
          410506: "龙安区",
          410522: "安阳县",
          410523: "汤阴县",
          410526: "滑县",
          410527: "内黄县",
          410581: "林州市",
          410582: "其它区",
          410600: "鹤壁市",
          410602: "鹤山区",
          410603: "山城区",
          410611: "淇滨区",
          410621: "浚县",
          410622: "淇县",
          410623: "其它区",
          410700: "新乡市",
          410702: "红旗区",
          410703: "卫滨区",
          410704: "凤泉区",
          410711: "牧野区",
          410721: "新乡县",
          410724: "获嘉县",
          410725: "原阳县",
          410726: "延津县",
          410727: "封丘县",
          410728: "长垣县",
          410781: "卫辉市",
          410782: "辉县市",
          410783: "其它区",
          410800: "焦作市",
          410802: "解放区",
          410803: "中站区",
          410804: "马村区",
          410811: "山阳区",
          410821: "修武县",
          410822: "博爱县",
          410823: "武陟县",
          410825: "温县",
          410881: "济源市",
          410882: "沁阳市",
          410883: "孟州市",
          410884: "其它区",
          410900: "濮阳市",
          410902: "华龙区",
          410922: "清丰县",
          410923: "南乐县",
          410926: "范县",
          410927: "台前县",
          410928: "濮阳县",
          410929: "其它区",
          411e3: "许昌市",
          411002: "魏都区",
          411023: "许昌县",
          411024: "鄢陵县",
          411025: "襄城县",
          411081: "禹州市",
          411082: "长葛市",
          411083: "其它区",
          411100: "漯河市",
          411102: "源汇区",
          411103: "郾城区",
          411104: "召陵区",
          411121: "舞阳县",
          411122: "临颍县",
          411123: "其它区",
          411200: "三门峡市",
          411202: "湖滨区",
          411221: "渑池县",
          411222: "陕县",
          411224: "卢氏县",
          411281: "义马市",
          411282: "灵宝市",
          411283: "其它区",
          411300: "南阳市",
          411302: "宛城区",
          411303: "卧龙区",
          411321: "南召县",
          411322: "方城县",
          411323: "西峡县",
          411324: "镇平县",
          411325: "内乡县",
          411326: "淅川县",
          411327: "社旗县",
          411328: "唐河县",
          411329: "新野县",
          411330: "桐柏县",
          411381: "邓州市",
          411382: "其它区",
          411400: "商丘市",
          411402: "梁园区",
          411403: "睢阳区",
          411421: "民权县",
          411422: "睢县",
          411423: "宁陵县",
          411424: "柘城县",
          411425: "虞城县",
          411426: "夏邑县",
          411481: "永城市",
          411482: "其它区",
          411500: "信阳市",
          411502: "浉河区",
          411503: "平桥区",
          411521: "罗山县",
          411522: "光山县",
          411523: "新县",
          411524: "商城县",
          411525: "固始县",
          411526: "潢川县",
          411527: "淮滨县",
          411528: "息县",
          411529: "其它区",
          411600: "周口市",
          411602: "川汇区",
          411621: "扶沟县",
          411622: "西华县",
          411623: "商水县",
          411624: "沈丘县",
          411625: "郸城县",
          411626: "淮阳县",
          411627: "太康县",
          411628: "鹿邑县",
          411681: "项城市",
          411682: "其它区",
          411700: "驻马店市",
          411702: "驿城区",
          411721: "西平县",
          411722: "上蔡县",
          411723: "平舆县",
          411724: "正阳县",
          411725: "确山县",
          411726: "泌阳县",
          411727: "汝南县",
          411728: "遂平县",
          411729: "新蔡县",
          411730: "其它区",
          42e4: "湖北省",
          420100: "武汉市",
          420102: "江岸区",
          420103: "江汉区",
          420104: "硚口区",
          420105: "汉阳区",
          420106: "武昌区",
          420107: "青山区",
          420111: "洪山区",
          420112: "东西湖区",
          420113: "汉南区",
          420114: "蔡甸区",
          420115: "江夏区",
          420116: "黄陂区",
          420117: "新洲区",
          420118: "其它区",
          420200: "黄石市",
          420202: "黄石港区",
          420203: "西塞山区",
          420204: "下陆区",
          420205: "铁山区",
          420222: "阳新县",
          420281: "大冶市",
          420282: "其它区",
          420300: "十堰市",
          420302: "茅箭区",
          420303: "张湾区",
          420321: "郧县",
          420322: "郧西县",
          420323: "竹山县",
          420324: "竹溪县",
          420325: "房县",
          420381: "丹江口市",
          420383: "其它区",
          420500: "宜昌市",
          420502: "西陵区",
          420503: "伍家岗区",
          420504: "点军区",
          420505: "猇亭区",
          420506: "夷陵区",
          420525: "远安县",
          420526: "兴山县",
          420527: "秭归县",
          420528: "长阳土家族自治县",
          420529: "五峰土家族自治县",
          420581: "宜都市",
          420582: "当阳市",
          420583: "枝江市",
          420584: "其它区",
          420600: "襄阳市",
          420602: "襄城区",
          420606: "樊城区",
          420607: "襄州区",
          420624: "南漳县",
          420625: "谷城县",
          420626: "保康县",
          420682: "老河口市",
          420683: "枣阳市",
          420684: "宜城市",
          420685: "其它区",
          420700: "鄂州市",
          420702: "梁子湖区",
          420703: "华容区",
          420704: "鄂城区",
          420705: "其它区",
          420800: "荆门市",
          420802: "东宝区",
          420804: "掇刀区",
          420821: "京山县",
          420822: "沙洋县",
          420881: "钟祥市",
          420882: "其它区",
          420900: "孝感市",
          420902: "孝南区",
          420921: "孝昌县",
          420922: "大悟县",
          420923: "云梦县",
          420981: "应城市",
          420982: "安陆市",
          420984: "汉川市",
          420985: "其它区",
          421e3: "荆州市",
          421002: "沙市区",
          421003: "荆州区",
          421022: "公安县",
          421023: "监利县",
          421024: "江陵县",
          421081: "石首市",
          421083: "洪湖市",
          421087: "松滋市",
          421088: "其它区",
          421100: "黄冈市",
          421102: "黄州区",
          421121: "团风县",
          421122: "红安县",
          421123: "罗田县",
          421124: "英山县",
          421125: "浠水县",
          421126: "蕲春县",
          421127: "黄梅县",
          421181: "麻城市",
          421182: "武穴市",
          421183: "其它区",
          421200: "咸宁市",
          421202: "咸安区",
          421221: "嘉鱼县",
          421222: "通城县",
          421223: "崇阳县",
          421224: "通山县",
          421281: "赤壁市",
          421283: "其它区",
          421300: "随州市",
          421302: "曾都区",
          421321: "随县",
          421381: "广水市",
          421382: "其它区",
          422800: "恩施土家族苗族自治州",
          422801: "恩施市",
          422802: "利川市",
          422822: "建始县",
          422823: "巴东县",
          422825: "宣恩县",
          422826: "咸丰县",
          422827: "来凤县",
          422828: "鹤峰县",
          422829: "其它区",
          429004: "仙桃市",
          429005: "潜江市",
          429006: "天门市",
          429021: "神农架林区",
          43e4: "湖南省",
          430100: "长沙市",
          430102: "芙蓉区",
          430103: "天心区",
          430104: "岳麓区",
          430105: "开福区",
          430111: "雨花区",
          430121: "长沙县",
          430122: "望城区",
          430124: "宁乡县",
          430181: "浏阳市",
          430182: "其它区",
          430200: "株洲市",
          430202: "荷塘区",
          430203: "芦淞区",
          430204: "石峰区",
          430211: "天元区",
          430221: "株洲县",
          430223: "攸县",
          430224: "茶陵县",
          430225: "炎陵县",
          430281: "醴陵市",
          430282: "其它区",
          430300: "湘潭市",
          430302: "雨湖区",
          430304: "岳塘区",
          430321: "湘潭县",
          430381: "湘乡市",
          430382: "韶山市",
          430383: "其它区",
          430400: "衡阳市",
          430405: "珠晖区",
          430406: "雁峰区",
          430407: "石鼓区",
          430408: "蒸湘区",
          430412: "南岳区",
          430421: "衡阳县",
          430422: "衡南县",
          430423: "衡山县",
          430424: "衡东县",
          430426: "祁东县",
          430481: "耒阳市",
          430482: "常宁市",
          430483: "其它区",
          430500: "邵阳市",
          430502: "双清区",
          430503: "大祥区",
          430511: "北塔区",
          430521: "邵东县",
          430522: "新邵县",
          430523: "邵阳县",
          430524: "隆回县",
          430525: "洞口县",
          430527: "绥宁县",
          430528: "新宁县",
          430529: "城步苗族自治县",
          430581: "武冈市",
          430582: "其它区",
          430600: "岳阳市",
          430602: "岳阳楼区",
          430603: "云溪区",
          430611: "君山区",
          430621: "岳阳县",
          430623: "华容县",
          430624: "湘阴县",
          430626: "平江县",
          430681: "汨罗市",
          430682: "临湘市",
          430683: "其它区",
          430700: "常德市",
          430702: "武陵区",
          430703: "鼎城区",
          430721: "安乡县",
          430722: "汉寿县",
          430723: "澧县",
          430724: "临澧县",
          430725: "桃源县",
          430726: "石门县",
          430781: "津市市",
          430782: "其它区",
          430800: "张家界市",
          430802: "永定区",
          430811: "武陵源区",
          430821: "慈利县",
          430822: "桑植县",
          430823: "其它区",
          430900: "益阳市",
          430902: "资阳区",
          430903: "赫山区",
          430921: "南县",
          430922: "桃江县",
          430923: "安化县",
          430981: "沅江市",
          430982: "其它区",
          431e3: "郴州市",
          431002: "北湖区",
          431003: "苏仙区",
          431021: "桂阳县",
          431022: "宜章县",
          431023: "永兴县",
          431024: "嘉禾县",
          431025: "临武县",
          431026: "汝城县",
          431027: "桂东县",
          431028: "安仁县",
          431081: "资兴市",
          431082: "其它区",
          431100: "永州市",
          431102: "零陵区",
          431103: "冷水滩区",
          431121: "祁阳县",
          431122: "东安县",
          431123: "双牌县",
          431124: "道县",
          431125: "江永县",
          431126: "宁远县",
          431127: "蓝山县",
          431128: "新田县",
          431129: "江华瑶族自治县",
          431130: "其它区",
          431200: "怀化市",
          431202: "鹤城区",
          431221: "中方县",
          431222: "沅陵县",
          431223: "辰溪县",
          431224: "溆浦县",
          431225: "会同县",
          431226: "麻阳苗族自治县",
          431227: "新晃侗族自治县",
          431228: "芷江侗族自治县",
          431229: "靖州苗族侗族自治县",
          431230: "通道侗族自治县",
          431281: "洪江市",
          431282: "其它区",
          431300: "娄底市",
          431302: "娄星区",
          431321: "双峰县",
          431322: "新化县",
          431381: "冷水江市",
          431382: "涟源市",
          431383: "其它区",
          433100: "湘西土家族苗族自治州",
          433101: "吉首市",
          433122: "泸溪县",
          433123: "凤凰县",
          433124: "花垣县",
          433125: "保靖县",
          433126: "古丈县",
          433127: "永顺县",
          433130: "龙山县",
          433131: "其它区",
          44e4: "广东省",
          440100: "广州市",
          440103: "荔湾区",
          440104: "越秀区",
          440105: "海珠区",
          440106: "天河区",
          440111: "白云区",
          440112: "黄埔区",
          440113: "番禺区",
          440114: "花都区",
          440115: "南沙区",
          440116: "萝岗区",
          440183: "增城市",
          440184: "从化市",
          440189: "其它区",
          440200: "韶关市",
          440203: "武江区",
          440204: "浈江区",
          440205: "曲江区",
          440222: "始兴县",
          440224: "仁化县",
          440229: "翁源县",
          440232: "乳源瑶族自治县",
          440233: "新丰县",
          440281: "乐昌市",
          440282: "南雄市",
          440283: "其它区",
          440300: "深圳市",
          440303: "罗湖区",
          440304: "福田区",
          440305: "南山区",
          440306: "宝安区",
          440307: "龙岗区",
          440308: "盐田区",
          440309: "其它区",
          440320: "光明新区",
          440321: "坪山新区",
          440322: "大鹏新区",
          440323: "龙华新区",
          440400: "珠海市",
          440402: "香洲区",
          440403: "斗门区",
          440404: "金湾区",
          440488: "其它区",
          440500: "汕头市",
          440507: "龙湖区",
          440511: "金平区",
          440512: "濠江区",
          440513: "潮阳区",
          440514: "潮南区",
          440515: "澄海区",
          440523: "南澳县",
          440524: "其它区",
          440600: "佛山市",
          440604: "禅城区",
          440605: "南海区",
          440606: "顺德区",
          440607: "三水区",
          440608: "高明区",
          440609: "其它区",
          440700: "江门市",
          440703: "蓬江区",
          440704: "江海区",
          440705: "新会区",
          440781: "台山市",
          440783: "开平市",
          440784: "鹤山市",
          440785: "恩平市",
          440786: "其它区",
          440800: "湛江市",
          440802: "赤坎区",
          440803: "霞山区",
          440804: "坡头区",
          440811: "麻章区",
          440823: "遂溪县",
          440825: "徐闻县",
          440881: "廉江市",
          440882: "雷州市",
          440883: "吴川市",
          440884: "其它区",
          440900: "茂名市",
          440902: "茂南区",
          440903: "茂港区",
          440923: "电白县",
          440981: "高州市",
          440982: "化州市",
          440983: "信宜市",
          440984: "其它区",
          441200: "肇庆市",
          441202: "端州区",
          441203: "鼎湖区",
          441223: "广宁县",
          441224: "怀集县",
          441225: "封开县",
          441226: "德庆县",
          441283: "高要市",
          441284: "四会市",
          441285: "其它区",
          441300: "惠州市",
          441302: "惠城区",
          441303: "惠阳区",
          441322: "博罗县",
          441323: "惠东县",
          441324: "龙门县",
          441325: "其它区",
          441400: "梅州市",
          441402: "梅江区",
          441421: "梅县",
          441422: "大埔县",
          441423: "丰顺县",
          441424: "五华县",
          441426: "平远县",
          441427: "蕉岭县",
          441481: "兴宁市",
          441482: "其它区",
          441500: "汕尾市",
          441502: "城区",
          441521: "海丰县",
          441523: "陆河县",
          441581: "陆丰市",
          441582: "其它区",
          441600: "河源市",
          441602: "源城区",
          441621: "紫金县",
          441622: "龙川县",
          441623: "连平县",
          441624: "和平县",
          441625: "东源县",
          441626: "其它区",
          441700: "阳江市",
          441702: "江城区",
          441721: "阳西县",
          441723: "阳东县",
          441781: "阳春市",
          441782: "其它区",
          441800: "清远市",
          441802: "清城区",
          441821: "佛冈县",
          441823: "阳山县",
          441825: "连山壮族瑶族自治县",
          441826: "连南瑶族自治县",
          441827: "清新区",
          441881: "英德市",
          441882: "连州市",
          441883: "其它区",
          441900: "东莞市",
          442e3: "中山市",
          442101: "东沙群岛",
          445100: "潮州市",
          445102: "湘桥区",
          445121: "潮安区",
          445122: "饶平县",
          445186: "其它区",
          445200: "揭阳市",
          445202: "榕城区",
          445221: "揭东区",
          445222: "揭西县",
          445224: "惠来县",
          445281: "普宁市",
          445285: "其它区",
          445300: "云浮市",
          445302: "云城区",
          445321: "新兴县",
          445322: "郁南县",
          445323: "云安县",
          445381: "罗定市",
          445382: "其它区",
          45e4: "广西壮族自治区",
          450100: "南宁市",
          450102: "兴宁区",
          450103: "青秀区",
          450105: "江南区",
          450107: "西乡塘区",
          450108: "良庆区",
          450109: "邕宁区",
          450122: "武鸣县",
          450123: "隆安县",
          450124: "马山县",
          450125: "上林县",
          450126: "宾阳县",
          450127: "横县",
          450128: "其它区",
          450200: "柳州市",
          450202: "城中区",
          450203: "鱼峰区",
          450204: "柳南区",
          450205: "柳北区",
          450221: "柳江县",
          450222: "柳城县",
          450223: "鹿寨县",
          450224: "融安县",
          450225: "融水苗族自治县",
          450226: "三江侗族自治县",
          450227: "其它区",
          450300: "桂林市",
          450302: "秀峰区",
          450303: "叠彩区",
          450304: "象山区",
          450305: "七星区",
          450311: "雁山区",
          450321: "阳朔县",
          450322: "临桂区",
          450323: "灵川县",
          450324: "全州县",
          450325: "兴安县",
          450326: "永福县",
          450327: "灌阳县",
          450328: "龙胜各族自治县",
          450329: "资源县",
          450330: "平乐县",
          450331: "荔浦县",
          450332: "恭城瑶族自治县",
          450333: "其它区",
          450400: "梧州市",
          450403: "万秀区",
          450405: "长洲区",
          450406: "龙圩区",
          450421: "苍梧县",
          450422: "藤县",
          450423: "蒙山县",
          450481: "岑溪市",
          450482: "其它区",
          450500: "北海市",
          450502: "海城区",
          450503: "银海区",
          450512: "铁山港区",
          450521: "合浦县",
          450522: "其它区",
          450600: "防城港市",
          450602: "港口区",
          450603: "防城区",
          450621: "上思县",
          450681: "东兴市",
          450682: "其它区",
          450700: "钦州市",
          450702: "钦南区",
          450703: "钦北区",
          450721: "灵山县",
          450722: "浦北县",
          450723: "其它区",
          450800: "贵港市",
          450802: "港北区",
          450803: "港南区",
          450804: "覃塘区",
          450821: "平南县",
          450881: "桂平市",
          450882: "其它区",
          450900: "玉林市",
          450902: "玉州区",
          450903: "福绵区",
          450921: "容县",
          450922: "陆川县",
          450923: "博白县",
          450924: "兴业县",
          450981: "北流市",
          450982: "其它区",
          451e3: "百色市",
          451002: "右江区",
          451021: "田阳县",
          451022: "田东县",
          451023: "平果县",
          451024: "德保县",
          451025: "靖西县",
          451026: "那坡县",
          451027: "凌云县",
          451028: "乐业县",
          451029: "田林县",
          451030: "西林县",
          451031: "隆林各族自治县",
          451032: "其它区",
          451100: "贺州市",
          451102: "八步区",
          451119: "平桂管理区",
          451121: "昭平县",
          451122: "钟山县",
          451123: "富川瑶族自治县",
          451124: "其它区",
          451200: "河池市",
          451202: "金城江区",
          451221: "南丹县",
          451222: "天峨县",
          451223: "凤山县",
          451224: "东兰县",
          451225: "罗城仫佬族自治县",
          451226: "环江毛南族自治县",
          451227: "巴马瑶族自治县",
          451228: "都安瑶族自治县",
          451229: "大化瑶族自治县",
          451281: "宜州市",
          451282: "其它区",
          451300: "来宾市",
          451302: "兴宾区",
          451321: "忻城县",
          451322: "象州县",
          451323: "武宣县",
          451324: "金秀瑶族自治县",
          451381: "合山市",
          451382: "其它区",
          451400: "崇左市",
          451402: "江州区",
          451421: "扶绥县",
          451422: "宁明县",
          451423: "龙州县",
          451424: "大新县",
          451425: "天等县",
          451481: "凭祥市",
          451482: "其它区",
          46e4: "海南省",
          460100: "海口市",
          460105: "秀英区",
          460106: "龙华区",
          460107: "琼山区",
          460108: "美兰区",
          460109: "其它区",
          460200: "三亚市",
          460300: "三沙市",
          460321: "西沙群岛",
          460322: "南沙群岛",
          460323: "中沙群岛的岛礁及其海域",
          469001: "五指山市",
          469002: "琼海市",
          469003: "儋州市",
          469005: "文昌市",
          469006: "万宁市",
          469007: "东方市",
          469025: "定安县",
          469026: "屯昌县",
          469027: "澄迈县",
          469028: "临高县",
          469030: "白沙黎族自治县",
          469031: "昌江黎族自治县",
          469033: "乐东黎族自治县",
          469034: "陵水黎族自治县",
          469035: "保亭黎族苗族自治县",
          469036: "琼中黎族苗族自治县",
          471005: "其它区",
          5e5: "重庆",
          500100: "重庆市",
          500101: "万州区",
          500102: "涪陵区",
          500103: "渝中区",
          500104: "大渡口区",
          500105: "江北区",
          500106: "沙坪坝区",
          500107: "九龙坡区",
          500108: "南岸区",
          500109: "北碚区",
          500110: "万盛区",
          500111: "双桥区",
          500112: "渝北区",
          500113: "巴南区",
          500114: "黔江区",
          500115: "长寿区",
          500222: "綦江区",
          500223: "潼南县",
          500224: "铜梁县",
          500225: "大足区",
          500226: "荣昌县",
          500227: "璧山县",
          500228: "梁平县",
          500229: "城口县",
          500230: "丰都县",
          500231: "垫江县",
          500232: "武隆县",
          500233: "忠县",
          500234: "开县",
          500235: "云阳县",
          500236: "奉节县",
          500237: "巫山县",
          500238: "巫溪县",
          500240: "石柱土家族自治县",
          500241: "秀山土家族苗族自治县",
          500242: "酉阳土家族苗族自治县",
          500243: "彭水苗族土家族自治县",
          500381: "江津区",
          500382: "合川区",
          500383: "永川区",
          500384: "南川区",
          500385: "其它区",
          51e4: "四川省",
          510100: "成都市",
          510104: "锦江区",
          510105: "青羊区",
          510106: "金牛区",
          510107: "武侯区",
          510108: "成华区",
          510112: "龙泉驿区",
          510113: "青白江区",
          510114: "新都区",
          510115: "温江区",
          510121: "金堂县",
          510122: "双流县",
          510124: "郫县",
          510129: "大邑县",
          510131: "蒲江县",
          510132: "新津县",
          510181: "都江堰市",
          510182: "彭州市",
          510183: "邛崃市",
          510184: "崇州市",
          510185: "其它区",
          510300: "自贡市",
          510302: "自流井区",
          510303: "贡井区",
          510304: "大安区",
          510311: "沿滩区",
          510321: "荣县",
          510322: "富顺县",
          510323: "其它区",
          510400: "攀枝花市",
          510402: "东区",
          510403: "西区",
          510411: "仁和区",
          510421: "米易县",
          510422: "盐边县",
          510423: "其它区",
          510500: "泸州市",
          510502: "江阳区",
          510503: "纳溪区",
          510504: "龙马潭区",
          510521: "泸县",
          510522: "合江县",
          510524: "叙永县",
          510525: "古蔺县",
          510526: "其它区",
          510600: "德阳市",
          510603: "旌阳区",
          510623: "中江县",
          510626: "罗江县",
          510681: "广汉市",
          510682: "什邡市",
          510683: "绵竹市",
          510684: "其它区",
          510700: "绵阳市",
          510703: "涪城区",
          510704: "游仙区",
          510722: "三台县",
          510723: "盐亭县",
          510724: "安县",
          510725: "梓潼县",
          510726: "北川羌族自治县",
          510727: "平武县",
          510781: "江油市",
          510782: "其它区",
          510800: "广元市",
          510802: "利州区",
          510811: "昭化区",
          510812: "朝天区",
          510821: "旺苍县",
          510822: "青川县",
          510823: "剑阁县",
          510824: "苍溪县",
          510825: "其它区",
          510900: "遂宁市",
          510903: "船山区",
          510904: "安居区",
          510921: "蓬溪县",
          510922: "射洪县",
          510923: "大英县",
          510924: "其它区",
          511e3: "内江市",
          511002: "市中区",
          511011: "东兴区",
          511024: "威远县",
          511025: "资中县",
          511028: "隆昌县",
          511029: "其它区",
          511100: "乐山市",
          511102: "市中区",
          511111: "沙湾区",
          511112: "五通桥区",
          511113: "金口河区",
          511123: "犍为县",
          511124: "井研县",
          511126: "夹江县",
          511129: "沐川县",
          511132: "峨边彝族自治县",
          511133: "马边彝族自治县",
          511181: "峨眉山市",
          511182: "其它区",
          511300: "南充市",
          511302: "顺庆区",
          511303: "高坪区",
          511304: "嘉陵区",
          511321: "南部县",
          511322: "营山县",
          511323: "蓬安县",
          511324: "仪陇县",
          511325: "西充县",
          511381: "阆中市",
          511382: "其它区",
          511400: "眉山市",
          511402: "东坡区",
          511421: "仁寿县",
          511422: "彭山县",
          511423: "洪雅县",
          511424: "丹棱县",
          511425: "青神县",
          511426: "其它区",
          511500: "宜宾市",
          511502: "翠屏区",
          511521: "宜宾县",
          511522: "南溪区",
          511523: "江安县",
          511524: "长宁县",
          511525: "高县",
          511526: "珙县",
          511527: "筠连县",
          511528: "兴文县",
          511529: "屏山县",
          511530: "其它区",
          511600: "广安市",
          511602: "广安区",
          511603: "前锋区",
          511621: "岳池县",
          511622: "武胜县",
          511623: "邻水县",
          511681: "华蓥市",
          511683: "其它区",
          511700: "达州市",
          511702: "通川区",
          511721: "达川区",
          511722: "宣汉县",
          511723: "开江县",
          511724: "大竹县",
          511725: "渠县",
          511781: "万源市",
          511782: "其它区",
          511800: "雅安市",
          511802: "雨城区",
          511821: "名山区",
          511822: "荥经县",
          511823: "汉源县",
          511824: "石棉县",
          511825: "天全县",
          511826: "芦山县",
          511827: "宝兴县",
          511828: "其它区",
          511900: "巴中市",
          511902: "巴州区",
          511903: "恩阳区",
          511921: "通江县",
          511922: "南江县",
          511923: "平昌县",
          511924: "其它区",
          512e3: "资阳市",
          512002: "雁江区",
          512021: "安岳县",
          512022: "乐至县",
          512081: "简阳市",
          512082: "其它区",
          513200: "阿坝藏族羌族自治州",
          513221: "汶川县",
          513222: "理县",
          513223: "茂县",
          513224: "松潘县",
          513225: "九寨沟县",
          513226: "金川县",
          513227: "小金县",
          513228: "黑水县",
          513229: "马尔康县",
          513230: "壤塘县",
          513231: "阿坝县",
          513232: "若尔盖县",
          513233: "红原县",
          513234: "其它区",
          513300: "甘孜藏族自治州",
          513321: "康定县",
          513322: "泸定县",
          513323: "丹巴县",
          513324: "九龙县",
          513325: "雅江县",
          513326: "道孚县",
          513327: "炉霍县",
          513328: "甘孜县",
          513329: "新龙县",
          513330: "德格县",
          513331: "白玉县",
          513332: "石渠县",
          513333: "色达县",
          513334: "理塘县",
          513335: "巴塘县",
          513336: "乡城县",
          513337: "稻城县",
          513338: "得荣县",
          513339: "其它区",
          513400: "凉山彝族自治州",
          513401: "西昌市",
          513422: "木里藏族自治县",
          513423: "盐源县",
          513424: "德昌县",
          513425: "会理县",
          513426: "会东县",
          513427: "宁南县",
          513428: "普格县",
          513429: "布拖县",
          513430: "金阳县",
          513431: "昭觉县",
          513432: "喜德县",
          513433: "冕宁县",
          513434: "越西县",
          513435: "甘洛县",
          513436: "美姑县",
          513437: "雷波县",
          513438: "其它区",
          52e4: "贵州省",
          520100: "贵阳市",
          520102: "南明区",
          520103: "云岩区",
          520111: "花溪区",
          520112: "乌当区",
          520113: "白云区",
          520121: "开阳县",
          520122: "息烽县",
          520123: "修文县",
          520151: "观山湖区",
          520181: "清镇市",
          520182: "其它区",
          520200: "六盘水市",
          520201: "钟山区",
          520203: "六枝特区",
          520221: "水城县",
          520222: "盘县",
          520223: "其它区",
          520300: "遵义市",
          520302: "红花岗区",
          520303: "汇川区",
          520321: "遵义县",
          520322: "桐梓县",
          520323: "绥阳县",
          520324: "正安县",
          520325: "道真仡佬族苗族自治县",
          520326: "务川仡佬族苗族自治县",
          520327: "凤冈县",
          520328: "湄潭县",
          520329: "余庆县",
          520330: "习水县",
          520381: "赤水市",
          520382: "仁怀市",
          520383: "其它区",
          520400: "安顺市",
          520402: "西秀区",
          520421: "平坝县",
          520422: "普定县",
          520423: "镇宁布依族苗族自治县",
          520424: "关岭布依族苗族自治县",
          520425: "紫云苗族布依族自治县",
          520426: "其它区",
          522200: "铜仁市",
          522201: "碧江区",
          522222: "江口县",
          522223: "玉屏侗族自治县",
          522224: "石阡县",
          522225: "思南县",
          522226: "印江土家族苗族自治县",
          522227: "德江县",
          522228: "沿河土家族自治县",
          522229: "松桃苗族自治县",
          522230: "万山区",
          522231: "其它区",
          522300: "黔西南布依族苗族自治州",
          522301: "兴义市",
          522322: "兴仁县",
          522323: "普安县",
          522324: "晴隆县",
          522325: "贞丰县",
          522326: "望谟县",
          522327: "册亨县",
          522328: "安龙县",
          522329: "其它区",
          522400: "毕节市",
          522401: "七星关区",
          522422: "大方县",
          522423: "黔西县",
          522424: "金沙县",
          522425: "织金县",
          522426: "纳雍县",
          522427: "威宁彝族回族苗族自治县",
          522428: "赫章县",
          522429: "其它区",
          522600: "黔东南苗族侗族自治州",
          522601: "凯里市",
          522622: "黄平县",
          522623: "施秉县",
          522624: "三穗县",
          522625: "镇远县",
          522626: "岑巩县",
          522627: "天柱县",
          522628: "锦屏县",
          522629: "剑河县",
          522630: "台江县",
          522631: "黎平县",
          522632: "榕江县",
          522633: "从江县",
          522634: "雷山县",
          522635: "麻江县",
          522636: "丹寨县",
          522637: "其它区",
          522700: "黔南布依族苗族自治州",
          522701: "都匀市",
          522702: "福泉市",
          522722: "荔波县",
          522723: "贵定县",
          522725: "瓮安县",
          522726: "独山县",
          522727: "平塘县",
          522728: "罗甸县",
          522729: "长顺县",
          522730: "龙里县",
          522731: "惠水县",
          522732: "三都水族自治县",
          522733: "其它区",
          53e4: "云南省",
          530100: "昆明市",
          530102: "五华区",
          530103: "盘龙区",
          530111: "官渡区",
          530112: "西山区",
          530113: "东川区",
          530121: "呈贡区",
          530122: "晋宁县",
          530124: "富民县",
          530125: "宜良县",
          530126: "石林彝族自治县",
          530127: "嵩明县",
          530128: "禄劝彝族苗族自治县",
          530129: "寻甸回族彝族自治县",
          530181: "安宁市",
          530182: "其它区",
          530300: "曲靖市",
          530302: "麒麟区",
          530321: "马龙县",
          530322: "陆良县",
          530323: "师宗县",
          530324: "罗平县",
          530325: "富源县",
          530326: "会泽县",
          530328: "沾益县",
          530381: "宣威市",
          530382: "其它区",
          530400: "玉溪市",
          530402: "红塔区",
          530421: "江川县",
          530422: "澄江县",
          530423: "通海县",
          530424: "华宁县",
          530425: "易门县",
          530426: "峨山彝族自治县",
          530427: "新平彝族傣族自治县",
          530428: "元江哈尼族彝族傣族自治县",
          530429: "其它区",
          530500: "保山市",
          530502: "隆阳区",
          530521: "施甸县",
          530522: "腾冲县",
          530523: "龙陵县",
          530524: "昌宁县",
          530525: "其它区",
          530600: "昭通市",
          530602: "昭阳区",
          530621: "鲁甸县",
          530622: "巧家县",
          530623: "盐津县",
          530624: "大关县",
          530625: "永善县",
          530626: "绥江县",
          530627: "镇雄县",
          530628: "彝良县",
          530629: "威信县",
          530630: "水富县",
          530631: "其它区",
          530700: "丽江市",
          530702: "古城区",
          530721: "玉龙纳西族自治县",
          530722: "永胜县",
          530723: "华坪县",
          530724: "宁蒗彝族自治县",
          530725: "其它区",
          530800: "普洱市",
          530802: "思茅区",
          530821: "宁洱哈尼族彝族自治县",
          530822: "墨江哈尼族自治县",
          530823: "景东彝族自治县",
          530824: "景谷傣族彝族自治县",
          530825: "镇沅彝族哈尼族拉祜族自治县",
          530826: "江城哈尼族彝族自治县",
          530827: "孟连傣族拉祜族佤族自治县",
          530828: "澜沧拉祜族自治县",
          530829: "西盟佤族自治县",
          530830: "其它区",
          530900: "临沧市",
          530902: "临翔区",
          530921: "凤庆县",
          530922: "云县",
          530923: "永德县",
          530924: "镇康县",
          530925: "双江拉祜族佤族布朗族傣族自治县",
          530926: "耿马傣族佤族自治县",
          530927: "沧源佤族自治县",
          530928: "其它区",
          532300: "楚雄彝族自治州",
          532301: "楚雄市",
          532322: "双柏县",
          532323: "牟定县",
          532324: "南华县",
          532325: "姚安县",
          532326: "大姚县",
          532327: "永仁县",
          532328: "元谋县",
          532329: "武定县",
          532331: "禄丰县",
          532332: "其它区",
          532500: "红河哈尼族彝族自治州",
          532501: "个旧市",
          532502: "开远市",
          532522: "蒙自市",
          532523: "屏边苗族自治县",
          532524: "建水县",
          532525: "石屏县",
          532526: "弥勒市",
          532527: "泸西县",
          532528: "元阳县",
          532529: "红河县",
          532530: "金平苗族瑶族傣族自治县",
          532531: "绿春县",
          532532: "河口瑶族自治县",
          532533: "其它区",
          532600: "文山壮族苗族自治州",
          532621: "文山市",
          532622: "砚山县",
          532623: "西畴县",
          532624: "麻栗坡县",
          532625: "马关县",
          532626: "丘北县",
          532627: "广南县",
          532628: "富宁县",
          532629: "其它区",
          532800: "西双版纳傣族自治州",
          532801: "景洪市",
          532822: "勐海县",
          532823: "勐腊县",
          532824: "其它区",
          532900: "大理白族自治州",
          532901: "大理市",
          532922: "漾濞彝族自治县",
          532923: "祥云县",
          532924: "宾川县",
          532925: "弥渡县",
          532926: "南涧彝族自治县",
          532927: "巍山彝族回族自治县",
          532928: "永平县",
          532929: "云龙县",
          532930: "洱源县",
          532931: "剑川县",
          532932: "鹤庆县",
          532933: "其它区",
          533100: "德宏傣族景颇族自治州",
          533102: "瑞丽市",
          533103: "芒市",
          533122: "梁河县",
          533123: "盈江县",
          533124: "陇川县",
          533125: "其它区",
          533300: "怒江傈僳族自治州",
          533321: "泸水县",
          533323: "福贡县",
          533324: "贡山独龙族怒族自治县",
          533325: "兰坪白族普米族自治县",
          533326: "其它区",
          533400: "迪庆藏族自治州",
          533421: "香格里拉县",
          533422: "德钦县",
          533423: "维西傈僳族自治县",
          533424: "其它区",
          54e4: "西藏自治区",
          540100: "拉萨市",
          540102: "城关区",
          540121: "林周县",
          540122: "当雄县",
          540123: "尼木县",
          540124: "曲水县",
          540125: "堆龙德庆县",
          540126: "达孜县",
          540127: "墨竹工卡县",
          540128: "其它区",
          542100: "昌都地区",
          542121: "昌都县",
          542122: "江达县",
          542123: "贡觉县",
          542124: "类乌齐县",
          542125: "丁青县",
          542126: "察雅县",
          542127: "八宿县",
          542128: "左贡县",
          542129: "芒康县",
          542132: "洛隆县",
          542133: "边坝县",
          542134: "其它区",
          542200: "山南地区",
          542221: "乃东县",
          542222: "扎囊县",
          542223: "贡嘎县",
          542224: "桑日县",
          542225: "琼结县",
          542226: "曲松县",
          542227: "措美县",
          542228: "洛扎县",
          542229: "加查县",
          542231: "隆子县",
          542232: "错那县",
          542233: "浪卡子县",
          542234: "其它区",
          542300: "日喀则地区",
          542301: "日喀则市",
          542322: "南木林县",
          542323: "江孜县",
          542324: "定日县",
          542325: "萨迦县",
          542326: "拉孜县",
          542327: "昂仁县",
          542328: "谢通门县",
          542329: "白朗县",
          542330: "仁布县",
          542331: "康马县",
          542332: "定结县",
          542333: "仲巴县",
          542334: "亚东县",
          542335: "吉隆县",
          542336: "聂拉木县",
          542337: "萨嘎县",
          542338: "岗巴县",
          542339: "其它区",
          542400: "那曲地区",
          542421: "那曲县",
          542422: "嘉黎县",
          542423: "比如县",
          542424: "聂荣县",
          542425: "安多县",
          542426: "申扎县",
          542427: "索县",
          542428: "班戈县",
          542429: "巴青县",
          542430: "尼玛县",
          542431: "其它区",
          542432: "双湖县",
          542500: "阿里地区",
          542521: "普兰县",
          542522: "札达县",
          542523: "噶尔县",
          542524: "日土县",
          542525: "革吉县",
          542526: "改则县",
          542527: "措勤县",
          542528: "其它区",
          542600: "林芝地区",
          542621: "林芝县",
          542622: "工布江达县",
          542623: "米林县",
          542624: "墨脱县",
          542625: "波密县",
          542626: "察隅县",
          542627: "朗县",
          542628: "其它区",
          61e4: "陕西省",
          610100: "西安市",
          610102: "新城区",
          610103: "碑林区",
          610104: "莲湖区",
          610111: "灞桥区",
          610112: "未央区",
          610113: "雁塔区",
          610114: "阎良区",
          610115: "临潼区",
          610116: "长安区",
          610122: "蓝田县",
          610124: "周至县",
          610125: "户县",
          610126: "高陵县",
          610127: "其它区",
          610200: "铜川市",
          610202: "王益区",
          610203: "印台区",
          610204: "耀州区",
          610222: "宜君县",
          610223: "其它区",
          610300: "宝鸡市",
          610302: "渭滨区",
          610303: "金台区",
          610304: "陈仓区",
          610322: "凤翔县",
          610323: "岐山县",
          610324: "扶风县",
          610326: "眉县",
          610327: "陇县",
          610328: "千阳县",
          610329: "麟游县",
          610330: "凤县",
          610331: "太白县",
          610332: "其它区",
          610400: "咸阳市",
          610402: "秦都区",
          610403: "杨陵区",
          610404: "渭城区",
          610422: "三原县",
          610423: "泾阳县",
          610424: "乾县",
          610425: "礼泉县",
          610426: "永寿县",
          610427: "彬县",
          610428: "长武县",
          610429: "旬邑县",
          610430: "淳化县",
          610431: "武功县",
          610481: "兴平市",
          610482: "其它区",
          610500: "渭南市",
          610502: "临渭区",
          610521: "华县",
          610522: "潼关县",
          610523: "大荔县",
          610524: "合阳县",
          610525: "澄城县",
          610526: "蒲城县",
          610527: "白水县",
          610528: "富平县",
          610581: "韩城市",
          610582: "华阴市",
          610583: "其它区",
          610600: "延安市",
          610602: "宝塔区",
          610621: "延长县",
          610622: "延川县",
          610623: "子长县",
          610624: "安塞县",
          610625: "志丹县",
          610626: "吴起县",
          610627: "甘泉县",
          610628: "富县",
          610629: "洛川县",
          610630: "宜川县",
          610631: "黄龙县",
          610632: "黄陵县",
          610633: "其它区",
          610700: "汉中市",
          610702: "汉台区",
          610721: "南郑县",
          610722: "城固县",
          610723: "洋县",
          610724: "西乡县",
          610725: "勉县",
          610726: "宁强县",
          610727: "略阳县",
          610728: "镇巴县",
          610729: "留坝县",
          610730: "佛坪县",
          610731: "其它区",
          610800: "榆林市",
          610802: "榆阳区",
          610821: "神木县",
          610822: "府谷县",
          610823: "横山县",
          610824: "靖边县",
          610825: "定边县",
          610826: "绥德县",
          610827: "米脂县",
          610828: "佳县",
          610829: "吴堡县",
          610830: "清涧县",
          610831: "子洲县",
          610832: "其它区",
          610900: "安康市",
          610902: "汉滨区",
          610921: "汉阴县",
          610922: "石泉县",
          610923: "宁陕县",
          610924: "紫阳县",
          610925: "岚皋县",
          610926: "平利县",
          610927: "镇坪县",
          610928: "旬阳县",
          610929: "白河县",
          610930: "其它区",
          611e3: "商洛市",
          611002: "商州区",
          611021: "洛南县",
          611022: "丹凤县",
          611023: "商南县",
          611024: "山阳县",
          611025: "镇安县",
          611026: "柞水县",
          611027: "其它区",
          62e4: "甘肃省",
          620100: "兰州市",
          620102: "城关区",
          620103: "七里河区",
          620104: "西固区",
          620105: "安宁区",
          620111: "红古区",
          620121: "永登县",
          620122: "皋兰县",
          620123: "榆中县",
          620124: "其它区",
          620200: "嘉峪关市",
          620300: "金昌市",
          620302: "金川区",
          620321: "永昌县",
          620322: "其它区",
          620400: "白银市",
          620402: "白银区",
          620403: "平川区",
          620421: "靖远县",
          620422: "会宁县",
          620423: "景泰县",
          620424: "其它区",
          620500: "天水市",
          620502: "秦州区",
          620503: "麦积区",
          620521: "清水县",
          620522: "秦安县",
          620523: "甘谷县",
          620524: "武山县",
          620525: "张家川回族自治县",
          620526: "其它区",
          620600: "武威市",
          620602: "凉州区",
          620621: "民勤县",
          620622: "古浪县",
          620623: "天祝藏族自治县",
          620624: "其它区",
          620700: "张掖市",
          620702: "甘州区",
          620721: "肃南裕固族自治县",
          620722: "民乐县",
          620723: "临泽县",
          620724: "高台县",
          620725: "山丹县",
          620726: "其它区",
          620800: "平凉市",
          620802: "崆峒区",
          620821: "泾川县",
          620822: "灵台县",
          620823: "崇信县",
          620824: "华亭县",
          620825: "庄浪县",
          620826: "静宁县",
          620827: "其它区",
          620900: "酒泉市",
          620902: "肃州区",
          620921: "金塔县",
          620922: "瓜州县",
          620923: "肃北蒙古族自治县",
          620924: "阿克塞哈萨克族自治县",
          620981: "玉门市",
          620982: "敦煌市",
          620983: "其它区",
          621e3: "庆阳市",
          621002: "西峰区",
          621021: "庆城县",
          621022: "环县",
          621023: "华池县",
          621024: "合水县",
          621025: "正宁县",
          621026: "宁县",
          621027: "镇原县",
          621028: "其它区",
          621100: "定西市",
          621102: "安定区",
          621121: "通渭县",
          621122: "陇西县",
          621123: "渭源县",
          621124: "临洮县",
          621125: "漳县",
          621126: "岷县",
          621127: "其它区",
          621200: "陇南市",
          621202: "武都区",
          621221: "成县",
          621222: "文县",
          621223: "宕昌县",
          621224: "康县",
          621225: "西和县",
          621226: "礼县",
          621227: "徽县",
          621228: "两当县",
          621229: "其它区",
          622900: "临夏回族自治州",
          622901: "临夏市",
          622921: "临夏县",
          622922: "康乐县",
          622923: "永靖县",
          622924: "广河县",
          622925: "和政县",
          622926: "东乡族自治县",
          622927: "积石山保安族东乡族撒拉族自治县",
          622928: "其它区",
          623e3: "甘南藏族自治州",
          623001: "合作市",
          623021: "临潭县",
          623022: "卓尼县",
          623023: "舟曲县",
          623024: "迭部县",
          623025: "玛曲县",
          623026: "碌曲县",
          623027: "夏河县",
          623028: "其它区",
          63e4: "青海省",
          630100: "西宁市",
          630102: "城东区",
          630103: "城中区",
          630104: "城西区",
          630105: "城北区",
          630121: "大通回族土族自治县",
          630122: "湟中县",
          630123: "湟源县",
          630124: "其它区",
          632100: "海东市",
          632121: "平安县",
          632122: "民和回族土族自治县",
          632123: "乐都区",
          632126: "互助土族自治县",
          632127: "化隆回族自治县",
          632128: "循化撒拉族自治县",
          632129: "其它区",
          632200: "海北藏族自治州",
          632221: "门源回族自治县",
          632222: "祁连县",
          632223: "海晏县",
          632224: "刚察县",
          632225: "其它区",
          632300: "黄南藏族自治州",
          632321: "同仁县",
          632322: "尖扎县",
          632323: "泽库县",
          632324: "河南蒙古族自治县",
          632325: "其它区",
          632500: "海南藏族自治州",
          632521: "共和县",
          632522: "同德县",
          632523: "贵德县",
          632524: "兴海县",
          632525: "贵南县",
          632526: "其它区",
          632600: "果洛藏族自治州",
          632621: "玛沁县",
          632622: "班玛县",
          632623: "甘德县",
          632624: "达日县",
          632625: "久治县",
          632626: "玛多县",
          632627: "其它区",
          632700: "玉树藏族自治州",
          632721: "玉树市",
          632722: "杂多县",
          632723: "称多县",
          632724: "治多县",
          632725: "囊谦县",
          632726: "曲麻莱县",
          632727: "其它区",
          632800: "海西蒙古族藏族自治州",
          632801: "格尔木市",
          632802: "德令哈市",
          632821: "乌兰县",
          632822: "都兰县",
          632823: "天峻县",
          632824: "其它区",
          64e4: "宁夏回族自治区",
          640100: "银川市",
          640104: "兴庆区",
          640105: "西夏区",
          640106: "金凤区",
          640121: "永宁县",
          640122: "贺兰县",
          640181: "灵武市",
          640182: "其它区",
          640200: "石嘴山市",
          640202: "大武口区",
          640205: "惠农区",
          640221: "平罗县",
          640222: "其它区",
          640300: "吴忠市",
          640302: "利通区",
          640303: "红寺堡区",
          640323: "盐池县",
          640324: "同心县",
          640381: "青铜峡市",
          640382: "其它区",
          640400: "固原市",
          640402: "原州区",
          640422: "西吉县",
          640423: "隆德县",
          640424: "泾源县",
          640425: "彭阳县",
          640426: "其它区",
          640500: "中卫市",
          640502: "沙坡头区",
          640521: "中宁县",
          640522: "海原县",
          640523: "其它区",
          65e4: "新疆维吾尔自治区",
          650100: "乌鲁木齐市",
          650102: "天山区",
          650103: "沙依巴克区",
          650104: "新市区",
          650105: "水磨沟区",
          650106: "头屯河区",
          650107: "达坂城区",
          650109: "米东区",
          650121: "乌鲁木齐县",
          650122: "其它区",
          650200: "克拉玛依市",
          650202: "独山子区",
          650203: "克拉玛依区",
          650204: "白碱滩区",
          650205: "乌尔禾区",
          650206: "其它区",
          652100: "吐鲁番地区",
          652101: "吐鲁番市",
          652122: "鄯善县",
          652123: "托克逊县",
          652124: "其它区",
          652200: "哈密地区",
          652201: "哈密市",
          652222: "巴里坤哈萨克自治县",
          652223: "伊吾县",
          652224: "其它区",
          652300: "昌吉回族自治州",
          652301: "昌吉市",
          652302: "阜康市",
          652323: "呼图壁县",
          652324: "玛纳斯县",
          652325: "奇台县",
          652327: "吉木萨尔县",
          652328: "木垒哈萨克自治县",
          652329: "其它区",
          652700: "博尔塔拉蒙古自治州",
          652701: "博乐市",
          652702: "阿拉山口市",
          652722: "精河县",
          652723: "温泉县",
          652724: "其它区",
          652800: "巴音郭楞蒙古自治州",
          652801: "库尔勒市",
          652822: "轮台县",
          652823: "尉犁县",
          652824: "若羌县",
          652825: "且末县",
          652826: "焉耆回族自治县",
          652827: "和静县",
          652828: "和硕县",
          652829: "博湖县",
          652830: "其它区",
          652900: "阿克苏地区",
          652901: "阿克苏市",
          652922: "温宿县",
          652923: "库车县",
          652924: "沙雅县",
          652925: "新和县",
          652926: "拜城县",
          652927: "乌什县",
          652928: "阿瓦提县",
          652929: "柯坪县",
          652930: "其它区",
          653e3: "克孜勒苏柯尔克孜自治州",
          653001: "阿图什市",
          653022: "阿克陶县",
          653023: "阿合奇县",
          653024: "乌恰县",
          653025: "其它区",
          653100: "喀什地区",
          653101: "喀什市",
          653121: "疏附县",
          653122: "疏勒县",
          653123: "英吉沙县",
          653124: "泽普县",
          653125: "莎车县",
          653126: "叶城县",
          653127: "麦盖提县",
          653128: "岳普湖县",
          653129: "伽师县",
          653130: "巴楚县",
          653131: "塔什库尔干塔吉克自治县",
          653132: "其它区",
          653200: "和田地区",
          653201: "和田市",
          653221: "和田县",
          653222: "墨玉县",
          653223: "皮山县",
          653224: "洛浦县",
          653225: "策勒县",
          653226: "于田县",
          653227: "民丰县",
          653228: "其它区",
          654e3: "伊犁哈萨克自治州",
          654002: "伊宁市",
          654003: "奎屯市",
          654021: "伊宁县",
          654022: "察布查尔锡伯自治县",
          654023: "霍城县",
          654024: "巩留县",
          654025: "新源县",
          654026: "昭苏县",
          654027: "特克斯县",
          654028: "尼勒克县",
          654029: "其它区",
          654200: "塔城地区",
          654201: "塔城市",
          654202: "乌苏市",
          654221: "额敏县",
          654223: "沙湾县",
          654224: "托里县",
          654225: "裕民县",
          654226: "和布克赛尔蒙古自治县",
          654227: "其它区",
          654300: "阿勒泰地区",
          654301: "阿勒泰市",
          654321: "布尔津县",
          654322: "富蕴县",
          654323: "福海县",
          654324: "哈巴河县",
          654325: "青河县",
          654326: "吉木乃县",
          654327: "其它区",
          659001: "石河子市",
          659002: "阿拉尔市",
          659003: "图木舒克市",
          659004: "五家渠市",
          71e4: "台湾",
          710100: "台北市",
          710101: "中正区",
          710102: "大同区",
          710103: "中山区",
          710104: "松山区",
          710105: "大安区",
          710106: "万华区",
          710107: "信义区",
          710108: "士林区",
          710109: "北投区",
          710110: "内湖区",
          710111: "南港区",
          710112: "文山区",
          710113: "其它区",
          710200: "高雄市",
          710201: "新兴区",
          710202: "前金区",
          710203: "芩雅区",
          710204: "盐埕区",
          710205: "鼓山区",
          710206: "旗津区",
          710207: "前镇区",
          710208: "三民区",
          710209: "左营区",
          710210: "楠梓区",
          710211: "小港区",
          710212: "其它区",
          710241: "苓雅区",
          710242: "仁武区",
          710243: "大社区",
          710244: "冈山区",
          710245: "路竹区",
          710246: "阿莲区",
          710247: "田寮区",
          710248: "燕巢区",
          710249: "桥头区",
          710250: "梓官区",
          710251: "弥陀区",
          710252: "永安区",
          710253: "湖内区",
          710254: "凤山区",
          710255: "大寮区",
          710256: "林园区",
          710257: "鸟松区",
          710258: "大树区",
          710259: "旗山区",
          710260: "美浓区",
          710261: "六龟区",
          710262: "内门区",
          710263: "杉林区",
          710264: "甲仙区",
          710265: "桃源区",
          710266: "那玛夏区",
          710267: "茂林区",
          710268: "茄萣区",
          710300: "台南市",
          710301: "中西区",
          710302: "东区",
          710303: "南区",
          710304: "北区",
          710305: "安平区",
          710306: "安南区",
          710307: "其它区",
          710339: "永康区",
          710340: "归仁区",
          710341: "新化区",
          710342: "左镇区",
          710343: "玉井区",
          710344: "楠西区",
          710345: "南化区",
          710346: "仁德区",
          710347: "关庙区",
          710348: "龙崎区",
          710349: "官田区",
          710350: "麻豆区",
          710351: "佳里区",
          710352: "西港区",
          710353: "七股区",
          710354: "将军区",
          710355: "学甲区",
          710356: "北门区",
          710357: "新营区",
          710358: "后壁区",
          710359: "白河区",
          710360: "东山区",
          710361: "六甲区",
          710362: "下营区",
          710363: "柳营区",
          710364: "盐水区",
          710365: "善化区",
          710366: "大内区",
          710367: "山上区",
          710368: "新市区",
          710369: "安定区",
          710400: "台中市",
          710401: "中区",
          710402: "东区",
          710403: "南区",
          710404: "西区",
          710405: "北区",
          710406: "北屯区",
          710407: "西屯区",
          710408: "南屯区",
          710409: "其它区",
          710431: "太平区",
          710432: "大里区",
          710433: "雾峰区",
          710434: "乌日区",
          710435: "丰原区",
          710436: "后里区",
          710437: "石冈区",
          710438: "东势区",
          710439: "和平区",
          710440: "新社区",
          710441: "潭子区",
          710442: "大雅区",
          710443: "神冈区",
          710444: "大肚区",
          710445: "沙鹿区",
          710446: "龙井区",
          710447: "梧栖区",
          710448: "清水区",
          710449: "大甲区",
          710450: "外埔区",
          710451: "大安区",
          710500: "金门县",
          710507: "金沙镇",
          710508: "金湖镇",
          710509: "金宁乡",
          710510: "金城镇",
          710511: "烈屿乡",
          710512: "乌坵乡",
          710600: "南投县",
          710614: "南投市",
          710615: "中寮乡",
          710616: "草屯镇",
          710617: "国姓乡",
          710618: "埔里镇",
          710619: "仁爱乡",
          710620: "名间乡",
          710621: "集集镇",
          710622: "水里乡",
          710623: "鱼池乡",
          710624: "信义乡",
          710625: "竹山镇",
          710626: "鹿谷乡",
          710700: "基隆市",
          710701: "仁爱区",
          710702: "信义区",
          710703: "中正区",
          710704: "中山区",
          710705: "安乐区",
          710706: "暖暖区",
          710707: "七堵区",
          710708: "其它区",
          710800: "新竹市",
          710801: "东区",
          710802: "北区",
          710803: "香山区",
          710804: "其它区",
          710900: "嘉义市",
          710901: "东区",
          710902: "西区",
          710903: "其它区",
          711100: "新北市",
          711130: "万里区",
          711131: "金山区",
          711132: "板桥区",
          711133: "汐止区",
          711134: "深坑区",
          711135: "石碇区",
          711136: "瑞芳区",
          711137: "平溪区",
          711138: "双溪区",
          711139: "贡寮区",
          711140: "新店区",
          711141: "坪林区",
          711142: "乌来区",
          711143: "永和区",
          711144: "中和区",
          711145: "土城区",
          711146: "三峡区",
          711147: "树林区",
          711148: "莺歌区",
          711149: "三重区",
          711150: "新庄区",
          711151: "泰山区",
          711152: "林口区",
          711153: "芦洲区",
          711154: "五股区",
          711155: "八里区",
          711156: "淡水区",
          711157: "三芝区",
          711158: "石门区",
          711200: "宜兰县",
          711214: "宜兰市",
          711215: "头城镇",
          711216: "礁溪乡",
          711217: "壮围乡",
          711218: "员山乡",
          711219: "罗东镇",
          711220: "三星乡",
          711221: "大同乡",
          711222: "五结乡",
          711223: "冬山乡",
          711224: "苏澳镇",
          711225: "南澳乡",
          711226: "钓鱼台",
          711300: "新竹县",
          711314: "竹北市",
          711315: "湖口乡",
          711316: "新丰乡",
          711317: "新埔镇",
          711318: "关西镇",
          711319: "芎林乡",
          711320: "宝山乡",
          711321: "竹东镇",
          711322: "五峰乡",
          711323: "横山乡",
          711324: "尖石乡",
          711325: "北埔乡",
          711326: "峨眉乡",
          711400: "桃园县",
          711414: "中坜市",
          711415: "平镇市",
          711416: "龙潭乡",
          711417: "杨梅市",
          711418: "新屋乡",
          711419: "观音乡",
          711420: "桃园市",
          711421: "龟山乡",
          711422: "八德市",
          711423: "大溪镇",
          711424: "复兴乡",
          711425: "大园乡",
          711426: "芦竹乡",
          711500: "苗栗县",
          711519: "竹南镇",
          711520: "头份镇",
          711521: "三湾乡",
          711522: "南庄乡",
          711523: "狮潭乡",
          711524: "后龙镇",
          711525: "通霄镇",
          711526: "苑里镇",
          711527: "苗栗市",
          711528: "造桥乡",
          711529: "头屋乡",
          711530: "公馆乡",
          711531: "大湖乡",
          711532: "泰安乡",
          711533: "铜锣乡",
          711534: "三义乡",
          711535: "西湖乡",
          711536: "卓兰镇",
          711700: "彰化县",
          711727: "彰化市",
          711728: "芬园乡",
          711729: "花坛乡",
          711730: "秀水乡",
          711731: "鹿港镇",
          711732: "福兴乡",
          711733: "线西乡",
          711734: "和美镇",
          711735: "伸港乡",
          711736: "员林镇",
          711737: "社头乡",
          711738: "永靖乡",
          711739: "埔心乡",
          711740: "溪湖镇",
          711741: "大村乡",
          711742: "埔盐乡",
          711743: "田中镇",
          711744: "北斗镇",
          711745: "田尾乡",
          711746: "埤头乡",
          711747: "溪州乡",
          711748: "竹塘乡",
          711749: "二林镇",
          711750: "大城乡",
          711751: "芳苑乡",
          711752: "二水乡",
          711900: "嘉义县",
          711919: "番路乡",
          711920: "梅山乡",
          711921: "竹崎乡",
          711922: "阿里山乡",
          711923: "中埔乡",
          711924: "大埔乡",
          711925: "水上乡",
          711926: "鹿草乡",
          711927: "太保市",
          711928: "朴子市",
          711929: "东石乡",
          711930: "六脚乡",
          711931: "新港乡",
          711932: "民雄乡",
          711933: "大林镇",
          711934: "溪口乡",
          711935: "义竹乡",
          711936: "布袋镇",
          712100: "云林县",
          712121: "斗南镇",
          712122: "大埤乡",
          712123: "虎尾镇",
          712124: "土库镇",
          712125: "褒忠乡",
          712126: "东势乡",
          712127: "台西乡",
          712128: "仑背乡",
          712129: "麦寮乡",
          712130: "斗六市",
          712131: "林内乡",
          712132: "古坑乡",
          712133: "莿桐乡",
          712134: "西螺镇",
          712135: "二仑乡",
          712136: "北港镇",
          712137: "水林乡",
          712138: "口湖乡",
          712139: "四湖乡",
          712140: "元长乡",
          712400: "屏东县",
          712434: "屏东市",
          712435: "三地门乡",
          712436: "雾台乡",
          712437: "玛家乡",
          712438: "九如乡",
          712439: "里港乡",
          712440: "高树乡",
          712441: "盐埔乡",
          712442: "长治乡",
          712443: "麟洛乡",
          712444: "竹田乡",
          712445: "内埔乡",
          712446: "万丹乡",
          712447: "潮州镇",
          712448: "泰武乡",
          712449: "来义乡",
          712450: "万峦乡",
          712451: "崁顶乡",
          712452: "新埤乡",
          712453: "南州乡",
          712454: "林边乡",
          712455: "东港镇",
          712456: "琉球乡",
          712457: "佳冬乡",
          712458: "新园乡",
          712459: "枋寮乡",
          712460: "枋山乡",
          712461: "春日乡",
          712462: "狮子乡",
          712463: "车城乡",
          712464: "牡丹乡",
          712465: "恒春镇",
          712466: "满州乡",
          712500: "台东县",
          712517: "台东市",
          712518: "绿岛乡",
          712519: "兰屿乡",
          712520: "延平乡",
          712521: "卑南乡",
          712522: "鹿野乡",
          712523: "关山镇",
          712524: "海端乡",
          712525: "池上乡",
          712526: "东河乡",
          712527: "成功镇",
          712528: "长滨乡",
          712529: "金峰乡",
          712530: "大武乡",
          712531: "达仁乡",
          712532: "太麻里乡",
          712600: "花莲县",
          712615: "花莲市",
          712616: "新城乡",
          712617: "太鲁阁",
          712618: "秀林乡",
          712619: "吉安乡",
          712620: "寿丰乡",
          712621: "凤林镇",
          712622: "光复乡",
          712623: "丰滨乡",
          712624: "瑞穗乡",
          712625: "万荣乡",
          712626: "玉里镇",
          712627: "卓溪乡",
          712628: "富里乡",
          712700: "澎湖县",
          712707: "马公市",
          712708: "西屿乡",
          712709: "望安乡",
          712710: "七美乡",
          712711: "白沙乡",
          712712: "湖西乡",
          712800: "连江县",
          712805: "南竿乡",
          712806: "北竿乡",
          712807: "莒光乡",
          712808: "东引乡",
          81e4: "香港特别行政区",
          810100: "香港岛",
          810101: "中西区",
          810102: "湾仔",
          810103: "东区",
          810104: "南区",
          810200: "九龙",
          810201: "九龙城区",
          810202: "油尖旺区",
          810203: "深水埗区",
          810204: "黄大仙区",
          810205: "观塘区",
          810300: "新界",
          810301: "北区",
          810302: "大埔区",
          810303: "沙田区",
          810304: "西贡区",
          810305: "元朗区",
          810306: "屯门区",
          810307: "荃湾区",
          810308: "葵青区",
          810309: "离岛区",
          82e4: "澳门特别行政区",
          820100: "澳门半岛",
          820200: "离岛",
          99e4: "海外",
          990100: "海外",
        };
        function r(o) {
          for (var l = {}, u = 0, f; u < o.length; u++)
            (f = o[u]), !(!f || !f.id) && (l[f.id] = f);
          for (var c = [], h = 0; h < o.length; h++)
            if (((f = o[h]), !!f)) {
              if (f.pid == null && f.parentId == null) {
                c.push(f);
                continue;
              }
              var v = l[f.pid] || l[f.parentId];
              v && (v.children || (v.children = []), v.children.push(f));
            }
          return c;
        }
        var s = (function () {
          var o = [];
          for (var l in n) {
            var u =
              l.slice(2, 6) === "0000"
                ? void 0
                : l.slice(4, 6) == "00"
                ? l.slice(0, 2) + "0000"
                : l.slice(0, 4) + "00";
            o.push({ id: l, pid: u, name: n[l] });
          }
          return r(o);
        })();
        e.exports = s;
      },
      function (e, t, n) {
        var r = n(18);
        e.exports = {
          d4: function () {
            return this.natural(1, 4);
          },
          d6: function () {
            return this.natural(1, 6);
          },
          d8: function () {
            return this.natural(1, 8);
          },
          d12: function () {
            return this.natural(1, 12);
          },
          d20: function () {
            return this.natural(1, 20);
          },
          d100: function () {
            return this.natural(1, 100);
          },
          guid: function () {
            var s = "abcdefABCDEF1234567890",
              o =
                this.string(s, 8) +
                "-" +
                this.string(s, 4) +
                "-" +
                this.string(s, 4) +
                "-" +
                this.string(s, 4) +
                "-" +
                this.string(s, 12);
            return o;
          },
          uuid: function () {
            return this.guid();
          },
          id: function () {
            var s,
              o = 0,
              l = [
                "7",
                "9",
                "10",
                "5",
                "8",
                "4",
                "2",
                "1",
                "6",
                "3",
                "7",
                "9",
                "10",
                "5",
                "8",
                "4",
                "2",
              ],
              u = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
            s =
              this.pick(r).id +
              this.date("yyyyMMdd") +
              this.string("number", 3);
            for (var f = 0; f < s.length; f++) o += s[f] * l[f];
            return (s += u[o % 11]), s;
          },
          increment: (function () {
            var s = 0;
            return function (o) {
              return (s += +o || 1);
            };
          })(),
          inc: function (s) {
            return this.increment(s);
          },
        };
      },
      function (e, t, n) {
        var r = n(21),
          s = n(22);
        e.exports = { Parser: r, Handler: s };
      },
      function (e, t) {
        function n(P) {
          (this.type = P), (this.offset = n.offset()), (this.text = n.text());
        }
        function r(P, W) {
          n.call(this, "alternate"), (this.left = P), (this.right = W);
        }
        function s(P) {
          n.call(this, "match"), (this.body = P.filter(Boolean));
        }
        function o(P, W) {
          n.call(this, P), (this.body = W);
        }
        function l(P) {
          o.call(this, "capture-group"),
            (this.index = K[this.offset] || (K[this.offset] = L++)),
            (this.body = P);
        }
        function u(P, W) {
          n.call(this, "quantified"), (this.body = P), (this.quantifier = W);
        }
        function f(P, W) {
          n.call(this, "quantifier"),
            (this.min = P),
            (this.max = W),
            (this.greedy = !0);
        }
        function c(P, W) {
          n.call(this, "charset"), (this.invert = P), (this.body = W);
        }
        function h(P, W) {
          n.call(this, "range"), (this.start = P), (this.end = W);
        }
        function v(P) {
          n.call(this, "literal"),
            (this.body = P),
            (this.escaped = this.body != this.text);
        }
        function x(P) {
          n.call(this, "unicode"), (this.code = P.toUpperCase());
        }
        function R(P) {
          n.call(this, "hex"), (this.code = P.toUpperCase());
        }
        function g(P) {
          n.call(this, "octal"), (this.code = P.toUpperCase());
        }
        function y(P) {
          n.call(this, "back-reference"), (this.code = P.toUpperCase());
        }
        function A(P) {
          n.call(this, "control-character"), (this.code = P.toUpperCase());
        }
        var O = (function () {
            function P(T, Y) {
              function se() {
                this.constructor = T;
              }
              (se.prototype = Y.prototype), (T.prototype = new se());
            }
            function W(T, Y, se, oe, H) {
              function ye(ae, ve) {
                function be(G) {
                  function ce(le) {
                    return le.charCodeAt(0).toString(16).toUpperCase();
                  }
                  return G.replace(/\\/g, "\\\\")
                    .replace(/"/g, '\\"')
                    .replace(/\x08/g, "\\b")
                    .replace(/\t/g, "\\t")
                    .replace(/\n/g, "\\n")
                    .replace(/\f/g, "\\f")
                    .replace(/\r/g, "\\r")
                    .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (le) {
                      return "\\x0" + ce(le);
                    })
                    .replace(/[\x10-\x1F\x80-\xFF]/g, function (le) {
                      return "\\x" + ce(le);
                    })
                    .replace(/[\u0180-\u0FFF]/g, function (le) {
                      return "\\u0" + ce(le);
                    })
                    .replace(/[\u1080-\uFFFF]/g, function (le) {
                      return "\\u" + ce(le);
                    });
                }
                var ie, te;
                switch (ae.length) {
                  case 0:
                    ie = "end of input";
                    break;
                  case 1:
                    ie = ae[0];
                    break;
                  default:
                    ie =
                      ae.slice(0, -1).join(", ") + " or " + ae[ae.length - 1];
                }
                return (
                  (te = ve ? '"' + be(ve) + '"' : "end of input"),
                  "Expected " + ie + " but " + te + " found."
                );
              }
              (this.expected = T),
                (this.found = Y),
                (this.offset = se),
                (this.line = oe),
                (this.column = H),
                (this.name = "SyntaxError"),
                (this.message = ye(T, Y));
            }
            function Z(T) {
              function Y() {
                return T.substring(z, m);
              }
              function se() {
                return z;
              }
              function oe(a) {
                function d(C, D, X) {
                  var Re, ke;
                  for (Re = D; X > Re; Re++)
                    (ke = T.charAt(Re)),
                      ke ===
                      `
`
                        ? (C.seenCR || C.line++,
                          (C.column = 1),
                          (C.seenCR = !1))
                        : ke === "\r" || ke === "\u2028" || ke === "\u2029"
                        ? (C.line++, (C.column = 1), (C.seenCR = !0))
                        : (C.column++, (C.seenCR = !1));
                }
                return (
                  Ie !== a &&
                    (Ie > a &&
                      ((Ie = 0), (We = { line: 1, column: 1, seenCR: !1 })),
                    d(We, Ie, a),
                    (Ie = a)),
                  We
                );
              }
              function H(a) {
                Be > m || (m > Be && ((Be = m), (Le = [])), Le.push(a));
              }
              function ye(a) {
                var d = 0;
                for (a.sort(); d < a.length; )
                  a[d - 1] === a[d] ? a.splice(d, 1) : d++;
              }
              function ae() {
                var a, d, C, D, X;
                return (
                  (a = m),
                  (d = ve()),
                  d !== null
                    ? ((C = m),
                      T.charCodeAt(m) === 124
                        ? ((D = Ht), m++)
                        : ((D = null), N === 0 && H($t)),
                      D !== null
                        ? ((X = ae()),
                          X !== null
                            ? ((D = [D, X]), (C = D))
                            : ((m = C), (C = j)))
                        : ((m = C), (C = j)),
                      C === null && (C = Ce),
                      C !== null
                        ? ((z = a),
                          (d = Dt(d, C)),
                          d === null && (m = a),
                          (a = d))
                        : ((m = a), (a = j)))
                    : ((m = a), (a = j)),
                  a
                );
              }
              function ve() {
                var a, d, C, D, X;
                if (((a = m), (d = ie()), d === null && (d = Ce), d !== null))
                  if (
                    ((C = m),
                    N++,
                    (D = ce()),
                    N--,
                    D === null ? (C = Ce) : ((m = C), (C = j)),
                    C !== null)
                  ) {
                    for (
                      D = [], X = G(), X === null && (X = be());
                      X !== null;

                    )
                      D.push(X), (X = G()), X === null && (X = be());
                    D !== null
                      ? ((X = te()),
                        X === null && (X = Ce),
                        X !== null
                          ? ((z = a),
                            (d = Bt(d, D, X)),
                            d === null && (m = a),
                            (a = d))
                          : ((m = a), (a = j)))
                      : ((m = a), (a = j));
                  } else (m = a), (a = j);
                else (m = a), (a = j);
                return a;
              }
              function be() {
                var a;
                return (
                  (a = xe()),
                  a === null && ((a = w()), a === null && (a = k())),
                  a
                );
              }
              function ie() {
                var a, d;
                return (
                  (a = m),
                  T.charCodeAt(m) === 94
                    ? ((d = tt), m++)
                    : ((d = null), N === 0 && H(nt)),
                  d !== null && ((z = a), (d = Lt())),
                  d === null && (m = a),
                  (a = d),
                  a
                );
              }
              function te() {
                var a, d;
                return (
                  (a = m),
                  T.charCodeAt(m) === 36
                    ? ((d = jt), m++)
                    : ((d = null), N === 0 && H(Ut)),
                  d !== null && ((z = a), (d = qt())),
                  d === null && (m = a),
                  (a = d),
                  a
                );
              }
              function G() {
                var a, d, C;
                return (
                  (a = m),
                  (d = be()),
                  d !== null
                    ? ((C = ce()),
                      C !== null
                        ? ((z = a),
                          (d = zt(d, C)),
                          d === null && (m = a),
                          (a = d))
                        : ((m = a), (a = j)))
                    : ((m = a), (a = j)),
                  a
                );
              }
              function ce() {
                var a, d, C;
                return (
                  N++,
                  (a = m),
                  (d = le()),
                  d !== null
                    ? ((C = we()),
                      C === null && (C = Ce),
                      C !== null
                        ? ((z = a),
                          (d = Kt(d, C)),
                          d === null && (m = a),
                          (a = d))
                        : ((m = a), (a = j)))
                    : ((m = a), (a = j)),
                  N--,
                  a === null && ((d = null), N === 0 && H(Vt)),
                  a
                );
              }
              function le() {
                var a;
                return (
                  (a = me()),
                  a === null &&
                    ((a = he()),
                    a === null &&
                      ((a = Fe()),
                      a === null &&
                        ((a = je()),
                        a === null && ((a = Ue()), a === null && (a = pe()))))),
                  a
                );
              }
              function me() {
                var a, d, C, D, X, Re;
                return (
                  (a = m),
                  T.charCodeAt(m) === 123
                    ? ((d = ze), m++)
                    : ((d = null), N === 0 && H(Ve)),
                  d !== null
                    ? ((C = Ae()),
                      C !== null
                        ? (T.charCodeAt(m) === 44
                            ? ((D = Wt), m++)
                            : ((D = null), N === 0 && H(Jt)),
                          D !== null
                            ? ((X = Ae()),
                              X !== null
                                ? (T.charCodeAt(m) === 125
                                    ? ((Re = rt), m++)
                                    : ((Re = null), N === 0 && H(st)),
                                  Re !== null
                                    ? ((z = a),
                                      (d = Yt(C, X)),
                                      d === null && (m = a),
                                      (a = d))
                                    : ((m = a), (a = j)))
                                : ((m = a), (a = j)))
                            : ((m = a), (a = j)))
                        : ((m = a), (a = j)))
                    : ((m = a), (a = j)),
                  a
                );
              }
              function he() {
                var a, d, C, D;
                return (
                  (a = m),
                  T.charCodeAt(m) === 123
                    ? ((d = ze), m++)
                    : ((d = null), N === 0 && H(Ve)),
                  d !== null
                    ? ((C = Ae()),
                      C !== null
                        ? (T.substr(m, 2) === it
                            ? ((D = it), (m += 2))
                            : ((D = null), N === 0 && H(Xt)),
                          D !== null
                            ? ((z = a),
                              (d = Gt(C)),
                              d === null && (m = a),
                              (a = d))
                            : ((m = a), (a = j)))
                        : ((m = a), (a = j)))
                    : ((m = a), (a = j)),
                  a
                );
              }
              function Fe() {
                var a, d, C, D;
                return (
                  (a = m),
                  T.charCodeAt(m) === 123
                    ? ((d = ze), m++)
                    : ((d = null), N === 0 && H(Ve)),
                  d !== null
                    ? ((C = Ae()),
                      C !== null
                        ? (T.charCodeAt(m) === 125
                            ? ((D = rt), m++)
                            : ((D = null), N === 0 && H(st)),
                          D !== null
                            ? ((z = a),
                              (d = Qt(C)),
                              d === null && (m = a),
                              (a = d))
                            : ((m = a), (a = j)))
                        : ((m = a), (a = j)))
                    : ((m = a), (a = j)),
                  a
                );
              }
              function je() {
                var a, d;
                return (
                  (a = m),
                  T.charCodeAt(m) === 43
                    ? ((d = Zt), m++)
                    : ((d = null), N === 0 && H(en)),
                  d !== null && ((z = a), (d = tn())),
                  d === null && (m = a),
                  (a = d),
                  a
                );
              }
              function Ue() {
                var a, d;
                return (
                  (a = m),
                  T.charCodeAt(m) === 42
                    ? ((d = nn), m++)
                    : ((d = null), N === 0 && H(rn)),
                  d !== null && ((z = a), (d = sn())),
                  d === null && (m = a),
                  (a = d),
                  a
                );
              }
              function pe() {
                var a, d;
                return (
                  (a = m),
                  T.charCodeAt(m) === 63
                    ? ((d = ot), m++)
                    : ((d = null), N === 0 && H(at)),
                  d !== null && ((z = a), (d = on())),
                  d === null && (m = a),
                  (a = d),
                  a
                );
              }
              function we() {
                var a;
                return (
                  T.charCodeAt(m) === 63
                    ? ((a = ot), m++)
                    : ((a = null), N === 0 && H(at)),
                  a
                );
              }
              function Ae() {
                var a, d, C;
                if (
                  ((a = m),
                  (d = []),
                  lt.test(T.charAt(m))
                    ? ((C = T.charAt(m)), m++)
                    : ((C = null), N === 0 && H(ut)),
                  C !== null)
                )
                  for (; C !== null; )
                    d.push(C),
                      lt.test(T.charAt(m))
                        ? ((C = T.charAt(m)), m++)
                        : ((C = null), N === 0 && H(ut));
                else d = j;
                return (
                  d !== null && ((z = a), (d = an(d))),
                  d === null && (m = a),
                  (a = d),
                  a
                );
              }
              function xe() {
                var a, d, C, D;
                return (
                  (a = m),
                  T.charCodeAt(m) === 40
                    ? ((d = ln), m++)
                    : ((d = null), N === 0 && H(un)),
                  d !== null
                    ? ((C = b()),
                      C === null &&
                        ((C = E()),
                        C === null && ((C = _e()), C === null && (C = Oe()))),
                      C !== null
                        ? (T.charCodeAt(m) === 41
                            ? ((D = cn), m++)
                            : ((D = null), N === 0 && H(fn)),
                          D !== null
                            ? ((z = a),
                              (d = dn(C)),
                              d === null && (m = a),
                              (a = d))
                            : ((m = a), (a = j)))
                        : ((m = a), (a = j)))
                    : ((m = a), (a = j)),
                  a
                );
              }
              function Oe() {
                var a, d;
                return (
                  (a = m),
                  (d = ae()),
                  d !== null && ((z = a), (d = hn(d))),
                  d === null && (m = a),
                  (a = d),
                  a
                );
              }
              function _e() {
                var a, d, C;
                return (
                  (a = m),
                  T.substr(m, 2) === ct
                    ? ((d = ct), (m += 2))
                    : ((d = null), N === 0 && H(pn)),
                  d !== null
                    ? ((C = ae()),
                      C !== null
                        ? ((z = a), (d = mn(C)), d === null && (m = a), (a = d))
                        : ((m = a), (a = j)))
                    : ((m = a), (a = j)),
                  a
                );
              }
              function b() {
                var a, d, C;
                return (
                  (a = m),
                  T.substr(m, 2) === ft
                    ? ((d = ft), (m += 2))
                    : ((d = null), N === 0 && H(gn)),
                  d !== null
                    ? ((C = ae()),
                      C !== null
                        ? ((z = a), (d = yn(C)), d === null && (m = a), (a = d))
                        : ((m = a), (a = j)))
                    : ((m = a), (a = j)),
                  a
                );
              }
              function E() {
                var a, d, C;
                return (
                  (a = m),
                  T.substr(m, 2) === dt
                    ? ((d = dt), (m += 2))
                    : ((d = null), N === 0 && H(vn)),
                  d !== null
                    ? ((C = ae()),
                      C !== null
                        ? ((z = a), (d = bn(C)), d === null && (m = a), (a = d))
                        : ((m = a), (a = j)))
                    : ((m = a), (a = j)),
                  a
                );
              }
              function w() {
                var a, d, C, D, X;
                if (
                  (N++,
                  (a = m),
                  T.charCodeAt(m) === 91
                    ? ((d = En), m++)
                    : ((d = null), N === 0 && H(Rn)),
                  d !== null)
                )
                  if (
                    (T.charCodeAt(m) === 94
                      ? ((C = tt), m++)
                      : ((C = null), N === 0 && H(nt)),
                    C === null && (C = Ce),
                    C !== null)
                  ) {
                    for (D = [], X = S(), X === null && (X = _()); X !== null; )
                      D.push(X), (X = S()), X === null && (X = _());
                    D !== null
                      ? (T.charCodeAt(m) === 93
                          ? ((X = An), m++)
                          : ((X = null), N === 0 && H(wn)),
                        X !== null
                          ? ((z = a),
                            (d = Cn(C, D)),
                            d === null && (m = a),
                            (a = d))
                          : ((m = a), (a = j)))
                      : ((m = a), (a = j));
                  } else (m = a), (a = j);
                else (m = a), (a = j);
                return N--, a === null && ((d = null), N === 0 && H(xn)), a;
              }
              function S() {
                var a, d, C, D;
                return (
                  N++,
                  (a = m),
                  (d = _()),
                  d !== null
                    ? (T.charCodeAt(m) === 45
                        ? ((C = _n), m++)
                        : ((C = null), N === 0 && H(Tn)),
                      C !== null
                        ? ((D = _()),
                          D !== null
                            ? ((z = a),
                              (d = Sn(d, D)),
                              d === null && (m = a),
                              (a = d))
                            : ((m = a), (a = j)))
                        : ((m = a), (a = j)))
                    : ((m = a), (a = j)),
                  N--,
                  a === null && ((d = null), N === 0 && H(On)),
                  a
                );
              }
              function _() {
                var a;
                return (
                  N++,
                  (a = $()),
                  a === null && (a = F()),
                  N--,
                  a === null && N === 0 && H(Pn),
                  a
                );
              }
              function F() {
                var a, d;
                return (
                  (a = m),
                  In.test(T.charAt(m))
                    ? ((d = T.charAt(m)), m++)
                    : ((d = null), N === 0 && H(kn)),
                  d !== null && ((z = a), (d = Ke(d))),
                  d === null && (m = a),
                  (a = d),
                  a
                );
              }
              function $() {
                var a;
                return (
                  (a = B()),
                  a === null &&
                    ((a = Pe()),
                    a === null &&
                      ((a = J()),
                      a === null &&
                        ((a = ee()),
                        a === null &&
                          ((a = Q()),
                          a === null &&
                            ((a = ne()),
                            a === null &&
                              ((a = fe()),
                              a === null &&
                                ((a = ge()),
                                a === null &&
                                  ((a = Te()),
                                  a === null &&
                                    ((a = Ee()),
                                    a === null &&
                                      ((a = Se()),
                                      a === null &&
                                        ((a = ue()),
                                        a === null &&
                                          ((a = de()),
                                          a === null &&
                                            ((a = Je()),
                                            a === null &&
                                              ((a = Ye()),
                                              a === null &&
                                                ((a = Xe()),
                                                a === null &&
                                                  ((a = Ge()),
                                                  a === null &&
                                                    (a = Qe()))))))))))))))))),
                  a
                );
              }
              function k() {
                var a;
                return (
                  (a = M()),
                  a === null && ((a = U()), a === null && (a = I())),
                  a
                );
              }
              function M() {
                var a, d;
                return (
                  (a = m),
                  T.charCodeAt(m) === 46
                    ? ((d = Fn), m++)
                    : ((d = null), N === 0 && H(Mn)),
                  d !== null && ((z = a), (d = Nn())),
                  d === null && (m = a),
                  (a = d),
                  a
                );
              }
              function I() {
                var a, d;
                return (
                  N++,
                  (a = m),
                  $n.test(T.charAt(m))
                    ? ((d = T.charAt(m)), m++)
                    : ((d = null), N === 0 && H(Dn)),
                  d !== null && ((z = a), (d = Ke(d))),
                  d === null && (m = a),
                  (a = d),
                  N--,
                  a === null && ((d = null), N === 0 && H(Hn)),
                  a
                );
              }
              function U() {
                var a;
                return (
                  (a = q()),
                  a === null &&
                    ((a = V()),
                    a === null &&
                      ((a = Pe()),
                      a === null &&
                        ((a = J()),
                        a === null &&
                          ((a = ee()),
                          a === null &&
                            ((a = Q()),
                            a === null &&
                              ((a = ne()),
                              a === null &&
                                ((a = fe()),
                                a === null &&
                                  ((a = ge()),
                                  a === null &&
                                    ((a = Te()),
                                    a === null &&
                                      ((a = Ee()),
                                      a === null &&
                                        ((a = Se()),
                                        a === null &&
                                          ((a = ue()),
                                          a === null &&
                                            ((a = de()),
                                            a === null &&
                                              ((a = Nt()),
                                              a === null &&
                                                ((a = Je()),
                                                a === null &&
                                                  ((a = Ye()),
                                                  a === null &&
                                                    ((a = Xe()),
                                                    a === null &&
                                                      ((a = Ge()),
                                                      a === null &&
                                                        (a =
                                                          Qe()))))))))))))))))))),
                  a
                );
              }
              function B() {
                var a, d;
                return (
                  (a = m),
                  T.substr(m, 2) === Ne
                    ? ((d = Ne), (m += 2))
                    : ((d = null), N === 0 && H(ht)),
                  d !== null && ((z = a), (d = Bn())),
                  d === null && (m = a),
                  (a = d),
                  a
                );
              }
              function q() {
                var a, d;
                return (
                  (a = m),
                  T.substr(m, 2) === Ne
                    ? ((d = Ne), (m += 2))
                    : ((d = null), N === 0 && H(ht)),
                  d !== null && ((z = a), (d = Ln())),
                  d === null && (m = a),
                  (a = d),
                  a
                );
              }
              function V() {
                var a, d;
                return (
                  (a = m),
                  T.substr(m, 2) === pt
                    ? ((d = pt), (m += 2))
                    : ((d = null), N === 0 && H(jn)),
                  d !== null && ((z = a), (d = Un())),
                  d === null && (m = a),
                  (a = d),
                  a
                );
              }
              function J() {
                var a, d;
                return (
                  (a = m),
                  T.substr(m, 2) === mt
                    ? ((d = mt), (m += 2))
                    : ((d = null), N === 0 && H(qn)),
                  d !== null && ((z = a), (d = zn())),
                  d === null && (m = a),
                  (a = d),
                  a
                );
              }
              function ee() {
                var a, d;
                return (
                  (a = m),
                  T.substr(m, 2) === gt
                    ? ((d = gt), (m += 2))
                    : ((d = null), N === 0 && H(Vn)),
                  d !== null && ((z = a), (d = Kn())),
                  d === null && (m = a),
                  (a = d),
                  a
                );
              }
              function Q() {
                var a, d;
                return (
                  (a = m),
                  T.substr(m, 2) === yt
                    ? ((d = yt), (m += 2))
                    : ((d = null), N === 0 && H(Wn)),
                  d !== null && ((z = a), (d = Jn())),
                  d === null && (m = a),
                  (a = d),
                  a
                );
              }
              function ne() {
                var a, d;
                return (
                  (a = m),
                  T.substr(m, 2) === vt
                    ? ((d = vt), (m += 2))
                    : ((d = null), N === 0 && H(Yn)),
                  d !== null && ((z = a), (d = Xn())),
                  d === null && (m = a),
                  (a = d),
                  a
                );
              }
              function fe() {
                var a, d;
                return (
                  (a = m),
                  T.substr(m, 2) === bt
                    ? ((d = bt), (m += 2))
                    : ((d = null), N === 0 && H(Gn)),
                  d !== null && ((z = a), (d = Qn())),
                  d === null && (m = a),
                  (a = d),
                  a
                );
              }
              function ge() {
                var a, d;
                return (
                  (a = m),
                  T.substr(m, 2) === xt
                    ? ((d = xt), (m += 2))
                    : ((d = null), N === 0 && H(Zn)),
                  d !== null && ((z = a), (d = er())),
                  d === null && (m = a),
                  (a = d),
                  a
                );
              }
              function Te() {
                var a, d;
                return (
                  (a = m),
                  T.substr(m, 2) === Et
                    ? ((d = Et), (m += 2))
                    : ((d = null), N === 0 && H(tr)),
                  d !== null && ((z = a), (d = nr())),
                  d === null && (m = a),
                  (a = d),
                  a
                );
              }
              function Ee() {
                var a, d;
                return (
                  (a = m),
                  T.substr(m, 2) === Rt
                    ? ((d = Rt), (m += 2))
                    : ((d = null), N === 0 && H(rr)),
                  d !== null && ((z = a), (d = sr())),
                  d === null && (m = a),
                  (a = d),
                  a
                );
              }
              function Se() {
                var a, d;
                return (
                  (a = m),
                  T.substr(m, 2) === At
                    ? ((d = At), (m += 2))
                    : ((d = null), N === 0 && H(ir)),
                  d !== null && ((z = a), (d = or())),
                  d === null && (m = a),
                  (a = d),
                  a
                );
              }
              function ue() {
                var a, d;
                return (
                  (a = m),
                  T.substr(m, 2) === wt
                    ? ((d = wt), (m += 2))
                    : ((d = null), N === 0 && H(ar)),
                  d !== null && ((z = a), (d = lr())),
                  d === null && (m = a),
                  (a = d),
                  a
                );
              }
              function de() {
                var a, d;
                return (
                  (a = m),
                  T.substr(m, 2) === Ct
                    ? ((d = Ct), (m += 2))
                    : ((d = null), N === 0 && H(ur)),
                  d !== null && ((z = a), (d = cr())),
                  d === null && (m = a),
                  (a = d),
                  a
                );
              }
              function Pe() {
                var a, d, C;
                return (
                  (a = m),
                  T.substr(m, 2) === Ot
                    ? ((d = Ot), (m += 2))
                    : ((d = null), N === 0 && H(fr)),
                  d !== null
                    ? (T.length > m
                        ? ((C = T.charAt(m)), m++)
                        : ((C = null), N === 0 && H(_t)),
                      C !== null
                        ? ((z = a), (d = dr(C)), d === null && (m = a), (a = d))
                        : ((m = a), (a = j)))
                    : ((m = a), (a = j)),
                  a
                );
              }
              function Nt() {
                var a, d, C;
                return (
                  (a = m),
                  T.charCodeAt(m) === 92
                    ? ((d = Tt), m++)
                    : ((d = null), N === 0 && H(St)),
                  d !== null
                    ? (hr.test(T.charAt(m))
                        ? ((C = T.charAt(m)), m++)
                        : ((C = null), N === 0 && H(pr)),
                      C !== null
                        ? ((z = a), (d = mr(C)), d === null && (m = a), (a = d))
                        : ((m = a), (a = j)))
                    : ((m = a), (a = j)),
                  a
                );
              }
              function Je() {
                var a, d, C, D;
                if (
                  ((a = m),
                  T.substr(m, 2) === He
                    ? ((d = He), (m += 2))
                    : ((d = null), N === 0 && H(Pt)),
                  d !== null)
                ) {
                  if (
                    ((C = []),
                    It.test(T.charAt(m))
                      ? ((D = T.charAt(m)), m++)
                      : ((D = null), N === 0 && H(kt)),
                    D !== null)
                  )
                    for (; D !== null; )
                      C.push(D),
                        It.test(T.charAt(m))
                          ? ((D = T.charAt(m)), m++)
                          : ((D = null), N === 0 && H(kt));
                  else C = j;
                  C !== null
                    ? ((z = a), (d = gr(C)), d === null && (m = a), (a = d))
                    : ((m = a), (a = j));
                } else (m = a), (a = j);
                return a;
              }
              function Ye() {
                var a, d, C, D;
                if (
                  ((a = m),
                  T.substr(m, 2) === Ft
                    ? ((d = Ft), (m += 2))
                    : ((d = null), N === 0 && H(yr)),
                  d !== null)
                ) {
                  if (
                    ((C = []),
                    $e.test(T.charAt(m))
                      ? ((D = T.charAt(m)), m++)
                      : ((D = null), N === 0 && H(De)),
                    D !== null)
                  )
                    for (; D !== null; )
                      C.push(D),
                        $e.test(T.charAt(m))
                          ? ((D = T.charAt(m)), m++)
                          : ((D = null), N === 0 && H(De));
                  else C = j;
                  C !== null
                    ? ((z = a), (d = vr(C)), d === null && (m = a), (a = d))
                    : ((m = a), (a = j));
                } else (m = a), (a = j);
                return a;
              }
              function Xe() {
                var a, d, C, D;
                if (
                  ((a = m),
                  T.substr(m, 2) === Mt
                    ? ((d = Mt), (m += 2))
                    : ((d = null), N === 0 && H(br)),
                  d !== null)
                ) {
                  if (
                    ((C = []),
                    $e.test(T.charAt(m))
                      ? ((D = T.charAt(m)), m++)
                      : ((D = null), N === 0 && H(De)),
                    D !== null)
                  )
                    for (; D !== null; )
                      C.push(D),
                        $e.test(T.charAt(m))
                          ? ((D = T.charAt(m)), m++)
                          : ((D = null), N === 0 && H(De));
                  else C = j;
                  C !== null
                    ? ((z = a), (d = xr(C)), d === null && (m = a), (a = d))
                    : ((m = a), (a = j));
                } else (m = a), (a = j);
                return a;
              }
              function Ge() {
                var a, d;
                return (
                  (a = m),
                  T.substr(m, 2) === He
                    ? ((d = He), (m += 2))
                    : ((d = null), N === 0 && H(Pt)),
                  d !== null && ((z = a), (d = Er())),
                  d === null && (m = a),
                  (a = d),
                  a
                );
              }
              function Qe() {
                var a, d, C;
                return (
                  (a = m),
                  T.charCodeAt(m) === 92
                    ? ((d = Tt), m++)
                    : ((d = null), N === 0 && H(St)),
                  d !== null
                    ? (T.length > m
                        ? ((C = T.charAt(m)), m++)
                        : ((C = null), N === 0 && H(_t)),
                      C !== null
                        ? ((z = a), (d = Ke(C)), d === null && (m = a), (a = d))
                        : ((m = a), (a = j)))
                    : ((m = a), (a = j)),
                  a
                );
              }
              var qe,
                Me = arguments.length > 1 ? arguments[1] : {},
                Ze = { regexp: ae },
                et = ae,
                j = null,
                Ce = "",
                Ht = "|",
                $t = '"|"',
                Dt = function (a, d) {
                  return d ? new r(a, d[1]) : a;
                },
                Bt = function (a, d, C) {
                  return new s([a].concat(d).concat([C]));
                },
                tt = "^",
                nt = '"^"',
                Lt = function () {
                  return new n("start");
                },
                jt = "$",
                Ut = '"$"',
                qt = function () {
                  return new n("end");
                },
                zt = function (a, d) {
                  return new u(a, d);
                },
                Vt = "Quantifier",
                Kt = function (a, d) {
                  return d && (a.greedy = !1), a;
                },
                ze = "{",
                Ve = '"{"',
                Wt = ",",
                Jt = '","',
                rt = "}",
                st = '"}"',
                Yt = function (a, d) {
                  return new f(a, d);
                },
                it = ",}",
                Xt = '",}"',
                Gt = function (a) {
                  return new f(a, 1 / 0);
                },
                Qt = function (a) {
                  return new f(a, a);
                },
                Zt = "+",
                en = '"+"',
                tn = function () {
                  return new f(1, 1 / 0);
                },
                nn = "*",
                rn = '"*"',
                sn = function () {
                  return new f(0, 1 / 0);
                },
                ot = "?",
                at = '"?"',
                on = function () {
                  return new f(0, 1);
                },
                lt = /^[0-9]/,
                ut = "[0-9]",
                an = function (a) {
                  return +a.join("");
                },
                ln = "(",
                un = '"("',
                cn = ")",
                fn = '")"',
                dn = function (a) {
                  return a;
                },
                hn = function (a) {
                  return new l(a);
                },
                ct = "?:",
                pn = '"?:"',
                mn = function (a) {
                  return new o("non-capture-group", a);
                },
                ft = "?=",
                gn = '"?="',
                yn = function (a) {
                  return new o("positive-lookahead", a);
                },
                dt = "?!",
                vn = '"?!"',
                bn = function (a) {
                  return new o("negative-lookahead", a);
                },
                xn = "CharacterSet",
                En = "[",
                Rn = '"["',
                An = "]",
                wn = '"]"',
                Cn = function (a, d) {
                  return new c(!!a, d);
                },
                On = "CharacterRange",
                _n = "-",
                Tn = '"-"',
                Sn = function (a, d) {
                  return new h(a, d);
                },
                Pn = "Character",
                In = /^[^\\\]]/,
                kn = "[^\\\\\\]]",
                Ke = function (a) {
                  return new v(a);
                },
                Fn = ".",
                Mn = '"."',
                Nn = function () {
                  return new n("any-character");
                },
                Hn = "Literal",
                $n = /^[^|\\\/.[()?+*$\^]/,
                Dn = "[^|\\\\\\/.[()?+*$\\^]",
                Ne = "\\b",
                ht = '"\\\\b"',
                Bn = function () {
                  return new n("backspace");
                },
                Ln = function () {
                  return new n("word-boundary");
                },
                pt = "\\B",
                jn = '"\\\\B"',
                Un = function () {
                  return new n("non-word-boundary");
                },
                mt = "\\d",
                qn = '"\\\\d"',
                zn = function () {
                  return new n("digit");
                },
                gt = "\\D",
                Vn = '"\\\\D"',
                Kn = function () {
                  return new n("non-digit");
                },
                yt = "\\f",
                Wn = '"\\\\f"',
                Jn = function () {
                  return new n("form-feed");
                },
                vt = "\\n",
                Yn = '"\\\\n"',
                Xn = function () {
                  return new n("line-feed");
                },
                bt = "\\r",
                Gn = '"\\\\r"',
                Qn = function () {
                  return new n("carriage-return");
                },
                xt = "\\s",
                Zn = '"\\\\s"',
                er = function () {
                  return new n("white-space");
                },
                Et = "\\S",
                tr = '"\\\\S"',
                nr = function () {
                  return new n("non-white-space");
                },
                Rt = "\\t",
                rr = '"\\\\t"',
                sr = function () {
                  return new n("tab");
                },
                At = "\\v",
                ir = '"\\\\v"',
                or = function () {
                  return new n("vertical-tab");
                },
                wt = "\\w",
                ar = '"\\\\w"',
                lr = function () {
                  return new n("word");
                },
                Ct = "\\W",
                ur = '"\\\\W"',
                cr = function () {
                  return new n("non-word");
                },
                Ot = "\\c",
                fr = '"\\\\c"',
                _t = "any character",
                dr = function (a) {
                  return new A(a);
                },
                Tt = "\\",
                St = '"\\\\"',
                hr = /^[1-9]/,
                pr = "[1-9]",
                mr = function (a) {
                  return new y(a);
                },
                He = "\\0",
                Pt = '"\\\\0"',
                It = /^[0-7]/,
                kt = "[0-7]",
                gr = function (a) {
                  return new g(a.join(""));
                },
                Ft = "\\x",
                yr = '"\\\\x"',
                $e = /^[0-9a-fA-F]/,
                De = "[0-9a-fA-F]",
                vr = function (a) {
                  return new R(a.join(""));
                },
                Mt = "\\u",
                br = '"\\\\u"',
                xr = function (a) {
                  return new x(a.join(""));
                },
                Er = function () {
                  return new n("null-character");
                },
                m = 0,
                z = 0,
                Ie = 0,
                We = { line: 1, column: 1, seenCR: !1 },
                Be = 0,
                Le = [],
                N = 0;
              if ("startRule" in Me) {
                if (!(Me.startRule in Ze))
                  throw new Error(
                    `Can't start parsing from rule "` + Me.startRule + '".'
                  );
                et = Ze[Me.startRule];
              }
              if (
                ((n.offset = se),
                (n.text = Y),
                (qe = et()),
                qe !== null && m === T.length)
              )
                return qe;
              throw (
                (ye(Le),
                (z = Math.max(m, Be)),
                new W(
                  Le,
                  z < T.length ? T.charAt(z) : null,
                  z,
                  oe(z).line,
                  oe(z).column
                ))
              );
            }
            return P(W, Error), { SyntaxError: W, parse: Z };
          })(),
          L = 1,
          K = {};
        e.exports = O;
      },
      function (e, t, n) {
        var r = n(3),
          s = n(5),
          o = { extend: r.extend },
          l = R(97, 122),
          u = R(65, 90),
          f = R(48, 57),
          c = R(32, 47) + R(58, 64) + R(91, 96) + R(123, 126),
          h = R(32, 126),
          v = ` \f
\r	\v \u2028\u2029`,
          x = {
            "\\w": l + u + f + "_",
            "\\W": c.replace("_", ""),
            "\\s": v,
            "\\S": (function () {
              for (var g = h, y = 0; y < v.length; y++) g = g.replace(v[y], "");
              return g;
            })(),
            "\\d": f,
            "\\D": l + u + c,
          };
        function R(g, y) {
          for (var A = "", O = g; O <= y; O++) A += String.fromCharCode(O);
          return A;
        }
        (o.gen = function (g, y, A) {
          return (
            (A = A || { guid: 1 }),
            o[g.type] ? o[g.type](g, y, A) : o.token(g, y, A)
          );
        }),
          o.extend({
            token: function (g, y, A) {
              switch (g.type) {
                case "start":
                case "end":
                  return "";
                case "any-character":
                  return s.character();
                case "backspace":
                  return "";
                case "word-boundary":
                  return "";
                case "non-word-boundary":
                  break;
                case "digit":
                  return s.pick(f.split(""));
                case "non-digit":
                  return s.pick((l + u + c).split(""));
                case "form-feed":
                  break;
                case "line-feed":
                  return g.body || g.text;
                case "carriage-return":
                  break;
                case "white-space":
                  return s.pick(v.split(""));
                case "non-white-space":
                  return s.pick((l + u + f).split(""));
                case "tab":
                  break;
                case "vertical-tab":
                  break;
                case "word":
                  return s.pick((l + u + f).split(""));
                case "non-word":
                  return s.pick(c.replace("_", "").split(""));
              }
              return g.body || g.text;
            },
            alternate: function (g, y, A) {
              return this.gen(s.boolean() ? g.left : g.right, y, A);
            },
            match: function (g, y, A) {
              y = "";
              for (var O = 0; O < g.body.length; O++)
                y += this.gen(g.body[O], y, A);
              return y;
            },
            "capture-group": function (g, y, A) {
              return (y = this.gen(g.body, y, A)), (A[A.guid++] = y), y;
            },
            "non-capture-group": function (g, y, A) {
              return this.gen(g.body, y, A);
            },
            "positive-lookahead": function (g, y, A) {
              return this.gen(g.body, y, A);
            },
            "negative-lookahead": function (g, y, A) {
              return "";
            },
            quantified: function (g, y, A) {
              y = "";
              for (var O = this.quantifier(g.quantifier), L = 0; L < O; L++)
                y += this.gen(g.body, y, A);
              return y;
            },
            quantifier: function (g, y, A) {
              var O = Math.max(g.min, 0),
                L = isFinite(g.max) ? g.max : O + s.integer(3, 7);
              return s.integer(O, L);
            },
            charset: function (g, y, A) {
              if (g.invert) return this["invert-charset"](g, y, A);
              var O = s.pick(g.body);
              return this.gen(O, y, A);
            },
            "invert-charset": function (g, y, A) {
              for (var O = h, L = 0, K; L < g.body.length; L++)
                switch (((K = g.body[L]), K.type)) {
                  case "literal":
                    O = O.replace(K.body, "");
                    break;
                  case "range":
                    for (
                      var P = this.gen(K.start, y, A).charCodeAt(),
                        W = this.gen(K.end, y, A).charCodeAt(),
                        Z = P;
                      Z <= W;
                      Z++
                    )
                      O = O.replace(String.fromCharCode(Z), "");
                  default:
                    var T = x[K.text];
                    if (T)
                      for (var Y = 0; Y <= T.length; Y++)
                        O = O.replace(T[Y], "");
                }
              return s.pick(O.split(""));
            },
            range: function (g, y, A) {
              var O = this.gen(g.start, y, A).charCodeAt(),
                L = this.gen(g.end, y, A).charCodeAt();
              return String.fromCharCode(s.integer(O, L));
            },
            literal: function (g, y, A) {
              return g.escaped ? g.body : g.text;
            },
            unicode: function (g, y, A) {
              return String.fromCharCode(parseInt(g.code, 16));
            },
            hex: function (g, y, A) {
              return String.fromCharCode(parseInt(g.code, 16));
            },
            octal: function (g, y, A) {
              return String.fromCharCode(parseInt(g.code, 8));
            },
            "back-reference": function (g, y, A) {
              return A[g.code] || "";
            },
            CONTROL_CHARACTER_MAP: (function () {
              for (
                var g =
                    "@ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ \\ ] ^ _".split(
                      " "
                    ),
                  y = `\0       \x07 \b 	 
 \v \f \r              \x1B    `.split(" "),
                  A = {},
                  O = 0;
                O < g.length;
                O++
              )
                A[g[O]] = y[O];
              return A;
            })(),
            "control-character": function (g, y, A) {
              return this.CONTROL_CHARACTER_MAP[g.code];
            },
          }),
          (e.exports = o);
      },
      function (e, t, n) {
        e.exports = n(24);
      },
      function (e, t, n) {
        var r = n(2),
          s = n(3),
          o = n(4);
        function l(u, f, c) {
          c = c || [];
          var h = {
            name: typeof f == "string" ? f.replace(r.RE_KEY, "$1") : f,
            template: u,
            type: s.type(u),
            rule: o.parse(f),
          };
          switch (
            ((h.path = c.slice(0)),
            h.path.push(f === void 0 ? "ROOT" : h.name),
            h.type)
          ) {
            case "array":
              (h.items = []),
                s.each(u, function (v, x) {
                  h.items.push(l(v, x, h.path));
                });
              break;
            case "object":
              (h.properties = []),
                s.each(u, function (v, x) {
                  h.properties.push(l(v, x, h.path));
                });
              break;
          }
          return h;
        }
        e.exports = l;
      },
      function (e, t, n) {
        e.exports = n(26);
      },
      function (e, t, n) {
        var r = n(2),
          s = n(3),
          o = n(23);
        function l(c, h) {
          for (var v = o(c), x = u.diff(v, h), R = 0; R < x.length; R++);
          return x;
        }
        var u = {
            diff: function (h, v, x) {
              var R = [];
              return (
                this.name(h, v, x, R) &&
                  this.type(h, v, x, R) &&
                  (this.value(h, v, x, R),
                  this.properties(h, v, x, R),
                  this.items(h, v, x, R)),
                R
              );
            },
            name: function (c, h, v, x) {
              var R = x.length;
              return (
                f.equal("name", c.path, v + "", c.name + "", x), x.length === R
              );
            },
            type: function (c, h, v, x) {
              var R = x.length;
              switch (c.type) {
                case "string":
                  if (c.template.match(r.RE_PLACEHOLDER)) return !0;
                  break;
                case "array":
                  if (
                    c.rule.parameters &&
                    ((c.rule.min !== void 0 &&
                      c.rule.max === void 0 &&
                      c.rule.count === 1) ||
                      c.rule.parameters[2])
                  )
                    return !0;
                  break;
                case "function":
                  return !0;
              }
              return (
                f.equal("type", c.path, s.type(h), c.type, x), x.length === R
              );
            },
            value: function (c, h, v, x) {
              var R = x.length,
                g = c.rule,
                y = c.type;
              if (y === "object" || y === "array" || y === "function")
                return !0;
              if (!g.parameters) {
                switch (y) {
                  case "regexp":
                    return (
                      f.match("value", c.path, h, c.template, x), x.length === R
                    );
                  case "string":
                    if (c.template.match(r.RE_PLACEHOLDER))
                      return x.length === R;
                    break;
                }
                return (
                  f.equal("value", c.path, h, c.template, x), x.length === R
                );
              }
              var A;
              switch (y) {
                case "number":
                  var O = (h + "").split(".");
                  (O[0] = +O[0]),
                    g.min !== void 0 &&
                      g.max !== void 0 &&
                      (f.greaterThanOrEqualTo(
                        "value",
                        c.path,
                        O[0],
                        Math.min(g.min, g.max),
                        x
                      ),
                      f.lessThanOrEqualTo(
                        "value",
                        c.path,
                        O[0],
                        Math.max(g.min, g.max),
                        x
                      )),
                    g.min !== void 0 &&
                      g.max === void 0 &&
                      f.equal("value", c.path, O[0], g.min, x, "[value] " + v),
                    g.decimal &&
                      (g.dmin !== void 0 &&
                        g.dmax !== void 0 &&
                        (f.greaterThanOrEqualTo(
                          "value",
                          c.path,
                          O[1].length,
                          g.dmin,
                          x
                        ),
                        f.lessThanOrEqualTo(
                          "value",
                          c.path,
                          O[1].length,
                          g.dmax,
                          x
                        )),
                      g.dmin !== void 0 &&
                        g.dmax === void 0 &&
                        f.equal("value", c.path, O[1].length, g.dmin, x));
                  break;
                case "boolean":
                  break;
                case "string":
                  (A = h.match(new RegExp(c.template, "g"))),
                    (A = A ? A.length : 0),
                    g.min !== void 0 &&
                      g.max !== void 0 &&
                      (f.greaterThanOrEqualTo(
                        "repeat count",
                        c.path,
                        A,
                        g.min,
                        x
                      ),
                      f.lessThanOrEqualTo("repeat count", c.path, A, g.max, x)),
                    g.min !== void 0 &&
                      g.max === void 0 &&
                      f.equal("repeat count", c.path, A, g.min, x);
                  break;
                case "regexp":
                  (A = h.match(
                    new RegExp(c.template.source.replace(/^\^|\$$/g, ""), "g")
                  )),
                    (A = A ? A.length : 0),
                    g.min !== void 0 &&
                      g.max !== void 0 &&
                      (f.greaterThanOrEqualTo(
                        "repeat count",
                        c.path,
                        A,
                        g.min,
                        x
                      ),
                      f.lessThanOrEqualTo("repeat count", c.path, A, g.max, x)),
                    g.min !== void 0 &&
                      g.max === void 0 &&
                      f.equal("repeat count", c.path, A, g.min, x);
                  break;
              }
              return x.length === R;
            },
            properties: function (c, h, v, x) {
              var R = x.length,
                g = c.rule,
                y = s.keys(h);
              if (c.properties) {
                if (
                  (c.rule.parameters
                    ? (g.min !== void 0 &&
                        g.max !== void 0 &&
                        (f.greaterThanOrEqualTo(
                          "properties length",
                          c.path,
                          y.length,
                          Math.min(g.min, g.max),
                          x
                        ),
                        f.lessThanOrEqualTo(
                          "properties length",
                          c.path,
                          y.length,
                          Math.max(g.min, g.max),
                          x
                        )),
                      g.min !== void 0 &&
                        g.max === void 0 &&
                        g.count !== 1 &&
                        f.equal(
                          "properties length",
                          c.path,
                          y.length,
                          g.min,
                          x
                        ))
                    : f.equal(
                        "properties length",
                        c.path,
                        y.length,
                        c.properties.length,
                        x
                      ),
                  x.length !== R)
                )
                  return !1;
                for (var A = 0; A < y.length; A++)
                  x.push.apply(
                    x,
                    this.diff(
                      (function () {
                        var O;
                        return (
                          s.each(c.properties, function (L) {
                            L.name === y[A] && (O = L);
                          }),
                          O || c.properties[A]
                        );
                      })(),
                      h[y[A]],
                      y[A]
                    )
                  );
                return x.length === R;
              }
            },
            items: function (c, h, v, x) {
              var R = x.length;
              if (c.items) {
                var g = c.rule;
                if (!c.rule.parameters)
                  f.equal("items length", c.path, h.length, c.items.length, x);
                else {
                  if (
                    (g.min !== void 0 &&
                      g.max !== void 0 &&
                      (f.greaterThanOrEqualTo(
                        "items",
                        c.path,
                        h.length,
                        Math.min(g.min, g.max) * c.items.length,
                        x,
                        "[{utype}] array is too short: {path} must have at least {expected} elements but instance has {actual} elements"
                      ),
                      f.lessThanOrEqualTo(
                        "items",
                        c.path,
                        h.length,
                        Math.max(g.min, g.max) * c.items.length,
                        x,
                        "[{utype}] array is too long: {path} must have at most {expected} elements but instance has {actual} elements"
                      )),
                    g.min !== void 0 && g.max === void 0)
                  ) {
                    if (g.count === 1) return x.length === R;
                    f.equal(
                      "items length",
                      c.path,
                      h.length,
                      g.min * c.items.length,
                      x
                    );
                  }
                  if (g.parameters[2]) return x.length === R;
                }
                if (x.length !== R) return !1;
                for (var y = 0; y < h.length; y++)
                  x.push.apply(
                    x,
                    this.diff(
                      c.items[y % c.items.length],
                      h[y],
                      y % c.items.length
                    )
                  );
                return x.length === R;
              }
            },
          },
          f = {
            message: function (c) {
              return (
                c.message ||
                "[{utype}] Expect {path}'{ltype} {action} {expected}, but is {actual}"
              )
                .replace("{utype}", c.type.toUpperCase())
                .replace("{ltype}", c.type.toLowerCase())
                .replace(
                  "{path}",
                  (s.isArray(c.path) && c.path.join(".")) || c.path
                )
                .replace("{action}", c.action)
                .replace("{expected}", c.expected)
                .replace("{actual}", c.actual);
            },
            equal: function (c, h, v, x, R, g) {
              if (v === x) return !0;
              switch (c) {
                case "type":
                  if (x === "regexp" && v === "string") return !0;
                  break;
              }
              var y = {
                path: h,
                type: c,
                actual: v,
                expected: x,
                action: "is equal to",
                message: g,
              };
              return (y.message = f.message(y)), R.push(y), !1;
            },
            match: function (c, h, v, x, R, g) {
              if (x.test(v)) return !0;
              var y = {
                path: h,
                type: c,
                actual: v,
                expected: x,
                action: "matches",
                message: g,
              };
              return (y.message = f.message(y)), R.push(y), !1;
            },
            notEqual: function (c, h, v, x, R, g) {
              if (v !== x) return !0;
              var y = {
                path: h,
                type: c,
                actual: v,
                expected: x,
                action: "is not equal to",
                message: g,
              };
              return (y.message = f.message(y)), R.push(y), !1;
            },
            greaterThan: function (c, h, v, x, R, g) {
              if (v > x) return !0;
              var y = {
                path: h,
                type: c,
                actual: v,
                expected: x,
                action: "is greater than",
                message: g,
              };
              return (y.message = f.message(y)), R.push(y), !1;
            },
            lessThan: function (c, h, v, x, R, g) {
              if (v < x) return !0;
              var y = {
                path: h,
                type: c,
                actual: v,
                expected: x,
                action: "is less to",
                message: g,
              };
              return (y.message = f.message(y)), R.push(y), !1;
            },
            greaterThanOrEqualTo: function (c, h, v, x, R, g) {
              if (v >= x) return !0;
              var y = {
                path: h,
                type: c,
                actual: v,
                expected: x,
                action: "is greater than or equal to",
                message: g,
              };
              return (y.message = f.message(y)), R.push(y), !1;
            },
            lessThanOrEqualTo: function (c, h, v, x, R, g) {
              if (v <= x) return !0;
              var y = {
                path: h,
                type: c,
                actual: v,
                expected: x,
                action: "is less than or equal to",
                message: g,
              };
              return (y.message = f.message(y)), R.push(y), !1;
            },
          };
        (l.Diff = u), (l.Assert = f), (e.exports = l);
      },
      function (e, t, n) {
        e.exports = n(28);
      },
      function (e, t, n) {
        var r = n(3);
        (window._XMLHttpRequest = window.XMLHttpRequest),
          (window._ActiveXObject = window.ActiveXObject);
        try {
          new window.Event("custom");
        } catch {
          window.Event = function (g, y, A, O) {
            var L = document.createEvent("CustomEvent");
            return L.initCustomEvent(g, y, A, O), L;
          };
        }
        var s = {
            UNSENT: 0,
            OPENED: 1,
            HEADERS_RECEIVED: 2,
            LOADING: 3,
            DONE: 4,
          },
          o =
            "readystatechange loadstart progress abort error load timeout loadend".split(
              " "
            ),
          l = "timeout withCredentials".split(" "),
          u =
            "readyState responseURL status statusText responseType response responseText responseXML".split(
              " "
            ),
          f = {
            100: "Continue",
            101: "Switching Protocols",
            200: "OK",
            201: "Created",
            202: "Accepted",
            203: "Non-Authoritative Information",
            204: "No Content",
            205: "Reset Content",
            206: "Partial Content",
            300: "Multiple Choice",
            301: "Moved Permanently",
            302: "Found",
            303: "See Other",
            304: "Not Modified",
            305: "Use Proxy",
            307: "Temporary Redirect",
            400: "Bad Request",
            401: "Unauthorized",
            402: "Payment Required",
            403: "Forbidden",
            404: "Not Found",
            405: "Method Not Allowed",
            406: "Not Acceptable",
            407: "Proxy Authentication Required",
            408: "Request Timeout",
            409: "Conflict",
            410: "Gone",
            411: "Length Required",
            412: "Precondition Failed",
            413: "Request Entity Too Large",
            414: "Request-URI Too Long",
            415: "Unsupported Media Type",
            416: "Requested Range Not Satisfiable",
            417: "Expectation Failed",
            422: "Unprocessable Entity",
            500: "Internal Server Error",
            501: "Not Implemented",
            502: "Bad Gateway",
            503: "Service Unavailable",
            504: "Gateway Timeout",
            505: "HTTP Version Not Supported",
          };
        function c() {
          this.custom = { events: {}, requestHeaders: {}, responseHeaders: {} };
        }
        (c._settings = { timeout: "10-100" }),
          (c.setup = function (R) {
            return r.extend(c._settings, R), c._settings;
          }),
          r.extend(c, s),
          r.extend(c.prototype, s),
          (c.prototype.mock = !0),
          (c.prototype.match = !1),
          r.extend(c.prototype, {
            open: function (R, g, y, A, O) {
              var L = this;
              r.extend(this.custom, {
                method: R,
                url: g,
                async: typeof y == "boolean" ? y : !0,
                username: A,
                password: O,
                options: { url: g, type: R },
              }),
                (this.custom.timeout = (function (Y) {
                  if (typeof Y == "number") return Y;
                  if (typeof Y == "string" && !~Y.indexOf("-"))
                    return parseInt(Y, 10);
                  if (typeof Y == "string" && ~Y.indexOf("-")) {
                    var se = Y.split("-"),
                      oe = parseInt(se[0], 10),
                      H = parseInt(se[1], 10);
                    return Math.round(Math.random() * (H - oe)) + oe;
                  }
                })(c._settings.timeout));
              var K = v(this.custom.options);
              function P(Y) {
                for (var se = 0; se < u.length; se++)
                  try {
                    L[u[se]] = W[u[se]];
                  } catch {}
                L.dispatchEvent(new Event(Y.type));
              }
              if (!K) {
                var W = h();
                this.custom.xhr = W;
                for (var Z = 0; Z < o.length; Z++) W.addEventListener(o[Z], P);
                A ? W.open(R, g, y, A, O) : W.open(R, g, y);
                for (var T = 0; T < l.length; T++)
                  try {
                    W[l[T]] = L[l[T]];
                  } catch {}
                return;
              }
              (this.match = !0),
                (this.custom.template = K),
                (this.readyState = c.OPENED),
                this.dispatchEvent(new Event("readystatechange"));
            },
            setRequestHeader: function (R, g) {
              if (!this.match) {
                this.custom.xhr.setRequestHeader(R, g);
                return;
              }
              var y = this.custom.requestHeaders;
              y[R] ? (y[R] += "," + g) : (y[R] = g);
            },
            timeout: 0,
            withCredentials: !1,
            upload: {},
            send: function (g) {
              var y = this;
              if (((this.custom.options.body = g), !this.match)) {
                this.custom.xhr.send(g);
                return;
              }
              this.setRequestHeader("X-Requested-With", "MockXMLHttpRequest"),
                this.dispatchEvent(new Event("loadstart")),
                this.custom.async ? setTimeout(A, this.custom.timeout) : A();
              function A() {
                (y.readyState = c.HEADERS_RECEIVED),
                  y.dispatchEvent(new Event("readystatechange")),
                  (y.readyState = c.LOADING),
                  y.dispatchEvent(new Event("readystatechange")),
                  (y.status = 200),
                  (y.statusText = f[200]),
                  (y.response = y.responseText =
                    JSON.stringify(
                      x(y.custom.template, y.custom.options),
                      null,
                      4
                    )),
                  (y.readyState = c.DONE),
                  y.dispatchEvent(new Event("readystatechange")),
                  y.dispatchEvent(new Event("load")),
                  y.dispatchEvent(new Event("loadend"));
              }
            },
            abort: function () {
              if (!this.match) {
                this.custom.xhr.abort();
                return;
              }
              (this.readyState = c.UNSENT),
                this.dispatchEvent(new Event("abort", !1, !1, this)),
                this.dispatchEvent(new Event("error", !1, !1, this));
            },
          }),
          r.extend(c.prototype, {
            responseURL: "",
            status: c.UNSENT,
            statusText: "",
            getResponseHeader: function (R) {
              return this.match
                ? this.custom.responseHeaders[R.toLowerCase()]
                : this.custom.xhr.getResponseHeader(R);
            },
            getAllResponseHeaders: function () {
              if (!this.match) return this.custom.xhr.getAllResponseHeaders();
              var R = this.custom.responseHeaders,
                g = "";
              for (var y in R)
                R.hasOwnProperty(y) &&
                  (g +=
                    y +
                    ": " +
                    R[y] +
                    `\r
`);
              return g;
            },
            overrideMimeType: function () {},
            responseType: "",
            response: null,
            responseText: "",
            responseXML: null,
          }),
          r.extend(c.prototype, {
            addEventListener: function (g, y) {
              var A = this.custom.events;
              A[g] || (A[g] = []), A[g].push(y);
            },
            removeEventListener: function (g, y) {
              for (
                var A = this.custom.events[g] || [], O = 0;
                O < A.length;
                O++
              )
                A[O] === y && A.splice(O--, 1);
            },
            dispatchEvent: function (g) {
              for (
                var y = this.custom.events[g.type] || [], A = 0;
                A < y.length;
                A++
              )
                y[A].call(this, g);
              var O = "on" + g.type;
              this[O] && this[O](g);
            },
          });
        function h() {
          var R = (function () {
            var A = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
              O = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
              L = location.href,
              K = O.exec(L.toLowerCase()) || [];
            return A.test(K[1]);
          })();
          return window.ActiveXObject ? (!R && g()) || y() : g();
          function g() {
            try {
              return new window._XMLHttpRequest();
            } catch {}
          }
          function y() {
            try {
              return new window._ActiveXObject("Microsoft.XMLHTTP");
            } catch {}
          }
        }
        function v(R) {
          for (var g in c.Mock._mocked) {
            var y = c.Mock._mocked[g];
            if (
              (!y.rurl || A(y.rurl, R.url)) &&
              (!y.rtype || A(y.rtype, R.type.toLowerCase()))
            )
              return y;
          }
          function A(O, L) {
            if (r.type(O) === "string") return O === L;
            if (r.type(O) === "regexp") return O.test(L);
          }
        }
        function x(R, g) {
          return r.isFunction(R.template)
            ? R.template(g)
            : c.Mock.mock(R.template);
        }
        e.exports = c;
      },
    ]);
  });
})(mock);
var mockExports = mock.exports;
const mockJs = getDefaultExportFromCjs(mockExports);
function lexer(e) {
  for (var t = [], n = 0; n < e.length; ) {
    var r = e[n];
    if (r === "*" || r === "+" || r === "?") {
      t.push({ type: "MODIFIER", index: n, value: e[n++] });
      continue;
    }
    if (r === "\\") {
      t.push({ type: "ESCAPED_CHAR", index: n++, value: e[n++] });
      continue;
    }
    if (r === "{") {
      t.push({ type: "OPEN", index: n, value: e[n++] });
      continue;
    }
    if (r === "}") {
      t.push({ type: "CLOSE", index: n, value: e[n++] });
      continue;
    }
    if (r === ":") {
      for (var s = "", o = n + 1; o < e.length; ) {
        var l = e.charCodeAt(o);
        if (
          (l >= 48 && l <= 57) ||
          (l >= 65 && l <= 90) ||
          (l >= 97 && l <= 122) ||
          l === 95
        ) {
          s += e[o++];
          continue;
        }
        break;
      }
      if (!s) throw new TypeError("Missing parameter name at ".concat(n));
      t.push({ type: "NAME", index: n, value: s }), (n = o);
      continue;
    }
    if (r === "(") {
      var u = 1,
        f = "",
        o = n + 1;
      if (e[o] === "?")
        throw new TypeError('Pattern cannot start with "?" at '.concat(o));
      for (; o < e.length; ) {
        if (e[o] === "\\") {
          f += e[o++] + e[o++];
          continue;
        }
        if (e[o] === ")") {
          if ((u--, u === 0)) {
            o++;
            break;
          }
        } else if (e[o] === "(" && (u++, e[o + 1] !== "?"))
          throw new TypeError("Capturing groups are not allowed at ".concat(o));
        f += e[o++];
      }
      if (u) throw new TypeError("Unbalanced pattern at ".concat(n));
      if (!f) throw new TypeError("Missing pattern at ".concat(n));
      t.push({ type: "PATTERN", index: n, value: f }), (n = o);
      continue;
    }
    t.push({ type: "CHAR", index: n, value: e[n++] });
  }
  return t.push({ type: "END", index: n, value: "" }), t;
}
function parse(e, t) {
  t === void 0 && (t = {});
  for (
    var n = lexer(e),
      r = t.prefixes,
      s = r === void 0 ? "./" : r,
      o = "[^".concat(escapeString(t.delimiter || "/#?"), "]+?"),
      l = [],
      u = 0,
      f = 0,
      c = "",
      h = function (Z) {
        if (f < n.length && n[f].type === Z) return n[f++].value;
      },
      v = function (Z) {
        var T = h(Z);
        if (T !== void 0) return T;
        var Y = n[f],
          se = Y.type,
          oe = Y.index;
        throw new TypeError(
          "Unexpected ".concat(se, " at ").concat(oe, ", expected ").concat(Z)
        );
      },
      x = function () {
        for (var Z = "", T; (T = h("CHAR") || h("ESCAPED_CHAR")); ) Z += T;
        return Z;
      };
    f < n.length;

  ) {
    var R = h("CHAR"),
      g = h("NAME"),
      y = h("PATTERN");
    if (g || y) {
      var A = R || "";
      s.indexOf(A) === -1 && ((c += A), (A = "")),
        c && (l.push(c), (c = "")),
        l.push({
          name: g || u++,
          prefix: A,
          suffix: "",
          pattern: y || o,
          modifier: h("MODIFIER") || "",
        });
      continue;
    }
    var O = R || h("ESCAPED_CHAR");
    if (O) {
      c += O;
      continue;
    }
    c && (l.push(c), (c = ""));
    var L = h("OPEN");
    if (L) {
      var A = x(),
        K = h("NAME") || "",
        P = h("PATTERN") || "",
        W = x();
      v("CLOSE"),
        l.push({
          name: K || (P ? u++ : ""),
          pattern: K && !P ? o : P,
          prefix: A,
          suffix: W,
          modifier: h("MODIFIER") || "",
        });
      continue;
    }
    v("END");
  }
  return l;
}
function escapeString(e) {
  return e.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(e) {
  return e && e.sensitive ? "" : "i";
}
function regexpToRegexp(e, t) {
  if (!t) return e;
  for (var n = /\((?:\?<(.*?)>)?(?!\?)/g, r = 0, s = n.exec(e.source); s; )
    t.push({
      name: s[1] || r++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: "",
    }),
      (s = n.exec(e.source));
  return e;
}
function arrayToRegexp(e, t, n) {
  var r = e.map(function (s) {
    return pathToRegexp(s, t, n).source;
  });
  return new RegExp("(?:".concat(r.join("|"), ")"), flags(n));
}
function stringToRegexp(e, t, n) {
  return tokensToRegexp(parse(e, n), t, n);
}
function tokensToRegexp(e, t, n) {
  n === void 0 && (n = {});
  for (
    var r = n.strict,
      s = r === void 0 ? !1 : r,
      o = n.start,
      l = o === void 0 ? !0 : o,
      u = n.end,
      f = u === void 0 ? !0 : u,
      c = n.encode,
      h =
        c === void 0
          ? function (oe) {
              return oe;
            }
          : c,
      v = n.delimiter,
      x = v === void 0 ? "/#?" : v,
      R = n.endsWith,
      g = R === void 0 ? "" : R,
      y = "[".concat(escapeString(g), "]|$"),
      A = "[".concat(escapeString(x), "]"),
      O = l ? "^" : "",
      L = 0,
      K = e;
    L < K.length;
    L++
  ) {
    var P = K[L];
    if (typeof P == "string") O += escapeString(h(P));
    else {
      var W = escapeString(h(P.prefix)),
        Z = escapeString(h(P.suffix));
      if (P.pattern)
        if ((t && t.push(P), W || Z))
          if (P.modifier === "+" || P.modifier === "*") {
            var T = P.modifier === "*" ? "?" : "";
            O += "(?:"
              .concat(W, "((?:")
              .concat(P.pattern, ")(?:")
              .concat(Z)
              .concat(W, "(?:")
              .concat(P.pattern, "))*)")
              .concat(Z, ")")
              .concat(T);
          } else
            O += "(?:"
              .concat(W, "(")
              .concat(P.pattern, ")")
              .concat(Z, ")")
              .concat(P.modifier);
        else
          P.modifier === "+" || P.modifier === "*"
            ? (O += "((?:".concat(P.pattern, ")").concat(P.modifier, ")"))
            : (O += "(".concat(P.pattern, ")").concat(P.modifier));
      else O += "(?:".concat(W).concat(Z, ")").concat(P.modifier);
    }
  }
  if (f)
    s || (O += "".concat(A, "?")),
      (O += n.endsWith ? "(?=".concat(y, ")") : "$");
  else {
    var Y = e[e.length - 1],
      se =
        typeof Y == "string" ? A.indexOf(Y[Y.length - 1]) > -1 : Y === void 0;
    s || (O += "(?:".concat(A, "(?=").concat(y, "))?")),
      se || (O += "(?=".concat(A, "|").concat(y, ")"));
  }
  return new RegExp(O, flags(n));
}
function pathToRegexp(e, t, n) {
  return e instanceof RegExp
    ? regexpToRegexp(e, t)
    : Array.isArray(e)
    ? arrayToRegexp(e, t, n)
    : stringToRegexp(e, t, n);
}
const Mock = mockJs;
function createProdMockServer(e) {
  (Mock.XHR.prototype.__send = Mock.XHR.prototype.send),
    (Mock.XHR.prototype.send = function () {
      if (
        (this.custom.xhr &&
          ((this.custom.xhr.withCredentials = this.withCredentials || !1),
          this.responseType &&
            (this.custom.xhr.responseType = this.responseType)),
        this.custom.requestHeaders)
      ) {
        const t = {};
        for (let n in this.custom.requestHeaders)
          t[n.toString().toLowerCase()] = this.custom.requestHeaders[n];
        this.custom.options = Object.assign({}, this.custom.options, {
          headers: t,
        });
      }
      this.__send.apply(this, arguments);
    }),
    (Mock.XHR.prototype.proxy_open = Mock.XHR.prototype.open),
    (Mock.XHR.prototype.open = function () {
      let t = this.responseType;
      this.proxy_open(...arguments),
        this.custom.xhr && t && (this.custom.xhr.responseType = t);
    });
  for (const { url: t, method: n, response: r, timeout: s } of e)
    __setupMock__(s),
      Mock.mock(
        pathToRegexp(t, void 0, { end: !1 }),
        n || "get",
        __XHR2ExpressReqWrapper__(r)
      );
}
function __param2Obj__(e) {
  const t = e.split("?")[1];
  return t
    ? JSON.parse(
        '{"' +
          decodeURIComponent(t)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"')
            .replace(/\+/g, " ") +
          '"}'
      )
    : {};
}
function __XHR2ExpressReqWrapper__(e) {
  return function (t) {
    let n = null;
    if (typeof e == "function") {
      const { body: r, type: s, url: o, headers: l } = t;
      let u = r;
      try {
        u = JSON.parse(r);
      } catch {}
      n = e({ method: s, body: u, query: __param2Obj__(o), headers: l });
    } else n = e;
    return Mock.mock(n);
  };
}
function __setupMock__(e = 0) {
  e && Mock.setup({ timeout: e });
}
const apis = [
  {
    url: "/api/yujing/sisetu",
    method: "get",
    response: () => ({
      code: 0,
      message: "ok",
      "data|12": [
        {
          warnBl: 0,
          "warnLevel|0-3": 0,
          "warnNum|0-100": 0,
          "warnTotal|0-100": 0,
        },
      ],
    }),
  },
];
function setupProdMockServer() {
  createProdMockServer([...apis]);
}
createApp(App).mount("#app");
setupProdMockServer();
