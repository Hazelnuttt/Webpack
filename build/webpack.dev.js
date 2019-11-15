const path = require('path')
const base = require('./webpack.base')
const merge = require('webpack-merge')
module.exports = () => {
  const dev = {
    mode: 'development',
    entry: path.resolve(__dirname, '../src/index.tsx'),
    output: {
      filename: 'buddle.js',
      path: path.resolve(__dirname, '../dist')
    },
    devServer: {
      //实时监控，开发服务器的配置
      port: 3000,
      compress: true,
      contentBase: path.resolve(__dirname, '../dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader']
        },
        {
          test: /\.(scss|sass)$/,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        },
        {
          test: /\.(tsx?|ts|jsx?|js)$/,
          use: 'babel-loader'
        },
        {
          test: /\.(jpe?g|png|gif|JPE?G|PNG|GIF)$/,
          use: {
            loader: 'url-loader',
            options: {
              name: 'image/[name].[ext]',
              limit: 1024 //如果大于1k,默认file-loader，貌似url-loader里有，不用再另外下载
            }
          }
        }
      ]
    }
  }
  return merge(base, dev)
}
