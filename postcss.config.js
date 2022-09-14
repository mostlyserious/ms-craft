module.exports = {
    plugins: {
        'postcss-import': {},
        'tailwindcss/nesting': {},
        'tailwindcss': {},
        'postcss-functions': {
            functions: {
                'svg-uri': value => {
                    const svg = value
                        .replace(/^['"]|['"]$/g, '')
                        .replace(/%/g, '%25')
                        .replace(/</g, '%3C')
                        .replace(/>/g, '%3E')
                        .replace(/&/g, '%26')
                        .replace(/#/g, '%23')
                        .replace(/{/g, '%7B')
                        .replace(/}/g, '%7D');

                    return `url(${JSON.stringify(`data:image/svg+xml;charset=utf-8,${svg}`)})`;
                }
            }
        },
        'postcss-preset-env': {
            autoprefixer: {
                flexbox: 'no-2009',
                grid: false
            },
            features: {
                'nesting-rules': false,
                'prefers-color-scheme-query': false
            },
            preserve: false,
            stage: 1
        }
    }
};
