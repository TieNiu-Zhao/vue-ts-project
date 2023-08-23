<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <!-- 动态添加 fold 类，根据仓库的 fold 值 -->
    <div
      class="layout_slider"
      :class="{ fold: LayOutSettingStore.fold ? true : false }"
    >
      <Logo></Logo>
      <!-- 展示菜单 - 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <!-- elem-plus menu 有个 collapse 属性，控制折叠收起菜单 -->
        <el-menu
          :collapse="LayOutSettingStore.fold ? true : false"
          :default-active="$route.path"
          background-color="#001529"
          text-color="white"
        >
          <!-- 根据路由动态生成菜单 -->
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div
      class="layout_tabbar"
      :class="{ fold: LayOutSettingStore.fold ? true : false }"
    >
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区域 -->
    <div
      class="layout_main"
      :class="{ fold: LayOutSettingStore.fold ? true : false }"
    >
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
// 获取路由对象
import { useRoute } from 'vue-router'
// 引入左侧菜单 Logo
import Logo from './logo/index.vue'
// 引入左侧动态菜单
import Menu from './menu/index.vue'
// 右侧内容展示区域
import Main from './main/index.vue'
// 引入顶部 rabbar 组件
import Tabbar from './tabbar/index.vue'
// 获取用户小仓库
import useUserStore from '@/store/modules/user'
import useLayOutSettingStore from '@/store/modules/setting'
let userStore = useUserStore()
// 获取 Layout 配置仓库
let LayOutSettingStore = useLayOutSettingStore()

// 获取路由对象
let $route = useRoute()
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    color: white;
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    transition: all 0.3s; // 添加过渡动画

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);

      .el-menu {
        border-right: none;
      }
    }

    &.fold {
      width: $base-menu-min-width; // 50px,定义成全局css变量了
    }
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0px;
    left: $base-menu-width;
    transition: all 0.3s;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width; // 宽度与 left 都要改
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width; // 宽度与 left 都要改
    }
  }
}
</style>
