"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.geoReducer = void 0;

var _immutable = require("immutable");

var _reduxActions = require("redux-actions");

var _actions = require("./actions");

var _handleActions;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initalState = (0, _immutable.Map)({
  countries: (0, _immutable.List)(),
  suggestions: (0, _immutable.Map)(),
  departures: (0, _immutable.Map)(),
  cities: (0, _immutable.Map)(),
  hotels: (0, _immutable.Map)(),
  operators: (0, _immutable.Map)(),
  statuses: (0, _immutable.Map)()
});
var geoReducer = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, _actions.geoActions.getSuggestsSuccess, function (state, _ref) {
  var _ref$payload = _ref.payload,
      key = _ref$payload.key,
      suggestions = _ref$payload.suggestions;
  return state.setIn(['suggestions', key], (0, _immutable.Map)(suggestions));
}), _defineProperty(_handleActions, _actions.geoActions.getCountriesSuccess, function (state, _ref2) {
  var countries = _ref2.payload;
  return state.set('countries', (0, _immutable.List)(countries)).setIn(['statuses', 'countries'], 'loaded');
}), _defineProperty(_handleActions, _actions.geoActions.getCountriesFail, function (state) {
  return state.setIn(['statuses', 'countries'], 'failed');
}), _defineProperty(_handleActions, _actions.geoActions.getDepartureCitiesSuccess, function (state, _ref3) {
  var _ref3$payload = _ref3.payload,
      countryId = _ref3$payload.countryId,
      departures = _ref3$payload.departures;
  return state.setIn(['departures', countryId], (0, _immutable.List)(departures));
}), _defineProperty(_handleActions, _actions.geoActions.getCitiesSuccess, function (state, _ref4) {
  var _ref4$payload = _ref4.payload,
      countryId = _ref4$payload.countryId,
      cities = _ref4$payload.cities;
  return state.setIn(['cities', countryId], (0, _immutable.List)(cities));
}), _defineProperty(_handleActions, _actions.geoActions.getHotelsSuccess, function (state, _ref5) {
  var _ref5$payload = _ref5.payload,
      countryId = _ref5$payload.countryId,
      hotels = _ref5$payload.hotels;
  return state.setIn(['hotels', countryId], (0, _immutable.List)(hotels));
}), _defineProperty(_handleActions, _actions.geoActions.getOperatorsSuccess, function (state, _ref6) {
  var _ref6$payload = _ref6.payload,
      countryId = _ref6$payload.countryId,
      operators = _ref6$payload.operators;
  return state.setIn(['operators', countryId], operators);
}), _handleActions), initalState);
exports.geoReducer = geoReducer;