import isVisible from '../util/is-visible';

export default els => {
    Array.from(els).forEach(el => {
        isVisible(el, entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('intro-active');
            }
        }, {
            threshold: 0
        });
    });
};
