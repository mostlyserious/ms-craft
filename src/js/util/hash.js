export default input => {

    let str = input.toString(),
        len = str.length,
        hash = 0,
        chr;

    if (len === 0) {
        return hash;
    }

    for (let i = 0; i < len; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
    }

    return Math.abs(hash).toString();
};
