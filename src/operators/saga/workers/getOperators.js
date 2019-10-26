import { select, call, put } from 'redux-saga/effects';
import { getToursOperators } from '@otpusk/json-api';

// instruments
import { operatorsActions as actions } from '../../actions';

export function* getOperatorsWorker ({ payload }) {
    const { countryId, options = {}} = payload;
    const [token, lang] = yield select(({ auth }) => [
        auth.getIn(['otpusk', 'token']),
        auth.getIn(['otpusk', 'lang'], 'rus')
    ]);

    yield put(actions.setUiFlag([countryId], { loading: true, error: false, completed: false, message: null }));

    try {
        const operators = yield call(getToursOperators, token, countryId, { lang, ...options });

        yield put(actions.getOperatorsSuccess(countryId, operators));
    } catch (error) {
        yield put(actions.getOperatorsFail(error));
        yield put(actions.setUiFlag([countryId, 'error'], true));
        yield put(actions.setUiFlag([countryId, 'message'], error.message));
    } finally {
        yield put(actions.setUiFlag([countryId, 'loading'], false));
        yield put(actions.setUiFlag([countryId, 'completed'], true));
    }
}
