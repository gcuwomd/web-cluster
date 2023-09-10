<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { admin } from '../api/admin'
import { Loadlist } from '../api/loadlist'
import { search } from "../api/search"
import { Search } from '@element-plus/icons-vue'
import { Picture as IconPicture } from '@element-plus/icons-vue'
const tableData = ref<any[]>([])
const total = ref()
let currentPage = ref()
//报名人数信息
const load = async (value: number) => {
  let data = (await admin(value)).data.data
  tableData.value = data.data
  total.value = data.total

}
//根据关键字查找
const searchkey = ref<string>("")
const getkey = async (searchkey: string) => {
  let data = (await search(searchkey)).data.data
  tableData.value = data
}
//加载页面时，组件挂载完成后执行
onMounted(async () => {
  await load(1)
})
//分页功能
const currentChange = async (value: number) => {
  await load(value)
  currentPage.value = value
}

const loadlist = async () => {
  let response = (await Loadlist())
  let data = response.data
  if (!data) {
    return
  }
  const contentDisposition = response.headers['Content-Disposition'] // 从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
  const patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*')
  const result = patt.exec(contentDisposition)
  console.log(result);
  console.log(response);
  let url = window.URL.createObjectURL(new Blob([data]))
  let a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  a.setAttribute('download', 'excel.xlsx')
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(a.href)
  document.body.removeChild(a)
}
</script>
<template>
  <div class="container">
    <div class="buttonFixed">
      <div>
        <el-button @click="loadlist()" type="primary">下载表格</el-button>
      </div>
      <div style="padding-left: 10px;">
        <el-button @click="load(currentPage)" type="primary">刷新表格</el-button>
      </div>
      <div style="padding-left: 20px;">
        <el-input v-model="searchkey" :rows="2" type="text" placeholder="请输入关键词" />
      </div>
      <div style="padding-left: 10px;">
        <el-button @click="getkey(searchkey)" :disabled="searchkey === ''" type="primary" :icon="Search">查找</el-button>
      </div>
    </div>
    <div style="margin-top: 10px">
      <el-table :data="tableData" style="width: 100%">
        <template v-slot:empty>
          <el-empty description="No Data" />
        </template>
        <el-table-column fixed type="selection" width="80" />
        <el-table-column fixed prop="username" label="Name" width="80" />
        <el-table-column prop="id" label="Id" width="180" />
        <el-table-column prop="phone" label="Phone" width="180" />
        <el-table-column prop="college" label="College" width="180" />
        <el-table-column prop="major" label="Major" width="180" />
        <el-table-column label="Volunteer" width="180">
          <template #default="scope">
            <div v-for="(val, index) in scope.row.volunteer" :key="index">
              <div>{{ val + '\n' }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="gender" label="Gender" width="180" />
        <el-table-column prop="introduction" label="Introduction" width="180">
          <template #default="scope">
            <el-tooltip :content="scope.row.introduction" raw-content placement="top-start" v-if="scope.row.introduction">
              <span v-if="scope.row.introduction && scope.row.introduction.length <= 10">
                {{ scope.row.introduction }}
              </span>
              <span v-if="scope.row.introduction && scope.row.introduction.length > 10">
                {{ scope.row.introduction.substr(0, 10) + '...' }}
              </span>
            </el-tooltip>
            <span v-else-if="scope.row.introduction === null"> Null </span>
          </template>
        </el-table-column>
        <el-table-column prop="image" label="Image" align="center" width="180">
          <template #default="scope">
            <div class="block text-center">
              <el-carousel height="70px" :autoplay="false" indicator-position="outside">
                <el-carousel-item v-for="(val, index) in scope.row.image" :key="index">
                  <el-image style="width: 70px; height: 70px" :src="val" :zoom-rate="1.2" :preview-src-list="[val]"
                    :initial-index="4" fit="cover" hide-on-click-modal="true" preview-teleported="true">
                    <template #error>
                      <div class="demo-image__error">
                        <div class="block">
                          <el-image>
                            <template #error>
                              <div class="image-slot">
                                <el-icon><icon-picture /></el-icon>
                              </div>
                            </template>
                          </el-image>
                        </div>
                      </div>
                    </template>
                  </el-image>
                </el-carousel-item>
              </el-carousel>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination background layout="prev,pager,next" :total="total" @current-change="currentChange"
      class="pagination-center" v-model:current-page="currentPage"></el-pagination>
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

.buttonFixed {
  width: 100%;
  display: flex;
  align-items: center;
}

.demo-image__error .block {
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 70px;
  box-sizing: border-box;
  vertical-align: top;
}

.demo-image__error .el-image {
  width: 70px;
  height: 70px;
}

.demo-image__error .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
}

.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
</style>
