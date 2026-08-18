"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQueryParam = exports.getQuery = void 0;
var _reselect = require("reselect");
const domain = _ => _.queries;
const getQuery = exports.getQuery = (0, _reselect.createSelector)(domain, (_, _ref) => {
  let {
    queryID
  } = _ref;
  return queryID;
}, (queriesMap, queryID) => queriesMap.get(queryID));
const getQueryParam = exports.getQueryParam = (0, _reselect.createSelector)(getQuery, (_, _ref2) => {
  let {
    paramName
  } = _ref2;
  return paramName;
}, (query, name) => query && query.get(name));