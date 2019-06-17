module.exports = {
	"extends": [
		"airbnb-base"
    ],
	"rules": {
		"max-len": ["error", {
			"code": 120,
		}],
        "import/prefer-default-export": ["never"],
		"indent": ["error", 4],
        "no-use-before-define": ["error", { "functions": false, "classes": true }],
        "no-param-reassign": ["error", { "props": false }],
        "consistent-return": ["off"],
        "arrow-body-style": ["off"],
        "class-methods-use-this": ["off"],
        "func-names": ["off"],
        "prefer-arrow-callback": ["off"],
	},
	"parserOptions": {
		"parser": "babel-eslint",
	}
};
