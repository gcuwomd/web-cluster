<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRequest } from 'alova'
import { TableInstance } from 'element-plus'
import { useRoute } from 'vue-router'
import { getPermissions } from '../../api/methods/website'
import { RouteForm } from '../../types/request-model'

import { WebsiteRouteInfo, WebsiteApiInfo } from '../../types/response-data-model'

const route = useRoute()

// 站点权限信息
const websiteRouteList = ref<WebsiteRouteInfo[]>()
const websiteGlobalApiList = ref<WebsiteApiInfo[]>()

// 获取站点路由信息
const { onSuccess: getPermissionsSuccess, send: update } = useRequest(
  (_shouldForce: boolean, type = 'all', page = 1, pageSize = 10, websiteId = route.params.id) =>
    getPermissions(type, page, pageSize, websiteId),
  {
    force: (shouldForce: boolean) => shouldForce
  }
)

getPermissionsSuccess((response) => {
  const {
    data: {
      data: { globalApi, routes }
    }
  } = response
  websiteRouteList.value = routes || []
  websiteGlobalApiList.value = globalApi || []
})

// el-tag 标签类型映射表
const tagMap: { [key: string]: string } = {
  get: 'success',
  post: 'warning',
  put: 'info',
  delete: 'danger'
}

const tableRef = ref<TableInstance>()
// 当前展开的表格项
const currentExpandedRow = ref<string[]>([])

const isRouteDialogOpen = ref<boolean>(false)
const routeDialogMode = ref<string>('')
const routeFormData = reactive<RouteForm>({
  routeId: '',
  routeDescription: '',
  routeUrl: '',
  websiteId: route.params.id as string
})
const openRouteDialog = (mode: string, data?: RouteForm) => {
  routeDialogMode.value = mode
  if (mode === 'change') {
    Object.assign(routeFormData, data)
  }
  isRouteDialogOpen.value = true
}
</script>
<template>
  <el-card>
    <template #header>
      <div class="flex justify-between">
        <h3>站点权限列表</h3>
        <el-button type="primary" @click="openRouteDialog('add')">添加视图</el-button>
      </div>
    </template>

    <el-table
      ref="tableRef"
      :data="websiteRouteList"
      highlight-current-row
      :row-key="
        (row: WebsiteRouteInfo) => {
          return row.routeId
        }
      "
      :expand-row-keys="currentExpandedRow"
      @expand-change="
        (row: WebsiteRouteInfo) => {
          currentExpandedRow = [row.routeId]
        }
      "
      @cell-click="
        (row: WebsiteRouteInfo) => {
          const [currentRow] = currentExpandedRow
          currentExpandedRow.length === 1
            ? currentRow === row.routeId
              ? (currentExpandedRow = [])
              : (currentExpandedRow = [row.routeId])
            : (currentExpandedRow = [row.routeId])
        }
      "
    >
      <el-table-column type="expand">
        <template #default="props">
          <section class="my-4">
            <div class="w-full flex justify-between items-center mb-4">
              <h4>视图接口列表</h4>
              <div class="flex gap-x-4">
                <el-button type="primary">添加视图接口</el-button>
                <el-button
                  type="danger"
                  @click="
                    () => {
                      console.log(tableRef)
                    }
                  "
                  >删除所选视图接口</el-button
                >
              </div>
            </div>

            <el-table :data="props.row.pageApi" border>
              <el-table-column type="selection" width="55" />
              <el-table-column label="接口路径" prop="apiUrl" />
              <el-table-column label="接口描述" prop="apiDescription" />
              <el-table-column label="接口类型" prop="apiMethod">
                <template #default="scoped">
                  <el-tag :type="tagMap[scoped.row.apiMethod]">{{ scoped.row.apiMethod }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template #default="scoped">
                  <el-button link type="primary">修改接口信息</el-button>
                  <el-button link type="danger">删除接口</el-button>
                </template>
              </el-table-column>
            </el-table>
          </section>
        </template>
      </el-table-column>
      <el-table-column label="视图路径" prop="routeUrl" />
      <el-table-column label="视图描述" prop="routeDescription" />
      <el-table-column label="视图接口数量" prop="apiCount" />
      <el-table-column label="操作">
        <template #default="scoped">
          <el-button link type="primary">修改视图信息</el-button>
          <el-button link type="danger">删除视图</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <RouteInfoDialog
    :open="isRouteDialogOpen"
    :id="route.params.id"
    title="添加站点视图"
    :mode="routeDialogMode"
    :formData="routeFormData"
    @close="isRouteDialogOpen = false"
    @complete="
      () => {
        update(true)
      }
    "
  />
</template>
<style scoped lang="scss"></style>
