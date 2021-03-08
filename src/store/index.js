import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('Token_key'))
  },
  mutations: {
    setUser(state, data) {
      // 数据响应式处理
      state.user = data

      // 防止刷新丢失数据，持久化处理
      window.localStorage.setItem('Token_key', JSON.stringify(state.user))
    }
  },
  actions: {
  },
  modules: {
  }
})
