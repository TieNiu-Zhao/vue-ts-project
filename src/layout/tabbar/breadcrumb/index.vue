<template>
  <!-- 顶部左侧静态 -->
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <!-- conponent 组件可以动态加载相应组件，使用 is 转写字符串 -->
    <component :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <!-- 左侧面包屑 - elem-plus 封装好的 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <!-- 面包屑需动态展示名字与标题 使用 v-for 动态生成 -->
    <!-- v-show 用来隐藏[空格]>首页 这种情况 -->
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <!-- 图标 -->
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <!-- 面包屑展示匹配路由的标题 -->
      <span style="vertical-align: top">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
// 从仓库中引入 fold
import useLayOutSettingStore from '@/store/modules/setting'
import { useRoute } from 'vue-router'
// 引入路由对象
let $route = useRoute()
// 获取 Layout 配置相关仓库
let LayOutSettingStore = useLayOutSettingStore()
// 定义响应式数据控制图标的切换

const changeIcon = () => {
  LayOutSettingStore.fold = !LayOutSettingStore.fold // 切换图标
}
</script>

<style scoped></style>
