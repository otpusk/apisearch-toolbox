"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOperatorsWorker = getOperatorsWorker;

var _effects = require("redux-saga/effects");

var _jsonApi = require("@otpusk/json-api");

var _actions = require("../../actions");

var _marked = /*#__PURE__*/regeneratorRuntime.mark(getOperatorsWorker);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function getOperatorsWorker(_ref) {
  var payload, countryId, _payload$options, options, _yield$select, _yield$select2, token, lang, operators;

  return regeneratorRuntime.wrap(function getOperatorsWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          payload = _ref.payload;
          countryId = payload.countryId, _payload$options = payload.options, options = _payload$options === void 0 ? {} : _payload$options;
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
          _context.next = 10;
          return (0, _effects.put)(_actions.operatorsActions.setUiFlag([countryId], {
            loading: true,
            error: false,
            completed: false,
            message: null
          }));

        case 10:
          _context.prev = 10;
          _context.next = 13;
          return (0, _effects.call)(_jsonApi.getToursOperators, token, countryId, _objectSpread({
            lang: lang
          }, options));

        case 13:
          operators = _context.sent;
          _context.next = 16;
          return (0, _effects.put)(_actions.operatorsActions.getOperatorsSuccess(countryId, operators));

        case 16:
          _context.next = 26;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](10);
          _context.next = 22;
          return (0, _effects.put)(_actions.operatorsActions.getOperatorsFail(_context.t0));

        case 22:
          _context.next = 24;
          return (0, _effects.put)(_actions.operatorsActions.setUiFlag([countryId, 'error'], true));

        case 24:
          _context.next = 26;
          return (0, _effects.put)(_actions.operatorsActions.setUiFlag([countryId, 'message'], _context.t0.message));

        case 26:
          _context.prev = 26;
          _context.next = 29;
          return (0, _effects.put)(_actions.operatorsActions.setUiFlag([countryId, 'loading'], false));

        case 29:
          _context.next = 31;
          return (0, _effects.put)(_actions.operatorsActions.setUiFlag([countryId, 'completed'], true));

        case 31:
          return _context.finish(26);

        case 32:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[10, 18, 26, 32]]);
}