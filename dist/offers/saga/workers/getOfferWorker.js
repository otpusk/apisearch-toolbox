"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOfferWorker = getOfferWorker;

var _effects = require("redux-saga/effects");

var _actions = require("../../actions");

var _jsonApi = require("@otpusk/json-api");

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(getOfferWorker);

function getOfferWorker(_ref) {
  var _ref$payload, offerId, fresh, token, offer;

  return regeneratorRuntime.wrap(function getOfferWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _ref$payload = _ref.payload, offerId = _ref$payload.offerId, fresh = _ref$payload.fresh;
          _context.prev = 1;
          _context.next = 4;
          return (0, _effects.put)(_actions.offersActions.setOfferStatus(offerId, 'pending'));

        case 4:
          _context.next = 6;
          return (0, _effects.select)(function (state) {
            return state.auth.getIn(['otpusk', 'token']);
          });

        case 6:
          token = _context.sent;
          _context.next = 9;
          return (0, _effects.call)(_jsonApi.getToursOffer, token, offerId, fresh);

        case 9:
          offer = _context.sent;
          console.log('getOfferWorker offer', offer);
          _context.next = 13;
          return (0, _effects.put)(_actions.offersActions.setOffer(offer));

        case 13:
          _context.next = 15;
          return (0, _effects.put)(_actions.offersActions.setOfferStatus(offer.id, 'alive'));

        case 15:
          _context.next = 17;
          return (0, _effects.put)(_actions.offersActions.getOfferSuccess());

        case 17:
          _context.next = 25;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](1);
          _context.next = 23;
          return (0, _effects.put)(_actions.offersActions.setOfferStatus(offerId, 'expired'));

        case 23:
          _context.next = 25;
          return (0, _effects.put)(_actions.offersActions.getOfferFail(_context.t0));

        case 25:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 19]]);
}