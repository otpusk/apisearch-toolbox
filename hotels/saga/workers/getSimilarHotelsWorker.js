// Core
import { call, put, select } from 'redux-saga/effects';

// Instruments
import { hotelsActions as actions } from '/hotels/actions';
import { getToursSimilar } from '@otpusk/json-api';

export function* getSimilarHotelsWorker ({ payload: hotelId }) {
    try {
        const token = yield select((state) => state.auth.getIn(['otpusk', 'token']));
        const similar = yield call(getToursSimilar, token, hotelId, 9);

        yield put(actions.getSimilarHotelsSuccess(hotelId, similar));
    } catch (error) {
        yield put(actions.getSimilarHotelsFail(error));
    }
}
