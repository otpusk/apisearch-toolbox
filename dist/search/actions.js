"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchActions = void 0;

var _reduxActions = require("redux-actions");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var searchActions = (0, _reduxActions.createActions)({
  RUN_SEARCH: function RUN_SEARCH(queryId) {
    return queryId;
  },
  GET_RESULTS: function GET_RESULTS(queryId) {
    return queryId;
  },
  RESET_SEARCH: function RESET_SEARCH(queryId) {
    return queryId;
  },
  START_SEARCH: function START_SEARCH(queryId) {
    return queryId;
  },
  PROCESS_SEARCH: function PROCESS_SEARCH(queryId, payload) {
    return _objectSpread({
      queryId: queryId
    }, payload);
  },
  FINISH_SEARCH: function FINISH_SEARCH(queryId, payload) {
    return _objectSpread({
      queryId: queryId
    }, payload);
  },
  FAIL_SEARCH: [function (queryId) {
    return queryId;
  }, function (_, error, response) {
    return {
      error: error,
      response: response
    };
  }],
  CLEAR_SEARCH: function CLEAR_SEARCH(queryId) {
    return queryId;
  },
  CANCELLED_SEARCH: function CANCELLED_SEARCH(queryId) {
    return queryId;
  },
  SET_SEARCH_STATUS: function SET_SEARCH_STATUS(queryID, status) {
    return {
      queryID: queryID,
      status: status
    };
  },
  GET_PRICE_CHART: function GET_PRICE_CHART(queryId, duration, methodVersion) {
    return {
      queryId: queryId,
      duration: duration,
      methodVersion: methodVersion
    };
  },
  GET_PRICE_CHART_SUCCESS: function GET_PRICE_CHART_SUCCESS(queryId, chart) {
    return {
      queryId: queryId,
      chart: chart
    };
  },
  GET_PRICE_CHART_FAIL: function GET_PRICE_CHART_FAIL(error) {
    return error;
  },
  GET_AVAILABLE_DATES: function GET_AVAILABLE_DATES(countryID, departureID) {
    return {
      countryID: countryID,
      departureID: departureID
    };
  },
  GET_AVAILABLE_DATES_SUCCESS: function GET_AVAILABLE_DATES_SUCCESS(key, dates) {
    return {
      key: key,
      dates: dates
    };
  },
  GET_AVAILABLE_DATES_FAIL: function GET_AVAILABLE_DATES_FAIL(error) {
    return error;
  }
});
exports.searchActions = searchActions;