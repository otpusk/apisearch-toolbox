// Core
import { call, put, select } from 'redux-saga/effects';

// Instruments
import { getToursServices } from '@otpusk/json-api';
import { servicesActions } from '../../actions';

export function* getServicesWorker ({ payload: countryId }) {
    try {
        const token = yield select((state) => state.auth.getIn(['otpusk', 'token']));
        const services = yield call(getToursServices, token, countryId);

        yield put(servicesActions.getServicesSuccess(services));
    } catch (error) {
        yield put(servicesActions.getServicesFail(error));
    }
}
