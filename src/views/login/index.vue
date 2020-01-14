<template>
  <div>
  <van-nav-bar
  title="登录"
  left-arrow
  @click-left="$router.back()"
  ></van-nav-bar>
  <van-cell-group>
  <van-field @blur="checkMobile" :error-message="errMSG.mobile" v-model="loginForm.mobile" label="手机号" placeholder="请输入手机号"></van-field>
  <van-field @blur="checkCode" :error-message="errMSG.code" v-model="loginForm.code" label="验证码" placeholder="请输入验证码">
    <van-button type="primary" slot="button" size="small">发送验证码</van-button>
  </van-field>
  </van-cell-group>
  <div class="btn-box">
  <van-button @click="login" type="info" round block size="small">登录</van-button>
  </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        mobile: '15035509773',
        code: '246810'
      },
      // 专门存放提示信息的
      errMSG: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    ...mapMutations(['updateUser']),
    checkMobile () {
      // 判断是否为空
      if (!this.loginForm.mobile) {
        this.errMSG.mobile = '手机号不能为空'
        return false
      }
      // 判断格式
      if (!/^1[3-9]\d{9}$/.test(this.loginForm.mobile)) {
        this.errMSG.mobile = '手机格式不对'
        return false
      }
      this.errMSG.mobile = ''
      return true
    },
    checkCode () {
      // 判断是否为空
      if (!this.loginForm.code) {
        this.errMSG.code = '验证码不能为空'
        return false
      }
      // 判断格式
      if (!/^\d{6}$/.test(this.loginForm.code)) {
        this.errMSG.code = '验证码格式不对'
        return false
      }
      this.errMSG.code = ''
      return true
    },
    async login () {
      if (this.checkMobile() && this.checkCode()) {
        // 如果这两个方法都通过了 还要去后端调用接口校验用户名密码
        // 提示消息表示登陆成功
        const data = await login(this.loginForm) // 获取更新后的data（token，refresh_token）
        this.updateUser({ user: data })
        this.$notice({ type: 'success', message: '登陆成功' })
        let { redirectURL } = this.$route.query
        this.$router.push(redirectURL || '/')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.btn-box {
  padding: 20px
}
</style>
