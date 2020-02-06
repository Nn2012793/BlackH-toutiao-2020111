import request from '@/utils/request'
// 登录接口
// data 中包括 mobile 和 code
export const login = (data) => {
  return request({
    url: '/authorizations',
    method: 'post',
    data
  })
}
/** *关注用户***/
export function followUser (data) {
  return request({
    url: '/user/followings',
    method: 'post',
    data
  })
}
/** *取消关注***/
export function unFollowUser (target) {
  return request({
    method: 'delete',
    url: `/user/followings/${target}`
  })
}
/** **获取用户个人信息*****/
export function getUserInfo () {
  return request({
    url: '/user'
  })
}
/**
 * 获取个人中心编辑用户资料信息
 */
export function getUserProfile () {
  return request({
    url: 'user/profile'
  })
}
/****
 *封装一个编辑用户头像的API
 * ****/
export function updateImg (data) {
  return request({
    url: '/user/photo', // 编辑头像的地址
    method: 'patch', // 设置头像的类型
    data
  })
}
/** 封装一个 保存用户的方法***/
export function saveUserInfo (data) {
  return request({
    url: '/user/profile', // 编辑资料的地址
    data,
    method: 'patch'
  })
}
