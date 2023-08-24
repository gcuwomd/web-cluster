import BaseAxios from "./index";
import { useStore } from "../store";
const store=useStore();
export const admin =()=>{
    return BaseAxios.get("/user/info/all",{
        headers:{},
        params:{
            organizationId:store.organizationId
        }
    })
}