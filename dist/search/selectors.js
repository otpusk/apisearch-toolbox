"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFail = exports.isSearch = exports.isDone = exports.isStart = exports.getError = exports.selectOperatorsWithMinPrice = exports.selectOperators = exports.offersByKey = exports.hotelsByKey = exports.isSetSearch = exports.getHotelsByMinPrice = exports.searchByKey = void 0;

var _reselect = require("reselect");

var R = _interopRequireWildcard(require("ramda"));

var _offers = require("./../offers");

var _helpers = require("./helpers");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var domain = function domain(_) {
  return _.search;
};

var defaultSearch = {};

var searchByKey = function searchByKey() {
  return (0, _reselect.createSelector)(domain, function (_, _ref) {
    var queryID = _ref.queryID;
    return queryID;
  }, function (search, key) {
    return R.call(R.ifElse(Boolean, function (result) {
      return result.toJS();
    }, R.always(defaultSearch)), search.getIn(['results', key]));
  });
};

exports.searchByKey = searchByKey;

var getHotelsByPages = function getHotelsByPages() {
  return (0, _reselect.createSelector)(searchByKey(), R.pipe(R.prop('hotels'), R.values));
};

var getHotelsByMinPrice = function getHotelsByMinPrice() {
  return (0, _reselect.createSelector)(getHotelsByPages(), _offers.offersSelectors.offersHub, function (pages, offersMap) {
    return R.map(function (hotelsMap) {
      return R.call(R.pipe(R.toPairs, R.map(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            hotelID = _ref3[0],
            offersIDs = _ref3[1];

        return {
          hotelID: hotelID,
          offersIDs: R.call(R.pipe(R.map(function (id) {
            return offersMap[id];
          }), _helpers.sortOffersByMinPrice), offersIDs)
        };
      }), _helpers.sortHotelsByMinOffer), hotelsMap);
    }, pages);
  });
};

exports.getHotelsByMinPrice = getHotelsByMinPrice;
var isSetSearch = (0, _reselect.createSelector)(searchByKey(), function (search) {
  return !R.isEmpty(search);
});
exports.isSetSearch = isSetSearch;

var hotelsByKey = function hotelsByKey() {
  return (0, _reselect.createSelector)(getHotelsByPages(), R.reduce(R.mergeRight, {}));
};

exports.hotelsByKey = hotelsByKey;

var offersByKey = function offersByKey() {
  return (0, _reselect.createSelector)(hotelsByKey(), _offers.offersSelectors.offersHub, function (hotels, offers) {
    return R.pipe(R.values, R.flatten, R.map(function (offerID) {
      return R.prop(offerID, offers);
    }), R.filter(Boolean))(hotels);
  });
};

exports.offersByKey = offersByKey;

var selectOperators = function selectOperators() {
  return (0, _reselect.createSelector)(searchByKey(), function (_ref4) {
    var operators = _ref4.operators;
    return operators;
  });
};

exports.selectOperators = selectOperators;

var selectOperatorsWithMinPrice = function selectOperatorsWithMinPrice() {
  return (0, _reselect.createSelector)(selectOperators(), offersByKey(), function (operators, offers) {
    return R.pipe(R.groupBy(R.prop('operator')), function (grouped) {
      return R.map(function (oid) {
        return [R.pipe(R.set(R.lensProp('completed'), R.prop(oid, operators)), R.set(R.lensProp('id'), Number(oid)))({}), R.prop(oid, grouped)];
      }, R.keys(operators));
    }, R.map(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
          operator = _ref6[0],
          grouped = _ref6[1];

      return [operator, R.when(Boolean, R.pipe(_helpers.sortOffersByMinPrice, R.prop(0)))(grouped)];
    }))(offers);
  });
};

exports.selectOperatorsWithMinPrice = selectOperatorsWithMinPrice;

var getError = function getError() {
  return (0, _reselect.createSelector)(searchByKey(), R.prop('error'));
};

exports.getError = getError;
var isStart = (0, _reselect.createSelector)(searchByKey(), function (_ref7) {
  var status = _ref7.status;
  return status === 'starting';
});
exports.isStart = isStart;
var isDone = (0, _reselect.createSelector)(searchByKey(), function (_ref8) {
  var status = _ref8.status;
  return status === 'done';
});
exports.isDone = isDone;
var isSearch = (0, _reselect.createSelector)(searchByKey(), function (_ref9) {
  var status = _ref9.status;
  return status === 'processing';
});
exports.isSearch = isSearch;
var isFail = (0, _reselect.createSelector)(searchByKey(), function (_ref10) {
  var status = _ref10.status;
  return status === 'failed';
});
exports.isFail = isFail;