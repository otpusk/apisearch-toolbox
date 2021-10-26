"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOffer = exports.getOffers = void 0;

var _reselect = require("reselect");

var R = _interopRequireWildcard(require("ramda"));

var _resultsMemory = require("../search/saga/workers/getResultsWorker/resultsMemory");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var getOffersHubFromSearchMemory = function getOffersHubFromSearchMemory(queryID) {
  return R.prop(queryID, _resultsMemory.memoryInstances) ? _resultsMemory.memoryInstances[queryID].getValues().offersHub : {};
};

var domain = function domain(_) {
  return _.offers;
};

var getOffersStore = (0, _reselect.createSelector)(domain, function (offers) {
  return offers.get('store');
});
var getOffers = (0, _reselect.createSelector)(getOffersStore, function (_) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      queryID = _ref.queryID;

  return queryID;
}, function (offersStore, queryID) {
  return R.call(R.when(R.always(queryID), function (offers) {
    return R.mergeAll([offers, getOffersHubFromSearchMemory(queryID)]);
  }), offersStore.toJS());
});
exports.getOffers = getOffers;
var getOffer = (0, _reselect.createSelector)(getOffers, function (_, _ref2) {
  var offerID = _ref2.offerID;
  return offerID;
}, function (offers, offerID) {
  return R.prop(offerID, offers);
});
exports.getOffer = getOffer;