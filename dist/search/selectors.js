"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFail = exports.isSearch = exports.isDone = exports.isStart = exports.getError = exports.selectOperatorsWithMinPrice = exports.selectOperators = exports.offersByKey = exports.hotelsByKey = exports.searchByKey = void 0;

var _reselect = require("reselect");

var R = _interopRequireWildcard(require("ramda"));

var _immutable = require("immutable");

var _offers = require("./../offers");

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

var defaultSearch = (0, _immutable.Map)();

var searchByKey = function searchByKey() {
  return (0, _reselect.createSelector)(domain, function (_, _ref) {
    var queryID = _ref.queryID;
    return queryID;
  }, function (search, key) {
    return search.getIn(['results', key], defaultSearch).toJS();
  });
};

exports.searchByKey = searchByKey;

var hotelsByKey = function hotelsByKey() {
  return (0, _reselect.createSelector)(searchByKey(), R.pipe(R.prop('hotels'), R.values, R.reduce(R.mergeRight, {})));
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
  return (0, _reselect.createSelector)(searchByKey(), function (_ref2) {
    var operators = _ref2.operators;
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
    }, R.map(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          operator = _ref4[0],
          grouped = _ref4[1];

      return [operator, R.when(Boolean, R.pipe(R.sortBy(R.ascend(R.path(['price', 'uah']))), R.prop(0)))(grouped)];
    }))(offers);
  });
};

exports.selectOperatorsWithMinPrice = selectOperatorsWithMinPrice;

var getError = function getError() {
  return (0, _reselect.createSelector)(searchByKey(), R.prop('error'));
};

exports.getError = getError;
var isStart = (0, _reselect.createSelector)(searchByKey(), function (_ref5) {
  var status = _ref5.status;
  return status === 'starting';
});
exports.isStart = isStart;
var isDone = (0, _reselect.createSelector)(searchByKey(), function (_ref6) {
  var status = _ref6.status;
  return status === 'done';
});
exports.isDone = isDone;
var isSearch = (0, _reselect.createSelector)(searchByKey(), function (_ref7) {
  var status = _ref7.status;
  return status === 'processing';
});
exports.isSearch = isSearch;
var isFail = (0, _reselect.createSelector)(searchByKey(), function (_ref8) {
  var status = _ref8.status;
  return status === 'failed';
});
exports.isFail = isFail;