// Core
import { createSelector } from 'reselect';
import { List, Map } from 'immutable';
import * as R from 'ramda';

// defaults
const emptyList = List();

const domain = (_) => _.geo;
const departureGeoID = (_, { geoID }) => geoID;
const getIATA = (_, { iata }) => iata;

const departureHUB = createSelector(
    domain,
    (geo) => geo.get('departures')
);

export const departures = () => createSelector(
    departureHUB,
    departureGeoID,
    (map, geoID) => map.get(geoID, emptyList).toArray()
);

export const getDepartureByIATA = () => createSelector(
    departures,
    getIATA,
    (list, code) => R.find(
        R.pipe(R.prop('iata'), R.equals(code)),
        list
    )
);


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
