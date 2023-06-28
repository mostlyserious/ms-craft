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
