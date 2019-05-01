// Core
import { call, put, select } from 'redux-saga/effects';
import { List } from 'immutable';

// Instruments
import { geoActions } from 'bus/geo/actions';
import { getToursOperators } from '@otpusk/json-api';

export function* getOperatorsWorker ({ payload: countryId }) {
    try {
        const token = yield select((state) => state.auth.getIn(['otpusk', 'token']));
        const operators = yield call(getToursOperators, token, countryId);

        yield put(geoActions.getOperatorsSuccess(countryId, List(operators)));
    } catch (error) {
        console.log('error', error);
        yield put(geoActions.getOperatorsFail(error));
    }
}
