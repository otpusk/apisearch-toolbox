"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSearchCategoriesWorker = getSearchCategoriesWorker;
exports.getSearchOperatorsWorker = getSearchOperatorsWorker;
exports.getSearchPricesWorker = getSearchPricesWorker;
exports.getSearchTransportsWorker = getSearchTransportsWorker;
var _effects = require("redux-saga/effects");
var _excursionApi = require("@otpusk/excursion-api");
var _selectors = require("../../../auth/selectors");
var _actions = require("../../actions");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
var _marked = /*#__PURE__*/_regenerator().m(getSearchOperatorsWorker),
  _marked2 = /*#__PURE__*/_regenerator().m(getSearchTransportsWorker),
  _marked3 = /*#__PURE__*/_regenerator().m(getSearchCategoriesWorker),
  _marked4 = /*#__PURE__*/_regenerator().m(getSearchPricesWorker);
function getSearchOperatorsWorker() {
  var langAsQuery, operators, _t;
  return _regenerator().w(function (_context) {
    while (1) switch (_context.p = _context.n) {
      case 0:
        _context.p = 0;
        _context.n = 1;
        return (0, _effects.select)(_selectors.getLansAsQuery);
      case 1:
        langAsQuery = _context.v;
        _context.n = 2;
        return (0, _effects.call)(_excursionApi.getFilterOperators, langAsQuery);
      case 2:
        operators = _context.v;
        _context.n = 3;
        return (0, _effects.put)(_actions.actions.getSearchOperatorsSuccess(0, operators));
      case 3:
        _context.n = 5;
        break;
      case 4:
        _context.p = 4;
        _t = _context.v;
        _context.n = 5;
        return (0, _effects.put)(_actions.actions.getSearchOperatorsFail(_t));
      case 5:
        return _context.a(2);
    }
  }, _marked, null, [[0, 4]]);
}
function getSearchTransportsWorker() {
  var langAsQuery, transports, _t2;
  return _regenerator().w(function (_context2) {
    while (1) switch (_context2.p = _context2.n) {
      case 0:
        _context2.p = 0;
        _context2.n = 1;
        return (0, _effects.select)(_selectors.getLansAsQuery);
      case 1:
        langAsQuery = _context2.v;
        _context2.n = 2;
        return (0, _effects.call)(_excursionApi.getFilterTransport, langAsQuery);
      case 2:
        transports = _context2.v;
        _context2.n = 3;
        return (0, _effects.put)(_actions.actions.getSearchTransportsSuccess(0, transports));
      case 3:
        _context2.n = 5;
        break;
      case 4:
        _context2.p = 4;
        _t2 = _context2.v;
        _context2.n = 5;
        return (0, _effects.put)(_actions.actions.getSearchTransportsFail(_t2));
      case 5:
        return _context2.a(2);
    }
  }, _marked2, null, [[0, 4]]);
}
function getSearchCategoriesWorker() {
  var langAsQuery, categories, _t3;
  return _regenerator().w(function (_context3) {
    while (1) switch (_context3.p = _context3.n) {
      case 0:
        _context3.p = 0;
        _context3.n = 1;
        return (0, _effects.select)(_selectors.getLansAsQuery);
      case 1:
        langAsQuery = _context3.v;
        _context3.n = 2;
        return (0, _effects.call)(_excursionApi.getFilterCategories, langAsQuery);
      case 2:
        categories = _context3.v;
        _context3.n = 3;
        return (0, _effects.put)(_actions.actions.getSearchCategoriesSuccess(0, categories));
      case 3:
        _context3.n = 5;
        break;
      case 4:
        _context3.p = 4;
        _t3 = _context3.v;
        _context3.n = 5;
        return (0, _effects.put)(_actions.actions.getSearchCategoriesFail(_t3));
      case 5:
        return _context3.a(2);
    }
  }, _marked3, null, [[0, 4]]);
}
function getSearchPricesWorker() {
  var langAsQuery, prices, _t4;
  return _regenerator().w(function (_context4) {
    while (1) switch (_context4.p = _context4.n) {
      case 0:
        _context4.p = 0;
        _context4.n = 1;
        return (0, _effects.select)(_selectors.getLansAsQuery);
      case 1:
        langAsQuery = _context4.v;
        _context4.n = 2;
        return (0, _effects.call)(_excursionApi.getFilterPrice, langAsQuery);
      case 2:
        prices = _context4.v;
        _context4.n = 3;
        return (0, _effects.put)(_actions.actions.getSearchPricesSuccess(0, prices));
      case 3:
        _context4.n = 5;
        break;
      case 4:
        _context4.p = 4;
        _t4 = _context4.v;
        _context4.n = 5;
        return (0, _effects.put)(_actions.actions.getSearchPricesFail(_t4));
      case 5:
        return _context4.a(2);
    }
  }, _marked4, null, [[0, 4]]);
}