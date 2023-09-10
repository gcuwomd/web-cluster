<script setup lang="ts">
import { ref, computed, toRaw } from 'vue'
import { useRequest } from 'alova'
import { useRoute } from 'vue-router'
import {
  getAccessibleWebsite,
  getAllWebsite,
  AddroleWebsite,
  DelroleWebsite
} from '../../api/methods/role'
import { ElTable } from 'element-plus'
import { ElMessageBox, ElMessage } from 'element-plus'

const route = useRoute()

const open = ref<boolean>(false)

const { data: websiteOptions } = useRequest(getAllWebsite, { initialData: [] })
const { data: accessibleWebsite, send: updataaccessibleWebsite } = useRequest(
  (_shouldForce: boolean, roleId: string = route.params.id as string) =>
    getAccessibleWebsite(roleId),
  {
    force: (shouldForce: boolean) => shouldForce,
    initialData: []
  }
)

const disabledWebsiteIds = computed(() => accessibleWebsite.value.map((item) => item.websiteId))

const options = computed(
  () =>
    websiteOptions.value?.map((item) =>
      disabledWebsiteIds.value.includes(item.websiteId) ? { ...item, disabled: true } : toRaw(item)
    )
)
//添加 可访问站点
const selectedOptions = ref([])
//提交
const handleSubmit = () => {
  console.log(selectedOptions.value)
  updataaddroleWebsite(selectedOptions.value, route.params.id as string)
}
const closeDialog = () => {
  selectedOptions.value = []
  open.value = false
}
//添加角色可访问站点
const { onSuccess: addroleWebsite, send: updataaddroleWebsite } = useRequest(
  (list: string[], roleId: string) => AddroleWebsite(list, roleId),
  {
    immediate: false
    //取消自动发送请求
  }
)
addroleWebsite((response) => {
  updataaccessibleWebsite(true)
  console.log('添加成功')
})
//删除角色可访问站点多选框
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const websitess = ref<string[]>([])
//删除
const del = async (websites: string[]) => {
  websites.splice(0)
  let val = multipleTableRef.value!.getSelectionRows()
  console.log(val)
  for (let index = 0; index < val.length; index++) {
    let websiteIds: string = val[index].websiteId
    websitess.value.push(websiteIds)
  }
  await ElMessageBox.confirm('你确定要删除这些站点', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
  const { onSuccess: deleteSuccess } = useRequest(
    DelroleWebsite(websitess.value, route.params.id as string),
    {
      force: (shouldForce) => shouldForce
    }
  )
  deleteSuccess((response) => {
    console.log(response)
    updataaccessibleWebsite(true)
    ElMessage.success('删除成功')
  })
}
</script>
<template>
  <section>
    <div class="flex justify-end my-4">
      <el-button
        type="primary"
        @click="
          () => {
            open = true
          }
        "
        >添加角色可访问站点</el-button
      >
      <el-button type="danger" @click="del(websitess)">删除角色可访问站点</el-button>
    </div>
    <el-table :data="accessibleWebsite" ref="multipleTableRef">
      <el-table-column type="selection" width="55" />
      <el-table-column label="站点Logo" prop="websiteLogo">
        <template #default="{ row }">
          <img :src="row.websiteLogo" class="h-11 w-11" />
        </template>
      </el-table-column>
      <el-table-column label="站点名称" prop="websiteName" />
      <el-table-column label="站点URL" prop="websiteUrl" />
    </el-table>
  </section>
  <el-dialog
    v-model="open"
    title="添加角色可访问站点"
    :show-close="false"
    width="512"
    class="!rounded-lg"
    @close="closeDialog"
  >
    <el-select
      v-model="selectedOptions"
      :options="options"
      multiple
      collapse-tags
      collapse-tags-tooltip
      :max-collapse-tags="3"
      class="w-full"
    >
      <el-option
        v-for="item in options"
        :key="item.websiteId"
        :label="item.websiteName"
        :value="item.websiteId"
        :disabled="item.disabled || false"
      />
    </el-select>
    <template #footer>
      <section>
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" :disabled="selectedOptions.length === 0" @click="handleSubmit"
          >添加</el-button
        >
      </section>
    </template>
  </el-dialog>
</template>
<style scoped lang="scss"></style>
