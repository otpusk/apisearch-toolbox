"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrencyRatesWorker = getCurrencyRatesWorker;
var _effects = require("redux-saga/effects");
var _jsonApi = require("@otpusk/json-api");
var _actions = require("../../actions");
var _helpers = require("./../../helpers");
// instruments

function getCurrencyRatesWorker(_ref) {
  let {
    payload
  } = _ref;
  return function* () {
    const {
      dateFrom,
      dateTo,
      options = {}
    } = payload;
    const [token, lang] = yield (0, _effects.select)(_ref2 => {
      let {
        auth
      } = _ref2;
      return [auth.getIn(['otpusk', 'token']), auth.getIn(['otpusk', 'lang'], 'rus')];
    });
    const hash = (0, _helpers.createRateHash)(dateFrom, dateTo);
    yield (0, _effects.put)(_actions.operatorsActions.setUiFlag([hash], {
      loading: true,
      error: false,
      completed: false,
      message: null
    }));
    try {
      const rates = yield (0, _effects.call)(_jsonApi.getToursCurrencyRates, token, {
        from: dateFrom,
        to: dateTo
      }, {
        lang,
        ...options
      });
      yield (0, _effects.put)(_actions.operatorsActions.getCurrencyRatesSuccess(hash, rates));
    } catch (error) {
      yield (0, _effects.put)(_actions.operatorsActions.getCurrencyRatesFail(error));
      yield (0, _effects.put)(_actions.operatorsActions.setUiFlag([hash, 'error'], true));
      yield (0, _effects.put)(_actions.operatorsActions.setUiFlag([hash, 'message'], error.message));
    } finally {
      yield (0, _effects.put)(_actions.operatorsActions.setUiFlag([hash, 'loading'], false));
      yield (0, _effects.put)(_actions.operatorsActions.setUiFlag([hash, 'completed'], true));
    }
  }();
}