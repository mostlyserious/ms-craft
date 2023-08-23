export default {
    prefix: 'cp-',
    content: [
        // Only here to avoid "No utility classes were detected" warning in CLI.
        { raw: '<div class="cp-block"></div>', extension: 'html' }
    ],
    corePlugins: {
        container: false
    }
};
