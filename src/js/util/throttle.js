import hash from './hash';

const records = {};

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
