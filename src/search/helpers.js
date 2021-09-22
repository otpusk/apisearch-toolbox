import * as R from 'ramda';

export const sortOffersByMinPrice = R.sortBy(R.ascend(R.path(['price', 'uah'])));

export const sortHotelsByMinOffer = R.sortBy(R.ascend(R.path([0, 'price', 'uah'])));
