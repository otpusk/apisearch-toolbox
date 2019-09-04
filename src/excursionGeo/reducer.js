// Core
import { Map } from 'immutable';
import { handleActions } from 'redux-actions';
import { actions } from './actions';

const initialState = Map({
    suggests:   Map(),
    departures: Map(),
});

export const reducer = handleActions({
    [actions.getSuggestsSuccess]: (state, { payload: { key, suggestions }}) => {
        return state.setIn(['suggests', key], suggestions);
    },
    [actions.getDepartureCitiesSuccess]: (state, { payload: { countryId, cities }}) => {
        return state.setIn(['departures', countryId], cities);
    },
}, initialState);
