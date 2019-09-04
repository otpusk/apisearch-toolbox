"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = void 0;

var _immutable = require("immutable");

var _reduxActions = require("redux-actions");

var _actions = require("./actions");

var _handleActions;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = (0, _immutable.Map)({
  suggests: (0, _immutable.Map)(),
  departures: (0, _immutable.Map)()
});
var reducer = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, _actions.actions.getSuggestsSuccess, function (state, _ref) {
  var _ref$payload = _ref.payload,
      key = _ref$payload.key,
      suggestions = _ref$payload.suggestions;
  return state.setIn(['suggests', key], suggestions);
}), _defineProperty(_handleActions, _actions.actions.getDepartureCitiesSuccess, function (state, _ref2) {
  var _ref2$payload = _ref2.payload,
      countryId = _ref2$payload.countryId,
      cities = _ref2$payload.cities;
  return state.setIn(['departures', countryId], cities);
}), _handleActions), initialState);
exports.reducer = reducer;