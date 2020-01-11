// 专门处理用户信息的存储，删除以及获取，相关信息放置在localstorage
const USER_TOKEN = 'hm-toutiao-lnh-91' // 定义专门用来存储用户信息的key
// 设置用户信息
export function setUser (user) {
  localStorage.setItem(USER_TOKEN, JSON.Stringify(user))
}
// 读取用户信息
export function getUser () {
  return JSON.parse(localStorage.getItem(USER_TOKEN) || '{}')
}
// 删除用户信息
export function delUser () {
  localStorage.removeItem(USER_TOKEN)
}
