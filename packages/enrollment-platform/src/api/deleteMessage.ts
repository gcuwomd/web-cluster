import BaseAxios from "./index";
import { ElMessage } from "element-plus";
export const deleteMessage =(uid: string[])=>{
    return BaseAxios.delete(`/message/delete?messageId=${uid}`).then(() => {
        ElMessage({
          message: "删除成功！",
          type: "success",
        });
      });
}