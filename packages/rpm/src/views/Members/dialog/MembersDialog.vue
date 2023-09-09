<script setup lang="ts">
// ------------------------------------------导入-----------------------------------------
import { ref } from 'vue'
import { useRequest } from "alova";
import { RowData } from '../../../types/response-data-model';
import { editMembersList} from "../../../api/methods/members";

// ------------------------------------------变量-----------------------------------------

    const dialogVisible=ref(false)
    // const formRef=ref()
    //表单
    const formModel=ref( {
      username: "",
      name: "",
      phone: "",
      nickName: "",
      major: "",
      grade: "",
      classNumber: "",
      dorm: "",
      politicsStatus: "",
      avatar: "",
      position: " ",
      email: ""
    })
    //校验
     const rules={
      username:[
        {required:true,message:"请输入name",trigger:'blur'},
        {
          pattern:/^\S{1,10}$/,
          message:"name必须是1-10位的非空字符",
          trigger:'blur'
        }
      ],
      name:[
        {required:true,message:"请输入age",trigger:'blur'},
        {
          pattern:/^\S{1,10}$/,
          message:"age必须是1-10位的非空字符",
          trigger:'blur'
        }
      ],
      phone:[
        {required:true,message:"请输入",trigger:"blur"}
      ],
      nickName:[
        {required:true,message:"请输入",trigger:"blur"}
      ],
      major:[
        {required:true,message:"请输入",trigger:"blur"}
      ],
      grade:[
        {required:true,message:"请输入",trigger:"blur"}
      ],
      classNumber:[
        {required:true,message:"请输入",trigger:"blur"}
      ],
      dorm:[
        {required:true,message:"请输入",trigger:"blur"}
      ],
      politicsStatus:[
        {required:true,message:"请输入",trigger:"blur"}
      ],
      avatar:[
        {required:true,message:"请输入",trigger:"blur"}
      ],
      position:[
        {required:true,message:"请输入",trigger:"blur"}
      ],
      email:[
        {required:true,message:"请输入",trigger:"blur"}
      ]
    }

    const emit =defineEmits(['success'])
// ------------------------------------------方法-----------------------------------------

    // 组件对外暴露open方法
    const open=(row:RowData)=>{
        dialogVisible.value=true
        formModel.value={...row}
    }
    defineExpose({
        open
    })



//发送请求编辑成员的方法
const editMembersListMethod=()=>{
  const {onSuccess:editMembersSuccess}=useRequest(editMembersList(formModel.value))
  //请求成功
  editMembersSuccess((response) => {
    console.log(response);
})
console.log(formModel.value);
}

 //点击确认提交
 const onSubmit=async()=>{
  console.log("点击了提交");
  // await formRef.value.validate()
  const isEdit=formModel.value.name
  if(isEdit){
    // 发编辑请求
  editMembersListMethod()
  dialogVisible.value=false
  emit("success")
  }
 }
</script>

<template>
  <div>
    <el-dialog v-model="dialogVisible" title="编辑" width="30%">
        <!-- 表单 -->
        <el-form :model="formModel" :rules="rules" label-width="120px">
          <el-form-item  label="username" prop="username">
            <el-input placeholder="请输入username" v-model="formModel.username"></el-input>
          </el-form-item>
          <el-form-item  label="name" prop="name">
            <el-input placeholder="请输入name" v-model="formModel.name"></el-input>
          </el-form-item>
          <el-form-item  label="phone" prop="phone">
            <el-input placeholder="请输入phone" v-model="formModel.phone"></el-input>
          </el-form-item>
          <el-form-item  label="nickname" prop="nickname">
            <el-input placeholder="请输入nickname" v-model="formModel.nickName"></el-input>
          </el-form-item>
          <el-form-item  label="major" prop="major">
            <el-input placeholder="请输入major" v-model="formModel.major"></el-input>
          </el-form-item>
          <el-form-item  label="grade" prop="grade">
            <el-input placeholder="请输入grade" v-model="formModel.grade"></el-input>
          </el-form-item>
          <el-form-item  label="classNumber" prop="classNumber">
            <el-input placeholder="请输入classNumber" v-model="formModel.classNumber"></el-input>
          </el-form-item>
          <el-form-item  label="dorm" prop="dorm">
            <el-input placeholder="请输入dorm" v-model="formModel.dorm"></el-input>
          </el-form-item>
          <el-form-item  label="politicsStatus" prop="politicsStatus">
            <el-input placeholder="请输入politicsStatus" v-model="formModel.politicsStatus"></el-input>
          </el-form-item>
          <el-form-item  label="avatar" prop="avatar">
            <el-input placeholder="请输入avatar" v-model="formModel.avatar"></el-input>
          </el-form-item>
          <el-form-item  label="position" prop="position">
            <el-input placeholder="请输入position" v-model="formModel.position"></el-input>
          </el-form-item>
          <el-form-item  label="email" prop="email">
            <el-input placeholder="请输入email" v-model="formModel.email"></el-input>
          </el-form-item>
        </el-form>
       <!-- 表单结束 -->
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="onSubmit">
              确定
            </el-button>
          </span>
        </template>
    </el-dialog>
  </div>
</template>
<style scoped lang="scss"></style>