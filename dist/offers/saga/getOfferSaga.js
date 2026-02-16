"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bootstrapOfferSaga = bootstrapOfferSaga;
exports.getOfferSaga = getOfferSaga;
var _effects = require("redux-saga/effects");
var _jsonApi = require("@otpusk/json-api");
var _selectors = require("../../auth/selectors");
var _actions = require("../actions");
var _constants = require("../constants");
var _helpers = require("../helpers");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function getOfferSaga(offerID) {
  var fresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var currency = arguments.length > 2 ? arguments[2] : undefined;
  var withShortCode = arguments.length > 3 ? arguments[3] : undefined;
  var customLang = arguments.length > 4 ? arguments[4] : undefined;
  return /*#__PURE__*/_regenerator().m(function _callee() {
    var lang, token, offer;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.n = 1;
          return (0, _effects.select)(_selectors.getLang);
        case 1:
          lang = _context.v;
          _context.n = 2;
          return (0, _effects.select)(_selectors.getToken);
        case 2:
          token = _context.v;
          _context.n = 3;
          return (0, _effects.call)(_jsonApi.getToursOffer, token, offerID, fresh, currency, customLang || lang, withShortCode);
        case 3:
          offer = _context.v;
          if (!offer.error) {
            _context.n = 4;
            break;
          }
          throw new Error(offer.error);
        case 4:
          return _context.a(2, offer);
      }
    }, _callee);
  })();
}
function bootstrapOfferSaga(_ref) {
  var _ref$payload = _ref.payload,
    offerId = _ref$payload.offerId,
    fresh = _ref$payload.fresh,
    currency = _ref$payload.currency,
    withShortCode = _ref$payload.withShortCode,
    customLang = _ref$payload.customLang;
  return /*#__PURE__*/_regenerator().m(function _callee2() {
    var _ref2, id, offer, _t;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _ref2 = (0, _helpers.isOfferKey)(offerId) ? (0, _helpers.extractDataFromOfferKey)(offerId) : {
            id: offerId
          }, id = _ref2.id;
          _context2.n = 1;
          return (0, _effects.put)(_actions.offersActions.setOfferStatus(offerId, 'pending'));
        case 1:
          _context2.p = 1;
          _context2.n = 2;
          return (0, _effects.call)(getOfferSaga, id, fresh, currency, withShortCode, customLang);
        case 2:
          offer = _context2.v;
          _context2.n = 3;
          return (0, _effects.put)(_actions.offersActions.setOffer(offerId, offer));
        case 3:
          _context2.n = 4;
          return (0, _effects.put)(_actions.offersActions.setOfferStatus(offerId, _constants.ALIVE_OFFER_STATUS));
        case 4:
          _context2.n = 5;
          return (0, _effects.put)(_actions.offersActions.getOfferSuccess(offerId));
        case 5:
          _context2.n = 8;
          break;
        case 6:
          _context2.p = 6;
          _t = _context2.v;
          _context2.n = 7;
          return (0, _effects.put)(_actions.offersActions.setOfferStatus(offerId, _constants.EXPIRED_OFFER_STATUS));
        case 7:
          _context2.n = 8;
          return (0, _effects.put)(_actions.offersActions.getOfferFail(_t, offerId));
        case 8:
          return _context2.a(2);
      }
    }, _callee2, null, [[1, 6]]);
  })();
}