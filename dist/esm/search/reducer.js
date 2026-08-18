import { Map } from 'immutable';
import { handleActions } from 'redux-actions';
import * as R from 'ramda';
import { searchActions as actions } from './actions';
import { createResultBones } from '../queries/fn';
const initialState = Map({
  results: Map(),
  charts: Map(),
  availableDates: {}
});
export const searchReducer = handleActions({
  [actions.resetSearch]: (state, _ref) => {
    let {
      payload: queryId
    } = _ref;
    return state.setIn(['results', queryId], createResultBones()).removeIn(['charts', queryId]);
  },
  [actions.startSearch]: (state, _ref2) => {
    let {
      payload: queryId
    } = _ref2;
    return state.setIn(['results', queryId, 'operators'], {}).setIn(['results', queryId, 'status'], 'starting').removeIn(['charts', queryId]);
  },
  [actions.processSearch]: (state, _ref3) => {
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
    return state.mergeDeepIn(['results', queryId], Map({
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
  [actions.finishSearch]: (state, _ref4) => {
    let {
      payload: {
        queryId,
        total
      }
    } = _ref4;
    return state.setIn(['results', queryId, 'status'], 'done').setIn(['results', queryId, 'total'], total);
  },
  [actions.patchSearch]: (state, _ref5) => {
    let {
      payload: {
        queryId,
        key,
        patch
      }
    } = _ref5;
    return state.setIn(['results', queryId, key], patch);
  },
  [actions.failSearch]: (state, _ref6) => {
    let {
      payload: queryId
    } = _ref6;
    return state.setIn(['results', queryId, 'status'], 'failed');
  },
  [actions.clearSearch]: (state, _ref7) => {
    let {
      payload: queryId
    } = _ref7;
    return state.removeIn(['results', queryId]).removeIn(['charts', queryId]);
  },
  [actions.setFailSearchError]: (state, _ref8) => {
    let {
      payload: {
        queryId,
        error
      }
    } = _ref8;
    return state.setIn(['results', queryId, 'error'], error);
  },
  [actions.setSearchStatus]: (state, _ref9) => {
    let {
      payload: {
        queryID,
        status
      }
    } = _ref9;
    return state.setIn(['results', queryID, 'status'], status);
  },
  [actions.getPriceChartSuccess]: (state, _ref10) => {
    let {
      payload: {
        queryId,
        chart
      }
    } = _ref10;
    return state.setIn(['charts', queryId], chart);
  },
  [actions.getAvailableDatesSuccess]: (state, _ref11) => {
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