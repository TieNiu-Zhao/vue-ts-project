// 进行 axios 的二次封装
import axios from 'axios'
import { ElMessage } from 'element-plus'
// 引入用户相关仓库
import useUserStore from '@/store/modules/user'

// 利用 axios 对象的 create 方法，创建 axios 实例（可做其他配置: 基础路径，超时时间）
let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径上会携带 /api
  timeout: 5000, // 超时时间
})
// 为 axios 实例 request 添加请求拦截器与响应拦截器
request.interceptors.request.use((config) => {
  // 在请求拦截器处添加获取用户仓库 TOKEN 的方法，登陆成功后携带给服务器
  let userStore = useUserStore()
  if (userStore.token) {
    config.headers.token = userStore.token
  }
  // config 配置对象有 headers 请求头，经常用来给服务器端携带公共参数

  // 返回配置对象
  return config
})
request.interceptors.response.use(
  (response) => {
    // 成功的回调 - 简化数据
    return response.data
  },
  (error) => {
    // 失败的回调 - 处理 http 网络错误
    let message = '' // 此变量用来存储网络错误信息
    let status = error.response.status // 存储 http 状态码
    switch (status) {
      case 401:
        message = 'TOKEN过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '网络出现问题'
    }
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error)
  },
)

// 对外暴露
export default request
