"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compileQueryStringWorker = compileQueryStringWorker;

var _effects = require("redux-saga/effects");

var _fn = require("../../fn");

var _marked = /*#__PURE__*/regeneratorRuntime.mark(compileQueryStringWorker);

function compileQueryStringWorker(_ref) {
  var queryId, query;
  return regeneratorRuntime.wrap(function compileQueryStringWorker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          queryId = _ref.payload.queryId;
          _context.next = 3;
          return (0, _effects.select)(function (state) {
            return state.queries.get(queryId);
          });

        case 3:
          query = _context.sent;
          window.location.hash = (0, _fn.compileQuery)(query);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}