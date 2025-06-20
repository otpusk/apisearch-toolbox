"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = void 0;
var _reduxActions = require("redux-actions");
// Core

var actions = exports.actions = (0, _reduxActions.createActions)({
  GET_MAINPAGE: function GET_MAINPAGE() {
    return void 0;
  },
  GET_MAINPAGE_SUCCESS: function GET_MAINPAGE_SUCCESS(categories) {
    return categories;
  },
  GET_MAINPAGE_FAIL: function GET_MAINPAGE_FAIL(error) {
    return error;
  },
  GET_COUNTRIES: function GET_COUNTRIES() {
    return void 0;
  },
  GET_COUNTRIES_SUCCESS: function GET_COUNTRIES_SUCCESS(countries) {
    return countries;
  },
  GET_COUNTRIES_FAIL: function GET_COUNTRIES_FAIL(error) {
    return error;
  }
}, {
  prefix: '@apisearch/excursion'
});