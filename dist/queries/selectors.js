"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQueryParam = exports.getQuery = void 0;

var _reselect = require("reselect");

var domain = function domain(_) {
  return _.queries;
};

var getQuery = (0, _reselect.createSelector)(domain, function (_, _ref) {
  var queryID = _ref.queryID;
  return queryID;
}, function (queriesMap, queryID) {
  return queriesMap.get(queryID);
});
exports.getQuery = getQuery;
var getQueryParam = (0, _reselect.createSelector)(getQuery, function (_, _ref2) {
  var paramName = _ref2.paramName;
  return paramName;
}, function (query, name) {
  return query && query.get(name);
});
exports.getQueryParam = getQueryParam;