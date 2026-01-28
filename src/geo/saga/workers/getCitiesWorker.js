// Core
import { call, put, select } from 'redux-saga/effects';

// Instruments
import { getLang, getToken } from '../../../auth/selectors';
import { geoActions } from '../../actions';
import { getToursCities } from '@otpusk/json-api';

export function* getCitiesWorker ({ payload: { countryId, options = { 'with': 'price' }}}) {
    try {
        const lang = yield select(getLang);
        const token = yield select(getToken);
        const cities = yield call(getToursCities, token, countryId, { lang, ...options });

        yield put(geoActions.getCitiesSuccess(countryId, cities));
    } catch (error) {
        yield put(geoActions.getCitiesFail(error));
    }
}
