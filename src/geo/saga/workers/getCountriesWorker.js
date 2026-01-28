import { call, put, select } from 'redux-saga/effects';
import { getToursCountries } from '@otpusk/json-api';

import { getLang, getToken } from '../../../auth/selectors';
import { geoActions } from '../../actions';

export function* getCountriesWorker ({ payload }) {
    const { options = { 'with': 'price' }, methodVersion } = payload;

    try {
        const lang = yield select(getLang);
        const token = yield select(getToken);

        const countries = yield call(getToursCountries, token, { lang, ...options }, methodVersion);

        yield put(geoActions.getCountriesSuccess(countries));
    } catch (error) {
        yield put(geoActions.getCountriesFail(error));
    }
}
