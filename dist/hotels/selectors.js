"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hotelsHub = exports.getHotelsMarkers = exports.getHotelMarker = exports.getHotel = void 0;

var _reselect = require("reselect");

var R = _interopRequireWildcard(require("ramda"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var domain = function domain(_) {
  return _.hotels;
};

var hotelKey = function hotelKey(_, key) {
  return key;
};

var EMPTY_OBJ = {};
var getHotelsStore = (0, _reselect.createSelector)(domain, function (hotels) {
  return hotels.get('store');
});
var getHotelsMarkersStore = (0, _reselect.createSelector)(domain, function (hotels) {
  return hotels.get('markers');
});
var getHotelsMarkers = (0, _reselect.createSelector)(getHotelsMarkersStore, function (store) {
  return R.call(R.pipe(R.toPairs, R.map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        hotel = _ref2[1];

    return {
      hotelID: hotel.id,
      position: R.pick(['lat', 'lng'], hotel.location),
      stars: hotel.stars,
      zoom: hotel.location.zoom
    };
  })), store.toObject());
});
exports.getHotelsMarkers = getHotelsMarkers;

var getHotelMarker = function getHotelMarker() {
  return (0, _reselect.createSelector)(getHotelsMarkersStore, function (_, _ref3) {
    var hotelID = _ref3.hotelID;
    return hotelID;
  }, function (store, id) {
    return store.toObject()[id];
  });
};

exports.getHotelMarker = getHotelMarker;
var hotelsHub = (0, _reselect.createSelector)(getHotelsStore, R.ifElse(function (v) {
  return v.isEmpty();
}, R.always(EMPTY_OBJ), function (v) {
  return v.toJS();
}));
exports.hotelsHub = hotelsHub;

var getHotel = function getHotel() {
  return (0, _reselect.createSelector)(getHotelsStore, hotelKey, function (store, key) {
    return store.get(key.toString());
  });
};

exports.getHotel = getHotel;