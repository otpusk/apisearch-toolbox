// Core
import { call, put } from 'redux-saga/effects';

// Instruments
import { actions } from '../../actions';
import { getAgencies } from '@otpusk/excursion-api';

export function* getAgenciesWorker ({ payload: query }) {
    const { cruiseId: tourId } = query;
    console.log({ query });
    try {
        const formdata = new FormData();

        formdata.append('s', query);
        console.log({ formdata });

        const { offices, regions } = yield call(getAgencies, formdata);

        yield put(actions.getRegionsSuccess(regions));
        yield put(actions.getOfficesSuccess(tourId, offices));
    } catch (error) {
        console.log({ error });
        yield put(actions.getRegionsFail(error));
        yield put(actions.getOfficesFail(tourId));
    }
}
