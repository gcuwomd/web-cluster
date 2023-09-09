<script lang="ts" setup>
<<<<<<< HEAD
import { ref, reactive } from 'vue'
import { rolelist } from '../../api/Role-manage/role-list'
import { AddRole, DelRole } from '../../api/Role-manage/role-manage'
=======
import { ref, reactive, computed } from 'vue'
import { getRoleList } from '../../api/methods/role'
>>>>>>> 9d6f19e87c892524a239f0a96ff66d4f7f7cb94a
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

<<<<<<< HEAD
//清空表单数据
const emptyadd = async () => {
  addrolefrom.roleName = ''
  addrolefrom.departmentId = ''
}
const pageSize = ref(10)
const currentPage = ref(1)
const total = ref(10)
const departmentId = ref('89904669e3354e83') //默认
const delroleId = ref('89904669e3354e83') //确认要删除的roleId
const AddRoledialog = ref(false) //添加角色
const deldialog = ref(false)

//卡片数组
const roleData = ref<RoleListItem[]>([])

//加载角色卡片信息

const { onSuccess: GetroleList, send: updateRoleList } = useRequest(
  () => rolelist(departmentId.value, pageSize.value, currentPage.value),
  {
    force: (shouldForce) => shouldForce
  }
)
GetroleList((response) => {
  roleData.value = response.data.data.row
  total.value = response.data.data.total
})

//添加角色

const { onSuccess: addrole, send: updateAddRole } = useRequest(
  () => AddRole(addrolefrom.roleName, departmentId.value),
  {
    force: (shouldForce) => shouldForce,
    immediate: false
  }
)
addrole((response) => {
  console.log(response.data.data)
  alert('添加成功')
  updateRoleList(true)
  emptyadd()
})

//删除角色

const { onSuccess, send: updateDelRole } = useRequest(() => DelRole(delroleId.value), {
  force: (shouldForce) => shouldForce,
  immediate: false
})
onSuccess((response) => {
  console.log(response)
  alert('删除成功')
  updateRoleList(true)
})

//更新页数和页面卡片大小
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  pageSize.value = val
  console.log(pageSize.value)
  updateRoleList(rolelist(departmentId.value, pageSize.value, currentPage.value))
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  currentPage.value = val
  updateRoleList(rolelist(departmentId.value, pageSize.value, currentPage.value))
=======
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
>>>>>>> 9d6f19e87c892524a239f0a96ff66d4f7f7cb94a
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
<<<<<<< HEAD
  <!-- 头部 -->
  <section>
    <el-row :gutter="40">
      <el-col v-for="(RoleListItem, index) in roleData" :key="index" :span="12">
        <el-card style="margin-top: 20px">
          <template #header>
            <div class="card-header">
              <span>roleName:{{ RoleListItem.roleName }}</span>
              <el-button
                class="button"
                type="danger"
                @click="
                  () => {
                    deldialog = true
                    delroleId = RoleListItem.roleId
                    console.log(RoleListItem.roleId)
                    console.log(delroleId)
                  }
                "
                >删除角色</el-button
              >
            </div>
          </template>
          <div class="cards">
            <div class="card-body">
              <p>roleId:{{ RoleListItem.roleId }}</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </section>
  <!-- 卡片 -->
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
  <!-- 添加角色对话框 -->
  <el-dialog v-model="AddRoledialog" title="添加角色" width="40%" center>
    <el-form :model="addrolefrom" label-width="120px" style="margin-left: 35px">
      <el-form-item label="roleName">
        <el-input style="width: 300px" v-model="addrolefrom.roleName" />
      </el-form-item>
      <el-form-item label="department">
        <el-radio-group v-model="addrolefrom.departmentId">
          <div>
            <div>
              <el-radio label="网站运维部" :value="1" />
              <el-radio label="信息化运维部" :value="2" />
            </div>
            <div>
              <el-radio label="网络运维部" :value="3" />
              <el-radio label="行政秘书部" :value="4" />
            </div>
          </div>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          @click="
            () => {
              AddRoledialog = false
              emptyadd()
            }
          "
          >取消添加</el-button
        >
        <el-button
          type="primary"
          @click="
            () => {
              AddRoledialog = false
              console.log(addrolefrom.roleName)
              updateAddRole(AddRole(addrolefrom.roleName, departmentId))
            }
          "
        >
          确认添加
        </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 删除角色 -->
  <el-dialog v-model="deldialog" title="是否确认删除" width="30%">
    <el-button @click="deldialog = false">Cancel</el-button>
=======
  <section class="mt-4 flex gap-x-4">
    <el-cascader
      v-model="selectedPath"
      :options="options"
      class="w-80"
      clearable
      @change="handlePathChange"
    />
>>>>>>> 9d6f19e87c892524a239f0a96ff66d4f7f7cb94a
    <el-button
      type="primary"
      @click="
        () => {
<<<<<<< HEAD
          updateDelRole(DelRole(delroleId)) //删除角色
          deldialog = false
=======
          isDialogOpen = true
>>>>>>> 9d6f19e87c892524a239f0a96ff66d4f7f7cb94a
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
