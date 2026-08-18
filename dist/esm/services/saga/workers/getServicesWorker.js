import { call, put, select } from 'redux-saga/effects';
import * as R from 'ramda';
import { getToursServices } from '@otpusk/json-api';
import { servicesActions } from '../../actions';
const groupMapperLabelKeys = group => R.map(R.pipe(R.keys, _ref => {
  let [labelKey] = _ref;
  return labelKey;
}), group);
const normalizeServices = services => R.call(R.pipe(R.toPairs, R.map(_ref2 => {
  let [serviceKey, group] = _ref2;
  return [serviceKey, groupMapperLabelKeys(group)];
}), R.fromPairs), services);
const extractLabels = services => R.call(R.pipe(R.omit(['byCountries', 'chains']), R.toPairs, R.map(_ref3 => {
  let [, group] = _ref3;
  return group;
}), R.flatten, R.reduce((result, service) => R.mergeAll([result, service]), {})), services);
export function getServicesWorker(_ref4) {
  let {
    payload: {
      countryId,
      options = {}
    }
  } = _ref4;
  return function* () {
    const {
      withIcons,
      fresh
    } = options;
    try {
      const {
        token,
        lang
      } = yield select(_ref5 => {
        let {
          auth
        } = _ref5;
        return {
          token: auth.getIn(['otpusk', 'token']),
          lang: auth.getIn(['otpusk', 'lang'])
        };
      });
      const services = yield call(getToursServices, token, countryId, lang, withIcons, fresh);
      yield put(servicesActions.mergeLabels(extractLabels(services)));
      yield put(servicesActions.getServicesSuccess(countryId, normalizeServices(services)));
    } catch (error) {
      yield put(servicesActions.getServicesFail(error));
    }
  }();
}