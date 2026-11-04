import { call, put, select, takeEvery } from 'redux-saga/effects';
import { getTurpravdaHotelReviews } from '@otpusk/json-api';

import {
    getTurpravdaWidget,
    getTurpravdaWidgetFail,
    setTurpravdaHotel,
    setTurpravdaWidget
} from './actions';

function* getTurpravdaWidgetSaga ({ payload: hotelID }) {
    const lang = yield select(({ auth }) => auth.getIn(['otpusk', 'lang']));

    try {
        const { hotel, reviews } = yield call(getTurpravdaHotelReviews, hotelID, lang);

        yield put(setTurpravdaHotel(hotelID, hotel));
        yield put(setTurpravdaWidget(hotelID, reviews));
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
