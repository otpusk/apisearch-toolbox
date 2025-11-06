// Core
import { createActions } from 'redux-actions';

export const actions = createActions({
    CREATE_QUERY: (queryId, query) => ({ queryId, query }),
    SET_QUERY:    (queryId, query) => ({ queryId, query }),

    RUN_SEARCH:           (queryId, options) => ({ queryId, options }),
    RUN_NEXT_PAGE_SEARCH: (queryId, options) => ({ queryId, options }),
    PROCESS_SEARCH:       (queryId, page, tours) => ({ queryId, page, tours }),
    FINISH_SEARCH:        (queryId) => queryId,
    FAIL_SEARCH:          (error) => error,

    GET_SEARCH_OPERATORS:         () => void 0,
    GET_SEARCH_OPERATORS_SUCCESS: (key, operators) => ({ key, operators }),
    GET_SEARCH_OPERATORS_FAIL:    (error) => error,

    GET_SEARCH_TRANSPORTS:         () => void 0,
    GET_SEARCH_TRANSPORTS_SUCCESS: (key, transports) => ({ key, transports }),
    GET_SEARCH_TRANSPORTS_FAIL:    (error) => error,

    GET_SEARCH_CATEGORIES:         () => void 0,
    GET_SEARCH_CATEGORIES_SUCCESS: (key, categories) => ({ key, categories }),
    GET_SEARCH_CATEGORIES_FAIL:    (error) => error,

    GET_SEARCH_PRICES:         () => void 0,
    GET_SEARCH_PRICES_SUCCESS: (key, prices) => ({ key, prices }),
    GET_SEARCH_PRICES_FAIL:    (error) => error,
}, { prefix: '@apisearch/excursion' });
