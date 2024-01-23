import { takeEvery } from 'redux-saga/effects';

import { servicesActions } from '../actions';
import { getServicesWorker } from './workers/getServicesWorker';
import { getBookingServicesWorker } from './workers/getBookingServicesWorker';

export const servicesWatchers = Object.freeze({
    * getServicesWatcher () {
        yield takeEvery([servicesActions.getServices, servicesActions.getAllServices], getServicesWorker);
    },
    * getBookingServicesWatcher () {
        yield takeEvery(servicesActions.getBookingServices, getBookingServicesWorker);
    },
});
