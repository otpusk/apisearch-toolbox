// Core
import { createActions } from 'redux-actions';

export const actions = createActions({
    GET_MAINPAGE:         () => void 0,
    GET_MAINPAGE_SUCCESS: (categories) => categories,
    GET_MAINPAGE_FAIL:    (error) => error,

    GET_COUNTRIES:         () => void 0,
    GET_COUNTRIES_SUCCESS: (countries) => countries,
    GET_COUNTRIES_FAIL:    (error) => error,

    GET_EXCURSION:         (excursion) => ({excursion}),
    GET_EXCURSION_SUCCESS: (excursion, excursionData) => ({ excursion, excursionData }),
    GET_EXCURSION_FAIL:    (error) => error,
}, { prefix: '@apisearch/excursion' });
