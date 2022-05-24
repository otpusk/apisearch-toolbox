"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOperatorsWorker = getOperatorsWorker;

var _effects = require("redux-saga/effects");

var _immutable = require("immutable");

var _jsonApi = require("@otpusk/json-api");

var _actions = require("../../actions");

var _marked = /*#__PURE__*/regeneratorRuntime.mark(getOperatorsWorker);

function getOperatorsWorker(_ref) {
  var payload, countryId, departureID, methodVersion, token, operators;
  return regeneratorRuntime.wrap(function getOperatorsWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          payload = _ref.payload;
          countryId = payload.countryId, departureID = payload.departureID, methodVersion = payload.methodVersion;
          _context.next = 4;
          return (0, _effects.select)(function (state) {
            return state.auth.getIn(['otpusk', 'token']);
          });

        case 4:
          token = _context.sent;
          _context.prev = 5;
          _context.next = 8;
          return (0, _effects.call)(_jsonApi.getToursOperators, token, countryId, departureID ? {
            from: departureID
          } : undefined, methodVersion);

        case 8:
          operators = _context.sent;
          _context.next = 11;
          return (0, _effects.put)(_actions.geoActions.getOperatorsSuccess(countryId, (0, _immutable.List)(operators)));

        case 11:
          _context.next = 18;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](5);
          console.log('error', _context.t0);
          _context.next = 18;
          return (0, _effects.put)(_actions.geoActions.getOperatorsFail(_context.t0));

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[5, 13]]);
}