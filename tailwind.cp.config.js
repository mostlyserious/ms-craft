module.exports = {
    prefix: 'cp-',
    content: [
        'vendor/percipioglobal/**/*.{twig,html}',
        'vendor/craftcms/**/*.{twig,html}',
        'vendor/spicyweb/**/*.{twig,html}'
    ],
    safelist: [
        { pattern: /redactor-styles/ }
    ],
    corePlugins: {
        container: false
    }
};
