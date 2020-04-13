// Core
import { call, select, put } from 'redux-saga/effects';
import { searchActions } from "../../actions";
import { getToursDates } from '@otpusk/json-api';
import { List } from 'immutable';

export function* getAvailableDatesWorker ({ payload : { options }}) {
    try {
        const { token } = yield select(({ auth }) => ({
            token: auth.getIn(['otpusk', 'token']),
            lang:  auth.getIn(['otpusk', 'lang'], 'rus'),
        }));

        const dates = yield call(getToursDates, token, options);

        yield put(searchActions.getAvailableDatesSuccess(List(dates)));
    } catch (error) {
        yield put(searchActions.getAvailableDatesFail(error));
    }
}
