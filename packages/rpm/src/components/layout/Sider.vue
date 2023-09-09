<script setup lang="ts"></script>
<template>
  <div class="h-full">
    <el-menu class="h-full" :router="true" default-active="/">
      <el-menu-item index="/">
        <div class="i-material-symbols:analytics-outline text-2xl mr-2"></div>
        <span> 总览 </span>
      </el-menu-item>
      <el-menu-item index="/website/list">
        <div class="i-mingcute:web-line text-2xl mr-2"></div>
        <span>站点管理</span>
      </el-menu-item>
      <el-menu-item index="/organization">
        <div class="i-charm:organisation text-2xl mr-2"></div>
        <span>组织架构</span>
      </el-menu-item>
      <el-menu-item index="/role/list">
        <div class="i-majesticons:scan-user-line text-2xl mr-2"></div>
        <span>角色管理</span>
      </el-menu-item>
      <el-menu-item index="/members">
        <div class="i-majesticons:users-line text-2xl mr-2"></div>
        <span>成员管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<style scoped lang="scss"></style>
