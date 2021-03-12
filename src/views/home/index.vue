<template>
  <div class="home_container">
    <div class="top">
      <van-button round type="info" to="/search">文章搜索</van-button>
    </div>
    <van-tabs v-model="active" animated swipeable>
      <van-tab :title="item.name" v-for="item in Channels" :key="item.id">
        <ArticleItem :article="item"></ArticleItem>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="popupShow = true">
        <i class="iconfont icongengduo"></i>
      </div>
    </van-tabs>
    <van-popup
      v-model="popupShow"
      position="top"
      closeable
      round
      :style="{ height: '90%' }"
    >
      <channel-edit
        :myChannels="Channels"
        :active="active"
        :popupShow="popupShow"
        @addChannel="addChannel"
        @update-active="onUpdateActive"
        @delmyChannel="delmyChannel"
        @del-active="delActive"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { getUserChannels } from "@/api/user";
import { addUserChannel, delUserChannel } from "@/api/channelEdit";
import { getItem } from "@/utils/storage";
import ArticleItem from "./components/article-list";
import ChannelEdit from "./components/channel-edit";

export default {
  name: "HomeIndex",
  data() {
    return {
      active: 0,
      value: "",
      Channels: [],
      popupShow: false,
    };
  },
  components: {
    ArticleItem,
    ChannelEdit,
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    this.getChannels();
  },
  methods: {
    async getChannels() {
      try {
        if (this.user) {
          const { data } = await getUserChannels();
          this.Channels = data.data.channels;
        } else {
          if (getItem("channles")) {
            this.Channels = data.data.channels;
          } else {
            const { data } = await getUserChannels();
            this.Channels = data.data.channels;
          }
        }
      } catch (err) {
        this.$toast("获取数据异常，稍后尝试");
      }
    },
    onUpdateActive(index) {
      this.active = index;
      this.popupShow = false;
    },
    delActive(channel, index) {
      if (channel.id != 0) {
        this.Channels.splice(index, 1);
        this.active = index - 1;
      }
    },
    async addChannel(channel) {
      try {
        if (this.user) {
          console.log(channel.id);
          console.log(this.Channels.length);
          await addUserChannel({
            id: channel.id,
            seq: this.Channels.length,
          });
          this.Channels.push(channel);
        } else {
          setItem("channels", this.Channels);
        }
      } catch (err) {
        console.log(err);
        this.$toast.fail("添加失败");
      }
    },
    async delmyChannel(channel) {
      try {
        if (this.user) await delUserChannel(channel.id);
        else {
          setItem("channles", this.Channels);
        }
      } catch (err) {
        console.log(err);
        this.$toast.fail("移除失败");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.home_container {
  .top,
  .van-tabs__wrap {
    position: sticky;
    top: 0;
    z-index: 2;
  }
  .top {
    height: 100px;
    text-align: center;
    background-color: #3196fa;
  }
  /deep/ .van-button {
    width: 600px;
    height: 60px;
    margin-top: 20px;
    color: rgb(216, 218, 199);
  }
  /deep/ .van-tabs__wrap {
    position: sticky;
    top: 100px;
    z-index: 1;
  }
}
.placeholder {
  flex-shrink: 0;
  width: 66px;
  height: 82px;
}

.hamburger-btn {
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 82px;
  background-color: #fff;
  opacity: 0.902;
  i.toutiao {
    font-size: 33px;
  }
  &:before {
    content: "";
    position: absolute;
    left: 0;
    width: 1px;
    height: 100%;
    background-image: url(~@/assets/gradient-gray-line.png);
    background-size: contain;
  }
}
</style>