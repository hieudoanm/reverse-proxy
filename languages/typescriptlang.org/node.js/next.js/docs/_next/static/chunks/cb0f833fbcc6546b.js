(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
	'object' == typeof document ? document.currentScript : void 0,
	2368,
	(e, t, n) => {
		'use strict';
		(Object.defineProperty(n, '__esModule', { value: !0 }),
			!(function (e, t) {
				for (var n in t)
					Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
			})(n, {
				DecodeError: function () {
					return m;
				},
				MiddlewareNotFoundError: function () {
					return b;
				},
				MissingStaticPage: function () {
					return v;
				},
				NormalizeError: function () {
					return h;
				},
				PageNotFoundError: function () {
					return _;
				},
				SP: function () {
					return p;
				},
				ST: function () {
					return y;
				},
				WEB_VITALS: function () {
					return r;
				},
				execOnce: function () {
					return o;
				},
				getDisplayName: function () {
					return c;
				},
				getLocationOrigin: function () {
					return a;
				},
				getURL: function () {
					return s;
				},
				isAbsoluteUrl: function () {
					return i;
				},
				isResSent: function () {
					return l;
				},
				loadGetInitialProps: function () {
					return d;
				},
				normalizeRepeatedSlashes: function () {
					return f;
				},
				stringifyError: function () {
					return g;
				},
			}));
		let r = ['CLS', 'FCP', 'FID', 'INP', 'LCP', 'TTFB'];
		function o(e) {
			let t,
				n = !1;
			return function () {
				for (var r = arguments.length, o = Array(r), u = 0; u < r; u++)
					o[u] = arguments[u];
				return (n || ((n = !0), (t = e(...o))), t);
			};
		}
		let u = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/,
			i = (e) => u.test(e);
		function a() {
			let { protocol: e, hostname: t, port: n } = window.location;
			return e + '//' + t + (n ? ':' + n : '');
		}
		function s() {
			let { href: e } = window.location,
				t = a();
			return e.substring(t.length);
		}
		function c(e) {
			return 'string' == typeof e ? e : e.displayName || e.name || 'Unknown';
		}
		function l(e) {
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
			let n = t.res || (t.ctx && t.ctx.res);
			if (!e.getInitialProps)
				return t.ctx && t.Component
					? { pageProps: await d(t.Component, t.ctx) }
					: {};
			let r = await e.getInitialProps(t);
			if (n && l(n)) return r;
			if (!r)
				throw Object.defineProperty(
					Error(
						'"' +
							c(e) +
							'.getInitialProps()" should resolve to an object. But found "' +
							r +
							'" instead.',
					),
					'__NEXT_ERROR_CODE',
					{ value: 'E394', enumerable: !1, configurable: !0 },
				);
			return r;
		}
		let p = 'undefined' != typeof performance,
			y =
				p &&
				['mark', 'measure', 'getEntriesByName'].every(
					(e) => 'function' == typeof performance[e],
				);
		class m extends Error {}
		class h extends Error {}
		class _ extends Error {
			constructor(e) {
				(super(),
					(this.code = 'ENOENT'),
					(this.name = 'PageNotFoundError'),
					(this.message = 'Cannot find module for page: ' + e));
			}
		}
		class v extends Error {
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
		function g(e) {
			return JSON.stringify({ message: e.message, stack: e.stack });
		}
	},
	6402,
	(e, t, n) => {
		!(function () {
			var e = {
					229: function (e) {
						var t,
							n,
							r,
							o = (e.exports = {});
						function u() {
							throw Error('setTimeout has not been defined');
						}
						function i() {
							throw Error('clearTimeout has not been defined');
						}
						try {
							t = 'function' == typeof setTimeout ? setTimeout : u;
						} catch (e) {
							t = u;
						}
						try {
							n = 'function' == typeof clearTimeout ? clearTimeout : i;
						} catch (e) {
							n = i;
						}
						function a(e) {
							if (t === setTimeout) return setTimeout(e, 0);
							if ((t === u || !t) && setTimeout)
								return ((t = setTimeout), setTimeout(e, 0));
							try {
								return t(e, 0);
							} catch (n) {
								try {
									return t.call(null, e, 0);
								} catch (n) {
									return t.call(this, e, 0);
								}
							}
						}
						var s = [],
							c = !1,
							l = -1;
						function f() {
							c &&
								r &&
								((c = !1),
								r.length ? (s = r.concat(s)) : (l = -1),
								s.length && d());
						}
						function d() {
							if (!c) {
								var e = a(f);
								c = !0;
								for (var t = s.length; t; ) {
									for (r = s, s = []; ++l < t; ) r && r[l].run();
									((l = -1), (t = s.length));
								}
								((r = null),
									(c = !1),
									(function (e) {
										if (n === clearTimeout) return clearTimeout(e);
										if ((n === i || !n) && clearTimeout)
											return ((n = clearTimeout), clearTimeout(e));
										try {
											n(e);
										} catch (t) {
											try {
												return n.call(null, e);
											} catch (t) {
												return n.call(this, e);
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
								for (var n = 1; n < arguments.length; n++)
									t[n - 1] = arguments[n];
							(s.push(new p(e, t)), 1 !== s.length || c || a(d));
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
				n = {};
			function r(t) {
				var o = n[t];
				if (void 0 !== o) return o.exports;
				var u = (n[t] = { exports: {} }),
					i = !0;
				try {
					(e[t](u, u.exports, r), (i = !1));
				} finally {
					i && delete n[t];
				}
				return u.exports;
			}
			((r.ab =
				'/ROOT/node_modules/.pnpm/next@15.5.4_@babel+core@7.28.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/process/'),
				(t.exports = r(229)));
		})();
	},
	7739,
	(e, t, n) => {
		'use strict';
		var r, o;
		t.exports =
			(null == (r = e.g.process) ? void 0 : r.env) &&
			'object' == typeof (null == (o = e.g.process) ? void 0 : o.env)
				? e.g.process
				: e.r(6402);
	},
	2879,
	(e, t, n) => {
		'use strict';
		n._ = function (e) {
			return e && e.__esModule ? e : { default: e };
		};
	},
	6234,
	(e, t, n) => {
		'use strict';
		var r = Symbol.for('react.transitional.element');
		function o(e, t, n) {
			var o = null;
			if (
				(void 0 !== n && (o = '' + n),
				void 0 !== t.key && (o = '' + t.key),
				'key' in t)
			)
				for (var u in ((n = {}), t)) 'key' !== u && (n[u] = t[u]);
			else n = t;
			return {
				$$typeof: r,
				type: e,
				key: o,
				ref: void 0 !== (t = n.ref) ? t : null,
				props: n,
			};
		}
		((n.Fragment = Symbol.for('react.fragment')), (n.jsx = o), (n.jsxs = o));
	},
	4601,
	(e, t, n) => {
		'use strict';
		t.exports = e.r(6234);
	},
	4513,
	(e, t, n) => {
		'use strict';
		var r = e.i(7739),
			o = Symbol.for('react.transitional.element'),
			u = Symbol.for('react.portal'),
			i = Symbol.for('react.fragment'),
			a = Symbol.for('react.strict_mode'),
			s = Symbol.for('react.profiler'),
			c = Symbol.for('react.consumer'),
			l = Symbol.for('react.context'),
			f = Symbol.for('react.forward_ref'),
			d = Symbol.for('react.suspense'),
			p = Symbol.for('react.memo'),
			y = Symbol.for('react.lazy'),
			m = Symbol.for('react.activity'),
			h = Symbol.iterator,
			_ = {
				isMounted: function () {
					return !1;
				},
				enqueueForceUpdate: function () {},
				enqueueReplaceState: function () {},
				enqueueSetState: function () {},
			},
			v = Object.assign,
			b = {};
		function g(e, t, n) {
			((this.props = e),
				(this.context = t),
				(this.refs = b),
				(this.updater = n || _));
		}
		function w() {}
		function E(e, t, n) {
			((this.props = e),
				(this.context = t),
				(this.refs = b),
				(this.updater = n || _));
		}
		((g.prototype.isReactComponent = {}),
			(g.prototype.setState = function (e, t) {
				if ('object' != typeof e && 'function' != typeof e && null != e)
					throw Error(
						'takes an object of state variables to update or a function which returns an object of state variables.',
					);
				this.updater.enqueueSetState(this, e, t, 'setState');
			}),
			(g.prototype.forceUpdate = function (e) {
				this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
			}),
			(w.prototype = g.prototype));
		var S = (E.prototype = new w());
		((S.constructor = E), v(S, g.prototype), (S.isPureReactComponent = !0));
		var j = Array.isArray;
		function O() {}
		var x = { H: null, A: null, T: null, S: null },
			P = Object.prototype.hasOwnProperty;
		function T(e, t, n) {
			var r = n.ref;
			return {
				$$typeof: o,
				type: e,
				key: t,
				ref: void 0 !== r ? r : null,
				props: n,
			};
		}
		function k(e) {
			return 'object' == typeof e && null !== e && e.$$typeof === o;
		}
		var C = /\/+/g;
		function N(e, t) {
			var n, r;
			return 'object' == typeof e && null !== e && null != e.key
				? ((n = '' + e.key),
					(r = { '=': '=0', ':': '=2' }),
					'$' +
						n.replace(/[=:]/g, function (e) {
							return r[e];
						}))
				: t.toString(36);
		}
		function M(e, t, n) {
			if (null == e) return e;
			var r = [],
				i = 0;
			return (
				!(function e(t, n, r, i, a) {
					var s,
						c,
						l,
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
										return e((d = t._init)(t._payload), n, r, i, a);
								}
						}
					if (d)
						return (
							(a = a(t)),
							(d = '' === i ? '.' + N(t, 0) : i),
							j(a)
								? ((r = ''),
									null != d && (r = d.replace(C, '$&/') + '/'),
									e(a, n, r, '', function (e) {
										return e;
									}))
								: null != a &&
									(k(a) &&
										((s = a),
										(c =
											r +
											(null == a.key || (t && t.key === a.key)
												? ''
												: ('' + a.key).replace(C, '$&/') + '/') +
											d),
										(a = T(s.type, c, s.props))),
									n.push(a)),
							1
						);
					d = 0;
					var p = '' === i ? '.' : i + ':';
					if (j(t))
						for (var m = 0; m < t.length; m++)
							((f = p + N((i = t[m]), m)), (d += e(i, n, r, f, a)));
					else if (
						'function' ==
						typeof (m =
							null === (l = t) || 'object' != typeof l
								? null
								: 'function' == typeof (l = (h && l[h]) || l['@@iterator'])
									? l
									: null)
					)
						for (t = m.call(t), m = 0; !(i = t.next()).done; )
							((f = p + N((i = i.value), m++)), (d += e(i, n, r, f, a)));
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
															},
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
								n,
								r,
								i,
								a,
							);
						throw Error(
							'Objects are not valid as a React child (found: ' +
								('[object Object]' === (n = String(t))
									? 'object with keys {' + Object.keys(t).join(', ') + '}'
									: n) +
								'). If you meant to render a collection of children, use an array instead.',
						);
					}
					return d;
				})(e, r, '', '', function (e) {
					return t.call(n, e, i++);
				}),
				r
			);
		}
		function R(e) {
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
					},
				),
					-1 === e._status && ((e._status = 0), (e._result = t)));
			}
			if (1 === e._status) return e._result.default;
			throw e._result;
		}
		var A =
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
							'object' == typeof r.default &&
							'function' == typeof r.default.emit
						)
							return void r.default.emit('uncaughtException', e);
						console.error(e);
					};
		((n.Activity = m),
			(n.Children = {
				map: M,
				forEach: function (e, t, n) {
					M(
						e,
						function () {
							t.apply(this, arguments);
						},
						n,
					);
				},
				count: function (e) {
					var t = 0;
					return (
						M(e, function () {
							t++;
						}),
						t
					);
				},
				toArray: function (e) {
					return (
						M(e, function (e) {
							return e;
						}) || []
					);
				},
				only: function (e) {
					if (!k(e))
						throw Error(
							'React.Children.only expected to receive a single React element child.',
						);
					return e;
				},
			}),
			(n.Component = g),
			(n.Fragment = i),
			(n.Profiler = s),
			(n.PureComponent = E),
			(n.StrictMode = a),
			(n.Suspense = d),
			(n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = x),
			(n.__COMPILER_RUNTIME = {
				__proto__: null,
				c: function (e) {
					return x.H.useMemoCache(e);
				},
			}),
			(n.cache = function (e) {
				return function () {
					return e.apply(null, arguments);
				};
			}),
			(n.cacheSignal = function () {
				return null;
			}),
			(n.cloneElement = function (e, t, n) {
				if (null == e)
					throw Error(
						'The argument must be a React element, but you passed ' + e + '.',
					);
				var r = v({}, e.props),
					o = e.key;
				if (null != t)
					for (u in (void 0 !== t.key && (o = '' + t.key), t))
						P.call(t, u) &&
							'key' !== u &&
							'__self' !== u &&
							'__source' !== u &&
							('ref' !== u || void 0 !== t.ref) &&
							(r[u] = t[u]);
				var u = arguments.length - 2;
				if (1 === u) r.children = n;
				else if (1 < u) {
					for (var i = Array(u), a = 0; a < u; a++) i[a] = arguments[a + 2];
					r.children = i;
				}
				return T(e.type, o, r);
			}),
			(n.createContext = function (e) {
				return (
					((e = {
						$$typeof: l,
						_currentValue: e,
						_currentValue2: e,
						_threadCount: 0,
						Provider: null,
						Consumer: null,
					}).Provider = e),
					(e.Consumer = { $$typeof: c, _context: e }),
					e
				);
			}),
			(n.createElement = function (e, t, n) {
				var r,
					o = {},
					u = null;
				if (null != t)
					for (r in (void 0 !== t.key && (u = '' + t.key), t))
						P.call(t, r) &&
							'key' !== r &&
							'__self' !== r &&
							'__source' !== r &&
							(o[r] = t[r]);
				var i = arguments.length - 2;
				if (1 === i) o.children = n;
				else if (1 < i) {
					for (var a = Array(i), s = 0; s < i; s++) a[s] = arguments[s + 2];
					o.children = a;
				}
				if (e && e.defaultProps)
					for (r in (i = e.defaultProps)) void 0 === o[r] && (o[r] = i[r]);
				return T(e, u, o);
			}),
			(n.createRef = function () {
				return { current: null };
			}),
			(n.forwardRef = function (e) {
				return { $$typeof: f, render: e };
			}),
			(n.isValidElement = k),
			(n.lazy = function (e) {
				return { $$typeof: y, _payload: { _status: -1, _result: e }, _init: R };
			}),
			(n.memo = function (e, t) {
				return { $$typeof: p, type: e, compare: void 0 === t ? null : t };
			}),
			(n.startTransition = function (e) {
				var t = x.T,
					n = {};
				x.T = n;
				try {
					var r = e(),
						o = x.S;
					(null !== o && o(n, r),
						'object' == typeof r &&
							null !== r &&
							'function' == typeof r.then &&
							r.then(O, A));
				} catch (e) {
					A(e);
				} finally {
					(null !== t && null !== n.types && (t.types = n.types), (x.T = t));
				}
			}),
			(n.unstable_useCacheRefresh = function () {
				return x.H.useCacheRefresh();
			}),
			(n.use = function (e) {
				return x.H.use(e);
			}),
			(n.useActionState = function (e, t, n) {
				return x.H.useActionState(e, t, n);
			}),
			(n.useCallback = function (e, t) {
				return x.H.useCallback(e, t);
			}),
			(n.useContext = function (e) {
				return x.H.useContext(e);
			}),
			(n.useDebugValue = function () {}),
			(n.useDeferredValue = function (e, t) {
				return x.H.useDeferredValue(e, t);
			}),
			(n.useEffect = function (e, t) {
				return x.H.useEffect(e, t);
			}),
			(n.useEffectEvent = function (e) {
				return x.H.useEffectEvent(e);
			}),
			(n.useId = function () {
				return x.H.useId();
			}),
			(n.useImperativeHandle = function (e, t, n) {
				return x.H.useImperativeHandle(e, t, n);
			}),
			(n.useInsertionEffect = function (e, t) {
				return x.H.useInsertionEffect(e, t);
			}),
			(n.useLayoutEffect = function (e, t) {
				return x.H.useLayoutEffect(e, t);
			}),
			(n.useMemo = function (e, t) {
				return x.H.useMemo(e, t);
			}),
			(n.useOptimistic = function (e, t) {
				return x.H.useOptimistic(e, t);
			}),
			(n.useReducer = function (e, t, n) {
				return x.H.useReducer(e, t, n);
			}),
			(n.useRef = function (e) {
				return x.H.useRef(e);
			}),
			(n.useState = function (e) {
				return x.H.useState(e);
			}),
			(n.useSyncExternalStore = function (e, t, n) {
				return x.H.useSyncExternalStore(e, t, n);
			}),
			(n.useTransition = function () {
				return x.H.useTransition();
			}),
			(n.version = '19.2.0'));
	},
	6960,
	(e, t, n) => {
		'use strict';
		t.exports = e.r(4513);
	},
	7602,
	(e, t, n) => {
		'use strict';
		function r(e) {
			if ('function' != typeof WeakMap) return null;
			var t = new WeakMap(),
				n = new WeakMap();
			return (r = function (e) {
				return e ? n : t;
			})(e);
		}
		n._ = function (e, t) {
			if (!t && e && e.__esModule) return e;
			if (null === e || ('object' != typeof e && 'function' != typeof e))
				return { default: e };
			var n = r(t);
			if (n && n.has(e)) return n.get(e);
			var o = { __proto__: null },
				u = Object.defineProperty && Object.getOwnPropertyDescriptor;
			for (var i in e)
				if ('default' !== i && Object.prototype.hasOwnProperty.call(e, i)) {
					var a = u ? Object.getOwnPropertyDescriptor(e, i) : null;
					a && (a.get || a.set)
						? Object.defineProperty(o, i, a)
						: (o[i] = e[i]);
				}
			return ((o.default = e), n && n.set(e, o), o);
		};
	},
	9319,
	(e, t, n) => {
		'use strict';
		(Object.defineProperty(n, '__esModule', { value: !0 }),
			Object.defineProperty(n, 'HeadManagerContext', {
				enumerable: !0,
				get: function () {
					return r;
				},
			}));
		let r = e.r(2879)._(e.r(6960)).default.createContext({});
	},
	4300,
	(e, t, n) => {
		'use strict';
		(Object.defineProperty(n, '__esModule', { value: !0 }),
			Object.defineProperty(n, 'warnOnce', {
				enumerable: !0,
				get: function () {
					return r;
				},
			}));
		let r = (e) => {};
	},
	4397,
	(e, t, n) => {
		'use strict';
		(Object.defineProperty(n, '__esModule', { value: !0 }),
			Object.defineProperty(n, 'default', {
				enumerable: !0,
				get: function () {
					return a;
				},
			}));
		let r = e.r(6960),
			o = 'undefined' == typeof window,
			u = o ? () => {} : r.useLayoutEffect,
			i = o ? () => {} : r.useEffect;
		function a(e) {
			let { headManager: t, reduceComponentsToState: n } = e;
			function a() {
				if (t && t.mountedInstances) {
					let o = r.Children.toArray(
						Array.from(t.mountedInstances).filter(Boolean),
					);
					t.updateHead(n(o, e));
				}
			}
			if (o) {
				var s;
				(null == t || null == (s = t.mountedInstances) || s.add(e.children),
					a());
			}
			return (
				u(() => {
					var n;
					return (
						null == t || null == (n = t.mountedInstances) || n.add(e.children),
						() => {
							var n;
							null == t ||
								null == (n = t.mountedInstances) ||
								n.delete(e.children);
						}
					);
				}),
				u(
					() => (
						t && (t._pendingUpdate = a),
						() => {
							t && (t._pendingUpdate = a);
						}
					),
				),
				i(
					() => (
						t &&
							t._pendingUpdate &&
							(t._pendingUpdate(), (t._pendingUpdate = null)),
						() => {
							t &&
								t._pendingUpdate &&
								(t._pendingUpdate(), (t._pendingUpdate = null));
						}
					),
				),
				null
			);
		}
	},
	8599,
	(e, t, n) => {
		'use strict';
		(Object.defineProperty(n, '__esModule', { value: !0 }),
			Object.defineProperty(n, 'AmpStateContext', {
				enumerable: !0,
				get: function () {
					return r;
				},
			}));
		let r = e.r(2879)._(e.r(6960)).default.createContext({});
	},
	2664,
	(e, t, n) => {
		'use strict';
		function r(e) {
			let {
				ampFirst: t = !1,
				hybrid: n = !1,
				hasQuery: r = !1,
			} = void 0 === e ? {} : e;
			return t || (n && r);
		}
		(Object.defineProperty(n, '__esModule', { value: !0 }),
			Object.defineProperty(n, 'isInAmpMode', {
				enumerable: !0,
				get: function () {
					return r;
				},
			}));
	},
	1156,
	(e, t, n) => {
		'use strict';
		(Object.defineProperty(n, '__esModule', { value: !0 }),
			!(function (e, t) {
				for (var n in t)
					Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
			})(n, {
				default: function () {
					return m;
				},
				defaultHead: function () {
					return f;
				},
			}));
		let r = e.r(2879),
			o = e.r(7602),
			u = e.r(4601),
			i = o._(e.r(6960)),
			a = r._(e.r(4397)),
			s = e.r(8599),
			c = e.r(9319),
			l = e.r(2664);
		function f(e) {
			void 0 === e && (e = !1);
			let t = [(0, u.jsx)('meta', { charSet: 'utf-8' }, 'charset')];
			return (
				e ||
					t.push(
						(0, u.jsx)(
							'meta',
							{ name: 'viewport', content: 'width=device-width' },
							'viewport',
						),
					),
				t
			);
		}
		function d(e, t) {
			return 'string' == typeof t || 'number' == typeof t
				? e
				: t.type === i.default.Fragment
					? e.concat(
							i.default.Children.toArray(t.props.children).reduce(
								(e, t) =>
									'string' == typeof t || 'number' == typeof t
										? e
										: e.concat(t),
								[],
							),
						)
					: e.concat(t);
		}
		e.r(4300);
		let p = ['name', 'httpEquiv', 'charSet', 'itemProp'];
		function y(e, t) {
			let { inAmpMode: n } = t;
			return e
				.reduce(d, [])
				.reverse()
				.concat(f(n).reverse())
				.filter(
					(function () {
						let e = new Set(),
							t = new Set(),
							n = new Set(),
							r = {};
						return (o) => {
							let u = !0,
								i = !1;
							if (o.key && 'number' != typeof o.key && o.key.indexOf('$') > 0) {
								i = !0;
								let t = o.key.slice(o.key.indexOf('$') + 1);
								e.has(t) ? (u = !1) : e.add(t);
							}
							switch (o.type) {
								case 'title':
								case 'base':
									t.has(o.type) ? (u = !1) : t.add(o.type);
									break;
								case 'meta':
									for (let e = 0, t = p.length; e < t; e++) {
										let t = p[e];
										if (o.props.hasOwnProperty(t))
											if ('charSet' === t) n.has(t) ? (u = !1) : n.add(t);
											else {
												let e = o.props[t],
													n = r[t] || new Set();
												('name' !== t || !i) && n.has(e)
													? (u = !1)
													: (n.add(e), (r[t] = n));
											}
									}
							}
							return u;
						};
					})(),
				)
				.reverse()
				.map((e, t) => {
					let n = e.key || t;
					return i.default.cloneElement(e, { key: n });
				});
		}
		let m = function (e) {
			let { children: t } = e,
				n = (0, i.useContext)(s.AmpStateContext),
				r = (0, i.useContext)(c.HeadManagerContext);
			return (0, u.jsx)(a.default, {
				reduceComponentsToState: y,
				headManager: r,
				inAmpMode: (0, l.isInAmpMode)(n),
				children: t,
			});
		};
		('function' == typeof n.default ||
			('object' == typeof n.default && null !== n.default)) &&
			void 0 === n.default.__esModule &&
			(Object.defineProperty(n.default, '__esModule', { value: !0 }),
			Object.assign(n.default, n),
			(t.exports = n.default));
	},
	9778,
	(e, t, n) => {
		t.exports = e.r(1156);
	},
	7914,
	(e) => {
		e.v({
			className: 'geist_67d76b20-module__yOMf8W__className',
			variable: 'geist_67d76b20-module__yOMf8W__variable',
		});
	},
	4510,
	(e) => {
		e.v({
			className: 'geist_mono_66039167-module__O0reuq__className',
			variable: 'geist_mono_66039167-module__O0reuq__variable',
		});
	},
	2177,
	(e) => {
		'use strict';
		e.s(['default', () => a], 2177);
		var t = e.i(4601),
			n = e.i(9778),
			r = e.i(7914);
		let o = {
			className: r.default.className,
			style: { fontFamily: "'Geist', 'Geist Fallback'", fontStyle: 'normal' },
		};
		null != r.default.variable && (o.variable = r.default.variable);
		var u = e.i(4510);
		let i = {
			className: u.default.className,
			style: {
				fontFamily: "'Geist Mono', 'Geist Mono Fallback'",
				fontStyle: 'normal',
			},
		};
		null != u.default.variable && (i.variable = u.default.variable);
		let a = (e) => {
			let { Component: r, pageProps: u } = e;
			return (0, t.jsxs)(t.Fragment, {
				children: [
					(0, t.jsx)(n.default, {
						children: (0, t.jsx)('title', { children: 'Chess' }),
					}),
					(0, t.jsx)('div', {
						className: ''.concat(o.className, ' ').concat(i.className),
						children: (0, t.jsx)(r, { ...u }),
					}),
				],
			});
		};
	},
	9601,
	(e, t, n) => {
		let r = '/_app';
		((window.__NEXT_P = window.__NEXT_P || []).push([r, () => e.r(2177)]),
			t.hot &&
				t.hot.dispose(function () {
					window.__NEXT_P.push([r]);
				}));
	},
	1097,
	(e) => {
		e.v((t) =>
			Promise.all(
				['static/chunks/302a18054f9a5f2a.js'].map((t) => e.l(t)),
			).then(() => t(4418)),
		);
	},
	541,
	(e) => {
		e.v((t) =>
			Promise.all(
				['static/chunks/5fe971efb147d1d9.js'].map((t) => e.l(t)),
			).then(() => t(2690)),
		);
	},
]);
