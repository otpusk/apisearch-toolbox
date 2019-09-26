// Core
import { createActions } from 'redux-actions';

export const actions = createActions({
    CREATE_QUERY:   (queryId, query) => ({ queryId, query }),
    SET_QUERY:      (queryId, query) => ({ queryId, query }),
    RUN_SEARCH:     (queryId) => queryId,
    PROCESS_SEARCH: (queryId, tours) => ({ queryId, tours }),
    FINISH_SEARCH:  (queryId) => queryId,
    FAIL_SEARCH:    (error) => error,
}, { prefix: '@apisearch/excursion' });
