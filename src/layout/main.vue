<template>
  <view class="mobile_warp">
    <view class="mains"><router-view /></view>
    <van-tabbar route>
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/search" icon="search">搜索</van-tabbar-item>
      <van-tabbar-item to="/firends" icon="friends-o">通信录</van-tabbar-item>
      <van-tabbar-item to="/setting" icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
  </view>
</template>
<script>
import {
  ref
} from 'vue'
export default {
  setup() {
    const active = ref(0)
    return {
      active
    }
  },
  methods: {

  }
}
</script>
<style>
	.mobile_warp{display: block;background-color: #eee;
	width: 100vw;height: 100vh;padding-bottom: 50px;box-sizing: border-box;overflow-x: hidden;overflow-y: auto;}
</style>
