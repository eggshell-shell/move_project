<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!--
      Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮
     -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        clearable
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @input="isResultShow = false"
      />
    </form>
    <!-- /搜索栏 -->

    <!-- 结果 -->
    <search-result v-if="isResultShow" :searchText="searchText" />
    <!-- /结果  -->

    <!-- 联想建议 -->
    <search-suggestion
      v-else-if="searchText"
      :searchText="searchText"
      @search="onSearch"
    />
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <search-history v-else />
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import SearchHistory from "./components/search-history";
import SearchSuggestion from "./components/search-suggestion";
import SearchResult from "./components/search-result";

export default {
  name: "SearchIndex",
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult,
  },
  props: {},
  data() {
    return {
      searchText: "",
      isResultShow: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSearch(val) {
      this.searchText = val;
      this.isResultShow = true;
      // console.log(this.searchText);
    },
    onCancel() {
      this.$router.back();
    },
  },
};
</script>

<style scoped lang="less">
.search-container {
  .van-search {
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 3;
  }
  .van-search__action {
    color: #fff;
  }
}
</style>
