<template>
  <div class="container">
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="小智同学"></van-nav-bar>
    <div class="chat-list" ref="myList">
      <div
      :class="{right:item.name !== 'xz', left:item.name === 'xz'}"
      class="chat-item"
      v-for="(item,index) in list"
      :key="index"
      >
         <!-- 小智同学的图片 -->
        <!-- 需要根据item中的name值 决定是否显示 左侧的图片 或者右侧的图片 -->
        <van-image v-if="item.name === 'xz'" fit="cover" round  :src="XZImg" />
        <div class="chat-pao">{{ item.msg }}</div>
        <!-- 右边再放置一个图片 -->
        <van-image  v-if="item.name !== 'xz'" fit="cover" round :src="photo" />
      </div>
    </div>
    <div class="reply-container van-hairline--top">
      <van-field v-model.trim="value" @keyup.enter="send()" placeholder="说点什么...">
        <van-loading v-if="loading" slot="button" type="spinner" size="16px"></van-loading>
        <span v-else @click="send()" slot="button" style="font-size:12px;color:#999">发送</span>
      </van-field>
    </div>
  </div>
</template>

<script>
import XZImg from '@/assets/images/d094e36668ba3c291f06b7c80e09b33.jpg'
import { mapState } from 'vuex'
import io from 'socket.io-client'
export default {
  name: 'chat',
  data () {
    return {
      value: '', // 绑定用户谈话内容
      loading: false,
      XZImg, // 小智头像
      list: [] // 存放聊天内容
    }
  },
  computed: {
    ...mapState(['photo', 'user'])
  },
  created () {
    this.socket = io('http://ttapi.research.itcast.cn', {
      query: {
        token: this.user.token
      }
    })
    this.socket.on('connect', () => {
      console.log('已经建立连接')
      this.list.push({ msg: '你来啦，七姐是居，吃了睡，睡了吃', name: 'xz' })
    })
    this.socket.on('message', (data) => {
      this.list.push({ ...data, name: 'xz' })
      this.scrollBottom()
    })
  },
  // 页面销毁之前的钩子函数
  beforeDestroy () {
    // 关闭连接
    this.socket.close()
  },
  methods: {
    send () {
      if (!this.value) return false // 如果输入框为空不继续往下走
      this.loading = true // 先进入休眠，再执行下一个阶段
      this.$sleep() // 默认时间500ms,()里面传参可以调整时间
      // emit发消息  on接收消息
      let obj = {
        msg: this.value, // 消息
        timestamp: Date.now() // 当前时间
      }
      this.socket.emit('message', obj) // 发送消息
      this.list.push(obj) // 聊天列表里追加渲染消息
      this.value = '' // 清空输入框
      this.loading = false // 停止休眠
      this.scrollBottom()
    },
    // 滚动到底部
    scrollBottom () {
      // 通过获取滚动条位置和设置滚动条距离来滚动
      // nextTick会在视图更新完毕后执行里面的代码
      this.$nextTick(() => {
        this.$refs.myList.scrollTop = this.$refs.myList.scrollHeight
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background:#fafafa;
  padding: 46px 0 50px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item{
      padding: 10px;
      .van-image{
        vertical-align: top;
        width: 40px;
        height: 40px;
      }
      .chat-pao{
        vertical-align: top;
        display: inline-block;
        min-width: 40px;
        max-width: 70%;
        min-height: 40px;
        line-height: 38px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        &::before{
          content: "";
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top:0.5px solid #c2d9ea;
          border-right:0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right{
  text-align: right;
  .chat-pao{
    margin-left: 0;
    margin-right: 15px;
    &::before{
      right: -6px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left{
  text-align: left;
  .chat-pao{
    margin-left: 15px;
    margin-right: 0;
    &::before{
      left: -5px;
      transform: rotate(-135deg);
    }
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}
</style>
