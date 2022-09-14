/* global Redactor */

($R => {
    $R.add('plugin', 'buttons', {
        init(app) {
            this.app = app;
        },
        start() {
            this.app.toolbar.addButton('button', {
                title: 'Button',
                icon: '<svg style="height: 1em; width: 1rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M592 96.5H48c-26.5 0-48 21.5-48 48v223c0 26.5 21.5 48 48 48h544c26.5 0 48-21.5 48-48v-223c0-26.5-21.5-48-48-48zm-6 271H54c-3.3 0-6-2.7-6-6v-211c0-3.3 2.7-6 6-6h532c3.3 0 6 2.7 6 6v211c0 3.3-2.7 6-6 6z"/></svg>',
                api: 'plugin.buttons.addButton'
            });
        },
        addButton() {
            this.app.module.inline.format({
                tag: 'a',
                class: 'button button-prose',
                type: 'toggle'
            });
        }
    });
})(Redactor);
