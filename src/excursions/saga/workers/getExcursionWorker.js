// Core
import { call, put } from 'redux-saga/effects';

// Instruments
import { excursionsActions as actions } from '../../actions';
import { getExcursion } from '@otpusk/excursion-api';

export function* getExcursionWorker({ payload: { excursion } }) {
    try {
        const excursionData = yield call(getExcursion, excursion);

        yield put(actions.getExcursionSuccess(excursion, excursionData));
    } catch (error) {
        yield put(actions.getExcursionFail(error));
    }
}
