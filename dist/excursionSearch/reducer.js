"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = void 0;

var _reduxActions = require("redux-actions");

var _immutable = require("immutable");

var _actions = require("./actions");

var _handleActions;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = (0, _immutable.Map)({
  statuses: {},
  queries: {},
  results: {},
  operators: {}
});
var reducer = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, (0, _reduxActions.combineActions)(_actions.actions.createQuery, _actions.actions.setQuery), function (state, _ref) {
  var _ref$payload = _ref.payload,
      queryId = _ref$payload.queryId,
      query = _ref$payload.query;
  return state.setIn(['queries', queryId], query);
}), _defineProperty(_handleActions, _actions.actions.runSearch, function (state, _ref2) {
  var queryId = _ref2.payload;
  return state.setIn(['statuses', queryId], 'process');
}), _defineProperty(_handleActions, _actions.actions.processSearch, function (state, _ref3) {
  var _ref3$payload = _ref3.payload,
      queryId = _ref3$payload.queryId,
      tours = _ref3$payload.tours;
  return state.setIn(['results', queryId], tours);
}), _defineProperty(_handleActions, _actions.actions.finishSearch, function (state, _ref4) {
  var queryId = _ref4.payload;
  return state.setIn(['statuses', queryId], 'success');
}), _defineProperty(_handleActions, _actions.actions.failSearch, function (state, _ref5) {
  var queryId = _ref5.payload;
  return state.setIn(['statuses', queryId], 'failed');
}), _defineProperty(_handleActions, _actions.actions.getSearchCategoriesSuccess, function (state, _ref6) {
  var _ref6$payload = _ref6.payload,
      key = _ref6$payload.key,
      categories = _ref6$payload.categories;
  return state.setIn(['categories', key], categories);
}), _defineProperty(_handleActions, _actions.actions.getSearchOperatorsSuccess, function (state, _ref7) {
  var _ref7$payload = _ref7.payload,
      key = _ref7$payload.key,
      operators = _ref7$payload.operators;
  return state.setIn(['operators', key], operators);
}), _handleActions), initialState);
exports.reducer = reducer;