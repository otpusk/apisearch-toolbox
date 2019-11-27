"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.excursionsReducer = void 0;

var _immutable = require("immutable");

var _reduxActions = require("redux-actions");

var _actions = require("./actions");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = (0, _immutable.Map)();
var excursionsReducer = (0, _reduxActions.handleActions)(_defineProperty({}, _actions.excursionsActions.getExcursionSuccess, function (state, _ref) {
  var _ref$payload = _ref.payload,
      excursion = _ref$payload.excursion,
      excursionData = _ref$payload.excursionData;
  return state.set(excursion, excursionData);
}), initialState);
exports.excursionsReducer = excursionsReducer;