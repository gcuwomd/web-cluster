import BaseAxios from "./index";
import { useStore } from "../store";
const store=useStore();
export const pass =()=>{
    return BaseAxios.get("/user/pass",{
        headers:{},
        params:{
            departmentId:store.departmentId
        }
    })
}