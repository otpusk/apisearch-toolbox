"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = void 0;
var _reduxActions = require("redux-actions");
var _immutable = require("immutable");
var _actions = require("./actions");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // Core
// Instruments
var initialState = (0, _immutable.Map)({
  statuses: {},
  queries: {},
  results: {},
  operators: {}
});
var reducer = exports.reducer = (0, _reduxActions.handleActions)(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, (0, _reduxActions.combineActions)(_actions.actions.createQuery, _actions.actions.setQuery), function (state, _ref) {
  var _ref$payload = _ref.payload,
    queryId = _ref$payload.queryId,
    query = _ref$payload.query;
  return state.setIn(['queries', queryId], query);
}), _actions.actions.runSearch, function (state, _ref2) {
  var queryId = _ref2.payload.queryId;
  return state.removeIn(['results', queryId]).setIn(['statuses', queryId], 'process');
}), _actions.actions.runNextPageSearch, function (state, _ref3) {
  var queryId = _ref3.payload.queryId;
  return state.setIn(['statuses', queryId], 'process');
}), _actions.actions.processSearch, function (state, _ref4) {
  var _ref4$payload = _ref4.payload,
    queryId = _ref4$payload.queryId,
    page = _ref4$payload.page,
    tours = _ref4$payload.tours;
  return state.setIn(['results', queryId, page], tours);
}), _actions.actions.finishSearch, function (state, _ref5) {
  var queryId = _ref5.payload;
  return state.setIn(['statuses', queryId], 'success');
}), _actions.actions.failSearch, function (state, _ref6) {
  var queryId = _ref6.payload;
  return state.setIn(['statuses', queryId], 'failed');
}), _actions.actions.getSearchCategoriesSuccess, function (state, _ref7) {
  var _ref7$payload = _ref7.payload,
    key = _ref7$payload.key,
    categories = _ref7$payload.categories;
  return state.setIn(['categories', key], categories);
}), _actions.actions.getSearchOperatorsSuccess, function (state, _ref8) {
  var _ref8$payload = _ref8.payload,
    key = _ref8$payload.key,
    operators = _ref8$payload.operators;
  return state.setIn(['operators', key], operators);
}), _actions.actions.getSearchTransportsSuccess, function (state, _ref9) {
  var _ref9$payload = _ref9.payload,
    key = _ref9$payload.key,
    transports = _ref9$payload.transports;
  return state.setIn(['transports', key], transports);
}), _actions.actions.getSearchPricesSuccess, function (state, _ref0) {
  var _ref0$payload = _ref0.payload,
    key = _ref0$payload.key,
    prices = _ref0$payload.prices;
  return state.setIn(['prices', key], prices);
}), initialState);