"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRatesByDate = exports.getRates = void 0;
var _reselect = require("reselect");
var R = _interopRequireWildcard(require("ramda"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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