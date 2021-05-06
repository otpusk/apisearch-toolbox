// Core
import { Map, List } from 'immutable';
import { handleActions } from 'redux-actions';

// Instruments
import { searchActions as actions } from './actions';
import { createResultBones } from '../queries/fn';

const initialState = Map({
    results: Map(),
    charts:  Map(),
    dates:   List(),
});

export const searchReducer = handleActions(
    {
        [actions.resetSearch]: (state, { payload: queryId }) => {
            return state
                .setIn(['results', queryId], createResultBones())
                .removeIn(['charts', queryId]);

        },
        [actions.startSearch]: (state, { payload: queryId }) => {
            return state
                .setIn(['results', queryId, 'operators'], {})
                .setIn(['results', queryId, 'status'], 'starting')
                .removeIn(['charts', queryId]);
        },
        [actions.processSearch]: (state, { payload: { hotels, operators, queryId, country, total, page, meta }}) => {
            return state
                .mergeIn(['results', queryId], Map({
                    operators,
                    total:  total ? total : state.getIn(['results', queryId, 'total']),
                    status: 'processing',
                    meta,
                }))
                .updateIn(['results', queryId, 'country'], (value) => value ? value : country)
                .setIn(['results', queryId, 'hotels', page], hotels);
        },
        [actions.finishSearch]: (state, { payload: { queryId, total }}) => {
            return state
                .setIn(['results', queryId, 'status'], 'done')
                .setIn(['results', queryId, 'total'], total);
        },
        [actions.failSearch]: (state, { payload: queryId }) => {
            return state.setIn(['results', queryId, 'status'], 'failed');
        },
        [actions.setFailSearchError]: (state, { payload: { queryId, error }}) => {
            return state.setIn(['results', queryId, 'error'], error);
        },
        [actions.getPriceChartSuccess]: (state, { payload: { queryId, chart }}) => {
            return state.setIn(['charts', queryId], chart);
        },
        [actions.getAvailableDatesSuccess]: (state, { payload: { dates }}) => {
            return state.set('dates', dates);
        },
    },
    initialState
);
