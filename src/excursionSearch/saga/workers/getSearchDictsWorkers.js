// Core
import { put, call } from 'redux-saga/effects';

// Instruments
import { actions } from '../../actions';
import { getFilterTransport, getFilterCategories, getFilterOperators } from '@otpusk/excursion-api';

export function* getSearchOperatorsWorker () {
    try {
        const operators = yield call(getFilterOperators);

        yield put(actions.getSearchOperatorsSuccess(operators));
    } catch (error) {
        yield put(actions.getSearchOperatorsFail(error));
    }
}

export function* getSearchTransportWorker () {
    try {
        const transport = yield call(getFilterTransport);

        yield put(actions.getSearchTransportSuccess(transport));
    } catch (error) {
        yield put(actions.getSearchTransportFail(error));
    }
}

export function* getSearchCategoriesWorker () {
    try {
        const categories = yield call(getFilterCategories);

        yield put(actions.getSearchCategoriesSuccess(categories));
    } catch (error) {
        yield put(actions.getSearchCategoriesFail(error));
    }
}
