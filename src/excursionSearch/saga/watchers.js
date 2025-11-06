// Core
import { takeEvery } from 'redux-saga/effects';

// Instruments
import { actions } from '../actions';
import { runSearchWorker } from './workers/runSearchWorker';
import {
    getSearchOperatorsWorker,
    getSearchTransportsWorker,
    getSearchCategoriesWorker,
    getSearchPricesWorker
} from './workers/getSearchDictsWorkers';

export const watchers = Object.freeze({
    * runSearchWatcher () {
        yield takeEvery([actions.runSearch, actions.runNextPageSearch], runSearchWorker);
    },
    * getSearchOperatorsWatcher () {
        yield takeEvery(actions.getSearchOperators, getSearchOperatorsWorker);
    },
    * getSearchTransportsWatcher () {
        yield takeEvery(actions.getSearchTransports, getSearchTransportsWorker);
    },
    * getSearchCategoriesWatcher () {
        yield takeEvery(actions.getSearchCategories, getSearchCategoriesWorker);
    },
    * getSearchPricesWatcher () {
        yield takeEvery(actions.getSearchPrices, getSearchPricesWorker);
    },
});
