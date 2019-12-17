// Core
import { takeEvery } from 'redux-saga/effects';

// Instruments
import { actions } from '../actions';
import { getTourWorker } from './workers/getTourWorker';
import { getAgenciesWorker } from './workers/getAgenciesWorker';

export const watchers = Object.freeze({
    * getExcursionWatcher () {
        yield takeEvery(actions.getTour, getTourWorker);
    },
    * getAgenciesWatcher () {
        yield takeEvery(actions.getAgencies, getAgenciesWorker);
    },
});
