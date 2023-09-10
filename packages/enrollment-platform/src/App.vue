<script setup lang="ts">
import { onMounted } from 'vue';
import { getAccessToken } from './api/token'
import { refresh_tokens } from './localStore'

const urlParams = new URLSearchParams(window.location.search)
const refresh_token = urlParams.get('refresh_token')


onMounted(() => {
  if (refresh_tokens.value) {
    getAccessToken()
  }
  else if (refresh_token) {
    getAccessToken()
  }
  else {
    //执行获取refresh token
    window.location.href = 'https://nav.bamdev.space'
  }
}
)

</script>

<template>
  <div class="">
    <el-container class="h-full">
      <el-header class="border-b-1 border-b-solid border-b-[#dcdfe6]">
        <Header />
      </el-header>
      <el-container class="h-full">
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
