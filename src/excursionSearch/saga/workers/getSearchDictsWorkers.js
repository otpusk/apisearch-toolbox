// Core
import { put, call } from 'redux-saga/effects';

// Instruments
import { actions } from '../../actions';
import { getFilterTransport, getFilterCategories, getFilterOperators, getFilterPrice } from '@otpusk/excursion-api';

export function* getSearchOperatorsWorker () {
    try {
        const operators = yield call(getFilterOperators);

        yield put(actions.getSearchOperatorsSuccess(0, operators));
    } catch (error) {
        yield put(actions.getSearchOperatorsFail(error));
    }
}

export function* getSearchTransportsWorker () {
    try {
        const transports = yield call(getFilterTransport);

        yield put(actions.getSearchTransportsSuccess(0, transports));
    } catch (error) {
        yield put(actions.getSearchTransportsFail(error));
    }
}

export function* getSearchCategoriesWorker () {
    try {
        const categories = yield call(getFilterCategories);

        yield put(actions.getSearchCategoriesSuccess(0, categories));
    } catch (error) {
        yield put(actions.getSearchCategoriesFail(error));
    }
}

export function* getSearchPricesWorker () {
    try {
        const prices = yield call(getFilterPrice);

        yield put(actions.getSearchPricesSuccess(0, prices));
    } catch (error) {
        yield put(actions.getSearchPricesFail(error));
    }
}
