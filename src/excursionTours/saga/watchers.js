// Core
import { takeEvery } from 'redux-saga/effects';

// Instruments
import { actions } from '../actions';
import { getTourWorker } from './workers/getTourWorker';
import { getTourPageWorker } from './workers/getTourPageWorker';

export const watchers = Object.freeze({
    * getTourWatcher () {
        yield takeEvery(actions.getTour, getTourWorker);
    },
    * getTourPageWatcher () {
        yield takeEvery(actions.getTourPage, getTourPageWorker);
    },
});
