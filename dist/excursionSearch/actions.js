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
  }
}, {
  prefix: '@apisearch/excursion'
});
exports.actions = actions;