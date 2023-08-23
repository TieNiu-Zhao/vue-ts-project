// 引入项目中全部的全局组件
import SvgIcon from './SvgIcon/index.vue'
// 引入 Element-plus 提供的图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 全局组件对象
const allGlobalComponent: any = { SvgIcon }

export default {
  // 务必叫做 install 方法
  install(app: any) {
    // 注册项目全部的全局组件
    Object.keys(allGlobalComponent).forEach((key) => {
      app.component(key, allGlobalComponent[key])
    })
    // 把图标库全注册成全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
