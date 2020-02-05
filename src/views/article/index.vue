<template>
  <div class="container">
    <van-nav-bar fixed title="文章详情" left-arrow @click-left="$router.back()" />
    <div class="detail">
      <h3 class="title">{{ article.title }}</h3>
      <div class="author">
        <van-image round width="1rem" height="1rem" fit="fill" :src="article.aut_photo" />
        <div class="text">
          <p class="name">{{ article.aut_name }}</p>
          <!-- relTime过滤器 将时间转化成相对时间 -->
          <p class="time">{{ article.pubdate | relTime }}</p>
        </div>
        <!-- is_followed 为true表示已关注该用户 false表示未关注 -->
        <van-button @click="follow()" round size="small" type="info">{{ article.is_followed ? '已关注' : '+ 关注' }}</van-button>
      </div>
      <!-- v-html 可以渲染html标签 -->
      <div class="content" v-html="article.content">
      </div>
      <div class="zan">
       <!-- :class="{css名称: 布尔值}" -->
        <van-button round size="small" :class="{active: article.attitude === 1}" plain icon="like-o">点赞</van-button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <van-button round size="small" :class="{active: article.attitude === 0}" plain icon="delete">不喜欢</van-button>
      </div>
    </div>
    <my-comments></my-comments>
  </div>
</template>

<script>
import { getArticleInfo } from '@/api/articles'
import { followUser, unFollowUser } from '@/api/user'
import MyComments from './components/comment'
export default {
  name: 'articles',
  data () {
    return {
      article: {}
    }
  },
  methods: {
    async getArticle () {
      this.article = await getArticleInfo(this.$route.query.articleId)
    },
    async follow () {
      try {
        if (this.article.is_followed) {
        // 取消关注接口
          await unFollowUser(this.article.aut_id)
        } else {
        // 关注接口
          await followUser({ target: this.article.aut_id })
        }
        this.article.is_followed = !this.article.is_followed
        this.$notify({ type: 'success', message: '操作成功' })
      } catch (error) {
        this.$notify({ type: 'danger', message: '操作失败' })
      }
    }
  },
  components: {
    MyComments
  },
  created () {
    // 获取文章向详情数据
    this.getArticle()
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
.detail {
  padding: 46px 10px 44px;
  .title {
    font-size: 18px;
    line-height: 2;
  }
  .zan {
    text-align: center;
    padding: 10px 0;
    .active {
      border-color: red;
      color: red;
    }
  }
  .author {
    padding: 10px 0;
    display: flex;
    position: sticky;
    background-color: #fff;
    top: 46px;
    .text {
      flex: 1;
      padding-left: 10px;
      line-height: 1.5;
      .name {
        font-size: 14px;
        margin: 0;
      }
      .time {
        margin: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .content {
    padding: 20px 0;
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    /deep/ img {
      max-width: 100%;
      background: #f9f9f9;
    }
    /deep/ code {
      white-space: pre-wrap;
    }
  }
}
</style>
