<template>
  <div class="container">
    <van-tabs swipeable v-model="activeIndex" @change="changeTap">
      <van-tab v-for="item in channels" :title="item.name" :key="item.id">
        <!-- // 这里的div设置了滚动条 目的是给后面做阅读记忆 留下伏笔 -->
        <!-- // 阅读记忆---文章看到一半的时候，滑倒了其他区域或者页面，回来时，文章还保持在原位置 -->
        <article-list :channel_id="item.id" @showMoreAction="openMoreAction"></article-list>
      </van-tab>
    </van-tabs>
    <span class="bar_btn" @click="showChannelEdit=true">
      <van-icon name="wap-nav"></van-icon>
    </span>
    <van-popup :style="{ width: '80%' }" v-model="showMoreAction">
      <more-action @report="dislikeOrRport('report',$event)" @dislike="dislikeOrRport('dislike')"></more-action>
    </van-popup>
    <van-action-sheet :round="false" title="编辑频道" v-model="showChannelEdit">
      <channel-edit
      :activeIndex="activeIndex"
      :channels="channels"
      @selectChannel="selectChannel"
      @delChannel="delChannel"
      @addChannel="addChannel"
      ></channel-edit>
 </van-action-sheet>
  </div>
</template>

<script>
import ArticleList from './components/article-list'
import MoreAction from './components/more-action'
import ChannelEdit from './components/channel-edit'
import { getMyChannels, delChannel, addChannel } from '@/api/channels'
import { dislikeArticle, reportArticle } from '@/api/articles'
import eventBus from '@/utils/eventBus'
export default {
  name: 'articles',
  data () {
    return {
      activeIndex: 0,
      channels: [],
      showMoreAction: false, // 不感兴趣弹窗显示状态
      articleID: null,
      showChannelEdit: false // 编辑弹窗状态
    }
  },
  components: {
    ArticleList,
    MoreAction,
    ChannelEdit
  },
  methods: {
    async getMyChannels () {
      let data = await getMyChannels()
      this.channels = data.channels
    },
    openMoreAction (artId) {
      this.showMoreAction = true
      this.articleID = artId
    },
    async dislikeOrRport (params, type) {
      try {
        if (this.articleID) {
          if (params === 'dislike') {
            await dislikeArticle({ target: this.articleID })
          } else {
            await reportArticle({ target: this.articleID, type })
          }
          eventBus.$emit('delArticle', this.articleID, this.channels[this.activeIndex].id)
          this.$notice({ type: 'success', message: '操作成功' })
          this.showMoreAction = false
        }
      } catch (error) {
        this.$notice({ type: 'danger', message: '操作失败' })
        this.showMoreAction = false
      }
    },
    selectChannel (id) {
      let index = this.channels.findIndex(item => item.id === id)
      this.activeIndex = index
      this.showChannelEdit = false
    },
    async delChannel (id) {
      try {
        await delChannel(id)
        let index = this.channels.findIndex(item => item.id === id)
        if (index <= this.activeIndex) {
          this.activeIndex -= 1
        }
        if (index > -1) {
          //  如果大于-1
          this.channels.splice(index, 1) // 移除当前频道
        }
      } catch (error) {
        this.$notice({ type: 'danger', message: '删除频道失败' })
      }
    },
    async addChannel (channel) {
      await addChannel(channel)
      this.channels.push(channel)
    },
    changeTap () {
      eventBus.$emit('changeTap', this.channels[this.activeIndex].id)
    }
  },
  created () {
    this.getMyChannels() // 获取频道
  }
}
</script>

<style lang="less" scoped>
.van-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  /deep/ .van-tabs__wrap {
    height: 36px;
    padding-right: 36px;
    .van-tab {
      line-height: 36px;
    }
    .van-tabs__line {
      background-color: #3296fa;
      height: 2px;
    }
  }
  /deep/ .van-tabs__content {
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane {
    height: 100%;
    .scroll-wrapper {
      height: 100%;
      overflow-y: auto;
    }
  }
}
.bar_btn {
  width: 36px;
  height: 35px;
  position: absolute;
  top: 0;
  right: 0;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    box-shadow: 0 0 10px #999;
    transform: scale(1, 0.6);
  }
  .van-icon-wap-nav {
    width: 100%;
    height: 100%;
    background: #fff;
    text-align: center;
    line-height: 35px;
    position: relative;
    z-index: 1000;
    &::before {
      font-size: 20px;
    }
  }
}
.van-action-sheet {
  max-height: 100%;
  height: 100%;
  .van-action-sheet__header {
    background: #3296fa;
    color: #fff;
    .van-icon-close {
      color: #fff;
    }
  }
}
</style>
