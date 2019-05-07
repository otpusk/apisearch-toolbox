// Core
import { call, put, select } from 'redux-saga/effects';

// Instruments
import { geoActions } from '../../actions';
import { getToursCountries } from '@otpusk/json-api';

export function* getCountriesWorker () {
    try {
        const token = yield select((state) => state.auth.getIn(['otpusk', 'token']));
        const countries = yield call(getToursCountries, token);

        yield put(geoActions.getCountriesSuccess(countries));
    } catch (error) {
        yield put(geoActions.getCountriesFail(error));
    }
}
