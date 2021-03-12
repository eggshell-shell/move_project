<template>
  <div class="login-container">
    <van-nav-bar class="van-nav-bar" title="登录">
      <van-icon
        slot="left"
        name="arrow-left"
        @click="$router.back()"
      ></van-icon>
    </van-nav-bar>
    <van-form ref="loginFrom" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        type="number"
        maxlength="11"
        name="mobile"
        placeholder="填写手机号"
        :rules="userFormRules.mobile"
      >
        <i slot="left-icon" class="iconfont iconshouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        type="number"
        maxlength="6"
        placeholder="填写验证码"
        :rules="userFormRules.code"
      >
        <i slot="left-icon" class="iconfont iconyanzhengma"></i>
        <template #button>
          <van-button
            v-if="flag"
            class="send_number"
            size="small"
            type="default"
            round
            @click="onSendSms(user.mobile)"
            native-type="button"
            >发送验证码</van-button
          >
          <van-count-down
            v-else
            millisecond
            time="60000"
            format="ss:SS 秒后"
            @finish="flag = true"
          />
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
import { login, sendSms } from "@/api/user";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

export default {
  name: "login",
  data() {
    return {
      user: {
        mobile: "18940975135",
        code: "246810",
      },
      userFormRules: {
        mobile: [
          { required: true, message: "请填写手机号" },
          { pattern: /^[1][3|5|7|8]\d{9}$/, message: "手机号码格式错误" },
        ],
        code: [
          { required: true, message: "请填写验证码" },
          { pattern: /^\d{6}$/, message: "验证码格式错误" },
        ],
      },
      flag: true,
    };
  },
  methods: {
    async onSubmit() {
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true,
        // 持续时间
        duration: 0,
      });
      // const user = this.user;
      try {
        const { data } = await login(this.user);
        this.$toast.success("登陆成功");
        this.$store.commit("setUser", data.data);
        this.$router.back();
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail("验证码错误");
        } else {
          this.$toast.fail("服务器出错");
        }
      }
    },
    async onSendSms(mobile) {
      try {
        await this.$refs.loginFrom.validate("mobile");
        this.$toast.success("手机号验证通过");
        this.flag = false;
        try {
          const res = await sendSms(mobile);
        } catch (err) {
          console.log(err);
          if (err.response.status === 429)
            return this.$toast.fail("过于频繁，稍后尝试");
        }
      } catch (err) {
        this.$toast.fail("手机号验证出错");
        return;
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
  .van-icon {
    font-size: 40px;
    font-weight: 900;
    color: #fff;
  }
}
body {
  background-color: #f5f7f9;
}
</style>