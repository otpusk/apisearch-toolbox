"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.geoReducer = void 0;
var _immutable = require("immutable");
var _reduxActions = require("redux-actions");
var _ramda = require("ramda");
var _actions = require("./actions");
var _handleActions;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // Core
// Instruments
var initalState = (0, _immutable.Map)({
  countries: (0, _immutable.List)(),
  suggestions: {},
  suggestEntities: {
    country: {},
    city: {},
    hotel: {}
  },
  departures: (0, _immutable.Map)(),
  cities: (0, _immutable.Map)(),
  hotels: (0, _immutable.Map)(),
  operators: (0, _immutable.Map)(),
  geoTree: {},
  statuses: (0, _immutable.Map)(),
  flightPorts: {}
});
var geoReducer = exports.geoReducer = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_handleActions, _actions.geoActions.getSuggestsSuccess, function (state, _ref) {
  var _ref$payload = _ref.payload,
    key = _ref$payload.key,
    suggestions = _ref$payload.suggestions;
  var _suggestions$country = suggestions.country,
    country = _suggestions$country === void 0 ? [] : _suggestions$country,
    _suggestions$city = suggestions.city,
    city = _suggestions$city === void 0 ? [] : _suggestions$city,
    _suggestions$hotel = suggestions.hotel,
    hotel = _suggestions$hotel === void 0 ? [] : _suggestions$hotel;
  var toById = (0, _ramda.indexBy)((0, _ramda.prop)('id'));
  return state.setIn(['suggestions', key], {
    country: (0, _ramda.pluck)('id', country),
    city: (0, _ramda.pluck)('id', city),
    hotel: (0, _ramda.pluck)('id', hotel)
  }).updateIn(['suggestEntities', 'country'], function (existing) {
    return _objectSpread(_objectSpread({}, existing), toById(country));
  }).updateIn(['suggestEntities', 'city'], function (existing) {
    return _objectSpread(_objectSpread({}, existing), toById(city));
  }).updateIn(['suggestEntities', 'hotel'], function (existing) {
    return _objectSpread(_objectSpread({}, existing), toById(hotel));
  });
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
  var _ref8$payload = _ref8.payload,
    countryId = _ref8$payload.countryId,
    geoTree = _ref8$payload.geoTree;
  return state.setIn(['geoTree', countryId], geoTree);
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