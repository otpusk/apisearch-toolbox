"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.silentSearchWorker = silentSearchWorker;
var _effects = require("redux-saga/effects");
var R = _interopRequireWildcard(require("ramda"));
var _selectors = require("../../../queries/selectors");
var _selectors2 = require("../../../hotels/selectors");
var _fn = require("../../../queries/fn");
var _hotels = require("../../../hotels");
var _offers = require("../../../offers");
var _actions = require("../../actions");
var _resultsMemory = require("./getResultsWorker/resultsMemory");
var _helpers = require("./getResultsWorker/helpers");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function silentSearchWorker(_ref) {
  let {
    payload: queryID
  } = _ref;
  return function* () {
    const query = yield (0, _effects.select)(state => (0, _selectors.getQuery)(state, {
      queryID
    }));
    const {
      [queryID]: memory
    } = _resultsMemory.memoryInstances;
    const selectedOperators = query.get(_fn.QUERY_PARAMS.SELECTED_OPERATORS).toJS();
    const {
      hotelsHub,
      offersHub,
      unusedPrices,
      stablePrices
    } = memory.getValues();
    const prices = [...stablePrices, ...unusedPrices];
    const nextPrices = (0, _helpers.generateNextPrices)(prices, offersHub, query.get(_fn.QUERY_PARAMS.CURRENCY), query.get(_fn.QUERY_PARAMS.SORT), hotelsHub, selectedOperators);
    const hotelsFromStore = yield (0, _effects.select)(_selectors2.hotelsHub);
    const hotelsToStore = (0, _helpers.getHotelsEntitiesMap)(nextPrices, hotelsHub, hotelsFromStore);
    const offersToStore = (0, _helpers.getOffersEntitiesMap)(nextPrices, offersHub);
    !R.isEmpty(hotelsToStore) && (yield (0, _effects.put)(_hotels.hotelsActions.addHotels(hotelsToStore)));
    !R.isEmpty(offersToStore) && (yield (0, _effects.put)(_offers.offersActions.addOffers(offersToStore)));
    memory.setStablePrices(nextPrices);
    memory.setUnusedPrices((0, _helpers.getUnusedPrices)(nextPrices, prices));
    memory.setStableHotels((0, _helpers.getHotelsIDsFromPrices)(nextPrices));
    yield (0, _effects.put)(_actions.searchActions.patchSearch(queryID, 'prices', [nextPrices]));
    yield (0, _effects.put)(_actions.searchActions.processSearch(queryID, {
      page: 1,
      prices: nextPrices,
      total: (0, _helpers.getTotalBySelectedOperators)({
        offersHub,
        prices,
        selectedOperators
      })
    }));
  }();
}