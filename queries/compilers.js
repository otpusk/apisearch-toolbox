// Instruments
import { GLUE } from './fn';

/**
 * Compile boolean list
 *
 * @param {Map} value flags list
 * @returns {String} binary param
 */
export const binaryCompiler = (value) => Number(value.toList().map((flag) => Number(flag)).join(GLUE.binary)).toString(36);

/**
 * Range compiler
 *
 * @param {Map} value range
 * @return {String} range param
 */
export const rangeCompiler = (value) => {
    const { from = '', to = '' } = value.toObject();

    return (from === to ? [from] : [from, to])
        .join(GLUE.range);
};

/**
 * Dates compiler
 *
 * @param {Map} value dates
 * @returns {String} dates param
 */
export const datesCompiler = (value) => {
    return [value.get('from'), value.get('to')]
        .map((date) => date ? date.format('D.M.Y') : GLUE.empty)
        .join(GLUE.range);
};

/**
 * Array compiler
 *
 * @param {Array} value values
 * @returns {String} param
 */
export const arrayCompiler = (value) => value.length ? value.join(GLUE.list) : GLUE.empty;

/**
 * Map structure compiler
 *
 * @param {Map} value value
 * @returns {String} map keys
 */
export const mapCompiler = (value) => value && value.count() ? value.keySeq().toArray().join(GLUE.list) : GLUE.empty;

/**
 * toStringCompiler
 *
 * @param {any} value value
 * @returns {String} param
 */
export const toStringCompiler = (value) => value.toString();

/**
 * Number compiler
 *
 * @param {Number} value value
 * @returns {string} param
 */
export const numberCompiler = (value) => Number(value).toString();
