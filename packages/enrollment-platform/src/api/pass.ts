import BaseAxios from "./index";
export const pass =()=>{
    return BaseAxios.get("/user/pass",{
        headers:{},
        params:{
            departmentId:1
        }
    })
}