// Core
import { takeEvery } from 'redux-saga/effects';

// Instruments
import { actions } from '../actions';
import { runSearchWorker } from './workers/runSearchWorker';
import {
    getSearchOperatorsWorker,
    getSearchTransportsWorker,
    getSearchCategoriesWorker,
} from './workers/getSearchDictsWorkers';

import { getSearchCountWorker } from './workers/getSearchCountWorker';

export const watchers = Object.freeze({
    * runSearchWatcher () {
        yield takeEvery(actions.runSearch, runSearchWorker);
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
    * getSearchCountWatcher () {
        yield takeEvery(actions.getExcursionsCount, getSearchCountWorker);
    },
});
