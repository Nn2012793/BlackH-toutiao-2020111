<template>
  <div class="container">
  <van-nav-bar
  title="个人设置"
  left-arrow
  @click-left="$router.back()"
  right-text="保存"
  ></van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'profile'
}
</script>

<style lang="less" scoped>
</style>
