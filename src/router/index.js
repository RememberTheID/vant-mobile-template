import { createRouter, createWebHashHistory } from 'vue-router';
import { createApp } from 'vue';
import App from '../App.vue';

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
        },
        component: () => import('./../page/home.vue'),
      },
      {
        path: '/search',
        meta: {
          title: '搜索页',
        },
        name: 'search',
        component: () => import('./../page/search.vue'),
      },
      {
        path: '/firends',
        name: 'firends',
        meta: {
          title: '通信录',
        },
        component: () => import('./../page/firends.vue'),
      },
      {
        path: '/setting',
        meta: {
          title: '设置',
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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount('#app');

export default {router,app}
