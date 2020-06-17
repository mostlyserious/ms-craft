const glob = require('tiny-glob/sync');

const height = {
    'screen-10': '10vh',
    'screen-20': '20vh',
    'screen-25': '25vh',
    'screen-30': '30vh',
    'screen-33': '33vh',
    'screen-40': '40vh',
    'screen-50': '50vh',
    'screen-60': '60vh',
    'screen-66': '66vh',
    'screen-70': '70vh',
    'screen-75': '75vh',
    'screen-80': '80vh',
    'screen-90': '90vh',
    'screen': '100vh'
};

module.exports = {
    purge: {
        content: [
            glob('templates/**/*.{twig,html}'),
            glob('src/js/**/*.{js,vue,svelte}')
        ].flat(),
        options: {
            whitelistPatterns: [ /svelte/ ]
        }
    },
    theme: {
        timestamp: Date.now(),
        extend: {
            colors: {
                brand: {
                    orange: '#F45D1F'
                }
            },
            height: height,
            minHeight: theme => theme('height'),
            maxHeight: theme => theme('height')
        }
    },
    variants: {

    },
    plugins: []
};
