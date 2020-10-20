// Core
import { Map, List } from 'immutable';
import { handleActions } from 'redux-actions';

// Instruments
import { geoActions } from './actions';

const initalState = Map({
    countries:   List(),
    suggestions: Map(),
    departures:  Map(),
    cities:      Map(),
    hotels:      Map(),
    operators:   Map(),
    statuses:    Map(),
    flightPorts: {},
});

export const geoReducer = handleActions(
    {
        [geoActions.getSuggestsSuccess]: (state, { payload: { key, suggestions }}) => {
            return state.setIn(['suggestions', key], Map(suggestions));
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
        [geoActions.getHotelsSuccess]: (state, { payload: { countryId, hotels }}) => {
            return state.setIn(['hotels', countryId], List(hotels));
        },
        [geoActions.getOperatorsSuccess]: (state, { payload: { countryId, operators }}) => {
            return state.setIn(['operators', countryId], operators);
        },
        [geoActions.getGeoTreeSuccess]: (state, { payload: { geoTree }}) => {
            return state.set('geoTree', geoTree);
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
