<script setup lang="ts">
import Role from './views/role/Role.vue'
/* import autlist from './views/role/autlist.vue' */
/* import WebsiteDetial from './views/website/WebsiteDetial.vue' */
/*import WebsiteList from './views/website/WebsiteList.vue' */
</script>

<template>
  <div class="h-screen">
    <el-container class="h-full">
      <el-header class="border-b-1 border-b-solid border-b-[#dcdfe6]">
        <Header />
      </el-header>
      <el-container class="h-full overflow-hidden">
        <el-aside width="200px">
          <Sider />
        </el-aside>
        <el-container>
          <el-main>
            <!--  <Main /> -->
            <Role></Role>
            <!-- <autlist></autlist> -->
            <!-- <WebsiteDetial></WebsiteDetial> -->
            <!-- <WebsiteList></WebsiteList> -->
            <index></index>
          </el-main>
          <el-footer>
            <Footer />
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<style scoped></style>
