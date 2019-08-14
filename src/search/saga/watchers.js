// Core
import { takeEvery } from 'redux-saga/effects';

// Instruments
import { searchActions as actions } from '../actions';
import { runSearchWorker, submitSearchWorker, getPriceChartWorker } from './workers';

export const searchWatchers =  Object.freeze({
    * runSearchWatcher () {
        yield takeEvery(actions.runSearch, runSearchWorker);
    },
    * submitSearchWatcher () {
        yield takeEvery(actions.submitSearch, submitSearchWorker);
    },
    * getPriceChartWatcher () {
        yield takeEvery(actions.getPriceChart, getPriceChartWorker);
    },
});
