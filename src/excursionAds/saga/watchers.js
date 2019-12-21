// Core
import { takeEvery } from 'redux-saga/effects';

// Instruments
import { actions } from '../actions';
import { getAgenciesWorker } from './workers/getAgenciesWorker';

export const watchers = Object.freeze({
    * getOfficesWatcher () {
        yield takeEvery(actions.getOffices, getAgenciesWorker);
    },
    * getRegionsWatcher () {
        yield takeEvery(actions.getRegions, getAgenciesWorker);
    },
});
