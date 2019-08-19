// Core
import { call, put } from 'redux-saga/effects';

// Instruments
import { actions } from '../../actions';
import { getMainpage } from '@otpusk/excursion-api';

export function* getMainpageWorker () {
    try {
        const categories = yield call(getMainpage);

        yield put(actions.getMainpageSuccess(categories));
    } catch (error) {
        yield put(actions.getMainpageFail(error));
    }
}
