import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
// 配置 elements 国际化
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 引入自定义插件对象：注册整个项目的全局组件
import globalComponent from '@/components'
// 引入全局样式
import '@/styles/index.scss'
// 引入路由
import router from './router'
// 引入仓库
import pinia from './store'
// 引入路由鉴权文件
import './permission'

// 获取应用实例对象
const app = createApp(App)
// 安装自定义插件
app.use(globalComponent)

// 安装 element-plus 插件
app.use(ElementPlus, {
  locale: zhCn, // 国际化配置
})
// 注册模板路由
app.use(router)
// 安装仓库
app.use(pinia)
// 将应用挂载到挂载点上
app.mount('#app')
