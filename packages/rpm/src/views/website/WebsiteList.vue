<script setup lang="ts">
import { ref } from 'vue'
import { getWebsiteList } from '../../api/methods/website'
import { useRequest } from 'alova'
import { WebsiteBaseInfo } from '../../types/response-data-model'

const websiteList = ref<WebsiteBaseInfo[]>([])
const openDialog = ref<boolean>(false)

const { onSuccess, send: updateList } = useRequest(() =>getWebsiteList('202110098172'), {
  force: (shouldForce) => shouldForce
})
onSuccess((response) => {
  websiteList.value = response.data.data
})
</script>
<template>
  <section class="flex gap-4 flex-wrap">
    <el-card
      shadow="always"
      class="w-80 cursor-pointer"
      v-for="website in websiteList"
      :key="website.websiteId"
      @click="
        () => {
          $router.push({ path: `/website/${website.websiteId}` })
        }
      "
    >
      <section class="flex gap-x-2 items-center">
        <div class="w-11 h-11">
          <img :src="website.websiteLogo" class="w-full h-full rounded-full" />
        </div>
        <h3>{{ website.websiteName }}</h3>
      </section>
      <el-divider />
      <el-descriptions :column="1">
        <el-descriptions-item label="站点URL">{{ website.websiteUrl }}</el-descriptions-item>
        <el-descriptions-item label="所属部门">{{ website.departmentName }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card
      shadow="always"
      class="w-80 cursor-pointer flex flex-col justify-center items-center"
      @click="
        () => {
          openDialog = true
        }
      "
    >
      <div class="i-ei:plus text-7xl text-[#c0c4cc]"></div>
      <h3 class="text-[#c0c4cc]">添加站点</h3>
    </el-card>
  </section>
  <WebsiteInfoDialog
    :open="openDialog"
    title="添加站点"
    mode="add"
    @close="
      () => {
        openDialog = false
      }
    "
    @complete="
      () => {
        updateList(true)
      }
    "
  />
</template>
<style scoped lang="scss"></style>
