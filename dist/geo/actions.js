"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.geoActions = void 0;

var _reduxActions = require("redux-actions");

/* eslint-disable max-params */
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
  GET_DEPARTURE_CITIES: function GET_DEPARTURE_CITIES(geoID) {
    return geoID;
  },
  GET_DEPARTURE_CITIES_SUCCESS: function GET_DEPARTURE_CITIES_SUCCESS(key, departures) {
    return {
      key: key,
      departures: departures
    };
  },
  GET_DEPARTURE_CITIES_FAIL: function GET_DEPARTURE_CITIES_FAIL(error) {
    return error;
  },
  GET_COUNTRIES: function GET_COUNTRIES(options, methodVersion) {
    return {
      options: options,
      methodVersion: methodVersion
    };
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
    var withPrice = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var services = arguments.length > 2 ? arguments[2] : undefined;
    var rating = arguments.length > 3 ? arguments[3] : undefined;
    var methodVersion = arguments.length > 4 ? arguments[4] : undefined;
    return {
      countryId: countryId,
      withPrice: withPrice,
      services: services,
      rating: rating,
      methodVersion: methodVersion
    };
  },
  GET_HOTELS_SUCCESS: function GET_HOTELS_SUCCESS(countryId, key, hotels) {
    return {
      countryId: countryId,
      key: key,
      hotels: hotels
    };
  },
  GET_HOTELS_FAIL: function GET_HOTELS_FAIL(error) {
    return error;
  },
  REMOVE_HOTELS: function REMOVE_HOTELS(key) {
    return key;
  },
  GET_OPERATORS: function GET_OPERATORS(countryId, departureID, methodVersion) {
    return {
      countryId: countryId,
      departureID: departureID,
      methodVersion: methodVersion
    };
  },
  GET_OPERATORS_SUCCESS: function GET_OPERATORS_SUCCESS(countryId, operators) {
    return {
      countryId: countryId,
      operators: operators
    };
  },
  GET_OPERATORS_FAIL: function GET_OPERATORS_FAIL(error) {
    return error;
  },
  GET_GEO_TREE: function GET_GEO_TREE() {
    return void 0;
  },
  GET_GEO_TREE_SUCCESS: function GET_GEO_TREE_SUCCESS(geoTree) {
    return {
      geoTree: geoTree
    };
  },
  GET_GEO_TREE_FAIL: function GET_GEO_TREE_FAIL(error) {
    return error;
  },
  GET_LOCATION_DATA: function GET_LOCATION_DATA(id) {
    return {
      id: id
    };
  },
  GET_LOCATION_DATA_SUCCESS: function GET_LOCATION_DATA_SUCCESS(id, data) {
    return {
      id: id,
      data: data
    };
  },
  GET_LOCATION_DATA_FAIL: function GET_LOCATION_DATA_FAIL(error) {
    return error;
  },
  GET_FLIGHT_PORT: function GET_FLIGHT_PORT(iata) {
    return iata;
  },
  GET_FLIGHT_PORT_SUCCESS: function GET_FLIGHT_PORT_SUCCESS(key, port) {
    return {
      key: key,
      port: port
    };
  },
  GET_FLIGHT_PORT_FAIL: function GET_FLIGHT_PORT_FAIL(error) {
    return error;
  }
});
exports.geoActions = geoActions;