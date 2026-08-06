import { call, put, select } from 'redux-saga/effects';
import { List } from 'immutable';
import { getToursOperators } from '@otpusk/json-api';

import { geoActions } from '../../actions';
import { generateOperatorKey } from '../../helpers';

export function* getOperatorsWorker ({ payload }) {
    const { countryId, departureID, methodVersion } = payload;

    const { token, lang } = yield select(({ auth }) => ({
        token: auth.getIn(['otpusk', 'token']),
        lang:  auth.getIn(['otpusk', 'lang'], 'rus'),
    }));

    try {
        const operators = yield call(
            getToursOperators,
            token,
            countryId,
            departureID ? { from: departureID, lang } : { lang },
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
