"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = void 0;
var _reduxActions = require("redux-actions");
// Core

const actions = exports.actions = (0, _reduxActions.createActions)({
  GET_SUGGESTS: key => key,
  GET_SUGGESTS_SUCCESS: (key, suggestions) => ({
    key,
    suggestions
  }),
  GET_SUGGESTS_FAIL: error => error,
  GET_DEPARTURE_CITIES: countryId => countryId,
  GET_DEPARTURE_CITIES_SUCCESS: (countryId, cities) => ({
    countryId,
    cities
  }),
  GET_DEPARTURE_CITIES_FAIL: error => error
}, {
  prefix: '@apisearch/excursion'
});