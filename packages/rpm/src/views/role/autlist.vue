<script setup lang="ts">
import { ref } from 'vue'
import { useRequest } from 'alova'
import { RoleGetPermissionList, routes } from '../../types/response-data-model'
import { getWebsiteList } from '../../api/Role-manage/role-website'
const pageSize = ref(10)
const currentPage = ref(1)
const total = ref(10)
const websiteId = ref('0c3b523a7ff14dd6')
const websiteList = ref<RoleGetPermissionList>({} as RoleGetPermissionList)
const routesList = ref<routes[]>([])
const globalApi = ref<string[]>([])
const load = async (departmentId: string, pageSize: number, page: number) => {
  const { onSuccess } = useRequest(getWebsiteList(websiteId, pageSize, currentPage), {
    force: (shouldForce) => shouldForce
  })
  onSuccess((response) => {
    roleData.value = response.data.data.row
    total.value = response.data.data.total
  })
}

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  pageSize.value = val
  getWebsiteList(websiteId.value, pageSize.value, currentPage.value)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  currentPage.value = val
  getWebsiteList(websiteId.value, pageSize.value, currentPage.value)
}
onSuccess((response) => {
  websiteList.value = response.data.data
  routesList.value = response.data.data.routes
  globalApi.value = response.data.data.globalApi
})
</script>
<template>
  <section style="margin-bottom: 20px">
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/role' }">角色管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/role/list' }">站点所有权限列表</el-breadcrumb-item>
    </el-breadcrumb>
  </section>
  <section>
    <div class="header"><h3>站点所有权限列表</h3></div>
  </section>
  <section>
    <el-table
      :data="routesList"
      stripe
      style="width: 100%"
      size="large"
      :align="'center'"
      border
      class="routeList"
    >
      <el-table-column prop="routeId" label="routeId" width="400" />
      <el-table-column prop="routeDescription" label="routeDescription" width="500" />
      <el-table-column prop="websiteId" label="websiteId" />
    </el-table>
    <el-table :data="globalApi" stripe class="globalApiList" size="large" border>
      <el-table-column label="globalApi">
        <template #default="{ row }">
          {{ row }}
        </template>
      </el-table-column>
    </el-table>
  </section>
  <section class="flex justify-end">
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next"
      :total="total"
      :small="false"
      :background="false"
      :disabled="false"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </section>
</template>
<style scoped lang="scss">
.header {
  background-color: #ffffff;
  width: 100%;
  height: 80px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  box-sizing: border-box;
  padding: 25px;
  font-size: large;
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.routeList {
  font-size: 20px;
}
</style>
