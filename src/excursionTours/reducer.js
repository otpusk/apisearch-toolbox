// Core
import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

// Instruments
import { actions } from './actions';

const initialState = Map({
    store: {},
});

export const reducer = handleActions({
    [actions.getTourSuccess]: (state, { payload: { tourId, tour }}) => {
        return state.setIn(['store', tourId], tour);
    },
    [actions.getAgenciesSuccess]: (state, { payload: { tourId, agencies } }) => {
        return state.setIn(['store', tourId, 'agencies'], agencies);
    },
}, initialState);
