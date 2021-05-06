"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchReducer = void 0;

var _immutable = require("immutable");

var _reduxActions = require("redux-actions");

var _actions = require("./actions");

var _fn = require("../queries/fn");

var _handleActions;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = (0, _immutable.Map)({
  results: (0, _immutable.Map)(),
  charts: (0, _immutable.Map)(),
  dates: (0, _immutable.List)()
});
var searchReducer = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, _actions.searchActions.resetSearch, function (state, _ref) {
  var queryId = _ref.payload;
  return state.setIn(['results', queryId], (0, _fn.createResultBones)()).removeIn(['charts', queryId]);
}), _defineProperty(_handleActions, _actions.searchActions.startSearch, function (state, _ref2) {
  var queryId = _ref2.payload;
  return state.setIn(['results', queryId, 'operators'], {}).setIn(['results', queryId, 'status'], 'starting').removeIn(['charts', queryId]);
}), _defineProperty(_handleActions, _actions.searchActions.processSearch, function (state, _ref3) {
  var _ref3$payload = _ref3.payload,
      hotels = _ref3$payload.hotels,
      operators = _ref3$payload.operators,
      queryId = _ref3$payload.queryId,
      country = _ref3$payload.country,
      total = _ref3$payload.total,
      page = _ref3$payload.page,
      meta = _ref3$payload.meta;
  return state.mergeIn(['results', queryId], (0, _immutable.Map)({
    operators: operators,
    total: total ? total : state.getIn(['results', queryId, 'total']),
    status: 'processing',
    meta: meta
  })).updateIn(['results', queryId, 'country'], function (value) {
    return value ? value : country;
  }).setIn(['results', queryId, 'hotels', page], hotels);
}), _defineProperty(_handleActions, _actions.searchActions.finishSearch, function (state, _ref4) {
  var _ref4$payload = _ref4.payload,
      queryId = _ref4$payload.queryId,
      total = _ref4$payload.total;
  return state.setIn(['results', queryId, 'status'], 'done').setIn(['results', queryId, 'total'], total);
}), _defineProperty(_handleActions, _actions.searchActions.failSearch, function (state, _ref5) {
  var queryId = _ref5.payload;
  return state.setIn(['results', queryId, 'status'], 'failed');
}), _defineProperty(_handleActions, _actions.searchActions.setFailSearchError, function (state, _ref6) {
  var _ref6$payload = _ref6.payload,
      queryId = _ref6$payload.queryId,
      error = _ref6$payload.error;
  return state.setIn(['results', queryId, 'error'], error);
}), _defineProperty(_handleActions, _actions.searchActions.getPriceChartSuccess, function (state, _ref7) {
  var _ref7$payload = _ref7.payload,
      queryId = _ref7$payload.queryId,
      chart = _ref7$payload.chart;
  return state.setIn(['charts', queryId], chart);
}), _defineProperty(_handleActions, _actions.searchActions.getAvailableDatesSuccess, function (state, _ref8) {
  var dates = _ref8.payload.dates;
  return state.set('dates', dates);
}), _handleActions), initialState);
exports.searchReducer = searchReducer;