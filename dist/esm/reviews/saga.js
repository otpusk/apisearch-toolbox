import { call, put, select, takeEvery } from 'redux-saga/effects';
import { getTurpravdaHotelInformer } from '@otpusk/json-api';
import { getTurpravdaWidget, getTurpravdaWidgetFail, setTurpravdaWidget } from './actions';
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
export default function* () {
  yield takeEvery(getTurpravdaWidget, getTurpravdaWidgetSaga);
}