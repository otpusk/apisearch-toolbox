/* eslint-disable max-params */
import { createActions } from 'redux-actions';

export const geoActions = createActions({
    GET_SUGGESTS:         (key = '') => key,
    GET_SUGGESTS_SUCCESS: (key, suggestions) => ({ key, suggestions }),
    GET_SUGGESTS_FAIL:    (error) => error,

    GET_DEPARTURE_CITIES:         (geoID, methodVersion) => ({ geoID, methodVersion }),
    GET_DEPARTURE_CITIES_SUCCESS: (key, departures) => ({ key, departures }),
    GET_DEPARTURE_CITIES_FAIL:    (error) => error,

    GET_COUNTRIES:         (options, methodVersion) => ({ options, methodVersion }),
    GET_COUNTRIES_SUCCESS: (countries) => countries,
    GET_COUNTRIES_FAIL:    (error) => error,

    GET_CITIES:         (countryId, options) => ({ countryId, options }),
    GET_CITIES_SUCCESS: (countryId, cities) => ({ countryId, cities }),
    GET_CITIES_FAIL:    (error) => error,

    GET_HOTELS: (
        countryId,
        withPrice = true,
        services,
        rating,
        methodVersion
    ) => ({
        countryId,
        withPrice,
        services,
        rating,
        methodVersion,
    }),
    GET_HOTELS_SUCCESS: (countryId, key, hotels) => ({ countryId, key, hotels }),
    GET_HOTELS_FAIL:    (error) => error,
    REMOVE_HOTELS:      (key) => key,

    GET_OPERATORS: (countryId, departureID, methodVersion) => ({
        countryId,
        departureID,
        methodVersion,
    }),
    GET_OPERATORS_SUCCESS: (key, operators) => ({ key, operators }),
    GET_OPERATORS_FAIL:    (error) => error,

    GET_GEO_TREE:         () => void 0,
    GET_GEO_TREE_SUCCESS: (geoTree) => ({ geoTree }),
    GET_GEO_TREE_FAIL:    (error) => error,

    GET_LOCATION_DATA:         (id) => ({ id }),
    GET_LOCATION_DATA_SUCCESS: (id, data) => ({ id, data }),
    GET_LOCATION_DATA_FAIL:    (error) => error,

    GET_FLIGHT_PORT:         (iata) => iata,
    GET_FLIGHT_PORT_SUCCESS: (key, port) => ({ key, port }),
    GET_FLIGHT_PORT_FAIL:    (error) => error,
});
