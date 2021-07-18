"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.servicesReducer = void 0;

var _immutable = require("immutable");

var _reduxActions = require("redux-actions");

var _actions = require("./actions");

var _handleActions;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = (0, _immutable.Map)({
  labels: (0, _immutable.Map)({
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
  }),
  groups: (0, _immutable.Map)(),
  countries: (0, _immutable.Map)()
});
var servicesReducer = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, _actions.servicesActions.getServicesSuccess, function (state, _ref) {
  var _ref$payload = _ref.payload,
      countryId = _ref$payload.countryId,
      raw = _ref$payload.services;
  var servicesWithLabels = (0, _immutable.fromJS)(raw);
  var services = servicesWithLabels.map(function (group) {
    return group.map(function (label, code) {
      return code;
    }).toList();
  });
  var labels = servicesWithLabels.reduce(function (list, group) {
    return list.merge(group);
  }, (0, _immutable.Map)());
  return state.setIn(['groups'], services).setIn(['countries', countryId], services).mergeIn(['labels'], labels);
}), _defineProperty(_handleActions, _actions.servicesActions.setLabels, function (state, _ref2) {
  var labels = _ref2.payload;
  return state.set('labels', labels);
}), _handleActions), initialState);
exports.servicesReducer = servicesReducer;