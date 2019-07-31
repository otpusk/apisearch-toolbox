"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOperatorsWorker = getOperatorsWorker;

var _effects = require("redux-saga/effects");

var _immutable = require("immutable");

var _actions = require("../../actions");

var _jsonApi = require("@otpusk/json-api");

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(getOperatorsWorker);

function getOperatorsWorker(_ref) {
  var countryId, token, operators;
  return regeneratorRuntime.wrap(function getOperatorsWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          countryId = _ref.payload;
          _context.prev = 1;
          _context.next = 4;
          return (0, _effects.select)(function (state) {
            return state.auth.getIn(['otpusk', 'token']);
          });

        case 4:
          token = _context.sent;
          _context.next = 7;
          return (0, _effects.call)(_jsonApi.getToursOperators, token, countryId);

        case 7:
          operators = _context.sent;
          _context.next = 10;
          return (0, _effects.put)(_actions.geoActions.getOperatorsSuccess(countryId, (0, _immutable.List)(operators)));

        case 10:
          _context.next = 17;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](1);
          console.log('error', _context.t0);
          _context.next = 17;
          return (0, _effects.put)(_actions.geoActions.getOperatorsFail(_context.t0));

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 12]]);
}