"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actualizeOfferWorker = actualizeOfferWorker;

var _effects = require("redux-saga/effects");

var _jsonApi = require("@otpusk/json-api");

var R = _interopRequireWildcard(require("ramda"));

var _actions = require("../../actions");

var _constants = require("../../constants");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(actualizeOfferWorker);

var getTextStatusByCode = function getTextStatusByCode(code) {
  return R.call(R.cond([[R.equals(5), R.always(_constants.ACTUALIZED_OFFER_STATUS.ACTUALIZED)], [R.equals(4), R.always(_constants.ACTUALIZED_OFFER_STATUS.UPDATED)], [R.equals(3), R.always(_constants.ACTUALIZED_OFFER_STATUS.NEW_PRICE)], [R.equals(2), R.always(_constants.ACTUALIZED_OFFER_STATUS.NOT_FOUND)], [R.equals(1), R.always(_constants.ACTUALIZED_OFFER_STATUS.ERROR_OPERATOR_CONNECTION)], [R.equals(0), R.always(_constants.ACTUALIZED_OFFER_STATUS.INVALID_REQUEST)]]), code);
};

var generatePeopleString = function generatePeopleString(adults, children) {
  return R.call(R.pipe(R.flatten, R.filter(Boolean), R.join('')), [adults, children ? R.map(function (age) {
    return age.toString().length === 2 ? age : "0".concat(age);
  }, children) : []]);
};

function actualizeOfferWorker(_ref) {
  var _ref$payload, adults, children, offerID, token, lang, _yield$call, code, nextOffer;

  return regeneratorRuntime.wrap(function actualizeOfferWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _ref$payload = _ref.payload, adults = _ref$payload.adults, children = _ref$payload.children, offerID = _ref$payload.offerID;
          _context.next = 3;
          return (0, _effects.select)(function (state) {
            return state.auth.getIn(['otpusk', 'token']);
          });

        case 3:
          token = _context.sent;
          _context.next = 6;
          return (0, _effects.select)(function (state) {
            return state.auth.getIn(['otpusk', 'lang']);
          });

        case 6:
          lang = _context.sent;
          _context.next = 9;
          return (0, _effects.put)(_actions.offersActions.startActualizeOffer(offerID));

        case 9:
          _context.prev = 9;
          _context.next = 12;
          return (0, _effects.call)(_jsonApi.getToursActual, R.mergeAll([token, {
            lang: lang
          }]), offerID, generatePeopleString(adults, children));

        case 12:
          _yield$call = _context.sent;
          code = _yield$call.code;
          nextOffer = _yield$call.offer;
          _context.next = 17;
          return (0, _effects.put)(_actions.offersActions.setActualizedStatus(offerID, getTextStatusByCode(code)));

        case 17:
          _context.t0 = nextOffer;

          if (!_context.t0) {
            _context.next = 21;
            break;
          }

          _context.next = 21;
          return (0, _effects.put)(_actions.offersActions.setActualizedOffer(offerID, nextOffer));

        case 21:
          _context.next = 30;
          break;

        case 23:
          _context.prev = 23;
          _context.t1 = _context["catch"](9);
          console.log(_context.t1);
          _context.next = 28;
          return (0, _effects.put)(_actions.offersActions.setActualizedStatus(offerID, _constants.ACTUALIZED_OFFER_STATUS.INVALID_REQUEST));

        case 28:
          _context.next = 30;
          return (0, _effects.put)(_actions.offersActions.failActualizedOffer(offerID));

        case 30:
          _context.prev = 30;
          _context.next = 33;
          return (0, _effects.put)(_actions.offersActions.endActualizeOffer(offerID));

        case 33:
          return _context.finish(30);

        case 34:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[9, 23, 30, 34]]);
}