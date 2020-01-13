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
  var offerId, token, _ref2, status, denormalizedOffer;

  return regeneratorRuntime.wrap(function validateOfferAdditionalCostsWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          offerId = _ref.payload.offerId;
          _context.prev = 1;
          _context.next = 4;
          return (0, _effects.select)(function (state) {
            return state.auth.getIn(['otpusk', 'token']);
          });

        case 4:
          token = _context.sent;
          _context.next = 7;
          return (0, _effects.call)(_dist.getToursValidate, token, offerId);

        case 7:
          _ref2 = _context.sent;
          status = _ref2.status;
          denormalizedOffer = _ref2.denormalizedOffer;
          console.log('validateOfferAdditionalCostsWorker offer', {
            offerId: offerId,
            status: status,
            denormalizedOffer: denormalizedOffer
          });
          _context.next = 13;
          return (0, _effects.put)(_actions.offersActions.validateOfferAdditionalCostsSuccess(offerId, status, denormalizedOffer));

        case 13:
          _context.next = 19;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](1);
          _context.next = 19;
          return (0, _effects.put)(_actions.offersActions.validateOfferAdditionalCostsFail(_context.t0));

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 15]]);
}