// 封装request模块
// 请求拦截器里token统一注入 响应数据统一处理返回  处理大数字 处理token失效
import axios from 'axios'
import JSONBigInt from 'json-bigint'
import store from '@/store'
import router from '@/router'

// 创建一个新的插件实例
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/', // 设置一个常量的基础地址
  transformResponse: [function (data) {
    // data是一个字符串 把data转化成对象并返回，默认用JSON.parse,这里我们用json-bigint
    try {
      return JSONBigInt.parse(data)
    } catch (error) {
      return data
    }
  }] // 处理后台返回数据 JSONBigInt处理大数值
}) // 创建一个axios的复制品

// 拦截器

// 请求拦截器 发送请求时---请求拦截器---服务器

instance.interceptors.request.use(function (config) {
  // config配置信息 返回配置前在config里面塞token---store.state.user.token
  if (store.state.user.token) {
    config.headers['Authorization'] = `Bearer ${store.state.user.token}`
  }
  return config
}, error => Promise.reject(error))

// 响应拦截器 服务器响应---相应拦截器---then await

instance.interceptors.response.use(function (response) {
  // 响应数据 返回得到的响应数据 axios自动给数据包裹一层data 第二个data是返回结果包的data
  try {
    return response.data.data
  } catch (error) {
    return response.data
  }
}, async function (error) {
  // 错误的时候 token失效
  // 处理token失效问题
  // 判断失效----error包含三个参数：config，reques，response
  if (error.response && error.response.status === 401) {
    // refresh_token也没有，就跳转登陆页面---登陆后放回之前的页面 -- 记录当前页面
    // 重新登陆页面后---读取地址
    // 获取当前页面地址 router.currentRoute.path
    // 定义在顶端，随时调用let toPath = { path: '/login', query: { redirectURL: router.currentRoute.path } }
    let toPath = { path: '/login', query: { redirectURL: router.currentRoute.path } }
    // 状态码401表示token失效  先判断是否有refresh_token
    if (store.state.user.refresh_token) {
      // 应该获取一个新的token 不能用instance 因为instance会再次进入拦截器 会再次获取失效的token
      // 所以应该用默认的axios
      try {
        let result = await axios({
          method: 'put',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${store.state.user.refresh_token}`
          }
        })
        // 新的token就是 result.data.data.token
        store.commit('updateUser', {
          user: {
          // 更新了vuex数据，也更新了缓存
            token: result.data.data.token,
            refresh_token: store.state.user.refresh_token
          }
        })
        // 再次发送刚才的错误请求 并返回promise
        return instance(error.config)
      } catch (error) {
        // refresh_token也不能用的时候，就要先清空vuex与缓存的token信息
        store.commit('clearUser')
        // 跳转登陆页面并在登陆后返回之前页面
        router.push(toPath)
      }
    } else {
      // refresh_token也没有，就跳转登陆页面---登陆后放回之前的页面 -- 记录当前页面
      // 重新登陆页面后---读取地址
      // 获取当前页面地址 router.currentRoute.path
      // 定义在顶端，随时调用let toPath = { path: '/login', query: { redirectURL: router.currentRoute.path } }
      router.push(toPath)
    }
  }
  return Promise.reject(error)
})

export default instance // 导出request工具
