// Core
import moment from 'moment';

// Instruments
import { GLUE } from './fn';

/**
 * Parse date
 *
 * @param {string} value date
 * @returns {Date} date
 */
export const dateParser = value => {
    const parsedDate = moment(value, 'DD-MM-YYYY');
    return parsedDate.isValid() ? parsedDate : null;
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

/* parse boolean values that presented as a string */

export const parseStringIntengerToBoolean = (value) => Boolean(Number(value));

