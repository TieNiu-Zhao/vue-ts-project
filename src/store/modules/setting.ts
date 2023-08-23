// 小仓库：layout 组件配置仓库
import { defineStore } from 'pinia'

let useLayOutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false, // 用于控制菜单折叠 / 展开的控制
      refsh: false, // 用于控制刷新效果
    }
  },
})
export default useLayOutSettingStore
