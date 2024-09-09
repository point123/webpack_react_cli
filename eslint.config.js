const globals = require("globals");
const reactPlugin = require("eslint-plugin-react");

module.exports = [
    {
        // 对哪些文件检查
        files: ["src/**/*.js", "src/**/*.jsx"],
        plugins: {
            // 使用eslint-plugin-react插件,react特定规则
            react: reactPlugin
        },
        languageOptions: {
            sourceType: "module",
            parserOptions: {
                // 支持jsx特性
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