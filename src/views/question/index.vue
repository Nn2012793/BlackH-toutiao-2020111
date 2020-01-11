<template>
  <div class="container">
    <!-- //  avatar是头像占位符  title是显示标题占位 skeleton是骨架 -->
     <van-skeleton avatar title :row="3"></van-skeleton>
     <div class="split"></div>
     <van-skeleton avatar title :row="3"></van-skeleton>
     <div class="split"></div>
     <van-skeleton avatar title :row="3"></van-skeleton>
     <div class="split"></div>
     <van-skeleton avatar title :row="3"></van-skeleton>
  </div>
</template>

<script>
export default {
  name: 'question'
}
</script>

<style lang="less" scoped>

</style>
