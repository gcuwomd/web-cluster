import BaseAxios from "./index";
export const getassess =(id:string)=>{
    return BaseAxios.get("/comment",{
        params:{
            id:id
        }
    })
}