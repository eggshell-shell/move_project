import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css';

// 加载全局样式
import './styles/index.css'

//动态设置rem基准值
import 'amfe-flexible'

//时间格式
import './utils/dayjs'


// 注册使用Vant
Vue.use(Vant);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
