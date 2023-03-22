import { call, select, put } from 'redux-saga/effects';
import { getToursDates } from '@otpusk/json-api';

import { getToken } from '../../../auth/selectors';

import { searchActions } from '../../actions';
import { generateAvailableDatesKey } from '../../helpers';

export function* getAvailableDatesWorker ({ payload }) {
    const { countryID, departureID } = payload;
    const token = yield select(getToken);

    try {
        const dates = yield call(getToursDates, token, {
            to:   countryID,
            from: departureID,
        });

        yield put(searchActions.getAvailableDatesSuccess(
            generateAvailableDatesKey(countryID, departureID),
            dates
        ));
    } catch (error) {
        console.log(error);

        yield put(searchActions.getAvailableDatesFail(error));
    }
}
