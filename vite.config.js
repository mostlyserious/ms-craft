import vitepack from '@mostlyserious/vitepack';
// import realFavicon from '@mostlyserious/vitepack/plugin/real-favicon';

const args = {
    base: '/static/',
    outDir: 'web/static'
};

export default vitepack(args, config => {
    config.build.rollupOptions = {
        input: 'src/js/main.js'
    };

    // config.plugins.unshift(realFavicon({
    //     input: 'src/favicon/config.json'
    // }));

    return config;
});
