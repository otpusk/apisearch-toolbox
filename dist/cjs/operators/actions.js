"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.operatorsActions = void 0;
var _reduxActions = require("redux-actions");
const operatorsActions = exports.operatorsActions = (0, _reduxActions.createActions)({
  GET_OPERATORS: (countryId, options) => ({
    countryId,
    options
  }),
  GET_OPERATORS_SUCCESS: (countryId, operators) => ({
    countryId,
    operators
  }),
  GET_OPERATORS_FAIL: error => error,
  // rates
  GET_CURRENCY_RATES: (dateFrom, dateTo, options) => ({
    dateFrom,
    dateTo,
    options
  }),
  GET_CURRENCY_RATES_SUCCESS: (key, rates) => ({
    key,
    rates
  }),
  GET_CURRENCY_RATES_FAIL: error => error,
  SET_UI_FLAG: (path, value) => ({
    path,
    value
  })
}, {
  prefix: 'API_TOOLBOX'
});