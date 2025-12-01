import { Map } from 'immutable';
import { handleActions } from 'redux-actions';
import * as R from 'ramda';

import { searchActions as actions } from './actions';
import { createResultBones } from '../queries/fn';

const initialState = Map({
    results:        Map(),
    charts:         Map(),
    availableDates: {},
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
        [actions.processSearch]: (state, { payload: { operators, queryId, country, total, page, prices, meta }}) => {
            return state
                .mergeDeepIn(['results', queryId], Map({
                    total: total ? total : state.getIn(['results', queryId, 'total']),
                    meta:  meta ? meta : state.getIn(['results', queryId, 'meta']),
                }))
                .updateIn(['results', queryId, 'country'], (value) => value ? value : country)
                .updateIn(['results', queryId, 'operators'], (prevOperators = {}) => R.mergeAll([
                    prevOperators, operators
                ]))
                .updateIn(['results', queryId, 'prices'], (prevPrices = []) => {
                    return R.call(
                        R.pipe(
                            R.clone,
                            (items) => {
                                items[R.dec(page)] = prices;

                                return items;
                            }
                        ),
                        prevPrices
                    );
                });
        },
        [actions.finishSearch]: (state, { payload: { queryId, total }}) => {
            return state
                .setIn(['results', queryId, 'status'], 'done')
                .setIn(['results', queryId, 'total'], total);
        },
        [actions.patchSearch]: (state, { payload: { queryId, key, patch }}) => {
            return state.setIn(['results', queryId, key], patch);
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
        [actions.getAvailableDatesSuccess]: (state, { payload }) => {
            const { key, dates } = payload;

            return state.setIn(['availableDates', key], dates);
        },
    },
    initialState
);
