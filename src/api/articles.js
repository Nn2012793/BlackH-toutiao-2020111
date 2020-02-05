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
// 联想搜索接口
export function suggestion (params) {
  return request({
    url: '/suggestion',
    params
  })
}
/****
 * 获取文章搜索的结果
 * params是get参数
 * data是body参数
 * ***/
export function searchArticle (params) {
  return request({
    url: '/search',
    params
  })
}
/***
 *
 *获取文章详情
 * *****/
export function getArticleInfo (id) {
  return request({
    url: `/articles/${id}`
  })
}
/** 获取评论**/
export function getComments (params) {
  return request({
    url: '/comments',
    params
  })
}
/*****
 *
 * 封装评论或者回复评论的方法
 * ****/
export function commentOrReply (data) {
  return request({
    url: '/comments', // 请求地址
    method: 'post', // 请求类型不同
    data
  })
}
