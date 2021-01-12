// Core
import { Map } from 'immutable';
import { handleActions, combineActions } from 'redux-actions';
import * as R from 'ramda';

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
            merged[key] = merged[key]
                .concat(value)
                .filter((el, i, arr) => i === arr.findIndex((_) => JSON.stringify(_) === JSON.stringify(el)));
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
                    (store) => store
                        .mergeDeep(hotels)
                        .map(R.pipe(
                            R.over(R.lensProp('photos'), R.uniq)
                        ))
                );
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
