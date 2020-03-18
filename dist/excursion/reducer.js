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

var initialState = (0, _immutable.Map)();
var reducer = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, _actions.actions.getMainpageSuccess, function (state, _ref) {
  var categories = _ref.payload;
  return state.set('mainpage', categories);
}), _defineProperty(_handleActions, _actions.actions.getMainpageFail, function (state) {
  return state.set('mainpage', []);
}), _defineProperty(_handleActions, _actions.actions.getCountriesSuccess, function (state, _ref2) {
  var countries = _ref2.payload;
  return state.set('countries', countries);
}), _defineProperty(_handleActions, _actions.actions.getCountriesFail, function (state) {
  return state.set('countries', []);
}), _handleActions), initialState);
exports.reducer = reducer;