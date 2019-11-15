const path = require('path')
const DLLPlugin = require('webpack').DllPlugin
module.exports = {
  mode: 'development',
  entry: ['react', 'react-dom'],
  output: {
    library: 'react', //接收自执行函数
    // libraryTarget: 'commonjs2',
    filename: 'react.dll.js',
    path: path.resolve(__dirname, 'dll')
  },
  plugins: [
    new DLLPlugin({
      name: 'react',
      path: path.resolve(__dirname, 'dll/manifest.json')
    })
  ]
}

//打包成node可以使用的模块
