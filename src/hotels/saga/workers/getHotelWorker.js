import { call, put, select } from 'redux-saga/effects';
import { getToursHotel } from '@otpusk/json-api';
import * as R from 'ramda';

import { hotelsActions } from '../../actions';

export function* getHotelWorker ({ payload: { hotelId, customLang }}) {
    try {
        const { token, lang } = yield select(({ auth }) => ({
            token: auth.getIn(['otpusk', 'token']),
            lang:  auth.getIn(['otpusk', 'lang'], 'ru'),
        }));
        const { hotel } = yield call(
            getToursHotel,
            R.mergeAll([
                token,
                { data: 'extlinks' }
            ]),
            hotelId,
            customLang || lang
        );

        yield put(hotelsActions.getHotelSuccess(hotel));
    } catch (error) {
        yield put(hotelsActions.getHotelFail(error));
    }
}
