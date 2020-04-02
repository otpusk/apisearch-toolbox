// Core
import { call, put, select } from 'redux-saga/effects';

// Instruments
import { geoActions } from '../../actions';
import { getToursCities } from '@otpusk/json-api';

export function* getCitiesWorker ({ payload: { countryId, options = { 'with': 'price' }}}) {
    try {
        const { token, lang } = yield select(({ auth }) => ({
            token: auth.getIn(['otpusk', 'token']),
            lang:  auth.getIn(['otpusk', 'lang'], 'rus'),
        }));
        const cities = yield call(getToursCities, token, countryId, { lang, ...options });

        yield put(geoActions.getCitiesSuccess(countryId, cities));
    } catch (error) {
        yield put(geoActions.getCitiesFail(error));
    }
}
