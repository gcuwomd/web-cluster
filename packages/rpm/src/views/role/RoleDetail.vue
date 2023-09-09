<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useRequest } from 'alova'
import { getRole } from '../../api/methods/role'

const route = useRoute()

const { data: roleInfo } = useRequest(
  (roleId: string = route.params.id as string) => getRole(roleId),
  {
    initialData: {}
  }
)

</script>
<template>
  <section>
    <el-breadcrumb>
      <el-breadcrumb-item>权限管理系统</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/role/list' }">角色管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{ roleInfo.roleName }}</el-breadcrumb-item>
    </el-breadcrumb>
  </section>
  <section class="mt-4">
    <el-card>
      <el-descriptions size="large" :column="5" border>
        <template #title>
          <h3>角色基本信息</h3>
        </template>
        <template #extra>
          <el-button type="primary" @click="() => {}">修改基本信息</el-button>
        </template>
        <el-descriptions-item label="角色名称">{{ roleInfo.roleName }}</el-descriptions-item>
        <el-descriptions-item label="角色可访问站点数量">{{
          roleInfo.websiteNumber
        }}</el-descriptions-item>
        <el-descriptions-item label="担任此角色成员数量">{{
          roleInfo.userNumber
        }}</el-descriptions-item>
        <el-descriptions-item label="角色可访问视图数量">{{
          roleInfo.routeNumber
        }}</el-descriptions-item>
        <el-descriptions-item label="角色可访问接口数量">{{
          roleInfo.apiNumber
        }}</el-descriptions-item>
      </el-descriptions>
    </el-card>
  </section>
  <section class="mt-8">
    <el-collapse>
      <el-collapse-item name="1">
        <template #title>
          <h3 class="text-xl">角色可访问站点列表</h3>
        </template>
        <accessible-website-list />
      </el-collapse-item>
      <el-collapse-item name="2">
        <template #title>
          <h3 class="text-xl">角色权限列表</h3>
        </template>
      </el-collapse-item>
    </el-collapse>
  </section>
</template>
<style scoped lang="scss"></style>
