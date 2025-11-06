// Core
import { handleActions, combineActions } from 'redux-actions';
import { Map } from 'immutable';

// Instruments
import { actions } from './actions';

const initialState = Map({
    statuses:  {},
    queries:   {},
    results:   {},
    operators: {},
});

export const reducer = handleActions({
    [combineActions(actions.createQuery, actions.setQuery)]: (state, { payload: { queryId, query }}) => {
        return state.setIn(['queries', queryId], query);
    },
    [actions.runSearch]: (state, { payload: { queryId }}) => {
        return state
            .removeIn(['results', queryId])
            .setIn(['statuses', queryId], 'process');
    },
    [actions.runNextPageSearch]: (state, { payload: { queryId }}) => {
        return state.setIn(['statuses', queryId], 'process');
    },
    [actions.processSearch]: (state, { payload: { queryId, page, tours }}) => {
        return state.setIn(['results', queryId, page], tours);
    },
    [actions.finishSearch]: (state, { payload: queryId }) => {
        return state.setIn(['statuses', queryId], 'success');
    },
    [actions.failSearch]: (state, { payload: queryId }) => {
        return state.setIn(['statuses', queryId], 'failed');
    },
    [actions.getSearchCategoriesSuccess]: (state, { payload: { key, categories }}) => {
        return state.setIn(['categories', key], categories);
    },
    [actions.getSearchOperatorsSuccess]: (state, { payload: { key, operators }}) => {
        return state.setIn(['operators', key], operators);
    },
    [actions.getSearchTransportsSuccess]: (state, { payload: { key, transports }}) => {
        return state.setIn(['transports', key], transports);
    },
    [actions.getSearchPricesSuccess]: (state, { payload : { key, prices }}) => {
        return state.setIn(['prices', key], prices);
    },
}, initialState);
