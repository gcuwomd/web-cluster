import BaseAxios from "./index";
import { useStore } from "../store";
const store=useStore();
export const departmentData =()=>{
    return BaseAxios.get("/user/departmentData",{
        headers:{},
        params:{
            organizationId:store.organizationId
        }
    })
}
