const modules = {
    '.intro': () => import('./modules/intro' /* webpackChunkName: 'intro' */),
    '[data-property]': () => import('./modules/property' /* webpackChunkName: 'property' */),
    '[data-toggle]': () => import('./modules/toggle' /* webpackChunkName: 'toggle' */),
    'x-svelte': () => import('./svelte' /* webpackChunkName: 'svelte' */)
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
