<script setup lang="ts">
import logo from '../../assets/gcu-womd.png'
import { useStore } from '../../store';
const store=useStore();
</script>
<template>
  <div class="h-full flex justify-between items-center">
    <div class="flex gap-x-4 items-center">
      <img :src="logo" class="w-14" />
      <h1>招新系统后台</h1>
    </div>
    <div class="flex gap-x-2 items-center">
      <el-avatar :src="store.avatar" />
      <el-dropdown>
        <div class="flex gap-x-2 cursor-pointer focus-visible:outline-none">
          <el-text size="large">{{store.name}}</el-text>
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
