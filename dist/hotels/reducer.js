"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hotelsReducer = void 0;
var _immutable = require("immutable");
var _reduxActions = require("redux-actions");
var _ramda = require("ramda");
var _actions = require("./actions");
const initalState = (0, _immutable.Map)({
  'store': (0, _immutable.Map)(),
  'markers': (0, _immutable.Map)(),
  'similar': (0, _immutable.Map)(),
  descriptionsByOperator: {}
});
const hotelsReducer = exports.hotelsReducer = (0, _reduxActions.handleActions)({
  [(0, _reduxActions.combineActions)(_actions.hotelsActions.addHotel, _actions.hotelsActions.getHotelSuccess)]: (state, _ref) => {
    let {
      payload: hotel
    } = _ref;
    return state.setIn(['store', String(hotel.id)], hotel);
  },
  [_actions.hotelsActions.addHotels]: (state, _ref2) => {
    let {
      payload: hotels
    } = _ref2;
    return state.updateIn(['store'], store => store.merge(hotels));
  },
  [_actions.hotelsActions.getHotelsMarkersSuccess]: (state, _ref3) => {
    let {
      payload: markers
    } = _ref3;
    return state.mergeIn(['markers'], markers);
  },
  [_actions.hotelsActions.getSimilarHotelsSuccess]: (state, _ref4) => {
    let {
      payload: {
        hotelId,
        similarHotels
      }
    } = _ref4;
    return state.setIn(['similar', hotelId], (0, _immutable.Map)(similarHotels));
  },
  [_actions.hotelsActions.resetHotelsStore]: () => (0, _ramda.clone)(initalState),
  [_actions.hotelsActions.getDescriptionsByOperatorSuccess]: (state, _ref5) => {
    let {
      payload
    } = _ref5;
    const {
      operatorID,
      descriptions
    } = payload;
    return state.setIn(['descriptionsByOperator', operatorID], descriptions);
  }
}, initalState);