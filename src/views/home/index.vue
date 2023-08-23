<template>
  <div>
    <h1>我是一级路由-登录成功</h1>
  </div>
</template>

<script setup lang="ts">
// 引入生命周期函数
import { onMounted } from 'vue'
// 引入仓库
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
// 首页挂载完毕发送请求获取用户信息
onMounted(() => {
  userStore.userInfo() // 使用仓库的 userInfo 方法
})
</script>

<style scoped></style>
