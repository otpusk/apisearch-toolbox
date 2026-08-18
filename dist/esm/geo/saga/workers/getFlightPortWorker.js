// Core
import { call, put, select } from 'redux-saga/effects';

// Instruments
import { geoActions } from '../../actions';
import { getToursFlightPort } from '@otpusk/json-api';
export function getFlightPortWorker(_ref) {
  let {
    payload: iata
  } = _ref;
  return function* () {
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
      const port = yield call(getToursFlightPort, token, iata, {
        lang
      });
      yield put(geoActions.getFlightPortSuccess(iata, port));
    } catch (error) {
      yield put(geoActions.getFlightPortFail(error));
    }
  }();
}