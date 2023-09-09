<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { RoleForm } from '../../types/request-model'
import { FormInstance, FormRules, ElMessage as message } from 'element-plus'
import { useRequest } from 'alova'
import { addRole } from '../../api/methods/role'
type ChangeRoleForm = RoleForm & { readonly roleId: string }
interface DialogProps {
  open: boolean
  title: string
  mode: 'add' | 'change'
  formData?: ChangeRoleForm
}
const props = defineProps<DialogProps>()
const emit = defineEmits<{
  close: []
  complete: []
}>()
// 控制 dialog 打开和关闭
const open = ref<boolean>(false)
watch(
  () => props.open,
  (isOpen: boolean) => {
    open.value = isOpen
  }
)
const handleOpen = () => {
  if (props.mode === 'change') {
    Object.assign(form, props.formData)
  }
}
// 关闭 dialog 时，初始化表单，清除upload组件上传的文件
const closeDialog = () => {
  formRef.value?.resetFields()
  emit('close')
}

const { send: submit } = useRequest(
  (form: RoleForm) => {
    const { roleName, departmentId } = form
    return addRole(roleName, departmentId)
  },
  {
    immediate: false
  }
)

const formRef = ref<FormInstance>()
const form: RoleForm | ChangeRoleForm = reactive({
  roleName: '',
  departmentId: '89904669e3354e83'
})
const rules: FormRules<RoleForm | ChangeRoleForm> = reactive({
  roleName: [
    { required: true, message: '请输入角色名称', trigger: 'blur' },
    { max: 32, message: '角色名称过长', trigger: 'blur' }
  ]
})
const submitForm = async () => {
  formRef.value?.validate((valid, _fields) => {
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
    <el-form :model="form" ref="formRef" label-position="top" :rules="rules">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName" />
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
