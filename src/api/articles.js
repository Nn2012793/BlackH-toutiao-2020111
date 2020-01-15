import request from '@/utils/request'
export function getArticles (params) {
  // 获取推荐文章数据
  return request({
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
    // axios里 query参数放在params里 body参数在data里
    params: {
      with_top: 1,
      ...params
    }
  })
}
// 不感兴趣接口
export function dislikeArticle (data) {
  return request({
    url: '/article/dislikes',
    method: 'post',
    data
  })
}
// 举报文章接口
export function reportArticle (data) {
  return request({
    url: '/article/reports',
    data,
    method: 'post'
  })
}
