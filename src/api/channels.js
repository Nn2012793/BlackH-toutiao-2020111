// 专门处理频道请求
import request from '@/utils/request'
import store from '@/store'
// 本地缓存 需要key
const CACHE_CHANNEL_T = 'hm-91-toutiao-t' // 游客缓存的key
const CACHE_CHANNEL_U = 'hm-91-toutiao-u' // 登录用户的key
// 获取频道
export function getMyChannels () {
  // 返回一个Promise  axios默认就是get类型
  // 首先我们应该 先从缓存中读取 看看缓存中没没有 如果缓存中有的话 用缓存的数据 如果缓存中没有 才去查询
  // return request({
  //   url: '/user/channels'
  // })
  return new Promise(async function (resolve, reject) {
    // 若已经登陆则key为登陆用户的key，未登录则为游客的key
    let key = store.state.user.token ? CACHE_CHANNEL_U : CACHE_CHANNEL_T
    // 通过key获取缓存
    let str = localStorage.getItem(key)
    // 如果有str不为空，说明有缓存，通过resolve传给下一个promise对象
    if (str) {
      resolve({ channels: JSON.parse(str) })
    } else {
      // 如果有str为空，说明没缓存，通过接口获取频道信息
      const data = await request({ url: '/user/channels' })
      // 将获取的信息存在缓存中
      localStorage.setItem(key, JSON.stringify(data.channels))
      // resolve传给下一个promise对象
      resolve(data)
    }
  })
}
/***
 * 获取所有频道
 * ***/
export function getAllChannels () {
  return request({
    url: '/channels'
  })
}
// 删除频道
export function delChannel (id) {
  return new Promise(function (resolve, reject) {
    // 根据用户状态获取key
    let key = store.state.user.token ? CACHE_CHANNEL_U : CACHE_CHANNEL_T
    // 获取缓存的数据
    let channels = JSON.parse(localStorage.getItem(key))
    // 查询要删除的频道的索引
    let index = channels.findIndex(item => item.id === id)
    // 如果查询到了对应的频道
    if (index > -1) {
      // 删除对应的频道
      channels.splice(index, 1)
      // 更新缓存的数据
      localStorage.setItem(key, JSON.stringify(channels))
      resolve()
    } else {
      reject(new Error('找不到对应的频道'))
    }
  })
}
// 添加频道
export function addChannel (channel) {
  return new Promise(function (resolve, reject) {
    // 根据用户状态获取key
    let key = store.state.user.token ? CACHE_CHANNEL_U : CACHE_CHANNEL_T
    // 获取缓存的数据
    let channels = JSON.parse(localStorage.getItem(key))
    // 在频道数组中添加新的频道
    channels.push(channel)
    // 更新缓存
    localStorage.setItem(key, JSON.stringify(channels))
    // 释放成功的数据给下一个promise
    resolve()
  })
}
