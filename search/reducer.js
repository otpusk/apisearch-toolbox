// Core
import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

// Instruments
import { searchActions as actions } from './actions';
import { createResultBones } from '../queries/fn';

const initialState = Map({
    results: Map(),
    charts:  Map(),
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
        [actions.processSearch]: (state, { payload: { hotels, operators, queryId, country, total, page, meta } }) => {
            return state
                .mergeIn(['results', queryId], Map({
                    operators,
                    total:   total ? total : state.getIn(['results', queryId, 'total']),
                    status: 'processing',
                    meta,
                }))
                .updateIn(['results', queryId, 'country'], (value) => value ? value : country)
                .setIn(['results', queryId, 'hotels', page], hotels);
        },
        [actions.finishSearch]: (state, { payload: queryId }) => {
            return state.setIn(['results', queryId, 'status'], 'done');
        },
        [actions.failSearch]: (state, { payload: queryId }) => {
            return state.setIn(['results', queryId, 'status'], 'failed');
        },
        [actions.getPriceChartSuccess]: (state, { payload: { queryId, chart }}) => {
            return state.setIn(['charts', queryId], chart);
        },
    },
    initialState
);
