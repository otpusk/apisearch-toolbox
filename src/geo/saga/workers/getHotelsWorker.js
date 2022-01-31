import { call, put, select } from 'redux-saga/effects';
import { getToursHotels } from '@otpusk/json-api';

import { geoActions } from '../../actions';

export function* getHotelsWorker ({ payload }) {
    const {
        countryId,
        withPrice,
        services,
        rating,
        methodVersion,
    } = payload;

    try {
        const token = yield select((state) => state.auth.getIn(['otpusk', 'token']));
        const lang = yield select((state) => state.auth.getIn(['otpusk', 'lang'], 'rus'));

        const hotels = yield call(
            getToursHotels,
            token,
            countryId,
            {
                lang,
                withPrice,
                services,
                rating,
            },
            methodVersion
        );

        yield put(geoActions.getHotelsSuccess(countryId, hotels));
    } catch (error) {
        yield put(geoActions.getHotelsFail(error));
    }
}
