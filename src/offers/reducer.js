import { handleActions } from 'redux-actions';
import * as R from 'ramda';

import { offersActions } from './actions';
import { ALIVE_OFFER_STATUS } from './constants';
import { presetEmpyShapeForActualizedOffer } from './helpers';

const initalState = {
    store:            {},
    status:           {},
    actualizedOffers: {},
};

export const offersReducer = handleActions({
    [offersActions.addOffers]: (state, { payload: nextOffers }) => {
        return R.call(
            R.pipe(
                R.over(
                    R.lensProp('store'),
                    (offers) => R.mergeAll([offers, nextOffers])
                ),
                R.over(
                    R.lensProp('status'),
                    (statuesAsMap) => R.mergeAll([
                        statuesAsMap,
                        R.mapObjIndexed(
                            R.always(ALIVE_OFFER_STATUS),
                            nextOffers
                        )
                    ])
                )
            ),
            state
        );
    },
    [offersActions.setOffer]: (state, { payload: offer }) => {
        return R.assocPath(
            ['store', offer.id],
            offer,
            state
        );
    },
    [offersActions.setOfferStatus]: (state, { payload: { offerID, status }}) => {
        return R.assocPath(
            ['status', offerID],
            status,
            state
        );
    },
    [offersActions.setActualizedOffer]: (state, { payload }) => {
        return R.over(
            R.lensPath(['actualizedOffers', payload.offerID]),
            R.pipe(
                presetEmpyShapeForActualizedOffer,
                R.assoc(
                    'offer',
                    payload.offer
                )
            ),
            state
        );
    },
    [offersActions.setActualizedStatus]: (state, { payload }) => {
        return R.over(
            R.lensPath(['actualizedOffers', payload.offerID]),
            R.pipe(
                presetEmpyShapeForActualizedOffer,
                R.assoc(
                    'actualizedStatus',
                    payload.status
                )
            ),
            state
        );
    },
    [offersActions.startActualizeOffer]: (state, { payload: offerID }) => {
        return R.over(
            R.lensPath(['actualizedOffers', offerID]),
            R.pipe(
                presetEmpyShapeForActualizedOffer,
                R.assoc(
                    'loading',
                    true
                )
            ),
            state
        );
    },
    [offersActions.endActualizeOffer]: (state, { payload: offerID }) => {
        return R.over(
            R.lensPath(['actualizedOffers', offerID]),
            R.pipe(
                presetEmpyShapeForActualizedOffer,
                R.assoc(
                    'loading',
                    false
                ),
                R.assoc(
                    'completed',
                    true
                )
            ),
            state
        );
    },
    [offersActions.setMessageByActualizedOffer]: (state, { payload }) => {
        return R.over(
            R.lensPath(['actualizedOffers', payload.offerID]),
            R.pipe(
                presetEmpyShapeForActualizedOffer,
                R.assoc(
                    'message',
                    payload.message
                )
            ),
            state
        );
    },
    [offersActions.failActualizedOffer]: (state, { payload: offerID }) => {
        return R.over(
            R.lensPath(['actualizedOffers', offerID]),
            R.pipe(
                presetEmpyShapeForActualizedOffer,
                R.assoc(
                    'error',
                    true
                )
            ),
            state
        );
    },
    [offersActions.clearActualizedOffer]: (state, { payload: offerID }) => {
        return R.over(
            R.lensProp('actualizedOffers'),
            R.omit([offerID]),
            state
        );
    },
    [offersActions.resetOffersStore]: () => R.clone(initalState),
}, initalState);
