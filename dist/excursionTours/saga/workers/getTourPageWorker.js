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
  var url, tourId;
  return regeneratorRuntime.wrap(function getTourPageWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _effects.select)(function (_ref) {
            var router = _ref.router;
            return router.location.pathname;
          });

        case 3:
          url = _context.sent;
          _context.next = 6;
          return url.split('/')[3].split('-')[0];

        case 6:
          tourId = _context.sent;
          _context.next = 9;
          return (0, _effects.put)(_actions.actions.getTour(tourId));

        case 9:
          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          _context.next = 15;
          return (0, _effects.put)(_actions.actions.getTourFail(_context.t0));

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[0, 11]]);
}