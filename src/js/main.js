(ready => {
    if (document.readyState !== 'loading') {
        ready();
    } else {
        document.addEventListener('DOMContentLoaded', ready);
    }
})(() => {
    console.log('Ready.');

    Array.prototype.forEach.call(document.querySelectorAll('[target=_blank]'), el => el.setAttribute('rel', 'noreferrer noopener'));
});
