import { takeEvery } from 'redux-saga/effects';

// actions
import { operatorsActions as actions } from './../actions';
import { getOperatorsWorker } from './workers';

export const operatorsWatchers = Object.freeze({
    * getOperators () {
        yield takeEvery(actions.getOperators, getOperatorsWorker);
    },
});
