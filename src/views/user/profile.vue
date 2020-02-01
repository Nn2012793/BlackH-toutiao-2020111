<template>
  <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="编辑资料" right-text="保存"></van-nav-bar>
    <van-cell-group>
      <van-cell is-link title="头像" @click="showPhoto=true" center>
        <van-image
          slot="default"
          width="1.5rem"
          height="1.5rem"
          fit="cover"
          round
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </van-cell>
      <van-cell is-link title="名称" @click="showName=true" :value="user.name" />
      <van-cell is-link title="性别" @click="showGender=true" :value="user.gender===0?'男':'女'" />
      <van-cell is-link title="生日" @click="showBirthday=true" :value="user.birthday" />
    </van-cell-group>
    <!-- 选择头像 -->
    <van-popup v-model="showPhoto" position="bottom">
      <van-cell is-link title="本地相册选择图片" />
      <van-cell is-link title="拍照" />
    </van-popup>
    <!-- 输入框 -->
    <van-popup v-model="showName" position="bottom">
      <van-field v-model="user.name" required placeholder="请输入用户名" />
    </van-popup>
    <!-- 选择性别 -->
    <van-popup v-model="showGender" position="bottom">
      <van-cell is-link title="男" @click="changeGender(0)" />
      <van-cell is-link title="女" @click="changeGender(1)" />
    </van-popup>
    <!-- 日期选择 -->
    <van-popup v-model="showBirthday" position="bottom">
      <van-datetime-picker
        v-model="nowDate"
        type="date"
        :min-date="minDate"
        @cancel="showBirthday=false"
        @confirm="confirmDate"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'profile',
  data () {
    return {
      showPhoto: false,
      showName: false,
      showGender: false,
      showBirthday: false,
      // 当前时间
      nowDate: new Date(),
      // 最小时间
      minDate: new Date('1970-01-01'),
      // 用户信息
      user: {
        name: '',
        // 0 男 1 女
        gender: 0,
        birthday: '2019-08-08'
      }
    }
  },
  methods: {
    changeGender (type) {
      this.user.gender = type
      this.showGender = false
    },
    confirmDate (value) {
      // value 的格式  日期对象
      // birthday 的格式  字符串
      // value转换格式后赋值给birthday
      this.user.birthday = dayjs(value).format('YYYY-MM-DD')
      // 关闭弹窗
      this.showBirthday = false
    },
    async getUserProfile () {
      const data = await getUserProfile()
      this.user = data
      this.photo = data.photo
    }
  }
}
</script>

<style lang="less" scoped>
</style>
