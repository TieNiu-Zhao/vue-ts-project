<template>
  <!-- 这里用了键值相同省略的简写形式 -->
  <svg :style="{ width, height }">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
// 接收父组件传过来的参数
defineProps({
  // xlink:href 属性值前缀
  prefix: {
    type: String,
    default: '#icon-',
  },
  // 提供使用图标名字
  name: String,
  // 提供图标的颜色
  color: {
    type: String,
    default: '',
  },
  // 提供图标宽度与高度
  width: {
    type: String,
    default: '16px',
  },
  height: {
    type: String,
    default: '16px',
  },
})
</script>

<style scoped></style>
