/**
 * Creates a range for parsing markup strings.
 * @type {Range}
 */
const range = document.createRange();

/**
 * Parses a markup string and returns a document fragment.
 * @type {(markup: string) => DocumentFragment}
 */
const parse = range.createContextualFragment.bind(range);

/**
 * Creates a node (or an outerHTML string) from a given markup string and sets attributes on it.
 *
 * @param {string} markup - The markup string to be parsed into a node.
 * @param {Record<string, string>} [attrs={}] - An object of attributes to set on the created node.
 * @param {boolean} [returnNode=false] - Determines whether to return the node object or its outerHTML string.
 *
 * @returns {HTMLElement | string} - Returns the node or the outerHTML string of the node.
 */
export default (markup, attrs = {}, returnNode = false) => {
    const fragment = parse(markup).firstChild;

    if (fragment && fragment instanceof HTMLElement) {
        Object.keys(attrs).forEach(attr => {
            fragment.setAttribute(attr, attrs[attr]);
        });

        return returnNode ? fragment : fragment.outerHTML;
    }

    return '';
};
