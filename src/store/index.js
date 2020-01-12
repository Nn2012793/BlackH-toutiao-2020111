import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  //  放置数据 在初始化的时候直接把用户信息给我们的公共状态
  state: {
    // user是登陆时得到的返回结果---登录接口---data：{token，refresh_token}
    user: auth.getUser()
  },
  // 修改state数据  vuex的数据更新与缓存同步
  mutations: {
    updateUser (state, payload) {
      state.user = payload.user
      auth.setUser(payload.user) // 同步设置用户信息到本地存储中
    },
    clearUser (state) {
      state.user = {}
      auth.delUser() // 清空缓存里的用户信息
    }
  },
  // 异步处理数据，给mutations提交请求
  actions: {
  },
  modules: {
  }
})
