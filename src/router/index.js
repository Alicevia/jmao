import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/home',
    component:()=>import('home/home.vue'),
    children:[
      {
        path:'',
        redirect:'productinfo'
      },
      {
        path:'productinfo',
        component:()=>import('home/navRouer/productInfo/productInfo.vue'),
      },
      {
        path:'productadd',
        component:()=>import('home/navRouer/productAdd/productAdd.vue')
      },
      {
        path:'caradd',
        component:()=>import('home/navRouer/carAdd/carAdd.vue'),
      },
    ]
    
  },
  {
    path:'/login',
    component:()=>import('home/home')
  },
 

]

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
})

export default router
