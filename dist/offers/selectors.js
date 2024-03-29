"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
var getOfferStatus = (0, _reselect.createSelector)(getOffersStatuses, getOfferID, function (map, _ref2) {
  var key = _ref2.key;
  return R.prop(key, map);
});
exports.getOfferStatus = getOfferStatus;
var isAliveOffer = (0, _reselect.createSelector)(getOfferStatus, R.equals(_constants.ALIVE_OFFER_STATUS));
exports.isAliveOffer = isAliveOffer;
var isExpiredOffer = (0, _reselect.createSelector)(getOfferStatus, R.equals(_constants.EXPIRED_OFFER_STATUS));
exports.isExpiredOffer = isExpiredOffer;

var getOffers = function getOffers() {
  return (0, _reselect.createSelector)(getOffersStore, function (_) {
    var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        queryID = _ref3.queryID;

    return queryID;
  }, function (store, queryID) {
    return queryID ? R.mergeAll([store, getOffersHubFromSearchMemory(queryID)]) : store;
  });
};

exports.getOffers = getOffers;

var getOffer = function getOffer() {
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

exports.getOffer = getOffer;

var isActualLastUpdate = function isActualLastUpdate() {
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

exports.isActualLastUpdate = isActualLastUpdate;
var actualizedOffersDomain = R.pipe(domain, R.prop('actualizedOffers'));

var getActualizedEntity = function getActualizedEntity() {
  return (0, _reselect.createSelector)(actualizedOffersDomain, getOfferID, function (offer, _ref6) {
    var _offer$key;

    var key = _ref6.key;
    return (_offer$key = offer[key]) !== null && _offer$key !== void 0 ? _offer$key : EMPTY_OBJ;
  });
};

var getActualizedOffer = function getActualizedOffer() {
  return (0, _reselect.createSelector)(getActualizedEntity(), R.prop('offer'));
};

exports.getActualizedOffer = getActualizedOffer;

var getActualizedStatus = function getActualizedStatus() {
  return (0, _reselect.createSelector)(getActualizedEntity(), R.prop('actualizedStatus'));
};

exports.getActualizedStatus = getActualizedStatus;

var isActualizedOffer = function isActualizedOffer() {
  return (0, _reselect.createSelector)(getActualizedStatus(), R.ifElse(Boolean, function (status) {
    return status === _constants.ACTUALIZED_OFFER_STATUS.ACTUALIZED;
  }, R.F));
};

exports.isActualizedOffer = isActualizedOffer;

var makeSelectorByStatus = function makeSelectorByStatus(status) {
  return function () {
    return (0, _reselect.createSelector)(getActualizedStatus(), R.equals(status));
  };
};

var isConnectionFailedWithOperator = makeSelectorByStatus(_constants.ACTUALIZED_OFFER_STATUS.ERROR_OPERATOR_CONNECTION);
exports.isConnectionFailedWithOperator = isConnectionFailedWithOperator;
var isNotFoundActualizedOffer = makeSelectorByStatus(_constants.ACTUALIZED_OFFER_STATUS.NOT_FOUND);
exports.isNotFoundActualizedOffer = isNotFoundActualizedOffer;
var getIsStopSaleByHotel = makeSelectorByStatus(_constants.ACTUALIZED_OFFER_STATUS.STOP_SALE_BY_HOTEL);
exports.getIsStopSaleByHotel = getIsStopSaleByHotel;

var getMessageByActualizedOffer = function getMessageByActualizedOffer() {
  return (0, _reselect.createSelector)(getActualizedEntity(), R.prop('message'));
};

exports.getMessageByActualizedOffer = getMessageByActualizedOffer;

var isEndActualizedOffer = function isEndActualizedOffer() {
  return (0, _reselect.createSelector)(getActualizedEntity(), R.propOr(false, 'completed'));
};

exports.isEndActualizedOffer = isEndActualizedOffer;

var isActualazingOffer = function isActualazingOffer() {
  return (0, _reselect.createSelector)(getActualizedEntity(), R.propOr(false, 'loading'));
};

exports.isActualazingOffer = isActualazingOffer;