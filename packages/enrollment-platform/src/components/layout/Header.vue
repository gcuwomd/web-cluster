<script setup lang="ts">
import logo from '../../assets/gcu-womd.png'
import avatar from "../../assets/vue.svg"
import { search } from "../../api/seatch";
import { id } from "../../api/id-search";
import { ref } from 'vue';
const searching = () => {
        search(),
        id()
    }
</script>
<script lang="ts">
const inputValue = ref('');
export { inputValue };
</script>
<template>
  <div class="h-full flex justify-between items-center">
    <div class="flex gap-x-4 items-center">
      <img :src="logo" class="w-14" />
      <h1>招新系统后台</h1>
    </div>
    <div class="flex gap-x-2 items-center" style="margin-left: 40%">
      <el-input
        v-model="inputValue"
        placeholder="搜索..."
        class="w-48 ml-2"
      />
      <img src="../../assets/search.png" alt="" class="search-icon" @click="searching"/>
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
<style scoped lang="scss">
.search-icon {
  width: 25px;
  height: 25px; 
}
</style>
