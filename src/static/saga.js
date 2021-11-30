import { call, put, select, take } from 'redux-saga/effects';
import { getStaticData as getStaticDataEndpoint } from '@otpusk/json-api';
import * as R from 'ramda';

import { getStaticData, setStaticData } from './actions';

function* getStaticDataSaga () {
    yield take(getStaticData);

    const { token, lang } = yield select(({ auth }) => ({
        token: auth.getIn(['otpusk', 'token']),
        lang:  auth.getIn(['otpusk', 'lang']),
    }));

    try {
        const staticData = yield call(getStaticDataEndpoint, R.mergeAll([token, { lang }]));

        yield put(setStaticData(staticData));
    } catch (e) {
        console.log(e);
    }
}

export default getStaticDataSaga;
