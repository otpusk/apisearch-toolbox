import { call, put, select } from 'redux-saga/effects';
import { getExcursion } from '@otpusk/excursion-api';

import { getLansAsQuery } from '../../../auth/selectors';
import { actions } from '../../actions';

export function* getTourWorker ({ payload: tourId }) {
    const langAsQuery = yield select(getLansAsQuery);

    try {
        const tour = yield call(getExcursion, tourId, langAsQuery);

        yield put(actions.getTourSuccess(tourId, tour));
    } catch (error) {
        yield put(actions.getTourFail(error));
    }
}
