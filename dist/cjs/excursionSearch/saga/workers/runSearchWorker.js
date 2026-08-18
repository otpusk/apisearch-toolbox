"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runSearchWorker = runSearchWorker;
var _effects = require("redux-saga/effects");
var _moment = _interopRequireDefault(require("moment"));
var _excursionApi = require("@otpusk/excursion-api");
var _selectors = require("../../../auth/selectors");
var _actions = require("../../actions");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function runSearchWorker(_ref) {
  let {
    payload: {
      queryId,
      options: {
        withHash = true
      } = {}
    }
  } = _ref;
  return function* () {
    const langAsQuery = yield (0, _effects.select)(_selectors.getLansAsQuery);
    const query = yield (0, _effects.select)(_ref2 => {
      let {
        excursionSearch
      } = _ref2;
      return excursionSearch.getIn(['queries', queryId]);
    });
    const formattedQuery = query.toMap().map(value => (0, _moment.default)(value, 'YYYY-MM-DD', true).isValid() ? (0, _moment.default)(value).format('YYYY-MM-DD') : value).map(value => Array.isArray(value) && value.length === 0 ? false : value).filter(value => Boolean(value)).toJS();
    try {
      const {
        page
      } = formattedQuery;
      const tours = yield (0, _effects.call)(_excursionApi.getSearch, {
        ...langAsQuery,
        ...formattedQuery
      });
      if (withHash) {
        const hash = query.compileQuery();
        window.location.hash = hash;
      }
      yield (0, _effects.put)(_actions.actions.processSearch(queryId, page, tours));
      yield (0, _effects.put)(_actions.actions.finishSearch(queryId));
    } catch (error) {
      yield (0, _effects.put)(_actions.actions.failSearch(queryId));
    }
  }();
}