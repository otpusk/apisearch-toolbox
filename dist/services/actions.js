"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.servicesActions = void 0;

var _reduxActions = require("redux-actions");

var _constants = require("./constants");

var servicesActions = (0, _reduxActions.createActions)({
  GET_SERVICES: function GET_SERVICES(countryId) {
    return countryId;
  },
  GET_ALL_SERVICES: function GET_ALL_SERVICES() {
    return _constants.EMPTY_COUNTRY_ID;
  },
  GET_SERVICES_SUCCESS: function GET_SERVICES_SUCCESS(countryId, services) {
    return {
      countryId: countryId,
      services: services
    };
  },
  GET_SERVICES_FAIL: function GET_SERVICES_FAIL(error) {
    return error;
  },
  SET_LABELS: function SET_LABELS(labels) {
    return labels;
  },
  MERGE_LABELS: function MERGE_LABELS(labels) {
    return labels;
  }
});
exports.servicesActions = servicesActions;