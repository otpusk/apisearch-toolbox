"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNotFoundActualizedOffer = exports.isExpiredOffer = exports.isEndActualizedOffer = exports.isConnectionFailedWithOperator = exports.isAliveOffer = exports.isActualizedOffer = exports.isActualazingOffer = exports.isActualLastUpdate = exports.getOffers = exports.getOfferStatus = exports.getOffer = exports.getMessageByActualizedOffer = exports.getIsStopSaleByHotel = exports.getActualizedStatus = exports.getActualizedOffer = void 0;
var _reselect = require("reselect");
var R = _interopRequireWildcard(require("ramda"));
var _moment = _interopRequireDefault(require("moment"));
var _resultsMemory = require("../search/saga/workers/getResultsWorker/resultsMemory");
var _constants = require("./constants");
var _helpers = require("./helpers");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var EMPTY_OBJ = {};
var getOffersHubFromSearchMemory = function getOffersHubFromSearchMemory(queryID) {
  return R.prop(queryID, _resultsMemory.memoryInstances) ? _resultsMemory.memoryInstances[queryID].getValues().offersHub : {};
};
var domain = function domain(_) {
  return _.offers;
};
var getOfferID = function getOfferID(_, _ref) {
  var mbKey = _ref.offerID;
  if ((0, _helpers.isOfferKey)(mbKey)) {
    var _extractDataFromOffer = (0, _helpers.extractDataFromOfferKey)(mbKey),
      id = _extractDataFromOffer.id,
      meta = _extractDataFromOffer.meta,
      key = _extractDataFromOffer.key;
    return {
      offerID: id,
      meta: meta,
      key: key
    };
  }
  return {
    key: mbKey
  };
};
var getOffersStore = R.pipe(domain, R.prop('store'));
var getOffersStatuses = R.pipe(domain, R.prop('status'));
var getOfferStatus = exports.getOfferStatus = (0, _reselect.createSelector)(getOffersStatuses, getOfferID, function (map, _ref2) {
  var key = _ref2.key;
  return R.prop(key, map);
});
var isAliveOffer = exports.isAliveOffer = (0, _reselect.createSelector)(getOfferStatus, R.equals(_constants.ALIVE_OFFER_STATUS));
var isExpiredOffer = exports.isExpiredOffer = (0, _reselect.createSelector)(getOfferStatus, R.equals(_constants.EXPIRED_OFFER_STATUS));
var getOffers = exports.getOffers = function getOffers() {
  return (0, _reselect.createSelector)(getOffersStore, function (_) {
    var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      queryID = _ref3.queryID;
    return queryID;
  }, function (store, queryID) {
    return queryID ? R.mergeAll([store, getOffersHubFromSearchMemory(queryID)]) : store;
  });
};
var getOffer = exports.getOffer = function getOffer() {
  return (0, _reselect.createSelector)(getOffers(), getOfferID, function (offers, _ref4) {
    var offerID = _ref4.offerID,
      key = _ref4.key,
      meta = _ref4.meta;
    return R.when(Boolean, function (offer) {
      return meta ? R.mergeAll([offer, meta, {
        id: offerID
      }]) : offer;
    }, R.prop(key, offers));
  });
};
var isActualLastUpdate = exports.isActualLastUpdate = function isActualLastUpdate() {
  return (0, _reselect.createSelector)(getOffer(), function (_, args) {
    var _args$ttlAsMinutes;
    return (_args$ttlAsMinutes = args === null || args === void 0 ? void 0 : args.ttlAsMinutes) !== null && _args$ttlAsMinutes !== void 0 ? _args$ttlAsMinutes : 20;
  }, function (_ref5, ttlAsMinutes) {
    var updateTime = _ref5.updateTime;
    var isForceUpdate = ttlAsMinutes === 0;
    if (isForceUpdate) {
      return false;
    }
    var diffByNowAsMinutes = (0, _moment["default"])().diff((0, _moment["default"])(updateTime), 'minutes');
    return R.lte(diffByNowAsMinutes, ttlAsMinutes);
  });
};
var actualizedOffersDomain = R.pipe(domain, R.prop('actualizedOffers'));
var getActualizedEntity = function getActualizedEntity() {
  return (0, _reselect.createSelector)(actualizedOffersDomain, getOfferID, function (offer, _ref6) {
    var _offer$key;
    var key = _ref6.key;
    return (_offer$key = offer[key]) !== null && _offer$key !== void 0 ? _offer$key : EMPTY_OBJ;
  });
};
var getActualizedOffer = exports.getActualizedOffer = function getActualizedOffer() {
  return (0, _reselect.createSelector)(getActualizedEntity(), R.prop('offer'));
};
var getActualizedStatus = exports.getActualizedStatus = function getActualizedStatus() {
  return (0, _reselect.createSelector)(getActualizedEntity(), R.prop('actualizedStatus'));
};
var isActualizedOffer = exports.isActualizedOffer = function isActualizedOffer() {
  return (0, _reselect.createSelector)(getActualizedStatus(), R.ifElse(Boolean, function (status) {
    return status === _constants.ACTUALIZED_OFFER_STATUS.ACTUALIZED;
  }, R.F));
};
var makeSelectorByStatus = function makeSelectorByStatus(status) {
  return function () {
    return (0, _reselect.createSelector)(getActualizedStatus(), R.equals(status));
  };
};
var isConnectionFailedWithOperator = exports.isConnectionFailedWithOperator = makeSelectorByStatus(_constants.ACTUALIZED_OFFER_STATUS.ERROR_OPERATOR_CONNECTION);
var isNotFoundActualizedOffer = exports.isNotFoundActualizedOffer = makeSelectorByStatus(_constants.ACTUALIZED_OFFER_STATUS.NOT_FOUND);
var getIsStopSaleByHotel = exports.getIsStopSaleByHotel = makeSelectorByStatus(_constants.ACTUALIZED_OFFER_STATUS.STOP_SALE_BY_HOTEL);
var getMessageByActualizedOffer = exports.getMessageByActualizedOffer = function getMessageByActualizedOffer() {
  return (0, _reselect.createSelector)(getActualizedEntity(), R.prop('message'));
};
var isEndActualizedOffer = exports.isEndActualizedOffer = function isEndActualizedOffer() {
  return (0, _reselect.createSelector)(getActualizedEntity(), R.propOr(false, 'completed'));
};
var isActualazingOffer = exports.isActualazingOffer = function isActualazingOffer() {
  return (0, _reselect.createSelector)(getActualizedEntity(), R.propOr(false, 'loading'));
};