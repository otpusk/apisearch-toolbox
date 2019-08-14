// Core
import { takeEvery } from 'redux-saga/effects';

// Instruments
import { queriesActions } from '../actions';
import {
    compileQueryStringWorker,
    parseQueryStringWorker,
    parseQueryParamWorker
} from './workers';

export const queriesWatchers = Object.freeze({
    *  compileQueryStringWatcher () {
        yield takeEvery(queriesActions.compileQueryString, compileQueryStringWorker);
    },
    * parseQueryStringWatcher () {
        yield takeEvery(queriesActions.parseQueryString, parseQueryStringWorker);
    },
});
