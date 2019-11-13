// Core
import { call, put, select, fork, delay } from 'redux-saga/effects';
import { Map, fromJS } from 'immutable';
import { getToursSearch } from '@otpusk/json-api';

// Instruments
import { convertToOtpQuery, QUERY_PARAMS } from '../../../queries/fn';
import { searchActions } from '../../../search/actions';
import { hotelsActions } from '../../../hotels/actions';
import { offersActions } from '../../../offers/actions';

function* runSearchKiller () {
    yield delay(35000);
}

export function* runSearchWorker ({ payload: queryId }) {
    try {
        const { otpsukQuery, query } = yield select((state) => ({
            query:       state.queries.get(queryId),
            otpsukQuery: convertToOtpQuery(state.queries.get(queryId)),
        }));
        const token = yield select((state) => state.auth.getIn(['otpusk', 'token']));
        const killer = yield fork(runSearchKiller);

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
        } while (killer.isRunning());

        yield delay(200);
        yield put(searchActions.finishSearch(queryId));
    } catch (error) {
        yield put(searchActions.failSearch(queryId));
    }
}
