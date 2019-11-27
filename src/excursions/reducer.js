// Core
import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

// Instruments
import { excursionsActions as actions } from './actions';

const initialState = Map();

export const excursionsReducer = handleActions({
    [actions.getExcursionSuccess]: (state, { payload: { excursion, excursionData } }) => {
        return state.set(excursion, excursionData);
    }
}, initialState);
