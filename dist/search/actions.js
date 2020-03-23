"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchActions = void 0;

var _reduxActions = require("redux-actions");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var searchActions = (0, _reduxActions.createActions)({
  SUBMIT_SEARCH: function SUBMIT_SEARCH() {
    var queryId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'main';
    var targetPage = arguments.length > 1 ? arguments[1] : undefined;
    return {
      queryId: queryId,
      targetPage: targetPage
    };
  },
  RUN_SEARCH: function RUN_SEARCH(queryId) {
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
  FAIL_SEARCH: function FAIL_SEARCH(queryId) {
    return queryId;
  },
  GET_PRICE_CHART: function GET_PRICE_CHART(queryId, duration) {
    return {
      queryId: queryId,
      duration: duration
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
  }
});
exports.searchActions = searchActions;