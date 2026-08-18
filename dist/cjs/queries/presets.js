"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAvailabilitiesByCountry = void 0;
var R = _interopRequireWildcard(require("ramda"));
var _fn = require("./fn");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const getAvailabilitiesByCountry = countryID => R.call(R.cond([[id => R.includes(id, ['43', '115']), R.always({
  [_fn.QUERY_PARAMS.HOTEL_AVAILABILITY]: ['yes', 'request'],
  [_fn.QUERY_PARAMS.FLIGHT_AVAILABILITY]: ['yes']
})], [id => R.includes(id, ['92', '13', '114', '135', '10', '134', '34', '54', '79', '42', '33', '152']), R.always({
  [_fn.QUERY_PARAMS.HOTEL_AVAILABILITY]: ['yes', 'request'],
  [_fn.QUERY_PARAMS.FLIGHT_AVAILABILITY]: ['yes']
})], [R.T, R.always({
  [_fn.QUERY_PARAMS.HOTEL_AVAILABILITY]: ['yes', 'request'],
  [_fn.QUERY_PARAMS.FLIGHT_AVAILABILITY]: ['yes', 'request']
})]]), countryID);
exports.getAvailabilitiesByCountry = getAvailabilitiesByCountry;