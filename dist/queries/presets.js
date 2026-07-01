"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAvailabilitiesByCountry = void 0;
var R = _interopRequireWildcard(require("ramda"));
var _fn = require("./fn");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var getAvailabilitiesByCountry = exports.getAvailabilitiesByCountry = function getAvailabilitiesByCountry(countryID) {
  return R.call(R.cond([[function (id) {
    return R.includes(id, ['43', '115']);
  }, R.always(_defineProperty(_defineProperty({}, _fn.QUERY_PARAMS.HOTEL_AVAILABILITY, ['yes', 'request']), _fn.QUERY_PARAMS.FLIGHT_AVAILABILITY, ['yes']))], [function (id) {
    return R.includes(id, ['92', '13', '114', '135', '10', '134', '34', '54', '79', '42', '33', '152']);
  }, R.always(_defineProperty(_defineProperty({}, _fn.QUERY_PARAMS.HOTEL_AVAILABILITY, ['yes', 'request']), _fn.QUERY_PARAMS.FLIGHT_AVAILABILITY, ['yes']))], [R.T, R.always(_defineProperty(_defineProperty({}, _fn.QUERY_PARAMS.HOTEL_AVAILABILITY, ['yes', 'request']), _fn.QUERY_PARAMS.FLIGHT_AVAILABILITY, ['yes', 'request']))]]), countryID);
};