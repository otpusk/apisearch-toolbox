"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchWatchers = void 0;

var _effects = require("redux-saga/effects");

var R = _interopRequireWildcard(require("ramda"));

var _actions = require("../actions");

var _workers = require("./workers");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var searchWatchers = Object.freeze({
  runSearchWatcher: /*#__PURE__*/regeneratorRuntime.mark(function runSearchWatcher() {
    return regeneratorRuntime.wrap(function runSearchWatcher$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _effects.takeEvery)(_actions.searchActions.runSearch, /*#__PURE__*/regeneratorRuntime.mark(function _callee(actionArgs) {
              var searchTask, queryId, _yield$race, _yield$race2, cancelledTask;

              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return (0, _effects.fork)(_workers.runSearchWorker, actionArgs);

                    case 2:
                      searchTask = _context.sent;
                      queryId = actionArgs.payload;
                      _context.next = 6;
                      return (0, _effects.race)([(0, _effects.take)(function (action) {
                        return R.and(R.equals(action.type, _actions.searchActions.cancelledSearch.toString()), R.equals(action.payload, queryId));
                      }), (0, _effects.take)(function (action) {
                        return R.and(R.equals(action.type, _actions.searchActions.finishSearch.toString()), R.equals(action.payload.queryId, queryId));
                      }), (0, _effects.take)(function (action) {
                        return R.and(R.equals(action.type, _actions.searchActions.failSearch.toString()), R.equals(action.payload, queryId));
                      })]);

                    case 6:
                      _yield$race = _context.sent;
                      _yield$race2 = _slicedToArray(_yield$race, 1);
                      cancelledTask = _yield$race2[0];
                      _context.t0 = cancelledTask;

                      if (!_context.t0) {
                        _context.next = 13;
                        break;
                      }

                      _context.next = 13;
                      return (0, _effects.cancel)(searchTask);

                    case 13:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, runSearchWatcher);
  }),
  submitSearchWatcher: /*#__PURE__*/regeneratorRuntime.mark(function submitSearchWatcher() {
    return regeneratorRuntime.wrap(function submitSearchWatcher$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _effects.takeEvery)(_actions.searchActions.submitSearch, _workers.submitSearchWorker);

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, submitSearchWatcher);
  }),
  getPriceChartWatcher: /*#__PURE__*/regeneratorRuntime.mark(function getPriceChartWatcher() {
    return regeneratorRuntime.wrap(function getPriceChartWatcher$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _effects.takeEvery)(_actions.searchActions.getPriceChart, _workers.getPriceChartWorker);

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, getPriceChartWatcher);
  }),
  getAvailableDatesWorker: /*#__PURE__*/regeneratorRuntime.mark(function getAvailableDatesWorker() {
    return regeneratorRuntime.wrap(function getAvailableDatesWorker$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _effects.takeEvery)(_actions.searchActions.getAvailableDates, _workers.getAvailableDatesWorker);

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, getAvailableDatesWorker);
  })
});
exports.searchWatchers = searchWatchers;