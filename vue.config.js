// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ?
    '/production-sub-path/' : '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.0.52:8080',
        ws: true,
        changeOrigin: true,
        pathReWrite: {
          '^/api': ''
        }
      }
    }
  }
}