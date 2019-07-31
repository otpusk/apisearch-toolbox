"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.servicesReducer = void 0;

var _immutable = require("immutable");

var _reduxActions = require("redux-actions");

var _actions = require("./actions");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = (0, _immutable.Map)({
  labels: (0, _immutable.Map)({
    'beach_line': 'Линия пляжа',
    'beach': 'Пляж',
    'main': 'Главное',
    'beach_type': 'тип пляжа',
    'child': 'Для детей',
    'hotel': 'Услуги в отеле',
    'room': 'Удобства в номерах',
    'sport': 'Развлечения и спорт',
    'recommend': 'Отели с рекомендацией'
  }),
  groups: (0, _immutable.Map)()
});
var servicesReducer = (0, _reduxActions.handleActions)(_defineProperty({}, _actions.servicesActions.getServicesSuccess, function (state, _ref) {
  var payload = _ref.payload;
  var services = (0, _immutable.fromJS)(payload);
  return state.setIn(['groups'], services.map(function (group) {
    return group.map(function (label, code) {
      return code;
    }).toList();
  })).mergeIn(['labels'], services.reduce(function (list, group) {
    return list.merge(group);
  }, (0, _immutable.Map)()));
}), initialState);
exports.servicesReducer = servicesReducer;