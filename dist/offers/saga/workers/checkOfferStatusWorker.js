"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkOfferStatusWorker = checkOfferStatusWorker;

var _effects = require("redux-saga/effects");

var _immutable = require("immutable");

var _actions = require("../../actions");

var _jsonApi = require("@otpusk/json-api");

var _dictionary = require("@otpusk/json-api/dist/dictionary");

var _fn = require("../../../queries/fn");

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(checkOfferStatusWorker);

function checkOfferStatusWorker(_ref) {
  var _ref$payload, offerId, hotelId, hotel, currentOffer, adults, children, tourists, token, _ref6, freshOffer, code, isTouched;

  return regeneratorRuntime.wrap(function checkOfferStatusWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _ref$payload = _ref.payload, offerId = _ref$payload.offerId, hotelId = _ref$payload.hotelId;
          _context.next = 3;
          return (0, _effects.select)(function (_ref2) {
            var hotels = _ref2.hotels;
            return hotels.getIn(['store', hotelId]);
          });

        case 3:
          hotel = _context.sent;
          _context.next = 6;
          return (0, _effects.select)(function (_ref3) {
            var offers = _ref3.offers;
            return offers.getIn(['store', offerId]);
          });

        case 6:
          currentOffer = _context.sent;
          _context.prev = 7;
          _context.next = 10;
          return (0, _effects.select)(function (_ref4) {
            var queries = _ref4.queries;
            return queries.getIn(['form', _fn.QUERY_PARAMS.ADULTS]);
          });

        case 10:
          adults = _context.sent;
          _context.next = 13;
          return (0, _effects.select)(function (_ref5) {
            var queries = _ref5.queries;
            return queries.getIn(['form', _fn.QUERY_PARAMS.CHILDREN], (0, _immutable.Range)(0, currentOffer.children).toArray().map(function () {
              return Number(currentOffer.childrenAge.replace(/\D.*/, '').replace(/^(\d)$/, '0$1'));
            }));
          });

        case 13:
          children = _context.sent;
          tourists = "".concat(adults).concat(children.map(function (age) {
            return age >= 10 ? age : "0".concat(age);
          }).join(''));
          _context.next = 17;
          return (0, _effects.select)(function (state) {
            return state.auth.getIn(['otpusk', 'token']);
          });

        case 17:
          token = _context.sent;
          _context.next = 20;
          return (0, _effects.call)(_jsonApi.getToursActual, token, offerId, tourists);

        case 20:
          _ref6 = _context.sent;
          freshOffer = _ref6.offer;
          code = _ref6.code;
          _context.t0 = code;
          _context.next = _context.t0 === 5 ? 26 : _context.t0 === 4 ? 32 : _context.t0 === 3 ? 32 : 37;
          break;

        case 26:
          isTouched = JSON.stringify(freshOffer.price) !== JSON.stringify(currentOffer.price);
          _context.next = 29;
          return (0, _effects.put)(_actions.offersActions.setOfferStatus(offerId, isTouched ? 'touched' : 'fresh'));

        case 29:
          _context.next = 31;
          return (0, _effects.put)(_actions.offersActions.checkOfferStatusSuccess(offerId, freshOffer));

        case 31:
          return _context.abrupt("break", 38);

        case 32:
          _context.next = 34;
          return (0, _effects.put)(_actions.offersActions.setOfferStatus(offerId, 'dirty'));

        case 34:
          _context.next = 36;
          return (0, _effects.put)(_actions.offersActions.checkOfferStatusSuccess(offerId, freshOffer));

        case 36:
          return _context.abrupt("break", 38);

        case 37:
          throw new Error('Ошибка актуализации');

        case 38:
          _context.next = 46;
          break;

        case 40:
          _context.prev = 40;
          _context.t1 = _context["catch"](7);
          _context.next = 44;
          return (0, _effects.put)(_actions.offersActions.setOfferStatus(offerId, 'failed'));

        case 44:
          _context.next = 46;
          return (0, _effects.put)(_actions.offersActions.checkOfferStatusFail(_context.t1));

        case 46:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[7, 40]]);
}