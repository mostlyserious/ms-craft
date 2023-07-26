/**
 * Parses the provided markup string into a DOM Node or an HTML string.
 * This function can also set attributes on the root node of the parsed markup.
 *
 * @param {string} markup - The markup string to parse.
 * @param {Object} [attrs={}] - Optional. An object representing attributes to be set on the root node. Defaults to an empty object.
 * @param {boolean} [returnNode=false] - Optional. A boolean indicating whether the function should return the actual DOM Node or its outer HTML string. Defaults to false.
 *
 * @returns {(Node|string)} Returns the root Node of the parsed markup if returnNode is true. Otherwise, returns the outer HTML string of the root Node. If markup is not parseable, returns an empty string.
 */
const range = document.createRange();
const parse = range.createContextualFragment.bind(range);

export default (markup, attrs = {}, returnNode = false) => {
    const node = parse(markup).firstChild;

    if (node) {
        Object.keys(attrs).forEach(attr => {
            node.setAttribute(attr, attrs[attr]);
        });

        return returnNode ? node : node.outerHTML;
    }

    return '';
};
