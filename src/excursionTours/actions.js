// Core
import { createActions } from 'redux-actions';

export const actions = createActions({
    GET_TOUR:                (tourId) => tourId,
    GET_TOUR_SUCCESS:        (tourId, tour) => ({ tourId, tour }),
    GET_TOUR_FAIL:           (error) => error,

    GET_AGENCIES:            (query) => query,
    GET_AGENCIES_SUCCESS:    (tourId, agencies) => ({ tourId, agencies }),
    GET_AGENCIES_FAIL:       (error) => error,
}, { prefix: '@apisearch/excursion' });
