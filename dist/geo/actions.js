"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.geoActions = void 0;
var _reduxActions = require("redux-actions");
/* eslint-disable max-params */

const geoActions = exports.geoActions = (0, _reduxActions.createActions)({
  GET_SUGGESTS: function () {
    let key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return key;
  },
  GET_SUGGESTS_SUCCESS: (key, suggestions) => ({
    key,
    suggestions
  }),
  GET_SUGGESTS_FAIL: error => error,
  GET_DEPARTURE_CITIES: (geoID, methodVersion) => ({
    geoID,
    methodVersion
  }),
  GET_DEPARTURE_CITIES_SUCCESS: (key, departures) => ({
    key,
    departures
  }),
  GET_DEPARTURE_CITIES_FAIL: error => error,
  GET_COUNTRIES: (options, methodVersion) => ({
    options,
    methodVersion
  }),
  GET_COUNTRIES_SUCCESS: countries => countries,
  GET_COUNTRIES_FAIL: error => error,
  GET_CITIES: (countryId, options) => ({
    countryId,
    options
  }),
  GET_CITIES_SUCCESS: (countryId, cities) => ({
    countryId,
    cities
  }),
  GET_CITIES_FAIL: error => error,
  GET_HOTELS: function (countryId) {
    let withPrice = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    let services = arguments.length > 2 ? arguments[2] : undefined;
    let rating = arguments.length > 3 ? arguments[3] : undefined;
    let methodVersion = arguments.length > 4 ? arguments[4] : undefined;
    let withServices = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
    return {
      countryId,
      withPrice,
      services,
      rating,
      methodVersion,
      withServices
    };
  },
  GET_HOTELS_SUCCESS: (countryId, key, hotels) => ({
    countryId,
    key,
    hotels
  }),
  GET_HOTELS_FAIL: error => error,
  REMOVE_HOTELS: key => key,
  GET_OPERATORS: (countryId, departureID, methodVersion) => ({
    countryId,
    departureID,
    methodVersion
  }),
  GET_OPERATORS_SUCCESS: (key, operators) => ({
    key,
    operators
  }),
  GET_OPERATORS_FAIL: error => error,
  GET_GEO_TREE: function (countryId) {
    let withPrice = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    let depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'city';
    return {
      countryId,
      withPrice,
      depth
    };
  },
  GET_GEO_TREE_SUCCESS: (countryId, geoTree) => ({
    countryId,
    geoTree
  }),
  GET_GEO_TREE_FAIL: error => error,
  GET_LOCATION_DATA: id => ({
    id
  }),
  GET_LOCATION_DATA_SUCCESS: (id, data) => ({
    id,
    data
  }),
  GET_LOCATION_DATA_FAIL: error => error,
  GET_FLIGHT_PORT: iata => iata,
  GET_FLIGHT_PORT_SUCCESS: (key, port) => ({
    key,
    port
  }),
  GET_FLIGHT_PORT_FAIL: error => error
});