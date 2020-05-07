// Core
import { createActions } from 'redux-actions';

export const geoActions = createActions({
    GET_SUGGESTS:         (key = '') => key,
    GET_SUGGESTS_SUCCESS: (key, suggestions) => ({ key, suggestions }),
    GET_SUGGESTS_FAIL:    (error) => error,

    GET_DEPARTURE_CITIES:         (countryId) => countryId,
    GET_DEPARTURE_CITIES_SUCCESS: (countryId, departures) => ({ countryId, departures }),
    GET_DEPARTURE_CITIES_FAIL:    (error) => error,

    GET_COUNTRIES:         (options) => options,
    GET_COUNTRIES_SUCCESS: (countries) => countries,
    GET_COUNTRIES_FAIL:    (error) => error,

    GET_CITIES:         (countryId, options) => ({ countryId, options }),
    GET_CITIES_SUCCESS: (countryId, cities) => ({ countryId, cities }),
    GET_CITIES_FAIL:    (error) => error,

    GET_HOTELS:         (countryId, withPrice = true) => ({ countryId, withPrice }),
    GET_HOTELS_SUCCESS: (countryId, hotels) => ({ countryId, hotels }),
    GET_HOTELS_FAIL:    (error) => error,

    GET_OPERATORS:         (countryId) => countryId,
    GET_OPERATORS_SUCCESS: (countryId, operators) => ({ countryId, operators }),
    GET_OPERATORS_FAIL:    (error) => error,

    GET_GEO_TREE:         () => void 0,
    GET_GEO_TREE_SUCCESS: (geoTree) => ({ geoTree }),
    GET_GEO_TREE_FAIL:    (error) => error,

    GET_LOCATION_DATA:         (id) => ({ id }),
    GET_LOCATION_DATA_SUCCESS: (id, data) => ({ id, data }),
    GET_LOCATION_DATA_FAIL:    (error) => error,
});
