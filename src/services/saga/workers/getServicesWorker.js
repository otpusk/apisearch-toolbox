import { call, put, select } from 'redux-saga/effects';
import * as R from 'ramda';
import { getToursServices } from '@otpusk/json-api';

import { servicesActions } from '../../actions';

const groupMapperLabelKeys = (group) => R.map(
    R.pipe(
        R.keys,
        ([labelKey]) => labelKey
    ),
    group
);

const normalizeServices = (services) => R.call(
    R.pipe(
        R.toPairs,
        R.map(([serviceKey, group]) => [
            serviceKey,
            groupMapperLabelKeys(group)
        ]),
        R.fromPairs
    ),
    services
);

const extractLabels = (services) => R.call(
    R.pipe(
        R.omit(['byCountries']),
        R.toPairs,
        R.map(([, group]) => group),
        R.flatten,
        R.reduce(
            (result, service) => R.mergeAll([result, service]),
            {}
        )
    ),
    services
);

export function* getServicesWorker ({ payload: countryId }) {
    try {
        const { token, lang } = yield select(({ auth }) => ({
            token: auth.getIn(['otpusk', 'token']),
            lang:  auth.getIn(['otpusk', 'lang']),
        }));
        const services = yield call(getToursServices, token, countryId, lang);

        yield put(servicesActions.mergeLabels(extractLabels(services)));
        yield put(servicesActions.getServicesSuccess(countryId, normalizeServices(services)));
    } catch (error) {
        yield put(servicesActions.getServicesFail(error));
    }
}
