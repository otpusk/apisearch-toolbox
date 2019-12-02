// Core
import moment from 'moment';

export { numbersArrayParser, arrayParser} from '../queries/parsers';

/**
 * Parse date
 *
 * @param {string} value date
 * @returns {Date} date
 */
export const dateParser = value => {
    const parsedDate = moment(value, "DD-MM-YYYY");
    return parsedDate.isValid() ? parsedDate : null;
};

