<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { rolelist } from '../../api/Role-manage/role-list'
import { AddRole, DelRole } from '../../api/Role-manage/role-manage'
import { useRequest } from 'alova'

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
}
</script>

<template>
  <!-- 头部导航 -->
  <section>
    <div class="header">
      <h3>角色管理</h3>
      <div>
        <el-button class="button" type="warning" @click="AddRoledialog = true">添加角色</el-button>
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
    <el-button
      type="primary"
      @click="
        () => {
          updateDelRole(DelRole(delroleId)) //删除角色
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
.card-body {
  display: flex;
  justify-content: space-between;
  align-items: center;

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
