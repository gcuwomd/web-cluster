import BaseAxios from "./index";
import { useStore } from "../store";
const store=useStore();
export const search =(val:string)=>{
    return BaseAxios.get("/user/info/person",{
        headers:{},
        params:{
            organizationId:store.organizationId,
            key:val
        }
    })
}