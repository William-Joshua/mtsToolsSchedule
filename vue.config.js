// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ?
    '/production-sub-path/' : '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:56152/',
        ws: true,
        changeOrigin: true,
        pathReWrite: {
          '^/api': ''
        }
      }
    }
  }
}