// Core
import { put, call, select } from 'redux-saga/effects';
import {getLang, getToken} from '../../../auth/selectors';

// Instruments
import { geoActions } from '../../actions';
import { getToursGeoTree } from '@otpusk/json-api';

export function* getGeoTreeWorker ({ payload: { countryId, withPrice, depth = 'city' }}) {
    const token = yield select(getToken);
    const lang = yield select(getLang);

    const options = {
        ...token,
        lang,
        depth,
        id: countryId,
        ...withPrice ? { with: 'price' } : {},
    };

    try {
        const geoTree = yield call(getToursGeoTree, options);

        yield put(geoActions.getGeoTreeSuccess(countryId, geoTree));
    } catch (error) {
        yield put(geoActions.getGeoTreeFail(error));
    }
}
