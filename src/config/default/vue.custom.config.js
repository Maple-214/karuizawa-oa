const vueDefaultConfig = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: true,
    transpileDependencies: ['vue-echarts', 'resize-detector'],
    //webpack 配置的项目名称
    title: 'karuizawa-oa',
    titleSeparator: ' - ',
    titleReverse: false,
    devPort: '9999',
    abbreviation: 'vt2at',
    providePlugin: {},
    build7z: false,
}

module.exports = vueDefaultConfig
  