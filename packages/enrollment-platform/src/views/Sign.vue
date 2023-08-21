<script setup lang="ts">
import { ref, onMounted } from "vue";
import { admin } from "../api/admin"

//报名人数信息
const load = async () => {
  console.log((await admin()).data.data);
  let data = (await admin()).data.data
  tableData.value = data
  total.value = data.length
}

//加载页面时，组件挂载完成后执行
onMounted(async () => { await load() })
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
        <el-table-column type="selection" />
        <el-table-column label="Order">
          <template #default="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="image" label="Image">
          <template #default="scope">
              <div v-for="(val, index) in scope.row.image" :key="index">
                  <el-image style="width: 70px; height: 70px" :src="val" alt=""></el-image>
              </div>
          </template>
        </el-table-column>
        <el-table-column prop="college" label="College" />
        <el-table-column prop="id" label="Id" />
        <el-table-column label="Volunteer" width="120">
          <template #default="scope">
            <div v-for="(val, index) in scope.row.volunteer" :key="index">
              <div>{{ val + '\n' }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="gender" label="Gender" />
        <el-table-column prop="major" label="Major" />
        <el-table-column prop="introduction" label="Introduction" width="120">
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
