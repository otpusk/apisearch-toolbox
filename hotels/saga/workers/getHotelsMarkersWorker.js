// Core
import { call, put, select } from 'redux-saga/effects';

// Instruments
import { hotelsActions as actions } from '/hotels/actions';
import { getToursHotelsMarkers } from '@otpusk/json-api';

export function* getHotelsMarkersWorker ({ payload: { countryId, cityId, center, radius }}) {
    try {
        const token = yield select((state) => state.auth.getIn(['otpusk', 'token']));
        const markers = yield call(getToursHotelsMarkers, token, countryId, cityId, { center, radius });

        yield put(actions.getHotelsMarkersSuccess(markers));
    } catch (error) {
        yield put(actions.getHotelsMarkersFail(error));
    }
}
