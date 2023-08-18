import BaseAxios from "../api/index"; 
export const idsearch = async () => {
    return BaseAxios.get("/user/info/department", {
      headers:{},
      params: {
        departmentId: 1,
      },
    });
};

export function id() {
  return idsearch();
}
