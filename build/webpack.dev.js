const path = require('path')
module.exports = {
  mode: 'development',
  devServer: {
    //实时监控，开发服务器的配置
    port: 3000,
    compress: true,
    contentBase: path.resolve(__dirname, '../dist')
  }
}
