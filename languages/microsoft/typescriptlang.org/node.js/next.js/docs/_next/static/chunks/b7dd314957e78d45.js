(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  'object' == typeof document ? document.currentScript : void 0,
  6402,
  (e, t, r) => {
    !(function () {
      var e = {
          229: function (e) {
            var t,
              r,
              n,
              o = (e.exports = {});
            function u() {
              throw Error('setTimeout has not been defined');
            }
            function l() {
              throw Error('clearTimeout has not been defined');
            }
            try {
              t = 'function' == typeof setTimeout ? setTimeout : u;
            } catch (e) {
              t = u;
            }
            try {
              r = 'function' == typeof clearTimeout ? clearTimeout : l;
            } catch (e) {
              r = l;
            }
            function a(e) {
              if (t === setTimeout) return setTimeout(e, 0);
              if ((t === u || !t) && setTimeout)
                return ((t = setTimeout), setTimeout(e, 0));
              try {
                return t(e, 0);
              } catch (r) {
                try {
                  return t.call(null, e, 0);
                } catch (r) {
                  return t.call(this, e, 0);
                }
              }
            }
            var i = [],
              s = !1,
              c = -1;
            function f() {
              s &&
                n &&
                ((s = !1),
                n.length ? (i = n.concat(i)) : (c = -1),
                i.length && d());
            }
            function d() {
              if (!s) {
                var e = a(f);
                s = !0;
                for (var t = i.length; t; ) {
                  for (n = i, i = []; ++c < t; ) n && n[c].run();
                  ((c = -1), (t = i.length));
                }
                ((n = null),
                  (s = !1),
                  (function (e) {
                    if (r === clearTimeout) return clearTimeout(e);
                    if ((r === l || !r) && clearTimeout)
                      return ((r = clearTimeout), clearTimeout(e));
                    try {
                      r(e);
                    } catch (t) {
                      try {
                        return r.call(null, e);
                      } catch (t) {
                        return r.call(this, e);
                      }
                    }
                  })(e));
              }
            }
            function p(e, t) {
              ((this.fun = e), (this.array = t));
            }
            function y() {}
            ((o.nextTick = function (e) {
              var t = Array(arguments.length - 1);
              if (arguments.length > 1)
                for (var r = 1; r < arguments.length; r++)
                  t[r - 1] = arguments[r];
              (i.push(new p(e, t)), 1 !== i.length || s || a(d));
            }),
              (p.prototype.run = function () {
                this.fun.apply(null, this.array);
              }),
              (o.title = 'browser'),
              (o.browser = !0),
              (o.env = {}),
              (o.argv = []),
              (o.version = ''),
              (o.versions = {}),
              (o.on = y),
              (o.addListener = y),
              (o.once = y),
              (o.off = y),
              (o.removeListener = y),
              (o.removeAllListeners = y),
              (o.emit = y),
              (o.prependListener = y),
              (o.prependOnceListener = y),
              (o.listeners = function (e) {
                return [];
              }),
              (o.binding = function (e) {
                throw Error('process.binding is not supported');
              }),
              (o.cwd = function () {
                return '/';
              }),
              (o.chdir = function (e) {
                throw Error('process.chdir is not supported');
              }),
              (o.umask = function () {
                return 0;
              }));
          },
        },
        r = {};
      function n(t) {
        var o = r[t];
        if (void 0 !== o) return o.exports;
        var u = (r[t] = { exports: {} }),
          l = !0;
        try {
          (e[t](u, u.exports, n), (l = !1));
        } finally {
          l && delete r[t];
        }
        return u.exports;
      }
      ((n.ab =
        '/ROOT/node_modules/.pnpm/next@15.5.4_@babel+core@7.28.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/process/'),
        (t.exports = n(229)));
    })();
  },
  7739,
  (e, t, r) => {
    'use strict';
    var n, o;
    t.exports =
      (null == (n = e.g.process) ? void 0 : n.env) &&
      'object' == typeof (null == (o = e.g.process) ? void 0 : o.env)
        ? e.g.process
        : e.r(6402);
  },
  2879,
  (e, t, r) => {
    'use strict';
    r._ = function (e) {
      return e && e.__esModule ? e : { default: e };
    };
  },
  6234,
  (e, t, r) => {
    'use strict';
    var n = Symbol.for('react.transitional.element');
    function o(e, t, r) {
      var o = null;
      if (
        (void 0 !== r && (o = '' + r),
        void 0 !== t.key && (o = '' + t.key),
        'key' in t)
      )
        for (var u in ((r = {}), t)) 'key' !== u && (r[u] = t[u]);
      else r = t;
      return {
        $$typeof: n,
        type: e,
        key: o,
        ref: void 0 !== (t = r.ref) ? t : null,
        props: r,
      };
    }
    ((r.Fragment = Symbol.for('react.fragment')), (r.jsx = o), (r.jsxs = o));
  },
  4601,
  (e, t, r) => {
    'use strict';
    t.exports = e.r(6234);
  },
  4513,
  (e, t, r) => {
    'use strict';
    var n = e.i(7739),
      o = Symbol.for('react.transitional.element'),
      u = Symbol.for('react.portal'),
      l = Symbol.for('react.fragment'),
      a = Symbol.for('react.strict_mode'),
      i = Symbol.for('react.profiler'),
      s = Symbol.for('react.consumer'),
      c = Symbol.for('react.context'),
      f = Symbol.for('react.forward_ref'),
      d = Symbol.for('react.suspense'),
      p = Symbol.for('react.memo'),
      y = Symbol.for('react.lazy'),
      h = Symbol.for('react.activity'),
      m = Symbol.iterator,
      v = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      },
      g = Object.assign,
      b = {};
    function _(e, t, r) {
      ((this.props = e),
        (this.context = t),
        (this.refs = b),
        (this.updater = r || v));
    }
    function x() {}
    function j(e, t, r) {
      ((this.props = e),
        (this.context = t),
        (this.refs = b),
        (this.updater = r || v));
    }
    ((_.prototype.isReactComponent = {}),
      (_.prototype.setState = function (e, t) {
        if ('object' != typeof e && 'function' != typeof e && null != e)
          throw Error(
            'takes an object of state variables to update or a function which returns an object of state variables.'
          );
        this.updater.enqueueSetState(this, e, t, 'setState');
      }),
      (_.prototype.forceUpdate = function (e) {
        this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
      }),
      (x.prototype = _.prototype));
    var w = (j.prototype = new x());
    ((w.constructor = j), g(w, _.prototype), (w.isPureReactComponent = !0));
    var E = Array.isArray;
    function O() {}
    var T = { H: null, A: null, T: null, S: null },
      P = Object.prototype.hasOwnProperty;
    function S(e, t, r) {
      var n = r.ref;
      return {
        $$typeof: o,
        type: e,
        key: t,
        ref: void 0 !== n ? n : null,
        props: r,
      };
    }
    function C(e) {
      return 'object' == typeof e && null !== e && e.$$typeof === o;
    }
    var k = /\/+/g;
    function R(e, t) {
      var r, n;
      return 'object' == typeof e && null !== e && null != e.key
        ? ((r = '' + e.key),
          (n = { '=': '=0', ':': '=2' }),
          '$' +
            r.replace(/[=:]/g, function (e) {
              return n[e];
            }))
        : t.toString(36);
    }
    function N(e, t, r) {
      if (null == e) return e;
      var n = [],
        l = 0;
      return (
        !(function e(t, r, n, l, a) {
          var i,
            s,
            c,
            f = typeof t;
          ('undefined' === f || 'boolean' === f) && (t = null);
          var d = !1;
          if (null === t) d = !0;
          else
            switch (f) {
              case 'bigint':
              case 'string':
              case 'number':
                d = !0;
                break;
              case 'object':
                switch (t.$$typeof) {
                  case o:
                  case u:
                    d = !0;
                    break;
                  case y:
                    return e((d = t._init)(t._payload), r, n, l, a);
                }
            }
          if (d)
            return (
              (a = a(t)),
              (d = '' === l ? '.' + R(t, 0) : l),
              E(a)
                ? ((n = ''),
                  null != d && (n = d.replace(k, '$&/') + '/'),
                  e(a, r, n, '', function (e) {
                    return e;
                  }))
                : null != a &&
                  (C(a) &&
                    ((i = a),
                    (s =
                      n +
                      (null == a.key || (t && t.key === a.key)
                        ? ''
                        : ('' + a.key).replace(k, '$&/') + '/') +
                      d),
                    (a = S(i.type, s, i.props))),
                  r.push(a)),
              1
            );
          d = 0;
          var p = '' === l ? '.' : l + ':';
          if (E(t))
            for (var h = 0; h < t.length; h++)
              ((f = p + R((l = t[h]), h)), (d += e(l, r, n, f, a)));
          else if (
            'function' ==
            typeof (h =
              null === (c = t) || 'object' != typeof c
                ? null
                : 'function' == typeof (c = (m && c[m]) || c['@@iterator'])
                  ? c
                  : null)
          )
            for (t = h.call(t), h = 0; !(l = t.next()).done; )
              ((f = p + R((l = l.value), h++)), (d += e(l, r, n, f, a)));
          else if ('object' === f) {
            if ('function' == typeof t.then)
              return e(
                (function (e) {
                  switch (e.status) {
                    case 'fulfilled':
                      return e.value;
                    case 'rejected':
                      throw e.reason;
                    default:
                      switch (
                        ('string' == typeof e.status
                          ? e.then(O, O)
                          : ((e.status = 'pending'),
                            e.then(
                              function (t) {
                                'pending' === e.status &&
                                  ((e.status = 'fulfilled'), (e.value = t));
                              },
                              function (t) {
                                'pending' === e.status &&
                                  ((e.status = 'rejected'), (e.reason = t));
                              }
                            )),
                        e.status)
                      ) {
                        case 'fulfilled':
                          return e.value;
                        case 'rejected':
                          throw e.reason;
                      }
                  }
                  throw e;
                })(t),
                r,
                n,
                l,
                a
              );
            throw Error(
              'Objects are not valid as a React child (found: ' +
                ('[object Object]' === (r = String(t))
                  ? 'object with keys {' + Object.keys(t).join(', ') + '}'
                  : r) +
                '). If you meant to render a collection of children, use an array instead.'
            );
          }
          return d;
        })(e, n, '', '', function (e) {
          return t.call(r, e, l++);
        }),
        n
      );
    }
    function M(e) {
      if (-1 === e._status) {
        var t = e._result;
        ((t = t()).then(
          function (t) {
            (0 === e._status || -1 === e._status) &&
              ((e._status = 1), (e._result = t));
          },
          function (t) {
            (0 === e._status || -1 === e._status) &&
              ((e._status = 2), (e._result = t));
          }
        ),
          -1 === e._status && ((e._status = 0), (e._result = t)));
      }
      if (1 === e._status) return e._result.default;
      throw e._result;
    }
    var L =
      'function' == typeof reportError
        ? reportError
        : function (e) {
            if (
              'object' == typeof window &&
              'function' == typeof window.ErrorEvent
            ) {
              var t = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  'object' == typeof e &&
                  null !== e &&
                  'string' == typeof e.message
                    ? String(e.message)
                    : String(e),
                error: e,
              });
              if (!window.dispatchEvent(t)) return;
            } else if (
              'object' == typeof n.default &&
              'function' == typeof n.default.emit
            )
              return void n.default.emit('uncaughtException', e);
            console.error(e);
          };
    ((r.Activity = h),
      (r.Children = {
        map: N,
        forEach: function (e, t, r) {
          N(
            e,
            function () {
              t.apply(this, arguments);
            },
            r
          );
        },
        count: function (e) {
          var t = 0;
          return (
            N(e, function () {
              t++;
            }),
            t
          );
        },
        toArray: function (e) {
          return (
            N(e, function (e) {
              return e;
            }) || []
          );
        },
        only: function (e) {
          if (!C(e))
            throw Error(
              'React.Children.only expected to receive a single React element child.'
            );
          return e;
        },
      }),
      (r.Component = _),
      (r.Fragment = l),
      (r.Profiler = i),
      (r.PureComponent = j),
      (r.StrictMode = a),
      (r.Suspense = d),
      (r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = T),
      (r.__COMPILER_RUNTIME = {
        __proto__: null,
        c: function (e) {
          return T.H.useMemoCache(e);
        },
      }),
      (r.cache = function (e) {
        return function () {
          return e.apply(null, arguments);
        };
      }),
      (r.cacheSignal = function () {
        return null;
      }),
      (r.cloneElement = function (e, t, r) {
        if (null == e)
          throw Error(
            'The argument must be a React element, but you passed ' + e + '.'
          );
        var n = g({}, e.props),
          o = e.key;
        if (null != t)
          for (u in (void 0 !== t.key && (o = '' + t.key), t))
            P.call(t, u) &&
              'key' !== u &&
              '__self' !== u &&
              '__source' !== u &&
              ('ref' !== u || void 0 !== t.ref) &&
              (n[u] = t[u]);
        var u = arguments.length - 2;
        if (1 === u) n.children = r;
        else if (1 < u) {
          for (var l = Array(u), a = 0; a < u; a++) l[a] = arguments[a + 2];
          n.children = l;
        }
        return S(e.type, o, n);
      }),
      (r.createContext = function (e) {
        return (
          ((e = {
            $$typeof: c,
            _currentValue: e,
            _currentValue2: e,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
          }).Provider = e),
          (e.Consumer = { $$typeof: s, _context: e }),
          e
        );
      }),
      (r.createElement = function (e, t, r) {
        var n,
          o = {},
          u = null;
        if (null != t)
          for (n in (void 0 !== t.key && (u = '' + t.key), t))
            P.call(t, n) &&
              'key' !== n &&
              '__self' !== n &&
              '__source' !== n &&
              (o[n] = t[n]);
        var l = arguments.length - 2;
        if (1 === l) o.children = r;
        else if (1 < l) {
          for (var a = Array(l), i = 0; i < l; i++) a[i] = arguments[i + 2];
          o.children = a;
        }
        if (e && e.defaultProps)
          for (n in (l = e.defaultProps)) void 0 === o[n] && (o[n] = l[n]);
        return S(e, u, o);
      }),
      (r.createRef = function () {
        return { current: null };
      }),
      (r.forwardRef = function (e) {
        return { $$typeof: f, render: e };
      }),
      (r.isValidElement = C),
      (r.lazy = function (e) {
        return { $$typeof: y, _payload: { _status: -1, _result: e }, _init: M };
      }),
      (r.memo = function (e, t) {
        return { $$typeof: p, type: e, compare: void 0 === t ? null : t };
      }),
      (r.startTransition = function (e) {
        var t = T.T,
          r = {};
        T.T = r;
        try {
          var n = e(),
            o = T.S;
          (null !== o && o(r, n),
            'object' == typeof n &&
              null !== n &&
              'function' == typeof n.then &&
              n.then(O, L));
        } catch (e) {
          L(e);
        } finally {
          (null !== t && null !== r.types && (t.types = r.types), (T.T = t));
        }
      }),
      (r.unstable_useCacheRefresh = function () {
        return T.H.useCacheRefresh();
      }),
      (r.use = function (e) {
        return T.H.use(e);
      }),
      (r.useActionState = function (e, t, r) {
        return T.H.useActionState(e, t, r);
      }),
      (r.useCallback = function (e, t) {
        return T.H.useCallback(e, t);
      }),
      (r.useContext = function (e) {
        return T.H.useContext(e);
      }),
      (r.useDebugValue = function () {}),
      (r.useDeferredValue = function (e, t) {
        return T.H.useDeferredValue(e, t);
      }),
      (r.useEffect = function (e, t) {
        return T.H.useEffect(e, t);
      }),
      (r.useEffectEvent = function (e) {
        return T.H.useEffectEvent(e);
      }),
      (r.useId = function () {
        return T.H.useId();
      }),
      (r.useImperativeHandle = function (e, t, r) {
        return T.H.useImperativeHandle(e, t, r);
      }),
      (r.useInsertionEffect = function (e, t) {
        return T.H.useInsertionEffect(e, t);
      }),
      (r.useLayoutEffect = function (e, t) {
        return T.H.useLayoutEffect(e, t);
      }),
      (r.useMemo = function (e, t) {
        return T.H.useMemo(e, t);
      }),
      (r.useOptimistic = function (e, t) {
        return T.H.useOptimistic(e, t);
      }),
      (r.useReducer = function (e, t, r) {
        return T.H.useReducer(e, t, r);
      }),
      (r.useRef = function (e) {
        return T.H.useRef(e);
      }),
      (r.useState = function (e) {
        return T.H.useState(e);
      }),
      (r.useSyncExternalStore = function (e, t, r) {
        return T.H.useSyncExternalStore(e, t, r);
      }),
      (r.useTransition = function () {
        return T.H.useTransition();
      }),
      (r.version = '19.2.0'));
  },
  6960,
  (e, t, r) => {
    'use strict';
    t.exports = e.r(4513);
  },
  7602,
  (e, t, r) => {
    'use strict';
    function n(e) {
      if ('function' != typeof WeakMap) return null;
      var t = new WeakMap(),
        r = new WeakMap();
      return (n = function (e) {
        return e ? r : t;
      })(e);
    }
    r._ = function (e, t) {
      if (!t && e && e.__esModule) return e;
      if (null === e || ('object' != typeof e && 'function' != typeof e))
        return { default: e };
      var r = n(t);
      if (r && r.has(e)) return r.get(e);
      var o = { __proto__: null },
        u = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var l in e)
        if ('default' !== l && Object.prototype.hasOwnProperty.call(e, l)) {
          var a = u ? Object.getOwnPropertyDescriptor(e, l) : null;
          a && (a.get || a.set)
            ? Object.defineProperty(o, l, a)
            : (o[l] = e[l]);
        }
      return ((o.default = e), r && r.set(e, o), o);
    };
  },
  9319,
  (e, t, r) => {
    'use strict';
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'HeadManagerContext', {
        enumerable: !0,
        get: function () {
          return n;
        },
      }));
    let n = e.r(2879)._(e.r(6960)).default.createContext({});
  },
  4300,
  (e, t, r) => {
    'use strict';
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'warnOnce', {
        enumerable: !0,
        get: function () {
          return n;
        },
      }));
    let n = (e) => {};
  },
  2368,
  (e, t, r) => {
    'use strict';
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      !(function (e, t) {
        for (var r in t)
          Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
      })(r, {
        DecodeError: function () {
          return h;
        },
        MiddlewareNotFoundError: function () {
          return b;
        },
        MissingStaticPage: function () {
          return g;
        },
        NormalizeError: function () {
          return m;
        },
        PageNotFoundError: function () {
          return v;
        },
        SP: function () {
          return p;
        },
        ST: function () {
          return y;
        },
        WEB_VITALS: function () {
          return n;
        },
        execOnce: function () {
          return o;
        },
        getDisplayName: function () {
          return s;
        },
        getLocationOrigin: function () {
          return a;
        },
        getURL: function () {
          return i;
        },
        isAbsoluteUrl: function () {
          return l;
        },
        isResSent: function () {
          return c;
        },
        loadGetInitialProps: function () {
          return d;
        },
        normalizeRepeatedSlashes: function () {
          return f;
        },
        stringifyError: function () {
          return _;
        },
      }));
    let n = ['CLS', 'FCP', 'FID', 'INP', 'LCP', 'TTFB'];
    function o(e) {
      let t,
        r = !1;
      return function () {
        for (var n = arguments.length, o = Array(n), u = 0; u < n; u++)
          o[u] = arguments[u];
        return (r || ((r = !0), (t = e(...o))), t);
      };
    }
    let u = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/,
      l = (e) => u.test(e);
    function a() {
      let { protocol: e, hostname: t, port: r } = window.location;
      return e + '//' + t + (r ? ':' + r : '');
    }
    function i() {
      let { href: e } = window.location,
        t = a();
      return e.substring(t.length);
    }
    function s(e) {
      return 'string' == typeof e ? e : e.displayName || e.name || 'Unknown';
    }
    function c(e) {
      return e.finished || e.headersSent;
    }
    function f(e) {
      let t = e.split('?');
      return (
        t[0].replace(/\\/g, '/').replace(/\/\/+/g, '/') +
        (t[1] ? '?' + t.slice(1).join('?') : '')
      );
    }
    async function d(e, t) {
      let r = t.res || (t.ctx && t.ctx.res);
      if (!e.getInitialProps)
        return t.ctx && t.Component
          ? { pageProps: await d(t.Component, t.ctx) }
          : {};
      let n = await e.getInitialProps(t);
      if (r && c(r)) return n;
      if (!n)
        throw Object.defineProperty(
          Error(
            '"' +
              s(e) +
              '.getInitialProps()" should resolve to an object. But found "' +
              n +
              '" instead.'
          ),
          '__NEXT_ERROR_CODE',
          { value: 'E394', enumerable: !1, configurable: !0 }
        );
      return n;
    }
    let p = 'undefined' != typeof performance,
      y =
        p &&
        ['mark', 'measure', 'getEntriesByName'].every(
          (e) => 'function' == typeof performance[e]
        );
    class h extends Error {}
    class m extends Error {}
    class v extends Error {
      constructor(e) {
        (super(),
          (this.code = 'ENOENT'),
          (this.name = 'PageNotFoundError'),
          (this.message = 'Cannot find module for page: ' + e));
      }
    }
    class g extends Error {
      constructor(e, t) {
        (super(),
          (this.message =
            'Failed to load static file for page: ' + e + ' ' + t));
      }
    }
    class b extends Error {
      constructor() {
        (super(),
          (this.code = 'ENOENT'),
          (this.message = 'Cannot find the middleware module'));
      }
    }
    function _(e) {
      return JSON.stringify({ message: e.message, stack: e.stack });
    }
  },
  3172,
  (e, t, r) => {
    'use strict';
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'useIntersection', {
        enumerable: !0,
        get: function () {
          return i;
        },
      }));
    let n = e.r(6960),
      o = e.r(7072),
      u = 'function' == typeof IntersectionObserver,
      l = new Map(),
      a = [];
    function i(e) {
      let { rootRef: t, rootMargin: r, disabled: i } = e,
        s = i || !u,
        [c, f] = (0, n.useState)(!1),
        d = (0, n.useRef)(null),
        p = (0, n.useCallback)((e) => {
          d.current = e;
        }, []);
      return (
        (0, n.useEffect)(() => {
          if (u) {
            if (s || c) return;
            let e = d.current;
            if (e && e.tagName)
              return (function (e, t, r) {
                let {
                  id: n,
                  observer: o,
                  elements: u,
                } = (function (e) {
                  let t,
                    r = { root: e.root || null, margin: e.rootMargin || '' },
                    n = a.find(
                      (e) => e.root === r.root && e.margin === r.margin
                    );
                  if (n && (t = l.get(n))) return t;
                  let o = new Map();
                  return (
                    (t = {
                      id: r,
                      observer: new IntersectionObserver((e) => {
                        e.forEach((e) => {
                          let t = o.get(e.target),
                            r = e.isIntersecting || e.intersectionRatio > 0;
                          t && r && t(r);
                        });
                      }, e),
                      elements: o,
                    }),
                    a.push(r),
                    l.set(r, t),
                    t
                  );
                })(r);
                return (
                  u.set(e, t),
                  o.observe(e),
                  function () {
                    if ((u.delete(e), o.unobserve(e), 0 === u.size)) {
                      (o.disconnect(), l.delete(n));
                      let e = a.findIndex(
                        (e) => e.root === n.root && e.margin === n.margin
                      );
                      e > -1 && a.splice(e, 1);
                    }
                  }
                );
              })(e, (e) => e && f(e), {
                root: null == t ? void 0 : t.current,
                rootMargin: r,
              });
          } else if (!c) {
            let e = (0, o.requestIdleCallback)(() => f(!0));
            return () => (0, o.cancelIdleCallback)(e);
          }
        }, [s, r, t, c, d.current]),
        [
          p,
          c,
          (0, n.useCallback)(() => {
            f(!1);
          }, []),
        ]
      );
    }
    ('function' == typeof r.default ||
      ('object' == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, '__esModule', { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default));
  },
  8297,
  (e, t, r) => {
    'use strict';
    function n(e, t, r, n) {
      return !1;
    }
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'getDomainLocale', {
        enumerable: !0,
        get: function () {
          return n;
        },
      }),
      e.r(7235),
      ('function' == typeof r.default ||
        ('object' == typeof r.default && null !== r.default)) &&
        void 0 === r.default.__esModule &&
        (Object.defineProperty(r.default, '__esModule', { value: !0 }),
        Object.assign(r.default, r),
        (t.exports = r.default)));
  },
  2902,
  (e, t, r) => {
    'use strict';
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'useMergedRef', {
        enumerable: !0,
        get: function () {
          return o;
        },
      }));
    let n = e.r(6960);
    function o(e, t) {
      let r = (0, n.useRef)(null),
        o = (0, n.useRef)(null);
      return (0, n.useCallback)(
        (n) => {
          if (null === n) {
            let e = r.current;
            e && ((r.current = null), e());
            let t = o.current;
            t && ((o.current = null), t());
          } else (e && (r.current = u(e, n)), t && (o.current = u(t, n)));
        },
        [e, t]
      );
    }
    function u(e, t) {
      if ('function' != typeof e)
        return (
          (e.current = t),
          () => {
            e.current = null;
          }
        );
      {
        let r = e(t);
        return 'function' == typeof r ? r : () => e(null);
      }
    }
    ('function' == typeof r.default ||
      ('object' == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, '__esModule', { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default));
  },
  945,
  (e, t, r) => {
    'use strict';
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      Object.defineProperty(r, 'errorOnce', {
        enumerable: !0,
        get: function () {
          return n;
        },
      }));
    let n = (e) => {};
  },
  6908,
  (e, t, r) => {
    'use strict';
    (Object.defineProperty(r, '__esModule', { value: !0 }),
      !(function (e, t) {
        for (var r in t)
          Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
      })(r, {
        default: function () {
          return j;
        },
        useLinkStatus: function () {
          return x;
        },
      }));
    let n = e.r(7602),
      o = e.r(4601),
      u = n._(e.r(6960)),
      l = e.r(5645),
      a = e.r(8157),
      i = e.r(757),
      s = e.r(2368),
      c = e.r(8312),
      f = e.r(8123),
      d = e.r(3172),
      p = e.r(8297),
      y = e.r(5131),
      h = e.r(2902);
    e.r(945);
    let m = new Set();
    function v(e, t, r, n) {
      if ('undefined' != typeof window && (0, a.isLocalURL)(t)) {
        if (!n.bypassPrefetchedCheck) {
          let o =
            t +
            '%' +
            r +
            '%' +
            (void 0 !== n.locale
              ? n.locale
              : 'locale' in e
                ? e.locale
                : void 0);
          if (m.has(o)) return;
          m.add(o);
        }
        e.prefetch(t, r, n).catch((e) => {});
      }
    }
    function g(e) {
      return 'string' == typeof e ? e : (0, i.formatUrl)(e);
    }
    let b = u.default.forwardRef(function (e, t) {
        let r,
          n,
          {
            href: i,
            as: m,
            children: b,
            prefetch: _ = null,
            passHref: x,
            replace: j,
            shallow: w,
            scroll: E,
            locale: O,
            onClick: T,
            onNavigate: P,
            onMouseEnter: S,
            onTouchStart: C,
            legacyBehavior: k = !1,
            ...R
          } = e;
        ((r = b),
          k &&
            ('string' == typeof r || 'number' == typeof r) &&
            (r = (0, o.jsx)('a', { children: r })));
        let N = u.default.useContext(f.RouterContext),
          M = !1 !== _,
          { href: L, as: H } = u.default.useMemo(() => {
            if (!N) {
              let e = g(i);
              return { href: e, as: m ? g(m) : e };
            }
            let [e, t] = (0, l.resolveHref)(N, i, !0);
            return { href: e, as: m ? (0, l.resolveHref)(N, m) : t || e };
          }, [N, i, m]),
          A = u.default.useRef(L),
          I = u.default.useRef(H);
        k && (n = u.default.Children.only(r));
        let U = k ? n && 'object' == typeof n && n.ref : t,
          [D, $, F] = (0, d.useIntersection)({ rootMargin: '200px' }),
          z = u.default.useCallback(
            (e) => {
              ((I.current !== H || A.current !== L) &&
                (F(), (I.current = H), (A.current = L)),
                D(e));
            },
            [H, L, F, D]
          ),
          G = (0, h.useMergedRef)(z, U);
        u.default.useEffect(() => {
          N && $ && M && v(N, L, H, { locale: O });
        }, [H, L, $, O, M, null == N ? void 0 : N.locale, N]);
        let q = {
          ref: G,
          onClick(e) {
            (k || 'function' != typeof T || T(e),
              k &&
                n.props &&
                'function' == typeof n.props.onClick &&
                n.props.onClick(e),
              N &&
                (e.defaultPrevented ||
                  (function (e, t, r, n, o, u, l, i, s) {
                    let { nodeName: c } = e.currentTarget;
                    if (
                      !(
                        ('A' === c.toUpperCase() &&
                          (function (e) {
                            let t = e.currentTarget.getAttribute('target');
                            return (
                              (t && '_self' !== t) ||
                              e.metaKey ||
                              e.ctrlKey ||
                              e.shiftKey ||
                              e.altKey ||
                              (e.nativeEvent && 2 === e.nativeEvent.which)
                            );
                          })(e)) ||
                        e.currentTarget.hasAttribute('download')
                      )
                    ) {
                      if (!(0, a.isLocalURL)(r)) {
                        o && (e.preventDefault(), location.replace(r));
                        return;
                      }
                      (e.preventDefault(),
                        (() => {
                          if (s) {
                            let e = !1;
                            if (
                              (s({
                                preventDefault: () => {
                                  e = !0;
                                },
                              }),
                              e)
                            )
                              return;
                          }
                          let e = null == l || l;
                          'beforePopState' in t
                            ? t[o ? 'replace' : 'push'](r, n, {
                                shallow: u,
                                locale: i,
                                scroll: e,
                              })
                            : t[o ? 'replace' : 'push'](n || r, { scroll: e });
                        })());
                    }
                  })(e, N, L, H, j, w, E, O, P)));
          },
          onMouseEnter(e) {
            (k || 'function' != typeof S || S(e),
              k &&
                n.props &&
                'function' == typeof n.props.onMouseEnter &&
                n.props.onMouseEnter(e),
              N &&
                v(N, L, H, {
                  locale: O,
                  priority: !0,
                  bypassPrefetchedCheck: !0,
                }));
          },
          onTouchStart: function (e) {
            (k || 'function' != typeof C || C(e),
              k &&
                n.props &&
                'function' == typeof n.props.onTouchStart &&
                n.props.onTouchStart(e),
              N &&
                v(N, L, H, {
                  locale: O,
                  priority: !0,
                  bypassPrefetchedCheck: !0,
                }));
          },
        };
        if ((0, s.isAbsoluteUrl)(H)) q.href = H;
        else if (!k || x || ('a' === n.type && !('href' in n.props))) {
          let e = void 0 !== O ? O : null == N ? void 0 : N.locale;
          q.href =
            ((null == N ? void 0 : N.isLocaleDomain) &&
              (0, p.getDomainLocale)(
                H,
                e,
                null == N ? void 0 : N.locales,
                null == N ? void 0 : N.domainLocales
              )) ||
            (0, y.addBasePath)(
              (0, c.addLocale)(H, e, null == N ? void 0 : N.defaultLocale)
            );
        }
        return k
          ? u.default.cloneElement(n, q)
          : (0, o.jsx)('a', { ...R, ...q, children: r });
      }),
      _ = (0, u.createContext)({ pending: !1 }),
      x = () => (0, u.useContext)(_),
      j = b;
    ('function' == typeof r.default ||
      ('object' == typeof r.default && null !== r.default)) &&
      void 0 === r.default.__esModule &&
      (Object.defineProperty(r.default, '__esModule', { value: !0 }),
      Object.assign(r.default, r),
      (t.exports = r.default));
  },
  7910,
  (e, t, r) => {
    t.exports = e.r(6908);
  },
  6849,
  (e) => {
    'use strict';
    e.s(['default', () => i], 6849);
    var t = e.i(4601);
    let r = (e) => {
      let { className: r = '' } = e;
      return (0, t.jsx)('div', {
        className: ''
          .concat('w-full border-t border-neutral-800', ' ')
          .concat(r),
      });
    };
    var n = e.i(7910);
    let o = () =>
      (0, t.jsx)('nav', {
        children: (0, t.jsx)('div', {
          className: 'container mx-auto px-4 py-2 md:px-8 md:py-4',
          children: (0, t.jsx)('div', {
            className: 'flex items-center justify-between',
            children: (0, t.jsx)('div', {
              className: 'text-xl font-bold',
              children: (0, t.jsx)(n.default, {
                href: '/',
                children: 'Reverse Proxy',
              }),
            }),
          }),
        }),
      });
    async function u(e) {
      try {
        return { data: await e, error: null };
      } catch (e) {
        return { data: null, error: e };
      }
    }
    var l = e.i(6960);
    let a = function () {
        let e =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : { url: '', method: 'GET', headers: {} },
          { url: t, method: r = 'GET', headers: n = {} } = e,
          o = 'curl -i -L -X '.concat(r.toUpperCase(), " '").concat(t, "'");
        for (let [e, t] of Object.entries(n))
          o += ' \\\n--header "'.concat(e, ': ').concat(t, '"');
        return o;
      },
      i = () => {
        let [
            {
              loading: e = !1,
              method: n = 'GET',
              url: i = 'https://restcountries.com/v3.1/all?fields=name',
              headers: s = { 'Content-Type': 'application/json' },
              message: c = '',
            },
            f,
          ] = (0, l.useState)({
            loading: !1,
            method: 'GET',
            url: 'https://restcountries.com/v3.1/all?fields=name',
            headers: { 'Content-Type': 'application/json' },
            message: '',
          }),
          d = async () => {
            f((e) => ({ ...e, loading: !0 }));
            let e = new URLSearchParams();
            e.set('url', i);
            let t = '/api/reverse/proxy?'.concat(e.toString()),
              { data: r, error: n } = await u(fetch(t));
            if (n)
              return void f((e) => ({ ...e, loading: !1, message: n.message }));
            if (!r)
              return void f((e) => ({
                ...e,
                loading: !1,
                message: 'No Response',
              }));
            let o = r.headers.get('Content-Type');
            if (
              (console.log('contentType', o),
              null == o ? void 0 : o.includes('application/json'))
            ) {
              let { data: e, error: t } = await u(r.json());
              if (t)
                return void f((e) => ({
                  ...e,
                  loading: !1,
                  message: t.message,
                }));
              if (!e)
                return void f((e) => ({
                  ...e,
                  loading: !1,
                  message: 'No Data',
                }));
              f((t) => ({
                ...t,
                loading: !1,
                message: JSON.stringify(e, null, 2),
              }));
            } else {
              let { data: e, error: t } = await u(r.text());
              if (t)
                return void f((e) => ({
                  ...e,
                  loading: !1,
                  message: t.message,
                }));
              if (!e)
                return void f((e) => ({
                  ...e,
                  loading: !1,
                  message: 'No Data',
                }));
              f((t) => ({ ...t, loading: !1, message: e }));
            }
          };
        return (0, t.jsx)('div', {
          className: 'flex h-screen flex-col overflow-hidden',
          children: (0, t.jsxs)('div', {
            className: 'relative z-10 flex h-full flex-col',
            children: [
              (0, t.jsx)(o, {}),
              (0, t.jsx)(r, {}),
              (0, t.jsxs)('div', {
                className:
                  'container mx-auto flex h-full grow flex-col gap-y-4 p-4 md:gap-y-8 md:p-8',
                children: [
                  (0, t.jsxs)('div', {
                    className:
                      'flex flex-col items-center gap-2 md:flex-row md:gap-4',
                    children: [
                      (0, t.jsxs)('select', {
                        id: 'method',
                        name: 'method',
                        className: 'select w-full md:w-auto',
                        value: n,
                        onChange: (e) => {
                          f((t) => ({ ...t, method: e.target.value }));
                        },
                        children: [
                          (0, t.jsx)('option', {
                            value: 'GET',
                            children: 'GET',
                          }),
                          (0, t.jsx)('option', {
                            value: 'POST',
                            children: 'POST',
                          }),
                          (0, t.jsx)('option', {
                            value: 'PUT',
                            children: 'PUT',
                          }),
                          (0, t.jsx)('option', {
                            value: 'PATCH',
                            children: 'PATCH',
                          }),
                          (0, t.jsx)('option', {
                            value: 'DELETE',
                            children: 'DELETE',
                          }),
                        ],
                      }),
                      (0, t.jsx)('input', {
                        id: 'url',
                        name: 'url',
                        placeholder: 'URL',
                        className: 'input w-full grow md:w-auto',
                        value: i,
                        onChange: (e) => {
                          f((t) => ({ ...t, url: e.target.value }));
                        },
                      }),
                      (0, t.jsx)('button', {
                        type: 'button',
                        className: 'btn btn-primary w-full md:w-auto',
                        onClick: () => {
                          d();
                        },
                        children: 'Request',
                      }),
                    ],
                  }),
                  Object.entries(s).map((e) => {
                    let [r, n] = e;
                    return (0, t.jsxs)(
                      'div',
                      {
                        className: 'flex items-center gap-x-2 md:gap-x-4',
                        children: [
                          (0, t.jsx)('p', { children: 'Header' }),
                          (0, t.jsx)('input', {
                            id: 'key',
                            name: 'key',
                            className: 'input',
                            value: r,
                            readOnly: !0,
                          }),
                          (0, t.jsx)('input', {
                            id: 'value',
                            name: 'value',
                            className: 'input grow',
                            value: n,
                            readOnly: !0,
                          }),
                        ],
                      },
                      r
                    );
                  }),
                  (0, t.jsx)('textarea', {
                    rows: 5,
                    className: 'textarea w-full whitespace-nowrap',
                    value: a({
                      url: ''
                        .concat(
                          'https://micro24.vercel.app',
                          '/api/reverse/proxy?url='
                        )
                        .concat(encodeURIComponent(i)),
                      method: n,
                      headers: s,
                    }),
                    readOnly: !0,
                  }),
                  (0, t.jsx)('textarea', {
                    value: e ? 'Loading' : c,
                    rows: 10,
                    className: 'textarea w-full',
                    readOnly: !0,
                  }),
                ],
              }),
            ],
          }),
        });
      };
  },
  6610,
  (e, t, r) => {
    ((window.__NEXT_P = window.__NEXT_P || []).push(['/', () => e.r(6849)]),
      t.hot &&
        t.hot.dispose(function () {
          window.__NEXT_P.push(['/']);
        }));
  },
  1097,
  (e) => {
    e.v((t) =>
      Promise.all(
        ['static/chunks/f62f135baeb64c60.js'].map((t) => e.l(t))
      ).then(() => t(4418))
    );
  },
  541,
  (e) => {
    e.v((t) =>
      Promise.all(
        ['static/chunks/5fe971efb147d1d9.js'].map((t) => e.l(t))
      ).then(() => t(2690))
    );
  },
]);
