"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = void 0;
var _reduxActions = require("redux-actions");
// Core

const actions = exports.actions = (0, _reduxActions.createActions)({
  GET_TOUR: tourId => tourId,
  GET_TOUR_SUCCESS: (tourId, tour) => ({
    tourId,
    tour
  }),
  GET_TOUR_FAIL: error => error
}, {
  prefix: '@apisearch/excursion'
});