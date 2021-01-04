export default els => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.src) {
                observer.unobserve(entry.target);
                if (entry.target.dataset.src) {
                    entry.target.src = entry.target.dataset.src;
                    entry.target.addEventListener('load', () => {
                        entry.target.classList.remove('opacity-0');
                    });
                } else if (entry.target.dataset.srcset) {
                    entry.target.srcset = entry.target.dataset.srcset;
                    entry.target.addEventListener('load', () => {
                        entry.target.classList.remove('opacity-0');
                    });
                } else {
                    entry.target.style.backgroundImage = `url(${entry.target.dataset.background})`;
                    entry.target.classList.remove('opacity-0');
                }
            }
        });
    }, { rootMargin: '50%', trackVisibility: false });

    Array.prototype.forEach.call(els, img => {
        img.classList.add('opacity-0');
        observer.observe(img);
    });
};
