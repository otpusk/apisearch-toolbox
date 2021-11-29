"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _callee;

var _effects = require("redux-saga/effects");

var _jsonApi = require("@otpusk/json-api");

var _actions = require("./actions");

var _marked = /*#__PURE__*/regeneratorRuntime.mark(getTurpravdaWidgetSaga),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(_callee);

function getTurpravdaWidgetSaga(_ref) {
  var hotelID, lang, widget;
  return regeneratorRuntime.wrap(function getTurpravdaWidgetSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          hotelID = _ref.payload;
          _context.next = 3;
          return (0, _effects.select)(function (_ref2) {
            var auth = _ref2.auth;
            return auth.getIn(['otpusk', 'lang']);
          });

        case 3:
          lang = _context.sent;
          _context.prev = 4;
          _context.next = 7;
          return (0, _effects.call)(_jsonApi.getTurpravdaHotelInformer, hotelID, {
            count: 10,
            lang: lang
          });

        case 7:
          widget = _context.sent;
          _context.next = 10;
          return (0, _effects.put)((0, _actions.setTurpravdaWidget)(hotelID, widget));

        case 10:
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](4);
          console.log(_context.t0);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[4, 12]]);
}

function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.takeEvery)(_actions.getTurpravdaWidget, getTurpravdaWidgetSaga);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}