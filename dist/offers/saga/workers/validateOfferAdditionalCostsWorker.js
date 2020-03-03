"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateOfferAdditionalCostsWorker = validateOfferAdditionalCostsWorker;

var _effects = require("redux-saga/effects");

var _actions = require("../../actions");

var _dist = require("@otpusk/json-api/dist");

var _marked = /*#__PURE__*/regeneratorRuntime.mark(validateOfferAdditionalCostsWorker);

function validateOfferAdditionalCostsWorker(_ref) {
  var _ref$payload, offerId, queryId, queryCurrency, token, validatedTour;

  return regeneratorRuntime.wrap(function validateOfferAdditionalCostsWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _ref$payload = _ref.payload, offerId = _ref$payload.offerId, queryId = _ref$payload.queryId;
          _context.next = 3;
          return (0, _effects.select)(function (_ref2) {
            var queries = _ref2.queries;
            return queries.getIn([queryId, 'currency']);
          }, 'usd');

        case 3:
          queryCurrency = _context.sent;
          _context.prev = 4;
          _context.next = 7;
          return (0, _effects.put)(_actions.offersActions.setOfferAdditionalCostsStatus(offerId, true));

        case 7:
          _context.next = 9;
          return (0, _effects.select)(function (state) {
            return state.auth.getIn(['otpusk', 'token']);
          });

        case 9:
          token = _context.sent;
          _context.next = 12;
          return (0, _effects.call)(_dist.getToursValidate, token, offerId);

        case 12:
          validatedTour = _context.sent;
          _context.next = 15;
          return (0, _effects.put)(_actions.offersActions.setOfferAdditionalCostsStatus(offerId, false));

        case 15:
          _context.next = 17;
          return (0, _effects.put)(_actions.offersActions.validateOfferAdditionalCostsSuccess(offerId, validatedTour, queryCurrency));

        case 17:
          _context.next = 30;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](4);
          _context.next = 23;
          return (0, _effects.put)(_actions.offersActions.setOfferAdditionalCostsStatus(offerId, false));

        case 23:
          if (!(_context.t0.message && _context.t0.message.includes('timed out'))) {
            _context.next = 28;
            break;
          }

          _context.next = 26;
          return (0, _effects.put)(_actions.offersActions.validateOfferAdditionalCostsSuccess(offerId, {
            status: 12,
            message: 'timed out',
            price: {
              usd: 0,
              eur: 0,
              uah: 0
            }
          }, queryCurrency));

        case 26:
          _context.next = 30;
          break;

        case 28:
          _context.next = 30;
          return (0, _effects.put)(_actions.offersActions.validateOfferAdditionalCostsFail(offerId, _context.t0));

        case 30:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[4, 19]]);
}