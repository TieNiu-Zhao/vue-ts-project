<template>
  <template v-for="item in menuList" :key="item.path">
    <!-- el-menu-item 为非折叠菜单 -->
    <template v-if="!item.children">
      <!-- 没有子路由 -->
      <el-menu-item
        v-if="!item.meta.hidden"
        :index="item.path"
        @click="goRoute"
      >
        <!-- 图标放在插槽外边，使折叠后依然存在 -->
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <template v-if="item.children && item.children.length === 1">
      <!-- 有子路由,但只有一个,没必要展开 -->
      <el-menu-item
        v-if="!item.children[0].meta.hidden"
        :index="item.children[0].path"
        @click="goRoute"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有子路由,切个数大于1,折叠菜单 -->
    <el-sub-menu
      :index="item.path"
      v-if="item.children && item.children.length > 1"
    >
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <!-- 递归组件 -->
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

// 获取父组件传递的全部路由数据
defineProps(['menuList'])
// 获取路由器对象
let $router = useRouter()
// 点击菜单的回调
const goRoute = (vc: any) => {
  $router.push(vc.index)
}
</script>
<script lang="ts">
// 递归组件必须要名字，使用vue2的写法
export default {
  name: 'Menu',
}
</script>

<style scoped></style>
