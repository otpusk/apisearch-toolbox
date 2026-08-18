"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.servicesActions = void 0;
var _reduxActions = require("redux-actions");
var _constants = require("./constants");
var _helpers = require("./helpers");
const servicesActions = exports.servicesActions = (0, _reduxActions.createActions)({
  GET_SERVICES: (countryId, options) => ({
    countryId,
    options
  }),
  GET_ALL_SERVICES: () => _constants.EMPTY_COUNTRY_ID,
  GET_SERVICES_SUCCESS: (countryId, services) => ({
    countryId,
    services
  }),
  GET_SERVICES_FAIL: error => error,
  SET_LABELS: labels => labels,
  MERGE_LABELS: labels => labels,
  GET_BOOKING_SERVICES: (offerID, currency) => ({
    offerID,
    currency
  }),
  GET_BOOKING_SERVICES_FAIL: error => error,
  SET_BOOKING_SERVICES: (key, services) => ({
    key,
    services
  }),
  RESET_BOOKING_SERVICES: (offerID, currency) => (0, _helpers.createBookingServicesKey)(offerID, currency)
});