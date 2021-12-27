"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.offersReducer = void 0;

var _immutable = require("immutable");

var _reduxActions = require("redux-actions");

var R = _interopRequireWildcard(require("ramda"));

var _actions = require("./actions");

var _mergeOffer = require("./utils/mergeOffer");

var _getValidatedTourPrice = require("./utils/getValidatedTourPrice");

var _handleActions;

var _excluded = ["offerId", "price", "flights"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var initalState = (0, _immutable.Map)({
  store: (0, _immutable.Map)(),
  status: (0, _immutable.Map)(),
  siblings: (0, _immutable.Map)(),
  validatedTour: (0, _immutable.Map)(),
  actualizedOffers: {}
});
var presetEmpyShapeForActualizedOffer = R.curryN(2, function (offerID, actualizedOffers) {
  return R.call(R.when(function (_ref) {
    var prevEntity = _ref[offerID];
    return !prevEntity;
  }, R.set(R.lensProp(offerID), {})), actualizedOffers);
});
var offersReducer = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, _actions.offersActions.addOffers, function (state, _ref2) {
  var newOffers = _ref2.payload;
  return state.updateIn(['store'], function (offers) {
    return offers.mergeWith(_mergeOffer.mergeObjectDeepWithoutArrays, newOffers);
  }).mergeIn(['status'], (0, _immutable.Map)(newOffers).map(function (offer, id) {
    return state.getIn(['status', id], 'alive');
  }));
}), _defineProperty(_handleActions, _actions.offersActions.setOffer, function (state, _ref3) {
  var offer = _ref3.payload;
  return state.updateIn(['store', offer.id], function () {
    var current = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return (0, _immutable.Map)(current).mergeWith(_mergeOffer.mergeObjectDeepWithoutArrays, offer).toJS();
  });
}), _defineProperty(_handleActions, _actions.offersActions.setOfferStatus, function (state, _ref4) {
  var _ref4$payload = _ref4.payload,
      offerId = _ref4$payload.offerId,
      status = _ref4$payload.status;
  return state.setIn(['status', offerId], status);
}), _defineProperty(_handleActions, _actions.offersActions.setOfferAdditionalCostsStatus, function (state, _ref5) {
  var _ref5$payload = _ref5.payload,
      offerId = _ref5$payload.offerId,
      status = _ref5$payload.status;
  return state.setIn(['validatedTour', offerId, 'isLoading'], status);
}), _defineProperty(_handleActions, _actions.offersActions.checkOfferStatusSuccess, function (state, _ref6) {
  var _ref6$payload = _ref6.payload,
      offerId = _ref6$payload.offerId,
      freshOffer = _ref6$payload.freshOffer;
  return state.updateIn(['siblings'], function (siblings) {
    return freshOffer ? siblings.set(offerId, freshOffer) : siblings;
  });
}), _defineProperty(_handleActions, _actions.offersActions.validateOfferAdditionalCostsSuccess, function (state, _ref7) {
  var _ref7$payload = _ref7.payload,
      offerId = _ref7$payload.offerId,
      price = _ref7$payload.price,
      flights = _ref7$payload.flights,
      rest = _objectWithoutProperties(_ref7$payload, _excluded);

  var newPrice = price && !Object.values(price).some(function (v) {
    return !v;
  }) ? (0, _getValidatedTourPrice.sumByKey)(price, (0, _getValidatedTourPrice.getSelectedFlightsPriceChange)(state, offerId, {
    flights: flights
  })) : (0, _getValidatedTourPrice.getValidatedTourNewPrice)(state, offerId, null);
  return state.updateIn(['validatedTour', offerId], function () {
    var current = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return (0, _immutable.Map)(current).mergeWith(_mergeOffer.mergeOfferNextPriority, _objectSpread({
      offerId: offerId,
      price: price,
      newPrice: newPrice,
      flights: flights,
      hasError: false,
      error: null
    }, rest)).toJS();
  });
}), _defineProperty(_handleActions, _actions.offersActions.validateOfferAdditionalCostsFail, function (state, _ref8) {
  var _ref8$payload = _ref8.payload,
      offerId = _ref8$payload.offerId,
      error = _ref8$payload.error;
  return state.updateIn(['validatedTour', offerId], function () {
    var current = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return (0, _immutable.Map)(current).mergeWith(_mergeOffer.mergeOfferNextPriority, {
      hasError: true,
      error: error
    }).toJS();
  });
}), _defineProperty(_handleActions, _actions.offersActions.validateSetPrice, function (state, _ref9) {
  var _ref9$payload = _ref9.payload,
      offerId = _ref9$payload.offerId,
      selectedFlights = _ref9$payload.selectedFlights;
  var newPrice = (0, _getValidatedTourPrice.getValidatedTourNewPrice)(state, offerId, selectedFlights);
  return state.updateIn(['validatedTour', offerId], function () {
    var current = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return (0, _immutable.Map)(current).mergeWith(_mergeOffer.mergeOfferNextPriority, {
      newPrice: newPrice,
      selectedFlights: selectedFlights
    }).toJS();
  });
}), _defineProperty(_handleActions, _actions.offersActions.setActualizedOffer, function (state, _ref10) {
  var payload = _ref10.payload;
  return state.updateIn(['actualizedOffers'], R.pipe(presetEmpyShapeForActualizedOffer(payload.offerID), R.set(R.lensPath([payload.offerID, 'offer']), payload.offer)));
}), _defineProperty(_handleActions, _actions.offersActions.setActualizedStatus, function (state, _ref11) {
  var payload = _ref11.payload;
  return state.updateIn(['actualizedOffers'], R.pipe(presetEmpyShapeForActualizedOffer(payload.offerID), R.set(R.lensPath([payload.offerID, 'actualizedStatus']), payload.status)));
}), _defineProperty(_handleActions, _actions.offersActions.startActualizeOffer, function (state, _ref12) {
  var offerID = _ref12.payload;
  return state.updateIn(['actualizedOffers'], R.pipe(presetEmpyShapeForActualizedOffer(offerID), R.set(R.lensPath([offerID, 'loading']), true)));
}), _defineProperty(_handleActions, _actions.offersActions.endActualizeOffer, function (state, _ref13) {
  var offerID = _ref13.payload;
  return state.updateIn(['actualizedOffers'], R.pipe(presetEmpyShapeForActualizedOffer(offerID), R.set(R.lensPath([offerID, 'loading']), false), R.set(R.lensPath([offerID, 'completed']), true)));
}), _defineProperty(_handleActions, _actions.offersActions.setErrorMessageByActualizedOffer, function (state, _ref14) {
  var payload = _ref14.payload;
  return state.updateIn(['actualizedOffers'], R.pipe(presetEmpyShapeForActualizedOffer(payload.offerID), R.set(R.lensPath([payload.offerID, 'errorMessage']), payload.message)));
}), _defineProperty(_handleActions, _actions.offersActions.failActualizedOffer, function (state, _ref15) {
  var offerID = _ref15.payload;
  return state.updateIn(['actualizedOffers'], R.pipe(presetEmpyShapeForActualizedOffer(offerID), R.set(R.lensPath([offerID, 'error']), true)));
}), _defineProperty(_handleActions, _actions.offersActions.clearActualizedOffer, function (state, _ref16) {
  var offerID = _ref16.payload;
  return state.removeIn(['actualizedOffers', offerID]);
}), _handleActions), initalState);
exports.offersReducer = offersReducer;