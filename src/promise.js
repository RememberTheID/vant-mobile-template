import App from './router/index';
import { getStorage } from './utils/index';
router.router.beforeEach((to, from, next) => {
const token = getStorage();
  if (!!token) {
    if (to.meta.noLogin) {
      next({ path: '/home' });
    } else {
      next();
    }
  } else {
    if (to.meta.noLogin) {
      next();
    } else {
      next({ path: '/login', query: { redirect: to.fullPath } });
    }
  }
});

// http://localhost:3000/#/login?redirect=/home

App.router.afterEach((to, from) => {
  document.title = `${to.meta.title}-${import.meta.env.VITE_APP_TITLE}`;
});
