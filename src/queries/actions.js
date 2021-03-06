// Core
import { createActions } from 'redux-actions';

export const queriesActions = createActions({
    CREATE_QUERY:               (queryId, initialParams, isUrl = false) => ({ queryId, initialParams, isUrl }),
    SET_QUERY:                  (queryId, query) => ({ queryId, query }),
    REMOVE_QUERY:               (queryId) => queryId,
    CREATE_QUERY_FROM_OFFER:    (queryId, hotel, offer, overrides) => ({ queryId, hotel, offer, overrides }),
    CHANGE_QUERY_PARAM:         (queryId, paramName, paramValue) => ({ paramName, paramValue, queryId }),
    CHANGE_QUERY_PARAMS:        (queryId, paramValues) => ({ paramValues, queryId }),
    RESET_QUERY_PARAM:          (queryId, paramName) => ({ paramName, queryId }),
    PARSE_OS_QUERY_STRING:      (targetQueryId, queryString) => ({ targetQueryId, queryString }),
    PARSE_QUERY_STRING:         (queryId, queryString) => ({ queryId, queryString }),
    PARSE_QUERY_STRING_SUCCESS: () => void 0,
    PARSE_QUERY_STRING_FAIL:    () => void 0,
    COMPILE_QUERY_STRING:       (queryId) => ({ queryId }),
});
