// Core
import { createSelector } from 'reselect';
import { List, Map } from 'immutable';
import * as R from 'ramda';

const EMPTY_ARRAY = [];

const domain = (_) => _.geo;
const departureGeoID = (_, { geoID }) => geoID;
const getIATA = (_, { iata }) => iata;

const getDeparturesByImmutableStructure = createSelector(
    domain,
    (geo) => geo.get('departures')
);

export const getDepartures = () => createSelector(
    getDeparturesByImmutableStructure,
    departureGeoID,
    (map, geoID) => R.propOr(EMPTY_ARRAY, geoID, map.toJS())
);

export const getDepartureByIATA = () => createSelector(
    getDepartures(),
    getIATA,
    (list, code) => R.find(
        R.pipe(R.prop('iata'), R.equals(code)),
        list
    )
);

export const getFlightPorts = createSelector(
    domain,
    (geo) => geo.get('flightPorts')
);

export const getFlightPort = () => createSelector(
    getFlightPorts,
    getIATA,
    (ports, iata) => R.prop(iata, ports)
);

export const getOperators = () => createSelector(
    domain,
    (_, { key }) => key,
    (geo, key) => R.call(
        R.pipe(
            (operators) => operators.toObject(),
            R.prop(key),
            R.ifElse(
                Boolean,
                (operators) => operators.toArray(),
                R.always(EMPTY_ARRAY)
            )
        ),
        geo.get('operators')
    )
);

export const getOperator = () => createSelector(
    getOperators(),
    (_, { operatorID }) => operatorID,
    (operatorsArray, findID) => R.find(
        ({ id }) => Number(id) === Number(findID),
        operatorsArray
    )
);

export const getActiveOperators = () => createSelector(
    getOperators(),
    R.filter(R.prop('active'))
);

const getCountriesByImmutableStructure = createSelector(
    domain,
    (geo) => geo.get('countries')
);

export const getCountries = createSelector(
    getCountriesByImmutableStructure,
    (countries) => countries.toArray()
);

export const getTopCountry = createSelector(
    getCountries,
    R.pipe(
        R.sort(R.descend(R.prop('weight'))),
        R.head
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
