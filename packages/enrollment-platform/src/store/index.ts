import { defineStore } from "pinia"
import { ref } from "vue"

export const useStore = defineStore("userInfo", () => {
    const websiteId=ref<string|null>('5d6806eeb2dd4768')
    const refresh_token = ref<string|null>()
    const access_token =ref<string|null>()
    const name=ref<string|null>()
    const organizationId= ref<string|null>()
    const departmentId=ref<string|null>()
    const avatar=ref<string|null>()
    const api=ref<Array<object>>()
    const route=ref<Array<object>>()
    return { websiteId,refresh_token,access_token,name,organizationId,departmentId,avatar,api,route }
},
{ // 特别感谢 @唯选 指正，已修改
    persist: {
        enabled: true,
    }},)
