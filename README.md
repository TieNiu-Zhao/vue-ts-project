# 项目笔记

原硅谷甄选

## 初始化

- 创建项目

  ```
  pnpm create vite
  ```

- 下载依赖

  ```
  cd 项目名
  pnpm i
  ```

- 运行项目

  ```
  pnpm run dev
  ```

---

## vscode 插件设置与下载

- 为了让代码输入 v3ts 时自动出现 vue 结构，下载 Vue VSCode Snippets 插件

  （但是这里 script 标签在中间，用空研究下怎么自动生成在前面）

- 安装 element-plus 后，为了快捷输入一些标签，下载 Element UI Snippets

  （可以输入 elb 快速打出 el-button 标签）

- 为了按下 Tab 键快速补全标签，要在 vscode 设置右上角进入 setting.json 中，添加：

  ```
  "emmet.triggerExpansionOnTab": true,
  ```

  就可以输入标签名后，按下 Tab 出现标签了。

---

## 项目配置

麻烦的一b

### package.json --配置文件

- 为了让启动项目自动打开网页 -- 为 `script` 添加 "dev": "vite --open",

- 为了让 eslint 在运行是校验 -- 为 `script` 添加

  ```
  "lint": "eslint src",
  "fix": "eslint src --fix"
  ```

- 为了让 prettier 与 stylelint 来格式化 js ，html，css 代码 -- 为 `script` 添加

  ```
  "format": "prettier --write \"./**/*.{html,vue,ts,js,json,md}\"",
  "lint:eslint": "eslint src/**/*.{ts,vue} --cache --fix",
  "lint:style": "stylelint src/**/*.{css,scss,vue} --cache --fix"
  ```

- 为了让 commitlint 生效，-- 为 `script` 添加

  ```
  "commitlint": "commitlint --config commitlint.config.cjs -e -V"
  ```

- 为了让 pnpm 包管理生效，-- 为 `script` 添加

  ```
  "preinstall": "node ./scripts/preinstall.js"
  ```

- 为了能在代码处获取配置好的环境变量，-- 为 `script` 添加

  ```
  "build:test": "vue-tsc && vite build --mode test",
  "build:pro": "vue-tsc && vite build --mode production",
  ```

---

### eslint --检测 ts 代码

用 eslint 检测 ts 代码

1. 安装插件

   ```
   pnpm i eslint -D
   ```

2. 生成配置文件

   ```
   npx eslint --init

   You can also run this command directly using 'npm init @eslint/config'.
   √ How would you like to use ESLint? · problems
   √ What type of modules does your project use? · esm
   √ Which framework does your project use? · vue
   √ Does your project use TypeScript? · No / [Yes]
   √ Where does your code run? · browser
   √ What format do you want your config file to be in? · JavaScript
   The config that you've selected requires the following dependencies:

   @typescript-eslint/eslint-plugin@latest eslint-plugin-vue@latest @typescript-eslint/parser@latest
   √ Would you like to install them now? · No / [Yes]
   √ Which package manager do you want to use? · pnpm
   ```

   操作完项目中出现 .eslintrc.cjs

3. 安装 vue3 环境代码校验插件

   ```
   pnpm install -D eslint-plugin-import eslint-plugin-vue eslint-plugin-node eslint-plugin-prettier eslint-config-prettier eslint-plugin-node @babel/eslint-parser
   ```

4. 修改 .eslintrc.cjs ，没有那个 @see 会爆红，原理不明

   ```
   // @see https://eslint.bootcss.com/docs/rules/

   module.exports = {
     env: {
       browser: true,
       es2021: true,
       node: true,
       jest: true,
     },
     /* 指定如何解析语法 */
     parser: 'vue-eslint-parser',
     /** 优先级低于 parse 的语法解析配置 */
     parserOptions: {
       ecmaVersion: 'latest',
       sourceType: 'module',
       parser: '@typescript-eslint/parser',
       jsxPragma: 'React',
       ecmaFeatures: {
         jsx: true,
       },
     },
     /* 继承已有的规则 */
     extends: [
       'eslint:recommended',
       'plugin:vue/vue3-essential',
       'plugin:@typescript-eslint/recommended',
       'plugin:prettier/recommended',
     ],
     plugins: ['vue', '@typescript-eslint'],
     /*
      * "off" 或 0    ==>  关闭规则
      * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
      * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
      */
     rules: {
       // eslint（https://eslint.bootcss.com/docs/rules/）
       'no-var': 'error', // 要求使用 let 或 const 而不是 var
       'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
       'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
       'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
       'no-unexpected-multiline': 'error', // 禁止空余的多行
       'no-useless-escape': 'off', // 禁止不必要的转义字符

       // typeScript (https://typescript-eslint.io/rules)
       '@typescript-eslint/no-unused-vars': 'error', // 禁止定义未使用的变量
       '@typescript-eslint/prefer-ts-expect-error': 'error', // 禁止使用 @ts-ignore
       '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
       '@typescript-eslint/no-non-null-assertion': 'off',
       '@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间。
       '@typescript-eslint/semi': 'off',

       // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
       'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
       'vue/script-setup-uses-vars': 'error', // 防止<script setup>使用的变量<template>被标记为未使用
       'vue/no-mutating-props': 'off', // 不允许组件 prop的改变
       'vue/attribute-hyphenation': 'off', // 对模板中的自定义组件强制执行属性命名样式
     },
   }
   ```

5. 在根目录下新建 eslint 忽略文件 .eslintignore 忽略文件

   ```
   dist
   node_modules
   ```

6. 修改 package.json

---

### prettier --格式化

prettier 是格式化工具，保证代码格式统一

1. 安装依赖

   ```
   pnpm install -D eslint-plugin-prettier prettier eslint-config-prettier
   ```

2. 根目录下新建 .prettierrc.json 添加规则

   ```
   {
     "singleQuote": true,
     "semi": false,
     "bracketSpacing": true,
     "htmlWhitespaceSensitivity": "ignore",
     "endOfLine": "auto",
     "trailingComma": "all",
     "tabWidth": 2
   }
   ```

3. 根目录下新建 .prettierignore 忽略文件、

   ```
   /dist/*
   /html/*
   .local
   /node_modules/**
   **/*.svg
   **/*.sh
   /public/*
   ```

4. 准备好以上后，以后项目可以使用 **pnpm run lint** 去检测语法问题，如果出现不规范格式，通过 **pnpm run fix** 修改格式问题

### stylelint --格式化 css

stylelint 是 css 的 lint 工具，可以格式化 css 代码

1. 安装依赖（本项目采用 sass 作为预处理器）

   ```
   pnpm add sass sass-loader stylelint postcss postcss-scss postcss-html stylelint-config-prettier stylelint-config-recess-order stylelint-config-recommended-scss stylelint-config-standard stylelint-config-standard-vue stylelint-scss stylelint-order stylelint-config-standard-scss -D
   ```

2. 根目录下新建 .stylelintrc.cjs 配置文件

   ```
   // @see https://stylelint.bootcss.com/

   module.exports = {
     extends: [
       'stylelint-config-standard', // 配置stylelint拓展插件
       'stylelint-config-html/vue', // 配置 vue 中 template 样式格式化
       'stylelint-config-standard-scss', // 配置stylelint scss插件
       'stylelint-config-recommended-vue/scss', // 配置 vue 中 scss 样式格式化
       'stylelint-config-recess-order', // 配置stylelint css属性书写顺序插件,
       'stylelint-config-prettier', // 配置stylelint和prettier兼容
     ],
     overrides: [
       {
         files: ['**/*.(scss|css|vue|html)'],
         customSyntax: 'postcss-scss',
       },
       {
         files: ['**/*.(html|vue)'],
         customSyntax: 'postcss-html',
       },
     ],
     ignoreFiles: [
       '**/*.js',
       '**/*.jsx',
       '**/*.tsx',
       '**/*.ts',
       '**/*.json',
       '**/*.md',
       '**/*.yaml',
     ],
     /**
      * null  => 关闭该规则
      * always => 必须
      */
     rules: {
       'value-keyword-case': null, // 在 css 中使用 v-bind，不报错
       'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
       'function-url-quotes': 'always', // 要求或禁止 URL 的引号 "always(必须加上引号)"|"never(没有引号)"
       'no-empty-source': null, // 关闭禁止空源码
       'selector-class-pattern': null, // 关闭强制选择器类名的格式
       'property-no-unknown': null, // 禁止未知的属性(true 为不允许)
       'block-opening-brace-space-before': 'always', //大括号之前必须有一个空格或不能有空白符
       'value-no-vendor-prefix': null, // 关闭 属性值前缀 --webkit-box
       'property-no-vendor-prefix': null, // 关闭 属性前缀 -webkit-mask
       'selector-pseudo-class-no-unknown': [
         // 不允许未知的选择器
         true,
         {
           ignorePseudoClasses: ['global', 'v-deep', 'deep'], // 忽略属性，修改element默认样式的时候能使用到
         },
       ],
     },
   }
   ```

3. 在根目录下新建 .stylelintignore 忽略文件

   ```
   /node_modules/*
   /dist/*
   /html/*
   /public/*
   ```

4. 在 package.json 添加运行脚本

5. 配置好以上内容，可以使用 **pnpm run format** 一键格式化

---

### husky --提交 git 前格式化

配置好以上内容，需要格式化在把项目交到 git，怕有的人没格式化就提交到 git，在提交代码前，会触发 git hook（git 在客户端的勾子），然后执行 **pnpm run format** 来格式化代码。

1. 安装

   ```
   pnpm install -D husky
   ```

2. 执行

   ```
   npx husky-init
   ```

   会在根目录下生成个一个.husky 目录，在这个目录下面会有一个 pre-commit 文件，这个文件里面的命令在我们执行 commit 的时候就会执行。

   执行这个命令可能会报错，需要先在 git bash 执行 git init，报错的话请先配置好 git。

3. 在 .husky 下的 pre-commit 文件下把 npm test 修改为 pnpm run format

---

### commitlint --commit 信息规范

commit 信息也要规范，按照统一标准执行。

1. 安装

   ```
   pnpm add @commitlint/config-conventional @commitlint/cli -D
   ```

2. 跟目录新建 commitlint.config.cjs 文件

   ```
   module.exports = {
     extends: ['@commitlint/config-conventional'],
     // 校验规则
     rules: {
       'type-enum': [
         2,
         'always',
         [
           'feat',
           'fix',
           'docs',
           'style',
           'refactor',
           'perf',
           'test',
           'chore',
           'revert',
           'build',
         ],
       ],
       'type-case': [0],
       'type-empty': [0],
       'scope-empty': [0],
       'scope-case': [0],
       'subject-full-stop': [0, 'never'],
       'subject-case': [0, 'never'],
       'header-max-length': [0, 'always', 72],
     },
   }
   ```

3. 在 package.json 添加运行脚本

4. 配置好，提交到 git 填写 commit 信息时，需要带着下面的关键字（subject）

   ```
   'feat',//新特性、新功能
   'fix',//修改bug
   'docs',//文档修改
   'style',//代码格式修改, 注意不是 css 修改
   'refactor',//代码重构
   'perf',//优化相关，比如提升性能、体验
   'test',//测试用例修改
   'chore',//其他修改, 比如改变构建流程、或者增加依赖库、工具等
   'revert',//回滚到上一个版本
   'build',//编译相关的修改，例如发布版本、对项目构建或者依赖的改动
   ```

5. 配置 husky

   ```
   npx husky add .husky/commit-msg
   ```

   会在 .husky 下生成一个 commit-msg 文件，删除里面的 undefined 改为 pnpm commitlint

6. 以上配置好，以后 commit 信息时，不能随便乱写了，必须 git commit -m 'fix: xxx'

---

### pnpm --强制包管理工具

团队开发项目要用统一的包管理工具

1. 在跟目录创建 scripts / preinstall.js 文件

   ```
   if (!/pnpm/.test(process.env.npm_execpath || '')) {
     console.warn(
       `\u001b[33mThis repository must using pnpm as the package manager ` +
       ` for scripts to work properly.\u001b[39m\n`,
     )
     process.exit(1)
   }
   ```

2. 在 package.json 添加运行脚本，否则上面的代码不会执行

---

### element-plus --组件库

项目 UI 组件库采用 element-plus

1. 安装

   ```
   pnpm install element-plus
   ```

2. 引入 element-plus

   ```typescript
   // 引入 element-plus 插件与样式
   import ElementPlus from 'element-plus'
   import 'element-plus/dist/index.css'

   // 获取应用实例对象
   const app = createApp(App)
   // 安装 element-plus 插件
   app.use(ElementPlus)
   // 将应用挂载到挂载点上
   app.mount('#app')
   ```

3. 为了使用图标，需安装 element-plus 图标组件库

   ```
   pnpm i @element-plus/icons-vue
   ```

   然后就可以先引入图标组件，再在 el 标签上，使用 :icon 使用相应图标了，例如：

   ```vue
   <template>
     <div>
       <el-button type="primary" size="default" :icon="Plus">
         主要按钮
       </el-button>
     </div>
   </template>

   <script setup lang="ts">
   // 引入图标组件
   import { Plus } from '@element-plus/icons-vue'
   </script>
   ```

4. element-plus 组件中，例如分页器，默认是英语，需要配置中文

   在 main.ts 内

   ```typescript
   // 配置 elements 国际化
   import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

   app.use(ElementPlus, {
     locale: zhCn, // 国际化配置
   })
   ```

5. 在引入国际化后，打包会报错，包括上面的 from 后面会标红。因为 element-plus 国际化未定义 ts 类型文件

   在 main.ts 内爆红上一行添加

   ```
   //@ts-ignore
   ```

   （但是添加这个 @ts-ignore 会变成别的，且爆红，不明）

---

### src 别名配置 --@路径

文件与文件关系会很复杂，需要给 src 文件夹配置一个别名

1. 在 vite.config.ts 中，修改为：

   ```typescript
   import { defineConfig } from 'vite'
   import vue from '@vitejs/plugin-vue'
   import path from 'path'
   export default defineConfig({
     plugins: [vue()],
     resolve: {
       alias: {
         '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
       },
     },
   })
   ```

2. 在 tsconfig.json 中添加配置项

   ```
   {
     "compilerOptions": {
       "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
       "paths": { //路径映射，相对于baseUrl
         "@/*": ["src/*"]
       }
     }
   }
   ```

3. 在 vue 文件中引入 '@/...' 路径时，可能会爆红，这是由于VScode 的 Vetur 插件冲突所导致，请关闭此组件并重启。

---

### 配置环境变量

1. 在项目根目录添加 .env.development 文件

   ```
   # 变量必须以 VITE_ 为前缀才能暴露给外部读取
   NODE_ENV = 'development'
   VITE_APP_TITLE = '硅谷甄选运营平台'
   VITE_APP_BASE_API = '/api'
   ```

2. 在项目根目录添加 .env.production 文件

   ```
   NODE_ENV = 'production'
   VITE_APP_TITLE = '硅谷甄选运营平台'
   VITE_APP_BASE_API = '/prod-api'
   ```

3. 在项目根目录添加 .env.test 文件

   ```
   # 变量必须以 VITE_ 为前缀才能暴露给外部读取
   NODE_ENV = 'test'
   VITE_APP_TITLE = '硅谷甄选运营平台'
   VITE_APP_BASE_API = '/test-api'
   ```

4. 修改配置文件 package.json

---

### SVG 图标 --全局组件的封装

使用阿里图标库

1. 安装 SVG 依赖插件

   ```
   pnpm install vite-plugin-svg-icons -D
   ```

2. 在 vite.config.ts 中配置插件

   ```typescript
   // 引入 SVG 需要用到的插件
   import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

   plugins: [
       vue(),
       createSvgIconsPlugin({
         iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
         symbolId: 'icon-[dir]-[name]',
       }),
     ],
   ```

3. 在 main.ts 导入

   ```
   import 'virtual:svg-icons-register'
   ```

4. 在 vue 中使用 svg 图标的方法：

   先在 src / assets 下新建 icons 文件夹，此文件下存储 svg 文件（假如有个 phone.svg 的文件）

   ```html
   <!-- 使用 svg 标签，嵌套 use 标签使用 -->
   <!-- 修改图标大小，可在 svg 标签上使用 style 属性 -->
   <svg style="width: 30px; height: 30px">
     <!-- 修改颜色可使用 fill="red" 修改为红色等 -->
     <use xlink:href="#icon-phone" fill="skyblue"></use>
   </svg>
   ```

   属性值务必使用 #icon- + 图标文件名（这里 30px 后的分号会被当成错误修复，很奇怪）

5. 但上面每用一个图标，要写一堆代码，所以封装成组件

   在 components 下新建 SvgIcon 文件夹，下新建 index.vue

   ```vue
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
   ```

6. 然后使用图标就可以直接使用组件，传递图标名和颜色与宽高了

   ```vue
   <template>
     <div>
       <svg-Icon
         name="home"
         color="skyblue"
         width="100px"
         height="100px"
       ></svg-Icon>
     </div>
   </template>

   <script setup lang="ts">
   import SvgIcon from '@/components/SvgIcon/index.vue'
   </script>
   ```

7. 如果 vue 组件多了，都需要用图标，每个 vue 都需要引入，所以直接全局引入即可

   在 main.ts 引入一次

   ```typescript
   import SvgIcon from '@/components/SvgIcon/index.vue'
   // 注册为全局组件
   app.component('SvgIcon', SvgIcon)
   ```

   但是要用到各种功能的组件，每个都要全局注册在 main.ts 会非常麻烦，所以把以上代码删除掉，改为使用：

   ```typescript
   // 引入自定义插件对象：注册整个项目的全局组件
   import globalComponent from '@/components'
   // 安装自定义插件
   app.use(globalComponent)
   ```

   并在 components 下新建 index.ts

   ```typescript
   // 引入项目中全部的全局组件
   import SvgIcon from './SvgIcon/index.vue'
   // 全局组件对象
   const allGlobalComponent: any = { SvgIcon }

   export default {
     // 务必叫做 install 方法
     install(app: any) {
       // 注册项目全部的全局组件
       Object.keys(allGlobalComponent).forEach((key) => {
         app.component(key, allGlobalComponent[key])
       })
     },
   }
   ```

---

### sass 集成 --全局样式

1. 因为已经在 stylelint 的部分安装过 sass 了，可以直接用

   ```vue
   <style scoped lang="sass"></style>
   ```

2. 为项目添加一些全局样式

   在 main.ts 中引入全局样式

   ```typescript
   // 引入全局样式
   import '@/styles/index.scss'
   ```

   在 src / styles 文件夹，新建 reset.scss，用来从官网上拷贝清楚默认样式的模板

   ```
   官网地址为：复制代码代词文件内
   https://www.npmjs.com/package/reset.scss?activeTab=code
   ```

   在 src 下新建 styles 文件夹，创建一个 index.scss，引入清除默认样式

   ```scss
   // 引入清除默认样式
   @import './reset.scss';

   // 滚动条外观设置
   ::-webkit-scrollbar {
     width: 10px;
   }
   ::-webkit-scrollbar-track {
     background: $base-menu-background;
   }
   ::-webkit-scrollbar-thumb {
     width: 10px;
     background-color: yellowgreen;
     border-radius: 10px;
   }
   ```

3. 发现在全局样式文件中无法使用 $ 变量，因此需要给项目引入全局变量 $

   在 vite.config.ts 文件配置

   ```typescript
   export default defineConfig({
     css: {
       preprocessorOptions: {
         scss: {
           javascriptEnabled: true,
           additionalData: '@import "./src/styles/variable.scss";',
         },
       },
     },
   })
   ```

4. 在 src / styles 下新建 variable.scss 文件，以后在此文件内定义全局变量即可。

   ```scss
   // 项目提供 scss 全局变量
   // 左侧菜单宽度
   $base-menu-width: 260px;
   // 左侧菜单背景色
   $base-menu-background: #001529;
   // 顶部导航的高度
   $base-tabbar-height: 50px;
   ```

   配置完毕你会发现 scss 提供这些全局变量可以在组件样式中使用了

---

### mock --接口

1. 安装（请使用 2.9.6 版本）

   ```
   pnpm install -D vite-plugin-mock@2.9.6 mockjs
   ```

2. 在 vite.config.js 配置文件启用插件，把以前的配置对象改为箭头函数 + return 形式，完整版：

   ```typescript
   import { viteMockServe } from 'vite-plugin-mock'

   export default defineConfig(({ command }) => {
     return {
       plugins: [
         vue(),
         createSvgIconsPlugin({
           iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
           symbolId: 'icon-[dir]-[name]',
         }),
         viteMockServe({
           localEnabled: command === 'serve',// 保证开发阶段可使用 mock 接口
         })
       ],
       ...
     }
   })
   ```

3. 在根目录下创建 mock / user.ts 用于提供接口

   ```typescript
   // createUserList 返回数组，包含两个用户的信息
   function createUserList() {
     return [
       {
         userId: 1,
         avatar:
           'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
         username: 'admin',
         password: '111111',
         desc: '平台管理员',
         roles: ['平台管理员'],
         buttons: ['cuser.detail'],
         routes: ['home'],
         token: 'Admin Token',
       },
       {
         userId: 2,
         avatar:
           'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
         username: 'system',
         password: '111111',
         desc: '系统管理员',
         roles: ['系统管理员'],
         buttons: ['cuser.detail', 'cuser.user'],
         routes: ['home'],
         token: 'System Token',
       },
     ]
   }

   // 对外暴露一个数组，包含两个接口：登录接口 + 获取用户信息
   export default [
     // 用户登录接口
     {
       url: '/api/user/login', //请求地址
       method: 'post', //请求方式
       response: ({ body }) => {
         //获取请求体携带过来的用户名与密码
         const { username, password } = body
         //调用获取用户信息函数,用于判断是否有此用户
         const checkUser = createUserList().find(
           (item) => item.username === username && item.password === password,
         )
         //没有用户返回失败信息
         if (!checkUser) {
           return { code: 201, data: { message: '账号或者密码不正确' } }
         }
         //如果有返回成功信息
         const { token } = checkUser
         return { code: 200, data: { token } }
       },
     },
     // 获取用户信息
     {
       url: '/api/user/info',
       method: 'get',
       response: (request) => {
         //获取请求头携带token
         const token = request.headers.token
         //查看用户信息是否包含有次token用户
         const checkUser = createUserList().find((item) => item.token === token)
         //没有返回失败的信息
         if (!checkUser) {
           return { code: 201, data: { message: '获取用户信息失败' } }
         }
         //如果有返回成功信息
         return { code: 200, data: { checkUser } }
       },
     },
   ]
   ```

---

### axios --二次封装

axios 需要二次封装，目的是请求拦截器和响应拦截器

1. 安装

   ```
   pnpm install axios
   ```

2. 在 src 下新建 utils 文件夹，用于存放工具型文件

   src / utils / request.ts

   ```typescript
   // 进行 axios 的二次封装
   import axios from 'axios'
   import { ElMessage } from 'element-plus'

   // 利用 axios 对象的 create 方法，创建 axios 实例（可做其他配置: 基础路径，超时时间）
   let request = axios.create({
     baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径上会携带 /api
     timeout: 5000, // 超时时间
   })
   // 为 axios 实例 request 添加请求拦截器与响应拦截器
   request.interceptors.request.use((config) => {
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
   ```

---

### api --接口数据类型与方法

项目接口可能很多，需要统一管理。

1. src 下新建 api 文件夹，api 下新建 user 和 product 和 acl 文件夹

   src / user / type.ts

   ```typescript
   // 定义数据类型
   // 登录接口需要携带的参数 ts 类型
   export interface loginForm {
     username: string
     password: string
   }
   // 登录接口返回的数据类型
   interface dataType {
     token?: string
     message?: string
   }
   export interface loginResponseData {
     code: number
     data: dataType
   }

   // 服务器返回用户信息相关的数据类型
   interface userInfo {
     userId: number
     avatar: string
     username: string
     password: string
     desc: string
     roles: string[]
     buttons: string[]
     routes: string[]
     token: string
   }
   interface user {
     checkUser: userInfo
   }
   export interface userResponseData {
     code: number
     data: user
   }
   ```

2. src / user / index.ts

   ```typescript
   // 统一管理项目用户相关接口
   import request from '@/utils/request'
   import type { loginForm, loginResponseData, userResponseData } from './type'
   // 统一管理接口 - 枚举
   enum API {
     LOGIN_URL = '/user/login',
     USERINFO_URL = '/user/info',
   }
   // 对外暴露
   // 登录接口方法
   export const reqLogin = (data: loginForm) =>
     request.post<any, loginResponseData>(API.LOGIN_URL, data)
   // 获取用户信息方法
   export const reqUserInfo = () =>
     request.get<any, userResponseData>(API.USERINFO_URL)
   ```

---

### pinia --数据仓库

1. 安装

   ```
   pnpm i pinia
   ```

2. src / store / index.ts 作为大仓库

   ```typescript
   // 仓库
   import { createPinia } from 'pinia'
   // 创建大仓库
   let pinia = createPinia()
   // 对外暴露，入口文件需安装仓库
   export default pinia
   ```

3. 入口文件 main.ts 引入

   ```typescript
   // 引入仓库
   import pinia from './store'
   // 安装仓库
   app.use(pinia)
   ```

4. src / store 下新建 modules / user.ts，作为用户小仓库

   ```typescript
   // 创建用户相关小仓库
   import { defineStore } from 'pinia'
   // 引入接口
   import { reqLogin } from '@/api/user'
   // 引入数据类型
   import type { loginForm, loginResponseData } from '@/api/user/type'
   import type { UserState } from './types/type'
   // 引入操作本地存储的工具方法
   import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
   // 创建小仓库
   let useUserStore = defineStore('User', {
     // 存储数据
     state: (): UserState => {
       return {
         token: GET_TOKEN(), // 用户唯一标识 token
       }
     },
     // 处理异步|逻辑
     actions: {
       // 用户登录的方法
       async userLogin(data: loginForm) {
         // 发送登录请求
         let result: loginResponseData = await reqLogin(data)
         if (result.code == 200) {
           // 登陆成功 200 - 返回 token - 存储
           // pinia 仓库存储 token
           this.token = result.data.token as string
           SET_TOKEN(result.data.token as string)
           // 保证当前 async 函数返回一个成功的 Promise
           return 'ok'
         } else {
           // 登录失败 201 - 登录失败错误信息
           return Promise.reject(new Error(result.data.message))
         }
       },
     },
     getters: {},
   })
   // 对外暴露
   export default useUserStore
   ```

5. src / store / modules / types / type.ts

   ```typescript
   // 定义小仓库数据 state 类型
   export interface UserState {
     token: string | null
   }
   ```

6. src / utils / token.ts 把本地数据的方法封装在这里

   ```typescript
   // 封装本地存取数据与读取数据的方法
   // 存储数据
   export const SET_TOKEN = (token: string) => {
     localStorage.setItem('TOKEN', token)
   }
   // 本地存储获取数据
   export const GET_TOKEN = () => {
     return localStorage.getItem('TOKEN')
   }
   ```

7. src / utils / time.ts 把获取当前时间的方法写入

   ```typescript
   // 封装函数获取当前时间是上午、下午、晚上
   export const getTime = () => {
     let message = ''
     let hours = new Date().getHours()
     if (hours < 9) {
       message = '早上'
     } else if (hours <= 12) {
       message = '上午'
     } else if (hours <= 18) {
       message = '下午'
     } else {
       message = '晚上'
     }
     return message
   }
   ```

---

### router --路由

一级路由有登录界面，主页和404界面

1. 安装

   ```
   pnpm install vue-router
   ```

2. src / router / routes.ts

   ```typescript
   // 对外暴露配置路由(常量路由)
   export const constantRoute = [
     {
       // 登录
       path: '/login',
       component: () => import('@/views/login/index.vue'),
       name: 'login', // 命名路由
     },
     {
       // 登陆成功展示数据的路由
       path: '/',
       component: () => import('@/layout/index.vue'),
       name: 'layout',
     },
     {
       // 404
       path: '/404',
       component: () => import('@/views/404/index.vue'),
       name: '404',
     },
     {
       // 任意路由 - 以上都未匹配访问此路由
       path: '/:pathMatch(.*)*',
       redirect: '/404',
       name: 'Any',
     },
   ]
   ```

3. src 下新建 router / index.ts，实现模板路由配置

   ```typescript
   // vue-router 模板路由配置
   import { createRouter, createWebHashHistory } from 'vue-router'
   import { constantRoute } from './routes'
   // 创建路由器
   let router = createRouter({
     // 路由模式 - 哈希
     history: createWebHashHistory(),
     routes: constantRoute,
     // 滚动行为
     scrollBehavior() {
       return {
         left: 0,
         top: 0,
       }
     },
   })
   export default router
   ```

4. 在 src / mian.ts 注册路由

   ```typescript
   // 引入路由
   import router from './router'
   // 注册模板路由
   app.use(router)
   ```

   之后就可以在 App 根组件使用 `<router-view>` 使用路由了

   把图片资源拷贝到 src / assets / images 下

---

## 细节

### 首页

1. 主页左侧已经选中某一个路由后，刷新页面会回到所有菜单都收起的状态，希望刷新后仍然保留上次的页面

   **解决办法：**

   在布局 layout 文件夹下的 index.vue 内引入 vue-router 并获取路由对象，路由对象可以获取 url 上的地址

   ```typescript
   // 获取路由对象
   import { useRoute } from 'vue-router'

   // 获取路由对象
   let $route = useRoute()
   ```

   并为 `<el-menu>` 标签添加 `default-active` 属性，传入 url 地址

   ```html
   <el-menu
     :default-active="$route.path"
     background-color="#001529"
     text-color="white"
   >
     <!-- 根据路由动态生成菜单 -->
     <menu :menuList="userStore.menuRoutes"></menu>
   </el-menu>
   ```

   这样就可以刷新仍然保留了。使用的是 element-plus 自带的 API：默认激活菜单的唯一标识

---

2. 点击顶部的菜单图标，切换图标并收起左侧，再次点击展开左侧

   **解决办法：**

   **定义一个 boolean 的响应式数据**

   因为这个响应式 boolean 决定了图标变化，左侧栏展开 / 折叠，右侧栏显示区域，涉及到三个组件共用一个数据，所以使用 pinia。

   创建仓库 src / store / modules / setting.ts

   ```typescript
   // 小仓库：layout 组件配置仓库
   import { defineStore } from 'pinia'

   let useLayoutSettingStore = defineStore('SettingStore', {
     state: () => {
       return {
         fold: false, // 用于控制菜单折叠 / 展开的控制
       }
     },
   })
   export default useLayoutSettingStore
   ```

   **对于点击切换图标：**使用 component 组件 + is 以控制显示的图标状态。

   layout / tabbar / breadcrumb / index.vue

   ```vue
   <template>
     <!-- 顶部左侧静态 -->
     <el-icon style="margin-right: 10px;" @click="changeIcon">
       <!-- conponent 组件可以动态加载相应组件，使用 is 转写字符串 -->
       <component :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
     </el-icon>
     <!-- ... -->
   </template>

   <script setup lang="ts">
   // 从仓库中引入 fold
   import useLayOutSettingStore from '@/store/modules/setting'
   // 获取 Layout 配置相关仓库
   let LayOutSettingStore = useLayOutSettingStore()
   const changeIcon = () => {
     LayOutSettingStore.fold = !LayOutSettingStore.fold // 切换图标
   }
   </script>
   ```

   **对于点击收起左侧区域大小：**

   在 layout 组件下引入仓库（src / layout / index.vue）

   根据仓库的 fold 值动态添加 fold 类名以控制宽度

   菜单区域变小后，还要设置折叠属性（否则能看见小箭头，element-plus 提供的 API），根据仓库的 fold 值动态修改。

   ```vue
   <template>
     <div class="layout_container">
       <!-- 左侧菜单 -->
       <!-- 动态添加 fold 类，根据仓库的 fold 值 -->
       <div
         class="layout_slider"
         :class="{ fold: LayOutSettingStore.fold ? true : false }"
       >
         <!-- ... -->
         <el-scrollbar class="scrollbar">
           <!-- 菜单组件 -->
           <!-- elem-plus menu 有个 collapse 属性，控制折叠收起菜单 -->
           <el-menu :collapse="LayOutSettingStore.fold ? true : false" ...>
             <!-- ... -->
           </el-menu>
         </el-scrollbar>
       </div>
       <!-- 顶部导航 -->
       <div
         class="layout_tabbar"
         :class="{ fold: LayOutSettingStore.fold ? true : false }"
       >
         <!-- ... -->
       </div>
       <!-- 内容展示区域 -->
       <div
         class="layout_main"
         :class="{ fold: LayOutSettingStore.fold ? true : false }"
       >
         <!-- ... -->
       </div>
     </div>
   </template>
   <script>
   /* ... */
   import useLayOutSettingStore from '@/store/modules/setting'
   // 获取 Layout 配置仓库
   let LayOutSettingStore = useLayOutSettingStore()
   /* ... */
   </script>

   <style scoped lang="scss">
   .layout_container {
     /* ... */

     .layout_slider {
       /* ... */
       transition: all 0.3s; // 添加过渡动画

       .scrollbar {
         /* ... */
       }

       &.fold {
         width: $base-menu-min-width; // 50px,定义成全局css变量了
       }
     }

     .layout_tabbar {
       /* ... */
       transition: all 0.3s;

       &.fold {
         width: calc(100vw - $base-menu-min-width);
         left: $base-menu-min-width; // 宽度与 left 都要改
       }
     }

     .layout_main {
       /* ... */
       transition: all 0.3s;

       &.fold {
         width: calc(100vw - $base-menu-min-width);
         left: $base-menu-min-width; // 宽度与 left 都要改
       }
     }
   }
   </style>
   ```

---

3. 顶部面包屑动态显示当前的分支，比如点击左侧分支，顶部面包屑显示 “权限管理 > 用户管理”

   **解决办法：**

   在布局 layout 文件夹下的面包屑组件 tabbar / breadcrumb 下的 index.vue 内引入 vue-router 并获取路由对象，路由对象可以获取 匹配到的路由（$route.matched 属性）

   点击顶部实现跳转使用的是 element-plus 自带的面包屑 API，添加 to 属性即可。

   （这里权限管理下有用户管理、角色管理、菜单管理，点击权限管理右侧就空了，不好看，需要在配置路由的地方为一级路由配置重定向，重定向到二级路由的第一个，即用户管理，这样点击权限管理就会默认进度第一个子项了。）

   ```vue
   <template>
     <!-- ... -->
     <!-- 左侧面包屑 - elem-plus 封装好的 -->
     <el-breadcrumb separator-icon="ArrowRight">
       <!-- 面包屑需动态展示名字与标题 使用 v-for 动态生成 -->
       <!-- v-show 用来隐藏 [空格] > 首页 这种情况 -->
       <el-breadcrumb-item
         v-for="(item, index) in $route.matched"
         :key="index"
         v-show="item.meta.title"
         :to="item.path"
       >
         <!-- 图标 -->
         <el-icon>
           <component :is="item.meta.icon"></component>
         </el-icon>
         <!-- 面包屑展示匹配路由的标题 -->
         <span style="vertical-align: top;">{{ item.meta.title }}</span>
       </el-breadcrumb-item>
     </el-breadcrumb>
   </template>

   <script setup lang="ts">
   /* ... */
   import { useRoute } from 'vue-router'
   // 引入路由对象
   let $route = useRoute()
   /* ... */
   </script>
   ```

---

4. 刷新按钮功能，点击按钮，下方重新渲染。

   **解决办法：**

   在用户仓库里新建一个 refsh 的 boolean 属性，涉及组件通信，点击按钮就对仓库的 refsh 取反。

   下方组件监听（使用 watch）这个 refsh 的变化，销毁展示内容（使用 flag 值加 v-if 控制销毁与展示），并重新渲染（使用 nextTick 精确控制）。

   src / layout / tabbar / setting / index.vue（顶部右侧组件）

   ```vue
   <template>
     <!-- 刷新按钮 -->
     <el-button
       size="small"
       icon="Refresh"
       circle
       @click="updateRefsh"
     ></el-button>
     <!-- ... -->
   </template>

   <script setup lang="ts">
   // 获取骨架的小仓库
   import useLayOutSettingStore from '@/store/modules/setting'
   let layoutSettingStore = useLayOutSettingStore()
   // 刷新按钮点击回调
   const updateRefsh = () => {
     layoutSettingStore.refsh = !layoutSettingStore.refsh // 对仓库值取反
   }
   </script>
   ```

   src / layout / main / index.vue（下方主要区域组件）

   ```vue
   <template>
     <!-- 路由组件出口的位置 -->
     <router-view v-slot="{ Component }">
       <transition name="fade">
         <!-- 渲染 layout 一级路由组件的子路由 -->
         <component :is="Component" v-if="flag" />
       </transition>
     </router-view>
   </template>

   <script setup lang="ts">
   import useLayOutSettingStore from '@/store/modules/setting'
   import { watch, ref, nextTick } from 'vue'
   let LayOutSettingStore = useLayOutSettingStore()

   // 控制当前组件是否销毁重建
   let flag = ref(true)
   // 监听仓库内部数据是否发生变化
   watch(
     () => LayOutSettingStore.refsh,
     () => {
       // 点击刷新按钮，路由组件销毁
       flag.value = false
       // 响应式数据发生变化且 DOM 更新完毕，重新渲染
       nextTick(() => {
         flag.value = true
       })
     },
   )
   </script>
   ```

---

5. 点击按钮全屏

   **解决办法：**利用 DOM 自带的属性和方法

   src / layout / tabbar / setting / index.vue

   ```vue
   <template>
     <!-- ... -->
     <el-button
       size="small"
       icon="FullScreen"
       circle
       @click="fullScreen"
     ></el-button>
     <!-- ... -->
   </template>

   <script setup lang="ts">
   /* ... */
   // 全屏按钮点击回调
   const fullScreen = () => {
     // 这个 DOM 属性，如果是全屏返回 true，否则返回 false
     let full = document.fullscreenElement
     if (!full) {
       document.documentElement.requestFullscreen() // 切换为全屏
     } else {
       document.exitFullscreen() // 退出全屏
     }
   }
   </script>
   ```

---

6. 右上角显示账号信息

   TOKEN：登录成功后，后台会返回 TOKEN（用户唯一标识，有效时间内可以用 TOKEN 告诉服务器直接获取此用户的数据）

   **解决办法：**在首页挂载时，用 TOKEN 获取用户信息，把用户信息存储到用户仓库中。

   **配置阶段：**

   定义用户名和头像的类型（src / store / modules / types / type.ts）

   ```typescript
   import type { RouteRecordRaw } from 'vue-router'

   // 定义小仓库数据 state 类型
   export interface UserState {
     /* ... */
     username: string
     avatar: string
   }
   ```

   用户仓库中添加获取用户信息的方法（src / store / modules / user.ts）

   ```typescript
   /* ... */
   // 引入接口
   import { ..., reqUserInfo } from '@/api/user'
   /* ... */
   let useUserStore = defineStore('User', {
     state: (): UserState => {
       return {
         /* ... */
         username: '',
         avatar: '',
       }
     },
     actions: {
       /* ... */
       // 获取用户信息方法
       async userInfo() {
         // 把 [用户头像, 用户名字] 存储到仓库当中
         let result = await reqUserInfo()
         if (result.code === 200) { // 获取用户信息成功，存储用户信息
           this.username = result.data.checkUser.username
           this.avatar = result.data.checkUser.avatar
           return 'ok'
         } else { // 获取用户信息失败
   		return Promise.reject('获取用户信息失败')
         }
       }
     },
     ...
   })
   ```

   首页挂载完毕发送请求获取用户信息（src / views / home / index.vue）

   ```vue
   <script setup lang="ts">
   // 引入生命周期函数
   import { onMounted } from 'vue'
   // 引入仓库
   import useUserStore from '@/store/modules/user'
   let userStore = useUserStore()
   // 首页挂载完毕发送请求获取用户信息
   onMounted(() => {
     userStore.userInfo() // 使用仓库的 userInfo 方法
   })
   </script>
   ```

   在请求拦截器处，从用户仓库获取 TOKEN，登陆成功后携带给服务器（src / utils / request.ts）

   ```typescript
   // 引入用户相关仓库
   import useUserStore from '@/store/modules/user'
   /* ... */
   request.interceptors.request.use((config) => {
     // 在请求拦截器处添加获取用户仓库 TOKEN 的方法，登陆成功后携带给服务器
     let userStore = useUserStore()
     if (userStore.token) {
       config.headers.token = userStore.token
     }
     // config 配置对象有 headers 请求头，经常用来给服务器端携带公共参数
     /* ... */
     // 返回配置对象
     return config
   })
   /* ... */
   ```

   **接下来是渲染**

   从仓库获取名字和头像并渲染（src / layout / tabbar / setting / index.vue）

   ```vue
   <template>
     <!-- ... -->
     <!-- 获取用户头像并渲染 -->
     <img
       :src="userStore.avatar"
       style="width: 24px; height: 24px; margin: 0 10px"
       alt=""
     />
     <!-- 下拉菜单 -->
     <el-dropdown>
       <!-- 获取用户名字并渲染 -->
       <span class="el-dropdown-link">
         {{ userStore.username }}
         <!-- ... -->
       </span>
       <!-- ... -->
     </el-dropdown>
   </template>

   <script setup lang="ts">
   /* ... */
   // 获取用户相关小仓库
   import useUserStore from '@/store/modules/user'

   let userStore = useUserStore()
   /* ... */
   </script>
   ```

---

7. 退出登录

   **解决办法：**

   向服务器发送请求（告诉服务器这个 TOKEN 不要了），清空用户仓库数据（名字，头像）

   在工具包中添加清除本地数据中 token 的方法（src / utils / token.ts）

   ```typescript
   /* ... */
   // 本地存储删除数据
   export const REMOVE_TOKEN = () => {
     localStorage.removeItem('TOKEN')
   }
   ```

   为用户仓库添加清空数据的方法（src / store / modules / user.ts）

   ```typescript
   // 引入操作本地存储的工具方法
   import { ..., REMOVE_TOKEN } from '@/utils/token'

   let useUserStore = defineStore('User', {
     state: (): UserState => {
       return {
         token: GET_TOKEN(),
         /* ... */
         username: '',
         avatar: '',
       }
     },
     // 处理异步|逻辑
     actions: {
       /* ... */
       // 退出登录
       userLogout() {
         // 目前没有 mock 接口 - 退出登录接口（通知服务器让 token 失效）
         this.token = ''
         this.username = ''
         this.avatar = ''
         REMOVE_TOKEN() // 清除本地数据中的 token
       }
     },
     ...
   })
   ```

   为退出登录按钮绑定方法，引入路由，调用用户仓库中清除数据的方法并跳转页面（src / layout / tabbar / setting / index.vue）

   ```vue
   <template>
     ...
     <!-- 下拉菜单 -->
     <el-dropdown>
       ...
       <template #dropdown>
         <el-dropdown-menu>
           <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
         </el-dropdown-menu>
       </template>
     </el-dropdown>
   </template>

   <script setup lang="ts">
   import useUserStore from '@/store/modules/user'
   import { useRouter } from 'vue-router'
   /* ... */
   let userStore = useUserStore()
   // 获取路由器对象
   let $router = useRouter()
   /* ... */
   // 退出登录点击回调
   const logout = () => {
     // 向服务器发请求（退出登录接口 - 占位）
     // 仓库清空用户数据
     userStore.userLogout()
     // 跳转到登录页面
     $router.push({ path: '/' })
   }
   </script>
   ```

---

### 路由问题

1. 路由鉴权

   用户没登录时，只能访问 login 路由，用户登录后，能访问主要路由，而不能访问 login 路由。

   **解决办法：**

   创建路由鉴权文件（src / permission.ts）

   ```typescript
   // 路由鉴权（项目中路由的访问权限）
   import router from '@/router'
   // 引入 pinia - 为了引入用户仓库
   import pinia from './store'
   import setting from './setting'
   // 获取用户仓库 - 判断用户是否登录成功
   import useUserStore from './store/modules/user'

   let userStore = useUserStore(pinia)

   // 全局守卫：项目中任意路由切换都会触发的钩子
   // 全局前置守卫
   router.beforeEach(async (to, from, next) => {
     // 访问某一路由之前触发
     // to: 将访问哪个路由, from: 从哪个路由来, next: 路由放行函数
     document.title = setting.title + '-' + to.meta.title // 浏览器上的标题
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
   router.afterEach((to, from) => {
     // 访问某一路由之后触发
   })
   ```

   并在入口文件引入（src / main.ts）

   ```typescript
   /* ... */
   // 引入路由鉴权文件
   import './permission'
   /* ... */
   ```

---

2. 点击标签，上面有进度条

   **解决办法：**

   下载插件

   ```shell
   pnpm i nprogress
   ```

   在路由鉴权文件导入插件并使用（src / premission.ts）

   ```typescript
   /* ... */
   // 引入进度条
   import nprogress from 'nprogress'
   // 引入进度条样式
   import 'nprogress/nprogress.css'
   nprogress.configure({ showSpinner: false }) // 取消进度条时鼠标加载的圆球
   router.beforeEach((to, from, next) => {
     // 进度条开始
     nprogress.start()
     /* ... */
   })

   // 全局后置守卫
   router.afterEach((to, from) => {
     // 进度条消失
     nprogress.done()
     /* ... */
   })
   ```

   想改样式去 node_modules 的 nprogress 内改 css 样式即可

---

### 商品管理 - 品牌管理

![](./\src\assets\images\md\trademark.png)

1. 品牌管理页面的基本框架

   **解决办法：**

   定义品牌数据类型（src / api / product / trademark / type.ts）

   ```typescript
   // 定义响应数据的类型
   export interface ResponseData {
     code: number
     message: string
     ok: boolean
   }

   // 定义已有品牌 ts 类型
   export interface TradeMark {
     id?: number
     tmName: string
     logoUrl: string
   }
   // 定义全部品牌数据的 ts 类型
   export type Records = TradeMark[]
   // 获取已有全部品牌的数据
   export interface TradeMarkResponseData extends ResponseData {
     data: {
       records: Records
       total: number
       size: number
       current: number
       searchCount: boolean
       pages: number
     }
   }
   ```

   定义品牌管理接口，定义发送获取数据的方法（src / api / product / trademark / index.ts）

   ```typescript
   // 品牌管理模块接口
   import request from '@/utils/request'
   // 引入 ts 类型
   import type { TradeMarkResponseData } from './type'
   // 品牌管理模块接口地址
   enum API {
     // 获取已有品牌接口
     TRADEMARK_URL = '/admin/product/baseTrademark/',
   }
   // 获取已有品牌方法
   // page: 获取第几页（默认第一页）, limit: 获取几个已有品牌数据
   export const reqHasTrademark = (page: number, limit: number) =>
     request.get<any, TradeMarkResponseData>(
       API.TRADEMARK_URL + `${page}/${limit}`,
     )
   ```

   完成商品管理静态页面（src / views / product / trademark / index.vue）

   与服务器交互渲染数据，主要使用 element-plus 的组件 API，请重点看注释

   ```vue
   <template>
     <div>
       <!-- 带阴影的卡片 -->
       <el-card class="box-card">
         <!-- 卡片顶部添加品牌按钮 -->
         <el-button type="primary" size="default" icon="Plus">
           添加品牌
         </el-button>
         <!-- 表格组件 - 展示数据 -->
         <!-- table - border 表示纵向变宽 -->
         <el-table style="margin:10px 0px" border :data="trademarkArr">
           <!-- column - label 表示标题, width 设置列宽， align 对齐方式 -->
           <el-table-column
             label="序号"
             width="80px"
             align="center"
             type="index"
           ></el-table-column>
           <el-table-column label="品牌名称">
             <!-- column 列可以直接上 prop 属性，会默认用 div 展示数据，也可以用插槽实现其他结构 -->
             <!-- row 是回传的对象元素， -->
             <template #="{ row, $index }">
               <pre style="color:brown">{{ row.tmName }}</pre>
             </template>
           </el-table-column>
           <el-table-column label="品牌LOGO">
             <template #="{ row, $index }">
               <img
                 :src="row.logoUrl"
                 alt="暂无图片"
                 style="width:100px;height:100px;"
               />
             </template>
           </el-table-column>
           <el-table-column label="品牌操作">
             <template #="{ row, $index }">
               <el-button type="primary" size="small" icon="Edit"></el-button>
               <el-button type="primary" size="small" icon="Delete"></el-button>
             </template>
           </el-table-column>
         </el-table>
         <!-- 分页器 -->
         <!-- 
           current-change 分页器页码变化时触发事件
           size-change 分页器下拉菜单变化时触发此方法
           :pager-count 显示的页码个数
           v-model:current-page 当前页码, 
           v-model:page-size 每页数据条数,
           :page-sizes 设置下拉菜单数据,
           :background 按钮背景色,
           layout 设置分液器六个子组件布局
           -->
         <el-pagination
           @current-change="getHasTrademark"
           @size-change="sizeChange"
           :pager-count="9"
           v-model:current-page="pageNo"
           v-model:page-size="limit"
           :page-sizes="[3, 5, 7, 9]"
           :background="true"
           layout="prev, pager, next, jumper,->,sizes, total"
           :total="total"
         />
       </el-card>
     </div>
   </template>

   <script setup lang="ts">
   import { ref, onMounted } from 'vue'
   import { reqHasTrademark } from '@/api/product/trademark/index'
   // 引入数据类型
   import type {
     Records,
     TradeMarkResponseData,
   } from '@/api/product/trademark/type'
   let pageNo = ref<number>(1) // 当前页码
   let limit = ref<number>(3)
   // 存储已有品牌总数
   let total = ref<number>(0)
   // 存储已有品牌数据
   let trademarkArr = ref<Records>([])
   // 获取已有品牌接口封装为函数
   // 当页码发生变化时，组件 pagination 父组件回传了数据（当前的页码及）
   const getHasTrademark = async (pager = 1) => {
     pageNo.value = pager
     let result: TradeMarkResponseData = await reqHasTrademark(
       pageNo.value,
       limit.value,
     )
     if (result.code === 200) {
       total.value = result.data.total
       trademarkArr.value = result.data.records
     }
   }
   // 组件挂载玩就要发一次请求
   onMounted(() => {
     getHasTrademark()
   })
   // 下拉菜单反生变化时触发此方法
   const sizeChange = () => {
     // 页码发生变化时，当前页码归 1
     getHasTrademark()
   }
   </script>
   ```

---

2. 添加品牌与修改品牌业务

   点击添加品牌弹出对话框

   **解决办法：**

   点击添加发送数据，添加接口（src / api / product / trademark / index.ts）

   接口根据数据中有无 id，选择上传数据还是修改数据（这里很妙，看下面全是用 id 判断状态）

   ```typescript
   /* ... */
   import type { TradeMarkResponseData, TradeMark } from './type'

   enum API {
     /* ... */
     // 添加品牌
     ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
     // 修改已有品牌
     UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
   }
   /* ... */

   // 添加与修改品牌的接口方法
   export const reqAddOrUpdateTrademark = (data: TradeMark) => {
     if (data.id) {
       // 修改已有品牌数据
       return request.put<any>(API.UPDATETRADEMARK_URL, data)
     } else {
       // 新增品牌
       return request.post<any, any>(API.ADDTRADEMARK_URL, data)
     }
   }
   ```

   弹出对话框使用 element-plus Dialog API（src / views / product / trademark / index.vue）

   ```vue
   <template>
     <div>
       <el-card class="box-card">
         <!-- 卡片顶部添加品牌按钮 -->
         <el-button
           type="primary"
           size="default"
           icon="Plus"
           @click="addTrademark"
         >
           添加品牌
         </el-button>
         <el-table>
           <!-- ... -->
           <el-table-column label="品牌操作">
             <template #="{ row, $index }">
               <el-button
                 type="primary"
                 size="small"
                 icon="Edit"
                 @click="updateTrademark(row)"
               ></el-button>
               <el-button type="primary" size="small" icon="Delete"></el-button>
             </template>
           </el-table-column>
         </el-table>
         <!-- ... -->
       </el-card>
       <!-- 对话框组件: 添加品牌与修改已有品牌是弹出此结构 -->
       <!-- v-model 用来控制对话框显示与隐藏（boolean）, title 设置对话框左上角标题 -->
       <el-dialog
         v-model="dialogFormVisible"
         :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
       >
         <el-form style="width: 80%;">
           <!-- label-width 为了对齐 -->
           <el-form-item label="品牌名称" label-width="80px">
             <el-input
               placeholder="请输入品牌名称"
               v-model="trademarkParams.tmName"
             ></el-input>
           </el-form-item>
           <el-form-item label="品牌LOGO" label-width="80px">
             <!-- 结构由官网复制 -->
             <!-- 
               action 上传图片的请求地址(必须带/api/不然代理服务器不发送post请求)
               :show-file-list 是否显示文件上传列表
               :before-upload 上传文件之前的钩子（约束上传文件的类型和大小）
               :on-success 文件上传成功的钩子
              -->
             <el-upload
               class="avatar-uploader"
               action="/api/admin/product/fileUpload"
               :show-file-list="false"
               :on-success="handleAvatarSuccess"
               :before-upload="beforeAvatarUpload"
             >
               <img
                 v-if="trademarkParams.logoUrl"
                 :src="trademarkParams.logoUrl"
                 class="avatar"
               />
               <el-icon v-else class="avatar-uploader-icon">
                 <Plus />
               </el-icon>
             </el-upload>
           </el-form-item>
         </el-form>
         <!-- 传入具名插槽 footer - 为了提示框底部按钮 -->
         <template #footer>
           <el-button type="primary" size="default" @click="canncel">
             取消
           </el-button>
           <el-button type="primary" size="default" @click="confirm">
             确定
           </el-button>
         </template>
       </el-dialog>
     </div>
   </template>

   <script setup lang="ts">
   import { ref, ... , reactive } from 'vue'
   import { reqHasTrademark, reqAddOrUpdateTrademark } from '@/api/product/trademark/index'
   // 引入数据类型
   import type { Records, TradeMarkResponseData, TradeMark } from '@/api/product/trademark/type'
   import { ElMessage } from 'element-plus';

   /* ... */
   // 控制对话框显示与隐藏
   let dialogFormVisible = ref<boolean>(false)
   // 定义收集新增品牌数据
   let trademarkParams = reactive<TradeMark>({
     tmName: '',
     logoUrl: ''
   })
   // 获取已有品牌接口封装为函数
   // 当页码发生变化时，组件 pagination 父组件回传了数据（当前的页码）
   const getHasTrademark = async (pager = 1) => {
     pageNo.value = pager
     let result: TradeMarkResponseData = await reqHasTrademark(pageNo.value, limit.value)
     if (result.code === 200) {
       total.value = result.data.total
       trademarkArr.value = result.data.records
     }
   }
   // 组件挂载完就要发一次请求
   onMounted(() => {
     getHasTrademark()
   })
   // 下拉菜单反生变化时触发此方法
   const sizeChange = () => {
     // 页码发生变化时，当前页码归 1
     getHasTrademark()
   }
   // 添加品牌按钮回调
   const addTrademark = () => {
     dialogFormVisible.value = true // 对话框显示
     trademarkParams.tmName = '' // 清空收集数据
     trademarkParams.logoUrl = ''
     trademarkParams.id = 0 // 清空 id，要不然可能点添加品牌时显示修改品牌
   }
   // 修改品牌按钮回调
   const updateTrademark = (row: TradeMark) => {
     dialogFormVisible.value = true // 对话框显示
     trademarkParams.tmName = row.tmName // 展示已有品牌的数据
     trademarkParams.logoUrl = row.logoUrl
     trademarkParams.id = row.id // 还要收集 id，为了发给服务器
   }
   // 对话框底部取消按钮
   const canncel = () => {
     dialogFormVisible.value = false
     trademarkParams.tmName = ''
     trademarkParams.logoUrl = ''
   }
   // 对话框底部确定按钮
   const confirm = async () => {
     let result: any = await reqAddOrUpdateTrademark(trademarkParams) // 接口会根据有无 id 自动判断是新增还是修改
     if (result.code === 200) { // 添加品牌成功
       dialogFormVisible.value = false // 关闭对话框
       ElMessage({ // 提示消息
         type: 'success',
         message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功'
       })
       getHasTrademark(trademarkParams.id ? pageNo.value : 1) // 修改就留在当前页，添加就回到第一页
     } else {
       ElMessage({ // 提示消息
         type: 'error',
         message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败'
       })
       dialogFormVisible.value = false
     }
   }
   // 上传图片组件之前触发钩子函数 - 约束文件类型和大小
   const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
     // 上传文件类型为 png/jpg/gif 4M
     if (rawFile.type === 'image/png' || rawFile.type === 'image/jpeg' || rawFile.type === 'image/gif') {
       if (rawFile.size / 1024 / 1024 < 4) {
         return true
       } else {
         ElMessage({
           type: 'error',
           message: '上传文件的大小应小于4M'
         })
         return false
       }
     } else {
       ElMessage({
         type: 'error',
         message: '上传文件的格式为PNG|JPG|GIF'
       })
       return false
     }
   }
   // 图片上传成功触发钩子
   const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
     // response 是当前这次上传图片post请求服务器返回的数据
     trademarkParams.logoUrl = response.data
   }
   </script>
   <!-- style 由官网直接复制 -->
   <style scoped>
   .avatar-uploader .avatar {
     width: 178px;
     height: 178px;
     display: block;
   }
   </style>

   <style>
   .avatar-uploader .el-upload {
     border: 1px dashed var(--el-border-color);
     border-radius: 6px;
     cursor: pointer;
     position: relative;
     overflow: hidden;
     transition: var(--el-transition-duration-fast);
   }

   .avatar-uploader .el-upload:hover {
     border-color: var(--el-color-primary);
   }

   .el-icon.avatar-uploader-icon {
     font-size: 28px;
     color: #8c939d;
     width: 178px;
     height: 178px;
     text-align: center;
   }
   </style>
   ```

---

3. 表单校验

   当添加修改时，品牌名字数小于2或未上传图片时，提示错误无法上传。

   **解决办法：**

   参考 element-plus 官方文档，添加 :model 告诉 form 表单数据收集到了哪，添加 :rules 并编写校验规则，并做出大量细节处理，比如清空校验提示等。（src / views / product / trademark / index.vue）

   ```vue
   <template>
     <div>
       <el-card>
         <!-- ... -->
         <el-table>
           <!-- ... -->
           <el-table-column label="品牌操作">
             <template #="{ row, $index }">
               <el-button ... icon="Edit" @click="updateTrademark(row)"></el-button>
             </template>
           </el-table-column>
         </el-table>
       </el-card>
       <el-dialog>
         <!-- 为表单添加 :model 与 :rules -->
         <el-form style="width: 80%;" :model="trademarkParams" :rules="rules" ref="formRef">
           <!-- 添加校验规则 prop -->
           <el-form-item label="品牌名称" label-width="80px" prop="tmName">
             <!-- ... -->
           </el-form-item>
           <!-- 添加校验规则 prop -->
           <el-form-item label="品牌LOGO" label-width="80px" prop="logoUrl">
             <el-upload ... :on-success="handleAvatarSuccess">
               <!-- ... -->
             </el-upload>
           </el-form-item>
         </el-form>
         <!-- 传入具名插槽 footer - 为了提示框底部按钮 -->
         <template #footer>
           <!-- ... -->
           <el-button type="primary" size="default" @click="confirm">确定</el-button>
         </template>
       </el-dialog>
     </div>
   </template>
   <script setup lang="ts">
   import { ref, ... } from 'vue'
   /* ... */
   // 定义收集新增品牌数据
   let trademarkParams = reactive<TradeMark>({
     tmName: '',
     logoUrl: ''
   })
   // 获取 el-form 组件实例
   let formRef = ref()
   // 添加品牌按钮回调
   const addTrademark = () => {
     /* ... */
     formRef.value?.clearValidate('tmName') // 如果上次打开时有校验提示就清空
     formRef.value?.clearValidate('logoUrl')
   }
   // 修改品牌按钮回调
   const updateTrademark = (row: TradeMark) => {
     formRef.value?.clearValidate('tmName') // 情况校验规则的错误提示信息
     formRef.value?.clearValidate('logoUrl')
     /* ... */
   }
   // 对话框底部确定按钮
   const confirm = async () => {
     // 发请求之前要对表单进行校验 - validate() 是 elm-plus 提供的表单 API
     // 调用这个方法进行全部表单校验，若校验全部通过，才执行后面的语法
     await formRef.value.validate() // 失败后面语句不执行
     /* ... */
   }
   // 图片上传成功触发钩子
   const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
     /* ... */
     // 图片上传成功 - 清除掉图片校验结果
     formRef.value.clearValidate()
   }
   // 品牌校验自定义校验规则方法
   const validatorTmName = (rule: any, value: any, callBack: any) => {
     // 自定义校验规则 callBack 为放行函数
     if (value.trim().length >= 2) {
       callBack()
     } else {
       // 校验未通过返回错误提示
       callBack(new Error('品牌名称位数大于等于两位'))
     }
   }
   const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
     // 如果图片上传
     if (value) {
       callBack()
     } else {
       callBack(new Error('请上传Logo图片'))
     }
   }
   // 表单校验规则对象
   const rules = {
     tmName: [ // 一个对象代表一个规则
     // required 代表这个字段必须校验, trigger 代表触发校验的时机（取值为 blur / change）
       { required: true, trigger: 'blur', validator: validatorTmName }
     ],
     logoUrl: [
       { required: true, trigger: 'blur', validator: validatorLogoUrl }
     ]
   }
   ```

---

4. 删除业务

   点击删除按钮弹出气泡确认框，确认后删除

   **解决办法：**

   新增删除接口（src / api / product / trademark / index.ts）

   ```typescript
   import request from '@/utils/request'
   /* ... */
   enum API {
     /* ... */
     // 删除已有品牌
     DELETE_URL = '/admin/product/baseTrademark/remove/',
   }
   /* ... */

   // 删除某一已有品牌
   export const reqDeleteTrademark = (id: number) =>
     request.delete<any, any>(API.DELETE_URL + id)
   ```

   参考 element-plus 官方文档，点击删除按钮时弹出气泡确认框，

   ```vue
   <template>
     <div>
       <el-card>
         <!-- ... -->
         <el-table>
           <!-- ... -->
           <el-table-column label="品牌操作">
             <template #="{ row, $index }">
               <!-- 核心 -->
               <el-button ...></el-button>
               <el-popconfirm
                 :title="`你确定要删除${row.tmName}?`"
                 width="250px"
                 icon="Delete"
                 @confirm="removeTradeMark(row.id)"
               >
                 <template #reference>
                   <el-button
                     type="primary"
                     size="small"
                     icon="Delete"
                   ></el-button>
                 </template>
               </el-popconfirm>
             </template>
           </el-table-column>
         </el-table>
       </el-card>
       <!-- ... -->
     </div>
   </template>
   <script setup lang="ts">
   import { ref, ... } from 'vue'
   import { ... , reqDeleteTrademark } from '@/api/product/trademark/index'

   import { ElMessage } from 'element-plus';
   let pageNo = ref<number>(1) // 当前页码
   let trademarkArr = ref<Records>([]) // 存储已有品牌数据

   // 获取已有品牌接口封装为函数
   const getHasTrademark = async (pager = 1) => {
     /* ... */
   }
   // 气泡确认框确定回调
   const removeTradeMark = async (id: number) => {
     // 点击确定发送删除请求
     let result = await reqDeleteTrademark(id)
     if (result.code === 200) {
       // 删除成功提示
       ElMessage({
         type: 'success',
         message: '删除品牌成功'
       })
       // 再次获取已有品牌数据 - 如果刚好这页只有一项回到上一页
       getHasTrademark(trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
     } else {
       ElMessage({
         type: 'error',
         message: '删除品牌失败'
       })
     }
   }
   </script>
   ```

---

### 数据大屏

![](./\src\assets\images\md\screen.png)

【屏幕适配的解决办法】假如设计稿是 1920 \* 1080，就是常见的 16:9 屏幕。根据屏幕大小不同，**数据不能写死**

1. vw 与 vh --兼容IE8

   例如：

   ```html
   <style>
     .box {
         width: 100vw; // vw 表示视口宽度
         height: 100vh; // vh 表示视口高度
         background: orange;
     }
     .top {
         width: 5.2vw; // 由 100/19.2 算得（19.2由宽度1920/100得来）
         height: 9.26vh;
         background: skyblue;
         margin-left; 2.6vw;
         margin-top: 9.26vh;
     }
   </style>
   ```

   这种方法需要手动计算，但**文字不支持自适应**。

2. **CSS3 的 transform: scale( )**

   **transform: scale( )** 属性可以对元素进行缩放，里面填倍数

   可以参考一下函数获得缩放比例

   ```html
   <script>
     // 控制屏幕缩放
     let box = document.querySelector('.box')
     box.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
     // 计算缩放比例
     function getScale(w = 1920, h = 1080) {
       // w 与 h 为设计稿宽高
       const ww = window.innerWidth / w // 宽度比例 = 设备宽度 / 设计稿宽度
       const wh = window.innerHeight / h // 高度比例 = 设备高度 / 设计稿高度
       return ww < wh ? ww : wh // 谁的视口小用谁
     }
     // 浏览器窗口变化时触发
     window.onresize = () => {
       box.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
     }
   </script>
   ```

---

1. 数据大屏静态搭建

   先对 screen 屏幕设置 left 和 top，让左上角定位到屏幕中间。

   再用 getScale( ) 获得屏幕缩放比例，搭配 transform: scale() 对整体进行缩放，并用 transform: scale(-50%,-50%) 位移屏幕（左移动自己宽度高度的一半），同时对 screen 屏幕设置 transform-origin: left top; 定义位移时围绕左上角变化。

   ```vue
   <template>
     <div class="container">
       <!-- 数据大屏展示内容区域 -->
       <div class="screen" ref="screen">
         <div class="top">顶部</div>
         <div class="bottom">
           <div class="left">左侧</div>
           <div class="center"></div>
           <div class="right">右侧</div>
         </div>
       </div>
     </div>
   </template>

   <script setup lang="ts">
   import { ref, onMounted } from 'vue'
   // 获取数据大屏盒子的 DOM 元素
   let screen = ref()

   onMounted(() => {
     screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
   })
   // 定义大屏缩放比例
   function getScale(w = 1920, h = 1080) {
     const ww = window.innerWidth / w
     const wh = window.innerHeight / h
     return ww < wh ? ww : wh
   }
   // 监听视口变化(视口变化时触发)
   window.onresize = () => {
     screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
   }
   </script>

   <style scoped lang="scss">
   .container {
     width: 100vw;
     height: 100vh;
     background: url(./images/bg.png) no-repeat;
     background-size: cover;

     .screen {
       position: fixed;
       width: 1920px;
       height: 1080px;
       background: red;
       left: 50%;
       top: 50%;
       transform-origin: left top; // transform-origin 属性表示在对元素进行变换的时候，设置围绕哪个点进行变化的
     }
   }
   </style>
   ```

   之后按照画面把各部分组件化，再细分成各部分，比如把顶部分为左中右。

---

2. 顶部组件

   首页按钮使用 $router 绑定路由跳转

   当前时间使用插件：pnpm i moment

   ```vue
   <template>
     <div class="top">
       <div class="left">
         <span class="lbtn" @click="goHome">首页</span>
       </div>
       <div class="center">
         <div class="title">智慧旅游可视化大数据平台</div>
       </div>
       <div class="right">
         <span class="rbtn">统计报告</span>
         <span class="time">当前时间:{{ time }}</span>
       </div>
     </div>
   </template>

   <script setup lang="ts">
   import { useRouter } from 'vue-router'
   import { ref, onMounted, onBeforeMount } from 'vue'
   // 引入时间插件
   import moment from 'moment'
   // 获取路由器对象
   let $router = useRouter()
   // 存储当前时间
   let time = ref(moment().format('YYYY年MM月DD日 hh:mm:ss'))
   let timer = ref(0)
   const goHome = () => {
     $router.push('/home') // 点击首页跳转路由
   }
   // 组件挂载完毕实时更新当前时间
   onMounted(() => {
     timer.value = setInterval(() => {
       time.value = moment().format('YYYY年MM月DD日 hh:mm:ss')
     }, 1000)
   })
   // 组件销毁之前，清空定时器
   onBeforeMount(() => {
     clearInterval(timer.value)
   })
   </script>
   ```

---

3. 拓展组件的说明

   **左侧部分：**

   **水球图使用 echarts 官网没有的拓展插件**（npm 官网搜 echarts 能搜到）

   ```
   pnpm i echarts
   pnpm i echarts-liquidfill
   ```

   代码：具体配置可参考 npm 搜 echarts-liquidfill

   ```vue
   <template>
     <div class="box">
       <div class="top">
         <p class="title">实时游客统计</p>
         <p class="bg"></p>
         <p class="right">
           可预约总量
           <span>99999</span>
           人
         </p>
       </div>
       <div class="number">
         <span v-for="(item, index) in people" :key="index">{{ item }}</span>
       </div>
       <!-- 盒子将来 echarts 展示图表 -->
       <div class="charts" ref="charts">123</div>
     </div>
   </template>

   <script setup lang="ts">
   import { ref, onMounted } from 'vue'
   import * as echarts from 'echarts'
   // 水球图拓展插件
   import 'echarts-liquidfill'
   let people = ref('216908') // 人数 -写死
   let charts = ref()
   onMounted(() => {
     // 获取 echarts 类实例
     let mycharts = echarts.init(charts.value)
     // 设置实例的配置项
     mycharts.setOption({
       // 标题组件
       // title: {
       //     text: '水球图'
       // },
       // x|y轴组件
       // xAxis: {},
       // yAxis: {},
       // 系列：决定逆战是什么样的图形图标
       series: [
         {
           type: 'liquidFill', // 系列
           data: [0.6, 0.4, 0.2], // 展示的数据
           waveAnimation: true,
           animationDuration: 3,
           animationDurationUpdate: 0,
           radius: '80%', // 大小
           itemStyle: {
             shadowBlur: 0,
           },
         },
       ],
       grid: {
         left: 0,
         right: 0,
         top: 0,
         buttom: 0,
       },
     })
   })
   </script>
   ```

   **中间部分：**

   中国地图使用阿里云数据可视化平台的中国地图 json 文件

---
