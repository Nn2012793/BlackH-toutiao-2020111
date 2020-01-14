<template>
  <div class="scroll-wrapper">
    <van-pull-refresh v-model="downLoading" @refresh="onRefresh" :success-text="refreshSucessText">
      <!-- //防止van-list组件，实现上拉加载 -->
      <van-list v-model="upLoading" :finished="finished" finished-text="真的没有了" @load="onLoad">
        <van-cell v-for="article in articles" :key="article.art_id.toString()">
          <div class="article_item">
            <h3 class="van-ellipsis">{{article.title}}</h3>
            <!-- 三图模式 -->
            <div class="img_box" v-if="article.cover.type === 3">
              <van-image class="w33" fit="cover" :src="article.cover.images[0]" />
              <van-image class="w33" fit="cover" :src="article.cover.images[1]" />
              <van-image class="w33" fit="cover" :src="article.cover.images[2]" />
            </div>
            <!-- 单图模式 -->
            <div class="img_box" v-if="article.cover.type === 1">
              <van-image class="w100" fit="cover" :src="article.cover.images[0]" />
            </div>
            <div class="info_box">
              <span>{{article.aut_name}}</span>
              <span>{{article.comm_count}}</span>
              <span>{{article.pubdate}}</span>
              <span class="close">
                <van-icon name="cross"></van-icon>
              </span>
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/articles'
export default {
  name: 'article-list',
  props: {
    channel_id: {
      type: Number, // 指定要传的props类型，可以对props传入值进行一个校验
      required: true, // 要求props必传，否则报错
      default: null // 给props一个默认值
    }
  },
  data () {
    return {
      upLoading: false, // 上拉加载状态，为true加载
      finished: false, // 为true表示全部加载
      articles: [], // 空数组接受上拉加载数据
      downLoading: false, // 默认不开启下拉刷新
      refreshSucessText: '',
      timestamp: null // 定义一个时间戳，告诉服务器需求哪个时间的数据
    }
  },
  methods: {
    //  上拉加载方法
    async onLoad () {
    //   setTimeout(() => {
    //     if (this.articles.length < 50) {
    //       // 创建空数组
    //       let arr = Array.from(
    //         Array(10),
    //         (value, index) => this.articles.length + index + 1
    //       )
    //       // 原数组尾部追加新数组
    //       this.articles.push(...arr)
    //       // 修改upLoading值
    //       this.upLoading = false
    //     } else {
    //       this.finished = true
    //     }
    //   }, 1000)
      const data = await getArticles({
        channel_id: this.channel_id,
        timestamp: this.timestamp || Date.now()
      })
      // console.log(data)
      this.articles.push(...data.results) // 尾部追加获取的新数组
      this.upLoading = false // 关掉加载状态
      // 判断历史时间戳是否存在
      if (data.pre_timestamp) {
        // 1.有历史时间戳--继续往下看
        this.timestamp = data.pre_timestamp
      } else {
        // 2.无历史时间戳---finished为true
        this.finished = true
      }
    },
    // 下拉刷新方法
    onRefresh () {
      setTimeout(() => {
        let arr = Array.from(Array(10), (value, index) => '追加' + (index + 1))
        // 头部追加数据
        this.articles.unshift(...arr)
        this.downLoading = false // 关闭下拉刷新状态
        this.refreshSucessText = `更新${arr.length}条数据`
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
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
      width: 100%;
      height: 180px;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span {
      padding-right: 10px;
      &.close {
        border: 1px solid #ddd;
        border-radius: 2px;
        line-height: 15px;
        height: 12px;
        width: 16px;
        text-align: center;
        padding-right: 0;
        font-size: 8px;
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
</style>
