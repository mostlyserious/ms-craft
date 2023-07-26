import hash from './hash';

const timeouts = {};

/**
 * A function to manage and debounce calls to a given function.
 *
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The number of milliseconds to delay.
 * @param {...*} args - The arguments to pass to the function.
 *
 * @returns {Function} - A function that, when invoked, delays the invocation of the original function by the specified wait time.
 */
export default (func, wait, ...args) => {
    /**
     * Generates a key using a hash of the function.
     * @type {string}
     */
    let key = hash(func);

    /**
     * Function to clear the timeout and call the function with provided arguments.
     *
     * @param {...*} pass - The arguments to pass to the function.
     */
    let bounce = (...pass) => {
        clearTimeout(timeouts[key]);
        delete timeouts[key];
        func(...pass);
    };

    /**
     * Function to set a timeout to call bounce function after wait time.
     *
     * @param {...*} pass - The arguments to pass to the function.
     */
    let queue = (...pass) => {
        clearTimeout(timeouts[key]);
        timeouts[key] = setTimeout(() => bounce(...pass), wait);
    };

    // If the first argument is 'prepare', return queue function.
    if (args.length === 1 && args[0] === 'prepare') {
        return queue;
    }

    queue(...args);
};
