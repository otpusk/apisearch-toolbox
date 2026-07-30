import { Map } from 'immutable';
import { handleActions, combineActions } from 'redux-actions';
import { clone } from 'ramda';

import { hotelsActions as actions } from './actions';

const initalState = Map({
    'store':                Map(),
    'markers':              Map(),
    'similar':              Map(),
    descriptionsByOperator: {},
});

export const hotelsReducer = handleActions(
    {
        [combineActions(actions.addHotel, actions.getHotelSuccess)]: (state, { payload: hotel }) => {
            return state.setIn(['store', String(hotel.id)], hotel);
        },
        [actions.addHotels]: (state, { payload: hotels }) => {
            return state
                .updateIn(
                    ['store'],
                    (store) => store.merge(hotels)
                );
        },
        [actions.getHotelsMarkersSuccess]: (state, { payload: markers }) => {
            return state.mergeIn(['markers'], markers);
        },
        [actions.getSimilarHotelsSuccess]: (state, { payload: { hotelId, similarHotels }}) => {
            return state.setIn(['similar', hotelId], Map(similarHotels));
        },
        [actions.resetHotelsStore]:                 () => clone(initalState),
        [actions.getDescriptionsByOperatorSuccess]: (state, { payload }) => {
            const { operatorID, descriptions } = payload;

            return state.setIn(['descriptionsByOperator', operatorID], descriptions);
        },
    },
    initalState
);
