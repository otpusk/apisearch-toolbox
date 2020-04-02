"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateOfferAdditionalCostsWorker = validateOfferAdditionalCostsWorker;

var _effects = require("redux-saga/effects");

var _actions = require("../../actions");

var _dist = require("@otpusk/json-api/dist");

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(validateOfferAdditionalCostsWorker);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function validateOfferAdditionalCostsWorker(_ref) {
  var offerId, _ref2, departure, isBus, token, validatedTour;

  return regeneratorRuntime.wrap(function validateOfferAdditionalCostsWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          offerId = _ref.payload.offerId;
          _context.prev = 1;
          _context.next = 4;
          return (0, _effects.select)(function (_ref3) {
            var offers = _ref3.offers;
            return {
              departure: offers.getIn(['store', offerId, 'departure']),
              isBus: offers.getIn(['store', offerId, 'transport'], 'air') === 'bus'
            };
          });

        case 4:
          _ref2 = _context.sent;
          departure = _ref2.departure;
          isBus = _ref2.isBus;
          _context.next = 9;
          return (0, _effects.put)(_actions.offersActions.setOfferAdditionalCostsStatus(offerId, true));

        case 9:
          _context.next = 11;
          return (0, _effects.select)(function (state) {
            return state.auth.getIn(['otpusk', 'token']);
          });

        case 11:
          token = _context.sent;
          _context.next = 14;
          return (0, _effects.call)(_dist.getToursValidate, _objectSpread({}, isBus ? _objectSpread({}, token, {
            city: Number(departure)
          }) : token), offerId);

        case 14:
          validatedTour = _context.sent;
          _context.next = 17;
          return (0, _effects.put)(_actions.offersActions.setOfferAdditionalCostsStatus(offerId, false));

        case 17:
          _context.next = 19;
          return (0, _effects.put)(_actions.offersActions.validateOfferAdditionalCostsSuccess(offerId, validatedTour));

        case 19:
          _context.next = 32;
          break;

        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](1);
          _context.next = 25;
          return (0, _effects.put)(_actions.offersActions.setOfferAdditionalCostsStatus(offerId, false));

        case 25:
          if (!(_context.t0.message && _context.t0.message.includes('timed out'))) {
            _context.next = 30;
            break;
          }

          _context.next = 28;
          return (0, _effects.put)(_actions.offersActions.validateOfferAdditionalCostsSuccess(offerId, {
            status: 12,
            message: 'timed out',
            price: {
              usd: 0,
              eur: 0,
              uah: 0
            }
          }));

        case 28:
          _context.next = 32;
          break;

        case 30:
          _context.next = 32;
          return (0, _effects.put)(_actions.offersActions.validateOfferAdditionalCostsFail(offerId, _context.t0));

        case 32:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 21]]);
}