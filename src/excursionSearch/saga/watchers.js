// Core
import { takeEvery } from 'redux-saga/effects';

// Instruments
import { actions } from '../actions';
import { runSearchWorker } from './workers/runSearchWorker';
import { getSearchOperatorsWorker, getSearchTransportWorker, getSearchCategoriesWorker } from './workers/getSearchDictsWorkers';

export const watchers = Object.freeze({
    * runSearchWatcher () {
        yield takeEvery(actions.runSearch, runSearchWorker);
    },
    * getSearchOperatorsWatcher () {
        yield takeEvery(actions.getSearchOperators, getSearchOperatorsWorker);
    },
    * getSearchTransportWatcher () {
        yield takeEvery(actions.getSearchTransport, getSearchTransportWorker);
    },
    * getSearchCategoriesWatcher () {
        yield takeEvery(actions.getSearchCategories, getSearchCategoriesWorker);
    },
});
