export default els => {
    const components = {
        // 'example-component': () => import('./components/ExampleComponent.svelte' /* webpackChunkName: 'example-component' */)
    };

    els.forEach(target => {
        const component = target.getAttribute('component');
        const request = components[component];

        if (request) {
            request().then(({ default: Component }) => {
                const slot = target.innerHTML;

                target.innerHTML = '';
                new Component({
                    target,
                    props: { slot, ...target.dataset }
                });
            });
        }
    });
};
