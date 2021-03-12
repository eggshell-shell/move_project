<template>
  <div class="channel-edit" :clickable="clickable">
    <van-cell title="我的频道">
      <van-button
        size="mini"
        round
        type="danger"
        plain
        @click="iconShow = !iconShow"
        >{{ iconShow ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10" :clickable="clickable">
      <van-grid-item
        v-for="(item, index) in myChannels"
        :key="index"
        @click="onMyChannelClick(item, index)"
      >
        <div class="text-wrap">
          <span
            slot="text"
            class="text"
            :class="{ activeCss: index == active }"
            >{{ item.name }}</span
          >
          <van-icon
            name="clear"
            v-show="iconShow && item.name != '推荐'"
            @click="delmyChannels(item)"
          />
        </div>
      </van-grid-item>
    </van-grid>
    <van-cell title="推荐频道"></van-cell>
    <van-grid :gutter="10" :clickable="clickable">
      <van-grid-item v-for="(item, index) in lessChannels" :key="index">
        <div class="text-wrap">
          <span slot="text">
            <van-icon
              name="plus"
              v-show="iconShow"
              @click="addChannels(item)"
            />
            {{ item.name }}</span
          >
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from "@/api/channelEdit";
import { mapState } from "@/store";

export default {
  name: "ChannelEdit",
  data() {
    return {
      clickable: true,
      iconShow: false,
      allChannels: [],
    };
  },
  props: {
    myChannels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
    popupShow: {
      type: Boolean,
      required: true,
    },
  },
  created() {
    this.getChannels();
  },
  computed: {
    lessChannels() {
      return this.allChannels.reduce((pre, cur) => {
        if (!JSON.stringify(this.myChannels).includes(JSON.stringify(cur))) {
          pre.push(cur);
        }
        return pre;
      }, []);
    },
  },
  methods: {
    async getChannels() {
      try {
        const { data } = await getAllChannels();
        this.allChannels = data.data.channels;
      } catch (err) {
        console.log(err);
        this.$toast.fail("获取列表出错");
      }
    },
    addChannels(channel) {
      this.$emit("addChannel", channel);
    },
    // 删除或切换
    onMyChannelClick(item, index) {
      if (this.iconShow) {
        this.$emit("del-active", item, index);
      } else {
        this.$emit("update-active", index);
      }
    },
    delmyChannels(channel) {
      this.$emit("delmyChannel", channel);
    },
  },
};
</script>

<style lang="less" scoped>
.channel-edit {
  margin-top: 80px;
  .text-wrap {
    font-size: 30px;
  }
  /deep/ .van-icon-clear {
    position: absolute;
    font-size: 40px;
    top: -10px;
    right: -7px;
  }
  .text {
    display: block;
    height: 100%;
    width: 100%;
  }
  .activeCss {
    color: red;
  }
}
</style>