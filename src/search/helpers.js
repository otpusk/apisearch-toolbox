import * as R from 'ramda';

export const sortOffersByMinPrice = (currency) => R.sort(R.ascend(R.path(['price', currency])));

export const sortHotelsByMinOffer = R.sort(R.ascend(R.path([0, 'price', 'uah'])));

export const generateAvailableDatesKey = (countryID, departureID) => R.join(
    '-',
    R.filter(Number.isFinite, [
        Number(countryID),
        Number(departureID)
    ])
);
