const webpack = require("webpack")
const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const devPath = path.resolve(__dirname, "dev")
const merge = require("webpack-merge")
const baseConfig = require("./webpack.config.dev.base")
// const WriteFilePlugin = require('write-file-webpack-plugin');
const HappyPack = require("happypack")
const happyThreadPool = HappyPack.ThreadPool({ size: require("os").cpus().length - 1 })

const devConfig = {
    mode: "development",
    output: {
        path: devPath,
        filename: "[name].min.js"
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([
            { from: "src/assets", to: path.resolve(devPath, "assets"), force: true }
        ]),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("local"),
            "BUILD_ENV": JSON.stringify("local")
        }),
        new webpack.ProvidePlugin({
            $: "jquery"
        }),
        // new WriteFilePlugin({
        //     test: /\.html$/,
        //     useHashIndex: true
        // }),
        //用唯一的标识符id来代表当前的HappyPack是用来处理一类特定文件
        new HappyPack({
            id: "babel-application-js",
            threadPool: happyThreadPool,
            verbose: true,
            loaders: ["babel-loader"],
        }),
    ].concat(baseConfig.htmlArray),
    devServer: {
        contentBase: devPath,
        hot: true,
        port: 9100,
        disableHostCheck: true,

        stats: {
            // 添加时间信息
            timings: true,
            modules: false,
            // 添加资源信息
            assets: false,
            entrypoints: false,
            assetsSort: "field",
            // 添加构建日期和构建时间信息
            builtAt: true,
            cached: false,
            cachedAssets: false,
            children: false,
            chunks: false,
            chunkGroups: false,
            chunkModules: false,
            chunkOrigins: false,
            performance: true,
            errors: true,
            warnings: true,
        }
    },
    // devtool: "source-map"
    devtool: "cheap-module-eval-source-map"
}

module.exports = merge(baseConfig.baseConfig, devConfig)

