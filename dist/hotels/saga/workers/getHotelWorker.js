"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHotelWorker = getHotelWorker;

var _effects = require("redux-saga/effects");

var _actions = require("../../actions");

var _jsonApi = require("@otpusk/json-api");

var _marked = /*#__PURE__*/regeneratorRuntime.mark(getHotelWorker);

function getHotelWorker(_ref) {
  var hotelId, _yield$select, token, lang, _yield$call, hotel;

  return regeneratorRuntime.wrap(function getHotelWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          hotelId = _ref.payload;
          _context.prev = 1;
          _context.next = 4;
          return (0, _effects.select)(function (_ref2) {
            var auth = _ref2.auth;
            return {
              token: auth.getIn(['otpusk', 'token']),
              lang: auth.getIn(['otpusk', 'lang'], 'ru')
            };
          });

        case 4:
          _yield$select = _context.sent;
          token = _yield$select.token;
          lang = _yield$select.lang;
          _context.next = 9;
          return (0, _effects.call)(_jsonApi.getToursHotel, token, hotelId, lang);

        case 9:
          _yield$call = _context.sent;
          hotel = _yield$call.hotel;
          _context.next = 13;
          return (0, _effects.put)(_actions.hotelsActions.getHotelSuccess(hotel));

        case 13:
          _context.next = 19;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](1);
          _context.next = 19;
          return (0, _effects.put)(_actions.hotelsActions.getHotelFail(_context.t0));

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 15]]);
}