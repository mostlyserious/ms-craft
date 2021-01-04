export default els => {
    document.body.addEventListener('click', event => {
        closeAll(els);
    });

    addEventListener('keydown', event => {
        if (event.code === 'Escape') {
            closeAll(els);
        }
    });

    Array.prototype.forEach.call(els, el => {
        getTarget(el).addEventListener('click', event => event.stopPropagation());
        getTarget(el).setAttribute('aria-expanded', 'false');

        el.addEventListener('click', event => {
            const toggle = event.target;
            const target = getTarget(toggle);

            event.stopPropagation();

            Array.prototype.forEach.call(els, el => {
                if (!getTarget(el).isSameNode(getTarget(toggle))
                    && (!toggle.dataset.toggleGroup
                        || toggle.dataset.toggleGroup !== el.dataset.toggleGroup)) {
                    getTarget(el).classList.remove('is-active');
                    el.setAttribute('aria-expanded', 'false');
                }
            });

            target.classList.toggle('is-active');

            if (target.classList.contains('is-active')) {
                toggle.setAttribute('aria-expanded', 'true');
                if (el.dataset.toggleTakeover !== undefined) {
                    document.documentElement.classList.add('overflow-hidden');
                    document.documentElement.classList.add('lg:overflow-auto');
                }
            } else {
                toggle.setAttribute('aria-expanded', 'false');
                if (el.dataset.toggleTakeover !== undefined) {
                    document.documentElement.classList.remove('overflow-hidden');
                    document.documentElement.classList.remove('lg:overflow-auto');
                }
            }
        });
    });
};

function getTarget(el) {
    return el.dataset.toggle
        ? document.querySelector(el.dataset.toggle)
        : el.parentNode;
}

function closeAll(els) {
    Array.prototype.forEach.call(els, el => {
        getTarget(el).classList.remove('is-active');
        el.setAttribute('aria-expanded', 'false');
    });
}
