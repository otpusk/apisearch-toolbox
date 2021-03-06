"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hotelsReducer = void 0;

var _immutable = require("immutable");

var _reduxActions = require("redux-actions");

var R = _interopRequireWildcard(require("ramda"));

var _actions = require("./actions");

var _handleActions;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initalState = (0, _immutable.Map)({
  'store': (0, _immutable.Map)(),
  'markers': (0, _immutable.Map)(),
  'similar': (0, _immutable.Map)()
});

var mergeTwoHotels = function mergeTwoHotels(fresh, base) {
  var merged = _objectSpread({}, base);

  for (var _i = 0, _Object$entries = Object.entries(fresh); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    if (Array.isArray(merged[key])) {
      merged[key] = merged[key].concat(value).filter(function (el, i, arr) {
        return i === arr.findIndex(function (_) {
          return JSON.stringify(_) === JSON.stringify(el);
        });
      });
    } else {
      merged[key] = value;
    }
  }

  return merged;
};

var hotelsReducer = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, (0, _reduxActions.combineActions)(_actions.hotelsActions.addHotel, _actions.hotelsActions.getHotelSuccess), function (state, _ref) {
  var hotel = _ref.payload;
  return state.updateIn(['store', String(hotel.id)], function (current) {
    return current ? mergeTwoHotels(hotel, current) : hotel;
  });
}), _defineProperty(_handleActions, _actions.hotelsActions.addHotels, function (state, _ref2) {
  var hotels = _ref2.payload;
  return state.updateIn(['store'], function (store) {
    return store.mergeDeep(hotels).map(R.pipe(R.over(R.lensProp('photos'), R.uniq)));
  });
}), _defineProperty(_handleActions, _actions.hotelsActions.getHotelsMarkersSuccess, function (state, _ref3) {
  var markers = _ref3.payload;
  return state.mergeIn(['markers'], markers);
}), _defineProperty(_handleActions, _actions.hotelsActions.getSimilarHotelsSuccess, function (state, _ref4) {
  var _ref4$payload = _ref4.payload,
      hotelId = _ref4$payload.hotelId,
      similarHotels = _ref4$payload.similarHotels;
  return state.setIn(['similar', hotelId], (0, _immutable.Map)(similarHotels));
}), _handleActions), initalState);
exports.hotelsReducer = hotelsReducer;