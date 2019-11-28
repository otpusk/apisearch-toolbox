// Core
import { call, put } from 'redux-saga/effects';

// Instruments
import { actions } from '../../actions';
import { getExcursion } from '@otpusk/excursion-api';

export function* getTourWorker ({ payload: tourId }) {
    try {
        const tour = yield call(getExcursion, tourId);

        yield put(actions.getTourSuccess(tourId, tour));
    } catch (error) {
        yield put(actions.getTourFail(error));
    }
}
