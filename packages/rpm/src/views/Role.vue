<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { rolelist } from '../api/Role-manage/role-list'
const pageSize = ref(10)
const currentPage = ref(1)

interface Role {
  date: string
  name: string
  state: string
  city: string
  address: string
  zip: string
}
const total = ref(100)

//加载出卡片
const roleData: Role[] = [
  {
    date: '1',
    name: '1',
    state: '1',
    city: '1',
    address: '1',
    zip: '1'
  },

  {
    date: '1',
    name: '1',
    state: '1',
    city: '1',
    address: '1',
    zip: '1'
  },
  {
    date: '1',
    name: '1',
    state: '1',
    city: '1',
    address: '1',
    zip: '1'
  },
  {
    date: '1',
    name: '1',
    state: '1',
    city: '1',
    address: '1',
    zip: '1'
  },
  {
    date: '1',
    name: '1',
    state: '1',
    city: '1',
    address: '1',
    zip: '1'
  },
  {
    date: '1',
    name: '1',
    state: '1',
    city: '1',
    address: '1',
    zip: '1'
  },
  {
    date: '1',
    name: '1',
    state: '1',
    city: '1',
    address: '1',
    zip: '1'
  },
  {
    date: '1',
    name: '1',
    state: '1',
    city: '1',
    address: '1',
    zip: '1'
  },
  {
    date: '1',
    name: '1',
    state: '1',
    city: '1',
    address: '1',
    zip: '1'
  },
  {
    date: '1',
    name: '1',
    state: '1',
    city: '1',
    address: '1',
    zip: '1'
  }
]
onMounted(async () => {
  let data = (await rolelist()).data
  roleData.values = data
  total.value = data.length
})
//更新页数
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>

<template>
  <el-row :gutter="40">
    <el-col v-for="(role, index) in roleData" :key="index" :span="12">
      <el-card style="margin-top: 20px">
        <template #header>
          <div class="card-header">
            <span>{{ role.name }}</span>
            <el-button class="button" text>Operation button</el-button>
          </div>
        </template>
        <div class="cards">
          <p>{{ role.date }}</p>
          <p>{{ role.state }}</p>
          <p>{{ role.city }}</p>
          <p>{{ role.address }}</p>
          <p>{{ role.zip }}</p>
        </div>
      </el-card>
    </el-col>
  </el-row>
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
</template>

<style scoped lang="scss">
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
</style>
