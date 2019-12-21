// Core
import { takeEvery } from 'redux-saga/effects';

// Instruments
import { actions } from '../actions';
import { getOfficesWorker } from './workers/getOfficesWorker';
import { getRegionsWorker } from './workers/getRegionsWorker';

export const watchers = Object.freeze({
    * getOfficesWatcher () {
        yield takeEvery(actions.getOffices, getOfficesWorker);
    },
    * getRegionsWatcher () {
        yield takeEvery(actions.getRegions, getRegionsWorker);
    },
});
