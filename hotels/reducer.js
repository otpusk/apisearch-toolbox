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

const mergeTwoHotelsWithOffers = (fresh, base) => {
    const { offers: offersFresh } = fresh;
    const { offers: offersBase } = base;

    return {
        ...base,
        ...fresh,
        offers: Set(offersFresh).union(offersBase).toArray(),
    };
};

export const hotelsReducer = handleActions(
    {
        [combineActions(actions.addHotel, actions.getHotelSuccess)]: (state, { payload: hotel }) => {
            return state.updateIn(
                ['store', String(hotel.id)],
                (current) => current
                    ? mergeTwoHotelsWithOffers(hotel, current)
                    : hotel
            );
        },
        [actions.addHotels]: (state, { payload: hotels }) => {
            return state
                .updateIn(
                    ['store'],
                    (store) => store.mergeWith(mergeTwoHotelsWithOffers, hotels));
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
