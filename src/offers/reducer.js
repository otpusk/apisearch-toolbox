// Core
import { Map } from 'immutable';
import { handleActions, combineActions } from 'redux-actions';

// Instruments
import { offersActions } from './actions';

const initalState = Map({
    store:    Map(),
    status:   Map(),
    siblings: Map(),
});

export const offersReducer = handleActions(
    {
        [offersActions.addOffers]: (state, { payload: newOffers }) => {
            return state
                .updateIn(['store'], (offers) =>
                    offers.mergeDeepWith((a, b) => typeof b === 'object'
                        ? { ...b, ...a }
                        : b
                            ? b
                            : a,
                    newOffers)
                )
                .mergeIn(['status'], Map(newOffers).map((offer, id) => state.getIn(['status', id], 'alive')));
        },
        [offersActions.setOffer]: (state, { payload: offer }) => {
            return state
                .updateIn(['store', offer.id], (current = {}) =>
                    Map(current)
                        .mergeWith((prev, next) => next || prev, offer)
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
