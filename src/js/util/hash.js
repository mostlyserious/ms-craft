/**
 * A function to compute a simple hash from a given input. The function
 * converts the input to a string, then for each character in the string,
 * calculates its Unicode value, and incorporates this value into the hash.
 * The operation of the hash mixing is designed in a way that every input bit
 * might affect every output bit. The resulting hash value is the absolute
 * value converted back to a string.
 *
 * Note: The hash function is not designed to be collision-resistant, as such
 * hash collisions may occur whereby two different inputs will produce the
 * same output, but this is highly unlikely in practice.
 *
 * @param {any} input - The input to compute the hash from.
 * @returns {string} The computed hash as a string.
 */
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
        hash = ((hash << 16) - hash) + chr;
        hash |= 0;
    }

    return Math.abs(hash).toString();
};
