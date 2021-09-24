"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.servicesReducer = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _reduxActions = require("redux-actions");

var _actions = require("./actions");

var _handleActions;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  labels: {
    'beach_line': 'Линия пляжа',
    'location': 'Расположение',
    'beach': 'Пляж',
    'main': 'Главное',
    'beach_type': 'тип пляжа',
    'child': 'Для детей',
    'hotel': 'Услуги в отеле',
    'room': 'Удобства в номерах',
    'sport': 'Развлечения и спорт',
    'recommend': 'Отели с рекомендацией'
  },
  store: {}
};
var servicesReducer = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, _actions.servicesActions.setLabels, function (state, _ref) {
  var labels = _ref.payload;
  return R.set(R.lensProp('labels'), labels, state);
}), _defineProperty(_handleActions, _actions.servicesActions.mergeLabels, function (state, _ref2) {
  var labels = _ref2.payload;
  return R.over(R.lensProp('labels'), function (prevLables) {
    return R.mergeAll([prevLables, labels]);
  }, state);
}), _defineProperty(_handleActions, _actions.servicesActions.getServicesSuccess, function (state, _ref3) {
  var payload = _ref3.payload;
  var countryId = payload.countryId,
      services = payload.services;
  return R.set(R.lensPath(['store', countryId]), services, state);
}), _handleActions), initialState);
exports.servicesReducer = servicesReducer;