import { call, put, select } from 'redux-saga/effects';
import { getMainpage } from '@otpusk/excursion-api';

import { actions } from '../../actions';
import { getLansAsQuery } from '../../../auth/selectors';

export function* getMainpageWorker () {
    try {
        const langAsQuery = yield select(getLansAsQuery);
        const categories = yield call(getMainpage, langAsQuery);

        yield put(actions.getMainpageSuccess(categories));
    } catch (error) {
        yield put(actions.getMainpageFail(error));
    }
}
