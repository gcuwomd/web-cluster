
import { useLocalStorage } from "@vueuse/core"
export const refresh_tokens=useLocalStorage('refresh_token',null)
export const websiteIds=useLocalStorage('websiteId','')