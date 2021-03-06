"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = void 0;

var _immutable = require("immutable");

var _reduxActions = require("redux-actions");

var _actions = require("./actions");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = (0, _immutable.Map)({
  store: {}
});
var reducer = (0, _reduxActions.handleActions)(_defineProperty({}, _actions.actions.getTourSuccess, function (state, _ref) {
  var _ref$payload = _ref.payload,
      tourId = _ref$payload.tourId,
      tour = _ref$payload.tour;
  return state.setIn(['store', tourId], tour);
}), initialState);
exports.reducer = reducer;