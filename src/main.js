import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Button,message,Layout,Table,Input} from 'ant-design-vue'

Vue.use(Input)
Vue.use(Button)//重置css样式
Vue.use(Layout)
Vue.use(Table)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
