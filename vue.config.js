const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const proxyOption = {
  target: 'http://47.110.211.155:4344',
  changeOrigin: true,
  secure: false
}
const pages = {
  index: resolve('src/main.js')
}

module.exports = {
  lintOnSave: true,
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: '', // 静态资目录，相对 outputDir
  // indexPath: '', // index.html输出路径
  pages,
  filenameHashing: true,
  runtimeCompiler: false,
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        // vue$: 'vue/dist/vue.esm.js',
        // '@': resolve('src'),
        assets: resolve('src/assets')
        // components: resolve('src/components'),
        // utils: resolve('src/utils'),
        // apis: resolve('src/apis')
      }
    }
  },
  chainWebpack: config => {
    config.externals({
      'vue': 'Vue',
      'element-ui': 'ELEMENT'
    })
    config.plugin('define').tap(args => {
      args[0]['process.env'].BASE_URL = JSON.stringify(process.env.BASE_URL)
      return args
    })
    // 文件大小分析
    // config
    //   .plugin('webpack-bundle-analyzer')
    //   .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  },
  devServer: {
    open: false,
    https: false,
    disableHostCheck: true,
    proxy: {
      '/api': proxyOption
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "assets/css/_variables.scss";
        `
      }
    }
  }
}
