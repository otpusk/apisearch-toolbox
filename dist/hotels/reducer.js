"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hotelsReducer = void 0;
var _immutable = require("immutable");
var _reduxActions = require("redux-actions");
var _ramda = require("ramda");
var _actions = require("./actions");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
var hotelsReducer = exports.hotelsReducer = (0, _reduxActions.handleActions)(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, (0, _reduxActions.combineActions)(_actions.hotelsActions.addHotel, _actions.hotelsActions.getHotelSuccess), function (state, _ref) {
  var hotel = _ref.payload;
  return state.updateIn(['store', String(hotel.id)], function (current) {
    return current ? mergeTwoHotels(hotel, current) : hotel;
  });
}), _actions.hotelsActions.addHotels, function (state, _ref2) {
  var hotels = _ref2.payload;
  return state.updateIn(['store'], function (store) {
    return store.merge(hotels);
  });
}), _actions.hotelsActions.getHotelsMarkersSuccess, function (state, _ref3) {
  var markers = _ref3.payload;
  return state.mergeIn(['markers'], markers);
}), _actions.hotelsActions.getSimilarHotelsSuccess, function (state, _ref4) {
  var _ref4$payload = _ref4.payload,
    hotelId = _ref4$payload.hotelId,
    similarHotels = _ref4$payload.similarHotels;
  return state.setIn(['similar', hotelId], (0, _immutable.Map)(similarHotels));
}), _actions.hotelsActions.resetHotelsStore, function () {
  return (0, _ramda.clone)(initalState);
}), initalState);