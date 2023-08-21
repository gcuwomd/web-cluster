<script setup lang="ts">
import { useRequest } from 'alova'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getWebsiteDetailInfo, getPermissionsList } from '../../api/methods/website'
import { WebsiteDetailInfo, ApiListItem, RouteListItem } from '../../types/response-data-model'
const route = useRoute()

const detailInfo = ref<WebsiteDetailInfo>()
const apiList = ref<ApiListItem[]>()
const routeList = ref<RouteListItem[]>()

const { onSuccess: getDetailSuccess } = useRequest(getWebsiteDetailInfo(route.params.id as string))
const { onSuccess: getPermissionsSuccess, send } = useRequest(
  (type = 'all', page = 1, pageSize = 10) => getPermissionsList(type, page, pageSize)
)
getDetailSuccess((response) => {
  detailInfo.value = response.data.data
})
getPermissionsSuccess((response) => {
  const { data: responseData, sendArgs } = response
  console.log(responseData)

  if (sendArgs.length !== 0) {
    const [type] = sendArgs
    type === 'api'
      ? (apiList.value = responseData.data.row)
      : type === 'route'
      ? (routeList.value = responseData.data.row as RouteListItem[])
      : ((apiList.value = responseData.data.api!.row),
        (routeList.value = responseData.data.route!.row))
    return
  }
  apiList.value = responseData.data.api!.row
  routeList.value = responseData.data.route!.row
  console.log(apiList.value, routeList.value)
})
onMounted(() => {})

const routeTablePagination = reactive({
  page: 1,
  pageSize: 10
})
const apiTablePagination = reactive({
  page: 1,
  pageSize: 10
})
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
          <el-button type="primary">修改基本信息</el-button>
        </template>
        <el-descriptions-item label="站点Logo">
          <img src="../../assets/gcu-womd.png" class="w-10 h-10" />
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
    <el-card>
      <el-collapse>
        <el-collapse-item>
          <template #title>
            <h3 class="font-bold">站点页面路由表</h3>
          </template>
          <el-space>
            <el-button type="danger">删除当前选中项</el-button>
            <el-button>清除当前选中</el-button>
          </el-space>
          <el-table :data="routeList" stripe>
            <el-table-column type="selection" width="55" />
            <el-table-column label="Path" />
            <el-table-column label="路由描述" />
            <el-table-column label="操作">
              <template #default="scope">
                <el-button link type="danger" size="small" @click.prevent="">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item>
          <template #title>
            <h3 class="font-bold">站点接口路由表</h3>
          </template>
          <el-space>
            <el-select placeholder="请求方法" />
            <el-button type="primary">筛选</el-button>
            <el-button>清除筛选</el-button>
            <el-button type="danger">删除当前选中项</el-button>
            <el-button>清除当前选中</el-button>
          </el-space>
          <el-table :data="apiList" stripe>
            <el-table-column type="selection" width="55" />
            <el-table-column label="Path" prop="apiUrl" />
            <el-table-column label="请求方法">
              <template #default="scope"> </template>
            </el-table-column>
            <el-table-column label="接口描述" />
            <el-table-column label="操作">
              <template #default="scope">
                <el-button link type="danger" size="small" @click.prevent="">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <section class="flex justify-end">
            <el-pagination
              v-model:current-page="apiTablePagination.page"
              v-model:pageSize="apiTablePagination.pageSize"
              :page-sizes="[10, 50, 100, 200]"
              layout="total,sizes,prev,pager,next"
              :total="500"
              @size-change="
                (pageSize: number) => {
                  handleSizeChange(pageSize, 'api')
                }
              "
              @current-change="
                (page: number) => {
                  handlePageChange(page, 'api')
                }
              "
            />
          </section>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </section>
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
