export default (el, handler, args = {}) => {
    if (window.IntersectionObserver) {
        new IntersectionObserver(entries => {
            entries.forEach(entry => entry.isIntersecting && handler(entry));
        }, args).observe(el);
    } else {
        handler(null);
    }
};
