"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectHotelsByCountry = exports.selectCitiesByCountry = exports.selectCountries = exports.getDepartureByIATA = exports.departures = void 0;

var _reselect = require("reselect");

var _immutable = require("immutable");

var R = _interopRequireWildcard(require("ramda"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Core
// defaults
var emptyList = (0, _immutable.List)();

var domain = function domain(_) {
  return _.geo;
};

var departureGeoID = function departureGeoID(_, _ref) {
  var geoID = _ref.geoID;
  return geoID;
};

var getIATA = function getIATA(_, _ref2) {
  var iata = _ref2.iata;
  return iata;
};

var departureHUB = (0, _reselect.createSelector)(domain, function (geo) {
  return geo.get('departures');
});

var departures = function departures() {
  return (0, _reselect.createSelector)(departureHUB, departureGeoID, function (map, geoID) {
    return map.get(geoID, emptyList).toArray();
  });
};

exports.departures = departures;

var getDepartureByIATA = function getDepartureByIATA() {
  return (0, _reselect.createSelector)(departures, getIATA, function (list, code) {
    return R.find(R.pipe(R.prop('iata'), R.equals(code)), list);
  });
};
/**
 * Select countries from locations store
 */


exports.getDepartureByIATA = getDepartureByIATA;
var selectCountries = (0, _reselect.createSelector)(function (state) {
  return state.getIn(['keys', 'countries'], (0, _immutable.List)());
}, function (state) {
  return state.get('locations');
}, function (keys, locations) {
  return locations.filter(function (location, id) {
    return keys.includes(id);
  });
});
/**
 * Select cities by country
 */

exports.selectCountries = selectCountries;
var selectCitiesByCountry = (0, _reselect.createSelector)(function (state, country) {
  return state.getIn(['keys', 'cities', _immutable.Map.isMap(country) ? country.get('id') : country], (0, _immutable.List)());
}, function (state) {
  return state.getIn(['locations', 'cities']);
}, function (keys, locations) {
  return locations.filter(function (location, id) {
    return keys.includes(id);
  });
});
/**
 * Selecte hotels by country
 */

exports.selectCitiesByCountry = selectCitiesByCountry;
var selectHotelsByCountry = (0, _reselect.createSelector)(function (state, country) {
  return state.getIn(['keys', 'hotels', _immutable.Map.isMap(country) ? country.get('id') : country], (0, _immutable.List)());
}, function (state) {
  return state.getIn(['locations', 'hotels']);
}, function (keys, locations) {
  return locations.filter(function (location, id) {
    return keys.includes(id);
  });
});
exports.selectHotelsByCountry = selectHotelsByCountry;