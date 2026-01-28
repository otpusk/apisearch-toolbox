import { createSelector } from 'reselect';
import * as R from 'ramda';

const EMPTY_ARRAY = [];
const DEFAULT_DEPARTURE_GEO_ID = 0;

const domain = (_) => _.geo;
const departureGeoID = (_, { geoID }) => geoID;
const getDepartureID = (_, { departureID }) => departureID;
const getIATA = (_, { iata }) => iata;
const getCountryID = (_, { countryID }) => countryID;
const getHotelID = (_, { hotelID }) => hotelID;
const getHotelKey = (_, { hotelKey }) => hotelKey;

const getDeparturesByImmutableStructure = createSelector(
    domain,
    (geo) => geo.departures
);

export const getDepartures = () => createSelector(
    getDeparturesByImmutableStructure,
    departureGeoID,
    (store, geoID) => R.propOr(EMPTY_ARRAY, geoID, store)
);

export const getDepartureByDefaultGeo = () => createSelector(
    getDeparturesByImmutableStructure,
    getDepartureID,
    (store, id) => R.find(
        (departure) => departure.id === id,
        R.propOr(EMPTY_ARRAY, DEFAULT_DEPARTURE_GEO_ID, store)
    )
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
    (geo) => geo.flightPorts
);

export const getFlightPort = () => createSelector(
    getFlightPorts,
    getIATA,
    (ports, iata) => R.prop(iata, ports)
);

export const getOperators = () => createSelector(
    domain,
    (_, { key }) => key,
    (geo, key) => R.propOr(EMPTY_ARRAY, key, geo.operators || {})
);

export const getOperatorsMap = () => createSelector(
    getOperators(),
    (operators) => R.call(
        R.pipe(
            R.map((operator) => [operator.id, operator]),
            R.fromPairs
        ),
        operators
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

export const getCountries = createSelector(
    domain,
    (geo) => geo.countries
);

export const getCountry = () => createSelector(
    getCountries,
    getCountryID,
    (countries, id) => R.find(
        (country) => country.id === id,
        countries
    )
);

export const getTopCountry = createSelector(
    getCountries,
    R.pipe(
        R.sort(R.descend(R.prop('weight'))),
        R.head
    )
);

const getHotelsStore = createSelector(
    domain,
    (geo) => geo.hotels
);

const getHotelsByCountryStore = () => createSelector(
    getHotelsStore,
    getCountryID,
    (store, countryID) => R.prop(countryID, store)
);

export const getHotelsByCountry = () => createSelector(
    getHotelsByCountryStore(),
    (hotels) => Array.isArray(hotels) ? hotels : EMPTY_ARRAY
);

export const getHotelByCountry = () => createSelector(
    getHotelsByCountry(),
    getHotelID,
    (hotels, id) => R.find(
        (hotel) => hotel.id === id,
        hotels
    )
);

export const getHotelsByKey = () => createSelector(
    getHotelsStore,
    getHotelKey,
    (hotelsStore, key) => R.propOr(EMPTY_ARRAY, key, hotelsStore)
);

export const getHotelByKey = () => createSelector(
    getHotelsByKey,
    getHotelID,
    (hotels, id) => R.find((hotel) => hotel.id === id, hotels)
);
