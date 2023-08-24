import BaseAxios from "./index";
import { useStore } from "../store";
const store=useStore();
export const willpass =()=>{
    return BaseAxios.get("/user/willPass",{
        headers:{},
        params:{
            departmentId:store.departmentId
        }
    })
}