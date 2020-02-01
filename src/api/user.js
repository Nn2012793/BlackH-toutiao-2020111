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
