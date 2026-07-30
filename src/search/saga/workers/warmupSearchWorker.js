import { call, select } from 'redux-saga/effects';
import { getToursStartSearch } from '@otpusk/json-api';

import { getToken, getLang } from '../../../auth/selectors';
import { getQuery } from '../../../queries/selectors';
import { convertToOtpQuery, QUERY_PARAMS } from '../../../queries/fn';

export function* warmupSearchWorker ({ payload: queryID }) {
    const token = yield select(getToken);
    const lang = yield select(getLang);
    const query = yield select((state) => getQuery(state, { queryID }));

    const otpQuery = convertToOtpQuery(query.set(QUERY_PARAMS.LANGUAGE, lang));

    try {
        yield call(getToursStartSearch, token, otpQuery);
    } catch (error) {
        console.log(error);
    }
}
