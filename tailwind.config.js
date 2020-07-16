const glob = require('tiny-glob/sync');

const vh = {
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
        ].flat()
    },
    theme: {
        timestamp: Date.now(),
        screens: {
            '2xs': '380px',
            'xs': '460px',
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px'
        },
        extend: {
            colors: {
                inherit: 'inherit',
                brand: {
                    orange: '#F45D1F'
                }
            },
            fontSize: {
                md: '1rem'
            },
            spacing: {
                full: '100%',
                ...vh
            },
            width: {
                '7': '1.75rem',
                '14': '3.5rem'
            },
            height: {
                '7': '1.75rem',
                '14': '3.5rem',
                ...vh
            },
            minHeight: theme => theme('height'),
            maxHeight: theme => theme('height'),
            maxWidth: {
                '7xl': '84rem',
                '8xl': '96rem'
            },
            borderWidth: {
                '1': '1px',
                '3': '3px'
            },
            borderRadius: {
                xl: '1rem'
            },
            opacity: {
                '10': 0.1,
                '20': 0.2,
                '30': 0.3,
                '40': 0.4,
                '60': 0.6,
                '70': 0.7,
                '80': 0.8,
                '90': 0.9
            }
        }
    },
    variants: {
        opacity: [ 'responsive', 'hover', 'focus', 'group-hover' ],
        borderColor: [ 'responsive', 'hover', 'focus', 'group-hover' ],
        translate: [ 'responsive', 'hover', 'focus', 'group-hover' ]
    },
    plugins: [],
    corePlugins: {
        container: false
    }
};
