export default (obj, path) => {
    if (!path) {
        return undefined;
    }

    path = path.split('.');

    let len = path.length,
        i;

    for (i = 0; i < len; i++) {
        if (path[i] === 'computedStyle') {
            obj = getComputedStyle(obj);
        } else if (obj) {
            obj = obj[path[i]];
        } else {
            return undefined;
        }
    }

    return obj;
};
