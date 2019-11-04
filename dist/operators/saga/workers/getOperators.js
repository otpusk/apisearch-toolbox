"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOperatorsWorker = getOperatorsWorker;

var _effects = require("redux-saga/effects");

var _jsonApi = require("@otpusk/json-api");

var _actions = require("../../actions");

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(getOperatorsWorker);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function getOperatorsWorker(_ref) {
  var payload, countryId, _payload$options, options, _ref2, _ref3, token, lang, operators;

  return regeneratorRuntime.wrap(function getOperatorsWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          payload = _ref.payload;
          countryId = payload.countryId, _payload$options = payload.options, options = _payload$options === void 0 ? {} : _payload$options;
          _context.next = 4;
          return (0, _effects.select)(function (_ref4) {
            var auth = _ref4.auth;
            return [auth.getIn(['otpusk', 'token']), auth.getIn(['otpusk', 'lang'], 'rus')];
          });

        case 4:
          _ref2 = _context.sent;
          _ref3 = _slicedToArray(_ref2, 2);
          token = _ref3[0];
          lang = _ref3[1];
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