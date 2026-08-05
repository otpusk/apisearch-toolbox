import { createSelector } from 'reselect';
import * as R from 'ramda';

const domain = (_) => _.hotels;
const hotelKey = (_, key) => key;

const EMPTY_OBJ = {};
const EMPTY_ARRAY = [];

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

export const getHotelPhotoCategories = () => createSelector(
    getHotel(),
    R.pipe(
        R.propOr(EMPTY_ARRAY, 'photosByCategory'),
        R.map(R.prop('category')),
        R.uniqBy(R.prop('id'))
    )
);

export const getHotelPhotosByCategory = () => createSelector(
    getHotel(),
    R.pipe(
        R.propOr(EMPTY_ARRAY, 'photosByCategory'),
        R.groupBy(R.path(['category', 'id'])),
        R.values,
        R.map((items) => ({
            category: items[0].category,
            photos:   R.map(R.prop('photo'), items),
        }))
    )
);

export const getHotelsDescriptionsByOperatorHub = R.pipe(
    domain,
    (hotels) => hotels.get('descriptionsByOperator')
);


export const getHotelDescriptionsByOperator = R.converge(
    (descriptions, operatorID) => descriptions[operatorID] ?? EMPTY_ARRAY,
    [
        getHotelsDescriptionsByOperatorHub,
        (_, { operatorID }) => operatorID
    ]
);
