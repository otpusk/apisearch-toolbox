// Core
import { takeEvery } from 'redux-saga/effects';

// Instruments
import { actions } from '../actions';
import { getSuggestsWorker } from './workers/getSuggestsWorker';
import { getDepartureCitiesWorker } from './workers/getDepartureCitiesWorker';

export const watchers = Object.freeze({
    * getSuggestsWatcher () {
        yield takeEvery(actions.getSuggests, getSuggestsWorker);
    },
    * getDepartureCitiesWatcher () {
        yield takeEvery(actions.getDepartureCities, getDepartureCitiesWorker);
    },
});
