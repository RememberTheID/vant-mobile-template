import { createRouter, createWebHashHistory } from 'vue-router'
import { createApp } from 'vue'
import App from '../App.vue'

const routes = [
  {
    path: '/',
    component: () => import('./../layout/main.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '主页',
          noLogin: true,
        },
        component: () => import('./../page/home.vue'),
      },
      {
        path: '/search',
        meta: {
          title: '搜索页',
          noLogin: true,
        },
        name: 'search',
        component: () => import('./../page/search.vue'),
      },
      {
        path: '/firends',
        name: 'firends',
        meta: {
          title: '通信录',
          noLogin: true,
        },
        component: () => import('./../page/firends.vue'),
      },
      {
        path: '/setting',
        meta: {
          title: '设置',
          noLogin: true,
        },
        name: 'setting',
        component: () => import('./../page/setting.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: '/login',
    meta: {
      title: '登录',
      noLogin: true,
    },
    component: () => import('./../page/sys/login.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')

export default { router, app }
