<script setup lang="ts">
import logo from '../../assets/gcu-womd.png'
import avatar from "../../assets/vue.svg"
</script>
<template>
  <div class="h-full flex justify-between items-center">
    <div class="flex gap-x-4 items-center">
      <img :src="logo" class="w-14" />
      <h1>网站运维部角色权限管理系统</h1>
    </div>
    <div class="flex gap-x-2 items-center">
      <el-avatar :src="avatar" />
      <el-dropdown>
        <div class="flex gap-x-2 cursor-pointer focus-visible:outline-none">
          <el-text size="large">Jammie Griffin</el-text>
          <div class="i-ep:arrow-down"></div>
        </div>
        <template #dropdown>
          <el-dropdown-item>站点导航</el-dropdown-item>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<style scoped lang="scss"></style>
