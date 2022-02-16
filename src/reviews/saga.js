import { call, put, select, takeEvery } from 'redux-saga/effects';
import { getTurpravdaHotelInformer } from '@otpusk/json-api';

import { getTurpravdaWidget, getTurpravdaWidgetFail, setTurpravdaWidget } from './actions';

function* getTurpravdaWidgetSaga ({ payload: hotelID }) {
    const lang = yield select(({ auth }) => auth.getIn(['otpusk', 'lang']));

    try {
        const widget = yield call(getTurpravdaHotelInformer, hotelID, { count: 10, lang });

        yield put(setTurpravdaWidget(hotelID, widget));
    } catch (error) {
        console.log(error);

        yield put(getTurpravdaWidgetFail(error));
    }
}

export default function* () {
    yield takeEvery(
        getTurpravdaWidget,
        getTurpravdaWidgetSaga
    );
}
