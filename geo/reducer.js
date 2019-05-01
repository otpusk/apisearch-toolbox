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
});

export const geoReducer = handleActions(
    {
        [geoActions.getSuggestsSuccess]: (state, { payload: { key, suggestions }}) => {
            return state.setIn(['suggestions', key], Map(suggestions));
        },
        [geoActions.getCountriesSuccess]: (state, { payload: countries }) => {
            return state.set('countries', List(countries));
        },
        [geoActions.getDepartureCitiesSuccess]: (state, { payload: { countryId, departures }}) => {
            return state.setIn(['departures', countryId], List(departures));
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
    },
    initalState
);
