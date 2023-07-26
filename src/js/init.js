// Defines different modules to be loaded depending on the presence of specific selectors in the document
const modules = {
    '.intro': () => import('./modules/intro'),
    '[data-property]': () => import('./modules/property'),
    '[data-toggle]': () => import('./modules/toggle'),
    'x-svelte': () => import('./svelte')
};

/**
 * Dynamically loads and initializes JavaScript modules based on the presence of specific selectors in a given scope.
 * Also, it sets 'rel' attribute to 'noopener' for all the elements with target='_blank' within the scope.
 *
 * @param {HTMLElement} scope - The DOM element within which to search for the selectors.
 */
export default scope => {
    // For each selector defined in the modules object...
    Object.keys(modules).forEach(selector => {
        // ...get the function that imports the corresponding module...
        const request = modules[selector];

        // ...then, for each element in the scope that matches the selector...
        (els => {
            if (els && els.length) {
                // ...import the module and call its default function with the matched elements as an argument
                request().then(({ default: module }) => module(els));
            }
        })(scope.querySelectorAll(selector));
    });

    // For all elements within the scope that open links in a new tab (i.e., have target="_blank") set the 'rel'
    // attribute to 'noopener' to mitigate the risk of a particular type of security vulnerability (reverse tabnabbing)
    Array.prototype.forEach.call(
        scope.querySelectorAll('[target=_blank]'),
        el => el.setAttribute('rel', 'noopener')
    );
};
