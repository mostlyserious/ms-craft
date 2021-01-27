import hash from './hash';

const timeouts = {};

export default (func, wait, ...args) => {
    let key = hash(func),
        bounce = (...pass) => {
            clearTimeout(timeouts[key]);
            delete timeouts[key];
            func(...pass);
        },
        queue = (...pass) => {
            clearTimeout(timeouts[key]);
            timeouts[key] = setTimeout(() => bounce(...pass), wait);
        };

    if (args.length === 1 && args[0] === 'prepare') {
        return queue;
    }

    queue(...args);
};
