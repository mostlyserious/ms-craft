import propertyAccess from '../util/property-access';

const styles = document.documentElement.style;

/**
 * @type {ReturnType<typeof setInterval>}
 */
let interval;

/**
 * @param {NodeListOf<HTMLElement>} els - A collection of DOM elements.
 */
export default els => {
    if (interval) {
        removeEventListener('resize', () => customProperties(els));
        removeEventListener('load', () => customProperties(els));
        clearInterval(interval);
    }

    addEventListener('resize', () => customProperties(els));
    addEventListener('load', () => customProperties(els));
    interval = setInterval(() => customProperties(els), 1000);

    customProperties(els);
};

/**
 * @param {NodeListOf<HTMLElement>} els - A collection of DOM elements.
 */
function customProperties(els) {
    Array.from(els).forEach(el => {
        /** @type {Array<string>} */
        const properties = el.dataset.property
            ? el.dataset.property.trim().split(';').filter(Boolean)
            : [];

        properties.forEach(property => {
            let args = property.trim(),
                value = undefined,
                prop = '',
                unit = '',
                key = '';

            [ prop, key ] = args.split(':').map(str => str.trim());
            [ key, unit ] = key.split('|').map(str => str.trim());

            value = propertyAccess(el, key);

            if (value !== undefined) {
                styles.setProperty(prop, `${value}${unit || ''}`);
            }
        });
    });
}
