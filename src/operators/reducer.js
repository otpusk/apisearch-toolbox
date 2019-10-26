import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

// actions
import { operatorsActions as actions } from './actions';

const initialState = Map({
    operators: Map(),
    ui:        Map(),
});

export const operatorsReducer = handleActions({
    [actions.getOperatorsSuccess]: (state, { payload }) => {
        const { countryId, operators } = payload;

        return state.setIn(['operators', countryId], operators);
    },
    [actions.setUiFlag]: (state, { payload }) => {
        const { path, value } = payload;

        return state.setIn(['ui', ...path], value);
    },
}, initialState);
