const path = require('path');

const resolve = function (dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  runtimeCompiler: true,
  devServer: {
    host: "localhost",
    port: 4438,
    open: true,
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        '@styles': resolve('src/styles')
      }
    },
  },
  // chainWebpack(config) {
  //   config.module
  //     .rule('svg')
  //     .exclude.add(resolve('src/assets/icons'))
  //     .end();
  //   config.module
  //     .rule('icons')
  //     .test(/\.svg$/)
  //     .include.add(resolve('src/assets/icons'))
  //     .end()
  //     .use('svg-sprite-loader')
  //     .loader('svg-sprite-loader')
  //     .options({
  //       symbolId: 'icon-[name]'
  //     })
  //     .end();
  // }
}