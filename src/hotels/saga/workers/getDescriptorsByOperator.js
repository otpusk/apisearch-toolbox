import { call, put, select } from 'redux-saga/effects';
import { getToursOperatorHotelDescriptions } from "@otpusk/json-api";

import { getLang, getToken } from "../../../auth/selectors";

import { hotelsActions } from "../../actions";

export function* getDescriptorsByOperatorWorker ({ payload: { operatorID, externalOperatorData }}) {
    const token = yield select(getToken);
    const lang = yield select(getLang);

    const { subOperatorName, subHotelID } = externalOperatorData;

    if (!subOperatorName || !subHotelID) {
        return;
    }

    try {
        const descriptors = yield call(
            getToursOperatorHotelDescriptions,
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
            descriptors
        ));
    } catch (error) {
        yield put(hotelsActions.getDescriptionsByOperatorFail(error));
    }
}
