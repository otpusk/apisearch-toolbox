// Core
import { handleActions } from 'redux-actions';

// Instruments
import { geoActions } from './actions';
import { setIn, removeIn } from './helpers';

const initalState = {
    countries:   [],
    suggestions: {},
    departures:  {},
    cities:      {},
    hotels:      {},
    operators:   {},
    statuses:    {},
    flightPorts: {},
};

export const geoReducer = handleActions(
    {
        [geoActions.getCountriesSuccess]: (state, { payload: countries }) => {
            return setIn(
                setIn(state, ['countries'], countries),
                ['statuses', 'countries'],
                'loaded'
            );
        },
        [geoActions.getCountriesFail]: (state) => {
            return setIn(state, ['statuses', 'countries'], 'failed');
        },
        [geoActions.getDepartureCitiesSuccess]: (state, { payload: { key, departures }}) => {
            return setIn(state, ['departures', key], departures);
        },
        [geoActions.getCitiesSuccess]: (state, { payload: { countryId, cities }}) => {
            return setIn(state, ['cities', countryId], cities);
        },
        [geoActions.getHotelsSuccess]: (state, { payload: { hotels, key }}) => {
            return setIn(state, ['hotels', key], hotels);
        },
        [geoActions.removeHotels]: (state, { payload: key }) => {
            return removeIn(state, ['hotels', key]);
        },
        [geoActions.getOperatorsSuccess]: (state, { payload: { key, operators }}) => {
            return setIn(state, ['operators', key], operators);
        },
        [geoActions.getGeoTreeSuccess]: (state, { payload: { geoTree }}) => {
            return setIn(state, ['geoTree'], geoTree);
        },
        [geoActions.getLocationDataSuccess]: (state, { payload : { id, data }}) => {
            return setIn(state, ['locations', id], data);
        },
        [geoActions.getFlightPortSuccess]: (state, { payload: { key, port }}) => {
            return setIn(state, ['flightPorts', key], port);
        },
    },
    initalState
);
