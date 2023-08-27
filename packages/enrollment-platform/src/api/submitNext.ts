//提交到下个部门
import BaseAxios from "./index";

export const subNext =(id :number)=>{
    return BaseAxios.post("/user/nextDepartment",{id:id},{
        headers:{},       
    })
}