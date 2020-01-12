export default {
  install (Vue) {
    Vue.prototype.$notice = (params) => Vue.prototype.$notify({ duration: 1000, ...params })
  }
}
