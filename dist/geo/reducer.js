"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.geoReducer = void 0;
var _immutable = require("immutable");
var _reduxActions = require("redux-actions");
var _actions = require("./actions");
var _handleActions;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // Core
// Instruments
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
var geoReducer = exports.geoReducer = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_handleActions, _actions.geoActions.getSuggestsSuccess, function (state, _ref) {
  var _ref$payload = _ref.payload,
    key = _ref$payload.key,
    suggestions = _ref$payload.suggestions;
  return state.setIn(['suggestions', key], (0, _immutable.Map)(suggestions));
}), _actions.geoActions.getCountriesSuccess, function (state, _ref2) {
  var countries = _ref2.payload;
  return state.set('countries', (0, _immutable.List)(countries)).setIn(['statuses', 'countries'], 'loaded');
}), _actions.geoActions.getCountriesFail, function (state) {
  return state.setIn(['statuses', 'countries'], 'failed');
}), _actions.geoActions.getDepartureCitiesSuccess, function (state, _ref3) {
  var _ref3$payload = _ref3.payload,
    key = _ref3$payload.key,
    departures = _ref3$payload.departures;
  return state.setIn(['departures', key], (0, _immutable.List)(departures));
}), _actions.geoActions.getCitiesSuccess, function (state, _ref4) {
  var _ref4$payload = _ref4.payload,
    countryId = _ref4$payload.countryId,
    cities = _ref4$payload.cities;
  return state.setIn(['cities', countryId], (0, _immutable.List)(cities));
}), _actions.geoActions.getHotelsSuccess, function (state, _ref5) {
  var _ref5$payload = _ref5.payload,
    hotels = _ref5$payload.hotels,
    key = _ref5$payload.key;
  return state.setIn(['hotels', key], (0, _immutable.List)(hotels));
}), _actions.geoActions.removeHotels, function (state, _ref6) {
  var key = _ref6.payload;
  return state.removeIn(['hotels', key]);
}), _actions.geoActions.getOperatorsSuccess, function (state, _ref7) {
  var _ref7$payload = _ref7.payload,
    key = _ref7$payload.key,
    operators = _ref7$payload.operators;
  return state.setIn(['operators', key], operators);
}), _actions.geoActions.getGeoTreeSuccess, function (state, _ref8) {
  var geoTree = _ref8.payload.geoTree;
  return state.set('geoTree', geoTree);
}), _actions.geoActions.getLocationDataSuccess, function (state, _ref9) {
  var _ref9$payload = _ref9.payload,
    id = _ref9$payload.id,
    data = _ref9$payload.data;
  return state.setIn(['locations', id], data);
}), _defineProperty(_handleActions, _actions.geoActions.getFlightPortSuccess, function (state, _ref10) {
  var payload = _ref10.payload;
  var key = payload.key,
    port = payload.port;
  return state.setIn(['flightPorts', key], port);
})), initalState);