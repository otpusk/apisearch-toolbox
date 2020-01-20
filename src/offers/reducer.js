// Core
import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

// Instruments
import { offersActions } from './actions';

const initalState = Map({
    store:         Map(),
    status:        Map(),
    siblings:      Map(),
    validatedTour: Map(),
});

const mergeOffer = (prev, next) => next && typeof next === 'object' && !next[Symbol.iterator]
    ? { ...prev, ...next }
    : next
        ? next
        : prev;

const mergeOfferNextPriority = (prev, next) => next && typeof next === 'object' && !next[Symbol.iterator]
    ? { ...prev, ...next }
    : next;

const getPriceChange = (selectedCode, validatedFlights) => {
    const { priceChange = 0 } = selectedCode && validatedFlights[selectedCode] || {};

    return Number(priceChange);
};

const getValidatedTourNewPrice = (state, offerId, selectedFlights) => {
    const currency =  state.getIn(['siblings', offerId, 'currency']);
    const offerPrice =  state.getIn(['store', offerId, 'price', currency], 0);
    const actualPrice =  state.getIn(['siblings', offerId, 'price', currency], 0);
    const validatedPrice = state.getIn(['validatedTour', offerId, 'price'], 0);
    const validatedFlights = state.getIn(['validatedTour', offerId, 'flights'], {});
    const selected = selectedFlights ? selectedFlights : state.getIn(['validatedTour', offerId, 'selectedFlights'], {});

    const newPrice = (validatedPrice || actualPrice || offerPrice)
        + getPriceChange(selected.inbound && selected.inbound.split('_')[0], validatedFlights)
        + getPriceChange(selected.outbound && selected.outbound.split('_')[0], validatedFlights);

    return newPrice;
};

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
        [offersActions.setOffer]: (state, { payload: { offerId, status }}) => {
            return state.setIn(['status', offerId], status);
        },
        [offersActions.setOfferAdditionalCostsStatus]: (state, { payload: { offerId, status }}) => {
            return state.setIn(['validatedTour', offerId, 'isLoading'], status);
        },
        [offersActions.checkOfferStatusSuccess]: (state, { payload: { offerId, freshOffer }}) => {
            return state.updateIn(['siblings'], (siblings) => freshOffer
                ? siblings.set(offerId, freshOffer)
                : siblings
            );
        },
        [offersActions.validateOfferAdditionalCostsSuccess]: (state, { payload }) => {
            const newPrice = payload.price || getValidatedTourNewPrice(state, payload.offerId);
            const newState = state
                .updateIn(['validatedTour', payload.offerId], (current = {}) =>
                    Map(current)
                        .mergeWith(mergeOfferNextPriority, { ...payload, newPrice, hasError: false, errorMsg: '' })
                        .toJS()
                );

            return newState;
        },
        [offersActions.validateOfferAdditionalCostsFail]: (state, { payload: { offerId, errorMsg }}) => {
            const newPrice = getValidatedTourNewPrice(state, offerId);
            const newState = state
                .updateIn(['validatedTour', offerId], (current = {}) =>
                    Map(current)
                        .mergeWith(mergeOfferNextPriority, { hasError: true, errorMsg, newPrice })
                        .toJS()
                );

            return newState;
        },
        [offersActions.validateSetPrice]: (state, { payload: { offerId, selectedFlights }}) => {
            const newPrice = getValidatedTourNewPrice(state, offerId, selectedFlights);

            const newState = state
                .updateIn(['validatedTour', offerId], (current = {}) =>
                    Map(current)
                        .mergeWith(mergeOfferNextPriority, { newPrice, selectedFlights })
                        .toJS()
                );

            return newState;
        },
    },
    initalState
);
