import { call, put, select } from 'redux-saga/effects';
import { getToursHotels } from '@otpusk/json-api';

import { geoActions } from '../../actions';
import { generateHotelKey } from '../../helpers';

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

        const storeKey = generateHotelKey(countryId, rating, services);

        yield put(geoActions.getHotelsSuccess(countryId, storeKey, hotels));
    } catch (error) {
        console.log(error);
        yield put(geoActions.getHotelsFail(error));
    }
}
