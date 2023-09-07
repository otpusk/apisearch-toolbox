import { assoc, curryN, split } from 'ramda';

export const generateOfferKey = (id, meta = {}) => `${id}-${JSON.stringify(meta)}`;

export const isOfferKey = (offerID) => typeof offerID === 'string';

export const extractDataFromOfferKey= (key) => {
    const [id, meta] = split('-', key);

    return {
        id,
        meta: meta ? JSON.parse(meta): null,
        key,
    };
};

export const presetEmpyShapeForActualizedOffer = curryN(2, (offerID, actualizedOffers) => {
    return actualizedOffers[offerID]
        ? assoc(offerID, {}, actualizedOffers)
        : actualizedOffers[offerID];
});
