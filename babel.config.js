module.exports = {
    // react-app 预设包含了core-js以及@babel/plugin-transform-runtime等插件
    // 包括了create react app使用的babel预设
    // 来自babel-preset-react-app
    presets: ["react-app"],
    // 自动开启js和jsx的HMR,配合@pmmmwh/react-refresh-webpack-plugin使用
    plugins: ["react-refresh/babel"]
}