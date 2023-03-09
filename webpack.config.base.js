const path = require("path")
const fs = require("fs")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const srcRoot = path.resolve(__dirname, "src")
// const containerDir = path.resolve(srcRoot, "modules")
const containerDir = path.resolve(srcRoot, "components")
const mainFile = "index.js"

const autoprefixer = require("autoprefixer")
const pxtorem = require("postcss-pxtorem")
const postcssConfig = {
  loader: "postcss-loader",
  options: {
    plugins: () => [
      autoprefixer({ browsers: ["> 1%", "last 4 versions"] }),
      pxtorem({
        rootValue: 100,
        propWhiteList: [],
      })
    ]
  }
}
function getHtmlArray(entryMap) {
  const htmlArray = []
  Object.keys(entryMap).forEach((key) => {
    const fullPathName = path.resolve(containerDir, key)
    if (fs.existsSync(fullPathName)) {
      htmlArray.push(new HtmlWebpackPlugin({
        filename: key + ".html",
        template: "./src/index.html",
        chunks: ["common", key],
        minify: true,
        webfunny: process.argv[6]
      }))
    }
  })
  return htmlArray
}

function getEntry() {
  const entryMap = {}
  fs.readdirSync(containerDir).forEach((pathname) => {
    const fullPathName = path.resolve(containerDir, pathname)
    const stat = fs.statSync(fullPathName)
    const fileName = path.resolve(fullPathName, mainFile)
    if (stat.isDirectory() && fs.existsSync(fileName)) {
      entryMap[pathname] = fileName
    }
  })
  return entryMap
}

const entryMap = getEntry()
const htmlArray = getHtmlArray(entryMap)

const baseConfig = {
  entry: "./src/components/numberScroll/index.js",
  resolve: {
    alias: {
      Components: path.resolve(__dirname, "src/components/")
    },
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [{ loader: "babel-loader" }],
        //把对.js文件的处理转交给id为babel的HappyPack实例
        // use: 'happypack/loader?id=babel-application-js',
        exclude: /node_modules/,
        include: srcRoot
      },
      {
        test: /\.js?$/,
        exclude: /node_modules | lib/,
        loader: "eslint-loader"
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, {
          loader: "css-loader", options: {
            minimize: true, modules: false,
            localIdentName: "[path][name]__[local]--[hash:base64:5]"
          }
        },
          "sass-loader",
          postcssConfig
        ],
        include: srcRoot
      },
      // {
      //     test: /\.(png|jpg|jpeg|gif)$/,
      //     use: 'url-loader?limit=8192&name=./images/[name].[hash].[ext]',
      //     include: srcRoot
      // },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "@svgr/webpack",
            options: {
              babel: false,
              icon: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|webp|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[path][name].[ext]",
              limit: 2000
            }
          }
        ]
      }
    ]
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       common: {
  //         test: /[\\/]node_modules[\\/]/,
  //         chunks: "all",
  //         name: "common"
  //       }
  //     }
  //   }
  // },
}
module.exports = {
  htmlArray: htmlArray,
  baseConfig: baseConfig
}

