"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateOperatorKey = exports.generateHotelKey = void 0;
var R = _interopRequireWildcard(require("ramda"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var isFilledRatingObject = function isFilledRatingObject(_ref) {
  var from = _ref.from,
    to = _ref.to;
  return from && to;
};
var generateHotelKey = exports.generateHotelKey = function generateHotelKey(countryID, rating, services) {
  return R.join('-', R.filter(Boolean, [countryID, services && R.join('|', services), rating && isFilledRatingObject(rating) && "".concat(rating.from, "-").concat(rating.to)]));
};
var generateOperatorKey = exports.generateOperatorKey = function generateOperatorKey(countryID, departureID) {
  return R.join('-', R.filter(Number.isFinite, [Number(countryID), Number(departureID)]));
};