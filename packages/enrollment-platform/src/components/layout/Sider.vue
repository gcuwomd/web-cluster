<script setup lang="ts">
</script>
<template>
  <div class="h-full">
    <el-menu class="h-full" :router="true" default-active="/">
      <el-sub-menu index="/">
        <template #title>
          <div class="i-majesticons:home-line text-2xl mr-2"></div>
          <span>数据统计</span>
        </template>
        <el-menu-item index="/fan">饼状图</el-menu-item>
        <el-menu-item index="/histogram">直方图</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/sign">
        <div class="i-majesticons:users-line text-2xl mr-2"></div>
        <span>报名情况</span>
      </el-menu-item>
      <el-menu-item index="/check">
        <div class="i-majesticons:users-line text-2xl mr-2"></div>
        <span>审核</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<style scoped lang="scss"></style>
