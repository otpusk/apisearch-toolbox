"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hotelsReducer = void 0;

var _immutable = require("immutable");

var _reduxActions = require("redux-actions");

var _ramda = require("ramda");

var _actions = require("./actions");

var _handleActions;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

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
    return store.merge(hotels);
  });
}), _defineProperty(_handleActions, _actions.hotelsActions.getHotelsMarkersSuccess, function (state, _ref3) {
  var markers = _ref3.payload;
  return state.mergeIn(['markers'], markers);
}), _defineProperty(_handleActions, _actions.hotelsActions.getSimilarHotelsSuccess, function (state, _ref4) {
  var _ref4$payload = _ref4.payload,
      hotelId = _ref4$payload.hotelId,
      similarHotels = _ref4$payload.similarHotels;
  return state.setIn(['similar', hotelId], (0, _immutable.Map)(similarHotels));
}), _defineProperty(_handleActions, _actions.hotelsActions.resetHotelsStore, function () {
  return (0, _ramda.clone)(initalState);
}), _handleActions), initalState);
exports.hotelsReducer = hotelsReducer;