/**
 * A function to get the value at the specified path of the provided object.
 *
 * @param {Object} obj - The object to query.
 * @param {string} path - The string path to get the value of.
 * @returns {*} - The value at the specified path of the object, or undefined if the path does not exist or if no path is provided.
 */
export default (obj, path) => {
    if (!path) {
        return undefined;
    }

    path = path.split('.');

    let len = path.length,
        i;

    for (i = 0; i < len; i++) {
        if (path[i] === 'computedStyle' && typeof getComputedStyle !== 'undefined') {
            obj = getComputedStyle(obj);
        } else if (obj) {
            obj = obj[path[i]];
        } else {
            return undefined;
        }
    }

    return obj;
};
