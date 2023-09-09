<script setup lang="ts">
import { useRequest } from 'alova'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getWebsiteDetailInfo } from '../../api/methods/website'
import { WebsiteDetailInfo } from '../../types/response-data-model'

const route = useRoute()

// 站点详细信息
const detailInfo = ref<WebsiteDetailInfo>()
// 获取站点详细信息
const { onSuccess: getDetailSuccess, send: updateDetialInfo } = useRequest(
  getWebsiteDetailInfo(route.params.id as string),
  { force: (shouldUpdate: boolean) => shouldUpdate }
)

getDetailSuccess((response) => {
  detailInfo.value = response.data.data
})

const openChangeInfoDialog = ref<boolean>(false)
const provideFormData = () => {
  if (detailInfo.value) {
    const { apiNum: _apiNum, routeNumber: _routeNumber, ...rest } = detailInfo.value
    return rest
  }
  return undefined
}
</script>
<template>
  <section>
    <el-breadcrumb>
      <el-breadcrumb-item>权限管理系统</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/website/list' }">站点管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{ detailInfo?.websiteName }}</el-breadcrumb-item>
    </el-breadcrumb>
  </section>
  <section class="mt-4">
    <el-card>
      <el-descriptions size="large" :column="5" border>
        <template #title>
          <h3>站点基本信息</h3>
        </template>
        <template #extra>
          <el-button
            type="primary"
            @click="
              () => {
                openChangeInfoDialog = true
              }
            "
            >修改基本信息</el-button
          >
        </template>
        <el-descriptions-item label="站点Logo">
          <img :src="detailInfo?.websiteLogo" class="w-10 h-10 rounded-full" />
        </el-descriptions-item>
        <el-descriptions-item label="站点URL">{{ detailInfo?.websiteUrl }}</el-descriptions-item>
        <el-descriptions-item label="所属部门">{{
          detailInfo?.departmentName
        }}</el-descriptions-item>
        <el-descriptions-item label="站点前端路由个数">{{
          detailInfo?.routeNumber
        }}</el-descriptions-item>
        <el-descriptions-item label="站点后端路由个数">{{
          detailInfo?.apiNum
        }}</el-descriptions-item>
      </el-descriptions>
    </el-card>
  </section>
  <section class="mt-4">
    <PermissionTable /> 
  </section>
  <WebsiteInfoDialog
    :open="openChangeInfoDialog"
    title="修改站点信息"
    mode="change"
    :formData="provideFormData()"
    @close="openChangeInfoDialog = false"
    @complete="
      () => {
        updateDetialInfo(true)
      }
    "
  />
</template>
<style scoped lang="scss">
:deep(.el-descriptions__table) {
  tr {
    display: flex;
    td {
      flex-grow: 1;
    }
  }
  .el-descriptions__cell {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-descriptions__label {
    font-weight: 700;
  }
}
</style>
