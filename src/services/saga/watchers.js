import { takeEvery } from 'redux-saga/effects';

import { servicesActions } from '../actions';
import { getServicesWorker } from './workers/getServicesWorker';

export const servicesWatchers = Object.freeze({
    *  getServicesWatcher () {
        yield takeEvery([servicesActions.getServices, servicesActions.getAllServices], getServicesWorker);
    },
});
