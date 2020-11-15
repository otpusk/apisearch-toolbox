// Core
import { take, fork, race, takeEvery, cancel } from 'redux-saga/effects';
import * as R from 'ramda';

// Instruments
import { searchActions as actions } from '../actions';
import { runSearchWorker, submitSearchWorker, getPriceChartWorker, getAvailableDatesWorker } from './workers';

export const searchWatchers =  Object.freeze({
    * runSearchWatcher () {
        yield takeEvery(actions.runSearch, function* (actionArgs) {
            const searchTask = yield fork(runSearchWorker, actionArgs);

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
    * submitSearchWatcher () {
        yield takeEvery(actions.submitSearch, submitSearchWorker);
    },
    * getPriceChartWatcher () {
        yield takeEvery(actions.getPriceChart, getPriceChartWorker);
    },
    * getAvailableDatesWorker () {
        yield takeEvery(actions.getAvailableDates, getAvailableDatesWorker);
    },
});
