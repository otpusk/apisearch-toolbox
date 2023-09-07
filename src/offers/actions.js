import { createActions } from 'redux-actions';

export const offersActions = createActions({
    GET_OFFER:         (offerId, fresh = false, currency) => ({ offerId, fresh, currency }),
    GET_OFFER_SUCCESS: (offerID) => offerID,
    GET_OFFER_FAIL:    [
        (error) => error,
        (_, offerID) => ({ offerID })
    ],
    ADD_OFFERS:       (offers) => offers,
    SET_OFFER:        (offer) => offer,
    SET_OFFER_STATUS: (offerID, status) => ({ offerID, status }),

    ACTUALIZE_OFFER:                 (offerID, adults, children, currency) => ({ offerID, adults, children, currency }),
    SET_ACTUALIZED_OFFER:            (offerID, offer) => ({ offerID, offer }),
    SET_ACTUALIZED_STATUS:           (offerID, status) => ({ offerID, status }),
    START_ACTUALIZE_OFFER:           (offerID) => offerID,
    END_ACTUALIZE_OFFER:             (offerID) => offerID,
    FAIL_ACTUALIZE_OFFER:            (offerID) => offerID,
    CLEAR_ACTUALIZED_OFFER:          (offerID) => offerID,
    SET_MESSAGE_BY_ACTUALIZED_OFFER: (offerID, message) => ({ offerID, message }),
});
