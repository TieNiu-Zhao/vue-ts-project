// 路由鉴权（项目中路由的访问权限）
import router from '@/router'
// 引入 pinia - 为了引入用户仓库
import pinia from './store'
import setting from './setting'
// 获取用户仓库 - 判断用户是否登录成功
import useUserStore from './store/modules/user'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false }) // 取消进度条时鼠标加载的圆球
let userStore = useUserStore(pinia)

// 全局守卫：项目中任意路由切换都会触发的钩子
// 全局前置守卫
router.beforeEach(async (to: any, next: any) => {
  // 访问某一路由之前触发
  // to: 将访问哪个路由, from: 从哪个路由来, next: 路由放行函数
  document.title = setting.title + '-' + to.meta.title // 浏览器上的标题
  // 进度条开始
  nprogress.start()
  // 获取 token - 判断用户登录了没
  let token = userStore.token
  // 获取用户名
  let username = userStore.username
  if (token) {
    // 登录
    if (to.path === '/login') {
      // 登录了不让访问 login
      next({ path: '/' })
    } else {
      if (username) {
        // 有用户名直接放行
        next()
      } else {
        try {
          // 没有用户名，发请求获取用户名再放行
          await userStore.userInfo()
          next()
        } catch (error) {
          // token 过期/用户修改了 localStorage  - 获取用户信息失败
          await userStore.userLogout() // 退出登录
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    // 未登录
    if (to.path === '/login') {
      // 没登录不让访问 其他路由
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } }) // query 用来记录想去没去成的路由
    }
  }
})

// 全局后置守卫
router.afterEach(() => {
  // 进度条消失
  nprogress.done()
  // 访问某一路由之后触发
})
