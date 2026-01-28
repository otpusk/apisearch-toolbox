"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRatesByDate = exports.getRates = void 0;
var _reselect = require("reselect");
var R = _interopRequireWildcard(require("ramda"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var domain = function domain(_) {
  return _.operators;
};
var getDate = function getDate(_, _ref) {
  var date = _ref.date;
  return date;
};
var getKey = function getKey(_, _ref2) {
  var key = _ref2.key;
  return key;
};
var getRates = exports.getRates = function getRates() {
  return (0, _reselect.createSelector)(domain, getKey, function (operators, key) {
    return operators.getIn(['rates', key]);
  });
};
var getRatesByDate = exports.getRatesByDate = function getRatesByDate() {
  return (0, _reselect.createSelector)(getRates(), getDate, function (rates, date) {
    return R.prop(date, rates);
  });
};