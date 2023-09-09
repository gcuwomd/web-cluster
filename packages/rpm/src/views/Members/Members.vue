<script setup lang="ts">
// ---------------------------------------------------导入-----------------------------------------------------
import { ref } from 'vue'
import { useRequest } from "alova";
import { getNembersList,deleteMembers } from "../../api/methods/members";
import  MembersDialog  from "../../views/Members/dialog/MembersDialog.vue"
import  MembersRoleDialog from "../Members/dialog/MembersRoleDialog.vue";
import { Edit,Delete } from "@element-plus/icons-vue";
import { ElMessageBox ,ElMessage} from 'element-plus';
import { data ,RowData} from "../../types/response-data-model";
import { ElTable } from 'element-plus'



// -----------------------------------------------------变量--------------------------------------------------
const loading=ref(false)

// 定义get请求参数对象
const params=ref({
    departmentId:"89904669e3354e83",
    searchType:"",
    keyword:"",
    pageSize:10,
    page:1
})



// 接受返回成员列表数组

let membersList=ref<data[]>([])

//接受返回成员列表的总条数
let total=ref(0)

// 编辑弹框
const editDialog=ref()

//指定成员角色弹窗
const roleDialog=ref()


// -------------------------------------------------------方法--------------------------------------------------

// 发送请求获取成员列表并赋值的方法

  loading.value=true
  const {onSuccess:getNembersListSuccess,send: getMemberListSend }=useRequest(getNembersList(params.value),{
  force:(shouldForce)=>shouldForce
  })
  getNembersListSuccess((response) => {
    membersList.value=response.data.data.row
    total.value=response.data.data.total
  })
  loading.value=false


// 进入页面先发送请求并且渲染



//分页逻辑方法：size变化
const onSizeChange=(size:number)=>{
    params.value.pageSize=size
    getMemberListSend(true)
}

//分页逻辑方法：page变化
const onCurrentChange=(page:number)=>{
  params.value.page=page
  getMemberListSend(true)
}

//点击编辑按钮
const edit=(row:RowData)=>{
 editDialog.value.open(row)
 console.log(row);
}


const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const members = ref<string[]>([])

//点击删除按钮,发送删除请求


const del=async(members: string[])=>{
console.log("删除前的membersList");
console.log(members)
members.splice(0); 
console.log("删除前的total");
console.log(total);
//多选框

  let val=multipleTableRef.value!.getSelectionRows()
  console.log(val); 
  for(let index = 0;index<val.length; index++){
    let getusername: string = val[index].username
    members.push(getusername) 
  }


await ElMessageBox.confirm("你确定要删除该成员吗","温馨提示",{
  type:'warning',
  confirmButtonText:"确定",
  cancelButtonText:"取消"
})
    const {onSuccess:deleteSuccess}=useRequest(deleteMembers(members),{
      force:(shouldForce)=>shouldForce
    })
    deleteSuccess((response)=>{
        console.log(response);
        getMemberListSend(true)
        console.log("删除后的membersList");
        console.log(membersList.value);
        console.log("删除后的total");
        console.log(total);
        ElMessage.success("删除成功")
    })
}

//点击指定按钮
const add=(row:RowData)=>{
  roleDialog.value.openRoleDialog(row)
  
}

// //编辑成功
// const changeSuccess=()=>{
// getMembersListMethod()
// }

// //删除成功
// const successDel=()=>{
// // params.value.pageSize="2"
// // getMembersListMethod()

// }
</script>


<template>
<div>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>成员列表</span>
      </div>
      
    </template>
    <!-- 成员信息列表开始 -->
    <el-table :data="membersList" v-loading="loading"   ref="multipleTableRef">
        <el-table-column type="selection" width="40" />
        <el-table-column label="序号" type="index" width="100" ></el-table-column>
        <el-table-column label="username" prop="username"></el-table-column>
        <el-table-column label="roleName" prop="roleName"></el-table-column>
        <el-table-column label="nickName" prop="nickName"></el-table-column>
        <el-table-column label="phone" prop="phone"></el-table-column>
        <el-table-column label="major" prop="major"></el-table-column>
        <!-- <el-table-column label="classNumber" prop="classNumber"></el-table-column> -->
        <el-table-column label="操作">
          <template #default="{row}">
            <el-button type="primary" :icon="Edit" round @click="edit(row)" circle plain></el-button>         
            <el-button type="primary" plain @click="add(row)">指定角色</el-button>
          </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-config-provider>
     <el-button type="danger" :icon="Delete" round @click="del(members)" circle plain></el-button>
     <el-pagination
        v-model:current-page="params.page"
        v-model:page-size="params.pageSize"
        :page-sizes="[2,3,5,10]"
        :background="true"
        layout="jumper, total, sizes, prev, pager, next"
        :total="total"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
        style="margin:20px;justify-content:center"
    />    
     </el-config-provider>
   <!-- 弹窗 -->
   <MembersDialog ref="editDialog"></MembersDialog>
   <MembersRoleDialog ref="roleDialog" :total="total" :memberList="membersList" :params="params" :loading="loading"></MembersRoleDialog>
    
   </el-card>
</div>
</template>



<style scoped lang="scss">
.page-container{
  min-height: 100%;
  box-sizing: border-box;

}
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>