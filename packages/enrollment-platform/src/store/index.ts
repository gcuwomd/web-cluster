import { defineStore } from "pinia"
import { ref } from "vue"

export const useStore = defineStore("userInfo", () => {
    const refresh_token = ref<string|null>()
    const access_token =ref<string|null>()
    const name=ref<string|null>()
    const organizationId= ref<string|null>()
    const departmentId=ref<string|null>()
    const avatar=ref<string|null>()
    const api=ref<Array<object>>()
    const route=ref<Array<object>>()
    return {refresh_token,access_token,name,organizationId,departmentId,avatar,api,route }
},
{ 
    persist: {
        enabled: true,
    }},)
