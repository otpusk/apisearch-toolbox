// Core
import { takeEvery } from 'redux-saga/effects';

// Instruments
import { actions } from '../actions';
import { getTourWorker } from './workers/getTourWorker';
import { getTourPageWorker } from './workers/getTourPageWorker';

export const watchers = Object.freeze({
    * getTour () {
        yield takeEvery(actions.getTour, getTourWorker);
    },
    * getTourPage () {
        yield takeEvery(actions.getTourPage, getTourPageWorker);
    },
});
