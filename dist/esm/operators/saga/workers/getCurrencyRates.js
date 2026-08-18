import { select, call, put } from 'redux-saga/effects';
import { getToursCurrencyRates } from '@otpusk/json-api';

// instruments
import { operatorsActions as actions } from '../../actions';
import { createRateHash } from './../../helpers';
export function getCurrencyRatesWorker(_ref) {
  let {
    payload
  } = _ref;
  return function* () {
    const {
      dateFrom,
      dateTo,
      options = {}
    } = payload;
    const [token, lang] = yield select(_ref2 => {
      let {
        auth
      } = _ref2;
      return [auth.getIn(['otpusk', 'token']), auth.getIn(['otpusk', 'lang'], 'rus')];
    });
    const hash = createRateHash(dateFrom, dateTo);
    yield put(actions.setUiFlag([hash], {
      loading: true,
      error: false,
      completed: false,
      message: null
    }));
    try {
      const rates = yield call(getToursCurrencyRates, token, {
        from: dateFrom,
        to: dateTo
      }, {
        lang,
        ...options
      });
      yield put(actions.getCurrencyRatesSuccess(hash, rates));
    } catch (error) {
      yield put(actions.getCurrencyRatesFail(error));
      yield put(actions.setUiFlag([hash, 'error'], true));
      yield put(actions.setUiFlag([hash, 'message'], error.message));
    } finally {
      yield put(actions.setUiFlag([hash, 'loading'], false));
      yield put(actions.setUiFlag([hash, 'completed'], true));
    }
  }();
}