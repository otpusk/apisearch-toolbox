// Core
import { Map, merge } from 'immutable';
import { handleActions } from 'redux-actions';

// Instruments
import { offersActions } from './actions';

const initalState = Map({
    store:    Map(),
    status:   Map(),
    siblings: Map(),
});

const mergeOffer = (prev, next) => next && typeof next === 'object' && !next[Symbol.iterator]
    ? { ...next, ...prev }
    : next
        ? next
        : prev;

export const offersReducer = handleActions(
    {
        [offersActions.addOffers]: (state, { payload: newOffers }) => {
            return state
                .updateIn(['store'], (offers) =>
                    offers.mergeWith(mergeOffer, newOffers)
                )
                .mergeIn(['status'], Map(newOffers).map((offer, id) => state.getIn(['status', id], 'alive')));
        },
        [offersActions.setOffer]: (state, { payload: offer }) => {
            return state
                .updateIn(['store', offer.id], (current = {}) =>
                    Map(current)
                        .mergeWith(mergeOffer, offer)
                        .toJS()
                );
        },
        [offersActions.setOfferStatus]: (state, { payload: { offerId, status }}) => {
            return state.setIn(['status', offerId], status);
        },
        [offersActions.checkOfferStatusSuccess]: (state, { payload: { offerId, freshOffer }}) => {
            return state.updateIn(['siblings'], (siblings) => freshOffer
                ? siblings.set(offerId, freshOffer)
                : siblings
            );
        },
    },
    initalState
);
