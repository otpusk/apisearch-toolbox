import { createSelector } from 'reselect';
import * as R from 'ramda';

const domain = (_) => _.hotels;
const hotelKey = (_, key) => key;

const EMPTY_OBJ = {};

const getHotelsStore = createSelector(
    domain,
    (hotels) => hotels.get('store')
);

const getHotelsMarkersStore = createSelector(
    domain,
    (hotels) => hotels.get('markers')
);

export const getHotelsMarkers = createSelector(
    getHotelsMarkersStore,
    (store) => R.call(
        R.pipe(
            R.toPairs,
            R.map(
                ([, hotel]) => ({
                    hotelID:  hotel.id,
                    position: R.pick(['lat', 'lng'], hotel.location),
                    stars:    hotel.stars,
                    zoom:     hotel.location.zoom,
                })
            )
        ),
        store.toObject()
    )
);

export const getHotelMarker = () => createSelector(
    getHotelsMarkersStore,
    (_, { hotelID }) => hotelID,
    (store, id) => store.toObject()[id]
);

export const hotelsHub = createSelector(
    getHotelsStore,
    R.ifElse(
        (v) => v.isEmpty(),
        R.always(EMPTY_OBJ),
        (v) => v.toJS()
    )
);

export const getHotel = () => createSelector(
    getHotelsStore,
    hotelKey,
    (store, key) => store.get(key.toString())
);
