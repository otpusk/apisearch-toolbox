import { Map } from 'immutable';
import { handleActions, combineActions } from 'redux-actions';
import { clone } from 'ramda';
import { hotelsActions as actions } from './actions';
const initalState = Map({
  'store': Map(),
  'markers': Map(),
  'similar': Map(),
  descriptionsByOperator: {}
});
export const hotelsReducer = handleActions({
  [combineActions(actions.addHotel, actions.getHotelSuccess)]: (state, _ref) => {
    let {
      payload: hotel
    } = _ref;
    return state.setIn(['store', String(hotel.id)], hotel);
  },
  [actions.addHotels]: (state, _ref2) => {
    let {
      payload: hotels
    } = _ref2;
    return state.updateIn(['store'], store => store.merge(hotels));
  },
  [actions.getHotelsMarkersSuccess]: (state, _ref3) => {
    let {
      payload: markers
    } = _ref3;
    return state.mergeIn(['markers'], markers);
  },
  [actions.getSimilarHotelsSuccess]: (state, _ref4) => {
    let {
      payload: {
        hotelId,
        similarHotels
      }
    } = _ref4;
    return state.setIn(['similar', hotelId], Map(similarHotels));
  },
  [actions.resetHotelsStore]: () => clone(initalState),
  [actions.getDescriptionsByOperatorSuccess]: (state, _ref5) => {
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