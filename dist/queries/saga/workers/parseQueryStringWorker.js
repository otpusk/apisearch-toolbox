"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseQueryStringWorker = parseQueryStringWorker;
var _effects = require("redux-saga/effects");
var _immutable = require("immutable");
var _actions = require("../../actions");
var _actions2 = require("../../../search/actions");
var _fn = require("../../fn");
var _parsers = require("../../parsers");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
var _marked = /*#__PURE__*/_regenerator().m(parseQueryParam);
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // Core
// Instruments
function parseQueryParam(paramName, rawValue, queryId) {
  var _paramsToParsers;
  var token, currentValue, paramsToParsers, parsedValue;
  return _regenerator().w(function (_context) {
    while (1) switch (_context.n) {
      case 0:
        _context.n = 1;
        return (0, _effects.select)(function (state) {
          return state.auth.getIn(['otpusk', 'token']);
        });
      case 1:
        token = _context.v;
        _context.n = 2;
        return (0, _effects.select)(function (state) {
          return state.queries.get(queryId).get(paramName, null);
        });
      case 2:
        currentValue = _context.v;
        paramsToParsers = (_paramsToParsers = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_paramsToParsers, _fn.QUERY_PARAMS.AUTOSTART, Boolean), _fn.QUERY_PARAMS.DEPARTURE, Number), _fn.QUERY_PARAMS.CATEGORY, _parsers.binaryParser), _fn.QUERY_PARAMS.TRANSPORT, _parsers.binaryParser), _fn.QUERY_PARAMS.FOOD, _parsers.binaryParser), _fn.QUERY_PARAMS.DATES, _parsers.datesParser), _fn.QUERY_PARAMS.DURATION, _parsers.rangeParser), _fn.QUERY_PARAMS.ADULTS, Number), _fn.QUERY_PARAMS.CHILDREN, (0, _parsers.createImmutableNumbersArrayParser)(_immutable.List)), _fn.QUERY_PARAMS.COUNTRY, String), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_paramsToParsers, _fn.QUERY_PARAMS.CITIES, (0, _parsers.createImmutableNumbersArrayParser)(_immutable.Set)), _fn.QUERY_PARAMS.HOTELS, (0, _parsers.createImmutableNumbersArrayParser)(_immutable.Set)), _fn.QUERY_PARAMS.PRICE, _parsers.rangeParser), _fn.QUERY_PARAMS.SERVICES, (0, _parsers.createImmutableArrayParser)(_immutable.Set)));
        if (!(rawValue !== _fn.GLUE.empty)) {
          _context.n = 4;
          break;
        }
        _context.n = 3;
        return paramsToParsers[paramName](rawValue, {
          prevValue: currentValue,
          token: token
        });
      case 3:
        parsedValue = _context.v;
        if (!parsedValue) {
          _context.n = 4;
          break;
        }
        _context.n = 4;
        return (0, _effects.put)(_actions.queriesActions.changeQueryParam(queryId, paramName, parsedValue));
      case 4:
        return _context.a(2);
    }
  }, _marked);
}
function parseQueryStringWorker(_ref) {
  var _ref$payload = _ref.payload,
    queryString = _ref$payload.queryString,
    queryId = _ref$payload.queryId;
  return /*#__PURE__*/_regenerator().m(function _callee() {
    var baseQuery, queryParams, _iterator, _step, _loop, resultQuery, _t, _t2;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _context3.n = 1;
          return (0, _effects.select)(function (state) {
            return state.queries.get(queryId);
          });
        case 1:
          baseQuery = _context3.v;
          queryParams = queryString.replace('#/', '').split('/');
          _context3.p = 2;
          _iterator = _createForOfIteratorHelper(baseQuery);
          _context3.p = 3;
          _loop = /*#__PURE__*/_regenerator().m(function _loop() {
            var _step$value, paramName, position, rawValue;
            return _regenerator().w(function (_context2) {
              while (1) switch (_context2.n) {
                case 0:
                  _step$value = _slicedToArray(_step.value, 1), paramName = _step$value[0];
                  position = baseQuery.keySeq().findIndex(function (f) {
                    return f === paramName;
                  });
                  rawValue = position in queryParams ? queryParams[position] : null;
                  if (!rawValue) {
                    _context2.n = 1;
                    break;
                  }
                  _context2.n = 1;
                  return parseQueryParam(paramName, rawValue, queryId);
                case 1:
                  return _context2.a(2);
              }
            }, _loop);
          });
          _iterator.s();
        case 4:
          if ((_step = _iterator.n()).done) {
            _context3.n = 6;
            break;
          }
          return _context3.d(_regeneratorValues(_loop()), 5);
        case 5:
          _context3.n = 4;
          break;
        case 6:
          _context3.n = 8;
          break;
        case 7:
          _context3.p = 7;
          _t = _context3.v;
          _iterator.e(_t);
        case 8:
          _context3.p = 8;
          _iterator.f();
          return _context3.f(8);
        case 9:
          _context3.n = 10;
          return (0, _effects.put)(_actions.queriesActions.parseQueryStringSuccess(queryId));
        case 10:
          _context3.n = 12;
          break;
        case 11:
          _context3.p = 11;
          _t2 = _context3.v;
          _context3.n = 12;
          return (0, _effects.put)(_actions.queriesActions.parseQueryStringFail(_t2));
        case 12:
          _context3.n = 13;
          return (0, _effects.select)(function (state) {
            return state.queries.get(queryId);
          });
        case 13:
          resultQuery = _context3.v;
          if (!(resultQuery.get(_fn.QUERY_PARAMS.AUTOSTART) === true)) {
            _context3.n = 14;
            break;
          }
          _context3.n = 14;
          return (0, _effects.put)(_actions2.searchActions.runSearch(queryId));
        case 14:
          return _context3.a(2);
      }
    }, _callee, null, [[3, 7, 8, 9], [2, 11]]);
  })();
}