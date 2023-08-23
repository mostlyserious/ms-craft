import isVisible from '../util/is-visible';

/**
 * @param {NodeListOf<HTMLElement>} els - A collection of DOM elements.
 */
export default els => {
    Array.from(els).forEach(el => {
        isVisible(el, (/** @type {IntersectionObserverEntry} */ entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('intro-active');
            }
        }, {
            threshold: 0
        });
    });
};
