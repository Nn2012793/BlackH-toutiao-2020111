<template>
  <div class="scroll-wrapper">
    <van-pull-refresh v-model="downLoading" @refresh="onRefresh" :success-text="refreshSucessText">
      <!-- //防止van-list组件，实现上拉加载 -->
      <van-list v-model="upLoading" :finished="finished" finished-text="真的没有了" @load="onLoad">
        <van-cell v-for="article in articles" :key="article">
          <div class="article_item">
            <h3 class="van-ellipsis">PullRefresh下拉刷新PullRefresh下拉刷新下拉刷新下拉刷新</h3>
            <!-- 三图模式 -->
            <div class="img_box">
              <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
              <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
              <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
            </div>
            <!-- 单图模式 -->
            <div class="img_box">
              <van-image class="w100" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
            </div>
            <div class="info_box">
              <span>你像一阵风</span>
              <span>8评论</span>
              <span>10分钟前</span>
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
export default {
  name: 'article-list',
  data () {
    return {
      upLoading: false, // 上拉加载状态，为true加载
      finished: false, // 为true表示全部加载
      articles: [], // 空数组接受上拉加载数据
      downLoading: false, // 默认不开启下拉刷新
      refreshSucessText: '更新成功'
    }
  },
  methods: {
    //  上拉加载方法
    onLoad () {
      setTimeout(() => {
        if (this.articles.length < 50) {
          // 创建空数组
          let arr = Array.from(
            Array(10),
            (value, index) => this.articles.length + index + 1
          )
          // 原数组尾部追加新数组
          this.articles.push(...arr)
          // 修改upLoading值
          this.upLoading = false
        } else {
          this.finished = true
        }
      }, 1000)
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
