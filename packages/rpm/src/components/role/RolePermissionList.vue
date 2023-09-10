<script setup lang="ts">
import { ref } from 'vue'
import { useRequest } from 'alova'
import { GetRolePermission, getAllWebsite } from '../../api/methods/role'
import { route, api } from '../../types/response-data-model'
import { useRoute } from 'vue-router'
const route = useRoute()
//角色权限列表
const routes = ref<route[]>()
const apis = ref<api[]>()
//获取角色权限列表
const { onSuccess: getRolepermission } = useRequest((roleId: string = route.params.id as string) =>
  GetRolePermission(roleId)
)

getRolepermission((response) => {
  routes.value = response.data.data.route
  apis.value = response.data.data.api
})
//获取全站点列表
const { onSuccess: getallwebsite } = useRequest(() => getAllWebsite())
getallwebsite
const handleSubmit = () => {
  console.log(selectedOptions.value)
}
const selectedOptions = ref([])
const open = ref<boolean>(false)
const closeDialog = () => {
  selectedOptions.value = []
  open.value = false
}
</script>
<template>
  <el-collapse>
    <el-collapse-item title="Route" name="1">
      <div class="flex justify-end my-4">
        <el-button
          type="primary"
          @click="
            () => {
              open = true
            }
          "
          >分配角色权限</el-button
        >
        <el-button type="danger">删除角色权限</el-button>
      </div>
      <section class="my-4">
        <el-table ref="tableRef" :data="routes">
          <el-table-column type="selection" width="55" />
          <el-table-column label="websiteId" prop="websiteId" width="210"></el-table-column>
          <el-table-column label="routeId" prop="routeId" width="250" />
          <el-table-column label="routeUrl" prop="routeUrl" />
          <el-table-column label="routeDescription" prop="routeDescription">
            <template #default="scope">
              <el-tooltip
                :content="scope.row.routeDescription"
                raw-content
                placement="top-start"
                v-if="scope.row.routeDescription"
              >
                <span v-if="scope.row.routeDescription && scope.row.routeDescription.length <= 10">
                  {{ scope.row.routeDescription }}
                </span>
                <span v-if="scope.row.routeDescription && scope.row.routeDescription.length > 10">
                  {{ scope.row.routeDescription.substr(0, 10) + '...' }}
                </span>
              </el-tooltip>
              <span v-else-if="scope.row.routeDescription == null"> NA </span>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </el-collapse-item>
    <el-collapse-item title="Api" name="2">
      <div class="flex justify-end my-4">
        <el-button
          type="primary"
          @click="
            () => {
              open = true
            }
          "
          >分配角色权限</el-button
        >
        <el-button type="danger">删除角色权限</el-button>
      </div>
      <section class="my-4">
        <el-table ref="tableRef" :data="apis">
          <el-table-column type="selection" width="55" />
          <el-table-column label="apiId" prop="apiId" width="350"></el-table-column>
          <el-table-column label="apiUrl" prop="apiUrl" width="400" />
          <el-table-column label="apiDescription" prop="apiDescription">
            <template #default="scope">
              <el-tooltip
                :content="scope.row.apiDescription"
                raw-content
                placement="top-start"
                v-if="scope.row.apiDescription"
              >
                <span v-if="scope.row.apiDescription && scope.row.apiDescription.length <= 10">
                  {{ scope.row.apiDescription }}
                </span>
                <span v-if="scope.row.apiDescription && scope.row.apiDescription.length > 10">
                  {{ scope.row.apiDescription.substr(0, 10) + '...' }}
                </span>
              </el-tooltip>
              <span v-else-if="scope.row.apiDescription == null"> NA </span>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </el-collapse-item>
  </el-collapse>
  <el-dialog
    v-model="open"
    title="分配角色权限"
    :show-close="false"
    width="512"
    class="!rounded-lg"
    @close="closeDialog"
  >
    <!-- <el-select v-model="form.college" placeholder="请选择站点" filterable>
      <el-option
        v-for="item in websiteOption"
        :Key="item.websiteId"
        :label="item.websiteName"
        :value="item.websiteId"
      ></el-option>
    </el-select> -->
    <template #footer>
      <section>
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" :disabled="selectedOptions.length === 0" @click="handleSubmit"
          >添加</el-button
        >
      </section>
    </template>
  </el-dialog>
</template>
<style scoped lang="scss"></style>
