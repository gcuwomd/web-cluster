import BaseAxios from "./index";
export const nopass =()=>{
    return BaseAxios.get("/user/noPass",{
        headers:{},
        params:{
            departmentId:1
        }
    })
}