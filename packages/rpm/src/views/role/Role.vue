<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import { rolelist } from '../../api/Role-manage/role-list'
import { AssignAut, DeleteAut } from '../../api/Role-manage/permission'
import { AddRole, DelRole } from '../../api/Role-manage/role-manage'
import { useRequest } from 'alova'

/* import { RoleListItem } from '../../types/response-data-model' */
//角色卡片接口
export interface RoleListItem {
  roleId: string
  roleName: string
}
//添加角色传参（表单）
const addrolefrom = reactive({
  roleName: '',
  departmentId: ''
})
//分配角色权限参数（表单）
const assignAutfrom = reactive({
  roleId: ''
})
export interface Permissions {
  websiteId: string
  type: string
  websitePermissions: string[]
}
let postpermission: Permissions[] = []
//postpermission为要提交的接口数组(分配角色权限)
const AssignpermissionItem = reactive({
  websiteId: '',
  type: '',
  websitePermissions: [] as string[]
})
const AddwebsitePermissions = async () => {
  // 创建一个新的 AssignpermissionItem 对象，并将输入的值赋给它
  //实现同时输入多个
  AssignpermissionItem.websitePermissions = inputWebPermission.value
    .split(',')
    .map((item) => item.trim())
  const newPermissionItem = {
    websiteId: AssignpermissionItem.websiteId,
    type: AssignpermissionItem.type,
    websitePermissions: AssignpermissionItem.websitePermissions
  }
  // 将新对象添加到 postpermission 数组中
  postpermission.push(newPermissionItem)
  alert('添加成功')
  console.log(postpermission)
  console.log(assignAutfrom.roleId)
  console.log(AssignpermissionItem.websitePermissions)
}
const inputWebPermission = ref('')
const test1 = async () => {
  console.log(postpermission)
  console.log(assignAutfrom.roleId)
  console.log(AssignpermissionItem.websitePermissions)
}

//删除角色权限（表单）
const delAutfrom = reactive({
  roleId: '',
  api: [] as string[],
  route: [] as string[]
})
const indelAutfromRoute = ref('')
//输入多个
const indelAutfromApi = ref('')
const test2 = async () => {
  console.log(delAutfrom)
  delAutfrom.api = indelAutfromApi.value.split(',').map((item) => item.trim())
  delAutfrom.route = indelAutfromRoute.value.split(',').map((item) => item.trim())
  console.log(delAutfrom.api)
  console.log(delAutfrom.route)
  console.log(delAutfrom.roleId)
}
//清空表单数据
const emptyadd = async () => {
  addrolefrom.roleName = ''
  addrolefrom.departmentId = ''
}
const emptyassign = async () => {
  assignAutfrom.roleId = ''
  AssignpermissionItem.websiteId = ''
  AssignpermissionItem.type = ''
  inputWebPermission.value = ''
  postpermission = []
}
const emptydel = async () => {
  delAutfrom.roleId = ''
  indelAutfromApi.value = ''
  indelAutfromRoute.value = ''
}

const pageSize = ref(10)
const currentPage = ref(1)
const total = ref(10)
const departmentId = ref('89904669e3354e83')
const delroleId = ref() //确认要删除的roleId
const AddRoledialog = ref(false) //四个对话框
const AutAssigndialog = ref(false)
const AutDeletedialog = ref(false)
const deldialog = ref(false)
//卡片数组
const roleData = ref<RoleListItem[]>([])

onMounted(async () => {
  load('89904669e3354e83', 10, 1)
})
//加载角色卡片信息
const load = async (departmentId: string, pageSize: number, page: number) => {
  const { onSuccess } = useRequest(rolelist(departmentId, pageSize, page), {
    force: (shouldForce) => shouldForce
  })
  onSuccess((response) => {
    roleData.value = response.data.data.row
    total.value = response.data.data.total
  })
}
//分配角色权限
const AutAssign = async (roleId: string, permissions: Permissions[]) => {
  const { onSuccess } = useRequest(AssignAut(roleId, permissions), {
    force: (shouldForce) => shouldForce
  })
  onSuccess((response) => {
    console.log(response.data.data)
    emptyassign() //清空表单
  })
}
//删除角色权限
const AutDelete = async (roleId: string, api: string[], route: string[]) => {
  const { onSuccess } = useRequest(DeleteAut(roleId, api, route), {
    force: (shouldForce) => shouldForce
  })
  onSuccess((response) => {
    console.log(response.data.data)
    emptydel() //清空表单
  })
}
//添加角色
const RoleAdd = async (name: string, departmentId: string) => {
  const { onSuccess } = useRequest(AddRole(name, departmentId), {
    force: (shouldForce) => shouldForce
  })
  onSuccess((response) => {
    console.log(response.data.data)
    emptyadd()
  })
}
//删除角色 y
const RoleDel = async (id: string) => {
  const { onSuccess } = useRequest(DelRole(id), {
    force: (shouldForce) => shouldForce
  })
  onSuccess((response) => {
    console.log(response)
  })
}

//更新页数和页面卡片大小
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  pageSize.value = val
  load(departmentId.value, pageSize.value, currentPage.value)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  currentPage.value = val
  load(departmentId.value, pageSize.value, currentPage.value)
}
</script>

<template>
  <section style="margin-bottom: 20px">
    <el-breadcrumb>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/role/list' }">站点所有权限列表</el-breadcrumb-item>
    </el-breadcrumb>
  </section>
  <!-- 头部导航 -->
  <section>
    <div class="header">
      <h3>角色管理</h3>
      <div>
        <el-button class="button" type="warning" @click="AddRoledialog = true">添加角色</el-button>
        <el-button class="button" type="success" @click="AutAssigndialog = true"
          >分配角色权限</el-button
        >
        <el-button class="button" type="danger" @click="AutDeletedialog = true"
          >删除角色权限</el-button
        >
      </div>
    </div>
  </section>
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
                  }
                "
                >删除角色</el-button
              >
              <!--  RoleDel(RoleListItem.roleId) -->
            </div>
          </template>
          <div class="cards">
            <p>roleId:{{ RoleListItem.roleId }}</p>
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
  <!-- 页数 -->
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
              RoleAdd(addrolefrom.roleName, '89904669e3354e83')
            }
          "
        >
          确认添加
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="AutAssigndialog" title="分配角色权限" width="40%" center>
    <el-form :model="assignAutfrom" label-width="120px" style="margin-left: 35px">
      <el-form-item label="roleId">
        <el-input style="width: 300px" v-model="assignAutfrom.roleId" />
      </el-form-item>
      <el-form-item label="websiteId">
        <el-input style="width: 300px" v-model="AssignpermissionItem.websiteId" />
      </el-form-item>
      <el-form-item label="type">
        <el-radio-group v-model="AssignpermissionItem.type">
          <el-radio label="api" value="api" />
          <el-radio label="route" value="route" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="websitePermission">
        <el-input
          style="width: 300px"
          v-model="inputWebPermission"
          placeholder="可输入都多个,用逗号隔开"
        />
        <el-button
          @click="
            () => {
              AddwebsitePermissions()
            }
          "
          type="info"
          >添加</el-button
        >
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          @click="
            () => {
              AutAssigndialog = false
              emptyassign()
            }
          "
          >取消分配</el-button
        >
        <el-button
          type="primary"
          @click="
            () => {
              AutAssigndialog = false
              test1()
              AutAssign(assignAutfrom.roleId, postpermission)
            }
          "
        >
          确认分配
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="AutDeletedialog" title="删除角色权限" width="40%" center>
    <el-form :model="delAutfrom" label-width="120px" style="margin-left: 35px">
      <el-form-item label="roleId">
        <el-input style="width: 300px" v-model="delAutfrom.roleId" />
      </el-form-item>
      <el-form-item label="api">
        <el-input
          style="width: 300px"
          v-model="indelAutfromApi"
          placeholder="可输入都多个,用逗号隔开"
        />
      </el-form-item>
      <el-form-item label="route">
        <el-input
          style="width: 300px"
          v-model="indelAutfromRoute"
          placeholder="可输入都多个,用逗号隔开"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          @click="
            () => {
              AutDeletedialog = false
              emptydel()
            }
          "
          >取消删除</el-button
        >
        <el-button
          type="primary"
          @click="
            () => {
              AutDeletedialog = false
              test2()
              AutDelete(delAutfrom.roleId, delAutfrom.api, delAutfrom.route)
            }
          "
        >
          确认删除
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="deldialog" title="是否确认删除" width="30%">
    <el-button @click="deldialog = false">Cancel</el-button>
    <el-button
      type="primary"
      @click="
        () => {
          RoleDel(delroleId.value) //删除角色
          deldialog = false
        }
      "
      >Confirm</el-button
    >
  </el-dialog>
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
}
.cards {
  margin-left: 30px;
  font-size: 18px;
  line-height: 25px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 30px;
  font-size: 18px;
}
.custom-column1 {
  &.cell, // 使用&符号代表父元素
  &.custom-column2.cell {
    font-size: 16px; /* 设置单元格文字大小 */
  }

  &.header,
  &.custom-column2.header {
    font-size: 18px; /* 设置表头文字大小 */
  }
}
el-buttom {
  font-size: 20px;
}
</style>
