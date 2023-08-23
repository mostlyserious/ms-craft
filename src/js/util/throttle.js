import hash from './hash';

/** @type {Record<string, number>} */
const records = {};

/**
 * A throttling function that ensures a given function is not called more than once within a specified duration.
 *
 * @param {Function} func - The function to throttle.
 * @param {number} wait - The duration (in milliseconds) to wait before allowing the function to be called again.
 * @param {...any} args - Arguments to pass to the function when it's called.
 *
 * @returns {Function|undefined} - Returns a new function if 'prepare' is passed as the only argument, otherwise it calls the function directly.
 */
export default (func, wait, ...args) => {
    /** @type {string} */
    let key = hash(func),
        queue = (/** @type {any[]} */ ...pass) => {
            const now = Date.now();

            if (records[key]) {
                if (records[key] + wait < now) {
                    records[key] = now;
                    func(...pass);
                }
            } else {
                records[key] = now;
                func(...pass);
            }
        };

    if (args.length === 1 && args[0] === 'prepare') {
        return queue;
    }

    queue(...args);
};
