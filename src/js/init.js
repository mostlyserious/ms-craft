/**
 * A record of selectors to import functions.
 * @type {Record<string, () => Promise<{ default: (els: NodeListOf<HTMLElement>) => void }>>}
 */
const modules = {
    '.intro': () => import('./modules/intro'),
    '[data-property]': () => import('./modules/property'),
    '[data-toggle]': () => import('./modules/toggle'),
    'x-svelte': () => import('./svelte')
};

/**
 * Initializes modules based on the elements found in the given scope.
 * @param {Document|HTMLElement} scope - The root element or document where the search will be executed.
 */
export default scope => {
    Object.keys(modules).forEach(selector => {
        const request = modules[selector];

        /** @type {NodeListOf<HTMLElement>} */
        const els = scope.querySelectorAll(selector);

        if (els && els.length) {
            request().then(({ default: module }) => module(els));
        }
    });

    Array.from(scope.querySelectorAll('[target=_blank]')).forEach(el => {
        el.setAttribute('rel', 'noopener');
    });
};
