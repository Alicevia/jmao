import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
    meta: {
      check: false
    }
  },
  {
    path: '/home',
    component: () => import('home/home.vue'),
    meta: {
      check: true
    },
    children: [
      {
        path: '',
        redirect: 'productinfo'
      },
      {
        path: 'productinfo',
        component: () => import('home/navRouer/productInfo/productInfo.vue'),
      },
      {
        path: 'productadd',
        component: () => import('home/navRouer/productAdd/productAdd.vue')
      },
      {
        path: 'caradd',
        component: () => import('home/navRouer/carAdd/carAdd.vue'),
      },
    ]

  },
  {
    path: '/login',
    component: () => import('@/views/login/login'),
    meta: {
      check: false
    },
  },


]

const router = new VueRouter({
  mode:'history',
  base:'/jimao/',//history路由
  linkActiveClass: 'active',
  routes
})
router.beforeEach((to, from, next) => {
  let isLogin = store.state.login
  if (to.matched[0].meta.check) {
    if (isLogin) {
      next()
    } else {
      router.push({ path: '/login' })
    }
  } else {
    next()
  }
})

export default router
