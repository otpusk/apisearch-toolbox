"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queriesActions = void 0;

var _reduxActions = require("redux-actions");

// Core
var queriesActions = (0, _reduxActions.createActions)({
  CREATE_QUERY: function CREATE_QUERY(queryId, initialParams) {
    var isUrl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    return {
      queryId: queryId,
      initialParams: initialParams,
      isUrl: isUrl
    };
  },
  SET_QUERY: function SET_QUERY(queryId, query) {
    return {
      queryId: queryId,
      query: query
    };
  },
  REMOVE_QUERY: function REMOVE_QUERY(queryId) {
    return queryId;
  },
  CREATE_QUERY_FROM_OFFER: function CREATE_QUERY_FROM_OFFER(queryId, hotel, offer, overrides) {
    return {
      queryId: queryId,
      hotel: hotel,
      offer: offer,
      overrides: overrides
    };
  },
  CHANGE_QUERY_PARAM: function CHANGE_QUERY_PARAM(queryId, paramName, paramValue) {
    return {
      paramName: paramName,
      paramValue: paramValue,
      queryId: queryId
    };
  },
  CHANGE_QUERY_PARAMS: function CHANGE_QUERY_PARAMS(queryId, paramValues) {
    return {
      paramValues: paramValues,
      queryId: queryId
    };
  },
  RESET_QUERY_PARAM: function RESET_QUERY_PARAM(queryId, paramName) {
    return {
      paramName: paramName,
      queryId: queryId
    };
  },
  PARSE_OS_QUERY_STRING: function PARSE_OS_QUERY_STRING(targetQueryId, queryString) {
    return {
      targetQueryId: targetQueryId,
      queryString: queryString
    };
  },
  PARSE_QUERY_STRING: function PARSE_QUERY_STRING(queryId, queryString) {
    return {
      queryId: queryId,
      queryString: queryString
    };
  },
  PARSE_QUERY_STRING_SUCCESS: function PARSE_QUERY_STRING_SUCCESS() {
    return void 0;
  },
  PARSE_QUERY_STRING_FAIL: function PARSE_QUERY_STRING_FAIL() {
    return void 0;
  },
  COMPILE_QUERY_STRING: function COMPILE_QUERY_STRING(queryId) {
    return {
      queryId: queryId
    };
  }
});
exports.queriesActions = queriesActions;