const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob')
const PurgeCssWebpackPlugin = require('purgecss-webpack-plugin') //删除无意义的css,配合mini-css-webpack-plugin
const DLLReferencePlugin = require('webpack').DllReferencePlugin
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  output: {
    filename: 'buddle.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: []
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'), //模板
      filename: 'index.html' //生成html文件
    }),
    new PurgeCssWebpackPlugin({
      paths: glob.sync('./src/**/*', { nodir: true })
    }),
    new DLLReferencePlugin({
      manifest: path.resolve(__dirname, '../dll/manifest.json')
    }),
    new AddAssetHtmlPlugin({ filepath: path.resolve(__dirname, '../dll/react.dll.js') })
  ],
  optimization: {
    usedExports: true //tree-shaking/scope-hoisting  webpack内置的 这个只是提示有没有被用
  }
}
