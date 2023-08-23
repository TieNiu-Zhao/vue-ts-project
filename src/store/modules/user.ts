// 创建用户相关小仓库
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
// 引入数据类型
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from '@/api/user/type'
import type { UserState } from './types/type'
// 引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN, DEL_TOKEN } from '@/utils/token'
// 引入路由（常量路由）
import { constantRoute } from '@/router/routes'
// 创建小仓库
let useUserStore = defineStore('User', {
  // 存储数据
  state: (): UserState => {
    return {
      token: GET_TOKEN(), // 用户唯一标识 token
      menuRoutes: constantRoute, // 仓库存储生成菜单需要的数组（路由）
      username: '',
      avatar: '',
    }
  },
  // 处理异步|逻辑
  actions: {
    // 用户登录的方法
    async userLogin(data: loginFormData) {
      // 发送登录请求
      let result: loginResponseData = await reqLogin(data)
      if (result.code === 200) {
        // 登陆成功 200 - 返回 token - 存储
        // pinia 仓库存储 token
        this.token = result.data as string
        SET_TOKEN(result.data as string)
        // 保证当前 async 函数返回一个成功的 Promise
        return 'ok'
      } else {
        // 登录失败 201 - 登录失败错误信息
        return Promise.reject(new Error(result.message))
      }
    },
    // 获取用户信息方法
    async userInfo() {
      // 把[用户头像, 用户名字]存储到仓库当中
      let result: userInfoResponseData = await reqUserInfo()
      if (result.code === 200) {
        // 获取用户信息成功，存储用户信息
        this.username = result.data.name
        this.avatar = result.data.avatar
        return 'ok'
      } else {
        // 获取用户信息失败
        return Promise.reject(new Error(result.message))
      }
    },
    // 退出登录
    async userLogout() {
      let result: any = await reqLogout()
      if (result.code === 200) {
        // 目前没有 mock 接口 - 退出登录接口（通知服务器让 token 失效）
        this.token = ''
        this.username = ''
        this.avatar = ''
        DEL_TOKEN() // 清除本地数据中的 token
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})
// 对外暴露
export default useUserStore
