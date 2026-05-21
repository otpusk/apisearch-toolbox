import { call, put, select } from 'redux-saga/effects';
import * as R from 'ramda';
import moment from 'moment';
import { getToursActual } from '@otpusk/json-api';

import { getLang, getToken } from '../../auth/selectors';

import { compileChildrenToPeopleField } from '../../queries/fn';

import { offersActions } from '../actions';
import { ACTUALIZED_OFFER_STATUS } from '../constants';
import { isOfferKey, extractDataFromOfferKey } from '../helpers';

const CHILD_BIRTHDATE_INPUT_FORMAT = 'DD.MM.YYYY';
const CHILD_BIRTHDATE_OUTPUT_FORMAT = 'YYYY-MM-DD';

const areAllChildrenBirthDates = (children) =>
    children.length > 0 && children.every((value) => typeof value === 'string');

const mapChildrenToBirthDates = (children) =>
    children.map((value) => moment(value, CHILD_BIRTHDATE_INPUT_FORMAT).format(CHILD_BIRTHDATE_OUTPUT_FORMAT));

const getTextStatusByCode = (code) => R.call(
    R.cond([
        [R.equals(8), R.always(ACTUALIZED_OFFER_STATUS.STOP_SALE_BY_HOTEL)],
        [R.equals(7), R.always(ACTUALIZED_OFFER_STATUS.STOP_SALE_BY_TRANSPORT_TO)],
        [R.equals(6), R.always(ACTUALIZED_OFFER_STATUS.STOP_SALE_BY_TRANSPORT_FROM)],
        [R.equals(5), R.always(ACTUALIZED_OFFER_STATUS.ACTUALIZED)],
        [R.equals(4), R.always(ACTUALIZED_OFFER_STATUS.UPDATED)],
        [R.equals(3), R.always(ACTUALIZED_OFFER_STATUS.NEW_PRICE)],
        [R.equals(2), R.always(ACTUALIZED_OFFER_STATUS.NOT_FOUND)],
        [R.equals(1), R.always(ACTUALIZED_OFFER_STATUS.ERROR_OPERATOR_CONNECTION)],
        [R.equals(0), R.always(ACTUALIZED_OFFER_STATUS.INVALID_REQUEST)]
    ]),
    code
);

const generatePeopleString = (adults, children) => R.call(
    R.pipe(
        R.filter(Boolean),
        R.join('')
    ),
    [
        adults,
        compileChildrenToPeopleField(children)
    ]
);

export function* actualizeOfferSaga ({ payload: { adults, children = [], offerID, currency, withShortCode }}) {
    const token = yield select(getToken);
    const lang = yield select(getLang);

    yield put(offersActions.startActualizeOffer(offerID));

    try {
        const { code, offer: nextOffer, message } = yield call(
            getToursActual,
            R.mergeAll([token, { lang }]),
            isOfferKey(offerID)
                ? extractDataFromOfferKey(offerID).id
                : offerID,
            generatePeopleString(adults, children),
            currency,
            withShortCode,
            areAllChildrenBirthDates(children) ? mapChildrenToBirthDates(children) : undefined
        );

        yield put(offersActions.setActualizedStatus(offerID, getTextStatusByCode(code)));

        if (nextOffer) {
            yield put(offersActions.setActualizedOffer(offerID, nextOffer));
        }

        message && (yield put(offersActions.setMessageByActualizedOffer(offerID, message)));
    } catch (error) {
        console.log(error);

        yield put(offersActions.setActualizedStatus(offerID, ACTUALIZED_OFFER_STATUS.INVALID_REQUEST));
        yield put(offersActions.failActualizeOffer(offerID));
    } finally {
        yield put(offersActions.endActualizeOffer(offerID));
    }

}
