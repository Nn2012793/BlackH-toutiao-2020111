import Vue from 'vue'
import App from './App.vue'
import router from '@/permission' // 经过权限处理的router
import store from './store'
import Vant, { Lazyload } from 'vant'
import plugin from '@/utils/plugin'
import 'vant/lib/index.less'
import '@/styles/index.less'
import 'amfe-flexible'

Vue.use(Vant)
Vue.use(plugin)
Vue.use(Lazyload)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
