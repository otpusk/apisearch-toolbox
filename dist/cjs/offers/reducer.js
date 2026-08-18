"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.offersReducer = void 0;
var _reduxActions = require("redux-actions");
var R = _interopRequireWildcard(require("ramda"));
var _actions = require("./actions");
var _constants = require("./constants");
var _helpers = require("./helpers");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const initalState = {
  store: {},
  status: {},
  actualizedOffers: {}
};
const offersReducer = exports.offersReducer = (0, _reduxActions.handleActions)({
  [_actions.offersActions.addOffers]: (state, _ref) => {
    let {
      payload: nextOffers
    } = _ref;
    return R.call(R.pipe(R.over(R.lensProp('store'), offers => R.mergeAll([offers, nextOffers])), R.over(R.lensProp('status'), statuesAsMap => R.mergeAll([statuesAsMap, R.mapObjIndexed(R.always(_constants.ALIVE_OFFER_STATUS), nextOffers)]))), state);
  },
  [_actions.offersActions.setOffer]: (state, _ref2) => {
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
  [_actions.offersActions.setOfferStatus]: (state, _ref3) => {
    let {
      payload: {
        offerID,
        status
      }
    } = _ref3;
    return R.assocPath(['status', offerID], status, state);
  },
  [_actions.offersActions.setActualizedOffer]: (state, _ref4) => {
    let {
      payload
    } = _ref4;
    return R.over(R.lensPath(['actualizedOffers', payload.offerID]), R.pipe(_helpers.presetEmpyShapeForActualizedOffer, R.assoc('offer', payload.offer)), state);
  },
  [_actions.offersActions.setActualizedStatus]: (state, _ref5) => {
    let {
      payload
    } = _ref5;
    return R.over(R.lensPath(['actualizedOffers', payload.offerID]), R.pipe(_helpers.presetEmpyShapeForActualizedOffer, R.assoc('actualizedStatus', payload.status)), state);
  },
  [_actions.offersActions.startActualizeOffer]: (state, _ref6) => {
    let {
      payload: offerID
    } = _ref6;
    return R.over(R.lensPath(['actualizedOffers', offerID]), R.pipe(_helpers.presetEmpyShapeForActualizedOffer, R.assoc('loading', true)), state);
  },
  [_actions.offersActions.endActualizeOffer]: (state, _ref7) => {
    let {
      payload: offerID
    } = _ref7;
    return R.over(R.lensPath(['actualizedOffers', offerID]), R.pipe(_helpers.presetEmpyShapeForActualizedOffer, R.assoc('loading', false), R.assoc('completed', true)), state);
  },
  [_actions.offersActions.setMessageByActualizedOffer]: (state, _ref8) => {
    let {
      payload
    } = _ref8;
    return R.over(R.lensPath(['actualizedOffers', payload.offerID]), R.pipe(_helpers.presetEmpyShapeForActualizedOffer, R.assoc('message', payload.message)), state);
  },
  [_actions.offersActions.failActualizedOffer]: (state, _ref9) => {
    let {
      payload: offerID
    } = _ref9;
    return R.over(R.lensPath(['actualizedOffers', offerID]), R.pipe(_helpers.presetEmpyShapeForActualizedOffer, R.assoc('error', true)), state);
  },
  [_actions.offersActions.clearActualizedOffer]: (state, _ref10) => {
    let {
      payload: offerID
    } = _ref10;
    return R.over(R.lensProp('actualizedOffers'), R.omit([offerID]), state);
  },
  [_actions.offersActions.resetOffersStore]: () => R.clone(initalState)
}, initalState);