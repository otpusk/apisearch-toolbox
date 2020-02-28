"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOfferWorker = getOfferWorker;

var _effects = require("redux-saga/effects");

var _actions = require("../../actions");

var _jsonApi = require("@otpusk/json-api");

var _marked = /*#__PURE__*/regeneratorRuntime.mark(getOfferWorker);

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

          if (!offer.error) {
            _context.next = 12;
            break;
          }

          throw new Error(offer.error);

        case 12:
          _context.next = 14;
          return (0, _effects.put)(_actions.offersActions.setOffer(offer));

        case 14:
          _context.next = 16;
          return (0, _effects.put)(_actions.offersActions.setOfferStatus(offer.id, 'alive'));

        case 16:
          _context.next = 18;
          return (0, _effects.put)(_actions.offersActions.getOfferSuccess());

        case 18:
          _context.next = 26;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](1);
          _context.next = 24;
          return (0, _effects.put)(_actions.offersActions.setOfferStatus(offerId, 'expired'));

        case 24:
          _context.next = 26;
          return (0, _effects.put)(_actions.offersActions.getOfferFail(_context.t0));

        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 20]]);
}