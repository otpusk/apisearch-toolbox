// Core
import { handleActions, combineActions } from 'redux-actions';
import { Map } from 'immutable';

// Instruments
import { actions } from './actions';

const initialState = Map();

export const reducer = handleActions({
    [combineActions(actions.createQuery, actions.setQuery)]: (state, { payload: { queryId, query }}) => {
        return state.setIn(['queries', queryId], query);
    },
}, initialState);
