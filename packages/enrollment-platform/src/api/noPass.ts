import BaseAxios from "./index";
export const nopass =()=>{
    return BaseAxios.get("/user/noPass",{
        headers:{},
        params:{
            organizationId:1
        }
    })
}