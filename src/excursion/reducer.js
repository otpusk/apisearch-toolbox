// Core
import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

// Instruments
import { actions } from './actions';

const initialState = Map();

export const reducer = handleActions({
    [actions.getMainpageSuccess]: (state, { payload: categories }) => {
        return state.set('mainpage', categories);
    },
    [actions.getCountriesSuccess]: (state, { payload: countries }) => {
        return state.set('countries', countries);
    },
}, initialState);
