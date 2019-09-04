"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = void 0;

var _reduxActions = require("redux-actions");

// Core
var actions = (0, _reduxActions.createActions)({
  GET_SUGGESTS: function GET_SUGGESTS(key) {
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
  GET_DEPARTURE_CITIES_SUCCESS: function GET_DEPARTURE_CITIES_SUCCESS(countryId, cities) {
    return {
      countryId: countryId,
      cities: cities
    };
  },
  GET_DEPARTURE_CITIES_FAIL: function GET_DEPARTURE_CITIES_FAIL(error) {
    return error;
  }
}, {
  prefix: '@apisearch/excursion'
});
exports.actions = actions;