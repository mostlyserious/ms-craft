import preprocess from 'svelte-preprocess';

export default {
    vitePlugin: { emitCss: false },
    preprocess: [ preprocess({
        typescript: true,
        postcss: true
    }) ]
};
