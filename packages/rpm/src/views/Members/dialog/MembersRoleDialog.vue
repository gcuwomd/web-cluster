<script setup lang="ts">
// ======================================================引入============================================

import { ref } from "vue"
import {getMembersRole,roleMembers} from "../../../api/methods/members"
import { useRequest } from "alova";
import { RowData } from "../../../types/response-data-model";
export interface roleName{
  roleId:string
  roleName:string
}

// ======================================================变量============================================

const dialogVisible=ref(false)


// 从父组件列表获取到的一行的数据存在这里,进而拿到name
let rowDataFormDad=ref()

  //获取角色的参数websiteId：5d6806eeb2dd4768
  const websiteId:string="5d6806eeb2dd4768"

  //获取到的成员角色存在这里
 /*  interface roles{
    rolesList:roleName[]
  } */

const rolelist= ref<roleName[]>([])

 const chooseRoles= ref('123456')

// =========================================================方法========================================
// 定义方法拿到父组件的数据
const openRoleDialog=(row:RowData)=>{
  dialogVisible.value=true
  rowDataFormDad.value=row  
}
defineExpose({
  openRoleDialog
})

//发送请求获取成员角色
const getRoleMethod=()=>{
  const {onSuccess:getRoleSuccess}=useRequest(getMembersRole(websiteId))
getRoleSuccess((response)=>{
  rolelist.value = response.data.data
})
}
getRoleMethod()
//定义方法点击确认按钮发送请求指定成员角色
const roleDecide=()=>{
  const {onSuccess:roleSuccess}=useRequest(roleMembers(rowDataFormDad.value.username,chooseRoles.value))
  roleSuccess((response)=>{
    console.log(response);
    console.log("success");
  })  
  dialogVisible.value=false
}

//点击确认发送请求指定成员角色，并且关闭弹窗
// const confirm=()=>{
//   dialogVisible.value=false
// }
</script>


<template>
 <el-dialog v-model="dialogVisible" title="角色指定" width="30%" >
  <el-form >
  <el-form-item label="角色指定:">
    <el-select  placeholder="请选择角色" v-model="chooseRoles">
      <el-option   v-for="(roleName) in rolelist" :label="roleName" :value="roleName.roleId" :key="roleName.roleId">{{ roleName.roleName }}</el-option>
    </el-select>
  </el-form-item>
  <el-button plain @click="roleDecide">确认</el-button>
 </el-form>
  </el-dialog>
</template>

<style scoped lang="scss">
.asterisk-left{
  margin-left: 65px;
}
.is-plain{
  margin-left: 380px;
  margin-top: 20px;
}
</style>