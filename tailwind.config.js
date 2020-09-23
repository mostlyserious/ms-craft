const glob = require('tiny-glob/sync');
const defaultConfig = require('tailwindcss/defaultConfig');
const blend = require('brightpack/tailwindcss/blend');
const inset = require('brightpack/tailwindcss/inset');
const isActive = require('brightpack/tailwindcss/is-active');
const filter = require('brightpack/tailwindcss/filter');
const fractions = require('brightpack/tailwindcss/fractions');
const viewportSizes = require('brightpack/tailwindcss/viewport-sizes');

module.exports = {
    important: 'body',
    purge: {
        content: [
            glob('templates/**/*.{twig,html}'),
            glob('src/js/**/*.{js,vue,svelte}')
        ].flat()
    },
    theme: {
        timestamp: Date.now(),
        screens: {
            'ie': { raw: '(-ms-high-contrast: none), (-ms-high-contrast: active)' },
            'prefers-motion': { raw: 'not (prefers-reduced-motion)' },
            'reduced-motion': { raw: '(prefers-reduced-motion)' },
            '2xs': '380px',
            'xs': '460px',
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1440px'
        },
        extend: {
            colors: {
                inherit: 'inherit',
                brand: {
                    orange: '#F45D1F'
                }
            },
            fontFamily: {

            },
            fontSize: {
                '8xl': '8rem',
                '7xl': '6rem',
                '6xl': '4rem',
                '5xl': '3rem',
                '4xl': '2.4rem',
                '3xl': '1.9rem',
                '2xl': '1.5rem',
                'xl': '1.25rem',
                'lg': '1.125rem',
                'md': '1rem',
                'sm': '0.875rem',
                'xs': '0.75rem'
            },
            spacing: {
                '7': '1.75rem',
                '9': '2.25rem'
            },
            padding: {
                '1/2': '50%',
                '1/3': '33.333333%',
                '2/3': '66.666667%',
                '1/4': '25%',
                '2/4': '50%',
                '3/4': '75%',
                '1/5': '20%',
                '2/5': '40%',
                '3/5': '60%',
                '4/5': '80%',
                '1/6': '16.666667%',
                '2/6': '33.333333%',
                '3/6': '50%',
                '4/6': '66.666667%',
                '5/6': '83.333333%',
                '1/12': '8.333333%',
                '2/12': '16.666667%',
                '3/12': '25%',
                '4/12': '33.333333%',
                '5/12': '41.666667%',
                '6/12': '50%',
                '7/12': '58.333333%',
                '8/12': '66.666667%',
                '9/12': '75%',
                '10/12': '83.333333%',
                '11/12': '91.666667%',
                'full': '100%'
            },
            width: {
                '7': '1.75rem',
                '9': '2.25rem',
                '14': '3.5rem',
                '80': '20rem'
            },
            height: theme => theme('width'),
            minHeight: theme => theme('height'),
            maxHeight: theme => theme('height'),
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
                '3': '3px',
                '6': '6px'
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
        display: [ ...defaultConfig.variants.display, 'is-active' ],
        backgroundColor: [ ...defaultConfig.variants.backgroundColor, 'is-active', 'group-hover', 'group-focus', 'hover-focus' ],
        borderColor: [ ...defaultConfig.variants.borderColor, 'group-hover', 'group-focus', 'hover-focus' ],
        borderWidth: [ ...defaultConfig.variants.borderWidth, 'focus' ],
        opacity: [ ...defaultConfig.variants.opacity, 'group-hover', 'hover-focus' ],
        textColor: [ ...defaultConfig.variants.textColor, 'group-hover', 'group-focus', 'hover-focus' ],
        scale: [ ...defaultConfig.variants.scale, 'group-hover', 'group-focus', 'hover-focus' ],
        translate: [ ...defaultConfig.variants.translate, 'group-hover', 'group-focus', 'hover-focus' ],
        visibility: [ ...defaultConfig.variants.visibility, 'is-active' ]
    },
    plugins: [
        blend,
        inset,
        filter,
        isActive,
        fractions,
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
        }
    ],
    corePlugins: {
        container: false
    },
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true
    }
};
