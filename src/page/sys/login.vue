<template>
  <div class="warp">
    <img src="./../../assets/logo.png" alt="">
    <h2>{{title}}</h2>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="username" name="username" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
        <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { computed, ref } from 'vue';
import { login } from './../../api/sys'
export default {
  setup () {
    const username = ref('remember');
    const password = ref('Remember@123');
    return {
      username,
      password
    };
  },
  methods: {
    onSubmit (values) {
      console.log(this.$utils)
      login(values).then(res => {
        if (res.success) {
          this.$utils.setStorage(res.result.token)
          this.$utils.setStorage(res.result.userInfo, 'userInfo')
          const path=this.$route.query.redirect
          this.$router.replace({path:path||'/'})
        }
      })
    }
  },
  computed: {
      title(){
        return import.meta.env.VITE_APP_TITLE
      }
    }
};
</script>
<style scoped>
  
.warp {
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
h2{margin:5vh 0}
</style>