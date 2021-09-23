import { createSelector } from 'reselect';

const domain = (_) => _.queries;

export const getQuery = createSelector(
    domain,
    (_, { queryID }) => queryID,
    (queriesMap, queryID) => queriesMap.get(queryID)
);

export const getQueryParam = createSelector(
    getQuery,
    (_, { paramName }) => paramName,
    (query, name) => query && query.get(name)
);
