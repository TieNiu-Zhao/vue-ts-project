<template>
  <!-- 刷新按钮 -->
  <el-button
    size="small"
    icon="Refresh"
    circle
    @click="updateRefsh"
  ></el-button>
  <el-button
    size="small"
    icon="FullScreen"
    circle
    @click="fullScreen"
  ></el-button>
  <el-button size="small" icon="Setting" circle @click=""></el-button>
  <!-- 获取用户头像并渲染 -->
  <img
    :src="userStore.avatar"
    style="width: 24px; height: 24px; margin: 0 10px; border-radius: 50%"
    alt=""
  />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <!-- 获取用户名字并渲染 -->
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
// 获取骨架的小仓库
import useLayOutSettingStore from '@/store/modules/setting'
// 获取用户相关小仓库
import useUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'

let layoutSettingStore = useLayOutSettingStore()
let userStore = useUserStore()
// 获取路由器对象
let $router = useRouter()
// 刷新按钮点击回调
const updateRefsh = () => {
  layoutSettingStore.refsh = !layoutSettingStore.refsh // 对仓库值取反
}
// 全屏按钮点击回调
const fullScreen = () => {
  // 这个 DOM 属性，如果是全屏返回 true，否则返回 false
  let full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen() // 切换为全屏
  } else {
    document.exitFullscreen() // 退出全屏
  }
}
// 退出登录点击回调
const logout = async () => {
  // 向服务器发请求（退出登录接口 - 占位）
  // 仓库清空用户数据
  await userStore.userLogout()
  // 跳转到登录页面
  $router.push({ path: '/' })
}
</script>

<style scoped></style>
