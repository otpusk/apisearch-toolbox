"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAvailabilitiesByCountry = void 0;
var R = _interopRequireWildcard(require("ramda"));
var _fn = require("./fn");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var getAvailabilitiesByCountry = exports.getAvailabilitiesByCountry = function getAvailabilitiesByCountry(countryID) {
  return R.call(R.cond([[function (id) {
    return R.includes(id, ['43', '115']);
  }, R.always(_defineProperty(_defineProperty({}, _fn.QUERY_PARAMS.HOTEL_AVAILABILITY, ['yes', 'request']), _fn.QUERY_PARAMS.FLIGHT_AVAILABILITY, ['yes']))], [function (id) {
    return R.includes(id, ['92', '13', '114', '135', '10', '134', '34', '54', '79', '42', '33', '152']);
  }, R.always(_defineProperty(_defineProperty({}, _fn.QUERY_PARAMS.HOTEL_AVAILABILITY, ['yes', 'request']), _fn.QUERY_PARAMS.FLIGHT_AVAILABILITY, ['yes']))], [R.T, R.always(_defineProperty(_defineProperty({}, _fn.QUERY_PARAMS.HOTEL_AVAILABILITY, ['yes', 'request']), _fn.QUERY_PARAMS.FLIGHT_AVAILABILITY, ['yes', 'request']))]]), countryID);
};