"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.offersRootSaga = offersRootSaga;
var _effects = require("redux-saga/effects");
var _actions = require("../actions");
var _getOfferSaga = require("./getOfferSaga");
var _actualizeOfferSaga = require("./actualizeOfferSaga");
function* offersRootSaga() {
  yield (0, _effects.takeEvery)(_actions.offersActions.getOffer, _getOfferSaga.bootstrapOfferSaga);
  yield (0, _effects.takeEvery)(_actions.offersActions.actualizeOffer, _actualizeOfferSaga.actualizeOfferSaga);
}