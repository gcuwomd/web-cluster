<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { getRoleList } from '../../api/methods/role'
import { useRequest } from 'alova'
import type { DepartmentList, RoleListItem } from '../../types/response-data-model'
import type { PaginationConfig } from '../../types/index'
import { getDepartmentList } from '../../api/methods/organization'

const { onSuccess: getDepartmentListSuccess } = useRequest(() => getDepartmentList())
const options = ref<DepartmentList[]>()
getDepartmentListSuccess((response) => {
  const {
    data: { data }
  } = response
  options.value = data
})

const { onSuccess, send: updateRoleList } = useRequest(
  (
    _shouldForce: boolean,
    departmentId: string = '89904669e3354e83',
    pageSize: number = 10,
    page: number = 1
  ) => getRoleList(departmentId, pageSize, page),
  {
    force: (shouldForce: boolean) => shouldForce
  }
)
const roleList = ref<RoleListItem[]>()
onSuccess((response) => {
  const {
    data: {
      data: { row, total }
    }
  } = response
  roleList.value = row
  pagination.total = total
})
const pagination = reactive<PaginationConfig>({
  pageSize: 20,
  page: 1,
  total: 0
})
const initPagination = () => {
  Object.assign(pagination, { pageSize: 10, page: 1, total: 0 })
}
const selectedPath = ref<string[] | null>()
const currentCondition = computed(() => {
  if (selectedPath.value) {
    const copyValue = [...selectedPath.value]
    return copyValue.pop()
  }
  // 返回当前登录用户的部门id
})
const handlePathChange = () => {
  initPagination()
  updateRoleList(false, currentCondition.value)
}
const isDialogOpen = ref<boolean>(false)
</script>

<template>
  <section>
    <el-breadcrumb>
      <el-breadcrumb-item>权限管理系统</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
  </section>
  <section class="mt-4 flex gap-x-4">
    <el-cascader
      v-model="selectedPath"
      :options="options"
      class="w-80"
      clearable
      @change="handlePathChange"
    />
    <el-button
      type="primary"
      @click="
        () => {
          isDialogOpen = true
        }
      "
      >添加角色</el-button
    >
  </section>
  <el-divider />
  <section class="flex gap-4 flex-wrap mt-4">
    <el-card
      shadow="always"
      class="cursor-pointer"
      v-for="role in roleList"
      :key="role.roleId"
      @click="
        () => {
          $router.push({ name: 'roleDetail', params: { id: role.roleId } })
        }
      "
    >
      <h3>{{ role.roleName }}</h3>
    </el-card>
  </section>
  <RoleInfoDialog
    :open="isDialogOpen"
    title="添加角色"
    mode="add"
    @complete="
      () => {
        initPagination()
        updateRoleList(true, currentCondition)
      }
    "
    @close="
      () => {
        isDialogOpen = false
      }
    "
  />
</template>

<style scoped lang="scss"></style>
