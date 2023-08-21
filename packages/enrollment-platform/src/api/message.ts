import BaseAxios from "./index";
export const message =()=>{
    return BaseAxios.get("/message/reply",{
        headers:{},
        params:{
            departmentId:1
        }
    })
}