const webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const distPath = path.resolve(__dirname, "./dist")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const merge = require("webpack-merge")
const baseConfig = require("./webpack.config.base")

const buildConfig = {
    mode: "production",
    output: {
        path: distPath,
        filename: "[name].min.js",
        publicPath: "./"
    },
    plugins: [
        new CleanWebpackPlugin([distPath], { allowExternal: true }),
        // new CopyWebpackPlugin([
        //     { from: "src/assets", to: path.resolve(distPath, "assets"), force: true },
        //     //{ from: 'src/containers/index', to: path.resolve(distPath, 'css/src/containers/index'), force: true }
        // ]),
        new MiniCssExtractPlugin({
            filename: "./[name].[hash].css"
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.argv[6] + ""),
            "BUILD_ENV": JSON.stringify(process.argv[6] + "")
        }),
        new webpack.ProvidePlugin({
            $: "jquery"
        }),
        new HtmlWebpackPlugin({
            webfunny: true,
            baiduAs: true
        })
    ],
    // devtool: "source-map"
}

module.exports = merge(baseConfig.baseConfig, buildConfig)

