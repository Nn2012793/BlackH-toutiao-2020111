module.exports = {
  // 覆盖蓝色主题
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          blue: '#3296fa'
        }
      }
    }
  },
  configureWebpack: (config) => {
    // 这里的config就是vue-cli里面webpack的所有配置信息
    if (process.env.NODE_ENV === 'production') {
      // 满足条件表示webpack会在生产模式下运行
      // 这时就要把所有的console删除掉  然后再打包
      // 不是删除源代码的console  而是删除打包出来的代码的console----drop_console
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  publicPath: './' // 默认值是 /  修改为./ 为了使用html协议查看时能读取页面
}
