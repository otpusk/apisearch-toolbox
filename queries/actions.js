// Core
import { createActions } from 'redux-actions';

export const queriesActions = createActions({
    CREATE_QUERY:               (queryId, initialParams) => ({ queryId, initialParams }),
    SET_QUERY:                  (queryId, query) => ({ queryId, query }),
    CREATE_QUERY_FROM_OFFER:    (queryId, hotel, offer, overrides) => ({ queryId, hotel, offer, overrides }),
    CHANGE_QUERY_PARAM:         (queryId, paramName, paramValue) => ({ paramName, paramValue, queryId }),
    CHANGE_QUERY_PARAMS:        (queryId, paramValues) => ({ paramValues, queryId }),
    RESET_QUERY_PARAM:          (queryId, paramName) => ({ paramName, queryId }),
    PARSE_OS_QUERY_STRING: (targetQueryId, queryString) => ({targetQueryId, queryString}),
    PARSE_QUERY_STRING:         (targetQueryId, queryString) => ({ targetQueryId, queryString }),
    COMPILE_QUERY_STRING:       (queryId) => ({ queryId }),
});
