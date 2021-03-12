<template>
  <div class="home-container">
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item to="/">
        <i slot="icon" class="iconfont iconshouye"></i
        ><span>首页</span></van-tabbar-item
      >
      <van-tabbar-item to="/questions"
        ><i slot="icon" class="iconfont iconwenda"></i
        ><span>问答</span></van-tabbar-item
      >
      <van-tabbar-item to="/video"
        ><i slot="icon" class="iconfont iconshipin"></i
        ><span>视频</span></van-tabbar-item
      >
      <van-tabbar-item to="/my"
        ><i slot="icon" class="iconfont iconwode"></i>
        <div>
          <span v-if="user">我的</span><span v-else>未登录</span>
        </div></van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Home_down_Index",
  data() {
    return {};
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style lang="less" scoped>
.home-container {
  .van-tabbar {
    height: 150px;
    background-color: rgba(0, 0, 0, 0.3);
    i {
      font-size: 50px;
    }
    span {
      font-size: 30px;
    }
  }
}
</style>