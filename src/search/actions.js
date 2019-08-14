// Core
import { createActions } from 'redux-actions';

export const searchActions = createActions({
    SUBMIT_SEARCH:           (queryId = 'main', targetPage) => ({ queryId, targetPage }),
    RUN_SEARCH:              (queryId) => queryId,
    RESET_SEARCH:            (queryId) => queryId,
    START_SEARCH:            (queryId) => queryId,
    PROCESS_SEARCH:          (queryId, payload) => ({ queryId, ...payload }),
    FINISH_SEARCH:           (queryId) => queryId,
    FAIL_SEARCH:             (queryId) => queryId,
    GET_PRICE_CHART:         (queryId) => queryId,
    GET_PRICE_CHART_SUCCESS: (queryId, chart) => ({ queryId, chart }),
    GET_PRICE_CHART_FAIL:    (error) => error,
});
