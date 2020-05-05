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

const mergeTwoHotels = (fresh, base) => {
    const merged = { ...base };

    for (const [key, value] of Object.entries(fresh)) {
        if (Array.isArray(merged[key])) {
            merged[key] = Set(merged[key]).union(value).toArray();
        } else {
            merged[key] = value;
        }
    }

    return merged;
};

export const hotelsReducer = handleActions(
    {
        [combineActions(actions.addHotel, actions.getHotelSuccess)]: (state, { payload: hotel }) => {
            return state.updateIn(
                ['store', String(hotel.id)],
                (current) => current
                    ? mergeTwoHotels(hotel, current)
                    : hotel
            );
        },
        [actions.addHotels]: (state, { payload: hotels }) => {
            return state
                .updateIn(
                    ['store'],
                    (store) => store.mergeWith(mergeTwoHotels, hotels));
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
