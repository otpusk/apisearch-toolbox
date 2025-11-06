import { call, put, select } from 'redux-saga/effects';
import { getFilterDeparture } from '@otpusk/excursion-api';

import { getLansAsQuery } from '../../../auth/selectors';
import { actions } from '../../actions';

export function* getDepartureCitiesWorker ({ payload: countryId }) {
    try {
        const langAsQuery = yield select(getLansAsQuery);
        const cities = yield call(getFilterDeparture, langAsQuery);

        yield put(actions.getDepartureCitiesSuccess(countryId, cities));
    } catch (error) {
        yield put(actions.getDepartureCitiesFail(error));
    }
}
