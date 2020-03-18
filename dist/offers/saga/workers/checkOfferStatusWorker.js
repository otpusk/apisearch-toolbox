"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkOfferStatusWorker = checkOfferStatusWorker;

var _effects = require("redux-saga/effects");

var _immutable = require("immutable");

var _actions = require("../../actions");

var _jsonApi = require("@otpusk/json-api");

var _fn = require("../../../queries/fn");

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(checkOfferStatusWorker);

function checkOfferStatusWorker(_ref) {
  var _ref$payload, offerId, queryId, currentOffer, adults, children, tourists, token, _ref5, freshOffer, code, isTouched;

  return regeneratorRuntime.wrap(function checkOfferStatusWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _ref$payload = _ref.payload, offerId = _ref$payload.offerId, queryId = _ref$payload.queryId;
          _context.next = 3;
          return (0, _effects.select)(function (_ref2) {
            var offers = _ref2.offers;
            return offers.getIn(['store', offerId]);
          });

        case 3:
          currentOffer = _context.sent;
          _context.prev = 4;
          _context.next = 7;
          return (0, _effects.select)(function (_ref3) {
            var queries = _ref3.queries;
            return queries.getIn([queryId, _fn.QUERY_PARAMS.ADULTS]);
          });

        case 7:
          adults = _context.sent;
          _context.next = 10;
          return (0, _effects.select)(function (_ref4) {
            var queries = _ref4.queries;
            return queries.getIn([queryId, _fn.QUERY_PARAMS.CHILDREN], (0, _immutable.Range)(0, currentOffer.children).toArray().map(function () {
              return Number(currentOffer.childrenAge.replace(/\D.*/, '').replace(/^(\d)$/, '0$1'));
            }));
          });

        case 10:
          children = _context.sent;
          tourists = "".concat(adults).concat(children.map(function (age) {
            return age >= 10 ? age : "0".concat(age);
          }).join(''));
          _context.next = 14;
          return (0, _effects.select)(function (state) {
            return state.auth.getIn(['otpusk', 'token']);
          });

        case 14:
          token = _context.sent;
          _context.next = 17;
          return (0, _effects.call)(_jsonApi.getToursActual, token, offerId, tourists);

        case 17:
          _ref5 = _context.sent;
          freshOffer = _ref5.offer;
          code = _ref5.code;
          _context.t0 = code;
          _context.next = _context.t0 === 5 ? 23 : _context.t0 === 4 ? 29 : _context.t0 === 3 ? 29 : _context.t0 === 2 ? 29 : 34;
          break;

        case 23:
          isTouched = JSON.stringify(freshOffer.price) !== JSON.stringify(currentOffer.price);
          _context.next = 26;
          return (0, _effects.put)(_actions.offersActions.setOfferStatus(offerId, isTouched ? 'touched' : 'fresh'));

        case 26:
          _context.next = 28;
          return (0, _effects.put)(_actions.offersActions.checkOfferStatusSuccess(offerId, freshOffer));

        case 28:
          return _context.abrupt("break", 35);

        case 29:
          _context.next = 31;
          return (0, _effects.put)(_actions.offersActions.setOfferStatus(offerId, 'dirty'));

        case 31:
          _context.next = 33;
          return (0, _effects.put)(_actions.offersActions.checkOfferStatusSuccess(offerId, freshOffer));

        case 33:
          return _context.abrupt("break", 35);

        case 34:
          throw new Error('Ошибка актуализации');

        case 35:
          _context.next = 43;
          break;

        case 37:
          _context.prev = 37;
          _context.t1 = _context["catch"](4);
          _context.next = 41;
          return (0, _effects.put)(_actions.offersActions.setOfferStatus(offerId, 'failed'));

        case 41:
          _context.next = 43;
          return (0, _effects.put)(_actions.offersActions.checkOfferStatusFail(_context.t1));

        case 43:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[4, 37]]);
}