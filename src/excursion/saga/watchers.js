// Core
import { takeEvery } from 'redux-saga/effects';

// Instruments
import { actions } from '../actions';
import { getMainpageWorker } from './workers/getMainPageWorker';
import { getCountriesWorker } from './workers/getCountriesWorker';
import { getExcursionWorker } from './workers/getExcursionWorker';

export const watchers = Object.freeze({
    * getMainpageWatcher () {
        yield takeEvery(actions.getMainpage, getMainpageWorker);
    },
    * getCountriesWatcher () {
        yield takeEvery(actions.getCountries, getCountriesWorker);
    },
    * getExcursionWatcher () {
        yield takeEvery(actions.getExcursion, getExcursionWorker);
    }
});
