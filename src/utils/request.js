// 封装request模块
// 请求拦截器里token统一注入 响应数据统一处理返回  处理大数字 处理token失效
import axios from 'axios'
import JSONBigInt from 'json-bigint'
import store from '@/store'

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
}, function (error) {
  // 错误的时候 token失效
  return Promise.reject(error)
})

export default instance // 导出request工具
