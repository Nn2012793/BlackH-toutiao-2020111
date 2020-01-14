<template>
  <div class="scroll-wrapper">
    <!-- //防止van-list组件，实现上拉加载 -->
    <van-list v-model="upLoading" :finished="finished" finished-text="真的没有了" @load="onLoad">
        <van-cell v-for="article in articles" :key="article" :title="article"></van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'article-list',
  data () {
    return {
      upLoading: false,
      finished: false,
      articles: [] // 空数组接受上拉加载数据
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
    }
  }
}
</script>

<style lang="less" scoped>
</style>
