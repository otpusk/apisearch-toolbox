// Core
import { takeEvery } from 'redux-saga/effects';

// Instruments
import { excursionsActions as actions } from '../actions';
import { getExcursionWorker } from './workers/getExcursionWorker';

export const excursionsWatchers = Object.freeze({
    * getExcursionWatcher () {
        yield takeEvery(actions.getExcursion, getExcursionWorker);
    },
});
