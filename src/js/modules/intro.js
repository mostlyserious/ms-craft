export default (els, options = { once: true }) => {
    if (els && els.length) {
        if (window.IntersectionObserver) {
            setTimeout(() => {
                const enter = new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('intro-active');
                        }
                    });
                }, {
                    rootMargin: '10% 50% -8% 50%'
                });

                const leave = options.once ? false : new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        if (!entry.isIntersecting) {
                            entry.target.classList.remove('intro-active');
                        }
                    });
                }, {
                    rootMargin: '16% 50% 0px 50%'
                });

                Array.prototype.forEach.call(els, img => {
                    enter.observe(img);
                    if (leave) {
                        leave.observe(img);
                    }
                });
            }, 200);
        } else {
            els.forEach(el => el.classList.add('intro-active'));
        }
    }
};
