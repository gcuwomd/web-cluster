import { AxiosResponse } from "axios";
import BaseAxios from "./index";
// interface Msg{
//     code:number,
//     nsg:string,
//     data:T
// }
interface MyResponse{
    message:string
}
export const changepass =(id:string,change:string): Promise<AxiosResponse<MyResponse>>=>{
    return BaseAxios.post<MyResponse>("/user/status",{id:id,status:change},{
        headers:{},
    })
}