import BaseAxios from "./index";
export const assess =(form:object)=>{
    return BaseAxios({
        method:"Post",
        url:"/remember/comment",
        data: form
    }
    )
}