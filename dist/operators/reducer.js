"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.operatorsReducer = void 0;

var _reduxActions = require("redux-actions");

var _immutable = require("immutable");

var _actions = require("./actions");

var _handleActions;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var initialState = (0, _immutable.Map)({
  operators: (0, _immutable.Map)(),
  ui: (0, _immutable.Map)()
});
var operatorsReducer = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, _actions.operatorsActions.getOperatorsSuccess, function (state, _ref) {
  var payload = _ref.payload;
  var countryId = payload.countryId,
      operators = payload.operators;
  return state.setIn(['operators', countryId], operators);
}), _defineProperty(_handleActions, _actions.operatorsActions.setUiFlag, function (state, _ref2) {
  var payload = _ref2.payload;
  var path = payload.path,
      value = payload.value;
  return state.setIn(['ui'].concat(_toConsumableArray(path)), value);
}), _handleActions), initialState);
exports.operatorsReducer = operatorsReducer;