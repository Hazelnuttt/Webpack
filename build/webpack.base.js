const path = require('path')
const dev = require('./webpack.dev')
const prod = require('./webpack.prod')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = env => {
  //env 环境变量
  const isEnvDevelopment = env.development
  const isEnvProduction = env.production
  const base = {
    entry: path.resolve(__dirname, '../src/index.tsx'),
    output: {
      filename: 'buddle.js',
      path: path.resolve(__dirname, '../dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            isEnvDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader'
          ]
        },
        {
          test: /\.(tsx?|ts|jsx?|js)$/,
          use: 'babel-loader'
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        },
        // {
        //   test: /\.(woff|ttf|eot|svg|jpe?g|png|gif|JPE?G|PNG|GIF)$/,
        //   use: {
        //     loader: 'file-loader'
        //   }
        // },
        {
          test: /\.(jpe?g|png|gif|JPE?G|PNG|GIF)$/,
          use: {
            loader: 'url-loader',
            options: {
              name: 'image/[name].[ext]',
              limit: 1024
            }
          }
        }
      ]
    },
    plugins: [
      isEnvProduction &&
        new MiniCssExtractPlugin({
          filename: 'style/main.css'
        }), //开发环境下，把css提取出文件
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html'),
        filename: 'index.html',
        minify: isEnvProduction && {
          removeAttributeQuotes: true,
          collapseWhitespace: true
        }
      })
    ].filter(Boolean)
  }
  if (isEnvDevelopment) {
    return merge(base, dev)
  } else {
    return merge(base, prod)
  }
}
