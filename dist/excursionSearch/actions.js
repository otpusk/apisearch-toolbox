"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = void 0;

var _reduxActions = require("redux-actions");

// Core
var actions = (0, _reduxActions.createActions)({
  CREATE_QUERY: function CREATE_QUERY(queryId, query) {
    return {
      queryId: queryId,
      query: query
    };
  },
  SET_QUERY: function SET_QUERY(queryId, query) {
    return {
      queryId: queryId,
      query: query
    };
  },
  RUN_SEARCH: function RUN_SEARCH(queryId) {
    return queryId;
  },
  PROCESS_SEARCH: function PROCESS_SEARCH(queryId, tours) {
    return {
      queryId: queryId,
      tours: tours
    };
  },
  FINISH_SEARCH: function FINISH_SEARCH(queryId) {
    return queryId;
  },
  FAIL_SEARCH: function FAIL_SEARCH(error) {
    return error;
  },
  GET_SEARCH_OPERATORS: function GET_SEARCH_OPERATORS() {
    return void 0;
  },
  GET_SEARCH_OPERATORS_SUCCESS: function GET_SEARCH_OPERATORS_SUCCESS(key, operators) {
    return {
      key: key,
      operators: operators
    };
  },
  GET_SEARCH_OPERATORS_FAIL: function GET_SEARCH_OPERATORS_FAIL(error) {
    return error;
  },
  GET_SEARCH_TRANSPORT: function GET_SEARCH_TRANSPORT() {
    return void 0;
  },
  GET_SEARCH_TRANSPORT_SUCCESS: function GET_SEARCH_TRANSPORT_SUCCESS() {
    return void 0;
  },
  GET_SEARCH_TRANSPORT_FAIL: function GET_SEARCH_TRANSPORT_FAIL(error) {
    return error;
  },
  GET_SEARCH_CATEGORIES: function GET_SEARCH_CATEGORIES() {
    return void 0;
  },
  GET_SEARCH_CATEGORIES_SUCCESS: function GET_SEARCH_CATEGORIES_SUCCESS(key, categories) {
    return {
      key: key,
      categories: categories
    };
  },
  GET_SEARCH_CATEGORIES_FAIL: function GET_SEARCH_CATEGORIES_FAIL(error) {
    return error;
  }
}, {
  prefix: '@apisearch/excursion'
});
exports.actions = actions;