// Core
import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

// Instruments
import { actions } from './actions';

const initialState = Map({
    offices: {},
});

export const reducer = handleActions({
    [actions.getOfficesSuccess]: (state, { payload: { tourId, offices }}) => {
        return state.setIn(['offices', tourId], offices);
    },
    [actions.getRegionsSuccess]: (state, { payload: regions }) => {
        return state.set('regions', regions);
    },
}, initialState);
