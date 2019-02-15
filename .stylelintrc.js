module.exports = {
    "extends": ["stylelint-config-recommended-scss"],
    "rules": {
        "no-empty-source": null,
        "block-no-empty": null,
        "no-descending-specificity": null,
        "font-family-no-missing-generic-family-keyword": null,
        "selector-list-comma-newline-after": "always",
    },
    "processors": ["@mapbox/stylelint-processor-arbitrary-tags"],
};
