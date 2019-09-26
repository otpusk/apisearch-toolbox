// Core
import { takeEvery } from 'redux-saga/effects';

// Instruments
import { actions } from '../actions';
import { runSearchWorker } from './workers/runSearchWorker';

export const watchers = Object.freeze({
    * runSearchWatcher () {
        yield takeEvery(actions.runSearch, runSearchWorker);
    },
});
