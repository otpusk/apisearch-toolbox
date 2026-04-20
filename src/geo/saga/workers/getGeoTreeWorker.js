// Core
import { put, call, select } from 'redux-saga/effects';

// Instruments
import { geoActions } from '../../actions';
import { getToursGeoTree } from '@otpusk/json-api';

export function* getGeoTreeWorker ({ payload: { countryId, withPrice }}) {
    const isSet = yield select((state) => Boolean(state.geo && state.geo.getIn(['toursGeoTree', countryId])));

    if (isSet) {
        return;
    }

    try {
        const token = yield select((state) => state.auth.getIn(['otpusk', 'token']));

        const geoTree = yield call(getToursGeoTree, token, { countryId, withPrice });

        yield put(geoActions.getGeoTreeSuccess(countryId, geoTree));
    } catch (error) {
        yield put(geoActions.getGeoTreeFail(error));
    }
}
