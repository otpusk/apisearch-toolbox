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

import { getSearchCountWorker } from './workers/getSearchCountWorker';

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
    * getSearchCountWatcher () {
        yield takeEvery(actions.getExcursionsCount, getSearchCountWorker);
    },
});
