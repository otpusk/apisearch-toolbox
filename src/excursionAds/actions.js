// Core
import { createActions } from 'redux-actions';

export const actions = createActions({
    GET_OFFICES:         (query) => query,
    GET_OFFICES_SUCCESS: (tourId, offices) => ({ tourId, offices }),
    GET_OFFICES_FAIL:    (error) => error,

    GET_REGIONS:         (query) => query,
    GET_REGIONS_SUCCESS: (tourId, regions) => ({ tourId, regions }),
    GET_REGIONS_FAIL:    (error) => error,
}, { prefix: '@apisearch/excursion' });
