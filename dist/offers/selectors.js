"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEndActualizedOffer = exports.getErrorMessageByActualizedOffer = exports.isNotFoundActualizedOffer = exports.isConnectionFailedWithOperator = exports.isActualizedOffer = exports.getActualizedOffer = exports.isActualLastUpdate = exports.getOffer = exports.getOffers = void 0;

var _reselect = require("reselect");

var R = _interopRequireWildcard(require("ramda"));

var _moment = _interopRequireDefault(require("moment"));

var _resultsMemory = require("../search/saga/workers/getResultsWorker/resultsMemory");

var _constants = require("./constants");

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
  var offerID = _ref.offerID;
  return offerID;
};

var getOffersStore = (0, _reselect.createSelector)(domain, function (offers) {
  return offers.get('store');
});

var getOffers = function getOffers() {
  return (0, _reselect.createSelector)(getOffersStore, function (_) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        queryID = _ref2.queryID;

    return queryID;
  }, function (offersStore, queryID) {
    return R.call(R.when(R.always(queryID), function (offers) {
      return R.mergeAll([offers, getOffersHubFromSearchMemory(queryID)]);
    }), offersStore.toJS());
  });
};

exports.getOffers = getOffers;

var getOffer = function getOffer() {
  return (0, _reselect.createSelector)(getOffers(), getOfferID, function (offers, offerID) {
    return R.prop(offerID, offers);
  });
};

exports.getOffer = getOffer;

var isActualLastUpdate = function isActualLastUpdate() {
  return (0, _reselect.createSelector)(getOffer(), function (_ref3) {
    var updateTime = _ref3.updateTime;
    return (0, _moment["default"])().diff((0, _moment["default"])(updateTime), 'minutes') <= 20;
  });
};

exports.isActualLastUpdate = isActualLastUpdate;
var actualizedOffersDomain = (0, _reselect.createSelector)(domain, function (_) {
  return _.get('actualizedOffers');
});

var getActualizedEntity = function getActualizedEntity() {
  return (0, _reselect.createSelector)(actualizedOffersDomain, getOfferID, function (offer, id) {
    return offer[id] || EMPTY_OBJ;
  });
};

var getActualizedOffer = function getActualizedOffer() {
  return (0, _reselect.createSelector)(getActualizedEntity(), R.prop('offer'));
};

exports.getActualizedOffer = getActualizedOffer;

var getActualizedStatus = function getActualizedStatus() {
  return (0, _reselect.createSelector)(getActualizedEntity(), R.prop('actualizedStatus'));
};

var isActualizedOffer = function isActualizedOffer() {
  return (0, _reselect.createSelector)(getActualizedStatus(), R.ifElse(Boolean, function (status) {
    return status === _constants.ACTUALIZED_OFFER_STATUS.ACTUALIZED;
  }, R.F));
};

exports.isActualizedOffer = isActualizedOffer;

var isConnectionFailedWithOperator = function isConnectionFailedWithOperator() {
  return (0, _reselect.createSelector)(getActualizedStatus(), function (status) {
    return status === _constants.ACTUALIZED_OFFER_STATUS.ERROR_OPERATOR_CONNECTION;
  });
};

exports.isConnectionFailedWithOperator = isConnectionFailedWithOperator;

var isNotFoundActualizedOffer = function isNotFoundActualizedOffer() {
  return (0, _reselect.createSelector)(getActualizedStatus(), function (status) {
    return status === _constants.ACTUALIZED_OFFER_STATUS.NOT_FOUND;
  });
};

exports.isNotFoundActualizedOffer = isNotFoundActualizedOffer;

var getErrorMessageByActualizedOffer = function getErrorMessageByActualizedOffer() {
  return (0, _reselect.createSelector)(getActualizedEntity(), R.prop('errorMessage'));
};

exports.getErrorMessageByActualizedOffer = getErrorMessageByActualizedOffer;

var isEndActualizedOffer = function isEndActualizedOffer() {
  return (0, _reselect.createSelector)(getActualizedEntity(), R.ifElse(Boolean, R.propOr(false, 'completed'), R.F));
};

exports.isEndActualizedOffer = isEndActualizedOffer;