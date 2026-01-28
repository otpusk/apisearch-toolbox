import { call, put, select } from 'redux-saga/effects';
import { List } from 'immutable';
import { getToursOperators } from '@otpusk/json-api';

import { getToken } from '../../../auth/selectors';
import { geoActions } from '../../actions';
import { generateOperatorKey } from '../../helpers';

export function* getOperatorsWorker ({ payload }) {
    const { countryId, departureID, methodVersion } = payload;

    const token = yield select(getToken);

    try {
        const operators = yield call(
            getToursOperators,
            token,
            countryId,
            departureID ? { from: departureID } : undefined,
            methodVersion
        );

        yield put(geoActions.getOperatorsSuccess(
            generateOperatorKey(countryId, departureID),
            List(operators)
        ));
    } catch (error) {
        console.log('error', error);
        yield put(geoActions.getOperatorsFail(error));
    }
}
