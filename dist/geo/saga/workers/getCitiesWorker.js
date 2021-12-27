"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCitiesWorker = getCitiesWorker;

var _effects = require("redux-saga/effects");

var _actions = require("../../actions");

var _jsonApi = require("@otpusk/json-api");

var _marked = /*#__PURE__*/regeneratorRuntime.mark(getCitiesWorker);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getCitiesWorker(_ref) {
  var _ref$payload, countryId, _ref$payload$options, options, _yield$select, token, lang, cities;

  return regeneratorRuntime.wrap(function getCitiesWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _ref$payload = _ref.payload, countryId = _ref$payload.countryId, _ref$payload$options = _ref$payload.options, options = _ref$payload$options === void 0 ? {
            'with': 'price'
          } : _ref$payload$options;
          _context.prev = 1;
          _context.next = 4;
          return (0, _effects.select)(function (_ref2) {
            var auth = _ref2.auth;
            return {
              token: auth.getIn(['otpusk', 'token']),
              lang: auth.getIn(['otpusk', 'lang'], 'rus')
            };
          });

        case 4:
          _yield$select = _context.sent;
          token = _yield$select.token;
          lang = _yield$select.lang;
          _context.next = 9;
          return (0, _effects.call)(_jsonApi.getToursCities, token, countryId, _objectSpread({
            lang: lang
          }, options));

        case 9:
          cities = _context.sent;
          _context.next = 12;
          return (0, _effects.put)(_actions.geoActions.getCitiesSuccess(countryId, cities));

        case 12:
          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](1);
          _context.next = 18;
          return (0, _effects.put)(_actions.geoActions.getCitiesFail(_context.t0));

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 14]]);
}