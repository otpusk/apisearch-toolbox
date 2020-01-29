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

const getSelectedFlightsPriceChange = (state, offerId, { selectedFlights, flights }) => {
    const validatedFlights = flights || state.getIn(['validatedTour', offerId, 'flights'], {});
    const selected = selectedFlights || state.getIn(['validatedTour', offerId, 'selectedFlights'], {});
    const selectedInbound = selected.inbound;
    const selectedOutbound = selected.outbound;

    return getPriceChange(selectedInbound, validatedFlights) + getPriceChange(selectedOutbound, validatedFlights);
};

const getValidatedTourPrice = (state, offerId, currency) => {
    const offerPrice =  state.getIn(['store', offerId, 'price', ...currency ? [currency] : []], 0);
    const actualPrice =  state.getIn(['siblings', offerId, 'price', ...currency ? [currency] : []], 0);
    const validatedPrice = state.getIn(['validatedTour', offerId, 'price', ...currency ? [currency] : []], 0);
    const price = validatedPrice || actualPrice || offerPrice;

    return price;
};

const getValidatedTourNewPrice = (state, offerId, selectedFlights) => {
    const currency =  state.getIn(['siblings', offerId, 'currency'], 'usd');
    const selected = selectedFlights || state.getIn(['validatedTour', offerId, 'selectedFlights'], {});
    const newPrice = getValidatedTourPrice(state, offerId, currency) + getSelectedFlightsPriceChange(state, offerId, { selectedFlights: selected });

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
        [offersActions.setOfferStatus]: (state, { payload: { offerId, status }}) => {
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
        [offersActions.validateOfferAdditionalCostsSuccess]: (state, { payload: { offerId, price, flights, ...rest }}) => {
            const currency =  state.getIn(['siblings', offerId, 'currency'], 'usd');
            const newPrice = price[currency] ? price[currency] + getSelectedFlightsPriceChange(state, offerId, { flights })
                : getValidatedTourNewPrice(state, offerId);

            const newState = state
                .updateIn(['validatedTour', offerId], (current = {}) =>
                    Map(current)
                        .mergeWith(mergeOfferNextPriority, { offerId, price, newPrice, flights, hasError: false, errorMsg: '', ...rest })
                        .toJS()
                );

            return newState;
        },
        [offersActions.validateOfferAdditionalCostsFail]: (state, { payload: { offerId, errorMsg }}) => {
            const newState = state
                .updateIn(['validatedTour', offerId], (current = {}) =>
                    Map(current)
                        .mergeWith(mergeOfferNextPriority, { hasError: true, errorMsg })
                        .toJS()
                );

            return newState;
        },
        [offersActions.validateSetPrice]: (state, { payload: { offerId, selectedFlights }}) => {
            const newPrice = getValidatedTourNewPrice(state, offerId, selectedFlights);

            const newState = state
                .updateIn(['validatedTour', offerId], (current = {}) =>
                    Map(current)
                        .mergeWith(mergeOfferNextPriority, { newPrice, selectedFlights, hasError: false })
                        .toJS()
                );

            return newState;
        },
    },
    initalState
);
