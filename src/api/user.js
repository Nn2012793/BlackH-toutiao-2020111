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
