"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchReducer = void 0;
var _immutable = require("immutable");
var _reduxActions = require("redux-actions");
var R = _interopRequireWildcard(require("ramda"));
var _actions = require("./actions");
var _fn = require("../queries/fn");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const initialState = (0, _immutable.Map)({
  results: (0, _immutable.Map)(),
  charts: (0, _immutable.Map)(),
  availableDates: {}
});
const searchReducer = exports.searchReducer = (0, _reduxActions.handleActions)({
  [_actions.searchActions.resetSearch]: (state, _ref) => {
    let {
      payload: queryId
    } = _ref;
    return state.setIn(['results', queryId], (0, _fn.createResultBones)()).removeIn(['charts', queryId]);
  },
  [_actions.searchActions.startSearch]: (state, _ref2) => {
    let {
      payload: queryId
    } = _ref2;
    return state.setIn(['results', queryId, 'operators'], {}).setIn(['results', queryId, 'status'], 'starting').removeIn(['charts', queryId]);
  },
  [_actions.searchActions.processSearch]: (state, _ref3) => {
    let {
      payload: {
        operators,
        queryId,
        country,
        total,
        page,
        prices,
        meta
      }
    } = _ref3;
    return state.mergeDeepIn(['results', queryId], (0, _immutable.Map)({
      total: total ? total : state.getIn(['results', queryId, 'total']),
      meta: meta ? meta : state.getIn(['results', queryId, 'meta'])
    })).updateIn(['results', queryId, 'country'], value => value ? value : country).updateIn(['results', queryId, 'operators'], function () {
      let prevOperators = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return R.mergeAll([prevOperators, operators]);
    }).updateIn(['results', queryId, 'prices'], function () {
      let prevPrices = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return R.call(R.pipe(R.clone, items => {
        items[R.dec(page)] = prices;
        return items;
      }), prevPrices);
    });
  },
  [_actions.searchActions.finishSearch]: (state, _ref4) => {
    let {
      payload: {
        queryId,
        total
      }
    } = _ref4;
    return state.setIn(['results', queryId, 'status'], 'done').setIn(['results', queryId, 'total'], total);
  },
  [_actions.searchActions.patchSearch]: (state, _ref5) => {
    let {
      payload: {
        queryId,
        key,
        patch
      }
    } = _ref5;
    return state.setIn(['results', queryId, key], patch);
  },
  [_actions.searchActions.failSearch]: (state, _ref6) => {
    let {
      payload: queryId
    } = _ref6;
    return state.setIn(['results', queryId, 'status'], 'failed');
  },
  [_actions.searchActions.clearSearch]: (state, _ref7) => {
    let {
      payload: queryId
    } = _ref7;
    return state.removeIn(['results', queryId]).removeIn(['charts', queryId]);
  },
  [_actions.searchActions.setFailSearchError]: (state, _ref8) => {
    let {
      payload: {
        queryId,
        error
      }
    } = _ref8;
    return state.setIn(['results', queryId, 'error'], error);
  },
  [_actions.searchActions.setSearchStatus]: (state, _ref9) => {
    let {
      payload: {
        queryID,
        status
      }
    } = _ref9;
    return state.setIn(['results', queryID, 'status'], status);
  },
  [_actions.searchActions.getPriceChartSuccess]: (state, _ref10) => {
    let {
      payload: {
        queryId,
        chart
      }
    } = _ref10;
    return state.setIn(['charts', queryId], chart);
  },
  [_actions.searchActions.getAvailableDatesSuccess]: (state, _ref11) => {
    let {
      payload
    } = _ref11;
    const {
      key,
      dates
    } = payload;
    return state.setIn(['availableDates', key], dates);
  }
}, initialState);