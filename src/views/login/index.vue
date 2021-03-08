<template>
  <div class="login-container">
    <van-nav-bar class="van-nav-bar" title="登录" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="手机号"
        placeholder="填写手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      >
        <i slot="left-icon" class="iconfont iconshouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="验证码"
        placeholder="填写验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <i slot="left-icon" class="iconfont iconyanzhengma"></i>
        <template #button>
          <van-button class="send_number" size="small" type="default" round
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button class="submit_login" block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from "@/api/user";

export default {
  name: "login",
  data() {
    return {
      user: {
        mobile: "",
        code: "",
      },
    };
  },
  methods: {
    async onSubmit() {
      const user = this.user;
      try {
        const res = await login(user);
        console.log("成功");
      } catch (err) {
        if (err.response.status === 400) {
          console.log("验证码错误");
        } else {
          console.log("服务器错误");
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  .iconfont {
    font-size: 37px;
    font-weight: 900;
    margin-right: 10px;
  }
  .van-form {
    background-color: #ffffff;
  }
  .send_number {
    background-color: #ededed;
  }
  .submit_login {
    background-color: #6db4fb;
    border-radius: 10px;
  }
}
body {
  background-color: #f5f7f9;
}
</style>