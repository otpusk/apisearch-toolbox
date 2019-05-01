// Core
import { Map, Set } from 'immutable';
import { handleActions, combineActions } from 'redux-actions';

// Instruments
import { hotelsActions as actions } from './actions';

const initalState = Map({
    'store':   Map(),
    'markers': Map(),
    'similar': Map(),
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
                    (store) => store.mergeWith((a, b) => {
                        const { offers: offersA } = a;
                        const { offers: offersB } = b;

                        return {
                            ...b,
                            ...a,
                            offers: Set(offersA).union(offersB).toArray(),
                        };
                    }, hotels));
        },
        [actions.getHotelsMarkersSuccess]: (state, { payload: markers }) => {
            return state.mergeIn(['markers'], markers);
        },
        [actions.getSimilarHotelsSuccess]: (state, { payload: { hotelId, similarHotels }}) => {
            return state.setIn(['similar', hotelId], Map(similarHotels));
        },
    },
    initalState
);
