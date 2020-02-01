<template>
  <div class='container'>
     <van-nav-bar fixed title="搜索结果" left-arrow @click-left="$router.back()" />

      <van-list v-model="upLoading" :finished="finished" @load="onLoad">
        <van-cell-group>
          <van-cell :to="`/article?articleId=${item.art_id.toString()}`" v-for="item in articles" :key="item.aut_id.toString()">
            <div class="article_item">
              <h3 class="van-ellipsis">{{item.title}}</h3>
              <div class="img_box" v-if="item.cover.type===3">
                <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[0]" />
                <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[1]" />
                <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[2]" />
              </div>
              <div class="img_box" v-if="item.cover.type===1">
                <van-image lazy-load class="w100" fit="cover" :src="item.cover.images[0]" />
              </div>
              <div class="info_box">
                <span>{{item.aut_name}}</span>
                <span>{{item.comm_count}}</span>
                <span>{{item.pucdate | relTime}}</span>
              </div>
            </div>
          </van-cell>
        </van-cell-group>
      </van-list>
  </div>
</template>

<script>
import { searchArticle } from '@/api/articles'
export default {
  name: 'searchresult',
  data () {
    return {
      upLoading: false,
      finished: false,
      articles: [],
      page: {
        page: 1,
        per_page: 10
      }

    }
  },
  methods: {
    async onLoad () {
      let { q } = this.$route.query
      const data = await searchArticle({ ...this.page, q })
      // console.log(data)
      // 将data里面的results追加给article数组，进而渲染页面
      this.articles.push(...data.results)
      // 关闭上拉加载状态
      this.upLoading = false
      if (data.results) {
        // 如果仍有内容可以加加载，把页数加1
        this.page.page++
      } else {
        // 否则提示无更多消息
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding-top: 46px;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
.article_item {
  h3 {
    font-weight: normal;
    line-height: 2;
  }
  .img_box {
    display: flex;
    justify-content: space-between;
    .w33 {
      width: 33%;
      height: 90px;
    }
    .w100 {
      height: 180px;
      width: 100%;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    span {
      padding-right: 10px;
    }
  }
}
</style>
