"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRatesByDate = exports.getRates = void 0;
var _reselect = require("reselect");
var R = _interopRequireWildcard(require("ramda"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const domain = _ => _.operators;
const getDate = (_, _ref) => {
  let {
    date
  } = _ref;
  return date;
};
const getKey = (_, _ref2) => {
  let {
    key
  } = _ref2;
  return key;
};
const getRates = () => (0, _reselect.createSelector)(domain, getKey, (operators, key) => operators.getIn(['rates', key]));
exports.getRates = getRates;
const getRatesByDate = () => (0, _reselect.createSelector)(getRates(), getDate, (rates, date) => R.prop(date, rates));
exports.getRatesByDate = getRatesByDate;