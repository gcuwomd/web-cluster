import BaseAxios from "../api/index";
import { inputValue } from "../components/layout/Header.vue";

export const searching = () => {
  return BaseAxios.get("/user/info/person", {
    headers: {},
    params: {
      organizationId: 1,
      key: inputValue.value,
    },
  });
}

export function search() {
  return searching();
}
