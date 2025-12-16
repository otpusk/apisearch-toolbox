"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.silentSearchWorker = silentSearchWorker;
var _effects = require("redux-saga/effects");
var R = _interopRequireWildcard(require("ramda"));
var _selectors = require("../../../queries/selectors");
var _selectors2 = require("../../../hotels/selectors");
var _fn = require("../../../queries/fn");
var _hotels = require("../../../hotels");
var _offers = require("../../../offers");
var _actions = require("../../actions");
var _resultsMemory = require("./getResultsWorker/resultsMemory");
var _helpers = require("./getResultsWorker/helpers");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t3 in e) "default" !== _t3 && {}.hasOwnProperty.call(e, _t3) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t3)) && (i.get || i.set) ? o(f, _t3, i) : f[_t3] = e[_t3]); return f; })(e, t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function silentSearchWorker(_ref) {
  var queryID = _ref.payload;
  return /*#__PURE__*/_regenerator().m(function _callee() {
    var query, memory, selectedOperators, _memory$getValues, hotelsHub, offersHub, unusedPrices, stablePrices, prices, nextPrices, hotelsFromStore, hotelsToStore, offersToStore, _t, _t2;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.n = 1;
          return (0, _effects.select)(function (state) {
            return (0, _selectors.getQuery)(state, {
              queryID: queryID
            });
          });
        case 1:
          query = _context.v;
          memory = _resultsMemory.memoryInstances[queryID];
          selectedOperators = query.get(_fn.QUERY_PARAMS.SELECTED_OPERATORS).toJS();
          _memory$getValues = memory.getValues(), hotelsHub = _memory$getValues.hotelsHub, offersHub = _memory$getValues.offersHub, unusedPrices = _memory$getValues.unusedPrices, stablePrices = _memory$getValues.stablePrices;
          prices = [].concat(_toConsumableArray(stablePrices), _toConsumableArray(unusedPrices));
          nextPrices = (0, _helpers.generateNextPrices)(prices, offersHub, query.get(_fn.QUERY_PARAMS.CURRENCY), selectedOperators);
          _context.n = 2;
          return (0, _effects.select)(_selectors2.hotelsHub);
        case 2:
          hotelsFromStore = _context.v;
          hotelsToStore = (0, _helpers.getHotelsEntitiesMap)(nextPrices, hotelsHub, hotelsFromStore);
          offersToStore = (0, _helpers.getOffersEntitiesMap)(nextPrices, offersHub);
          _t = !R.isEmpty(hotelsToStore);
          if (!_t) {
            _context.n = 3;
            break;
          }
          _context.n = 3;
          return (0, _effects.put)(_hotels.hotelsActions.addHotels(hotelsToStore));
        case 3:
          _t2 = !R.isEmpty(offersToStore);
          if (!_t2) {
            _context.n = 4;
            break;
          }
          _context.n = 4;
          return (0, _effects.put)(_offers.offersActions.addOffers(offersToStore));
        case 4:
          memory.setStablePrices(nextPrices);
          memory.setUnusedPrices((0, _helpers.getUnusedPrices)(nextPrices, prices));
          memory.setStableHotels((0, _helpers.getHotelsIDsFromPrices)(nextPrices));
          _context.n = 5;
          return (0, _effects.put)(_actions.searchActions.patchSearch(queryID, 'prices', [nextPrices]));
        case 5:
          _context.n = 6;
          return (0, _effects.put)(_actions.searchActions.processSearch(queryID, {
            page: 1,
            prices: nextPrices,
            total: (0, _helpers.getTotalBySelectedOperators)({
              offersHub: offersHub,
              prices: prices,
              selectedOperators: selectedOperators
            })
          }));
        case 6:
          return _context.a(2);
      }
    }, _callee);
  })();
}