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

const getPriceChange = (selected, validatedFlights) => {
    const { priceChange = 0 } = selected && validatedFlights[selected] || {};

    return Number(priceChange);
};

const getValidatedTourNewPrice = (state, offerId, selectedFlights) => {
    const currency =  state.getIn(['siblings', offerId, 'currency']);
    const offerPrice =  state.getIn(['store', offerId, 'price', currency], 0);
    const actualPrice =  state.getIn(['siblings', offerId, 'price', currency], 0);
    const validatedPrice = state.getIn(['validatedTour', offerId, 'price'], 0);
    const validatedFlights = state.getIn(['validatedTour', offerId, 'flights'], {});
    const selected = selectedFlights ? selectedFlights : state.getIn(['validatedTour', offerId, 'selectedFlights'], {});

    console.log('[GET_TOUR_NEW_PRICE]', { validatedPrice, offerPrice, actualPrice });
    const newPrice = (validatedPrice || actualPrice || offerPrice)
        + getPriceChange(selected.inbound, validatedFlights)
        + getPriceChange(selected.outbound, validatedFlights);

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
            const newPrice = getValidatedTourNewPrice(state, payload.offerId);
            const newState = state
                .updateIn(['validatedTour', payload.offerId], (current = {}) =>
                    Map(current)
                        .mergeWith(mergeOffer, { ...payload, newPrice, hasError: false, errorMsg: '' })
                        .toJS()
                );

            console.log('[NEW_STATE_ADDITIONAL_COST]', newState.toJS());

            return newState;
        },
        [offersActions.validateOfferAdditionalCostsFail]: (state, { payload: { offerId, errorMsg }}) => {
            console.log('[VALID_ERROR_PAYLOAD]', { offerId, errorMsg });
            const newState = state
                .updateIn(['validatedTour', offerId], (current = {}) =>
                    Map(current)
                        .mergeWith(mergeOffer, { hasError: true, errorMsg })
                        .toJS()
                );

            console.log('[NEW_STATE_ADDITIONAL_COST_FAIL]', newState.toJS());

            return newState;
        },
        [offersActions.validateSetPrice]: (state, { payload: { offerId, selectedFlights }}) => {
            const newPrice = getValidatedTourNewPrice(state, offerId, selectedFlights);

            const newState = state
                .updateIn(['validatedTour', offerId], (current = {}) =>
                    Map(current)
                        .mergeWith(mergeOffer, { newPrice, selectedFlights })
                        .toJS()
                );

            console.log('[PAYLOAD_SET_PRICE]', { newState, newPrice, selectedFlights });

            return newState;
        },
    },
    initalState
);
