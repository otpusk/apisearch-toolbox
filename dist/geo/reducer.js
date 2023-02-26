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
  statuses: (0, _immutable.Map)(),
  flightPorts: {}
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
      key = _ref3$payload.key,
      departures = _ref3$payload.departures;
  return state.setIn(['departures', key], (0, _immutable.List)(departures));
}), _defineProperty(_handleActions, _actions.geoActions.getCitiesSuccess, function (state, _ref4) {
  var _ref4$payload = _ref4.payload,
      countryId = _ref4$payload.countryId,
      cities = _ref4$payload.cities;
  return state.setIn(['cities', countryId], (0, _immutable.List)(cities));
}), _defineProperty(_handleActions, _actions.geoActions.getHotelsSuccess, function (state, _ref5) {
  var _ref5$payload = _ref5.payload,
      hotels = _ref5$payload.hotels,
      key = _ref5$payload.key;
  return state.setIn(['hotels', key], (0, _immutable.List)(hotels));
}), _defineProperty(_handleActions, _actions.geoActions.removeHotels, function (state, _ref6) {
  var key = _ref6.payload;
  return state.removeIn(['hotels', key]);
}), _defineProperty(_handleActions, _actions.geoActions.getOperatorsSuccess, function (state, _ref7) {
  var _ref7$payload = _ref7.payload,
      key = _ref7$payload.key,
      operators = _ref7$payload.operators;
  return state.setIn(['operators', key], operators);
}), _defineProperty(_handleActions, _actions.geoActions.getGeoTreeSuccess, function (state, _ref8) {
  var geoTree = _ref8.payload.geoTree;
  return state.set('geoTree', geoTree);
}), _defineProperty(_handleActions, _actions.geoActions.getLocationDataSuccess, function (state, _ref9) {
  var _ref9$payload = _ref9.payload,
      id = _ref9$payload.id,
      data = _ref9$payload.data;
  return state.setIn(['locations', id], data);
}), _defineProperty(_handleActions, _actions.geoActions.getFlightPortSuccess, function (state, _ref10) {
  var payload = _ref10.payload;
  var key = payload.key,
      port = payload.port;
  return state.setIn(['flightPorts', key], port);
}), _handleActions), initalState);
exports.geoReducer = geoReducer;