"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchReducer = void 0;
var _immutable = require("immutable");
var _reduxActions = require("redux-actions");
var R = _interopRequireWildcard(require("ramda"));
var _actions = require("./actions");
var _fn = require("../queries/fn");
var _handleActions;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var initialState = (0, _immutable.Map)({
  results: (0, _immutable.Map)(),
  charts: (0, _immutable.Map)(),
  availableDates: {}
});
var searchReducer = exports.searchReducer = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_handleActions, _actions.searchActions.resetSearch, function (state, _ref) {
  var queryId = _ref.payload;
  return state.setIn(['results', queryId], (0, _fn.createResultBones)()).removeIn(['charts', queryId]);
}), _actions.searchActions.startSearch, function (state, _ref2) {
  var queryId = _ref2.payload;
  return state.setIn(['results', queryId, 'operators'], {}).setIn(['results', queryId, 'status'], 'starting').removeIn(['charts', queryId]);
}), _actions.searchActions.processSearch, function (state, _ref3) {
  var _ref3$payload = _ref3.payload,
    operators = _ref3$payload.operators,
    queryId = _ref3$payload.queryId,
    country = _ref3$payload.country,
    total = _ref3$payload.total,
    page = _ref3$payload.page,
    prices = _ref3$payload.prices,
    meta = _ref3$payload.meta;
  return state.mergeDeepIn(['results', queryId], (0, _immutable.Map)({
    total: total ? total : state.getIn(['results', queryId, 'total']),
    meta: meta ? meta : state.getIn(['results', queryId, 'meta'])
  })).updateIn(['results', queryId, 'country'], function (value) {
    return value ? value : country;
  }).updateIn(['results', queryId, 'operators'], function () {
    var prevOperators = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return R.mergeAll([prevOperators, operators]);
  }).updateIn(['results', queryId, 'prices'], function () {
    var prevPrices = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return R.call(R.pipe(R.clone, function (items) {
      items[R.dec(page)] = prices;
      return items;
    }), prevPrices);
  });
}), _actions.searchActions.finishSearch, function (state, _ref4) {
  var _ref4$payload = _ref4.payload,
    queryId = _ref4$payload.queryId,
    total = _ref4$payload.total;
  return state.setIn(['results', queryId, 'status'], 'done').setIn(['results', queryId, 'total'], total);
}), _actions.searchActions.patchSearch, function (state, _ref5) {
  var _ref5$payload = _ref5.payload,
    queryId = _ref5$payload.queryId,
    key = _ref5$payload.key,
    patch = _ref5$payload.patch;
  return state.setIn(['results', queryId, key], patch);
}), _actions.searchActions.failSearch, function (state, _ref6) {
  var queryId = _ref6.payload;
  return state.setIn(['results', queryId, 'status'], 'failed');
}), _actions.searchActions.clearSearch, function (state, _ref7) {
  var queryId = _ref7.payload;
  return state.removeIn(['results', queryId]).removeIn(['charts', queryId]);
}), _actions.searchActions.setFailSearchError, function (state, _ref8) {
  var _ref8$payload = _ref8.payload,
    queryId = _ref8$payload.queryId,
    error = _ref8$payload.error;
  return state.setIn(['results', queryId, 'error'], error);
}), _actions.searchActions.setSearchStatus, function (state, _ref9) {
  var _ref9$payload = _ref9.payload,
    queryID = _ref9$payload.queryID,
    status = _ref9$payload.status;
  return state.setIn(['results', queryID, 'status'], status);
}), _actions.searchActions.getPriceChartSuccess, function (state, _ref0) {
  var _ref0$payload = _ref0.payload,
    queryId = _ref0$payload.queryId,
    chart = _ref0$payload.chart;
  return state.setIn(['charts', queryId], chart);
}), _defineProperty(_handleActions, _actions.searchActions.getAvailableDatesSuccess, function (state, _ref1) {
  var payload = _ref1.payload;
  var key = payload.key,
    dates = payload.dates;
  return state.setIn(['availableDates', key], dates);
})), initialState);