<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      @refresh="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearch } from "@/api/search";

export default {
  name: "SearchResult",
  components: {},
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.onLoad();
  },
  mounted() {},
  methods: {
    async onLoad() {
      // 异步更新数据
      try {
        const { data } = await getSearch({
          page: this.page,
          per_page: this.perPage,
          q: this.searchText,
        });
        const { results } = data.data;
        this.list.push(...results);
        this.loading = false;
        if (results.total_count == this.list.length) this.loading = false;
      } catch (err) {
        console.log(err);
        this.$toast.fail("数据获取失败");
      }
    },
  },
};
</script>

<style scoped lang="less"></style>