/**
 * @type {Record<string, () => Promise<typeof import('*.svelte')>>}
 */
const components = {
    // 'example-component': () => import('./components/ExampleComponent.svelte')
};

/**
  * Processes elements to replace with Svelte components.
  * @param {NodeListOf<HTMLElement>} els - Elements to be processed.
  */
export default function(els) {
    Array.from(els).forEach((target => {
        const component = target.getAttribute('component') ?? '';
        const request = components[component];

        if (request) {
            request().then(({ default: Component }) => {
                /** @type {NodeListOf<HTMLTemplateElement>} */
                const slotElements = target.querySelectorAll(':scope > template');

                /** @type {Record<string, DocumentFragment>} */
                const slots = {};

                slotElements.forEach(el => {
                    /** @type {string} */
                    const name = el.getAttribute('slot') ?? 'default';

                    slots[name] = el.content;
                });

                target.innerHTML = '';
                new Component({
                    target,
                    props: {
                        ...target.dataset,
                        $$slots: createSlots(slots),
                        $$scope: {}
                    }
                });
            });
        }
    }));
}

/**
 * Create slots for Svelte components.
 * @param {Record<string, DocumentFragment>} templates - The templates to create slots from.
 *
 * @returns {Record<string, Function[]>} - A record of slot functions.
 */
function createSlots(templates) {
    /** @type {Record<string, Function[]>} */
    const slots = {};

    for (const name in templates) {
        if (Object.prototype.hasOwnProperty.call(templates, name)) {
            slots[name] = [ createSlot(templates[name]) ];
        }
    }

    /**
     * @param {DocumentFragment} element - The template element to create a slot from.
     * @returns {Function} - Returns a function representing the slot.
     */
    function createSlot(element) {
        const nodes = [ ...element.childNodes ];

        return function() {
            return {
                c: () => {},
                l: () => {},
                m: (/** @type {HTMLElement} */ target, /** @type {Node} */ anchor) => {
                    Array.from(nodes).forEach(node => {
                        target.insertBefore(node, anchor || null);
                    });
                },
                d: /** @type {(detaching: boolean) => void} */ detaching => {
                    if (detaching) {
                        Array.from(nodes).forEach(node => {
                            if (node.parentNode) {
                                node.parentNode.removeChild(node);
                            }
                        });
                    }
                }
            };
        };
    }

    return slots;
}
