const js = require('@eslint/js');
const globals = require("globals");
const reactPlugin = require("eslint-plugin-react");

module.exports = [
    {
        files: ["src/**/*.js", "src/**/*.jsx"],
        plugins: {
            react: reactPlugin
        },
        languageOptions: {
            sourceType: "module",
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            },
            globals: {
                ...globals.node,
                ...globals.browser
            }
        }
    }
]