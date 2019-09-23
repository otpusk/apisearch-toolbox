// Core
import { createActions } from 'redux-actions';

export const actions = createActions({
    CREATE_QUERY: (queryId, query) => ({ queryId, query }),
    SET_QUERY:    (queryId, query) => ({ queryId, query }),
    RUN_SEARCH:   (queryId) => queryId,
}, { prefix: '@apisearch/excursion' });
