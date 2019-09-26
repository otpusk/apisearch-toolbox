// Core
import { handleActions, combineActions } from 'redux-actions';
import { Map } from 'immutable';

// Instruments
import { actions } from './actions';

const initialState = Map({
    statuses: {},
    queries:  {},
    results:  {},
});

export const reducer = handleActions({
    [combineActions(actions.createQuery, actions.setQuery)]: (state, { payload: { queryId, query }}) => {
        return state.setIn(['queries', queryId], query);
    },
    [actions.runSearch]: (state, { payload: queryId }) => {
        return state.setIn(['statuses', queryId], 'process');
    },
    [actions.processSearch]: (state, { payload: { queryId, tours }}) => {
        return state.setIn(['results', queryId], tours);
    },
    [actions.finishSearch]: (state, { payload: queryId }) => {
        return state.setIn(['statuses', queryId], 'success');
    },
    [actions.failSearch]: (state, { payload: queryId }) => {
        return state.setIn(['statuses', queryId], 'failed');
    },
}, initialState);
