import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from "@/utils/storage"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('Token_key'),
  },
  mutations: {
    setUser(state, data) {
      // 数据响应式处理
      state.user = data
      // 防止刷新丢失数据，持久化处理
      setItem('Token_key', state.user)
    },
  },
  actions: {
  },
  modules: {
  }
})
