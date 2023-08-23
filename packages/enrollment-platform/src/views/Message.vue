<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { ElTable, ElMessage } from 'element-plus'
import { message } from '../api/message'
import { deleteMessage } from "../api/deleteMessage"
const tableData = ref<any[]>([])
const table = ref<InstanceType<typeof ElTable>>()
const total = ref(100)
onMounted(async () => {
  await Message()
})
const currentChange = (value: number) => {
  console.log(value)
}
const Message = async () => {
  let data = (await message()).data.data
  tableData.value = data
  total.value = data.length
}
const delAll = async () => {
  let getrow = table.value!.getSelectionRows()
  let id: string[] = [];
  for (let index = 0; index < getrow.length; index++) {
          let getuuid =getrow[index].messageId
          id.push(getuuid)
  }
  await deleteMessage(id)
}
</script>

<template>
  <div class="container">
    <el-button type="primary" @click="delAll()">批量删除短信</el-button>
    <div style="margin-top: 10px">
      <el-table ref="table" :data="tableData" style="width: 100%">
        <el-table-column type="selection" />
        <el-table-column prop="username" label="Name" show-overflow-tooltip />
        <el-table-column prop="id" label="Id" show-overflow-tooltip />
        <el-table-column prop="message" label="Message" show-overflow-tooltip />
        <el-table-column label="operation" width="180">
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
            >delete</el-button
          >
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      layout="prev,pager,next"
      :total="total"
      @current-change="currentChange"
      class="pagination-center"
    ></el-pagination>
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

