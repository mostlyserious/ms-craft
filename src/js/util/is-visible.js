/**
 * A function to observe changes in the intersection between an element and its viewport or a certain ancestor.
 * If Intersection Observer API is available, it creates a new observer for the given element and invokes
 * a handler function when the element intersects with the viewport or given ancestor.
 * If Intersection Observer is not available, it immediately invokes the handler function with null.
 *
 * @param {HTMLElement} el - The Element to observe.
 * @param {Function} handler - The function to invoke when the element intersects.
 * @param {Object} [args={}] - Optional. An object containing options for the IntersectionObserver. Default is an empty object.
 */
export default (el, handler, args = {}) => {
    if (window.IntersectionObserver) {
        new IntersectionObserver(entries => {
            entries.forEach(entry => entry.isIntersecting && handler(entry));
        }, args).observe(el);
    } else {
        handler(null);
    }
};
