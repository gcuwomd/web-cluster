import BaseAxios from "./index";
export const changepass =(id:string,change:string)=>{
    return BaseAxios.post("/user/status",{id:id,status:change},{
        headers:{},
    })
}