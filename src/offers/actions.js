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
    VALIDATE_OFFER_ADDITIONAL_COSTS:         (offerId) => ({ offerId }),
    VALIDATE_OFFER_ADDITIONAL_COSTS_SUCCESS: (offerId, status, denormalizedOffer) => ({ offerId, status, denormalizedOffer }),
    VALIDATE_OFFER_ADDITIONAL_COSTS_FAIL:    (error) => error,
});
