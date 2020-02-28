// Core
import { createActions } from 'redux-actions';

export const offersActions = createActions({
    GET_OFFER:                               (offerId, fresh = false) => ({ offerId, fresh }),
    GET_OFFER_SUCCESS:                       () => void 0,
    GET_OFFER_FAIL:                          (error) => error,
    ADD_OFFERS:                              (offers) => offers,
    SET_OFFER:                               (offer) => offer,
    SET_OFFER_STATUS:                        (offerId, status) => ({ offerId, status }),
    CHECK_OFFER_STATUS:                      (offerId, hotelId) => ({ offerId, hotelId }),
    CHECK_OFFER_STATUS_SUCCESS:              (offerId, freshOffer) => ({ offerId, freshOffer }),
    CHECK_OFFER_STATUS_FAIL:                 (error) => error,
    VALIDATE_OFFER_ADDITIONAL_COSTS:         (offerId, queryId) => ({ offerId, queryId }),
    VALIDATE_OFFER_ADDITIONAL_COSTS_SUCCESS: (offerId, validatedTour, queryCurrency) => ({ offerId, queryCurrency, ...validatedTour }),
    VALIDATE_OFFER_ADDITIONAL_COSTS_FAIL:    (offerId, error) => ({ offerId, error }),
    SET_OFFER_ADDITIONAL_COSTS_STATUS:       (offerId, status) => ({ offerId, status }),
    VALIDATE_SET_PRICE:                      (offerId, selectedFlights, queryCurrency) => ({ offerId, selectedFlights, queryCurrency }),
    VALIDATE_SET_PRICE_SUCCESS:              (offerId, selectedFlights) => ({ offerId, selectedFlights }),
    VALIDATE_SET_PRICE_FAIL:                 (error) => error,
});
