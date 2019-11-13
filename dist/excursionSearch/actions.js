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
  RUN_NEXT_PAGE_SEARCH: function RUN_NEXT_PAGE_SEARCH(queryId) {
    return queryId;
  },
  PROCESS_SEARCH: function PROCESS_SEARCH(queryId, page, tours) {
    return {
      queryId: queryId,
      page: page,
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
  GET_SEARCH_TRANSPORTS: function GET_SEARCH_TRANSPORTS() {
    return void 0;
  },
  GET_SEARCH_TRANSPORTS_SUCCESS: function GET_SEARCH_TRANSPORTS_SUCCESS(key, transports) {
    return {
      key: key,
      transports: transports
    };
  },
  GET_SEARCH_TRANSPORTS_FAIL: function GET_SEARCH_TRANSPORTS_FAIL(error) {
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
  },
  GET_EXCURSIONS_COUNT: function GET_EXCURSIONS_COUNT(queryId) {
    return queryId;
  },
  GET_EXCURSIONS_COUNT_SUCCESS: function GET_EXCURSIONS_COUNT_SUCCESS(queryId, excursionsCount) {
    return {
      queryId: queryId,
      excursionsCount: excursionsCount
    };
  },
  GET_EXCURSIONS_COUNT_FAIL: function GET_EXCURSIONS_COUNT_FAIL(error) {
    return error;
  }
}, {
  prefix: '@apisearch/excursion'
});
exports.actions = actions;