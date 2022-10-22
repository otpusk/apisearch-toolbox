import { call, put, select } from 'redux-saga/effects';
import { getToursCountries } from '@otpusk/json-api';

import { geoActions } from '../../actions';

export function* getCountriesWorker ({ payload }) {
    const { options = { 'with': 'price' }, methodVersion } = payload;

    try {
        const { token, lang } = yield select(({ auth }) => ({
            token: auth.getIn(['otpusk', 'token']),
            lang:  auth.getIn(['otpusk', 'lang'], 'rus'),
        }));
        const countries = yield call(getToursCountries, token, { lang, ...options }, methodVersion);

        yield put(geoActions.getCountriesSuccess(countries));
    } catch (error) {
        yield put(geoActions.getCountriesFail(error));
    }
}
