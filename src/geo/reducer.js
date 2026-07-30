// Core
import { Map, List } from 'immutable';
import { handleActions } from 'redux-actions';
import { pluck, indexBy, prop } from 'ramda';

// Instruments
import { geoActions } from './actions';

const initalState = Map({
    countries:       List(),
    suggestions:     {},
    suggestEntities: {
        country: {},
        city:    {},
        hotel:   {},
    },
    departures:  Map(),
    cities:      Map(),
    hotels:      Map(),
    operators:   Map(),
    geoTree:     {},
    statuses:    Map(),
    flightPorts: {},
});

export const geoReducer = handleActions(
    {
        [geoActions.getSuggestsSuccess]: (state, { payload: { key, suggestions }}) => {
            const { country = [], city = [], hotel = []} = suggestions;
            const toById = indexBy(prop('id'));

            return state
                .setIn(['suggestions', key], {
                    country: pluck('id', country),
                    city:    pluck('id', city),
                    hotel:   pluck('id', hotel),
                })
                .updateIn(['suggestEntities', 'country'], (existing) => ({ ...existing, ...toById(country) }))
                .updateIn(['suggestEntities', 'city'], (existing) => ({ ...existing, ...toById(city) }))
                .updateIn(['suggestEntities', 'hotel'], (existing) => ({ ...existing, ...toById(hotel) }));
        },
        [geoActions.getCountriesSuccess]: (state, { payload: countries }) => {
            return state.set('countries', List(countries)).setIn(['statuses', 'countries'], 'loaded');
        },
        [geoActions.getCountriesFail]: (state) => {
            return state.setIn(['statuses', 'countries'], 'failed');
        },
        [geoActions.getDepartureCitiesSuccess]: (state, { payload: { key, departures }}) => {
            return state.setIn(['departures', key], List(departures));
        },
        [geoActions.getCitiesSuccess]: (state, { payload: { countryId, cities }}) => {
            return state.setIn(['cities', countryId], List(cities));
        },
        [geoActions.getHotelsSuccess]: (state, { payload: { hotels, key }}) => {
            return state.setIn(['hotels', key], List(hotels));
        },
        [geoActions.removeHotels]: (state, { payload: key }) => {
            return state.removeIn(['hotels', key]);
        },
        [geoActions.getOperatorsSuccess]: (state, { payload: { key, operators }}) => {
            return state.setIn(['operators', key], operators);
        },
        [geoActions.getGeoTreeSuccess]: (state, { payload: { countryId, geoTree }}) => {
            return state.setIn(['geoTree', countryId], geoTree);
        },
        [geoActions.getLocationDataSuccess]: (state, { payload : { id, data }}) => {
            return state.setIn(['locations', id], data);
        },
        [geoActions.getFlightPortSuccess]: (state, { payload }) => {
            const { key, port } = payload;

            return state.setIn(['flightPorts', key], port);
        },
    },
    initalState
);
