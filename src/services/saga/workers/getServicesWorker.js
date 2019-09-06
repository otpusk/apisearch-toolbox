// Core
import { call, put, select } from 'redux-saga/effects';

// Instruments
import { getToursServices } from '@otpusk/json-api';
import { servicesActions } from '../../actions';

export function* getServicesWorker ({ payload: countryId }) {
    try {
        const { token, lang } = yield select(({ auth }) => ({
            token: auth.getIn(['otpusk', 'token']),
            lang:  auth.getIn(['otpusk', 'lang']),
        }));
        const services = yield call(getToursServices, token, countryId, lang);

        yield put(servicesActions.getServicesSuccess(countryId, services));
    } catch (error) {
        yield put(servicesActions.getServicesFail(error));
    }
}
