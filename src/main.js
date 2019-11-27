import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Button,message,Layout} from 'ant-design-vue'

Vue.use(Button)//重置css样式
Vue.use(Layout)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
