import { call, put, select } from 'redux-saga/effects';
import { getCountries } from '@otpusk/excursion-api';

import { actions } from '../../actions';
import { getLansAsQuery } from '../../../auth/selectors';

export function* getCountriesWorker () {
    try {
        const langAsQuery = yield select(getLansAsQuery);
        const countries = yield call(getCountries, langAsQuery);

        yield put(actions.getCountriesSuccess(countries));
    } catch (error) {
        yield put(actions.getCountriesFail(error));
    }
}
