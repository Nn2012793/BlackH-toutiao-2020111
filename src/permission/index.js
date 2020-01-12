import router from '@/router'
import store from '@/store'
// 路由拦截 --- 导航首位
// 前置守卫 --- 路由改变时触发
router.beforeEach(function (to, from, next) {
  // 当要去user系列页面时，拦截判断是否有token 有--放行 无---登录
  if (to.path.startsWith('/user') && !store.state.user.token) {
    let toPath = { path: '/login', query: { redirectURL: to.path } } // 应该传要去的地址 to.path
    next(toPath)
  } else {
    next()
  }
})
export default router
