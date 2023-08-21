<script setup lang="ts">
import { useRequest } from 'alova'
import { getDepartmentList } from '../../api/methods/organization'
import { reactive, ref, watch } from 'vue'
import type { DepartmentList } from '../../types/response-data-model.d.ts'
import { NewWebsiteForm } from '../../types/request-model'
import type { FormRules, FormInstance } from 'element-plus'
import { ElMessage as message } from 'element-plus'
import { addWebsite } from '../../api/methods/website'
interface DialogProps {
  open: boolean
}
const props = defineProps<DialogProps>()
const emit = defineEmits<{
  close: [],
  complete: []
}>()

const open = ref<boolean>(false)
watch(
  () => props.open,
  (isOpen: boolean) => {
    open.value = isOpen
  }
)
const closeDialog = () => {
  formRef.value?.resetFields()
  emit('close')
}

const { data, onSuccess } = useRequest(getDepartmentList)
const { send: submit } = useRequest((form: NewWebsiteForm) => addWebsite(form), {
  immediate: false
})

onSuccess(() => {
  options.value = data.value.data
})

const formRef = ref<FormInstance>()
const options = ref<DepartmentList[]>([])
const form = reactive<NewWebsiteForm>({
  websiteName: '',
  websiteUrl: '',
  websiteLogo: '',
  belongs: []
})
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
  websiteLogo: [{ required: true, message: '请上传站点Logo', trigger: 'change' }]
})

const submitForm = async () => {
  formRef.value?.validate((valid, _fields) => {
    if (valid) {
      submit(form)
        .then(() => {
          emit('complete')
          message.success({ message: '添加成功' })
          closeDialog()
        })
        .catch((error) => {
          console.log(error)
        })
    }
  })
}
</script>
<template>
  <el-dialog
    v-model="open"
    title="添加站点"
    :show-close="false"
    width="512"
    class="!rounded-lg"
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
      <el-form-item label="站点Logo" prop="websiteLogo">
        <Upload @result="(url:string) => {form.websiteLogo = url}" />
      </el-form-item>
    </el-form>
    <template #footer>
      <section>
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="submitForm">添加</el-button>
      </section>
    </template>
  </el-dialog>
</template>
<style scoped lang="scss"></style>
