// Core
import { call, put } from 'redux-saga/effects';

// Instruments
import { actions } from '../../actions';
import { getAgencies } from '@otpusk/excursion-api';

export function* getAgenciesWorker ({ payload: query }) {
    try {
        const { offices, regions } = yield call(getAgencies, query);
        const { cruiseId: tourId } = query.params;

        yield put(actions.getRegionsSuccess(regions ? regions : []));
        yield put(actions.getOfficesSuccess(tourId, offices ? offices : []));
    } catch (error) {
        yield put(actions.getRegionsFail(error));
        yield put(actions.getOfficesFail(error));
    }
}
