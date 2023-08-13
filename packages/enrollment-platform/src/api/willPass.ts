import BaseAxios from "./index";
export const willpass =()=>{
    return BaseAxios.get("/user/willPass",{
        headers:{},
        params:{
            organizationId:1
        }
    })
}