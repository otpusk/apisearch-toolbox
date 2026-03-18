"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getResultsWorker = getResultsWorker;
var _effects = require("redux-saga/effects");
var R = _interopRequireWildcard(require("ramda"));
var _jsonApi = require("@otpusk/json-api");
var _selectors = require("../../../../queries/selectors");
var _fn = require("../../../../queries/fn");
var _actions = require("../../../../search/actions");
var _actions2 = require("../../../../hotels/actions");
var _selectors2 = require("../../../../hotels/selectors");
var _actions3 = require("../../../../offers/actions");
var _resultsMemory = _interopRequireWildcard(require("./resultsMemory"));
var _helpers = require("./helpers");
var _constants = require("./constants");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t4 in e) "default" !== _t4 && {}.hasOwnProperty.call(e, _t4) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t4)) && (i.get || i.set) ? o(f, _t4, i) : f[_t4] = e[_t4]); return f; })(e, t); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function getResultsWorker(_ref) {
  var queryID = _ref.payload;
  return /*#__PURE__*/_regenerator().m(function _callee() {
    var query, lang, token, otpsukQuery, activePage, memory, _loop, _memory$getValues, total, _error$response, _memory$getValues4, usedPrices, _t3;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _context2.n = 1;
          return (0, _effects.select)(function (state) {
            return (0, _selectors.getQuery)(state, {
              queryID: queryID
            });
          });
        case 1:
          query = _context2.v;
          _context2.n = 2;
          return (0, _effects.select)(function (state) {
            return state.auth.getIn(['otpusk', 'lang'], null);
          });
        case 2:
          lang = _context2.v;
          _context2.n = 3;
          return (0, _effects.select)(function (state) {
            return state.auth.getIn(['otpusk', 'token']);
          });
        case 3:
          token = _context2.v;
          otpsukQuery = (0, _fn.convertToOtpQuery)(query.set(_fn.QUERY_PARAMS.LANGUAGE, lang));
          _context2.n = 4;
          return (0, _effects.put)(_actions.searchActions.startSearch(queryID));
        case 4:
          otpsukQuery.number = 0;
          otpsukQuery.data = 'extlinks';
          activePage = query.get(_fn.QUERY_PARAMS.PAGE);
          activePage === 1 && delete _resultsMemory.memoryInstances[queryID];
          memory = _resultsMemory.memoryInstances[queryID] = _resultsMemory.memoryInstances[queryID] || (0, _resultsMemory["default"])();
          _context2.p = 5;
          _loop = /*#__PURE__*/_regenerator().m(function _loop() {
            var _yield$call, finished, hotels, offers, country, operators, total, meta, prices, _memory$getValues2, hotelsHub, offersHub, _usedPrices, unusedPrices, stableHotels, pricesWithoutStable, freshSelectedOperators, nextPrices, hotelsFromStore, hotelsToStore, offersToStore, _memory$getValues3, usedPrices, totalValue, ignoreOperators, _t, _t2;
            return _regenerator().w(function (_context) {
              while (1) switch (_context.n) {
                case 0:
                  _context.n = 1;
                  return (0, _effects.call)(_jsonApi.getToursNextSearch, token, otpsukQuery);
                case 1:
                  _yield$call = _context.v;
                  finished = _yield$call.lastResult;
                  hotels = _yield$call.hotels;
                  offers = _yield$call.offers;
                  country = _yield$call.country;
                  operators = _yield$call.progress;
                  total = _yield$call.total;
                  meta = _yield$call.meta;
                  prices = _yield$call.prices;
                  !R.isEmpty(hotels) && memory.addHotels(hotels);
                  !R.isEmpty(offers) && memory.addOffers(offers);
                  memory.incTotal(total);
                  _memory$getValues2 = memory.getValues(), hotelsHub = _memory$getValues2.hotelsHub, offersHub = _memory$getValues2.offersHub, _usedPrices = _memory$getValues2.usedPrices, unusedPrices = _memory$getValues2.unusedPrices, stableHotels = _memory$getValues2.stableHotels;
                  pricesWithoutStable = R.filter(function (_ref2) {
                    var hotelID = _ref2.hotelID;
                    return !R.includes(hotelID, stableHotels);
                  }, prices);
                  _context.n = 2;
                  return (0, _effects.select)(function (state) {
                    return (0, _selectors.getQuery)(state, {
                      queryID: queryID
                    }).get(_fn.QUERY_PARAMS.SELECTED_OPERATORS).toJS();
                  });
                case 2:
                  freshSelectedOperators = _context.v;
                  nextPrices = (0, _helpers.generateNextPrices)([].concat(_toConsumableArray(pricesWithoutStable), _toConsumableArray(unusedPrices), _toConsumableArray(_usedPrices)), offersHub, query.get(_fn.QUERY_PARAMS.CURRENCY), freshSelectedOperators);
                  _context.n = 3;
                  return (0, _effects.select)(_selectors2.hotelsHub);
                case 3:
                  hotelsFromStore = _context.v;
                  hotelsToStore = (0, _helpers.getHotelsEntitiesMap)(nextPrices, hotelsHub, hotelsFromStore);
                  offersToStore = (0, _helpers.getOffersEntitiesMap)(nextPrices, offersHub);
                  _t = !R.isEmpty(hotelsToStore);
                  if (!_t) {
                    _context.n = 4;
                    break;
                  }
                  _context.n = 4;
                  return (0, _effects.put)(_actions2.hotelsActions.addHotels(hotelsToStore));
                case 4:
                  _t2 = !R.isEmpty(offersToStore);
                  if (!_t2) {
                    _context.n = 5;
                    break;
                  }
                  _context.n = 5;
                  return (0, _effects.put)(_actions3.offersActions.addOffers(offersToStore));
                case 5:
                  memory.setUsedPrices(nextPrices);
                  memory.setUnusedPrices((0, _helpers.getUnusedPrices)(nextPrices, [].concat(_toConsumableArray(pricesWithoutStable), _toConsumableArray(unusedPrices))));
                  _memory$getValues3 = memory.getValues(), usedPrices = _memory$getValues3.usedPrices, totalValue = _memory$getValues3.total;
                  _context.n = 6;
                  return (0, _effects.put)(_actions.searchActions.processSearch(queryID, {
                    page: activePage,
                    operators: operators,
                    country: country,
                    total: totalValue,
                    meta: meta,
                    prices: R.clone(usedPrices)
                  }));
                case 6:
                  if (!finished) {
                    _context.n = 7;
                    break;
                  }
                  return _context.a(2, 1);
                case 7:
                  _context.n = 8;
                  return (0, _effects.delay)(5000);
                case 8:
                  ignoreOperators = (0, _helpers.getIgnoreOperators)(operators);
                  !R.isEmpty(ignoreOperators) && (0, _helpers.addIgnoreOperators)(otpsukQuery, ignoreOperators);
                  otpsukQuery.number += 1;
                case 9:
                  return _context.a(2);
              }
            }, _loop);
          });
        case 6:
          return _context2.d(_regeneratorValues(_loop()), 7);
        case 7:
          if (!_context2.v) {
            _context2.n = 8;
            break;
          }
          return _context2.a(3, 9);
        case 8:
          if (otpsukQuery.number <= _constants.GUARANTEED_RESULT_STEP) {
            _context2.n = 6;
            break;
          }
        case 9:
          _memory$getValues = memory.getValues(), total = _memory$getValues.total;
          _context2.n = 10;
          return (0, _effects.put)(_actions.searchActions.finishSearch(queryID, {
            total: total
          }));
        case 10:
          _context2.n = 13;
          break;
        case 11:
          _context2.p = 11;
          _t3 = _context2.v;
          _context2.n = 12;
          return (0, _effects.put)(_actions.searchActions.failSearch(queryID, _t3, {
            message: _t3.message,
            statusCode: parseInt(_t3.message, 10) || ((_error$response = _t3.response) === null || _error$response === void 0 ? void 0 : _error$response.statusCode) || 500
          }));
        case 12:
          console.log(_t3);
        case 13:
          _context2.p = 13;
          _context2.n = 14;
          return (0, _effects.cancelled)();
        case 14:
          if (!_context2.v) {
            _context2.n = 15;
            break;
          }
          _context2.n = 15;
          return (0, _effects.put)(_actions.searchActions.resetSearch(queryID));
        case 15:
          _memory$getValues4 = memory.getValues(), usedPrices = _memory$getValues4.usedPrices;
          memory.addStablePrices(usedPrices);
          memory.addStableHotels((0, _helpers.getHotelsIDsFromPrices)(usedPrices));
          memory.clearUsedPrices();
          return _context2.f(13);
        case 16:
          return _context2.a(2);
      }
    }, _callee, null, [[5, 11, 13, 16]]);
  })();
}