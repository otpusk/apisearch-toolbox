"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchWatchers = void 0;
var _effects = require("redux-saga/effects");
var R = _interopRequireWildcard(require("ramda"));
var _resultsMemory = require("./workers/getResultsWorker/resultsMemory");
var _actions = require("../actions");
var _workers = require("./workers");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const searchWatchers = exports.searchWatchers = Object.freeze({
  *runSearchWatcher() {
    yield (0, _effects.takeEvery)(_actions.searchActions.getResults, function* (actionArgs) {
      const searchTask = yield (0, _effects.fork)(_workers.getResultsWorker, actionArgs);
      const {
        payload: queryId
      } = actionArgs;
      const [cancelledTask] = yield (0, _effects.race)([(0, _effects.take)(action => R.and(R.equals(action.type, _actions.searchActions.cancelledSearch.toString()), R.equals(action.payload, queryId))), (0, _effects.take)(action => R.and(R.equals(action.type, _actions.searchActions.finishSearch.toString()), R.equals(R.prop('queryId', action.payload), queryId))), (0, _effects.take)(action => R.and(R.equals(action.type, _actions.searchActions.failSearch.toString()), R.equals(action.payload, queryId)))]);
      cancelledTask && (yield (0, _effects.cancel)(searchTask));
    });
  },
  *getPriceChartWatcher() {
    yield (0, _effects.takeEvery)(_actions.searchActions.getPriceChart, _workers.getPriceChartWorker);
  },
  *getAvailableDatesWorker() {
    yield (0, _effects.takeEvery)(_actions.searchActions.getAvailableDates, _workers.getAvailableDatesWorker);
  },
  *clearSearchWorker() {
    yield (0, _effects.takeEvery)(_actions.searchActions.clearSearch, _ref => {
      let {
        payload: queryID
      } = _ref;
      delete _resultsMemory.memoryInstances[queryID];
    });
  },
  *searchByOperatorsWatcher() {
    yield (0, _effects.takeEvery)(_actions.searchActions.silentSearch, _workers.silentSearchWorker);
  },
  *warmupSearchWatcher() {
    yield (0, _effects.takeEvery)(_actions.searchActions.warmupSearch, _workers.warmupSearchWorker);
  }
});