<script setup lang="ts">
import { ref, computed, toRaw } from 'vue'
import { useRequest } from 'alova'
import { useRoute } from 'vue-router'
import { getAccessibleWebsite, getAllWebsite } from '../../api/methods/role'

const route = useRoute()

const open = ref<boolean>(false)

const { data: websiteOptions } = useRequest(getAllWebsite, { initialData: [] })
const { data: accessibleWebsite } = useRequest(
  (_shouldForce: boolean, roleId: string = route.params.id as string) =>
    getAccessibleWebsite(roleId),
  {
    force: (shouldForce: boolean) => shouldForce,
    initialData: []
  }
)

const disabledWebsiteIds = computed(() => accessibleWebsite.value.map((item) => item.websiteId))
const options = computed(() =>
  websiteOptions.value?.map((item) =>
    disabledWebsiteIds.value.includes(item.websiteId) ? { ...item, disabled: true } : toRaw(item)
  )
)
const selectedOptions = ref([])

const handleSubmit = () => {
  console.log(selectedOptions.value)
}
const closeDialog = () => {
  selectedOptions.value = []
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
      <el-button type="danger">删除角色可访问站点</el-button>
    </div>
    <el-table ref="tableRef" :data="accessibleWebsite">
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
        <el-button>取消</el-button>
        <el-button type="primary" :disabled="selectedOptions.length === 0" @click="handleSubmit"
          >添加</el-button
        >
      </section>
    </template>
  </el-dialog>
</template>
<style scoped lang="scss"></style>
