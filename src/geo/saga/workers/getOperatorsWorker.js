import { call, put, select } from 'redux-saga/effects';
import { List } from 'immutable';
import { getToursOperators } from '@otpusk/json-api';

import { geoActions } from '../../actions';

export function* getOperatorsWorker ({ payload }) {
    const { countryId, departureID, methodVersion } = payload;

    const token = yield select((state) => state.auth.getIn(['otpusk', 'token']));

    try {
        const operators = yield call(
            getToursOperators,
            token,
            countryId,
            departureID ? { from: departureID } : undefined,
            methodVersion
        );

        yield put(geoActions.getOperatorsSuccess(countryId, List(operators)));
    } catch (error) {
        console.log('error', error);
        yield put(geoActions.getOperatorsFail(error));
    }
}
