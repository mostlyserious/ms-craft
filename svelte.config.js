const path = require('path');
const postcssload = require('postcss-load-config');

const postcss = requireOptional('postcss');
const postcssrc = postcssload(process.cwd());

module.exports = {
    vitePlugin: { emitCss: false },
    preprocess: {
        async style(input) {
            if (postcss && (input.attributes.type === 'text/postcss' || input.attributes.lang === 'postcss')) {
                const { plugins } = await postcssrc;
                const result = await postcss(plugins).process((input.code || input.content), {
                    from: path.basename(input.filename),
                    map: { inline: false }
                });

                return {
                    code: result.css,
                    map: result.map
                };
            }

            return;
        }
    }
};

function requireOptional(moduleName) {
    try {
        return require(path.resolve(process.cwd(), 'node_modules', moduleName));
    } catch (e) {
        return false;
    }
}
