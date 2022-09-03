import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

export default {
  plugins: [
    vue(),
    Components({ //按需引入vant组件
      resolvers: [VantResolver({
        importStyle:'less'
      })],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: { // 在这里自定义主题色等样式
          'primary-color': '#1da57a!important',
          'link-color': '#1da57a!important',
          'border-radius-base': '2px',
        },
        javascriptEnabled: true,
      },
    },
  },
  server:{
    hmr: true, //开启热更新
  }
};
