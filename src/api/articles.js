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
export function dislikeArticle (data) {
  return request({
    url: '/article/dislikes',
    method: 'post',
    data
  })
}
