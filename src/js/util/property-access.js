/**
 * Navigates through an object using a string path and returns the value at the end of the path.
 *
 * @param {Record<string, ReturnType<any>>} obj - The object to navigate through.
 * @param {string} path - A dot-separated string representing the path to navigate.
 *
 * @returns {*} The value found at the end of the path, or undefined if not found.
 */
export default (obj, path) => {
    if (!path) {
        return undefined;
    }

    let parts = path.split('.'),
        len = parts.length,
        val,
        i;

    for (i = 0; i < len; i++) {
        if (parts[i] === 'computedStyle' && obj instanceof Element) {
            val = getComputedStyle(obj);
        } else if (obj) {
            val = obj[parts[i]];
        } else {
            return undefined;
        }
    }

    return val;
};
