"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.operatorsReducer = void 0;
var _reduxActions = require("redux-actions");
var _immutable = require("immutable");
var _actions = require("./actions");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; } // actions
var initialState = (0, _immutable.Map)({
  'rates': {},
  'store': (0, _immutable.Map)(),
  'ui': (0, _immutable.Map)()
});
var operatorsReducer = exports.operatorsReducer = (0, _reduxActions.handleActions)(_defineProperty(_defineProperty(_defineProperty({}, _actions.operatorsActions.getOperatorsSuccess, function (state, _ref) {
  var payload = _ref.payload;
  var countryId = payload.countryId,
    operators = payload.operators;
  return state.setIn(['store', countryId], operators);
}), _actions.operatorsActions.setUiFlag, function (state, _ref2) {
  var payload = _ref2.payload;
  var path = payload.path,
    value = payload.value;
  return state.setIn(['ui'].concat(_toConsumableArray(path)), value);
}), _actions.operatorsActions.getCurrencyRatesSuccess, function (state, _ref3) {
  var payload = _ref3.payload;
  var key = payload.key,
    rates = payload.rates;
  return state.setIn(['rates', key], rates);
}), initialState);