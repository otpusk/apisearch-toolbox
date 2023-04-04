import * as R from 'ramda';

export const generateOfferIdWithMeta = (id, meta = {}) => `${id}-${JSON.stringify(meta)}`;

export const exactOfferIdWithMeta = (idWithMeta) => R.split('-', idWithMeta);
