// Core
import { call, put, select } from 'redux-saga/effects';

// Instruments
import { geoActions } from '../../actions';
import { getToursCountries } from '@otpusk/json-api';

export function* getCountriesWorker ({ payload: options = { 'with': 'price' } }) {
    try {
        const { token, lang } = yield select(({ auth }) => ({
            token: auth.getIn(['otpusk', 'token']),
            lang: auth.getIn(['otpusk', 'lang'], 'rus')
        }));
        const countries = yield call(getToursCountries, token, { lang, ...options });

        yield put(geoActions.getCountriesSuccess(countries));
    } catch (error) {
        yield put(geoActions.getCountriesFail(error));
    }
}
