// Core
import { call, put, select } from 'redux-saga/effects';

// Instruments
import { hotelsActions } from '../../actions';
import { getToursHotel } from '@otpusk/json-api';

export function* getHotelWorker ({ payload: hotelId }) {
    try {
        const { token, lang } = yield select(({ auth }) => ({
            token: auth.getIn(['otpusk', 'token']),
            lang: auth.getIn(['otpusk', 'lang'], 'ru'),
        }));
        const { hotel } = yield call(getToursHotel, token, hotelId, lang);

        yield put(hotelsActions.getHotelSuccess(hotel));
    } catch (error) {
        yield put(hotelsActions.getHotelFail(error));
    }
}
