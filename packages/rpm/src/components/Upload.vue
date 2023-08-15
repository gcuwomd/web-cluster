<script setup lang="ts">
import { ref } from 'vue'
import { UploadProps, genFileId, UploadInstance, UploadRawFile } from 'element-plus'
import { testURL, ACCESS_TOKEN } from '../api/index'
import { AlovaResponse } from '../types/response-data-model'
import { deleteUploadedImage } from '../api/methods/upload'
import { useRequest } from 'alova'
const emit = defineEmits<{
  result: [url: string]
}>()

const { send: deleteImage } = useRequest((key) => deleteUploadedImage(key), { immediate: false })

const upload = ref<UploadInstance>()
const uploadedImageUrl = ref<string>('')
const handleSuccess = (response: AlovaResponse<string>) => {
  uploadedImageUrl.value = response.data
  emit('result', response.data)
}
const handleExceed: UploadProps['onExceed'] = async (files) => {
  await deleteImage(uploadedImageUrl.value)
  uploadedImageUrl.value = ''
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}
const handleRemove: UploadProps['onRemove'] = async () => {
  await deleteImage(uploadedImageUrl.value)
  uploadedImageUrl.value = ''
}
</script>
<template>
  <div class="w-full">
    <el-upload
      ref="upload"
      drag
      :action="`${testURL}/auth/photo`"
      :headers="{ Authorization: ACCESS_TOKEN }"
      accept=".jpg,.png,.svg,.webp"
      :limit="1"
      @success="handleSuccess"
      @exceed="handleExceed"
      @remove="handleRemove"
    >
      <div class="i-ep:upload-filled text-6xl mx-auto"></div>
      <span>将文件拖动到此区域或点击此区域上传文件</span>
    </el-upload>
  </div>
</template>
<style scoped lang="scss"></style>
