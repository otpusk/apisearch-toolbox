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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
<<<<<<< HEAD
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
=======
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
>>>>>>> task-45948
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var initialState = (0, _immutable.Map)({
  results: (0, _immutable.Map)(),
  charts: (0, _immutable.Map)(),
  availableDates: {}
});
var searchReducer = exports.searchReducer = (0, _reduxActions.handleActions)(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, _actions.searchActions.resetSearch, function (state, _ref) {
  var queryId = _ref.payload;
  return state.setIn(['results', queryId], (0, _fn.createResultBones)()).removeIn(['charts', queryId]);
}), _actions.searchActions.startSearch, function (state, _ref2) {
  var queryId = _ref2.payload;
  return state.setIn(['results', queryId, 'operators'], {}).setIn(['results', queryId, 'status'], 'starting').removeIn(['charts', queryId]);
}), _actions.searchActions.processSearch, function (state, _ref3) {
  var _ref3$payload = _ref3.payload,
    hotels = _ref3$payload.hotels,
    operators = _ref3$payload.operators,
    queryId = _ref3$payload.queryId,
    country = _ref3$payload.country,
    total = _ref3$payload.total,
    page = _ref3$payload.page,
    prices = _ref3$payload.prices,
    meta = _ref3$payload.meta;
  return state.mergeDeepIn(['results', queryId], (0, _immutable.Map)({
    total: total ? total : state.getIn(['results', queryId, 'total']),
    meta: meta
  })).updateIn(['results', queryId, 'country'], function (value) {
    return value ? value : country;
  }).setIn(['results', queryId, 'hotels', page], hotels).updateIn(['results', queryId, 'operators'], function () {
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
}), _actions.searchActions.failSearch, function (state, _ref5) {
  var queryId = _ref5.payload;
  return state.setIn(['results', queryId, 'status'], 'failed');
}), _actions.searchActions.clearSearch, function (state, _ref6) {
  var queryId = _ref6.payload;
  return state.removeIn(['results', queryId]).removeIn(['charts', queryId]);
}), _actions.searchActions.setFailSearchError, function (state, _ref7) {
  var _ref7$payload = _ref7.payload,
    queryId = _ref7$payload.queryId,
    error = _ref7$payload.error;
  return state.setIn(['results', queryId, 'error'], error);
}), _actions.searchActions.setSearchStatus, function (state, _ref8) {
  var _ref8$payload = _ref8.payload,
    queryID = _ref8$payload.queryID,
    status = _ref8$payload.status;
  return state.setIn(['results', queryID, 'status'], status);
}), _actions.searchActions.getPriceChartSuccess, function (state, _ref9) {
  var _ref9$payload = _ref9.payload,
    queryId = _ref9$payload.queryId,
    chart = _ref9$payload.chart;
  return state.setIn(['charts', queryId], chart);
}), _actions.searchActions.getAvailableDatesSuccess, function (state, _ref10) {
  var payload = _ref10.payload;
  var key = payload.key,
    dates = payload.dates;
  return state.setIn(['availableDates', key], dates);
}), initialState);