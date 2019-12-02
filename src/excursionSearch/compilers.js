// Instruments
import { GLUE } from './fn';

export { arrayCompiler, toStringCompiler, numberCompiler } from '../queries/compilers';

/**
 * Date compiler
 *
 * @param {Date} value value
 * @returns {String} param
 */
export const dateCompiler = date => {
    return date ? date.format("D.M.Y") : GLUE.empty;
};

