import BaseAxios from "./index";
export const pass =()=>{
    return BaseAxios.get("/user/pass",{
        headers:{},
        params:{
            organizationId:1
        }
    })
}