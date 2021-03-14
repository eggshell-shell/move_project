<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(item, index) in suggestionsList"
      :key="index"
      icon="search"
      @click="$emit('search', item)"
    >
      <div slot="title" v-html="hightLight(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from "@/api/search";
import { debounce } from "lodash";

export default {
  name: "SearchSuggestion",
  components: {},
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      suggestionsList: [],
    };
  },
  computed: {},
  watch: {
    searchText: {
      // handler(value) {
      //   this.loadSearchSuggestions(value);
      // },
      // 防抖优化
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value);
      }, 500),
      immediate: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    async loadSearchSuggestions(q) {
      try {
        const { data } = await getSearchSuggestion(q);
        this.suggestionsList = data.data.options;
      } catch (err) {
        console.log(err);
        this.$toast.fail("联想出错，稍后再试");
      }
    },
    hightLight(value) {
      const lightStr = `<span style='color:blue'>${this.searchText}</span>`;
      const reg = new RegExp(this.searchText, "gi");
      return value.replace(reg, lightStr);
    },
  },
};
</script>

<style scoped lang="less"></style>