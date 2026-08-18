"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNotFoundActualizedOffer = exports.isExpiredOffer = exports.isEndActualizedOffer = exports.isConnectionFailedWithOperator = exports.isAliveOffer = exports.isActualizedOffer = exports.isActualazingOffer = exports.isActualLastUpdate = exports.getOffers = exports.getOfferStatus = exports.getOffer = exports.getMessageByActualizedOffer = exports.getIsStopSaleByHotel = exports.getIsFailedActualization = exports.getActualizedStatus = exports.getActualizedOffer = void 0;
var _reselect = require("reselect");
var R = _interopRequireWildcard(require("ramda"));
var _moment = _interopRequireDefault(require("moment"));
var _resultsMemory = require("../search/saga/workers/getResultsWorker/resultsMemory");
var _constants = require("./constants");
var _helpers = require("./helpers");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const EMPTY_OBJ = {};
const getOffersHubFromSearchMemory = queryID => R.prop(queryID, _resultsMemory.memoryInstances) ? _resultsMemory.memoryInstances[queryID].getValues().offersHub : {};
const domain = _ => _.offers;
const getOfferID = (_, _ref) => {
  let {
    offerID: mbKey
  } = _ref;
  if ((0, _helpers.isOfferKey)(mbKey)) {
    const {
      id,
      meta,
      key
    } = (0, _helpers.extractDataFromOfferKey)(mbKey);
    return {
      offerID: id,
      meta,
      key
    };
  }
  return {
    key: mbKey
  };
};
const getOffersStore = R.pipe(domain, R.prop('store'));
const getOffersStatuses = R.pipe(domain, R.prop('status'));
const getOfferStatus = exports.getOfferStatus = (0, _reselect.createSelector)(getOffersStatuses, getOfferID, (map, _ref2) => {
  let {
    key
  } = _ref2;
  return R.prop(key, map);
});
const isAliveOffer = exports.isAliveOffer = (0, _reselect.createSelector)(getOfferStatus, R.equals(_constants.ALIVE_OFFER_STATUS));
const isExpiredOffer = exports.isExpiredOffer = (0, _reselect.createSelector)(getOfferStatus, R.equals(_constants.EXPIRED_OFFER_STATUS));
const getOffers = () => (0, _reselect.createSelector)(getOffersStore, function (_) {
  let {
    queryID
  } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return queryID;
}, (store, queryID) => {
  return queryID ? R.mergeAll([store, getOffersHubFromSearchMemory(queryID)]) : store;
});
exports.getOffers = getOffers;
const getOffer = () => (0, _reselect.createSelector)(getOffers(), getOfferID, (offers, _ref3) => {
  let {
    offerID,
    key,
    meta
  } = _ref3;
  return R.when(Boolean, offer => meta ? R.mergeAll([offer, meta, {
    id: offerID
  }]) : offer, R.prop(key, offers));
});
exports.getOffer = getOffer;
const isActualLastUpdate = () => (0, _reselect.createSelector)(getOffer(), (_, args) => (args === null || args === void 0 ? void 0 : args.ttlAsMinutes) ?? 20, (_ref4, ttlAsMinutes) => {
  let {
    updateTime
  } = _ref4;
  const isForceUpdate = ttlAsMinutes === 0;
  if (isForceUpdate) {
    return false;
  }
  const diffByNowAsMinutes = (0, _moment.default)().diff((0, _moment.default)(updateTime), 'minutes');
  return R.lte(diffByNowAsMinutes, ttlAsMinutes);
});
exports.isActualLastUpdate = isActualLastUpdate;
const actualizedOffersDomain = R.pipe(domain, R.prop('actualizedOffers'));
const getActualizedEntity = () => (0, _reselect.createSelector)(actualizedOffersDomain, getOfferID, (offer, _ref5) => {
  let {
    key
  } = _ref5;
  return offer[key] ?? EMPTY_OBJ;
});
const getActualizedOffer = () => (0, _reselect.createSelector)(getActualizedEntity(), R.prop('offer'));
exports.getActualizedOffer = getActualizedOffer;
const getActualizedStatus = () => (0, _reselect.createSelector)(getActualizedEntity(), R.prop('actualizedStatus'));
exports.getActualizedStatus = getActualizedStatus;
const isActualizedOffer = () => (0, _reselect.createSelector)(getActualizedStatus(), R.ifElse(Boolean, status => status === _constants.ACTUALIZED_OFFER_STATUS.ACTUALIZED, R.F));
exports.isActualizedOffer = isActualizedOffer;
const makeSelectorByStatus = status => () => (0, _reselect.createSelector)(getActualizedStatus(), R.equals(status));
const isConnectionFailedWithOperator = exports.isConnectionFailedWithOperator = makeSelectorByStatus(_constants.ACTUALIZED_OFFER_STATUS.ERROR_OPERATOR_CONNECTION);
const isNotFoundActualizedOffer = exports.isNotFoundActualizedOffer = makeSelectorByStatus(_constants.ACTUALIZED_OFFER_STATUS.NOT_FOUND);
const getIsStopSaleByHotel = exports.getIsStopSaleByHotel = makeSelectorByStatus(_constants.ACTUALIZED_OFFER_STATUS.STOP_SALE_BY_HOTEL);
const getIsFailedActualization = () => (0, _reselect.createSelector)(getActualizedStatus(), status => [_constants.ACTUALIZED_OFFER_STATUS.NOT_FOUND, _constants.ACTUALIZED_OFFER_STATUS.ERROR_OPERATOR_CONNECTION, _constants.ACTUALIZED_OFFER_STATUS.INVALID_REQUEST, _constants.ACTUALIZED_OFFER_STATUS.STOP_SALE_BY_TRANSPORT_TO, _constants.ACTUALIZED_OFFER_STATUS.STOP_SALE_BY_TRANSPORT_FROM, _constants.ACTUALIZED_OFFER_STATUS.STOP_SALE_BY_HOTEL].includes(status));
exports.getIsFailedActualization = getIsFailedActualization;
const getMessageByActualizedOffer = () => (0, _reselect.createSelector)(getActualizedEntity(), R.prop('message'));
exports.getMessageByActualizedOffer = getMessageByActualizedOffer;
const isEndActualizedOffer = () => (0, _reselect.createSelector)(getActualizedEntity(), R.propOr(false, 'completed'));
exports.isEndActualizedOffer = isEndActualizedOffer;
const isActualazingOffer = () => (0, _reselect.createSelector)(getActualizedEntity(), R.propOr(false, 'loading'));
exports.isActualazingOffer = isActualazingOffer;