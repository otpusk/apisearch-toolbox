import { call, put, select } from 'redux-saga/effects';
import { getToursBookServices } from '@otpusk/json-api';
import { mergeAll } from 'ramda';

import { getToken } from '../../../auth/selectors';

import { servicesActions } from '../../actions';
import { createBookingServicesKey } from '../../helpers';

function* getBookingServicesWorker ({ payload }) {
    const { offerID, currency } = payload;

    const tokenAsObject = yield select(getToken);

    try {
        const services = yield call(getToursBookServices, mergeAll([
            tokenAsObject,
            {
                currencyLocal: currency,
                offerId:       offerID,
            }
        ]));

        yield put(servicesActions.setBookingServices(createBookingServicesKey(offerID, currency), services));
    } catch (error) {
        console.log(error);
    }
}

export { getBookingServicesWorker };
