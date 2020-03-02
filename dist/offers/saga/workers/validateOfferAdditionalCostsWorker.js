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
  var _ref$payload, offerId, queryId, token, queryCurrency, validatedTour;

  return regeneratorRuntime.wrap(function validateOfferAdditionalCostsWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _ref$payload = _ref.payload, offerId = _ref$payload.offerId, queryId = _ref$payload.queryId;
          _context.prev = 1;
          _context.next = 4;
          return (0, _effects.put)(_actions.offersActions.setOfferAdditionalCostsStatus(offerId, true));

        case 4:
          _context.next = 6;
          return (0, _effects.select)(function (state) {
            return state.auth.getIn(['otpusk', 'token']);
          });

        case 6:
          token = _context.sent;
          _context.next = 9;
          return (0, _effects.select)(function (_ref2) {
            var queries = _ref2.queries;
            return queries.getIn([queryId, 'currency']);
          });

        case 9:
          queryCurrency = _context.sent;
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
          _context.next = 26;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](1);
          console.log('[ERROR_VALIDATE_OFFER_ADD_COSTS]:', {
            offerId: offerId,
            error: _context.t0,
            err: _context.t0.message
          });
          _context.next = 24;
          return (0, _effects.put)(_actions.offersActions.setOfferAdditionalCostsStatus(offerId, false));

        case 24:
          _context.next = 26;
          return (0, _effects.put)(_actions.offersActions.validateOfferAdditionalCostsFail(offerId, _context.t0));

        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 19]]);
}