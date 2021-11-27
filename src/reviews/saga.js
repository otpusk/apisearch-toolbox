import { call, put, select, takeEvery } from 'redux-saga/effects';
import { getTurpravdaHotelInformer } from '@otpusk/json-api';

import { getTurpravdaWidget, setTurpravdaWidget } from './actions';

function* getTurpravdaWidgetSaga ({ payload: hotelID }) {
    const lang = yield select(({ auth }) => auth.getIn(['otpusk', 'lang']));

    try {
        const widget = yield call(getTurpravdaHotelInformer, hotelID, { lang });

        yield put(setTurpravdaWidget(hotelID, widget));
    } catch (error) {
        console.log(error);
    }
}

export default function* () {
    yield takeEvery(
        getTurpravdaWidget,
        getTurpravdaWidgetSaga
    );
}
