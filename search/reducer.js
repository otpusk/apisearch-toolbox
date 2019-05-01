// Core
import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

// Instruments
import { searchActions as actions } from './actions';
import { createResultBones } from 'helpers/query';

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
                .setIn(['results', queryId, 'operators'], Map())
                .setIn(['results', queryId, 'status'], 'starting')
                .removeIn(['charts', queryId]);
        },
        [actions.processSearch]: (state, { payload: { hotels, operators, queryId, country, total, page }}) => {
            return state
                .mergeIn(['results', queryId], Map({
                    operators,
                    country: country ? country : state.getIn([queryId, 'country']),
                    total:   total ? total : state.getIn(['results', queryId, 'total']),
                    status:  'processing',
                }))
                .setIn(['results', queryId, 'hotels', page], hotels);
        },
        [actions.finishSearch]: (state, { payload: queryId }) => {
            return state.setIn(['results', queryId, 'status'], 'done');
        },
        [actions.failSearch]: (state, { payload: { queryId }}) => {
            return state.setIn(['results', queryId, 'status'], 'failed');
        },
        [actions.getPriceChartSuccess]: (state, { payload: { queryId, chart }}) => {
            return state.setIn(['charts', queryId], chart);
        },
    },
    initialState
);
