const path = require("node:path");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "static/js/[name].js",
        chunkFilename: "static/js/[name].chunk.js", // 动态导入的chunk
        assetModuleFilename: "static/assets/[hash:10][ext][query]",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader" // 配合postcss.config.js和browserslist
                ]
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.styl/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                    "stylus-loader"
                ]
            },
            {
                test: /\.(png|jpe?g|gif|webp|svg)$/,
                type: "asset",
                generator: {
                    filename: "static/images/[hash:10][ext][query]",
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024
                    }
                }
            },
            {
                test: /\.(woff2|ttf)$/,
                type: "asset/resource",
                generator: {
                    filename: "static/fonts/[hash:10][ext][query]",
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    cacheCompression: false
                }
            }
        ]
    },
    plugins: [
        new EslintWebpackPlugin({
            configType: "flat",
            context: path.resolve(__dirname, "../src"),
            cache: true,
            cacheLocation: path.resolve(__dirname, "../node_modules/.cache/eslintcache"),
            // webpack官网中关于eslint-webpack-plugin中提到,需要设置eslintPath为eslint/use-at-your-own-risk
            eslintPath: "eslint/use-at-your-own-risk"
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html"),
        }),
        // react-refresh插件,自动给js和jsx开启hmr,配合babel配置使用
        new ReactRefreshWebpackPlugin(),
    ],
    mode: "development",
    devtool: "source-map",
    optimization: {
        splitChunks: {
            chunks: "all"
        },
        runtimeChunk: {
            name: entryPoint => `runtime~${entryPoint.name}`
        },
    },
    resolve: {
        // 尝试按顺序解析这些后缀名。如果有多个文件有相同的名字，但后缀名不同，webpack 会解析列在数组首位的后缀的文件 并跳过其余的后缀。
        extensions: [".jsx", ".js", ".json", ".wasm"]
    },
    devServer: {
        host: "localhost",
        port: "8080",
        open: true,
        hot: true,
        // 当使用了react路由时,当刷新页面时会404,因为没有对应的资源;
        // 开启该功能可以当404时返回index,react会根据路径解析到正确的路由
        historyApiFallback: true
    }
}