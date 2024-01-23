"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.servicesActions = void 0;

var _reduxActions = require("redux-actions");

var _constants = require("./constants");

var _helpers = require("./helpers");

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
  },
  GET_BOOKING_SERVICES: function GET_BOOKING_SERVICES(offerID, currency) {
    return {
      offerID: offerID,
      currency: currency
    };
  },
  GET_BOOKING_SERVICES_FAIL: function GET_BOOKING_SERVICES_FAIL(error) {
    return error;
  },
  SET_BOOKING_SERVICES: function SET_BOOKING_SERVICES(key, services) {
    return {
      key: key,
      services: services
    };
  },
  RESET_BOOKING_SERVICES: function RESET_BOOKING_SERVICES(offerID, currency) {
    return (0, _helpers.createBookingServicesKey)(offerID, currency);
  }
});
exports.servicesActions = servicesActions;