<template>
  <div class="container">
    <!-- 搜索组件一级路由   返回上一个页面-->
    <van-nav-bar left-arrow title="搜索中心" @click-left="$router.back()"></van-nav-bar>
    <!-- 导航 -->
    <van-search
    v-model.trim="q"
    placeholder="请输入搜索关键词"
    shape="round"
    @keydown.enter="onSearch" />
    <van-cell-group class="suggest-box" v-if="q">
      <van-cell icon="search">
        <span>java</span>
      </van-cell>
    </van-cell-group>
    <div class="history-box" v-else-if="historyList.length">
      <div class="head">
        <span>历史记录</span>
        <van-icon @click="delAllHistory" name="delete"></van-icon>
      </div>
      <van-cell-group>
         <van-cell @click="toSearchResult(item)" v-for="(item,index) in historyList" :key="index">
          <a class="word_btn">{{ item }}</a>
          <van-icon  @click.stop="delHistory(index)" class="close_btn" slot="right-icon" name="cross" />
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
const key = 'hm-91-toutiao-history' // 定义一个存贮和获取搜索历史缓存的key
export default {
  name: 'search',
  data () {
    return {
      q: '', // 获取搜索框输入的内容
      historyList: [] // 首先定义一个历史记录数据
    }
  },
  created () {
    // 初始化的时候获取缓存的历史记录，没有的话返回一个空数组
    this.historyList = JSON.parse(localStorage.getItem(key) || '[]')
  },
  methods: {
    delHistory (index) {
      this.historyList.splice(index, 1) // 删除对应的历史记录
      localStorage.setItem(key, JSON.stringify(this.historyList)) // 重新写入缓存
    },
    delAllHistory () {
      this.historyList = []
      localStorage.setItem(key, '[]')
    },
    toSearchResult (text) {
      // 跳转到搜索结果之前 应该把当前的搜索关键字 写入到历史记录
      // 搜索内容为空直接终止
      if (!this.q) return
      // 如果q不为空
      // 生成一个set变量  set对象自动去重
      let obj = new Set(this.historyList)
      // add方法可以把新的搜索内容加入set对象里，并自动避免重复
      obj.add(this.q)
      // 将set转回数组
      this.historyList = Array.from(obj)
      // 重新写入缓存
      localStorage.setItem(key, JSON.stringify(this.historyList))
      //  也应该去搜索结果页面 而且 也要携带参数
      this.$router.push({ path: '/search/result', query: { q: text } })
    },
    onSearch () {
      // 跳转到搜索结果之前 应该把当前的搜索关键字 写入到历史记录
      // 搜索内容为空直接终止
      if (!this.q) return
      // 如果q不为空
      // 生成一个set变量  set对象自动去重
      let obj = new Set(this.historyList)
      // add方法可以把新的搜索内容加入set对象里，并自动避免重复
      obj.add(this.q)
      // 将set转回数组
      this.historyList = Array.from(obj)
      // 重新写入缓存
      localStorage.setItem(key, JSON.stringify(this.historyList))
      //  也应该去搜索结果页面 而且 也要携带参数
      // 直接跳转到搜索结果界面
      this.$router.push({ path: '/search/result', query: { q: this.q } })
    }
  }
}
</script>

<style lang='less' scoped>
.history-box {
  padding: 0 20px;
  .head{
    line-height: 36px;
    color: #999;
    .van-icon{
      font-size: 16px;
      float: right;
      margin-top: 10px;;
    }
  }
  .van-cell{
    padding: 10px 0;
  }
  .word_btn{
    color:#3296fa;
  }
  .close_btn{
    margin-top:5px;
    color: #999;
  }
}
.suggest-box{
  /deep/ .van-cell{
    padding: 10px 20px;
    color: #999;
    p{
      span{
        color: red;
      }
    }
  }
}
</style>
