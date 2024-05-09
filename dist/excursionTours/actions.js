"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = void 0;
var _reduxActions = require("redux-actions");
// Core

var actions = exports.actions = (0, _reduxActions.createActions)({
  GET_TOUR: function GET_TOUR(tourId) {
    return tourId;
  },
  GET_TOUR_SUCCESS: function GET_TOUR_SUCCESS(tourId, tour) {
    return {
      tourId: tourId,
      tour: tour
    };
  },
  GET_TOUR_FAIL: function GET_TOUR_FAIL(error) {
    return error;
  }
}, {
  prefix: '@apisearch/excursion'
});