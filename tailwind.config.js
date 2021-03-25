const glob = require('tiny-glob/sync');
const blend = require('brightpack/tailwindcss/blend');
const inset = require('brightpack/tailwindcss/inset');
const filter = require('brightpack/tailwindcss/filter');
const isActive = require('brightpack/tailwindcss/is-active');
const colors = require('@tailwindcss/postcss7-compat/colors');
const viewportSizes = require('brightpack/tailwindcss/viewport-sizes');

module.exports = {
    // important: 'body',
    purge: {
        content: [
            glob('templates/**/*.{twig,html}'),
            glob('src/js/**/*.{js,vue,svelte}')
        ].flat()
    },
    theme: {
        timestamp: Date.now(),
        screens: {
            // 'prefers-motion': { raw: 'not (prefers-reduced-motion)' },
            // 'reduced-motion': { raw: '(prefers-reduced-motion)' },
            '2xs': '380px',
            'xs': '460px',
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px'
        },
        colors: {
            transparent: 'transparent',
            current: 'currentcolor',
            inherit: 'inherit',
            black: '#000',
            white: '#FFF',
            gray: colors.gray,
            blue: colors.blue,
            brand: {
                orange: '#F45D1F'
            }
        },
        extend: {
            fontFamily: {

            },
            fontSize: {
                '7xl': [ '6rem', '1.1' ],
                '6xl': [ '4rem', '1.2' ],
                '5xl': [ '3rem', '1.2' ],
                '4xl': [ '2.4rem', '1.3' ],
                '3xl': [ '1.9rem', '1.3' ],
                '2xl': [ '1.5rem', '1.4' ],
                'xl': [ '1.25rem', '1.4' ],
                'lg': [ '1.125rem', '1.5' ],
                'md': [ '1rem', '1.5' ],
                'sm': [ '0.875rem', '1.5' ],
                'xs': [ '0.75rem', '1.5' ],
                '2xs': [ '0.66rem', '1.6' ]
            },
            spacing: {
                '7': '1.75rem',
                '9': '2.25rem'
            },
            width: {
                '2px': '2px',
                '3px': '3px',
                '7': '1.75rem',
                '9': '2.25rem',
                '14': '3.5rem',
                '80': '20rem'
            },
            // height: theme => theme('width'),
            // minHeight: theme => theme('height'),
            // maxHeight: theme => theme('height'),
            minWidth: {
                '7xl': '84rem',
                '8xl': '96rem'
            },
            maxWidth: {
                '7xl': '84rem',
                '8xl': '96rem'
            },
            borderWidth: {
                '1': '1px',
                '3': '3px'
            },
            borderRadius: {

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
            },
            transitionDelay: {
                '400': '400ms',
                '600': '600ms',
                '800': '800ms',
                '900': '900ms'
            },
            transitionDuration: {
                '400': '400ms',
                '600': '600ms',
                '800': '800ms',
                '900': '900ms'
            },
            zIndex: {
                '1': 1,
                '2': 2,
                '3': 3
            }
        }
    },
    variants: {
        extend: {
            display: [ 'is-active' ],
            backgroundColor: [ 'is-active', 'hover-focus', 'group-hover-focus' ],
            borderColor: [ 'hover-focus', 'group-hover-focus' ],
            opacity: [ 'group-hover', 'hover-focus' ],
            textColor: [ 'hover-focus', 'group-hover-focus' ],
            scale: [ 'hover-focus', 'group-hover-focus' ],
            translate: [ 'hover-focus', 'group-hover-focus' ],
            visibility: [ 'is-active' ]
        }
    },
    plugins: [
        blend,
        inset,
        filter,
        isActive,
        viewportSizes,
        ({ addVariant, e }) => {
            addVariant('hover-focus', ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `
                        .${e(`hover-focus${separator}${className}`)}:hover,
                        .${e(`hover-focus${separator}${className}`)}:focus
                    `;
                });
            });
            addVariant('group-hover-focus', ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `
                        .group:hover .${e(`group-hover-focus${separator}${className}`)},
                        .group:focus .${e(`group-hover-focus${separator}${className}`)}
                    `;
                });
            });
        }
    ],
    corePlugins: {
        container: false
    }
};
