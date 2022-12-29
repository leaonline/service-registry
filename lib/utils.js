/**
 * Returns the Object type, like
 * `[object Object]` or `[object Array]`.
 * @param o {object} object-like
 * @return {string} object type name, like `[object Object]`
 */
export const getType = o => Object.prototype.toString.call(o)
