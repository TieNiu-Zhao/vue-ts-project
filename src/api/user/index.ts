// 统一管理项目用户相关的接口
import request from '@/utils/request'
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from './type'
// 项目用户相关的请求地址
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

// 登录接口方法
export const reqLogin = (data: loginFormData) => {
  return request<any, loginResponseData>({
    url: API.LOGIN_URL,
    method: 'POST',
    data: data,
  })
}

// 获取用户信息
export const reqUserInfo = () => {
  return request<any, userInfoResponseData>({
    url: API.USERINFO_URL,
    method: 'get',
  })
}
// 退出登录
export const reqLogout = () => {
  return request<any, any>({
    url: API.LOGOUT_URL,
    method: 'post',
  })
}
