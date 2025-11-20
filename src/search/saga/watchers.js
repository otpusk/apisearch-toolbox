import { take, fork, race, takeEvery, cancel } from 'redux-saga/effects';
import * as R from 'ramda';

import { memoryInstances } from './workers/getResultsWorker/resultsMemory';
import { searchActions as actions } from '../actions';
import {
    getResultsWorker,
    getPriceChartWorker,
    getAvailableDatesWorker,
    silentSearchWorker
} from './workers';

export const searchWatchers =  Object.freeze({
    * runSearchWatcher () {
        yield takeEvery(actions.getResults, function* (actionArgs) {
            const searchTask = yield fork(getResultsWorker, actionArgs);

            const { payload: queryId } = actionArgs;

            const [cancelledTask] = yield race([
                take((action) => R.and(
                    R.equals(action.type, actions.cancelledSearch.toString()),
                    R.equals(action.payload, queryId)
                )),
                take((action) => R.and(
                    R.equals(action.type, actions.finishSearch.toString()),
                    R.equals(R.prop('queryId', action.payload), queryId)
                )),
                take((action) => R.and(
                    R.equals(action.type, actions.failSearch.toString()),
                    R.equals(action.payload, queryId)
                ))
            ]);

            cancelledTask && (yield cancel(searchTask));
        });
    },
    * getPriceChartWatcher () {
        yield takeEvery(actions.getPriceChart, getPriceChartWorker);
    },
    * getAvailableDatesWorker () {
        yield takeEvery(actions.getAvailableDates, getAvailableDatesWorker);
    },
    * clearSearchWorker () {
        yield takeEvery(actions.clearSearch, ({ payload: queryID }) => {
            delete memoryInstances[queryID];
        });
    },
    * searchByOperatorsWatcher () {
        yield takeEvery(actions.silentSearch, silentSearchWorker);
    },
});
