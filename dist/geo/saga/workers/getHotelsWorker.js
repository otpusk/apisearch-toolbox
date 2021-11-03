"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHotelsWorker = getHotelsWorker;

var _effects = require("redux-saga/effects");

var _actions = require("../../actions");

var _jsonApi = require("@otpusk/json-api");

var _marked = /*#__PURE__*/regeneratorRuntime.mark(getHotelsWorker);

function getHotelsWorker(_ref) {
  var _ref$payload, countryId, withPrice, token, lang, hotels;

  return regeneratorRuntime.wrap(function getHotelsWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _ref$payload = _ref.payload, countryId = _ref$payload.countryId, withPrice = _ref$payload.withPrice;
          _context.prev = 1;
          _context.next = 4;
          return (0, _effects.select)(function (state) {
            return state.auth.getIn(['otpusk', 'token']);
          });

        case 4:
          token = _context.sent;
          _context.next = 7;
          return (0, _effects.select)(function (state) {
            return state.auth.getIn(['otpusk', 'lang'], 'rus');
          });

        case 7:
          lang = _context.sent;
          _context.next = 10;
          return (0, _effects.call)(_jsonApi.getToursHotels, token, countryId, {
            lang: lang,
            withPrice: withPrice
          });

        case 10:
          hotels = _context.sent;
          _context.next = 13;
          return (0, _effects.put)(_actions.geoActions.getHotelsSuccess(countryId, hotels));

        case 13:
          _context.next = 19;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](1);
          _context.next = 19;
          return (0, _effects.put)(_actions.geoActions.getHotelsFail(_context.t0));

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 15]]);
}