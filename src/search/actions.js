// Core
import { createActions } from 'redux-actions';

export const searchActions = createActions({
    RUN_SEARCH:     (queryId) => queryId,
    GET_RESULTS:    (queryId) => queryId,
    RESET_SEARCH:   (queryId) => queryId,
    START_SEARCH:   (queryId) => queryId,
    PROCESS_SEARCH: (queryId, payload) => ({ queryId, ...payload }),
    FINISH_SEARCH:  (queryId, payload) => ({ queryId, ...payload }),
    PATCH_SEARCH:   (queryId, key, patch) => ({
        queryId,
        key,
        patch,
    }),
    SILENT_SEARCH: (queryID) => queryID,
    FAIL_SEARCH:   [
        (queryId) => queryId,
        (_, error, response) => ({ error, response })
    ],
    CLEAR_SEARCH:                (queryId) => queryId,
    CANCELLED_SEARCH:            (queryId) => queryId,
    SET_SEARCH_STATUS:           (queryID, status) => ({ queryID, status }),
    GET_PRICE_CHART:             (queryId, duration, methodVersion) => ({ queryId, duration, methodVersion }),
    GET_PRICE_CHART_SUCCESS:     (queryId, chart) => ({ queryId, chart }),
    GET_PRICE_CHART_FAIL:        (error) => error,
    GET_AVAILABLE_DATES:         (countryID, departureID) => ({ countryID, departureID }),
    GET_AVAILABLE_DATES_SUCCESS: (key, dates) => ({ key, dates }),
    GET_AVAILABLE_DATES_FAIL:    (error) => error,
});
