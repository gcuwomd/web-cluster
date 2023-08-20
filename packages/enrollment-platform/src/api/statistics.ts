import BaseAxios from "./index";
export const departmentData =()=>{
    return BaseAxios.get("/user/departmentData",{
        headers:{},
        params:{
            organizationId:1
        }
    })
}
