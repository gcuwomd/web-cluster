<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { subNext } from '../../api/submitNext'
import { assess } from '../../api/assess'
import { FormInstance, FormRules } from 'element-plus'
import { ElMessage as elmessage } from 'element-plus'
interface DialogProps {
  id: string
  open: boolean
  title: string
}
interface formData {
  id: string,
  comment: string
}

const props = defineProps<DialogProps>()
const emit = defineEmits<{
  close: []
  complete: []
}>()


const formRef = ref<FormInstance>()
const form = reactive<formData>({
  comment: '',
  id: ''
})

const rules = reactive<FormRules>({
  comment: [{ required: true, message: '请输入评价', trigger: 'blur' }],
})
watch(props, (newValue) => {
  form.id = newValue.id;

});
const open = ref<boolean>(false)
watch(
  () => props.open,
  (isOpen: boolean) => {
    open.value = isOpen
  }
)

const closeDialog = () => {
  formRef?.value?.resetFields()
  emit('close')
}


const submitForm = () => {
  formRef?.value?.validate(async (valid, _fields) => {
    if (valid) {
      const { message }: any = (await assess(form)).data
      if (message === 'success') {
        await subNext(form.id)
        emit('complete')
        elmessage.success('提交成功')
        closeDialog()
      }
      else{
        elmessage.error('提交失败')
        return
      }
    }
  })
}
</script>
<template>
  <el-dialog v-model="open" :title="props.title" :append-to-body="true" width="512" @close="closeDialog">
    <el-form :rules="rules" :model="form" ref="formRef">
      <el-form-item label="请输入评价信息" prop="comment">
        <el-input v-model="form.comment" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="submitForm">
        提交给下个部门
      </el-button>
    </template>
  </el-dialog>
</template>
<style scoped></style>