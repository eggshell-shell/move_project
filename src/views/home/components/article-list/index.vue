<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isLoading"
      :success-text="refreshSuccessText"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- :title="item.aut_name" -->
        <!-- <van-cell
          v-for="item in list"
          :key="item.art_id"
          :title="item.aut_name"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
        /> -->
        <article-item
          v-for="(item, index) in list"
          :key="index"
          :article="item"
        >
        </article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from "@/api/article";
import ArticleItem from "@/components/article-item";

export default {
  name: "ArticleList",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      timestamp: null,
      isLoading: false,
      refreshSuccessText: "",
    };
  },
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  components: {
    ArticleItem,
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getArticleList({
          channel_id: this.article.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1,
        });
        const { results } = data.data;
        this.list.push(...results);
        this.loading = false;
        if (!results.length) this.finished = true;
        else {
          this.timestamp = data.data.pre_timestamp;
          console.log(this.timestamp);
        }
      } catch (err) {
        this.loading = false;
        this.error = true;
      }
    },
    async onRefresh() {
      try {
        // 1. 请求获取数据
        const { data } = await getArticleList({
          channel_id: this.article.id, // 频道 id
          timestamp: Date.now(), // 下拉刷新每次都应该获取最新数据
          with_top: 1, // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        });

        // 2. 将数据追加到列表的顶部
        const { results } = data.data;
        this.list.unshift(...results);
        // 3. 关闭下拉刷新的 loading 状态
        this.isLoading = false;

        // 提示成功
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`;
      } catch (err) {
        console.log(err);
        this.isLoading = false; // 关闭下拉刷新的 loading 状态
        this.$toast("刷新失败");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.article-list {
  height: 75vh;
  overflow-y: auto;
}
</style>