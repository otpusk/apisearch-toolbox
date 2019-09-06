// Core
import { takeEvery } from 'redux-saga/effects';

// Instruments
import { servicesActions } from '../actions';
import { getServicesWorker } from './workers/getServicesWorker';

export const servicesWatchers = Object.freeze({
    *  getServicesWatcher () {
        yield takeEvery(servicesActions.getServices, getServicesWorker);
    },
});
