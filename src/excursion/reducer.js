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
    [actions.getMainpageFail]: (state) => {
        return state.set('mainpage', []);
    },
    [actions.getCountriesSuccess]: (state, { payload: countries }) => {
        return state.set('countries', countries);
    },
    [actions.getCountriesFail]: (state) => {
        return state.set('countries', []);
    },
}, initialState);
