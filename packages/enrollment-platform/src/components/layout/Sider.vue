<script setup lang="ts"></script>
<template>
  <div class="h-full">
    <el-menu class="h-full" :router="true" default-active="/">
      <el-sub-menu index="/">
        <template #title>
          <span>数据统计</span>
        </template>
        <el-menu-item index="1-1">饼状图</el-menu-item>
            <el-menu-item index="1-2">直方图</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="1-1">报名信息
        
      </el-menu-item>
    </el-menu>
  </div>
</template>
<style scoped lang="scss"></style>
