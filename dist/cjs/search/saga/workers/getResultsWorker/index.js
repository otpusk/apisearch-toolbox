"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getResultsWorker = getResultsWorker;
var _effects = require("redux-saga/effects");
var R = _interopRequireWildcard(require("ramda"));
var _jsonApi = require("@otpusk/json-api");
var _selectors = require("../../../../queries/selectors");
var _fn = require("../../../../queries/fn");
var _actions = require("../../../../search/actions");
var _actions2 = require("../../../../hotels/actions");
var _selectors2 = require("../../../../hotels/selectors");
var _actions3 = require("../../../../offers/actions");
var _resultsMemory = _interopRequireWildcard(require("./resultsMemory"));
var _helpers = require("./helpers");
var _constants = require("./constants");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function getResultsWorker(_ref) {
  let {
    payload: queryID
  } = _ref;
  return function* () {
    const query = yield (0, _effects.select)(state => (0, _selectors.getQuery)(state, {
      queryID
    }));
    const lang = yield (0, _effects.select)(state => state.auth.getIn(['otpusk', 'lang'], null));
    const token = yield (0, _effects.select)(state => state.auth.getIn(['otpusk', 'token']));
    const otpsukQuery = (0, _fn.convertToOtpQuery)(query.set(_fn.QUERY_PARAMS.LANGUAGE, lang));
    yield (0, _effects.put)(_actions.searchActions.startSearch(queryID));
    otpsukQuery.number = 0;
    otpsukQuery.data = 'extlinks';
    const activePage = query.get(_fn.QUERY_PARAMS.PAGE);
    activePage === 1 && delete _resultsMemory.memoryInstances[queryID];
    const memory = _resultsMemory.memoryInstances[queryID] = _resultsMemory.memoryInstances[queryID] || (0, _resultsMemory.default)();
    try {
      do {
        const {
          lastResult: finished,
          hotels,
          offers,
          country,
          progress: operators,
          total,
          meta,
          prices
        } = yield (0, _effects.call)(_jsonApi.getToursNextSearch, token, otpsukQuery);
        !R.isEmpty(hotels) && memory.addHotels(hotels);
        !R.isEmpty(offers) && memory.addOffers(offers);
        memory.incTotal(total);
        {
          const {
            hotelsHub,
            offersHub,
            usedPrices,
            unusedPrices,
            stableHotels
          } = memory.getValues();
          const pricesWithoutStable = R.filter(_ref2 => {
            let {
              hotelID
            } = _ref2;
            return !R.includes(hotelID, stableHotels);
          }, prices);
          const freshSelectedOperators = yield (0, _effects.select)(state => (0, _selectors.getQuery)(state, {
            queryID
          }).get(_fn.QUERY_PARAMS.SELECTED_OPERATORS).toJS());
          const nextPrices = (0, _helpers.generateNextPrices)([...pricesWithoutStable, ...unusedPrices, ...usedPrices], offersHub, query.get(_fn.QUERY_PARAMS.CURRENCY), query.get(_fn.QUERY_PARAMS.SORT), hotelsHub, freshSelectedOperators);
          const hotelsFromStore = yield (0, _effects.select)(_selectors2.hotelsHub);
          const hotelsToStore = (0, _helpers.getHotelsEntitiesMap)(nextPrices, hotelsHub, hotelsFromStore);
          const offersToStore = (0, _helpers.getOffersEntitiesMap)(nextPrices, offersHub);
          !R.isEmpty(hotelsToStore) && (yield (0, _effects.put)(_actions2.hotelsActions.addHotels(hotelsToStore)));
          !R.isEmpty(offersToStore) && (yield (0, _effects.put)(_actions3.offersActions.addOffers(offersToStore)));
          memory.setUsedPrices(nextPrices);
          memory.setUnusedPrices((0, _helpers.getUnusedPrices)(nextPrices, [...pricesWithoutStable, ...unusedPrices]));
        }
        const {
          usedPrices,
          total: totalValue
        } = memory.getValues();
        yield (0, _effects.put)(_actions.searchActions.processSearch(queryID, {
          page: activePage,
          operators,
          country,
          total: totalValue,
          meta,
          prices: R.clone(usedPrices)
        }));
        if (finished) {
          break;
        }
        yield (0, _effects.delay)(5000);
        const ignoreOperators = (0, _helpers.getIgnoreOperators)(operators);
        !R.isEmpty(ignoreOperators) && (0, _helpers.addIgnoreOperators)(otpsukQuery, ignoreOperators);
        otpsukQuery.number += 1;
      } while (otpsukQuery.number <= _constants.GUARANTEED_RESULT_STEP);
      const {
        total
      } = memory.getValues();
      yield (0, _effects.put)(_actions.searchActions.finishSearch(queryID, {
        total
      }));
    } catch (error) {
      var _error$response;
      yield (0, _effects.put)(_actions.searchActions.failSearch(queryID, error, {
        message: error.message,
        statusCode: parseInt(error.message, 10) || ((_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.statusCode) || 500
      }));
      console.log(error);
    } finally {
      if (yield (0, _effects.cancelled)()) {
        yield (0, _effects.put)(_actions.searchActions.resetSearch(queryID));
      }
      const {
        usedPrices
      } = memory.getValues();
      memory.addStablePrices(usedPrices);
      memory.addStableHotels((0, _helpers.getHotelsIDsFromPrices)(usedPrices));
      memory.clearUsedPrices();
    }
  }();
}