<script setup lang="ts">
import { FormInstance, FormRules, ElMessage as message } from 'element-plus'
import { reactive, ref, watch } from 'vue'
import { RouteForm } from '../../types/request-model'
import { useRequest } from 'alova'
import { addRoute } from '../../api/methods/website'
interface DialogProps {
  id: string
  open: boolean
  title: string
  mode: 'add' | 'change'
  formData?: RouteForm
}

const props = defineProps<DialogProps>()
const emit = defineEmits<{
  close: []
  complete: []
}>()

const { send: submit } = useRequest((form: RouteForm) => addRoute(form), {
  immediate: false
})

const open = ref<boolean>(false)
watch(
  () => props.open,
  (isOpen: boolean) => {
    open.value = isOpen
  }
)
const handleOpen = () => {
  if (props.mode === 'change') {
    form.routeId = props.formData!.routeId
  }
}
const closeDialog = () => {
  formRef?.value?.resetFields()
  emit('close')
}
const formRef = ref<FormInstance>()
const form = reactive<RouteForm>({
  websiteId: props.id,
  routeUrl: '',
  routeDescription: ''
})

const rules = reactive<FormRules<RouteForm>>({
  routeUrl: [{ required: true, message: '请输入视图路径', trigger: 'blur' }],
  routeDescription: [
    { required: true, message: '请输入视图描述', trigger: 'blur' },
    { max: 60, message: '视图描述过长', trigger: 'blur' }
  ]
})

const submitForm = () => {
  formRef?.value?.validate((valid, _fields) => {
    if (valid) {
      if (props.mode === 'add') {
        submit(form).then(() => {
          emit('complete')
          message.success('添加成功')
          closeDialog()
        })
      }
    }
  })
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
      <el-form-item label="视图路径" prop="routeUrl">
        <el-input v-model="form.routeUrl" />
      </el-form-item>
      <el-form-item label="视图描述" prop="routeDescription">
        <el-input v-model="form.routeDescription" type="textarea" :rows="3" />
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
