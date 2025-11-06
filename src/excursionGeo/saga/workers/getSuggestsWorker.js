import { call, put, select } from 'redux-saga/effects';
import { getSuggest } from '@otpusk/excursion-api';

import { getLansAsQuery } from '../../../auth/selectors';
import { actions } from '../../actions';

export function* getSuggestsWorker ({ payload: word }) {
    try {
        const langAsQuery = yield select(getLansAsQuery);
        const suggestions = yield call(getSuggest, {
            ...langAsQuery,
            word,
        });

        yield put(actions.getSuggestsSuccess(word, suggestions));
    } catch (error) {
        yield put(actions.getSuggestsFail(error));
    }
}
