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
        const target = getTarget(el);
        const className = el.dataset.toggleClass
            ? el.dataset.toggleClass
            : 'is-active';

        target.addEventListener('click', event => event.stopPropagation());
        el.setAttribute('aria-expanded', 'false');

        handleUserTabbing(target, true);

        el.addEventListener('click', event => {
            const toggles = document.querySelectorAll(`[data-toggle="${el.dataset.toggle}"]`);
            const lockScroll = el.dataset.toggleLockScroll !== undefined;

            let delay = parseInt(el.dataset.toggleDuration);

            if (!delay) {
                delay = parseFloat(window.getComputedStyle(target).transitionDuration) * 1000;
            }

            Array.prototype.forEach.call(els, otherEl => {
                const otherTarget = getTarget(otherEl);

                if (!otherTarget.isSameNode(target)
                    && (!el.dataset.toggleGroup
                        || otherEl.dataset.toggleGroup !== el.dataset.toggleGroup)) {

                    otherTarget.classList.remove(className);
                    otherEl.setAttribute('aria-expanded', 'false');
                    setTimeout(() => {
                        handleUserTabbing(otherTarget, true);
                    }, delay);
                }
            });

            if (target.classList.contains(className)) {
                Array.prototype.forEach.call(toggles, t => t.setAttribute('aria-expanded', 'false'));
                lockScroll && (document.body.style.overflow = 'auto');
                setTimeout(() => {
                    handleUserTabbing(target, true);
                }, delay);
            } else {
                setTimeout(() => {
                    handleUserTabbing(target, false);
                }, delay);
                lockScroll && (document.body.style.overflow = 'hidden');
                Array.prototype.forEach.call(toggles, t => t.setAttribute('aria-expanded', 'true'));
            }

            setTimeout(() => {
                target.classList.toggle(className);
            }, 50);

            event.stopPropagation();
        });
    });
};

function getTarget(el) {
    return el.dataset.toggle
        ? document.querySelector(el.dataset.toggle)
        : el.parentNode;
}

function closeAll(els) {
    // document.body.style.overflow = 'auto';

    Array.prototype.forEach.call(els, el => {
        const target = getTarget(el);
        const lockScroll = el.dataset.toggleLockScroll !== undefined;
        const className = el.dataset.toggleClass
            ? el.dataset.toggleClass
            : 'is-active';

        let delay = parseInt(el.dataset.toggleDuration);

        if (!delay) {
            delay = parseFloat(window.getComputedStyle(target).transitionDuration) * 1000;
        }

        target.classList.remove(className);
        el.setAttribute('aria-expanded', 'false');

        lockScroll && (document.body.style.overflow = 'auto');

        setTimeout(() => {
            handleUserTabbing(target, true);
        }, delay);
    });
}

function handleUserTabbing(target, hide) {
    const toggleInvisible = target.querySelectorAll('.toggle\\:invisible');
    const toggleVisible = target.querySelectorAll('.toggle\\:visible');

    if (hide) {
        Array.prototype.forEach.call(toggleInvisible, t => t.classList.remove('invisible'));
        Array.prototype.forEach.call(toggleVisible, t => t.classList.add('invisible'));
    } else {
        Array.prototype.forEach.call(toggleInvisible, t => t.classList.add('invisible'));
        Array.prototype.forEach.call(toggleVisible, t => t.classList.remove('invisible'));
    }
}
