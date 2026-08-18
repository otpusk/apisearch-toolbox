import { createSelector } from 'reselect';
const domain = _ => _.queries;
export const getQuery = createSelector(domain, (_, _ref) => {
  let {
    queryID
  } = _ref;
  return queryID;
}, (queriesMap, queryID) => queriesMap.get(queryID));
export const getQueryParam = createSelector(getQuery, (_, _ref2) => {
  let {
    paramName
  } = _ref2;
  return paramName;
}, (query, name) => query && query.get(name));