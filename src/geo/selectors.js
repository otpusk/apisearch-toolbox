// Core
import { createSelector } from 'reselect';
import { List, Map } from 'immutable';

/**
 * Select countries from locations store
 */
export const selectCountries = createSelector(
    (state) => state.getIn(['keys', 'countries'], List()),
    (state) => state.get('locations'),
    (keys, locations) => locations.filter((location, id) => keys.includes(id))
);

/**
 * Select cities by country
 */
export const selectCitiesByCountry = createSelector(
    (state, country) => state.getIn(['keys', 'cities', Map.isMap(country) ? country.get('id') : country], List()),
    (state) => state.getIn(['locations', 'cities']),
    (keys, locations) => locations.filter((location, id) => keys.includes(id))
);

/**
 * Selecte hotels by country
 */
export const selectHotelsByCountry = createSelector(
    (state, country) => state.getIn(['keys', 'hotels', Map.isMap(country) ? country.get('id') : country], List()),
    (state) => state.getIn(['locations', 'hotels']),
    (keys, locations) => locations.filter((location, id) => keys.includes(id))
);
