// Instruments
import { GLUE } from './fn';

/**
 * Date compiler
 *
 * @param {Date} value value
 * @returns {String} param
 */
export const dateCompiler = date => {
    return date ? date.format('D.M.Y') : GLUE.empty
}

/**
 * Array compiler
 *
 * @param {Array} value values
 * @returns {String} param
 */
export const arrayCompiler = (value) => value.length ? value.join(GLUE.list) : GLUE.empty;

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
