/**
 * @param {NodeListOf<HTMLElement>} els - A collection of DOM elements.
 */
export default els => {
    document.body.addEventListener('click', event => {
        closeAll(els);
    });

    addEventListener('keydown', event => {
        if (event.code === 'Escape') {
            closeAll(els);
        }
    });

    Array.from(els).forEach(el => {
        const target = getTarget(el);
        const className = el.dataset.toggleClass
            ? el.dataset.toggleClass
            : 'is-active';

        target.addEventListener('click', (/** @type {MouseEvent} */ event) => event.stopPropagation());
        el.setAttribute('aria-expanded', 'false');

        handleUserTabbing(target, true);

        el.addEventListener('click', event => {
            /** @type {NodeListOf<HTMLElement>} */
            const toggles = document.querySelectorAll(`[data-toggle="${el.dataset.toggle}"]`);
            const lockScroll = el.dataset.toggleLockScroll !== undefined;

            let delay = parseInt(el.dataset.toggleDuration ?? '');

            if (!delay) {
                delay = parseFloat(window.getComputedStyle(target).transitionDuration) * 1000;
            }

            Array.from(els).forEach(otherEl => {
                const otherTarget = getTarget(otherEl);

                if (!otherTarget.isSameNode(target)
                    && (!el.dataset.toggleGroup
                        || otherEl.dataset.toggleGroup !== el.dataset.toggleGroup)) {

                    otherTarget.classList.remove(className);
                    otherEl.setAttribute('aria-expanded', 'false');
                    setTimeout(() => handleUserTabbing(otherTarget, true), delay);
                }
            });

            if (target.classList.contains(className)) {
                Array.from(toggles).forEach(t => t.setAttribute('aria-expanded', 'false'));
                lockScroll && (document.body.style.overflow = 'auto');
                setTimeout(() => handleUserTabbing(target, true), delay);
            } else {
                setTimeout(() => handleUserTabbing(target, false), delay);
                lockScroll && (document.body.style.overflow = 'hidden');
                Array.from(toggles).forEach(t => t.setAttribute('aria-expanded', 'true'));
            }

            setTimeout(() => target.classList.toggle(className), 50);

            event.stopPropagation();
        });
    });
};

/**
 * @param {HTMLElement} el - The element to get the target for.
 *
 * @returns {HTMLElement} - The target element or null.
 */
function getTarget(el) {
    const prefered = /** @type {HTMLElement|null} */ (document.querySelector(el.dataset.toggle ?? ''));
    const fallback = /** @type {HTMLElement} */ (el.parentElement);

    return prefered ?? fallback;
}

/**
 * @param {NodeListOf<HTMLElement>} els
 *
 * @returns {undefined}
 */
function closeAll(els) {
    Array.from(els).forEach(el => {
        const target = getTarget(el);
        const lockScroll = el.dataset.toggleLockScroll !== undefined;
        const className = el.dataset.toggleClass
            ? el.dataset.toggleClass
            : 'is-active';

        let delay = parseInt(el.dataset.toggleDuration ?? '');

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

/**
 * @param {HTMLElement} target
 * @param {boolean} hide
 *
 * @returns {undefined}
 */
function handleUserTabbing(target, hide) {
    /** @type {NodeListOf<HTMLElement>} */
    const toggleInvisible = target.querySelectorAll('.toggle\\:invisible');
    /** @type {NodeListOf<HTMLElement>} */
    const toggleVisible = target.querySelectorAll('.toggle\\:visible');

    if (hide) {
        Array.from(toggleInvisible).forEach(t => t.classList.remove('invisible'));
        Array.from(toggleVisible).forEach(t => t.classList.add('invisible'));
    } else {
        Array.from(toggleInvisible).forEach(t => t.classList.add('invisible'));
        Array.from(toggleVisible).forEach(t => t.classList.remove('invisible'));
    }
}
