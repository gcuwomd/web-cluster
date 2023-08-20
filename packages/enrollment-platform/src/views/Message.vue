<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { message } from "../api/message"
const Message = async () => {
  let data = (await message()).data.data
  tableData.value = data
  total.value = data.length
}
onMounted(async () => { await Message() })
const tableData = ref<any[]>([]);
const total = ref(100);
const currentChange = (value: number) => {
    console.log(value);
};
</script>

<template>
  <div class="container">
    <div style="margin-top: 10px">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="username" label="Name" />
        <el-table-column prop="id" label="Id" />
        <el-table-column prop="message" label="Message" />
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

