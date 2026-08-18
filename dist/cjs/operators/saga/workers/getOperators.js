"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOperatorsWorker = getOperatorsWorker;
var _effects = require("redux-saga/effects");
var _jsonApi = require("@otpusk/json-api");
var _actions = require("../../actions");
// instruments

function getOperatorsWorker(_ref) {
  let {
    payload
  } = _ref;
  return function* () {
    const {
      countryId,
      options = {}
    } = payload;
    const [token, lang] = yield (0, _effects.select)(_ref2 => {
      let {
        auth
      } = _ref2;
      return [auth.getIn(['otpusk', 'token']), auth.getIn(['otpusk', 'lang'], 'rus')];
    });
    yield (0, _effects.put)(_actions.operatorsActions.setUiFlag([countryId], {
      loading: true,
      error: false,
      completed: false,
      message: null
    }));
    try {
      const operators = yield (0, _effects.call)(_jsonApi.getToursOperators, token, countryId, {
        lang,
        ...options
      });
      yield (0, _effects.put)(_actions.operatorsActions.getOperatorsSuccess(countryId, operators));
    } catch (error) {
      yield (0, _effects.put)(_actions.operatorsActions.getOperatorsFail(error));
      yield (0, _effects.put)(_actions.operatorsActions.setUiFlag([countryId, 'error'], true));
      yield (0, _effects.put)(_actions.operatorsActions.setUiFlag([countryId, 'message'], error.message));
    } finally {
      yield (0, _effects.put)(_actions.operatorsActions.setUiFlag([countryId, 'loading'], false));
      yield (0, _effects.put)(_actions.operatorsActions.setUiFlag([countryId, 'completed'], true));
    }
  }();
}