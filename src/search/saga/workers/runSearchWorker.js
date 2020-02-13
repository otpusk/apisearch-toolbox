// Core
import { call, put, select, delay } from 'redux-saga/effects';
import { Map, fromJS } from 'immutable';
import { getToursSearch } from '@otpusk/json-api';

// Instruments
import { convertToOtpQuery, QUERY_PARAMS } from '../../../queries/fn';
import { searchActions } from '../../../search/actions';
import { hotelsActions } from '../../../hotels/actions';
import { offersActions } from '../../../offers/actions';

export function* runSearchWorker ({ payload: queryId }) {
    try {
        const query = yield select((state) => state.queries.get(queryId));
        const lang = yield select((state) => state.auth.getIn(['otpusk', 'lang'], null));
        const token = yield select((state) => state.auth.getIn(['otpusk', 'token']));

        const otpsukQuery = convertToOtpQuery(query.set(QUERY_PARAMS.LANGUAGE, lang));

        yield put(searchActions.startSearch(queryId));
        otpsukQuery.number = 0;
        do {
            const {
                lastResult: finished,
                result,
                country,
                progress: operators,
                total, meta } = yield call(getToursSearch, token, otpsukQuery);

            const getPriceValueByOfferId = (id) => {
                const { currency, price } = result.offers[id];

                return currency in price ? price[currency] : price.uah;
            };

            const hotels = Map(result.hotels)
                .filter(({ name }) => Boolean(name) || query.get(QUERY_PARAMS.SHORT))
                .map((hotel) =>
                    fromJS(hotel)
                        .updateIn(['offers'], (offers) => offers.sortBy(getPriceValueByOfferId))
                )
                .sortBy((hotel) => getPriceValueByOfferId(hotel.get('offers').first()))
                .map((hotel) => hotel.toJS());

            const offers = Map(result.offers).filter(({ id }) => hotels.some(({ offers: hotelOffers }) => hotelOffers.includes(id)));

            if (hotels && offers) {
                yield put(hotelsActions.addHotels(hotels));
                yield put(offersActions.addOffers(offers));
            }

            yield put(searchActions.processSearch(queryId, {
                operators,
                hotels: hotels.map(({ offers: hotelOffers }) => hotelOffers),
                country,
                total,
                meta,
                page:   otpsukQuery.page,
            }));

            if (finished) {
                break;
            }
            yield delay(5000);

            otpsukQuery.number+=1;
        // result gets filled despite any progress status on steps 1 and 7
        } while (otpsukQuery.number <= 7);

        yield delay(200);
        yield put(searchActions.finishSearch(queryId));
    } catch (error) {
        yield put(searchActions.failSearch(queryId));
    }
}
