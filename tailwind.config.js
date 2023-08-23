import plugin from 'tailwindcss/plugin';
import typography from '@tailwindcss/typography';
import * as utils from '@mostlyserious/tailwindcss-util';

export default {
    content: [
        'src/js/**/*.{js,vue,svelte}',
        'templates/**/*.{twig,html}',
        'modules/*.{php,twig,html}',
        'config/*.php'
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
            '4xl': [ '2.25rem', '1.11' ],
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
                brand: {
                    orange: '#F45D1F'
                }
            },
            fontFamily: {

            },
            maxHeight: theme => theme('height'),
            minHeight: theme => theme('height'),
            maxWidth: theme => ({ ...theme('width'), '8xl': '88rem', '9xl': '92rem' }),
            minWidth: theme => ({ ...theme('width'), ...theme('maxWidth'), '8xl': '88rem', '9xl': '92rem' }),
            borderWidth: {
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
        typography,
        utils.inset,
        utils.clamp,
        utils.viewport,
        utils.textStroke,
        utils.stateVariant('active'),
        plugin(({ addComponents, addUtilities, theme }) => {
            addUtilities({
                '.appearance-none': {
                    '-webkit-appearance': 'none',
                    '-moz-appearance': 'none'
                },
                '.has-active': {
                    '@apply opacity-0 pointer-events-none': false,
                    '@apply is-active:opacity-100 is-active:pointer-events-auto': false
                }
            });

            addComponents({
                '.container': {
                    '@apply max-w-5xl w-full px-6 mx-auto': false
                },
                '.container-sm': {
                    '@apply max-w-4xl !important': false
                },
                '.container-lg': {
                    '@apply max-w-6xl !important': false
                },
                '.container-offset-right': {
                    'margin-right': `max(0px, calc(calc(100vw - ${theme('maxWidth.5xl')}) / 2))`,
                    '@apply pr-6': false
                },
                '.container-offset-left': {
                    'margin-left': `max(0px, calc(calc(100vw - ${theme('maxWidth.5xl')}) / 2))`,
                    '@apply pl-6': false
                },
                '.container-lg-offset-right': {
                    'margin-right': `max(0px, calc(calc(100vw - ${theme('maxWidth.6xl')}) / 2))`,
                    '@apply pr-6': false
                },
                '.container-lg-offset-left': {
                    'margin-left': `max(0px, calc(calc(100vw - ${theme('maxWidth.6xl')}) / 2))`,
                    '@apply pl-6': false
                }
            });
        })
    ],
    corePlugins: {
        container: false
    }
};
