import { Map, List } from 'immutable';
import { handleActions } from 'redux-actions';
import * as R from 'ramda';

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
        [actions.processSearch]: (state, { payload: { hotels, operators, queryId, country, total, page, prices, meta }}) => {
            return state
                .mergeDeepIn(['results', queryId], Map({
                    total: total ? total : state.getIn(['results', queryId, 'total']),
                    meta,
                }))
                .updateIn(['results', queryId, 'country'], (value) => value ? value : country)
                .setIn(['results', queryId, 'hotels', page], hotels)
                .updateIn(['results', queryId, 'operators'], (prevOperators = {}) => R.mergeAll([
                    prevOperators, operators
                ]))
                .updateIn(['results', queryId, 'prices'], (prevPrices = []) => R.isEmpty(prices)
                    ? prevPrices
                    : R.call(
                        R.pipe(
                            R.clone,
                            (items) => (items[R.dec(page)] = prices, items)
                        ),
                        prevPrices
                    )
                );
        },
        [actions.finishSearch]: (state, { payload: { queryId, total }}) => {
            return state
                .setIn(['results', queryId, 'status'], 'done')
                .setIn(['results', queryId, 'total'], total);
        },
        [actions.failSearch]: (state, { payload: queryId }) => {
            return state.setIn(['results', queryId, 'status'], 'failed');
        },
        [actions.clearSearch]: (state, { payload: queryId }) => {
            return state
                .removeIn(['results', queryId])
                .removeIn(['charts', queryId]);
        },
        [actions.setFailSearchError]: (state, { payload: { queryId, error }}) => {
            return state.setIn(['results', queryId, 'error'], error);
        },
        [actions.setSearchStatus]: (state, { payload: { queryID, status }}) => {
            return state.setIn(['results', queryID, 'status'], status);
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
