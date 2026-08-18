"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTurpravdaWidget = void 0;
var _reselect = require("reselect");
var R = _interopRequireWildcard(require("ramda"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const domain = _ => _.reviews;
const getTurpravdaWidgets = (0, _reselect.createSelector)(domain, R.prop('turpravdaWidget'));
const getTurpravdaWidget = exports.getTurpravdaWidget = (0, _reselect.createSelector)(getTurpravdaWidgets, (_, _ref) => {
  let {
    hotelID
  } = _ref;
  return hotelID;
}, (widgets, id) => widgets[id]);