"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = void 0;
var _immutable = require("immutable");
var _reduxActions = require("redux-actions");
var _actions = require("./actions");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // Core
// Instruments
var initialState = (0, _immutable.Map)({
  store: {}
});
var reducer = exports.reducer = (0, _reduxActions.handleActions)(_defineProperty({}, _actions.actions.getTourSuccess, function (state, _ref) {
  var _ref$payload = _ref.payload,
    tourId = _ref$payload.tourId,
    tour = _ref$payload.tour;
  return state.setIn(['store', tourId], tour);
}), initialState);