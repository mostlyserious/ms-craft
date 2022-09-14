const modules = {
    '.intro': () => import('./modules/intro'),
    '[data-property]': () => import('./modules/property'),
    '[data-toggle]': () => import('./modules/toggle'),
    'x-svelte': () => import('./svelte')
};

export default scope => {
    Object.keys(modules).forEach(selector => {
        const request = modules[selector];

        (els => {
            if (els && els.length) {
                request().then(({ default: module }) => module(els));
            }
        })(scope.querySelectorAll(selector));
    });

    Array.prototype.forEach.call(
        scope.querySelectorAll('[target=_blank]'),
        el => el.setAttribute('rel', 'noopener')
    );
};
