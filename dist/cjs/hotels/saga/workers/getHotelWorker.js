"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHotelWorker = getHotelWorker;
var _effects = require("redux-saga/effects");
var _jsonApi = require("@otpusk/json-api");
var R = _interopRequireWildcard(require("ramda"));
var _actions = require("../../actions");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function getHotelWorker(_ref) {
  let {
    payload: hotelId
  } = _ref;
  return function* () {
    try {
      const {
        token,
        lang
      } = yield (0, _effects.select)(_ref2 => {
        let {
          auth
        } = _ref2;
        return {
          token: auth.getIn(['otpusk', 'token']),
          lang: auth.getIn(['otpusk', 'lang'], 'ru')
        };
      });
      const {
        hotel
      } = yield (0, _effects.call)(_jsonApi.getToursHotel, R.mergeAll([token, {
        data: 'extlinks'
      }]), hotelId, lang);
      yield (0, _effects.put)(_actions.hotelsActions.getHotelSuccess(hotel));
    } catch (error) {
      yield (0, _effects.put)(_actions.hotelsActions.getHotelFail(error));
    }
  }();
}