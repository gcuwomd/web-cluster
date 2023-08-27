import BaseAxios from "./index";
export const Loadlist =()=>{
    return BaseAxios.get("/download/excel",{
        headers:{},      
    })
}