import { createSelector } from 'reselect';
import * as R from 'ramda';

const EMPTY_ARRAY = [];
const DEFAULT_DEPARTURE_GEO_ID = 0;

const domain = (_) => _.geo;
const departureGeoID = (_, { geoID }) => geoID;
const getDepartureID = (_, { departureID }) => departureID.toString();
const getIATA = (_, { iata }) => iata;
const getCountryID = (_, { countryID }) => countryID;
const getHotelID = (_, { hotelID }) => hotelID;
const getHotelKey = (_, { hotelKey }) => hotelKey;

const getDeparturesByImmutableStructure = createSelector(
    domain,
    (geo) => geo.get('departures')
);

export const getAllDepartures = createSelector(
    getDeparturesByImmutableStructure,
    (departures) => departures.toJS()
);

export const getDepartures = () => createSelector(
    getDeparturesByImmutableStructure,
    departureGeoID,
    (map, geoID) => R.propOr(EMPTY_ARRAY, geoID, map.toJS())
);

export const getDepartureByDefaultGeo = () => createSelector(
    getDeparturesByImmutableStructure,
    getDepartureID,
    (map, id) => R.find(
        (departure) => departure.id === id,
        R.propOr(EMPTY_ARRAY, DEFAULT_DEPARTURE_GEO_ID, map.toJS())
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

const getCountriesByImmutableStructure = createSelector(
    domain,
    (geo) => geo.get('countries')
);

export const getCountries = createSelector(
    getCountriesByImmutableStructure,
    (countries) => countries.toArray()
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
    (geo) => geo.get('hotels')
);

const getHotelsImmutableStructureByCountry = () => createSelector(
    getHotelsStore,
    getCountryID,
    (store, countryID) => R.prop(countryID, store.toObject())
);

export const getHotelsByCountry = () => createSelector(
    getHotelsImmutableStructureByCountry(),
    (hotels) => hotels ? hotels.toArray() : EMPTY_ARRAY
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
    (hotelsStore, key) => hotelsStore.has(key)
        ? hotelsStore.get(key).toArray()
        : EMPTY_ARRAY
);

export const getHotelByKey = () => createSelector(
    getHotelsByKey,
    getHotelID,
    (hotels, id) => R.find((hotel) => hotel.id === id, hotels)
);
