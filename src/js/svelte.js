import { detach, insert, noop } from 'svelte/internal';

const store = () => import('./store');
const components = {
    // 'example-component': () => import('./components/ExampleComponent')
};

export default els => {
    els.forEach(target => {
        const component = target.getAttribute('component');
        const request = components[component];

        if (request) {
            Promise.all([
                request(),
                store()
            ]).then(([ { default: Component }, { default: store } ]) => {
                const slotElements = target.querySelectorAll(':scope > template');
                const slots = {};

                slotElements.forEach(el => {
                    const name = el.getAttribute('slot');

                    slots[name ? name : 'default'] = el.content;
                });

                target.innerHTML = '';
                new Component({
                    target,
                    store,
                    props: {
                        ...target.dataset,
                        $$slots: createSlots(slots),
                        $$scope: {}
                    }
                });
            });
        }
    });
};

function createSlots(templates) {
    const slots = {};

    for (const name in templates) {
        if (Object.prototype.hasOwnProperty.call(templates, name)) {
            slots[name] = [ createSlot(templates[name]) ];
        }
    }

    function createSlot(element) {
        const nodes = [ ...element.childNodes ];

        return function() {
            return {
                c: noop,
                l: noop,
                m: (target, anchor) => {
                    Array.prototype.forEach.call(nodes, node => {
                        insert(target, node, anchor);
                    });
                },
                d: detaching => {
                    if (detaching) {
                        Array.prototype.forEach.call(nodes, node => {
                            detach(node);
                        });
                    }
                }
            };
        };
    }

    return slots;
}
