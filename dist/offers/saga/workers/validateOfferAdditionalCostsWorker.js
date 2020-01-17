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

function validateOfferAdditionalCostsWorker(_ref) {
  var offerId, token, validatedTour;
  return regeneratorRuntime.wrap(function validateOfferAdditionalCostsWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          offerId = _ref.payload.offerId;
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
          return (0, _effects.call)(_dist.getToursValidate, token, offerId);

        case 9:
          validatedTour = _context.sent;
          _context.next = 12;
          return (0, _effects.put)(_actions.offersActions.setOfferAdditionalCostsStatus(offerId, false));

        case 12:
          _context.next = 14;
          return (0, _effects.put)(_actions.offersActions.validateOfferAdditionalCostsSuccess(offerId, validatedTour));

        case 14:
          _context.next = 23;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](1);
          console.log('[ERROR_VALIDATE_OFFER_ADD_COSTS]:', {
            offerId: offerId,
            err: _context.t0.message
          });
          _context.next = 21;
          return (0, _effects.put)(_actions.offersActions.setOfferAdditionalCostsStatus(offerId, false));

        case 21:
          _context.next = 23;
          return (0, _effects.put)(_actions.offersActions.validateOfferAdditionalCostsFail(offerId, _context.t0.message));

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 16]]);
}