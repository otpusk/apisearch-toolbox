// Core
import { call, put, select } from 'redux-saga/effects';

// Instruments
import { geoActions } from '../../actions';
import { getToursHotels } from '@otpusk/json-api';

export function* getHotelsWorker ({ payload: { countryId, withPrice }}) {
    try {
        const token = yield select((state) => state.auth.getIn(['otpusk', 'token']));
        const hotels = yield call(getToursHotels, token, countryId, { withPrice });

        yield put(geoActions.getHotelsSuccess(countryId, hotels));
    } catch (error) {
        yield put(geoActions.getHotelsFail(error));
    }
}
