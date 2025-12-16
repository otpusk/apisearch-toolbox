"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchActions = void 0;
var _reduxActions = require("redux-actions");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // Core
var searchActions = exports.searchActions = (0, _reduxActions.createActions)({
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
  PATCH_SEARCH: function PATCH_SEARCH(queryId, key, patch) {
    return {
      queryId: queryId,
      key: key,
      patch: patch
    };
  },
  SILENT_SEARCH: function SILENT_SEARCH(queryID) {
    return queryID;
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