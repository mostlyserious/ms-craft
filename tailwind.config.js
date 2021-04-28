const glob = require('tiny-glob/sync');
const inset = require('brightpack/tailwindcss/inset');
const isActive = require('brightpack/tailwindcss/is-active');
const viewportSizes = require('brightpack/tailwindcss/viewport-sizes');

module.exports = {
    mode: 'jit',
    purge: {
        content: [
            glob('src/js/**/*.{js,vue,svelte}'),
            glob('templates/**/*.{twig,html}'),
            glob('config/*.php')
        ].flat()
    },
    theme: {
        timestamp: Date.now(),
        screens: {
            'prefers-motion': { raw: 'not (prefers-reduced-motion)' },
            'reduced-motion': { raw: '(prefers-reduced-motion)' },
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
            width: {
                'min-content': 'min-content',
                'max-content': 'max-content'
            },
            minHeight: theme => theme('height'),
            maxHeight: theme => theme('height'),
            minWidth: theme => theme('width'),
            maxWidth: theme => theme('width'),
            borderWidth: {
                '1': '1px',
                '3': '3px'
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
    plugins: [
        inset,
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
