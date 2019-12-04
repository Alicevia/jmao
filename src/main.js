import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Button,message,Layout,Table,Input,Col,Cascader,
  Modal,Form,Select,Upload,Icon,Popconfirm,Row} from 'ant-design-vue'

Vue.use(Input)
Vue.use(Button)//重置css样式
Vue.use(Layout)
Vue.use(Table)
Vue.use(message)
Vue.use(Modal)
Vue.use(Form)
Vue.use(Select)
Vue.use(Upload)
Vue.use(Icon)
Vue.use(Popconfirm)
Vue.use(Row)
Vue.use(Col)
Vue.use(Cascader)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
