<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { nopass } from '../../api/noPass'
import { subNext } from '../../api/submitNext'
import { ElTable, ElMessage } from 'element-plus'
import { changepass } from '../../api/status'
import { Picture as IconPicture } from '@element-plus/icons-vue'
const tableData = ref<any[]>([])
const total = ref(100)
const table = ref<InstanceType<typeof ElTable>>()
//未通过人员信息
const nopassPerson = async () => {
  let data = (await nopass()).data.data
  tableData.value = data
  total.value = data.length
}

onMounted(async () => {
  await nopassPerson()
})

const handleCheck = async (rowid: string) => {
  const { message } = (await changepass(rowid, '1')).data
  if (message === 'success') {
    await nopassPerson()
    ElMessage({
      message: '修改成功!',
      type: 'success',
    })
  }
}

const submitnext = async (id: number) => {
  const { message }: any = (await subNext(id)).data
  if (message === 'success') {
    await nopassPerson()
    ElMessage({
      message: '修改成功!',
      type: 'success',
    })
  }
}
</script>
<template>
  <div class="container">
    <el-button size="small" plain disabled>发送请求</el-button>
    <div style="margin-top: 10px">
      <el-table ref="table" :data="tableData" style="width: 100%">
        <template v-slot:empty>
          <el-empty description="No Data" />
        </template>
        <el-table-column fixed type="selection" width="80" />
        <el-table-column fixed prop="username" label="Name" width="80" />
        <el-table-column prop="id" label="Id" width="180" />
        <el-table-column prop="phone" label="Phone" width="180" />
        <el-table-column prop="college" label="College" width="180" />
        <el-table-column prop="major" label="Major" width="150" />
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
        <el-table-column label="Button" width="120">
          <template #default="scope">
            <el-button size="small" plain @click="handleCheck(scope.row.id)">通过</el-button>
          </template>
        </el-table-column>
        <el-table-column label="Operation" width="120">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="submitnext(scope.row.id)">提交给下个部门</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
