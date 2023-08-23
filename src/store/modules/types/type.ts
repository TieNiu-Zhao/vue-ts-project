import { RouteRecordRaw } from 'vue-router'

// 定义小仓库数据 state 类型
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[] // 路由对象的数据类型
  username: string
  avatar: string
}
