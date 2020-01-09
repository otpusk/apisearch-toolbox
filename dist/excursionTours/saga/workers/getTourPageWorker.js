"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTourPageWorker = getTourPageWorker;

var _effects = require("redux-saga/effects");

var _actions = require("../../actions");

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(getTourPageWorker);

function getTourPageWorker() {
  var url, tourId, tour;
  return regeneratorRuntime.wrap(function getTourPageWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _effects.select)(function (_ref) {
            var router = _ref.router;
            return router.getIn(['location', 'pathname']);
          });

        case 3:
          url = _context.sent;
          _context.next = 6;
          return url.split('/')[3].split('-')[0];

        case 6:
          tourId = _context.sent;
          _context.next = 9;
          return (0, _effects.call)(_actions.actions.getTour, tourId);

        case 9:
          tour = _context.sent;
          _context.next = 12;
          return (0, _effects.put)(_actions.actions.getTourSuccess(tourId, tour));

        case 12:
          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          _context.next = 18;
          return (0, _effects.put)(_actions.actions.getTourFail(_context.t0));

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[0, 14]]);
}