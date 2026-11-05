import { call, put, select, takeEvery } from 'redux-saga/effects';
import { getTurpravdaHotelInformer, getTurpravdaHotelReviews } from '@otpusk/json-api';
import { getLang } from '../auth/selectors';
import { getTurpravdaReviews, getTurpravdaReviewsFail, getTurpravdaWidget, getTurpravdaWidgetFail, setTurpravdaReviews, setTurpravdaWidget } from './actions';
function getTurpravdaWidgetSaga(_ref) {
  let {
    payload: hotelID
  } = _ref;
  return function* () {
    const lang = yield select(_ref2 => {
      let {
        auth
      } = _ref2;
      return auth.getIn(['otpusk', 'lang']);
    });
    try {
      const widget = yield call(getTurpravdaHotelInformer, hotelID, {
        count: 10,
        lang
      });
      yield put(setTurpravdaWidget(hotelID, widget));
    } catch (error) {
      console.log(error);
      yield put(getTurpravdaWidgetFail(error));
    }
  }();
}
function getTurpravdaReviewsSaga(_ref3) {
  let {
    payload: hotelID
  } = _ref3;
  return function* () {
    const lang = yield select(getLang);
    try {
      const reviews = yield call(getTurpravdaHotelReviews, hotelID, lang);
      yield put(setTurpravdaReviews(hotelID, reviews));
    } catch (error) {
      yield put(getTurpravdaReviewsFail(error));
    }
  }();
}
export default function* () {
  yield takeEvery(getTurpravdaWidget, getTurpravdaWidgetSaga);
  yield takeEvery(getTurpravdaReviews, getTurpravdaReviewsSaga);
}