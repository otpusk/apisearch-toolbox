"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrencyRatesWorker = getCurrencyRatesWorker;

var _effects = require("redux-saga/effects");

var _jsonApi = require("@otpusk/json-api");

var _actions = require("../../actions");

var _helpers = require("./../../helpers");

var _marked = /*#__PURE__*/regeneratorRuntime.mark(getCurrencyRatesWorker);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function getCurrencyRatesWorker(_ref) {
  var payload, dateFrom, dateTo, _payload$options, options, _yield$select, _yield$select2, token, lang, hash, rates;

  return regeneratorRuntime.wrap(function getCurrencyRatesWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          payload = _ref.payload;
          dateFrom = payload.dateFrom, dateTo = payload.dateTo, _payload$options = payload.options, options = _payload$options === void 0 ? {} : _payload$options;
          _context.next = 4;
          return (0, _effects.select)(function (_ref2) {
            var auth = _ref2.auth;
            return [auth.getIn(['otpusk', 'token']), auth.getIn(['otpusk', 'lang'], 'rus')];
          });

        case 4:
          _yield$select = _context.sent;
          _yield$select2 = _slicedToArray(_yield$select, 2);
          token = _yield$select2[0];
          lang = _yield$select2[1];
          hash = (0, _helpers.createRateHash)(dateFrom, dateTo);
          _context.next = 11;
          return (0, _effects.put)(_actions.operatorsActions.setUiFlag([hash], {
            loading: true,
            error: false,
            completed: false,
            message: null
          }));

        case 11:
          _context.prev = 11;
          _context.next = 14;
          return (0, _effects.call)(_jsonApi.getToursCurrencyRates, token, {
            from: dateFrom,
            to: dateTo
          }, _objectSpread({
            lang: lang
          }, options));

        case 14:
          rates = _context.sent;
          _context.next = 17;
          return (0, _effects.put)(_actions.operatorsActions.getCurrencyRatesSuccess(hash, rates));

        case 17:
          _context.next = 27;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](11);
          _context.next = 23;
          return (0, _effects.put)(_actions.operatorsActions.getCurrencyRatesFail(_context.t0));

        case 23:
          _context.next = 25;
          return (0, _effects.put)(_actions.operatorsActions.setUiFlag([hash, 'error'], true));

        case 25:
          _context.next = 27;
          return (0, _effects.put)(_actions.operatorsActions.setUiFlag([hash, 'message'], _context.t0.message));

        case 27:
          _context.prev = 27;
          _context.next = 30;
          return (0, _effects.put)(_actions.operatorsActions.setUiFlag([hash, 'loading'], false));

        case 30:
          _context.next = 32;
          return (0, _effects.put)(_actions.operatorsActions.setUiFlag([hash, 'completed'], true));

        case 32:
          return _context.finish(27);

        case 33:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[11, 19, 27, 33]]);
}