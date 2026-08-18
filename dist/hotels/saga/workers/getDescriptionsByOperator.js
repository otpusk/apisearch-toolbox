"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDescriptionsByOperatorWorker = getDescriptionsByOperatorWorker;
var _effects = require("redux-saga/effects");
var _jsonApi = require("@otpusk/json-api");
var _selectors = require("../../../auth/selectors");
var _actions = require("../../actions");
function getDescriptionsByOperatorWorker(_ref) {
  let {
    payload: {
      operatorID,
      externalOperatorData
    }
  } = _ref;
  return function* () {
    const token = yield (0, _effects.select)(_selectors.getToken);
    const lang = yield (0, _effects.select)(_selectors.getLang);
    const {
      subOperatorName,
      subHotelID
    } = externalOperatorData;
    try {
      const descriptions = yield (0, _effects.call)(_jsonApi.getToursHotelDescriptionsByOperator, token, {
        lang,
        subHotelID,
        subOperatorName,
        operatorId: operatorID
      });
      yield (0, _effects.put)(_actions.hotelsActions.getDescriptionsByOperatorSuccess(operatorID, descriptions));
    } catch (error) {
      yield (0, _effects.put)(_actions.hotelsActions.getDescriptionsByOperatorFail(error));
    }
  }();
}