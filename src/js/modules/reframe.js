export default els => {
    Array.prototype.forEach.call(els, el => {
        const frame = el.querySelector('iframe, video');
        const height = frame.getAttribute('height') || 9;
        const width = frame.getAttribute('width') || 16;
        const padding = (parseInt(height) / parseInt(width)) * 100;

        el.style.position = 'relative';
        el.style.width = '100%';
        el.style.paddingTop = `${padding}%`;

        frame.style.position = 'absolute';
        frame.style.width = '100%';
        frame.style.height = '100%';
        frame.style.left = '0';
        frame.style.top = '0';
    });
};
