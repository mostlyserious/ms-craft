const mix = require('laravel-mix');
const sassJsonImporter = require('node-sass-json-importer');
require('laravel-mix-stylelint');

mix.version()
    .disableNotifications()
    .setPublicPath('web')
    // .extract([])
    .js('assets/js/main.js', 'web/js')
    .sass('assets/scss/main.scss', 'web/css', {
        importer: sassJsonImporter(),
    })
    .stylelint({
        context: './assets/',
    })
    .copyDirectory('assets/img', 'web/img')
    .copyDirectory('assets/web', 'web')
    .sourceMaps()
    .webpackConfig({
        output: {
            publicPath: '/',
            chunkFilename: 'js/chunks/[name].js?q=[chunkhash]',
        },
        module: {
            rules: [{
                enforce: 'pre',
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
            }],
        },
    })
    .browserSync({
        proxy: 'localhost:8000',
        files: ['templates/**/*', 'web/css/*.css', 'web/js/*.js'],
    });
