import BaseAxios from "./index";
export const admin =()=>{
    return BaseAxios.get("/user/info/all",{
        headers:{},
        params:{
            organizationId:1
        }
    })
}