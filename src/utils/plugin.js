import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.extend(relativeTime)
export default {
  install (Vue) {
    Vue.prototype.$notice = (params) => Vue.prototype.$notify({ duration: 1000, ...params })
    Vue.prototype.$sleep = sleep
    Vue.filter('relTime', relTime) // 注册一个相对时间的过滤器
  }
}
// time=500 表示如果传了time值，用传入的值，不然默认500ms
function sleep (time) {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(), time)
  })
}
function relTime (value) {
// value值就是要处理的时间
  return dayjs().locale('zh-cn').from(value)
}
