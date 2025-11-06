import { put, call, select } from 'redux-saga/effects';
import {
    getFilterTransport,
    getFilterCategories,
    getFilterOperators,
    getFilterPrice
} from '@otpusk/excursion-api';

import { getLansAsQuery } from '../../../auth/selectors';
import { actions } from '../../actions';

export function* getSearchOperatorsWorker () {
    try {
        const langAsQuery = yield select(getLansAsQuery);
        const operators = yield call(getFilterOperators, langAsQuery);

        yield put(actions.getSearchOperatorsSuccess(0, operators));
    } catch (error) {
        yield put(actions.getSearchOperatorsFail(error));
    }
}

export function* getSearchTransportsWorker () {
    try {
        const langAsQuery = yield select(getLansAsQuery);
        const transports = yield call(getFilterTransport, langAsQuery);

        yield put(actions.getSearchTransportsSuccess(0, transports));
    } catch (error) {
        yield put(actions.getSearchTransportsFail(error));
    }
}

export function* getSearchCategoriesWorker () {
    try {
        const langAsQuery = yield select(getLansAsQuery);
        const categories = yield call(getFilterCategories, langAsQuery);

        yield put(actions.getSearchCategoriesSuccess(0, categories));
    } catch (error) {
        yield put(actions.getSearchCategoriesFail(error));
    }
}

export function* getSearchPricesWorker () {
    try {
        const langAsQuery = yield select(getLansAsQuery);
        const prices = yield call(getFilterPrice, langAsQuery);

        yield put(actions.getSearchPricesSuccess(0, prices));
    } catch (error) {
        yield put(actions.getSearchPricesFail(error));
    }
}
