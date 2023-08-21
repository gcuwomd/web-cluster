import { testAlova } from "..";
import { AlovaResponse, DepartmentList } from "../../types/response-data-model";

export const getDepartmentList = () => {
  return testAlova.Get<AlovaResponse<DepartmentList[]>>("/auth/department/list")
}