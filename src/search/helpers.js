import * as R from 'ramda';

export const sortOffersByMinPrice = R.sort(R.ascend(R.path(['price', 'uah'])));

export const sortHotelsByMinOffer = R.sort(R.ascend(R.path([0, 'price', 'uah'])));
