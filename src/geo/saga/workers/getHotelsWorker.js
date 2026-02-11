import { call, put, select } from 'redux-saga/effects';
import { getToursHotels } from '@otpusk/json-api';

import { getLang, getToken } from '../../../auth/selectors';
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
        const token = yield select(getToken);
        const lang = yield select(getLang);

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
