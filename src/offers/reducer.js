// Core
import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

// Instruments
import { offersActions } from './actions';

import { mergeObjectDeepWithoutArrays, mergeOfferNextPriority } from './utils/mergeOffer';
import { getSelectedFlightsPriceChange, getValidatedTourNewPrice, sumByKey } from './utils/getValidatedTourPrice';

const initalState = Map({
    store:         Map(),
    status:        Map(),
    siblings:      Map(),
    validatedTour: Map(),
});

export const offersReducer = handleActions(
    {
        [offersActions.addOffers]: (state, { payload: newOffers }) => {
            return state
                .updateIn(['store'], (offers) =>
                    offers.mergeWith(mergeObjectDeepWithoutArrays, newOffers)
                )
                .mergeIn(['status'], Map(newOffers).map((offer, id) => state.getIn(['status', id], 'alive')));
        },
        [offersActions.setOffer]: (state, { payload: offer }) => {
            return state
                .updateIn(['store', offer.id], (current = {}) =>
                    Map(current)
                        .mergeWith(mergeObjectDeepWithoutArrays, offer)
                        .toJS()
                );
        },
        [offersActions.setOfferStatus]: (state, { payload: { offerId, status }}) => {
            return state.setIn(['status', offerId], status);
        },
        [offersActions.setOfferAdditionalCostsStatus]: (state, { payload: { offerId, status }}) => {
            return state.setIn(['validatedTour', offerId, 'isLoading'], status);
        },
        [offersActions.checkOfferStatusSuccess]: (state, { payload: { offerId, freshOffer }}) => {
            return state
                .updateIn(['siblings'], (siblings) => freshOffer
                    ? siblings.set(offerId, freshOffer)
                    : siblings
                );
        },
        [offersActions.validateOfferAdditionalCostsSuccess]: (state, { payload: { offerId, price, flights, ...rest }}) => {
            const newPrice = price && !Object.values(price).some((v) => !v) ? sumByKey(price, getSelectedFlightsPriceChange(state, offerId, { flights }))
                : getValidatedTourNewPrice(state, offerId, null);

            return state
                .updateIn(['validatedTour', offerId], (current = {}) =>
                    Map(current)
                        .mergeWith(mergeOfferNextPriority, { offerId, price, newPrice, flights, hasError: false, error: null, ...rest })
                        .toJS()
                );
        },
        [offersActions.validateOfferAdditionalCostsFail]: (state, { payload: { offerId, error }}) => {
            return state
                .updateIn(['validatedTour', offerId], (current = {}) =>
                    Map(current)
                        .mergeWith(mergeOfferNextPriority, { hasError: true, error })
                        .toJS()
                );
        },
        [offersActions.validateSetPrice]: (state, { payload: { offerId, selectedFlights }}) => {
            const newPrice = getValidatedTourNewPrice(state, offerId, selectedFlights);

            return state
                .updateIn(['validatedTour', offerId], (current = {}) =>
                    Map(current)
                        .mergeWith(mergeOfferNextPriority, { newPrice, selectedFlights })
                        .toJS()
                );
        },
    },
    initalState
);
