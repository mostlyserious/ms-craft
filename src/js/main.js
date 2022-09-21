import '../css/main.css';
import init from './init';

import.meta.glob('../{img,font,media}/**/*');

(ready => {
    if (document.readyState !== 'loading') {
        ready();
    } else {
        document.addEventListener('DOMContentLoaded', ready);
    }
})(() => {
    init(document);

    addEventListener('keydown', event => {
        if (event.code === 'Tab') {
            document.body.classList.add('is-tabbing');
        }
    });

    addEventListener('mousedown', () => {
        document.body.classList.remove('is-tabbing');
    });
});
