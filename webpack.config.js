const path = require('path');
const glob = require('tiny-glob/sync');
const brightpack = require('brightpack');
// const RealFaviconPlugin = require('brightpack/lib/real-favicon-plugin');

const dest = 'web/static';
const publicPath = '/static/';
const watch = [
    'templates/**/*.{twig,html}',
    'modules/**/*.{twig,html}',
    'config/**/*.php'
];

module.exports = brightpack({ dest, publicPath, watch }, config => {
    const assets = glob('src/{img,font,media}/**.*');

    brightpack.editLoader(config, 'babel-loader', (use, rule) => {

    });

    config.entry = {
        app: [
            // Include for IE11 support.
            // 'custom-event-polyfill',
            // 'core-js/modules/es.promise',
            // 'core-js/modules/es.array.iterator',
            path.resolve('src/js/main.js'),
            path.resolve('src/css/main.css'),
            ...assets.map(p => path.resolve(p))
        ],
        utilities: [
            path.resolve('src/css/utilities.css')
        ]
    };

    // config.plugins.push(new RealFaviconPlugin({
    //     filename: global.inProduction
    //         ? 'favicon/[name].[contenthash:7]'
    //         : 'favicon/[name]',
    //     config: path.resolve('src/favicon/config.json')
    // }));

    if (global.inProduction) {

    }

    return config;
});
