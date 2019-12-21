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
  regions: [],
  offices: {}
});
var reducer = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, _actions.actions.getOfficesSuccess, function (state, _ref) {
  var _ref$payload = _ref.payload,
      tourId = _ref$payload.tourId,
      offices = _ref$payload.offices;
  return state.setIn(['offices', tourId], offices);
}), _defineProperty(_handleActions, _actions.actions.getRegionsSuccess, function (state, _ref2) {
  var regions = _ref2.payload;
  return state.set('regions', regions);
}), _handleActions), initialState);
exports.reducer = reducer;