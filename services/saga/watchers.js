// Core
import { takeLeading } from 'redux-saga/effects';

// Instruments
import { servicesActions } from '../actions';
import { getServicesWorker } from './workers/getServicesWorker';

export const servicesWatchers = Object.freeze({
    *  getServicesWatcher () {
        yield takeLeading(servicesActions.getServices, getServicesWorker);
    },
});
