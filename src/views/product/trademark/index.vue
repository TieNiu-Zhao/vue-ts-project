<template>
  <div>
    <!-- 带阴影的卡片 -->
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
      <!-- 表格组件 - 展示数据 -->
      <!-- table - border 表示纵向变宽 -->
      <el-table style="margin: 10px 0px" border :data="trademarkArr">
        <!-- column - label 表示标题, width 设置列宽， align 对齐方式 -->
        <el-table-column
          label="序号"
          width="80px"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column label="品牌名称">
          <!-- column 列可以直接上 prop 属性，会默认用 div 展示数据，也可以用插槽实现其他结构 -->
          <!-- row 是回传的对象元素(即当前已有品牌) -->
          <template #="{ row }">
            <pre style="color: brown">{{ row.tmName }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="品牌LOGO">
          <template #="{ row }">
            <img
              :src="row.logoUrl"
              alt="暂无图片"
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateTrademark(row)"
            ></el-button>
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
    <!-- 对话框组件: 添加品牌与修改已有品牌是弹出此结构 -->
    <!-- v-model 用来控制对话框显示与隐藏（boolean）, title 设置对话框左上角标题 -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
    >
      <el-form
        style="width: 80%"
        :model="trademarkParams"
        :rules="rules"
        ref="formRef"
      >
        <!-- label-width 为了对齐, prop 为要校验的属性 -->
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input
            placeholder="请输入品牌名称"
            v-model="trademarkParams.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
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
import { ref, onMounted, reactive } from 'vue'
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from '@/api/product/trademark/index'
// 引入数据类型
import type {
  Records,
  TradeMarkResponseData,
  TradeMark,
} from '@/api/product/trademark/type'
import { ElMessage } from 'element-plus'
import type { UploadProps, FormInstance, FormRules } from 'element-plus'
let pageNo = ref<number>(1) // 当前页码
let limit = ref<number>(3)
// 存储已有品牌总数
let total = ref<number>(0)
// 存储已有品牌数据
let trademarkArr = ref<Records>([])
// 控制对话框显示与隐藏
let dialogFormVisible = ref<boolean>(false)
// 定义收集新增品牌数据
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})
// 获取 el-form 组件实例
let formRef = ref<FormInstance>()
// 获取已有品牌接口封装为函数
// 当页码发生变化时，组件 pagination 父组件回传了数据（当前的页码）
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
// 添加品牌按钮回调
const addTrademark = () => {
  dialogFormVisible.value = true // 对话框显示
  trademarkParams.tmName = '' // 清空收集数据
  trademarkParams.logoUrl = ''
  trademarkParams.id = 0 // 清空 id，要不然可能点添加品牌时显示修改品牌
  formRef.value?.clearValidate('tmName') // 如果上次打开时有校验提示就清空
  formRef.value?.clearValidate('logoUrl')
}
// 修改品牌按钮回调
const updateTrademark = (row: TradeMark) => {
  formRef.value?.clearValidate('tmName') // 情况校验规则的错误提示信息
  formRef.value?.clearValidate('logoUrl')
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
  // 发请求之前要对表单进行校验 - validate() 是 elm-plus 提供的表单 API
  // 调用这个方法进行全部表单校验，若校验全部通过，执行后面的语法
  await formRef.value?.validate() // 失败后面语句不执行
  let result: any = await reqAddOrUpdateTrademark(trademarkParams) // 接口会根据有无 id 自动判断是新增还是修改
  if (result.code === 200) {
    // 添加品牌成功
    dialogFormVisible.value = false // 关闭对话框
    ElMessage({
      // 提示消息
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功',
    })
    getHasTrademark(trademarkParams.id ? pageNo.value : 1) // 修改就留在当前页，添加就回到第一页
  } else {
    ElMessage({
      // 提示消息
      type: 'error',
      message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败',
    })
    dialogFormVisible.value = false
  }
}
// 上传图片组件之前触发钩子函数 - 约束文件类型和大小
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // 上传文件类型为 png/jpg/gif 4M
  if (
    rawFile.type === 'image/png' ||
    rawFile.type === 'image/jpeg' ||
    rawFile.type === 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件的大小应小于4M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件的格式为PNG|JPG|GIF',
    })
    return false
  }
}
// 图片上传成功触发钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  // response 是当前这次上传图片post请求服务器返回的数据
  // uploadFile
  trademarkParams.logoUrl = response.data
  // 图片上传成功 - 清除掉图片校验结果
  formRef.value?.clearValidate()
}
// 品牌校验自定义校验规则方法
const validatorTmName = (value: any, callBack: any) => {
  // 自定义校验规则 callBack 为放行函数
  if (value.trim().length >= 2) {
    callBack()
  } else {
    // 校验未通过返回错误提示
    callBack(new Error('品牌名称位数大于等于两位'))
  }
}
const validatorLogoUrl = (value: any, callBack: any) => {
  // 如果图片上传
  if (value) {
    callBack()
  } else {
    callBack(new Error('请上传Logo图片'))
  }
}

// 表单校验规则对象
const rules: FormRules = {
  tmName: [
    // 一个对象代表一个规则
    // required 代表这个字段必须校验, trigger 代表触发校验的时机（取值为 blur / change）
    { required: true, trigger: 'blur', validator: validatorTmName },
  ],
  logoUrl: [{ required: true, trigger: 'blur', validator: validatorLogoUrl }],
}
// 气泡确认框确定回调
const removeTradeMark = async (id: number) => {
  // 点击确定发送删除请求
  let result = await reqDeleteTrademark(id)
  if (result.code === 200) {
    // 删除成功提示
    ElMessage({
      type: 'success',
      message: '删除品牌成功',
    })
    // 再次获取已有品牌数据
    getHasTrademark(
      trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1,
    )
  } else {
    ElMessage({
      type: 'error',
      message: '删除品牌失败',
    })
  }
}
</script>
<!-- 由官网复制 -->
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
