"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.excursionsActions = void 0;

var _reduxActions = require("redux-actions");

// Core
var excursionsActions = (0, _reduxActions.createActions)({
  GET_EXCURSION: function GET_EXCURSION(excursion) {
    return {
      excursion: excursion
    };
  },
  GET_EXCURSION_SUCCESS: function GET_EXCURSION_SUCCESS(excursion, excursionData) {
    return {
      excursion: excursion,
      excursionData: excursionData
    };
  },
  GET_EXCURSION_FAIL: function GET_EXCURSION_FAIL(error) {
    return error;
  }
});
exports.excursionsActions = excursionsActions;