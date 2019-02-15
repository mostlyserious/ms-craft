module.exports = {
	"extends": [
		"airbnb-base",
		"plugin:vue/recommended"
	],
	"rules": {
		"max-len": ["error", {
			"code": 120,
		}],
        "import/prefer-default-export": ["never"],
		"indent": ["error", 4],
		"vue/html-indent": ["error", 4],
		"vue/html-closing-bracket-newline": ["error", {
			"singleline": "never",
			"multiline": "always"
		}],
		"vue/max-attributes-per-line": [3, {
			"singleline": 3,
			"multiline": {
				"max": 1,
				"allowFirstLine": false
			}
		}]
	},
	"parserOptions": {
		"parser": "babel-eslint",
	}
};
