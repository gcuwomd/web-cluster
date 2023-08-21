<script setup lang="ts">

</script>

<template>
  <div class="h-screen ">
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
            <Main />
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
