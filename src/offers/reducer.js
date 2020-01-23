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
    const selectedInbound = selected.inbound && selected.inbound.split('_')[0];
    const selectedOutbound = selected.outbound && selected.outbound.split('_')[0];

    return getPriceChange(selectedInbound, validatedFlights) + getPriceChange(selectedOutbound, validatedFlights);
};

const getValidatedTourNewPrice = (state, offerId, selectedFlights) => {
    const currency =  state.getIn(['siblings', offerId, 'currency'], 'usd');
    const offerPrice =  state.getIn(['store', offerId, 'price', currency], 0);
    const actualPrice =  state.getIn(['siblings', offerId, 'price', currency], 0);
    const validatedPrice = state.getIn(['validatedTour', offerId, 'price', currency], 0);
    const selected = selectedFlights || state.getIn(['validatedTour', offerId, 'selectedFlights'], {});

    const newPrice = (validatedPrice || actualPrice || offerPrice) + getSelectedFlightsPriceChange(state, offerId, { selectedFlights: selected });

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
        [offersActions.validateOfferAdditionalCostsSuccess]: (state, { payload: { offerId, price, flights, ...rest }}) => {
            const currency =  state.getIn(['siblings', offerId, 'currency'], 'usd');
            const newPrice = price[currency] ? price[currency] + getSelectedFlightsPriceChange(state, offerId, { flights })
                : getValidatedTourNewPrice(state, offerId);

            const newState = state
                .updateIn(['validatedTour', offerId], (current = {}) =>
                    Map(current)
                        .mergeWith(mergeOfferNextPriority, { offerId, price, flights, newPrice, hasError: false, errorMsg: '', ...rest })
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
