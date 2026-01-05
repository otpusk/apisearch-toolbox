import { call, put, select } from 'redux-saga/effects';
import { getToursHotelDescriptionsByOperator } from "@otpusk/json-api";

import { getLang, getToken } from "../../../auth/selectors";

import { hotelsActions } from "../../actions";

export function* getDescriptionsByOperatorWorker ({ payload: { operatorID, externalOperatorData }}) {
    const token = yield select(getToken);
    const lang = yield select(getLang);

    const { subOperatorName, subHotelID } = externalOperatorData;

    try {
        const descriptions = yield call(
            getToursHotelDescriptionsByOperator,
            token,
            {
                lang,
                subHotelID,
                subOperatorName,
                operatorId: operatorID,
            }
        );

        yield put(hotelsActions.getDescriptionsByOperatorSuccess(
            operatorID,
            descriptions
        ));
    } catch (error) {
        yield put(hotelsActions.getDescriptionsByOperatorFail(error));
    }
}
