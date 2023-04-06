import * as R from 'ramda';

export const generateOfferKey = (id, meta = {}) => `${id}-${JSON.stringify(meta)}`;

export const exactDataFromOfferKey= (key) => {
    const [id, meta] = R.split('-', key);

    return {
        id,
        meta: meta ? JSON.parse(meta): null,
        key,
    };
};
