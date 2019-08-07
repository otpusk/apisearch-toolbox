"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectHotelsByCountry = exports.selectCitiesByCountry = exports.selectCountries = void 0;

var _reselect = require("reselect");

var _immutable = require("immutable"); // Core

/**
 * Select countries from locations store
 */


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