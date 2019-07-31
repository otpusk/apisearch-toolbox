"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.servicesActions = void 0;

var _reduxActions = require("redux-actions");

// Core
var servicesActions = (0, _reduxActions.createActions)({
  GET_SERVICES: function GET_SERVICES() {
    var countryId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return countryId;
  },
  GET_SERVICES_SUCCESS: function GET_SERVICES_SUCCESS(services) {
    return services;
  },
  GET_SERVICES_FAIL: function GET_SERVICES_FAIL(error) {
    return error;
  }
});
exports.servicesActions = servicesActions;