"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _effects = require("redux-saga/effects");
var _jsonApi = require("@otpusk/json-api");
var _actions = require("./actions");
function getTurpravdaWidgetSaga(_ref) {
  let {
    payload: hotelID
  } = _ref;
  return function* () {
    const lang = yield (0, _effects.select)(_ref2 => {
      let {
        auth
      } = _ref2;
      return auth.getIn(['otpusk', 'lang']);
    });
    try {
      const widget = yield (0, _effects.call)(_jsonApi.getTurpravdaHotelInformer, hotelID, {
        count: 10,
        lang
      });
      yield (0, _effects.put)((0, _actions.setTurpravdaWidget)(hotelID, widget));
    } catch (error) {
      console.log(error);
      yield (0, _effects.put)((0, _actions.getTurpravdaWidgetFail)(error));
    }
  }();
}
function* _default() {
  yield (0, _effects.takeEvery)(_actions.getTurpravdaWidget, getTurpravdaWidgetSaga);
}