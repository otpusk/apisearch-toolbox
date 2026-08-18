import { handleActions } from 'redux-actions';
import * as R from 'ramda';
import { offersActions } from './actions';
import { ALIVE_OFFER_STATUS } from './constants';
import { presetEmpyShapeForActualizedOffer } from './helpers';
const initalState = {
  store: {},
  status: {},
  actualizedOffers: {}
};
export const offersReducer = handleActions({
  [offersActions.addOffers]: (state, _ref) => {
    let {
      payload: nextOffers
    } = _ref;
    return R.call(R.pipe(R.over(R.lensProp('store'), offers => R.mergeAll([offers, nextOffers])), R.over(R.lensProp('status'), statuesAsMap => R.mergeAll([statuesAsMap, R.mapObjIndexed(R.always(ALIVE_OFFER_STATUS), nextOffers)]))), state);
  },
  [offersActions.setOffer]: (state, _ref2) => {
    let {
      payload: {
        offerID,
        offer
      }
    } = _ref2;
    const prevOffer = R.path(['store', offerID], state);
    const nextOffer = prevOffer ? R.over(R.lensProp('price'), price => R.mergeAll([prevOffer.price, price]), offer) : offer;
    return R.assocPath(['store', offerID], nextOffer, state);
  },
  [offersActions.setOfferStatus]: (state, _ref3) => {
    let {
      payload: {
        offerID,
        status
      }
    } = _ref3;
    return R.assocPath(['status', offerID], status, state);
  },
  [offersActions.setActualizedOffer]: (state, _ref4) => {
    let {
      payload
    } = _ref4;
    return R.over(R.lensPath(['actualizedOffers', payload.offerID]), R.pipe(presetEmpyShapeForActualizedOffer, R.assoc('offer', payload.offer)), state);
  },
  [offersActions.setActualizedStatus]: (state, _ref5) => {
    let {
      payload
    } = _ref5;
    return R.over(R.lensPath(['actualizedOffers', payload.offerID]), R.pipe(presetEmpyShapeForActualizedOffer, R.assoc('actualizedStatus', payload.status)), state);
  },
  [offersActions.startActualizeOffer]: (state, _ref6) => {
    let {
      payload: offerID
    } = _ref6;
    return R.over(R.lensPath(['actualizedOffers', offerID]), R.pipe(presetEmpyShapeForActualizedOffer, R.assoc('loading', true)), state);
  },
  [offersActions.endActualizeOffer]: (state, _ref7) => {
    let {
      payload: offerID
    } = _ref7;
    return R.over(R.lensPath(['actualizedOffers', offerID]), R.pipe(presetEmpyShapeForActualizedOffer, R.assoc('loading', false), R.assoc('completed', true)), state);
  },
  [offersActions.setMessageByActualizedOffer]: (state, _ref8) => {
    let {
      payload
    } = _ref8;
    return R.over(R.lensPath(['actualizedOffers', payload.offerID]), R.pipe(presetEmpyShapeForActualizedOffer, R.assoc('message', payload.message)), state);
  },
  [offersActions.failActualizedOffer]: (state, _ref9) => {
    let {
      payload: offerID
    } = _ref9;
    return R.over(R.lensPath(['actualizedOffers', offerID]), R.pipe(presetEmpyShapeForActualizedOffer, R.assoc('error', true)), state);
  },
  [offersActions.clearActualizedOffer]: (state, _ref10) => {
    let {
      payload: offerID
    } = _ref10;
    return R.over(R.lensProp('actualizedOffers'), R.omit([offerID]), state);
  },
  [offersActions.resetOffersStore]: () => R.clone(initalState)
}, initalState);