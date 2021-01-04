export default els => {
    const customProperties = () => {
        const styles = document.documentElement.style;

        styles.setProperty('--viewport-height', `${innerHeight}px`);

        Array.prototype.forEach.call(els, el => {
            const [ property, key ] = JSON.parse(el.dataset.property);

            styles.setProperty(property, `${el[key]}px`);
        });
    };

    addEventListener('resize', customProperties);
    addEventListener('load', customProperties);
    setInterval(customProperties, 1000);
};
