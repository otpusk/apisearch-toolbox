import * as R from 'ramda';

export const generateOfferKey = (id, meta = {}) => `${id}-${JSON.stringify(meta)}`;

export const isOfferKey = (offerID) => typeof offerID === 'string';

export const extractDataFromOfferKey= (key) => {
    const [id, meta] = R.split('-', key);

    return {
        id,
        meta: meta ? JSON.parse(meta): null,
        key,
    };
};
