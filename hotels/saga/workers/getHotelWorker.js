// Core
import { call, put, select } from 'redux-saga/effects';

// Instruments
import { hotelsActions } from '../../actions';
import { getToursHotel } from '@otpusk/json-api';

export function* getHotelWorker ({ payload: hotelId }) {
    try {
        const token = yield select((state) => state.auth.getIn(['otpusk', 'token']));
        const { hotel } = yield call(getToursHotel, token, hotelId);

        yield put(hotelsActions.getHotelSuccess(hotel));
    } catch (error) {
        yield put(hotelsActions.getHotelFail(error));
    }
}
