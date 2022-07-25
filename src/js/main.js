import '../css/main.css';

import.meta.glob('../{img,font,media}/**.*');

(ready => {
    if (document.readyState !== 'loading') {
        ready();
    } else {
        document.addEventListener('DOMContentLoaded', ready);
    }
})(() => {
    const modules = {
        '.intro': () => import('./modules/intro'),
        '[data-property]': () => import('./modules/property'),
        '[data-toggle]': () => import('./modules/toggle'),
        'x-svelte': () => import('./svelte')
    };

    Object.keys(modules).forEach(selector => {
        const request = modules[selector];

        (els => {
            if (els && els.length) {
                request().then(({ default: module }) => module(els));
            }
        })(document.querySelectorAll(selector));
    });

    addEventListener('keydown', event => {
        if (event.code === 'Tab') {
            document.body.classList.add('is-tabbing');
        }
    });

    addEventListener('mousedown', () => {
        document.body.classList.remove('is-tabbing');
    });

    Array.prototype.forEach.call(
        document.querySelectorAll('[target=_blank]'),
        el => el.setAttribute('rel', 'noopener')
    );
});
