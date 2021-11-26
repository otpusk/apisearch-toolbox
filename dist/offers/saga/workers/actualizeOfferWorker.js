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

function actualizeOfferWorker(_ref) {
  var offerID, token, _yield$call, code, nextOffer;

  return regeneratorRuntime.wrap(function actualizeOfferWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          offerID = _ref.payload;
          _context.next = 3;
          return (0, _effects.select)(function (state) {
            return state.auth.getIn(['otpusk', 'token']);
          });

        case 3:
          token = _context.sent;
          _context.next = 6;
          return (0, _effects.put)(_actions.offersActions.startActualizeOffer(offerID));

        case 6:
          _context.prev = 6;
          _context.next = 9;
          return (0, _effects.call)(_jsonApi.getToursActual, token, offerID);

        case 9:
          _yield$call = _context.sent;
          code = _yield$call.code;
          nextOffer = _yield$call.offer;
          _context.next = 14;
          return (0, _effects.put)(_actions.offersActions.setActualizedStatus(offerID, getTextStatusByCode(code)));

        case 14:
          _context.t0 = nextOffer;

          if (!_context.t0) {
            _context.next = 18;
            break;
          }

          _context.next = 18;
          return (0, _effects.put)(_actions.offersActions.setActualizedOffer(offerID, nextOffer));

        case 18:
          _context.next = 27;
          break;

        case 20:
          _context.prev = 20;
          _context.t1 = _context["catch"](6);
          console.log(_context.t1);
          _context.next = 25;
          return (0, _effects.put)(_actions.offersActions.setActualizedStatus(offerID, _constants.ACTUALIZED_OFFER_STATUS.INVALID_REQUEST));

        case 25:
          _context.next = 27;
          return (0, _effects.put)(_actions.offersActions.failActualizedOffer(offerID));

        case 27:
          _context.prev = 27;
          _context.next = 30;
          return (0, _effects.put)(_actions.offersActions.endActualizeOffer(offerID));

        case 30:
          return _context.finish(27);

        case 31:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[6, 20, 27, 31]]);
}