// Core
import { createActions } from 'redux-actions';

export const queriesActions = createActions({
    CREATE_QUERY:               (queryId, initialParams) => ({ queryId, initialParams }),
    SET_QUERY:                  (queryId, query) => ({ queryId, query }),
    CREATE_QUERY_FROM_OFFER:    (queryId, hotel, offer, overrides) => ({ queryId, hotel, offer, overrides }),
    CHANGE_QUERY_PARAM:         (paramName, paramValue, queryId) => ({ paramName, paramValue, queryId }),
    RESET_QUERY_PARAM:          (paramName, queryId) => ({ paramName, queryId }),
    PARSE_OS_HASH_QUERY_STRING: (queryId = 'main') => queryId,
    PARSE_QUERY_STRING:         (queryString, queryId = 'main') => ({ queryString, queryId }),
    PARSE_QUERY_STRING_SUCCESS: (queryId) => queryId,
    PARSE_QUERY_STRING_FAIL:    (error) => ({ error }),
    COMPILE_QUERY_STRING:       (queryId) => ({ queryId }),
});
