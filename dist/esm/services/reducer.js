import * as R from 'ramda';
import { handleActions } from 'redux-actions';
import { servicesActions } from './actions';
const initialState = {
  labels: {},
  store: {},
  booking: {}
};
export const servicesReducer = handleActions({
  [servicesActions.setLabels]: (state, _ref) => {
    let {
      payload: labels
    } = _ref;
    return R.set(R.lensProp('labels'), labels, state);
  },
  [servicesActions.mergeLabels]: (state, _ref2) => {
    let {
      payload: labels
    } = _ref2;
    return R.over(R.lensProp('labels'), prevLables => R.mergeAll([prevLables, labels]), state);
  },
  [servicesActions.getServicesSuccess]: (state, _ref3) => {
    let {
      payload
    } = _ref3;
    const {
      countryId,
      services
    } = payload;
    return R.set(R.lensPath(['store', countryId]), services, state);
  },
  [servicesActions.setBookingServices]: (state, _ref4) => {
    let {
      payload
    } = _ref4;
    const {
      key,
      services
    } = payload;
    return R.assocPath(['booking', key], services, state);
  },
  [servicesActions.resetBookingServices]: (state, _ref5) => {
    let {
      payload: key
    } = _ref5;
    return R.dissocPath(['booking', key], state);
  }
}, initialState);