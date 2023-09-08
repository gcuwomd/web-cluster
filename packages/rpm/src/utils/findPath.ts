import { DepartmentList } from '../types/response-data-model'

export const findDepartmentPath = (
  departmentList: Array<DepartmentList>,
  label: string
): string[] => {
  let result: string[] = []
  const find = (listItem: DepartmentList, path: string[]) => {
    if (listItem.label === label) {
      result = [...path, listItem.value]
      return
    }
    if (listItem.children && listItem.children.length > 0) {
      for (const children of listItem.children) {
        find(children, [...path, listItem.value])
      }
    }
  }
  for (const listItem of departmentList) {
    find(listItem, [])
  }
  return result
}
