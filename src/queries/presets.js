import * as R from 'ramda';

import { QUERY_PARAMS } from './fn';

export const getAvailabilitiesByCountry = (countryID) => R.call(
    R.cond([
        [
            (id) => R.includes(id, ['43', '115']),
            R.always({
                [QUERY_PARAMS.HOTEL_AVAILABILITY]:  ['yes', 'request'],
                [QUERY_PARAMS.FLIGHT_AVAILABILITY]: ['yes'],
            })
        ],
        [
            (id) => R.includes(id, ['92', '13', '114', '135', '10', '134', '34', '54', '79', '42', '33', '152']),
            R.always({
                [QUERY_PARAMS.HOTEL_AVAILABILITY]:  ['yes', 'request'],
                [QUERY_PARAMS.FLIGHT_AVAILABILITY]: ['yes'],
            })
        ],
        [
            R.T,
            R.always({
                [QUERY_PARAMS.HOTEL_AVAILABILITY]:  ['yes', 'request'],
                [QUERY_PARAMS.FLIGHT_AVAILABILITY]: ['yes', 'request'],
            })
        ]
    ]),
    countryID
);
