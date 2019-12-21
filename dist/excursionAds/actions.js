"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = void 0;

var _reduxActions = require("redux-actions");

// Core
var actions = (0, _reduxActions.createActions)({
  GET_OFFICES: function GET_OFFICES(query) {
    return query;
  },
  GET_OFFICES_SUCCESS: function GET_OFFICES_SUCCESS(tourId, offices) {
    return {
      tourId: tourId,
      offices: offices
    };
  },
  GET_OFFICES_FAIL: function GET_OFFICES_FAIL(error) {
    return error;
  },
  GET_REGIONS: function GET_REGIONS(query) {
    return query;
  },
  GET_REGIONS_SUCCESS: function GET_REGIONS_SUCCESS(regions) {
    return {
      regions: regions
    };
  },
  GET_REGIONS_FAIL: function GET_REGIONS_FAIL(error) {
    return error;
  }
}, {
  prefix: '@apisearch/excursion'
});
exports.actions = actions;