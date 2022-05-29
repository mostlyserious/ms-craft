import throttle from './modules/throttle';
import { readable, writable } from 'svelte/store';

export const screen = writable({
    is2xs: matchMedia('(min-width: 380px)').matches,
    isXs: matchMedia('(min-width: 460px)').matches,
    isSm: matchMedia('(min-width: 640px)').matches,
    isMd: matchMedia('(min-width: 768px)').matches,
    isLg: matchMedia('(min-width: 1024px)').matches,
    isXl: matchMedia('(min-width: 1280px)').matches
});

addEventListener('resize', throttle(() => {
    screen.set({
        is2xs: matchMedia('(min-width: 380px)').matches,
        isXs: matchMedia('(min-width: 460px)').matches,
        isSm: matchMedia('(min-width: 640px)').matches,
        isMd: matchMedia('(min-width: 768px)').matches,
        isLg: matchMedia('(min-width: 1024px)').matches,
        isXl: matchMedia('(min-width: 1280px)').matches
    });
}, 1000 / 30, 'prepare'));

export const storage = readable((key, value = undefined, fallback = null) => {
    if (value !== undefined) {
        localStorage.setItem(key, JSON.stringify(value));

        return value;
    }

    if (localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key));
    }

    return fallback;
});

export const isVisible = readable((el, handler, args = {}, once = false) => {
    if (window.IntersectionObserver) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    handler(el, entry);

                    if (once) {
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, args);

        observer.observe(el);
    } else {
        handler(el, null);
    }
});
