// Core
import { call, put, select } from 'redux-saga/effects';

// Instruments
import { geoActions } from '../../actions';
import { getToursDepartureCities } from '@otpusk/json-api';
export function getDepartureCitiesWorker(_ref) {
  let {
    payload
  } = _ref;
  return function* () {
    const {
      geoID,
      methodVersion
    } = payload;
    try {
      const {
        token,
        lang
      } = yield select(_ref2 => {
        let {
          auth
        } = _ref2;
        return {
          token: auth.getIn(['otpusk', 'token']),
          lang: auth.getIn(['otpusk', 'lang'], 'rus')
        };
      });
      const departures = yield call(getToursDepartureCities, token, {
        geoId: geoID,
        lang
      }, methodVersion);
      yield put(geoActions.getDepartureCitiesSuccess(geoID, departures));
    } catch (error) {
      yield put(geoActions.getDepartureCitiesFail(error));
    }
  }();
}