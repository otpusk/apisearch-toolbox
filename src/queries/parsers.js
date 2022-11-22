// Core
import { List, Map } from 'immutable';
import moment from 'moment';

// Instruments
import { GLUE } from './fn';
import { getToursGeoById } from '@otpusk/json-api';

/**
 * Parse binary string
 *
 * @param {string} value flags
 * @param {Object} options options
 * @returns {Map} flags list
 */
export const binaryParser =  (value, { prevValue }) => {
    const binaryValue = parseInt(value, 36)
        .toString()
        .split('')
        .map((flag) => Number(flag) === 1);
    const newValues = List(binaryValue).unshift(...Array(prevValue.count() - binaryValue.length).fill(false));

    return prevValue.mapEntries(([k, v], index) => [k, newValues.has(index) ? newValues.get(index) : v]);
};

/**
 * Parse range value
 *
 * @param {string} value range
 * @returns {Map} range
 */
export const rangeParser =  (value) => {
    const valuesArray = value.split(GLUE.range);
    const isEqualValues = valuesArray.length === 1;

    // methods
    const mapperValue = (v) => !isNaN(parseInt(v, 10)) ? Number(v) : null;

    if (isEqualValues) {
        const [val] = valuesArray.map(mapperValue);

        return Map({ 'from': val, 'to': val });
    }

    const [from, to] = valuesArray.map(mapperValue);

    return Map({ from, to });
};

/**
 * Parse dates
 *
 * @param {string} value dates range
 * @returns {Map} dates
 */
export const datesParser =  (value) => {
    const [from, to] = value
        .split(GLUE.range)
        .map((str) => moment(str, 'DD-MM-YYYY'))
        .map((date) => date.isValid() ? date : null);

    return Map({ from, to });
};

/**
 * Array parser
 *
 * @param {string} value string
 * @returns {Array} array
 */
export const arrayParser = (value) => value ? value.split(GLUE.list) : [];

/**
 * Numbers array parser
 *
 * @param {string} value string
 * @returns{Array} array
 */
export const numbersArrayParser = (value) => arrayParser(value).map(Number);

/**
 * Parse geo
 *
 * @param {Number} value geoId
 * @param {Object} token apitoken
 * @returns {Map} location
 */
export const geoParser = async (value, { token }) => {
    const location = await getToursGeoById(token, value);

    return location;
};

/* parse boolean values that presented as a string */

export const parseStringIntengerToBoolean = (value) => Boolean(Number(value));

/* immutable List, Set parser */

export const createImmutableArrayParser = (baseValueCreator) => (value) => value ? baseValueCreator(value.split(GLUE.list)) : baseValueCreator();

export const createImmutableNumbersArrayParser = (baseValueCreator) => (value) => createImmutableArrayParser(baseValueCreator)(value).map(Number);

export const countryParser = (value) => {

};
