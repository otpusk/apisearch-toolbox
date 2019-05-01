// Core
import { createActions } from 'redux-actions';

export const offersActions = createActions({
    GET_OFFER:                  (offerId) => offerId,
    GET_OFFER_SUCCESS:          () => void 0,
    GET_OFFER_FAIL:             (error) => error,
    ADD_OFFERS:                 (offers) => offers,
    SET_OFFER:                  (offer) => offer,
    SET_OFFER_STATUS:           (offerId, status) => ({ offerId, status }),
    CHECK_OFFER_STATUS:         (offerId, hotelId) => ({ offerId, hotelId }),
    CHECK_OFFER_STATUS_SUCCESS: (offerId, freshOffer) => ({ offerId, freshOffer }),
    CHECK_OFFER_STATUS_FAIL:    (error) => error,
});
