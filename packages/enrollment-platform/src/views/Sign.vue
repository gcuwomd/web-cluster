<script setup lang="ts">
import { ref, onMounted } from "vue";
import { admin } from "../api/admin"
import { pass } from "../api/pass"
import { nopass } from "../api/noPass"
import { willpass } from "../api/willPass"
//报名人数信息
const load = async () => {
  let data = (await admin()).data.data
  tableData.value = data
  total.value = data.length
}
//通过人员信息
const passPerson = async () => {
  console.log((await pass()).data.data)
}
//未通过人员信息
const noPassPerson = async () => {
  console.log((await nopass()).data.data)
}
//未处理人员信息
const willPassPerson = async () => {
  console.log((await willpass()).data.data)
}
//加载页面时，组件挂载完成后执行
onMounted(async () => { await load(), passPerson(), noPassPerson(), willPassPerson() })
const tableData = ref<any[]>([]);
const total = ref(100);

const currentChange = (value: number) => {
  console.log(value);
};
const handleEdit = (index: number, row: any) => {
  console.log(index, row);
};
const handleDel = (index: number, row: any) => {
  console.log(index, row);
};
</script>
<template>
  <div class="container">
    <div style="margin-top: 10px">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="college" label="College" />
        <el-table-column prop="volunteer" label="Volunteer" width="150" />
        <el-table-column prop="gender" label="Gender" width="80" />
        <el-table-column prop="major" label="Major" />
        <el-table-column prop="id" label="Id" width="120" />
        <el-table-column prop="introduction" label="Introduction">
          <template #default="scope">
            <el-tooltip :content="scope.row.introduction" raw-content placement="top-start" v-if="scope.row.introduction">
              <span v-if="scope.row.introduction && scope.row.introduction.length <= 10">
                {{ scope.row.introduction }}
              </span>
              <span v-if="scope.row.introduction && scope.row.introduction.length > 10">
                {{ scope.row.introduction.substr(0, 10) + "..." }}
              </span>
            </el-tooltip>
            <span v-else-if="scope.row.introduction == null"> NA </span>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="Name" width="80" />
        <el-table-column label="Operations">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button size="small" type="danger" @click="handleDel(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination background layout="prev,pager,next" :total="total" @current-change="currentChange"
      class="pagination-center"></el-pagination>
  </div>
</template>
<style scoped>
.container {
  width: 100%;
}

.table {
  margin: 10px 0;
}

.input-with-select {
  width: 380px;
  margin-right: 20px;
}

.pagination-center {
  margin-top: 10px;
  justify-content: center;
  align-items: center;
}

:deep(table tr span.el-tooltip__trigger) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
