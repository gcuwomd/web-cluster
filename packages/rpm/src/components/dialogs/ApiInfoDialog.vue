<script setup lang="ts">
import { FormInstance, FormRules, ElMessage as message } from 'element-plus'
import { reactive, ref, watch } from 'vue'
import { ApiForm } from '../../types/request-model'
import { useRequest } from 'alova'
import { addApi } from '../../api/methods/website'
interface DialogProps {
    id: string
    open: boolean
    title: string
    mode: 'add' | 'change'
    formData: ApiForm
}

const props = defineProps<DialogProps>()
const emit = defineEmits<{
    close: []
    complete: []
}>()

const { send: submit } = useRequest((form: ApiForm) => addApi(form), {
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
    console.log(props.formData!.routeId);
}
const closeDialog = () => {
    formRef?.value?.resetFields()
    emit('close')
}
const formRef = ref<FormInstance>()
const form = reactive<ApiForm>({
    apiDescription: '',
    apiMethod: '',
    apiUrl: '',
    routeId: props.formData!.routeId,
    websiteId: props.id,
    apiType: 'pageApi',
})

const rules = reactive<FormRules<ApiForm>>({
    apiUrl: [{ required: true, message: '请输入接口路径', trigger: 'blur' }],
    apiDescription: [
        { required: true, message: '请输入接口描述', trigger: 'blur' },
        { max: 60, message: '视图描述过长', trigger: 'blur' }
    ],
    apiMethod: [{ required: true, message: '请选择接口类型', trigger: 'blur' }],
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
const options = [
    {
        value: 'post',
        label: 'post',
    },
    {
        value: 'get',
        label: 'get',
    },
    {
        value: 'put',
        label: 'put',
    },
    {
        value: 'delete',
        label: 'delete',
    }
]
</script>
<template>
    <el-dialog v-model="open" :title="props.title" :show-close="false" width="512" class="!rounded-lg" @open="handleOpen"
        @close="closeDialog">
        <el-form label-position="top" :model="form" ref="formRef" :rules="rules">
            <el-form-item label="接口路径" prop="apiUrl">
                <el-input v-model="form.apiUrl" />
            </el-form-item>
            <el-form-item label="接口描述" prop="apiDescription">
                <el-input v-model="form.apiDescription" type="textarea" :rows="3" />
            </el-form-item>
            <el-form-item label="接口类型" prop="apiMethod">
                <el-select v-model="form.apiMethod" clearable placeholder="Select">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <section>
                <el-button @click="closeDialog">取消</el-button>
                <el-button type="primary" @click="submitForm">
                {{ props.mode === 'add' ? '添加' : '修改' }}</el-button>
            </section>
    </template>
</el-dialog></template>
<style scoped lang="scss"></style>
