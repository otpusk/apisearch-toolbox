"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSuggestsWorker = getSuggestsWorker;

var _effects = require("redux-saga/effects");

var _actions = require("../../actions");

var _jsonApi = require("@otpusk/json-api");

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(getSuggestsWorker);

function getSuggestsWorker(_ref) {
  var key, token, suggestions;
  return regeneratorRuntime.wrap(function getSuggestsWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          key = _ref.payload;
          _context.next = 3;
          return (0, _effects.delay)(25);

        case 3:
          _context.prev = 3;
          _context.next = 6;
          return (0, _effects.select)(function (state) {
            return state.auth.getIn(['otpusk', 'token']);
          });

        case 6:
          token = _context.sent;
          _context.next = 9;
          return (0, _effects.call)(_jsonApi.getToursSuggests, token, key);

        case 9:
          suggestions = _context.sent;
          _context.next = 12;
          return (0, _effects.put)(_actions.geoActions.getSuggestsSuccess(key, suggestions));

        case 12:
          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](3);
          _context.next = 18;
          return (0, _effects.put)(_actions.geoActions.getSuggestsFail(_context.t0));

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[3, 14]]);
}