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
