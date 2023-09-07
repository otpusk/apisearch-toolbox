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
                            R.indexBy(R.prop('id'))
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
            R.lensProp('actualizedOffers'),
            R.pipe(
                presetEmpyShapeForActualizedOffer(payload.offerID),
                R.set(
                    R.lensPath([payload.offerID, 'offer']),
                    payload.offer
                )
            ),
            state
        );
    },
    [offersActions.setActualizedStatus]: (state, { payload }) => {
        return R.over(
            R.lensProp('actualizedOffers'),
            R.pipe(
                presetEmpyShapeForActualizedOffer(payload.offerID),
                R.set(
                    R.lensPath([payload.offerID, 'actualizedStatus']),
                    payload.status
                )
            ),
            state
        );
    },
    [offersActions.startActualizeOffer]: (state, { payload: offerID }) => {
        return R.over(
            R.lensProp('actualizedOffers'),
            R.pipe(
                presetEmpyShapeForActualizedOffer(offerID),
                R.set(
                    R.lensPath([offerID, 'loading']),
                    true
                )
            ),
            state
        );
    },
    [offersActions.endActualizeOffer]: (state, { payload: offerID }) => {
        return R.over(
            R.lensProp('actualizedOffers'),
            R.pipe(
                presetEmpyShapeForActualizedOffer(offerID),
                R.set(
                    R.lensPath([offerID, 'loading']),
                    false
                ),
                R.set(
                    R.lensPath([offerID, 'completed']),
                    true
                )
            ),
            state
        );
    },
    [offersActions.setMessageByActualizedOffer]: (state, { payload }) => {
        return R.over(
            R.lensProp('actualizedOffers'),
            R.pipe(
                presetEmpyShapeForActualizedOffer(payload.offerID),
                R.set(
                    R.lensPath([payload.offerID, 'message']),
                    payload.message
                )
            ),
            state
        );
    },
    [offersActions.failActualizedOffer]: (state, { payload: offerID }) => {
        return R.over(
            R.lensProp('actualizedOffers'),
            R.pipe(
                presetEmpyShapeForActualizedOffer(offerID),
                R.set(
                    R.lensPath([offerID, 'error']),
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
}, initalState);
