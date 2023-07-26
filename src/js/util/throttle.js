import hash from './hash';

const records = {};

/**
 * A rate-limited version of a function that only allows the function to run at most once every `wait` milliseconds.
 * When the function is called multiple times within the `wait` period, the function only executes the first time and ignores subsequent calls.
 *
 * @param {Function} func - The function to be rate-limited.
 * @param {number} wait - The number of milliseconds to wait before the function can be called again.
 * @param {...*} args - Additional arguments to be passed to the function. If the only argument is 'prepare', the rate-limited function will be returned without being called.
 *
 * @returns {Function} A rate-limited version of the passed function. It can be called with any number of arguments, which will be passed on to the function when it is invoked.
 */
export default (func, wait, ...args) => {
    let key = hash(func),

        queue = (...pass) => {
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
