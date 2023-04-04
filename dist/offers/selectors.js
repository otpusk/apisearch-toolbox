"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNotFoundActualizedOffer = exports.isExpiredOffer = exports.isEndActualizedOffer = exports.isConnectionFailedWithOperator = exports.isAliveOffer = exports.isActualizedOffer = exports.isActualazingOffer = exports.isActualLastUpdate = exports.getOffers = exports.getOfferStatus = exports.getOffer = exports.getMessageByActualizedOffer = exports.getActualizedOffer = void 0;
var _reselect = require("reselect");
var R = _interopRequireWildcard(require("ramda"));
var _moment = _interopRequireDefault(require("moment"));
var _resultsMemory = require("../search/saga/workers/getResultsWorker/resultsMemory");
var _constants = require("./constants");
var _helpers = require("./helpers");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var EMPTY_OBJ = {};
var getOffersHubFromSearchMemory = function getOffersHubFromSearchMemory(queryID) {
  return R.prop(queryID, _resultsMemory.memoryInstances) ? _resultsMemory.memoryInstances[queryID].getValues().offersHub : {};
};
var domain = function domain(_) {
  return _.offers;
};
var getOfferID = function getOfferID(_, _ref) {
  var offerID = _ref.offerID;
  var _ref2 = typeof offerID === 'string' ? (0, _helpers.exactOfferIdWithMeta)(offerID) : [offerID],
    _ref3 = _slicedToArray(_ref2, 2),
    id = _ref3[0],
    meta = _ref3[1];
  return {
    offerID: id,
    meta: meta
  };
};
var getOffersStore = (0, _reselect.createSelector)(domain, function (offers) {
  return offers.get('store');
});
var getOffersStatuses = (0, _reselect.createSelector)(domain, function (offers) {
  return offers.get('status');
});
var getOfferStatus = (0, _reselect.createSelector)(getOffersStatuses, getOfferID, function (map, _ref4) {
  var offerID = _ref4.offerID;
  return map.get(offerID);
});
exports.getOfferStatus = getOfferStatus;
var isAliveOffer = (0, _reselect.createSelector)(getOfferStatus, R.equals(_constants.ALIVE_OFFER_STATUS));
exports.isAliveOffer = isAliveOffer;
var isExpiredOffer = (0, _reselect.createSelector)(getOfferStatus, R.equals(_constants.EXPIRED_OFFER_STATUS));
exports.isExpiredOffer = isExpiredOffer;
var getOffers = function getOffers() {
  return (0, _reselect.createSelector)(getOffersStore, function (_) {
    var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      queryID = _ref5.queryID;
    return queryID;
  }, function (store, queryID) {
    return queryID ? R.mergeAll([store.toObject(), getOffersHubFromSearchMemory(queryID)]) : store.toObject();
  });
};
exports.getOffers = getOffers;
var getOffer = function getOffer() {
  return (0, _reselect.createSelector)(getOffers(), getOfferID, function (offers, _ref6) {
    var offerID = _ref6.offerID,
      meta = _ref6.meta;
    return R.when(Boolean, function (offer) {
      return meta ? R.mergeAll([offer, meta]) : offer;
    }, R.prop(offerID, offers));
  });
};
exports.getOffer = getOffer;
var isActualLastUpdate = function isActualLastUpdate() {
  return (0, _reselect.createSelector)(getOffer(), function (_ref7) {
    var updateTime = _ref7.updateTime;
    return (0, _moment["default"])().diff((0, _moment["default"])(updateTime), 'minutes') <= 20;
  });
};
exports.isActualLastUpdate = isActualLastUpdate;
var actualizedOffersDomain = (0, _reselect.createSelector)(domain, function (_) {
  return _.get('actualizedOffers');
});
var getActualizedEntity = function getActualizedEntity() {
  return (0, _reselect.createSelector)(actualizedOffersDomain, getOfferID, function (offer, _ref8) {
    var offerID = _ref8.offerID;
    return offer[offerID] || EMPTY_OBJ;
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