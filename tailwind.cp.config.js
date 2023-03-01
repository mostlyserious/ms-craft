const plugin = require('tailwindcss/plugin');

module.exports = {
    prefix: 'cp-',
    content: [
        'vendor/percipioglobal/craft-colour-swatches/**/*.{twig,html}',
        'vendor/craftcms/**/*.{twig,html}',
        'vendor/spicyweb/**/*.{twig,html}'
    ],
    safelist: [
        { pattern: /redactor-styles/ }
    ],
    theme: {
        screens: {
            '2xs': '380px',
            'xs': '460px',
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px'
        },
        fontSize: {
            '9xl': [ '8rem', '1' ],
            '8xl': [ '6rem', '1' ],
            '7xl': [ '4.5rem', '1' ],
            '6xl': [ '3.75rem', '1' ],
            '5xl': [ '3rem', '1' ],
            '4xl': [ '2.5rem', '1.11' ],
            '3xl': [ '1.875rem', '1.2' ],
            '2xl': [ '1.5rem', '1.33' ],
            'xl': [ '1.25rem', '1.4' ],
            'lg': [ '1.125rem', '1.55' ],
            'md': [ '1rem', '1.5' ],
            'sm': [ '0.875rem', '1.43' ],
            'xs': [ '0.75rem', '1.33' ],
            '2xs': [ '0.66rem', '1.11' ]
        },
        extend: {
            colors: {

            },
            fontFamily: {

            },
            maxHeight: theme => theme('height'),
            minHeight: theme => theme('height'),
            maxWidth: theme => ({ ...theme('width'), '8xl': '88rem', '9xl': '92rem' }),
            minWidth: theme => ({ ...theme('width'), ...theme('maxWidth'), '8xl': '88rem', '9xl': '92rem' }),
            borderRadius: {
                '4xl': '2rem'
            },
            borderWidth: {
                'brand': '0.75px',
                '0.5': '0.5px',
                '3': '3px',
                '6': '6px'
            },
            transitionDelay: {
                '400': '400ms',
                '600': '600ms',
                '800': '800ms',
                '900': '900ms'
            },
            transitionDuration: {
                DEFAULT: '300ms',
                '400': '400ms',
                '600': '600ms',
                '800': '800ms',
                '900': '900ms'
            },
            zIndex: {
                '1': 1,
                '2': 2,
                '3': 3,
                '4': 4,
                '5': 5
            }
        }
    },
    plugins: [
        plugin(({ addUtilities }) => {
            addUtilities({
                '.appearance-none': {
                    '-webkit-appearance': 'none',
                    '-moz-appearance': 'none'
                }
            });
        })
    ],
    corePlugins: {
        container: false
    }
};
