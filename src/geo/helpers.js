import * as R from 'ramda';

const isFilledRatingObject = ({ from, to }) => from && to;

export const generateHotelKey = (countryID, rating, services) => R.join(
    '-',
    R.filter(Boolean, [
        countryID,
        services && R.join('|', services),
        rating && isFilledRatingObject(rating) && `${rating.from}-${rating.to}`
    ])
);

export const generateOperatorKey = (countryID, departureID) => R.join(
    '-',
    R.filter(Number.isFinite, [
        Number(countryID),
        Number(departureID)
    ])
);

export const setIn = (obj, path, value) => R.assocPath(path, value, obj);

export const removeIn = (obj, path) => R.dissocPath(path, obj);
