<script setup lang="ts">
import { useRequest } from 'alova'
import { getDepartmentList } from '../../api/methods/organization'
import { reactive, ref, toRaw, watch } from 'vue'
import type { DepartmentList, WebsiteBaseInfo } from '../../types/response-data-model.d.ts'
import type { NewWebsiteForm, ChangeWebsiteInfForm } from '../../types/request-model'
import type { FormRules, FormInstance } from 'element-plus'
import { ElMessage as message } from 'element-plus'
import { addWebsite, changeWebsiteInfo } from '../../api/methods/website'
import { findDepartmentPath } from '../../utils/findPath'
interface DialogProps {
  open: boolean
  title: string
  mode: 'add' | 'change'
  formData?: WebsiteBaseInfo
}

const props = defineProps<DialogProps>()
const emit = defineEmits<{
  close: []
  complete: []
}>()
// 控制 dialog 打开和关闭
const open = ref<boolean>(false)
// 控制 upload 组件的清除工作
const shouldClean = ref<boolean>(false) // 是否应该清除上传的文件
const shouldDelete = ref<boolean>(false) // 是否应该删除当前上传的文件
// 当表单提交时，该状态为 true，dialog 关闭时不删除上传的文件，当表单没提交时，dialog关闭删除上传的文件
const isSubmitForm = ref<boolean>(false)

watch(
  () => props.open,
  (isOpen: boolean) => {
    open.value = isOpen
  }
)

const handleOpen = () => {
  shouldClean.value = false
  isSubmitForm.value = false
  // 通过“修改站点信息”按钮打开 dialog 时，初始化表单数据
  if (props.mode === 'change') {
    const { departmentName, ...rest } = props.formData as WebsiteBaseInfo
    const path = findDepartmentPath(toRaw(options.value), departmentName)
    Object.assign(form, { belongs: path, ...rest })
  }
}
// 关闭 dialog 时，初始化表单，清除upload组件上传的文件
const closeDialog = () => {
  formRef.value?.resetFields()
  shouldClean.value = true
  shouldDelete.value = isSubmitForm.value ? false : true
  emit('close')
}
// 获取组织列表
const { data, onSuccess } = useRequest(getDepartmentList)
// 添加站点
const { send: submit } = useRequest((form: NewWebsiteForm) => addWebsite(form), {
  immediate: false
})
// 修改站点信息
const { send: changeInfo } = useRequest((form: ChangeWebsiteInfForm) => changeWebsiteInfo(form), {
  immediate: false
})
// 获取组织列表请求成功时给 select 组件的 options 赋值
onSuccess(() => {
  options.value = data.value.data
})
// 表单实例
const formRef = ref<FormInstance>()
// 表单 select 组件的选项数据
const options = ref<DepartmentList[]>([])
// 表单对象的初始数据
const form = reactive<NewWebsiteForm | ChangeWebsiteInfForm>({
  websiteName: '',
  websiteUrl: '',
  websiteLogo: '',
  belongs: []
})
// 表单校验规则
const rules = reactive<FormRules<NewWebsiteForm>>({
  websiteName: [
    { required: true, message: '请输入站点名称', trigger: 'blur' },
    { max: 64, message: '站点名称过长', trigger: 'blur' }
  ],
  websiteUrl: [
    { required: true, message: '请输入站点地址', trigger: 'blur' },
    { max: 192, message: '站点地址过长', trigger: 'blur' }
  ],
  belongs: [{ required: true, message: '请选择站点的所属组织', trigger: 'blur' }],
  websiteLogo: [
    props.mode === 'add'
      ? { required: true, message: '请上传站点Logo', trigger: 'change' }
      : { required: false }
  ]
})

// 提交表单
const submitForm = async () => {
  formRef.value?.validate((valid, _fields) => {
    if (valid) {
      if (props.mode === 'add') {
        submit(form)
          .then(() => {
            emit('complete')
            message.success({ message: '添加成功' })
            isSubmitForm.value = true
            closeDialog()
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        changeInfo(form)
          .then(() => {
            emit('complete')
            message.success({ message: '修改成功' })
            isSubmitForm.value = true

            closeDialog()
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  })
}
// 当 upload 组件上传完成或者删除完成时，设置 form.websiteLogo 字段
const setWebsiteLogoField = (url: string, mode: string) => {
  if (props.mode === 'add') {
    // 添加站点时直接设置url
    form.websiteLogo = url
  } else {
    // 修改站点信息时，如果是删除操作则设置 Logo 的 url 为原来的 url
    form.websiteLogo = mode === 'remove' ? (props.formData?.websiteLogo as string) : url
  }
}
</script>
<template>
  <el-dialog
    v-model="open"
    :title="props.title"
    :show-close="false"
    width="512"
    class="!rounded-lg"
    @open="handleOpen"
    @close="closeDialog"
  >
    <el-form label-position="top" :model="form" ref="formRef" :rules="rules">
      <el-form-item label="站点名称" prop="websiteName">
        <el-input v-model="form.websiteName" placeholder="请输入站点名称" />
      </el-form-item>
      <el-form-item label="站点地址" prop="websiteUrl">
        <el-input v-model="form.websiteUrl" placeholder="请输入站点地址" />
      </el-form-item>
      <el-form-item label="所属部门" prop="belongs">
        <el-cascader
          class="w-full"
          :options="options"
          v-model="form.belongs"
          placeholder="请选择站点所属部门"
        />
      </el-form-item>
      <el-form-item v-if="props.mode === 'change'">
        <div class="flex items-center gap-x-4">
          <p>当前站点Logo:</p>
          <img :src="props.formData?.websiteLogo" class="w-10 h-10 rounded-full" alt="" />
          <div class="i-ep:d-arrow-right text-xl mx-4"></div>
          <p>更新后的站点Logo:</p>
          <img :src="form.websiteLogo" class="w-10 h-10 rounded-full" alt="" />
        </div>
      </el-form-item>
      <el-form-item label="站点Logo" prop="websiteLogo">
        <Upload
          :should-clean="shouldClean"
          :should-delete="shouldDelete"
          @result="setWebsiteLogoField"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <section>
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="submitForm">{{
          props.mode === 'add' ? '添加' : '修改'
        }}</el-button>
      </section>
    </template>
  </el-dialog>
</template>
<style scoped lang="scss"></style>
