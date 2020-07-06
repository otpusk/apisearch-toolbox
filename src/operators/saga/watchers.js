import { takeEvery } from 'redux-saga/effects';

// actions
import { operatorsActions as actions } from './../actions';
import { getOperatorsWorker, getCurrencyRatesWorker } from './workers';

export const operatorsWatchers = Object.freeze({
    * getOperators () {
        yield takeEvery(actions.getOperators, getOperatorsWorker);
    },
    * getCurrencyRates () {
        yield takeEvery(actions.getCurrencyRates, getCurrencyRatesWorker);
    },
});
