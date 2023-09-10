import BaseAxios from "./index";
import { useStore } from "../store";
const store=useStore();
export const nopass =()=>{
    return BaseAxios.get("/user/noPass",{
        headers:{},
        params:{
            departmentId:store.departmentId
        }
    })
}