// 专门处理频道请求
import request from '@/utils/request'
export function getMyChannels () {
  return request({
    url: 'user/channels'
  })
}
