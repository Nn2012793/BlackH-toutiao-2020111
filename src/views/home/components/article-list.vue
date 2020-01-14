<template>
  <div class="scroll-wrapper">
    <van-pull-refresh v-model="downLoading" @refresh="onRefresh" :success-text="refreshSucessText">
    <!-- //防止van-list组件，实现上拉加载 -->
    <van-list v-model="upLoading" :finished="finished" finished-text="真的没有了" @load="onLoad">
        <van-cell v-for="article in articles" :key="article" :title="article"></van-cell>
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
          let arr = Array.from(Array(10), (value, index) => this.articles.length + index + 1)
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
</style>
