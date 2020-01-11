module.exports = {
  plugins: {
    'autoprefixer': {},
    'postcss-pxtorem': {
      rootValue: 37.5, // 配置rem基础值
      propList: ['*'] // 全局使用
    }
  }
}
