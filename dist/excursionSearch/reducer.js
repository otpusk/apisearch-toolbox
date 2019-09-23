"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = void 0;

var _reduxActions = require("redux-actions");

var _immutable = require("immutable");

var _actions = require("./actions");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = (0, _immutable.Map)();
var reducer = (0, _reduxActions.handleActions)(_defineProperty({}, (0, _reduxActions.combineActions)(_actions.actions.createQuery, _actions.actions.setQuery), function (state, _ref) {
  var _ref$payload = _ref.payload,
      queryId = _ref$payload.queryId,
      query = _ref$payload.query;
  return state.setIn(['queries', queryId], query);
}), initialState);
exports.reducer = reducer;