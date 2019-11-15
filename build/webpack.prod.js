const path = require('path')
const base = require('./webpack.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const merge = require('webpack-merge')
module.exports = () => {
  const prod = {
    mode: 'production',
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
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader' //加上autoprefixer
          ]
        },
        {
          test: /\.(scss|sass)$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
        },
        {
          test: /\.(tsx?|ts|jsx?|js)$/,
          use: 'babel-loader'
        },
        {
          test: /\.(jpe?g|png|gif|JPE?G|PNG|GIF)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: 'image/[name].[ext]',
                limit: 20 * 1024 //如果大于1k,默认file-loader，貌似url-loader里有，不用再另外下载
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                  enabled: false
                },
                pngquant: {
                  quality: [0.65, 0.9],
                  speed: 4
                },
                gifsicle: {
                  interlaced: false
                },
                // the webp option will enable WEBP
                webp: {
                  quality: 75
                }
              }
            }
          ]
        }
      ]
    },
    optimization: {
      //优化项
      minimizer: [
        //压缩方式
        new OptimizeCssAssetsWebpackPlugin(),
        new TerserWebpackPlugin()
      ]
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['**/*'] //清除build的文件
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html'), //模板
        filename: 'index.html', //生成html文件
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true
        }
      }),
      new MiniCssExtractPlugin({
        filename: 'style/main.css'
      }) //开发环境下，把css提取出文件
    ]
  }
  return merge(base, prod)
}

//Minimizing For Production
//To minify the output, use a plugin like optimize-css-assets-webpack-plugin.
//Setting optimization.minimizer overrides the defaults provided by webpack, so make sure to also specify a JS minimizer:
