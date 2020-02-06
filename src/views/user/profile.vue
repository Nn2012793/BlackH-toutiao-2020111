<template>
  <div class="container">
    <van-nav-bar
    left-arrow
    @click-left="$router.back()"
    title="编辑资料"
    right-text="保存"
    @click-right="saveUser"
    ></van-nav-bar>
    <van-cell-group>
      <van-cell is-link title="头像" @click="showPhoto=true" center>
        <van-image
          slot="default"
          width="1.5rem"
          height="1.5rem"
          fit="cover"
          round
          :src="user.photo"
        />
      </van-cell>
      <van-cell is-link title="名称" @click="showName=true" :value="user.name" />
      <van-cell is-link title="性别" @click="showGender=true" :value="user.gender===0?'男':'女'" />
      <van-cell is-link title="生日" @click="showDate" :value="user.birthday" />
    </van-cell-group>
    <!-- 选择头像 -->
    <van-popup v-model="showPhoto" style="width:80%">
      <van-cell is-link title="本地相册选择图片" @click="openChangeFile" />
      <van-cell is-link title="拍照" />
    </van-popup>
    <!-- 用户名输入框 -->
    <van-popup round v-model="showName" :close-on-click-overlay="false" style="width:80%">
      <van-field
      type="textarea"
      rows="4"
      v-model.trim="user.name"
      required
      placeholder="请输入用户名"
      :error-message="nameMsg"
      />
      <van-button type="info" size="large" block @click="btnSave">确定</van-button>
    </van-popup>
    <!-- 选择性别 -->
    <van-action-sheet
    v-model="showGender"
    cancel-text="取消"
    :actions="action"
    @select="changeGender"
    >
    </van-action-sheet>
    <!-- 日期选择 -->
    <van-popup v-model="showBirthday" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="showBirthday=false"
        @confirm="confirmDate"
      />
    </van-popup>
    <input type="file" ref="myFile"  @change="upload()" style="display:none">
  </div>
</template>

<script>
import { getUserProfile, updateImg, saveUserInfo } from '@/api/user'
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
      currentDate: '',
      // 最大时间
      maxDate: new Date(),
      // 最小时间
      minDate: new Date('1970-01-01'),
      // 用户信息
      user: {
        name: '',
        // 0 男 1 女
        gender: 0,
        birthday: '2019-08-08'
      },
      action: [
        // gender也可以不写，直接this.user.gender = item.name === '男' ? 0 : 1判断
        { name: '男', color: 'skyblue', gender: 0 },
        { name: '女', color: 'pink', gender: 1 }
      ],
      nameMsg: '' // 显示用户名错误信息
    }
  },
  methods: {
    changeGender (item) {
      // this.user.gender = item.gender
      this.user.gender = item.name === '男' ? 0 : 1
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
    },
    btnSave () {
      if (this.user.name.length < 1 || this.user.name.length > 7) {
        // 用户名长度应在1-7内
        this.nameMsg = '用户名长度不得少于1或者多于7'
        return false
      }
      this.nameMsg = ''
      this.showName = false
    },
    showDate () {
      this.currentDate = new Date(this.user.birthday)
      this.showBirthday = true
    },
    openChangeFile () {
      // 上传本地文件
      // 触发文件上传组件的点击事件
      // 需要先获取文件上传的dom对象再触发
      this.$refs.myFile.click() // 触发文件上传组件的点击方法
    },
    async upload () {
      // let data = new FormData()
      // data.append('photo', this.$refs.myFile.files[0])
      // let result = await updateImg(data)
      // this.user.photo = result.photo
      // this.showPhoto = false
      // 当我们选择图片之后就会触发
      // 这里应该做什么
      // 应该上传头像 获取我们的选择的图片呢
      // 首先 应该把这个图片上传到服务器
      // 调用编辑头像的方法
      let data = new FormData()
      data.append('photo', this.$refs.myFile.files[0]) // 往formData中添加参数
      let result = await updateImg(data)
      // 应该 把地址 同步设置给 当前页面的数据
      this.user.photo = result.photo // 将上传成功的头像设置给当前头像
      this.showPhoto = false // 关闭弹层
    },
    // 保存方法  调用保存接口  这里是不需要传photo数据的
    // 1 我们通过别的方法 更新了头像
    // 2 photo base64字符串
    async saveUser () {
      try {
        // 解构user，并把photo单独设置为null，因为头像上面已经更改
        await saveUserInfo({ ...this.user, photo: null })
        this.$notice({ type: 'success', message: '保存成功' })
      } catch (error) {
        this.$notice({ type: 'danger', message: '保存失败' })
      }
    }
    // async saveUser () {
    //   try {
    //     await saveUserInfo({ ...this.user, photo: null })
    //     this.$notice({ type: 'success', message: '保存成功' })
    //   } catch (error) {
    //     this.$notice({ type: 'danger', message: '保存失败' })
    //   }
    // }
  },
  created () {
    this.getUserProfile()
  }
}
</script>

<style lang="less" scoped>
</style>
