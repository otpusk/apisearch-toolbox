"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = void 0;
var _reduxActions = require("redux-actions");
// Core

const actions = exports.actions = (0, _reduxActions.createActions)({
  GET_MAINPAGE: () => void 0,
  GET_MAINPAGE_SUCCESS: categories => categories,
  GET_MAINPAGE_FAIL: error => error,
  GET_COUNTRIES: () => void 0,
  GET_COUNTRIES_SUCCESS: countries => countries,
  GET_COUNTRIES_FAIL: error => error
}, {
  prefix: '@apisearch/excursion'
});