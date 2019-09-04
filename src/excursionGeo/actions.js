// Core
import { createActions } from 'redux-actions';

export const actions = createActions({
    GET_SUGGESTS:         (key) => key,
    GET_SUGGESTS_SUCCESS: (key, suggestions) => ({ key, suggestions }),
    GET_SUGGESTS_FAIL:    (error) => error,

    GET_DEPARTURE_CITIES:         (countryId) => countryId,
    GET_DEPARTURE_CITIES_SUCCESS: (countryId, cities) => ({ countryId, cities }),
    GET_DEPARTURE_CITIES_FAIL:    (error) => error,
}, { prefix: '@apisearch/excursion' });
