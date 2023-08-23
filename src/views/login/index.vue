<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <!-- 窗口过小可以保留右侧表单区域 -->
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login_btn"
              type="primary"
              size="default"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
// 引入用户相关小仓库
import useUserStore from '@/store/modules/user'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
// 引入获取当前时间段的函数
import { getTime } from '@/utils/time'
let useStore = useUserStore()
// 获取 el-form 组件
let loginForms = ref()
// 获取路由器
let $router = useRouter()
// 定义变量控制按钮加载效果
let loading = ref(false)
// 收集表单数据
let loginForm = reactive({ username: 'admin', password: 'atguigu123' })
const login = async () => {
  // 保证全部表单校验通过再发请求
  await loginForms.value.validate()
  // 让按钮的加载图标开始转
  loading.value = true
  // 通知仓库发登录请求
  try {
    await useStore.userLogin(loginForm)
    // 登陆成功 - 编程式导航跳转到首页
    $router.push('/')
    // 登陆成功的提示信息
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `HI,${getTime()}好`,
    })
    loading.value = false
  } catch (error) {
    loading.value = false
    // 登陆失败 - 提示信息
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
// 定义自定义校验规则 - 参考 element-plus 官网
const validatorUserName = (value: any, callback: any) => {
  // rule 是校验规则对象,value 是表单元素的文本内容,符合条件callback放行，不符合注入错误提示信息
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('账号长度至少五位'))
  }
}
const validatorPassword = (value: any, callback: any) => {
  // rule 是校验规则对象,value 是表单元素的文本内容,符合条件callback放行，不符合注入错误提示信息
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('密码长度至少六位'))
  }
}

// 定义表单校验需要的配置对象 - 请参考 element-plus Form 组件表单验证部分
const rules = {
  username: [
    // { required: true, min: 6, max: 10, message: '账号长度至少6位', trigger: 'change' }
    { trigger: 'change', validator: validatorUserName },
  ],
  password: [
    // { required: true, min: 6, max: 15, message: '密码长度至少6位', trigger: 'change' }
    { trigger: 'change', validator: validatorPassword },
  ],
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
