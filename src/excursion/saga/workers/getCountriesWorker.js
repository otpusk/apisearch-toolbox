// Core
import { call, put } from 'redux-saga/effects';

// Instruments
import { actions } from '../../actions';
import { getCountries } from '@otpusk/excursion-api';

export function* getCountriesWorker () {
    try {
        const countries = yield call(getCountries);

        yield put(actions.getCountriesSuccess(countries));
    } catch (error) {
        yield put(actions.getCountriesFail(error));
    }
}
