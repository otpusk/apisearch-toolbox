"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getServicesWorker = getServicesWorker;

var _effects = require("redux-saga/effects");

var R = _interopRequireWildcard(require("ramda"));

var _jsonApi = require("@otpusk/json-api");

var _actions = require("../../actions");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(getServicesWorker);

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var groupMapperLabelKeys = function groupMapperLabelKeys(group) {
  return R.map(R.pipe(R.keys, function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
        labelKey = _ref2[0];

    return labelKey;
  }), group);
};

var normalizeServices = function normalizeServices(services) {
  return R.call(R.pipe(R.toPairs, R.map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        serviceKey = _ref4[0],
        group = _ref4[1];

    return [serviceKey, groupMapperLabelKeys(group)];
  }), R.fromPairs), services);
};

var extractLabels = function extractLabels(services) {
  return R.call(R.pipe(R.toPairs, R.map(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        group = _ref6[1];

    return group;
  }), R.flatten, R.reduce(function (result, service) {
    return R.mergeAll([result, service]);
  }, {})), services);
};

function getServicesWorker(_ref7) {
  var countryId, _yield$select, token, lang, services;

  return regeneratorRuntime.wrap(function getServicesWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          countryId = _ref7.payload;
          _context.prev = 1;
          _context.next = 4;
          return (0, _effects.select)(function (_ref8) {
            var auth = _ref8.auth;
            return {
              token: auth.getIn(['otpusk', 'token']),
              lang: auth.getIn(['otpusk', 'lang'])
            };
          });

        case 4:
          _yield$select = _context.sent;
          token = _yield$select.token;
          lang = _yield$select.lang;
          _context.next = 9;
          return (0, _effects.call)(_jsonApi.getToursServices, token, countryId, lang);

        case 9:
          services = _context.sent;
          _context.next = 12;
          return (0, _effects.put)(_actions.servicesActions.mergeLabels(extractLabels(services)));

        case 12:
          _context.next = 14;
          return (0, _effects.put)(_actions.servicesActions.getServicesSuccess(countryId, normalizeServices(services)));

        case 14:
          _context.next = 20;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](1);
          _context.next = 20;
          return (0, _effects.put)(_actions.servicesActions.getServicesFail(_context.t0));

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 16]]);
}