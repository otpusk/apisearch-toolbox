"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.geoActions = void 0;

var _reduxActions = require("redux-actions");

// Core
var geoActions = (0, _reduxActions.createActions)({
  GET_SUGGESTS: function GET_SUGGESTS() {
    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return key;
  },
  GET_SUGGESTS_SUCCESS: function GET_SUGGESTS_SUCCESS(key, suggestions) {
    return {
      key: key,
      suggestions: suggestions
    };
  },
  GET_SUGGESTS_FAIL: function GET_SUGGESTS_FAIL(error) {
    return error;
  },
  GET_DEPARTURE_CITIES: function GET_DEPARTURE_CITIES(countryId) {
    return countryId;
  },
  GET_DEPARTURE_CITIES_SUCCESS: function GET_DEPARTURE_CITIES_SUCCESS(countryId, departures) {
    return {
      countryId: countryId,
      departures: departures
    };
  },
  GET_DEPARTURE_CITIES_FAIL: function GET_DEPARTURE_CITIES_FAIL(error) {
    return error;
  },
  GET_COUNTRIES: function GET_COUNTRIES(options) {
    return options;
  },
  GET_COUNTRIES_SUCCESS: function GET_COUNTRIES_SUCCESS(countries) {
    return countries;
  },
  GET_COUNTRIES_FAIL: function GET_COUNTRIES_FAIL(error) {
    return error;
  },
  GET_CITIES: function GET_CITIES(countryId, options) {
    return {
      countryId: countryId,
      options: options
    };
  },
  GET_CITIES_SUCCESS: function GET_CITIES_SUCCESS(countryId, cities) {
    return {
      countryId: countryId,
      cities: cities
    };
  },
  GET_CITIES_FAIL: function GET_CITIES_FAIL(error) {
    return error;
  },
  GET_HOTELS: function GET_HOTELS(countryId) {
    return countryId;
  },
  GET_HOTELS_SUCCESS: function GET_HOTELS_SUCCESS(countryId, hotels) {
    return {
      countryId: countryId,
      hotels: hotels
    };
  },
  GET_HOTELS_FAIL: function GET_HOTELS_FAIL(error) {
    return error;
  },
  GET_OPERATORS: function GET_OPERATORS(countryId) {
    return countryId;
  },
  GET_OPERATORS_SUCCESS: function GET_OPERATORS_SUCCESS(countryId, operators) {
    return {
      countryId: countryId,
      operators: operators
    };
  },
  GET_OPERATORS_FAIL: function GET_OPERATORS_FAIL(error) {
    return error;
  }
});
exports.geoActions = geoActions;