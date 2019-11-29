import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Button,message,Layout,Table,Input,Modal,Form,Select, Slider} from 'ant-design-vue'

Vue.use(Input)
Vue.use(Button)//重置css样式
Vue.use(Layout)
Vue.use(Table)
Vue.use(message)
Vue.use(Modal)
Vue.use(Form)
Vue.use(Select)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
