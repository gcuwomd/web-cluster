import BaseAxios from "./index";
import { useStore } from "../store";
const store=useStore();
export const message =()=>{
    return BaseAxios.get("/message/reply",{
        headers:{},
        params:{
            departmentId:store.departmentId
        }
    })
}
