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
  var _ref$payload, countryId, withPrice, token, hotels;

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
          return (0, _effects.call)(_jsonApi.getToursHotels, token, countryId, {
            withPrice: withPrice
          });

        case 7:
          hotels = _context.sent;
          _context.next = 10;
          return (0, _effects.put)(_actions.geoActions.getHotelsSuccess(countryId, hotels));

        case 10:
          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](1);
          _context.next = 16;
          return (0, _effects.put)(_actions.geoActions.getHotelsFail(_context.t0));

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 12]]);
}